import { Phone } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  return (
    <footer
      aria-label="Local-Eyes footer"
      className="border-t border-border"
      style={{ background: "oklch(0.165 0.007 95)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold uppercase tracking-wider text-foreground">
                Local-Eyes
              </span>
              <span className="text-xs text-muted-foreground">
                v1.0 Offline AI
              </span>
            </div>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-4 text-sm font-body text-muted-foreground list-none p-0 m-0">
                {["download", "contact", "privacy", "about"].map((key) => (
                  <li key={key}>
                    <a
                      href={`/${key.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-foreground transition-colors"
                      aria-label={`${t(`footer.${key}`)} page`}
                    >
                      {t(`footer.${key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl border"
            style={{
              background: "oklch(0.48 0.16 25 / 0.12)",
              borderColor: "oklch(0.48 0.16 25 / 0.35)",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.48 0.16 25 / 0.2)" }}
              aria-hidden="true"
            >
              <Phone
                className="w-4 h-4"
                style={{ color: "oklch(0.70 0.14 30)" }}
                aria-hidden="true"
              />
            </div>
            <div>
              <p
                className="font-display font-bold uppercase tracking-wide text-sm"
                style={{ color: "oklch(0.70 0.14 30)" }}
              >
                {t("footer.emergency_label")}
              </p>
              <p
                className="font-display font-extrabold text-xl"
                style={{ color: "oklch(0.70 0.14 30)" }}
              >
                {t("footer.emergency_number")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-body text-muted-foreground">
          <p>
            © {year}. {t("footer.built_with")}{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              className="hover:text-foreground transition-colors"
              aria-label="caffeine.ai (opens in new tab)"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
          <p>{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
