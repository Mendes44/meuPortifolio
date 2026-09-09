import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ProjectGallery } from "@/components/project-gallery";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos de desenvolvimento, backend, dados, redes, Linux e automação de Marcos Mendes.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="inner-page">
        <ProjectGallery />
      </main>
      <SiteFooter />
    </>
  );
}
