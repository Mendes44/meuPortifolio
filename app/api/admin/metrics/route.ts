import { adminSession, noStore } from "@/lib/server";
import { dateRange } from "@/lib/date-range";
export async function GET(request: Request) {
  const session = await adminSession();
  if (!session)
    return Response.json(
      { error: "Sessão expirada ou acesso não autorizado." },
      { status: 401, headers: noStore },
    );
  const range = dateRange(new URL(request.url));
  if (!range) return new Response(null, { status: 400 });
  const { data, error } = await session.db.rpc("portfolio_metrics", {
    p_start: range.start,
    p_end: range.end,
  });
  return error
    ? Response.json(
        { error: "Não foi possível carregar os indicadores." },
        { status: 503, headers: noStore },
      )
    : Response.json(data, { headers: noStore });
}
