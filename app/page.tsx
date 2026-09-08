import Image from "next/image";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  MapPin,
  BadgeCheck,
  Layers,
  Terminal,
  Network,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { profile, experience } from "@/lib/profile";
import { ProjectGallery } from "@/components/project-gallery";
import { TechnologySection } from "@/components/technology-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <section className="container hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> DESENVOLVIMENTO + INFRAESTRUTURA
            </div>
            <h1>
              Ideias em código.
              <br />
              <span>Soluções no mundo real.</span>
            </h1>
            <p className="hero-intro">
              Sou{" "}
              <strong className="name-reveal">
                Marcos Mendes
                <span aria-hidden="true" />
              </strong>
              , desenvolvedor Full Stack.
              <br />
              Conecto desenvolvimento web, dados e infraestrutura à experiência
              de quem conhece a tecnologia na prática.
            </p>
            <div className="hero-buttons">
              <a className="button" href="#projetos">
                Conheça meus projetos <ArrowUpRight size={19} />
              </a>
              <a
                className="button button-outline"
                href="/api/cv?source=/"
                download
              >
                <ArrowDownToLine size={18} /> Baixar currículo
              </a>
            </div>
            <div className="hero-social">
              <span>
                <MapPin size={15} />
                {profile.location}
              </span>
              <a
                data-track="github"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub de Marcos Mendes"
              >
                <img
                  src="/icons/logo-github.svg"
                  width="19"
                  height="19"
                  alt=""
                />
              </a>
              <a
                data-track="linkedin"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn de Marcos Mendes"
              >
                <img
                  src="/icons/logo-linkedin.svg"
                  width="19"
                  height="19"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="hero-portrait">
            <div className="portrait-frame">
              <Image
                src="/images/marcos.webp"
                alt="Marcos Mendes"
                width={640}
                height={740}
                priority
              />
              <div className="portrait-caption">
                <span>TECNOLOGIA COM PROPÓSITO</span>
                <strong>Do código à operação.</strong>
              </div>
            </div>
            <a
              className="cert-float"
              href={profile.awsCertification}
              target="_blank"
              rel="noreferrer"
              aria-label="Validar certificação AWS Cloud Practitioner no Credly"
            >
              <BadgeCheck size={30} />
              <div>
                <small>AWS CERTIFIED</small>
                <strong>Cloud Practitioner</strong>
                <span>Validar no Credly <ArrowUpRight size={13} /></span>
              </div>
              <time>2024</time>
            </a>
          </div>
          <div className="hero-bottom">
            <span>DESENVOLVER. CONECTAR. RESOLVER.</span>
            <a href="#projetos">
              Explore meu trabalho <ArrowDown size={16} />
            </a>
          </div>
        </section>
        <section className="expertise-band">
          <div className="container expertise-items">
            <span>
              <Layers /> Desenvolvimento Full Stack
            </span>
            <span>
              <Terminal /> Backend & dados
            </span>
            <span>
              <Network /> Redes & Linux
            </span>
            <span>
              <BadgeCheck /> AWS Cloud Practitioner
            </span>
          </div>
        </section>
        <ProjectGallery />
        <TechnologySection />
        <section id="sobre" className="container section about-section">
          <div>
            <div className="eyebrow">03 / MUITO ALÉM DO CÓDIGO</div>
            <h2>
              Desenvolvedor.
              <br />
              Profissional de TI.
              <br />
              <span className="muted">Sempre aprendendo.</span>
            </h2>
            <div className="about-stat">
              <strong>
                15<span> anos</span>
              </strong>
              <p>
                de experiência em tecnologia,
                <br />
                suporte e implantação de sistemas.
              </p>
            </div>
          </div>
          <div className="about-copy">
            <p className="large-copy">
              Gosto de entender o problema inteiro: a pessoa que usa o sistema,
              o código que faz tudo funcionar e a infraestrutura por trás dele.
            </p>
            <p>
              Minha trajetória começou no suporte e na implantação de sistemas
              comerciais. Trabalhei com clientes, redes, servidores e equipes
              técnicas. Essa vivência me ensinou a investigar falhas, comunicar
              soluções e acompanhar o trabalho até a entrega.
            </p>
            <p>
              Hoje, aplico essa base no desenvolvimento web, com projetos
              frontend, backend, automação e dados. Sou formado em Análise e
              Desenvolvimento de Sistemas e em Redes de Computadores, com
              certificação AWS Certified Cloud Practitioner.
            </p>
            <p>
              A experiência como oficial do Exército acrescentou disciplina e
              planejamento à minha forma de trabalhar. Sigo aprofundando meus
              conhecimentos em Full Stack, APIs, cloud e inteligência
              artificial.
            </p>
            <a
              className="text-link"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-track="linkedin"
            >
              Minha trajetória no LinkedIn <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <section id="experiencia" className="alternate-section section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow">04 / TRAJETÓRIA PROFISSIONAL</div>
                <h2>Experiência que se conecta.</h2>
              </div>
              <p className="section-lead">
                Desenvolvimento apoiado em uma base de atendimento, operações,
                dados e liderança técnica.
              </p>
            </div>
            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={item.company}>
                  <time>{item.period}</time>
                  <div>
                    <h3>{item.role}</h3>
                    <strong>{item.company}</strong>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="formacao" className="container section">
          <div className="eyebrow">05 / FORMAÇÃO & CERTIFICAÇÕES</div>
          <h2>Base sólida. Evolução constante.</h2>
          <div className="education-grid">
            <article className="aws-certificate">
              <div className="aws-heading">
                <img
                  src="/icons/aws.svg"
                  alt="Amazon Web Services"
                  width={80}
                  height={48}
                />
                <BadgeCheck size={36} />
              </div>
              <span className="eyebrow">CERTIFICAÇÃO · 2024</span>
              <h3>
                AWS Certified
                <br />
                Cloud Practitioner
              </h3>
              <p>Certificação em fundamentos da nuvem AWS.</p>
              <span className="certificate-provider">
                AWS re/Start · Escola da Nuvem · 2024
              </span>
              <a
                className="certificate-validation"
                href={profile.awsCertification}
                target="_blank"
                rel="noreferrer"
              >
                Validar credencial no Credly <ArrowUpRight size={15} />
              </a>
            </article>
            <div className="education-list">
              <article>
                <span>2022 / GRADUAÇÃO</span>
                <h3>Análise e Desenvolvimento de Sistemas</h3>
                <p>Universidade Cruzeiro do Sul</p>
              </article>
              <article>
                <span>2015 / GRADUAÇÃO</span>
                <h3>Redes de Computadores</h3>
                <p>Faculdade Pitágoras</p>
              </article>
              <article>
                <span>2026 / FORMAÇÃO COMPLEMENTAR</span>
                <h3>Desenvolvedor Full-Stack</h3>
                <p>DevMedia</p>
              </article>
              <article>
                <span>2023 — 2024 / CURSOS</span>
                <h3>Desenvolvimento & ferramentas</h3>
                <p>Java, SQL, Git, JavaScript e métodos ágeis.</p>
              </article>
            </div>
          </div>
        </section>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
