import { Database, Terminal, ShieldCheck, ArrowUpRight } from "lucide-react";
import { technologyGroups } from "@/lib/technologies";
export function TechnologySection() {
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
                      {icon === "database" ? (
                        <Database />
                      ) : icon === "terminal" ? (
                        <Terminal />
                      ) : icon === "shield" ? (
                        <ShieldCheck />
                      ) : (
                        <img
                          src={`/icons/${icon}.svg`}
                          alt=""
                          width="28"
                          height="28"
                          loading="lazy"
                        />
                      )}
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
