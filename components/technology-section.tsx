import { Database, Terminal, ShieldCheck, ArrowUpRight } from "lucide-react";
import { technologyGroups } from "@/lib/technologies";
import Link from "next/link";

export function TechnologySection({ compact = false }: { compact?: boolean }) {
  // A home usa uma amostra compacta para manter a leitura rápida.
  if (compact) {
    const featured = technologyGroups.flatMap((group) => group.items).slice(0, 15);
    return (
      <section id="tecnologias" className="section alternate-section technology-preview-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">TECNOLOGIAS</div>
              <h2>Conhecimento que conecta todas as camadas.</h2>
            </div>
            <p className="section-lead">
              Ferramentas de desenvolvimento, dados, cloud, redes e infraestrutura
              aplicadas ao longo da minha trajetória.
            </p>
          </div>
          <div className="featured-technologies">
            {featured.map(([title, icon]) => (
              <div className="featured-technology" key={title}>
                <TechnologyIcon icon={icon} />
                <span>{title}</span>
              </div>
            ))}
          </div>
          <Link className="button technology-more" href="/tecnologias">
            Ver todas as tecnologias <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    );
  }
  // A rota /tecnologias mostra todos os grupos e seus níveis de experiência.
  return (
    <section id="tecnologias" className="section alternate-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">02 / CAIXA DE FERRAMENTAS</div>
            <h2>
              A tecnologia certa.
              <br />
              <span className="muted">Para cada parte do desafio.</span>
            </h2>
          </div>
          <p className="section-lead">
            Conhecimentos construídos no trabalho, em projetos e no estudo
            contínuo. Da interface à linha de comando.
          </p>
        </div>
        <div className="technology-grid">
          {technologyGroups.map((group) => (
            <article className="technology-group" key={group.title}>
              <div className="group-title">
                <h3>{group.title}</h3>
                <ArrowUpRight size={18} />
              </div>
              <p>{group.description}</p>
              <div className="technology-icons">
                {group.items.map(([title, icon]) => (
                  <div key={title} className="technology-item">
                    <span>
                      <TechnologyIcon icon={icon} />
                    </span>
                    <small>{title}</small>
                  </div>
                ))}
              </div>
              <span className="knowledge-level">{group.level}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologyIcon({ icon }: { icon: string }) {
  // Ícones genéricos cobrem conhecimentos sem arquivo SVG próprio.
  return icon === "database" ? (
    <Database />
  ) : icon === "terminal" ? (
    <Terminal />
  ) : icon === "shield" ? (
    <ShieldCheck />
  ) : (
    <img src={`/icons/${icon}.svg`} alt="" width="28" height="28" loading="lazy" />
  );
}
