import { cookies } from "next/headers";
import { sameOrigin, sessionCookie, noStore } from "@/lib/server";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  (await cookies()).delete(sessionCookie);
  return Response.json({ ok: true }, { headers: noStore });
}
