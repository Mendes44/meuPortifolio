import { adminSession, noStore } from "@/lib/server";
import { dateRange } from "@/lib/date-range";
import { csvCell } from "@/lib/validation";
export async function GET(request: Request) {
  const session = await adminSession();
  if (!session) return new Response(null, { status: 401, headers: noStore });
  const url = new URL(request.url);
  const range = dateRange(url);
  const format = url.searchParams.get("format") || "csv";
  if (!range || !["csv", "txt"].includes(format))
    return new Response(null, { status: 400 });
  // Fetch a bounded date range in pages; export never silently truncates at the REST row limit.
  const lines = ["id,data_utc,tipo,destino,origem,dispositivo,navegador"];
  let cursor = 0;
  while (true) {
    const { data, error } = await session.db
      .from("portfolio_events")
      .select("*")
      .gte("created_at", range.from)
      .lt("created_at", range.until)
      .gt("id", cursor)
      .order("id")
      .limit(1000);
    if (error)
      return Response.json(
        { error: "Exportação indisponível." },
        { status: 503, headers: noStore },
      );
    for (const row of data)
      lines.push(
        [
          row.id,
          row.created_at,
          row.event_type,
          row.target,
          row.source,
          row.device,
          row.browser,
        ]
          .map(csvCell)
          .join(","),
      );
    if (data.length < 1000) break;
    cursor = data[data.length - 1].id;
    if (lines.length > 100000)
      return Response.json(
        {
          error:
            "Escolha um período menor para exportar até 100 mil registros.",
        },
        { status: 422, headers: noStore },
      );
  }
  return new Response("\uFEFF" + lines.join("\r\n"), {
    headers: {
      ...noStore,
      "Content-Type":
        format === "csv"
          ? "text/csv; charset=utf-8"
          : "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="portfolio-${range.start}-${range.end}.${format}"`,
    },
  });
}
