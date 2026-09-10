import {
  noStore,
  readJson,
  sameOrigin,
  publicAuth,
  publicDatabaseConfigured,
} from "@/lib/server";
import { validateContact } from "@/lib/validation";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json(
      { error: "Origem inválida." },
      { status: 403, headers: noStore },
    );
  try {
    const raw = (await readJson(request)) as Record<string, unknown>;
    if (
      !raw ||
      raw.website ||
      typeof raw.startedAt !== "number" ||
      Date.now() - raw.startedAt < 2500
    )
      return Response.json(
        {
          error:
            "Não foi possível validar o envio. Aguarde alguns segundos e tente novamente.",
        },
        { status: 400, headers: noStore },
      );
    const data = validateContact(raw);
    if (!data)
      return Response.json(
        { error: "Confira nome, e-mail e mensagem (10 a 4.000 caracteres)." },
        { status: 400, headers: noStore },
      );
    if (!publicDatabaseConfigured())
      return Response.json(
        {
          error:
            "O formulário está temporariamente indisponível. Use o e-mail ou o WhatsApp ao lado.",
        },
        { status: 503, headers: noStore },
      );
    const { error } = await publicAuth().from("LEADS2").insert({
      nome: data.name,
      email: data.email,
      message: data.message,
    });
    if (error) {
      console.error("Supabase contact insert failed:", error.code, error.message);
      throw new Error("database_insert_failed");
    }
    return Response.json(
      { message: "Mensagem enviada. Obrigado pelo contato!" },
      { headers: noStore },
    );
  } catch {
    return Response.json(
      {
        error:
          "Não foi possível enviar. Tente novamente ou entre em contato por e-mail.",
      },
      { status: 503, headers: noStore },
    );
  }
}
