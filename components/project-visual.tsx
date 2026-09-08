import Image from "next/image";
import {
  CalendarDays,
  Users,
  ArrowRight,
  Terminal,
  Database,
  Layers,
  Network,
} from "lucide-react";
import type { Project } from "@/lib/projects";
export function ProjectVisual({ project }: { project: Project }) {
  if (project.image)
    return (
      <div className={`project-visual ${project.color}`}>
        <Image
          src={project.image}
          alt={
            project.slug === "verdinho"
              ? "Prato apresentado no site Restaurante Verdinho"
              : "Captura do site Chico do Peixe"
          }
          fill
          sizes="(max-width:760px) 90vw, (max-width:1100px) 45vw, 380px"
          className={
            project.slug === "chico-do-peixe" ? "screenshot-image" : ""
          }
        />
        <span className="visual-label">
          {project.slug === "verdinho"
            ? "WEBSITE / RESTAURANTE"
            : "WEBSITE / CHICO DO PEIXE"}
        </span>
      </div>
    );
  return (
    <div
      className={`project-visual drawn ${project.color}`}
      aria-label={`Representação da arquitetura de ${project.title}`}
    >
      <div className="visual-top">
        <span className="window-dots">● ● ●</span>
        <span>
          {project.visual === "app"
            ? "APLICAÇÃO WEB"
            : project.visual === "api"
              ? "REST API"
              : project.visual === "data"
                ? "PROCESSAMENTO DE DADOS"
                : "LAB / TERMINAL"}
        </span>
      </div>
      {project.visual === "app" ? (
        <div className="app-diagram">
          <div className="app-glyph">
            <CalendarDays size={30} />
          </div>
          <strong>{project.title}</strong>
          <div>
            <span>
              <Users size={14} />{" "}
              {project.slug === "appbraza" ? "Convidados" : "Pessoas"}
            </span>
            <ArrowRight size={14} />
            <span>
              {project.slug === "appbraza" ? "Organização" : "Reserva"}
            </span>
          </div>
        </div>
      ) : project.visual === "api" ? (
        <div className="api-diagram">
          <div>
            <span>GET</span>
            <code>/api/clientes</code>
          </div>
          <div>
            <span>POST</span>
            <code>/api/servicos-prestados</code>
          </div>
          <footer>
            <Layers size={17} /> Spring Boot <ArrowRight size={16} />
            <Database size={17} /> H2
          </footer>
        </div>
      ) : (
        <div className="terminal-diagram">
          {project.slug === "linux-ssh" ? (
            <Network size={25} />
          ) : project.visual === "data" ? (
            <Database size={25} />
          ) : (
            <Terminal size={25} />
          )}
          <code>
            {project.slug === "linux-ssh"
              ? "$ ssh ubuntu-lab"
              : project.visual === "data"
                ? "entrada → processo → saída"
                : project.technologies.includes("Java")
                  ? "$ java application.Program"
                  : "$ node index.js"}
          </code>
          <span>{project.architecture.slice(1, 3).join("  /  ")}</span>
        </div>
      )}
      <div className="visual-bottom">
        {project.technologies.slice(0, 3).join(" / ")}
      </div>
    </div>
  );
}
