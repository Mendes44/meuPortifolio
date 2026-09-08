export function dateRange(url: URL) {
  const end =
    url.searchParams.get("end") || new Date().toISOString().slice(0, 10);
  const start =
    url.searchParams.get("start") ||
    new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
  const valid = (v: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(v) &&
    !Number.isNaN(Date.parse(v)) &&
    new Date(v).toISOString().slice(0, 10) === v;
  if (
    !valid(start) ||
    !valid(end) ||
    start > end ||
    (Date.parse(end) - Date.parse(start)) / 86400000 > 366
  )
    return null;
  const until = new Date(Date.parse(end) + 86400000).toISOString().slice(0, 10);
  return {
    start,
    end,
    from: `${start}T00:00:00-03:00`,
    until: `${until}T00:00:00-03:00`,
  };
}
