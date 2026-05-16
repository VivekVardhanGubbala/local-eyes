import { Eye, Wifi, WifiOff } from "lucide-react";
import useNetworkStatus from "../hooks/useNetworkStatus";
import { LanguageSelector } from "./LanguageSelector";

const navLinks = [
  {
    label: "Dashboard",
    href: "#dashboard",
    ariaLabel: "Go to dashboard section",
  },
  {
    label: "Survival Guide",
    href: "#survival",
    ariaLabel: "Go to survival guide section",
  },
  { label: "Hazards", href: "#hazards", ariaLabel: "Go to hazards section" },
  { label: "Triage", href: "#triage", ariaLabel: "Go to triage section" },
  {
    label: "AI Chat",
    href: "#chat",
    ariaLabel: "Go to AI assistant chat section",
  },
];

export function Nav() {
  const { isOnline } = useNetworkStatus();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav
        className="flex items-center gap-6 px-5 py-3 rounded-full border border-border"
        style={{
          background: "oklch(0.22 0.007 95 / 0.95)",
          backdropFilter: "blur(12px)",
        }}
        aria-label="Main navigation"
      >
        <a
          href="/"
          className="flex items-center gap-2 text-foreground no-underline"
          aria-label="Local-Eyes — disaster assistance app, go to home"
          data-ocid="nav.link"
        >
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <Eye
              className="w-4 h-4"
              aria-hidden="true"
              style={{ color: "oklch(0.13 0.007 95)" }}
            />
          </div>
          <span className="font-display font-bold text-sm tracking-wider uppercase text-foreground">
            Local-Eyes
          </span>
        </a>

        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
              aria-label={link.ariaLabel}
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <LanguageSelector />

        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs font-body font-semibold tracking-widest uppercase transition-colors duration-300"
          aria-live="polite"
          aria-atomic="true"
          data-ocid="nav.toggle"
        >
          <span
            className="pulse-dot w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              background: isOnline
                ? "oklch(0.65 0.18 145)"
                : "oklch(0.65 0.18 25)",
            }}
            aria-hidden="true"
          />
          {isOnline ? (
            <Wifi
              className="w-3 h-3 transition-opacity duration-300"
              style={{ color: "oklch(0.65 0.18 145)" }}
              aria-hidden="true"
            />
          ) : (
            <WifiOff
              className="w-3 h-3 transition-opacity duration-300"
              style={{ color: "oklch(0.65 0.18 25)" }}
              aria-hidden="true"
            />
          )}
          <span
            className="transition-colors duration-300"
            style={{
              color: isOnline ? "oklch(0.65 0.18 145)" : "oklch(0.65 0.18 25)",
            }}
          >
            {isOnline ? "ONLINE" : "OFFLINE"}
          </span>
        </div>
      </nav>
    </header>
  );
}
