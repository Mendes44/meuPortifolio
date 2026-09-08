import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="container error-page">
        <span className="eyebrow">ERRO 404</span>
        <h1>
          Essa rota ainda
          <br />
          não tem código<span className="accent">.</span>
        </h1>
        <p>A página que você procurou não foi encontrada.</p>
        <Link className="button" href="/">
          <ArrowLeft size={17} /> Voltar ao portfólio
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
