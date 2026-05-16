import { type Language, useLanguage } from "../i18n/LanguageContext";

const LANGS: { code: Language; label: string; script: string }[] = [
  { code: "te", label: "Telugu", script: "తె" },
  { code: "en", label: "English", script: "EN" },
  { code: "hi", label: "Hindi", script: "हि" },
];

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <fieldset
      className="flex items-center gap-0.5 rounded-full border border-border p-0.5"
      style={{ background: "oklch(0.18 0.007 95)" }}
      aria-label="Select language"
    >
      {LANGS.map(({ code, label, script }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-label={label}
          aria-pressed={lang === code}
          data-ocid={`lang.${code}.toggle`}
          className="px-2.5 py-1 rounded-full text-xs font-display font-bold tracking-wide transition-all duration-200"
          style={{
            background: lang === code ? "oklch(0.60 0.14 195)" : "transparent",
            color:
              lang === code ? "oklch(0.13 0.007 95)" : "oklch(0.60 0.14 195)",
          }}
        >
          {script}
        </button>
      ))}
    </fieldset>
  );
}
