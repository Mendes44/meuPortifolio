"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Posiciona novas páginas no topo e resolve links internos com âncora. */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;

    const positionPage = () => {
      // Dois frames garantem que o conteúdo da nova rota já esteja no DOM.
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          const hash = window.location.hash.slice(1);
          if (hash) {
            const target = document.getElementById(decodeURIComponent(hash));
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
          }
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });
      });
    };

    positionPage();
    window.addEventListener("hashchange", positionPage);
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.removeEventListener("hashchange", positionPage);
    };
  }, [pathname]);

  return null;
}
