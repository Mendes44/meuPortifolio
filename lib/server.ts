import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createHmac } from "node:crypto";
import {
  authorizedAdmin,
  browserCategory,
  deviceCategory,
  safePath,
  type EventType,
} from "./validation";
export const sessionCookie = "portfolio_session";
export function configured() {
  return !!(
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_ANON_KEY &&
    (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY) &&
    process.env.SUPABASE_ADMIN_USER_ID &&
    process.env.RATE_LIMIT_SECRET
  );
}
export function publicDatabaseConfigured() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
}
export function publicAuth() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
export function serviceDb() {
  return createClient(
    process.env.SUPABASE_URL!,
    (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
export async function adminSession() {
  if (!configured()) return null;
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token) return null;
  const auth = publicAuth();
  const { data, error } = await auth.auth.getUser(token);
  if (
    error ||
    !authorizedAdmin(data.user?.id, process.env.SUPABASE_ADMIN_USER_ID)
  )
    return null;
  const db = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
  const { data: member, error: memberError } = await db
    .from("portfolio_admins")
    .select("user_id")
    .eq("user_id", data.user!.id)
    .maybeSingle();
  return memberError || !member ? null : { db, token };
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const expected = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000",
  ).origin;
  return origin === expected;
}
export async function readJson(
  request: Request,
  max = 12000,
): Promise<unknown> {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    throw new Error("invalid_body");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid_body");
  let length = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > max) {
      await reader.cancel();
      throw new Error("invalid_body");
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
export async function rateLimit(request: Request, scope: string, limit = 30) {
  if (!configured()) return false;
  // Read a client address only when the deployment guarantees this header is overwritten.
  const header = process.env.TRUSTED_CLIENT_IP_HEADER;
  const identity = header
    ? request.headers.get(header)?.split(",")[0]?.trim() || "shared"
    : "shared";
  const key = createHmac("sha256", process.env.RATE_LIMIT_SECRET!)
    .update(`${new Date().toISOString().slice(0, 10)}:${identity}`)
    .digest("hex");
  const { data, error } = await serviceDb().rpc("portfolio_take_rate_limit", {
    p_key: key,
    p_scope: scope,
    p_limit: limit,
  });
  return !error && data === true;
}
export async function recordEvent(
  request: Request,
  type: EventType,
  target: string,
  source: string,
) {
  if (
    !configured() ||
    !(request.headers.get("cookie") || "")
      .split(";")
      .some((c) => c.trim() === "portfolio_consent=yes")
  )
    return;
  if (!(await rateLimit(request, "events", 60))) return;
  const agent = request.headers.get("user-agent") || "";
  const { error } = await serviceDb()
    .from("portfolio_events")
    .insert({
      event_type: type,
      target,
      source: safePath(source),
      device: deviceCategory(agent),
      browser: browserCategory(agent),
    });
  if (error) throw new Error("event_unavailable");
}
export const noStore = { "Cache-Control": "no-store, private" };
