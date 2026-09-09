import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BadgeCheck,
  Braces,
  MapPin,
  Network,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { TechnologySection } from "@/components/technology-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/lib/profile";

const specialties = [
  {
    icon: ServerCog,
    title: "Infraestrutura",
    text: "Servidores, estações de trabalho, suporte e operação de ambientes.",
  },
  {
    icon: Network,
    title: "Redes",
    text: "Conectividade, diagnóstico, Linux, acesso remoto e continuidade.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    text: "Boas práticas, controle de acesso, firewall e proteção da informação.",
  },
  {
    icon: Braces,
    title: "Desenvolvimento",
    text: "Aplicações web, APIs, automações, bancos de dados e integrações.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        {/* Apresentação principal: posicionamento, foto, currículo e certificação. */}
        <section className="container hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> ESPECIALISTA EM TECNOLOGIA DA INFORMAÇÃO
            </div>
            <h1>
              Da infraestrutura
              <br />
              <span>ao desenvolvimento.</span>
            </h1>
            <p className="hero-intro">
              Sou <strong className="name-reveal">Marcos Mendes<span aria-hidden="true" /></strong>,
              profissional de TI com 15 anos de experiência. Conecto suporte,
              redes, segurança, sistemas e desenvolvimento para resolver
              problemas de tecnologia por inteiro.
            </p>
            <div className="hero-buttons">
              <Link className="button" href="/projetos">
                Conheça meus projetos <ArrowUpRight size={19} />
              </Link>
              <a className="button button-outline" href="/api/cv?source=/" download>
                <ArrowDownToLine size={18} /> Baixar currículo
              </a>
            </div>
            <div className="hero-social">
              <span><MapPin size={15} />{profile.location}</span>
              <a data-track="github" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub de Marcos Mendes">
                <img src="/icons/logo-github.svg" width="19" height="19" alt="" />
              </a>
              <a data-track="linkedin" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn de Marcos Mendes">
                <img src="/icons/logo-linkedin.svg" width="19" height="19" alt="" />
              </a>
            </div>
          </div>
          <div className="hero-portrait">
            <div className="portrait-frame">
              <Image src="/images/marcos-profissional.webp" alt="Marcos Mendes" width={640} height={740} priority />
              <div className="portrait-caption">
                <span>15 ANOS EM TECNOLOGIA</span>
                <strong>Experiência de ponta a ponta.</strong>
              </div>
            </div>
            <a className="cert-float" href={profile.awsCertification} target="_blank" rel="noreferrer" aria-label="Validar certificação AWS Cloud Practitioner no Credly">
              <BadgeCheck size={30} />
              <div><small>AWS CERTIFIED</small><strong>Cloud Practitioner</strong><span>Validar no Credly <ArrowUpRight size={13} /></span></div>
              <time>2024</time>
            </a>
          </div>
          <div className="hero-bottom">
            <span>ANALISAR. CONECTAR. PROTEGER. DESENVOLVER.</span>
            <Link href="/sobre">Conheça minha trajetória <ArrowUpRight size={16} /></Link>
          </div>
        </section>

        {/* As quatro áreas comunicam a visão ampla de especialista em TI. */}
        <section className="expertise-overview section">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow">ATUAÇÃO</div><h2>Uma visão completa de TI.</h2></div>
              <p className="section-lead">Experiência técnica e prática para acompanhar a tecnologia desde o ambiente onde ela opera até a aplicação usada pelas pessoas.</p>
            </div>
            <div className="specialty-grid">
              {specialties.map(({ icon: Icon, title, text }) => (
                <article className="specialty-card" key={title}><Icon /><span>ESPECIALIDADE</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        {/* Resumo profissional; o conteúdo completo fica na rota /sobre. */}
        <section className="container section home-summary">
          <div>
            <div className="eyebrow">SOBRE MIM</div>
            <h2>Experiência que une pessoas, sistemas e infraestrutura.</h2>
          </div>
          <div className="home-summary-copy">
            <p className="large-copy">Profissional de TI com 15 anos de experiência em suporte técnico, automação comercial, implantação de sistemas, infraestrutura, redes e atendimento a clientes.</p>
            <p>Tenho experiência com softwares de gestão, servidores, estações de trabalho, suporte remoto e presencial, análise de falhas, SQL, bancos de dados, treinamento de usuários e liderança de equipes técnicas.</p>
            <Link className="button button-outline" href="/sobre">Mostrar mais sobre mim <ArrowUpRight size={17} /></Link>
          </div>
        </section>

        {/* Seleção curta de tecnologias; a lista completa fica em /tecnologias. */}
        <TechnologySection compact />

        {/* Entrada para a página exclusiva de projetos. */}
        <section className="container section projects-entry">
          <div><div className="eyebrow">PROJETOS</div><h2>Soluções organizadas por área e tecnologia.</h2><p>Explore trabalhos de frontend, backend, dados, automação, redes e Linux em uma página feita para facilitar a busca.</p></div>
          <Link className="button" href="/projetos">Explorar todos os projetos <ArrowUpRight size={18} /></Link>
        </section>

        {/* Canais diretos e formulário de contato. */}
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
