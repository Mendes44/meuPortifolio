import {
  noStore,
  readJson,
  rateLimit,
  sameOrigin,
  configured,
} from "@/lib/server";
import { validateContact } from "@/lib/validation";
import { profile } from "@/lib/profile";
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
    if (
      !configured() ||
      !process.env.RESEND_API_KEY ||
      !process.env.CONTACT_FROM
    )
      return Response.json(
        {
          error:
            "O formulário está temporariamente indisponível. Use o e-mail ou o WhatsApp ao lado.",
        },
        { status: 503, headers: noStore },
      );
    if (!(await rateLimit(request, "contact", 3)))
      return Response.json(
        { error: "Limite de envios atingido. Aguarde alguns minutos." },
        { status: 429, headers: noStore },
      );
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [profile.email],
        reply_to: data.email,
        subject: "Novo contato pelo portfólio",
        text: `Nome: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("send_failed");
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
