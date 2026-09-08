"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
export function track(type: string, target: string) {
  if (
    !document.cookie
      .split(";")
      .some((c) => c.trim() === "portfolio_consent=yes")
  )
    return;
  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, target, source: location.pathname }),
    keepalive: true,
  }).catch(() => {});
}
export function Analytics() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState("");
  useEffect(() => {
    const current =
      document.cookie
        .split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith("portfolio_consent="))
        ?.split("=")[1] || "";
    setConsent(current);
    setVisible(!current);
  }, []);
  useEffect(() => {
    if (consent === "yes" && !pathname.startsWith("/admin"))
      track(
        pathname.startsWith("/projetos/") ? "project_view" : "visit",
        pathname.split("/").pop() || "home",
      );
  }, [pathname, consent]);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const anchor = (e.target as Element)?.closest("a");
      const target = anchor?.dataset.track;
      if (target) track("link_click", target);
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);
  function choose(value: string) {
    document.cookie = `portfolio_consent=${value}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    setConsent(value);
    setVisible(false);
  }
  return (
    <>
      {visible && !pathname.startsWith("/admin") && (
        <aside
          className="consent-banner"
          aria-label="Preferências de privacidade"
        >
          <div>
            <strong>Posso conhecer melhor as visitas?</strong>
            <p>
              Com sua permissão, registro visitas, cliques e downloads, sem
              cookies de publicidade.{" "}
              <Link href="/privacidade">Saiba mais</Link>.
            </p>
          </div>
          <button
            className="button button-outline button-small"
            onClick={() => choose("no")}
          >
            Recusar
          </button>
          <button className="button button-small" onClick={() => choose("yes")}>
            Permitir estatísticas
          </button>
        </aside>
      )}
      <button
        className="privacy-control"
        onClick={() => setVisible(true)}
        aria-label="Alterar preferências de privacidade"
      >
        Privacidade
      </button>
    </>
  );
}
