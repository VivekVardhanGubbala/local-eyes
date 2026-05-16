import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "te" | "hi";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

import { translations } from "./translations";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("localeyes_lang") as Language | null;
      return stored === "te" || stored === "hi" || stored === "en"
        ? stored
        : "en";
    } catch {
      return "en";
    }
  });

  function setLang(newLang: Language) {
    setLangState(newLang);
    try {
      localStorage.setItem("localeyes_lang", newLang);
    } catch {}
  }

  // Update html lang attribute reactively
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function t(key: string): string {
    const parts = key.split(".");

    let node: any = translations[lang];
    for (const part of parts) {
      if (node == null) return key;
      node = node[part];
    }
    return typeof node === "string" ? node : key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
