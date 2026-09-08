import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/profile";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link className="wordmark" href="/">
            mendes<span>.</span>
          </Link>
          <p>Desenvolvimento, infraestrutura e aprendizado contínuo.</p>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Marcos Mendes · Belo Horizonte, Brasil
          </span>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/admin">Área privada</Link>
        </div>
      </div>
    </footer>
  );
}
