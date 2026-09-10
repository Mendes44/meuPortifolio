"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Language } from "@/lib/translations";

const LanguageContext = createContext({ language: "pt" as Language, setLanguage: (_value: Language) => {} });
const originalTexts = new WeakMap<Node, string>();
const originalPlaceholders = new WeakMap<Element, string>();

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-language");
    const detected = navigator.language.toLowerCase().startsWith("en") ? "en" : navigator.language.toLowerCase().startsWith("es") ? "es" : "pt";
    setLanguage(saved === "pt" || saved === "en" || saved === "es" ? saved : detected);
  }, []);
  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
  }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }

// Traduz nós estáticos sem enviar conteúdo ou dados do visitante a terceiros.
export function AutoTranslate() {
  const { language } = useLanguage();
  useEffect(() => {
    const translate = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.parentElement?.closest("[data-no-translate],script,style")) continue;
        const original = originalTexts.get(node) ?? node.nodeValue ?? "";
        originalTexts.set(node, original);
        const key = original.trim();
        const value = language === "pt" ? key : translations[key]?.[language];
        if (value) node.nodeValue = original.replace(key, value);
      }
      document.querySelectorAll<HTMLElement>("[placeholder]").forEach((element) => {
        const original = originalPlaceholders.get(element) ?? element.getAttribute("placeholder") ?? "";
        originalPlaceholders.set(element, original);
        element.setAttribute("placeholder", language === "pt" ? original : translations[original]?.[language] ?? original);
      });
    };
    translate();
    const observer = new MutationObserver(translate);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);
  return null;
}
