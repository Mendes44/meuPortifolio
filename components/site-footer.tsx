import Link from "next/link";
import { profile } from "@/lib/profile";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link className="wordmark footer-wordmark" href="/" scroll aria-label="Voltar ao início">
            mendes<span>.</span>
          </Link>
          <p>Desenvolvimento, infraestrutura e aprendizado contínuo.</p>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub de Marcos Mendes">
              <img src="/icons/logo-github.svg" width="22" height="22" alt="" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn de Marcos Mendes">
              <img src="/icons/logo-linkedin.svg" width="22" height="22" alt="" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Marcos Mendes · Belo Horizonte, Brasil
          </span>
          <Link href="/privacidade" scroll>Privacidade</Link>
          <Link href="/admin" scroll>Área privada</Link>
        </div>
      </div>
    </footer>
  );
}
