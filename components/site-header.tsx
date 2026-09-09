"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "@/lib/profile";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  useEffect(() => {
    try {
      const light = localStorage.getItem("portfolio-theme") === "light";
      document.documentElement.dataset.theme = light ? "light" : "dark";
      setDark(!light);
    } catch {}
  }, []);
  const theme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    } catch {}
  };
  // Fecha o menu e garante que toda navegação interna comece no topo.
  const navigateFromHeader = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link
            href="/"
            className="wordmark"
            aria-label="Marcos Mendes, início"
            scroll
            onClick={navigateFromHeader}
          >
            <span className="wordmark-shell">
              <span className="typing-wordmark">mendes<span>.</span></span>
            </span>
            <small>DEV / TI</small>
          </Link>
          <nav
            className={open ? "main-nav is-open" : "main-nav"}
            aria-label="Navegação principal"
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            {[
              ["Início", "/"],
              ["Projetos", "/projetos"],
              ["Tecnologias", "/tecnologias"],
              ["Sobre mim", "/sobre"],
            ].map(([title, href]) => (
              <Link key={title} href={href} scroll onClick={navigateFromHeader}>
                {title}
              </Link>
            ))}
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={14} />
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={theme}
              aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <Link className="button button-small" href="/#contato" scroll onClick={() => setOpen(false)}>
              Vamos conversar <ArrowUpRight size={15} />
            </Link>
            <button
              className="icon-button mobile-toggle"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
