import { readFile } from "node:fs/promises";
import path from "node:path";
import { recordEvent } from "@/lib/server";
export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    const bytes = await readFile(
      path.join(process.cwd(), "public", "cv", "Marcos_Mendes_CV.pdf"),
    );
    if (bytes.subarray(0, 5).toString() !== "%PDF-")
      throw new Error("invalid_pdf");
    const source = new URL(request.url).searchParams.get("source") || "/";
    try {
      await recordEvent(request, "cv_download", "curriculo", source);
    } catch {
      /* Analytics must not prevent delivery. */
    }
    return new Response(bytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Marcos_Mendes_CV.pdf"',
        "Content-Length": String(bytes.length),
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return Response.json(
      {
        error:
          "Currículo indisponível no momento. Entre em contato por e-mail.",
      },
      { status: 503 },
    );
  }
}
