import { cookies } from "next/headers";
import {
  configured,
  noStore,
  publicAuth,
  readJson,
  rateLimit,
  sameOrigin,
  sessionCookie,
} from "@/lib/server";
import { authorizedAdmin } from "@/lib/validation";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json(
      { error: "Origem inválida." },
      { status: 403, headers: noStore },
    );
  if (!configured())
    return Response.json(
      { error: "A área privada ainda não foi conectada ao Supabase." },
      { status: 503, headers: noStore },
    );
  try {
    const raw = (await readJson(request, 1500)) as Record<string, unknown>;
    if (
      !raw ||
      typeof raw.email !== "string" ||
      typeof raw.password !== "string" ||
      raw.email.length > 254 ||
      raw.password.length > 256
    )
      return new Response(null, { status: 400 });
    if (!(await rateLimit(request, "login", 5)))
      return Response.json(
        { error: "Muitas tentativas. Aguarde dez minutos." },
        { status: 429, headers: noStore },
      );
    const auth = publicAuth();
    const { data, error } = await auth.auth.signInWithPassword({
      email: raw.email,
      password: raw.password,
    });
    if (
      error ||
      !data.session ||
      !authorizedAdmin(data.user?.id, process.env.SUPABASE_ADMIN_USER_ID)
    ) {
      if (data.session) await auth.auth.signOut({ scope: "local" });
      return Response.json(
        { error: "Acesso não autorizado. Confira suas credenciais." },
        { status: 401, headers: noStore },
      );
    }
    (await cookies()).set(sessionCookie, data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: Math.min(data.session.expires_in, 3600),
    });
    return Response.json({ ok: true }, { headers: noStore });
  } catch {
    return Response.json(
      { error: "Não foi possível entrar. Tente novamente." },
      { status: 503, headers: noStore },
    );
  }
}
