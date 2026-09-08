"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X, SlidersHorizontal } from "lucide-react";
import { areas, projects, filterProjects } from "@/lib/projects";
import { ProjectVisual } from "./project-visual";
export function ProjectGallery() {
  const [area, setArea] = useState("Todos");
  const [technology, setTechnology] = useState("Todas");
  const [query, setQuery] = useState("");
  const results = filterProjects(area, technology, query);
  const technologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies)),
  ).sort();
  return (
    <section id="projetos" className="container section">
      <div className="section-heading">
        <div>
          <div className="eyebrow">01 / PROJETOS SELECIONADOS</div>
          <h2>Código que resolve.</h2>
          <p className="section-lead">
            Da experiência na tela aos serviços e à infraestrutura que sustentam
            uma solução.
          </p>
        </div>
        <a
          className="text-link"
          href="https://github.com/Mendes44?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          Todos os repositórios <ArrowUpRight size={17} />
        </a>
      </div>
      <div
        className="area-filters"
        role="group"
        aria-label="Filtrar projetos por área"
      >
        {areas.map((a) => (
          <button
            key={a}
            aria-pressed={area === a}
            onClick={() => setArea(a)}
            className={area === a ? "filter active" : "filter"}
          >
            {a}
            {a === "Todos" && <span>{projects.length}</span>}
          </button>
        ))}
      </div>
      <div className="filter-toolbar">
        <label className="search-field">
          <Search size={17} />
          <input
            type="search"
            placeholder="Buscar projeto ou tecnologia..."
            aria-label="Buscar projeto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="tech-select">
          <SlidersHorizontal size={16} />
          <span className="sr-only">Tecnologia</span>
          <select
            aria-label="Filtrar por tecnologia"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
          >
            <option value="Todas">Todas as tecnologias</option>
            {technologies.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <span className="result-count" role="status" aria-live="polite">
          {results.length} {results.length === 1 ? "projeto" : "projetos"}
        </span>
      </div>
      <div className="project-grid">
        {results.map((p) => (
          <article className="project-card" key={p.slug}>
            <Link
              href={`/projetos/${p.slug}`}
              aria-label={`Conhecer ${p.title}`}
            >
              <ProjectVisual project={p} />
            </Link>
            <div className="card-body">
              <div className="card-meta">
                <span>{p.areas[0]}</span>
                <span className={p.demo ? "online-status" : "code-status"}>
                  {p.demo ? "● Demo online" : "↗ Somente GitHub"}
                </span>
              </div>
              <h3>
                <Link href={`/projetos/${p.slug}`}>{p.title}</Link>
              </h3>
              <p>{p.description}</p>
              <div className="tech-tags">
                {p.technologies.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTechnology(t)}
                    aria-label={`Filtrar tecnologia ${t}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="card-footer">
                <span>{p.status}</span>
                <Link href={`/projetos/${p.slug}`}>
                  Explorar projeto <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      {results.length === 0 && (
        <div className="empty-state">
          <Search size={30} />
          <h3>Nenhum projeto nessa combinação.</h3>
          <p>Experimente outra tecnologia ou remova os filtros.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setArea("Todos");
              setTechnology("Todas");
              setQuery("");
            }}
          >
            <X size={16} /> Limpar filtros
          </button>
        </div>
      )}
    </section>
  );
}
