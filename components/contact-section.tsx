"use client";
import { useState, type FormEvent, useEffect } from "react";
import { ArrowUpRight, CircleCheck, Mail, MessageCircle, Send } from "lucide-react";
import { profile } from "@/lib/profile";
export function ContactSection() {
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  useEffect(() => {
    setStartedAt(Date.now());
    setSuccess(sessionStorage.getItem("portfolio-contact-sent") === "yes");
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setFeedback("");
    setSuccess(false);
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt }),
      });
      const result = await response.json();
      setSuccess(response.ok);
      setFeedback(result.message || result.error);
      if (response.ok) {
        form.reset();
        sessionStorage.setItem("portfolio-contact-sent", "yes");
      }
    } catch {
      setFeedback("Conexão indisponível. Tente o e-mail ou o WhatsApp.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section id="contato" className="container section contact-section">
      <div>
        <div className="eyebrow">VAMOS CONVERSAR</div>
        <h2>
          Seu próximo projeto
          <br />
          pode começar aqui<span className="accent">.</span>
        </h2>
        <p>
          Tem uma oportunidade, uma ideia ou um desafio técnico?
          <br />
          Vamos conversar sobre como posso contribuir.
        </p>
        <div className="contact-links">
          <a data-track="email" href={`mailto:${profile.email}`}>
            <Mail size={20} />
            <div>
              <small>E-MAIL</small>
              {profile.email}
            </div>
            <ArrowUpRight size={18} />
          </a>
          <a
            data-track="whatsapp"
            href={profile.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={20} />
            <div>
              <small>WHATSAPP</small>Iniciar uma conversa
            </div>
            <ArrowUpRight size={18} />
          </a>
          <a
            data-track="linkedin"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <img src="/icons/logo-linkedin.svg" width={20} height={20} alt="" />
            <div>
              <small>LINKEDIN</small>Conecte-se comigo
            </div>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      {success ? (
        <div className="contact-form contact-success" role="status" aria-live="polite">
          <CircleCheck size={48} />
          <h3>Seus dados foram enviados.</h3>
          <p>Obrigado pelo contato. Responderei assim que possível.</p>
        </div>
      ) : <form className="contact-form" onSubmit={submit} aria-busy={busy}>
        <h3>Conte um pouco sobre sua ideia.</h3>
        <label>
          Seu nome
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Como posso chamar você?"
          />
        </label>
        <label>
          E-mail
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="voce@empresa.com"
          />
        </label>
        <label>
          Mensagem
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={4000}
            rows={4}
            placeholder="Sobre o que vamos conversar?"
          />
        </label>
        <div className="honeypot" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <p className="form-note">
          Seus dados serão usados somente para responder à mensagem.
        </p>
        <button disabled={busy} className="button" type="submit">
          {busy ? "Enviando..." : "Enviar mensagem"}
          <Send size={17} />
        </button>
        <p className="form-feedback" role="status">
          {feedback}
        </p>
      </form>}
    </section>
  );
}
