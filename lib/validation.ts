export const eventTypes = [
  "visit",
  "project_view",
  "link_click",
  "cv_download",
] as const;
export type EventType = (typeof eventTypes)[number];
export function validateContact(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (
    name.length < 2 ||
    name.length > 100 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    /[\r\n]/.test(email) ||
    message.length < 10 ||
    message.length > 4000
  )
    return null;
  return { name, email, message };
}
export function safePath(value: unknown) {
  if (typeof value !== "string") return "/";
  const path = value.split(/[?#]/)[0];
  return /^\/(?:projetos\/[a-z0-9-]+|privacidade)?$/.test(path) ? path : "/";
}
export function deviceCategory(userAgent: string) {
  return /ipad|tablet/i.test(userAgent)
    ? "tablet"
    : /mobile|android|iphone/i.test(userAgent)
      ? "mobile"
      : "desktop";
}
export function browserCategory(userAgent: string) {
  return /Edg\//.test(userAgent)
    ? "Edge"
    : /Firefox\//.test(userAgent)
      ? "Firefox"
      : /Chrome\//.test(userAgent)
        ? "Chrome"
        : /Safari\//.test(userAgent)
          ? "Safari"
          : "Outro";
}
export function csvCell(value: unknown) {
  let text = String(value ?? "");
  if (/^[\s]*[=+@-]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}
export function authorizedAdmin(
  actualId: string | undefined,
  expectedId: string | undefined,
) {
  return !!actualId && !!expectedId && actualId === expectedId;
}
