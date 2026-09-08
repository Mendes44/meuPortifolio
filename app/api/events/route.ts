import { projects } from "@/lib/projects";
import { readJson, recordEvent, sameOrigin, noStore } from "@/lib/server";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json(
      { error: "Origem inválida." },
      { status: 403, headers: noStore },
    );
  try {
    const data = (await readJson(request, 2000)) as Record<string, unknown>;
    if (
      !data ||
      !["visit", "project_view", "link_click"].includes(String(data.type))
    )
      return new Response(null, { status: 400 });
    const targets = [
      "github",
      "linkedin",
      "whatsapp",
      "email",
      ...projects.map((p) => p.slug),
      ...projects.flatMap((p) => [`${p.slug}:demo`, `${p.slug}:code`]),
    ];
    const target = data.type === "visit" ? "home" : String(data.target);
    if (data.type !== "visit" && !targets.includes(target))
      return new Response(null, { status: 400 });
    await recordEvent(
      request,
      data.type as "visit" | "project_view" | "link_click",
      target,
      String(data.source || "/"),
    );
    return new Response(null, { status: 204, headers: noStore });
  } catch {
    return Response.json(
      { error: "Registro indisponível." },
      { status: 503, headers: noStore },
    );
  }
}
