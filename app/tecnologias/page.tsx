import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { TechnologySection } from "@/components/technology-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Tecnologias",
  description: "Tecnologias e conhecimentos de Marcos Mendes em desenvolvimento, dados, cloud, redes e infraestrutura.",
};

export default function TechnologiesPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="inner-page">
        <TechnologySection />
      </main>
      <SiteFooter />
    </>
  );
}
