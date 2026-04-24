import { Eye, WifiOff } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Survival Guide", href: "#survival" },
  { label: "Hazards", href: "#hazards" },
  { label: "Triage", href: "#triage" },
];

export function Nav() {
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
          data-ocid="nav.link"
        >
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <Eye
              className="w-4 h-4"
              style={{ color: "oklch(0.13 0.007 95)" }}
            />
          </div>
          <span className="font-display font-bold text-sm tracking-wider uppercase text-foreground">
            Local-Eyes
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs font-body font-semibold tracking-widest uppercase">
          <span
            className="pulse-dot w-2 h-2 rounded-full"
            style={{ background: "oklch(0.65 0.18 145)" }}
          />
          <WifiOff
            className="w-3 h-3"
            style={{ color: "oklch(0.65 0.18 145)" }}
          />
          <span style={{ color: "oklch(0.65 0.18 145)" }}>OFFLINE</span>
        </div>
      </nav>
    </header>
  );
}
