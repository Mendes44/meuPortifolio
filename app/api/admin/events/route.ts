import { adminSession, noStore } from "@/lib/server";
import { dateRange } from "@/lib/date-range";
export async function GET(request: Request) {
  const session = await adminSession();
  if (!session) return new Response(null, { status: 401, headers: noStore });
  const url = new URL(request.url);
  const range = dateRange(url);
  const page = Number(url.searchParams.get("page") || 0);
  if (!range || !Number.isSafeInteger(page) || page < 0 || page > 100000)
    return new Response(null, { status: 400 });
  const { data, error, count } = await session.db
    .from("portfolio_events")
    .select("*", { count: "exact" })
    .gte("created_at", range.from)
    .lt("created_at", range.until)
    .order("id", { ascending: false })
    .range(page * 30, page * 30 + 29);
  return error
    ? new Response(null, { status: 503, headers: noStore })
    : Response.json({ rows: data, count, page }, { headers: noStore });
}
