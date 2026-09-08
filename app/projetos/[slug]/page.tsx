import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
} from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectVisual } from "@/components/project-visual";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? {
        title: p.title,
        description: p.description,
        alternates: { canonical: `/projetos/${p.slug}` },
        openGraph: {
          title: p.title,
          description: p.description,
          images: p.image ? [p.image] : [],
        },
        twitter: {
          card: p.image ? "summary_large_image" : "summary",
          title: p.title,
          description: p.description,
          images: p.image ? [p.image] : [],
        },
      }
    : { title: "Projeto não encontrado" };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="container section project-detail">
        <Link className="text-link" href="/#projetos">
          <ArrowLeft size={17} /> Voltar aos projetos
        </Link>
        <div className="detail-heading">
          <div>
            <div className="eyebrow">{p.areas.join(" / ")}</div>
            <h1>{p.title}</h1>
            <p className="large-copy">{p.subtitle}</p>
          </div>
          <span className="detail-status">{p.status}</span>
        </div>
        <div className="detail-layout">
          <div>
            <ProjectVisual project={p} />
            <section className="detail-section">
              <h2>O projeto</h2>
              <p>{p.description}</p>
              <h3>Problema e proposta</h3>
              <p>{p.problem}</p>
            </section>
            <section className="detail-section">
              <h2>Funcionalidades</h2>
              <ul className="feature-list">
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={17} />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
            <section className="detail-section">
              <h2>Estrutura técnica</h2>
              <p>{p.technical}</p>
              <div
                className="architecture-diagram"
                aria-label="Fluxo da arquitetura"
              >
                {p.architecture.map((step, i) => (
                  <div key={step}>
                    <span>{step}</span>
                    {i < p.architecture.length - 1 && <ArrowRight size={18} />}
                  </div>
                ))}
              </div>
              <p className="diagram-caption">
                Representação simplificada do fluxo do projeto.
              </p>
              {p.endpoints && (
                <>
                  <h3>Rotas encontradas no código</h3>
                  <div className="endpoint-list">
                    {p.endpoints.map((e) => (
                      <code key={e}>{e}</code>
                    ))}
                  </div>
                </>
              )}
            </section>
            {p.note && (
              <aside className="project-note">
                <strong>Sobre esta versão</strong>
                <p>{p.note}</p>
              </aside>
            )}
          </div>
          <aside className="detail-sidebar">
            <span className="eyebrow">TECNOLOGIAS</span>
            <div className="tech-tags">
              {p.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <hr />
            <small>DESENVOLVIMENTO</small>
            <p>Marcos Mendes</p>
            <small>TIPO DE PROJETO</small>
            <p>
              {p.areas.includes("Acadêmicos")
                ? "Estudo e prática de programação"
                : p.areas.includes("Redes & Linux")
                  ? "Laboratório de infraestrutura"
                  : "Aplicação de portfólio"}
            </p>
            <div className="detail-actions">
              {p.demo && (
                <a
                  data-track={`${p.slug}:demo`}
                  className="button"
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir demonstração <ExternalLink size={17} />
                </a>
              )}
              {p.repo ? (
                <a
                  data-track={`${p.slug}:code`}
                  className="button button-outline"
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver código no GitHub <Code2 size={17} />
                </a>
              ) : (
                <p className="private-code">Repositório privado</p>
              )}
            </div>
            <a
              className="text-link source-link"
              href={p.source}
              target="_blank"
              rel="noreferrer"
            >
              {p.repo ? "Consultar fonte do projeto" : "Conhecer a interface"}
              <ArrowUpRight size={15} />
            </a>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
