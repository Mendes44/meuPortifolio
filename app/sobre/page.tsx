import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, BadgeCheck, Braces, Network, ServerCog, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile, experience } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Sobre mim",
  description: "Trajetória, experiência, formação e certificações de Marcos Mendes, especialista em TI e desenvolvedor Full Stack.",
};

const expertise = [
  [ServerCog, "Infraestrutura e suporte", "Instalação, manutenção e diagnóstico de servidores, estações e softwares de gestão."],
  [Network, "Redes e sistemas", "Conectividade, Linux, Windows, acesso remoto, implantação e continuidade operacional."],
  [ShieldCheck, "Segurança da informação", "Boas práticas de acesso, firewall, proteção de ambientes e análise de riscos técnicos."],
  [Braces, "Desenvolvimento", "JavaScript, HTML, CSS, Java, Python, SQL, Git, aplicações web e automações."],
] as const;

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="inner-page">
        {/* Introdução e atalhos profissionais. */}
        <section className="container page-hero about-page-hero">
          <div>
            <div className="eyebrow">SOBRE MIM</div>
            <h1>Experiência técnica com visão do todo.</h1>
          </div>
          <div>
            <p className="large-copy">
              Profissional de TI com 15 anos de experiência em suporte técnico,
              automação comercial, implantação de sistemas, infraestrutura,
              redes e atendimento a clientes.
            </p>
            <div className="hero-buttons">
              <a className="button" href="/api/cv?source=/sobre" download><ArrowDownToLine size={18} /> Baixar currículo</a>
              <a className="button button-outline" href={profile.linkedin} target="_blank" rel="noreferrer">Ver LinkedIn <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>

        {/* Apresentação completa fornecida por Marcos. */}
        <section className="alternate-section section">
          <div className="container about-narrative">
            <div>
              <div className="eyebrow">PERFIL PROFISSIONAL</div>
              <h2>Do atendimento à arquitetura da solução.</h2>
            </div>
            <div className="about-copy">
              <p>
                Possuo experiência na instalação e manutenção de softwares de
                gestão, configuração de servidores e estações de trabalho,
                suporte remoto e presencial, análise de falhas, SQL, bancos de
                dados e treinamento de usuários.
              </p>
              <p>
                Atuei na liderança de equipes técnicas e possuo ampla experiência
                na implantação de sistemas comerciais, incluindo instalação,
                configuração, testes, treinamento de usuários e acompanhamento
                pós-implantação.
              </p>
              <p>
                Sou formado em Análise e Desenvolvimento de Sistemas e em Redes
                de Computadores, com certificação AWS Cloud Practitioner e
                conhecimentos em Windows, Linux, redes, Python, JavaScript, HTML,
                CSS, Java, Git e segurança da informação.
              </p>
            </div>
          </div>
        </section>

        {/* Competências organizadas pelas quatro frentes de atuação. */}
        <section className="container section">
          <div className="section-heading">
            <div><div className="eyebrow">ÁREAS DE ATUAÇÃO</div><h2>Especialista em TI de ponta a ponta.</h2></div>
            <p className="section-lead">Uma base multidisciplinar construída em ambientes reais, com usuários, sistemas e operações que não podem parar.</p>
          </div>
          <div className="specialty-grid">
            {expertise.map(([Icon, title, text]) => (
              <article className="specialty-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        {/* Histórico profissional alimentado por lib/profile.ts. */}
        <section className="alternate-section section">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow">TRAJETÓRIA PROFISSIONAL</div><h2>15 anos resolvendo problemas de tecnologia.</h2></div>
              <p className="section-lead">Experiência em suporte, implantação, dados, infraestrutura, liderança e desenvolvimento.</p>
            </div>
            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={`${item.company}-${item.period}`}>
                  <time>{item.period}</time>
                  <div>
                    <h3>{item.role}</h3><strong>{item.company}</strong><p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Formação acadêmica e validação pública da certificação AWS. */}
        <section className="container section">
          <div className="eyebrow">FORMAÇÃO E CERTIFICAÇÕES</div>
          <h2>Base acadêmica e evolução contínua.</h2>
          <div className="education-grid">
            <article className="aws-certificate">
              <div className="aws-heading"><img src="/icons/aws.svg" alt="Amazon Web Services" width="80" height="48" /><BadgeCheck size={36} /></div>
              <span className="eyebrow">CERTIFICAÇÃO · 2024</span>
              <h3>AWS Certified<br />Cloud Practitioner</h3>
              <p>Certificação em fundamentos da nuvem AWS.</p>
              <span className="certificate-provider">AWS re/Start · Escola da Nuvem · 2024</span>
              <a className="certificate-validation" href={profile.awsCertification} target="_blank" rel="noreferrer">Validar credencial no Credly <ArrowUpRight size={15} /></a>
            </article>
            <div className="education-list">
              <article><span>2022 / GRADUAÇÃO</span><h3>Análise e Desenvolvimento de Sistemas</h3><p>Universidade Cruzeiro do Sul</p></article>
              <article><span>2015 / GRADUAÇÃO</span><h3>Redes de Computadores</h3><p>Faculdade Pitágoras</p></article>
              <article><span>2026 / FORMAÇÃO COMPLEMENTAR</span><h3>Desenvolvedor Full-Stack</h3><p>DevMedia</p></article>
              <article><span>FORMAÇÃO CONTÍNUA</span><h3>Desenvolvimento e infraestrutura</h3><p>Java, SQL, Git, JavaScript, Linux e métodos ágeis.</p></article>
            </div>
          </div>
          <div className="page-end-cta">
            <Link className="button" href="/projetos">
              Conheça meus projetos <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
