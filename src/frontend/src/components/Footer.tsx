import { Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  return (
    <footer
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
            <div className="flex flex-wrap gap-4 text-sm font-body text-muted-foreground">
              {["Download", "Contact", "Privacy Policy", "About"].map(
                (link) => (
                  <a
                    key={link}
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                ),
              )}
            </div>
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
            >
              <Phone
                className="w-4 h-4"
                style={{ color: "oklch(0.70 0.14 30)" }}
              />
            </div>
            <div>
              <p
                className="font-display font-bold uppercase tracking-wide text-sm"
                style={{ color: "oklch(0.70 0.14 30)" }}
              >
                Emergency?
              </p>
              <p
                className="font-display font-extrabold text-xl"
                style={{ color: "oklch(0.70 0.14 30)" }}
              >
                Call 911
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-body text-muted-foreground">
          <p>
            © {year}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              className="hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p>
            Local-Eyes is not a substitute for professional medical or emergency
            services.
          </p>
        </div>
      </div>
    </footer>
  );
}
