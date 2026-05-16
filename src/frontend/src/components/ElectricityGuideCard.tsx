import { ScrollArea } from "@/components/ui/scroll-area";
import { Battery, Radio, Smartphone, Sun, Wind, Zap } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const sections = [
  {
    icon: <Sun className="w-4 h-4" />,
    title: "Solar Panels",
    color: "oklch(0.82 0.15 85)",
    items: [
      "Use fold-out 10–20W portable solar panel",
      "Place in direct sunlight — avoid shadows even partially",
      "Connect to power bank via USB-C or DC cable",
      "Full charge takes 4–6 hours in bright sunlight",
      "Angle panel perpendicular to sun (not flat)",
    ],
  },
  {
    icon: <Battery className="w-4 h-4" />,
    title: "Portable Power Banks",
    color: "oklch(0.65 0.18 145)",
    items: [
      "Carry 20,000mAh+ capacity minimum",
      "Fully charge BEFORE a disaster or evacuation",
      "Powers a smartphone 4–5 full charges",
      "Store in cool, dry place — heat degrades capacity",
      "Use fast-charge capable banks for solar pairing",
    ],
  },
  {
    icon: <Wind className="w-4 h-4" />,
    title: "Hand-Crank Generators",
    color: "oklch(0.74 0.12 60)",
    items: [
      "1 minute cranking = 3–5 minutes of phone use",
      "Crank slowly and steadily (not fast — wastes energy)",
      "Keep the unit dry — moisture damages the dynamo",
      "Best for radios and LED torches (low power)",
      "Some models include built-in radio + solar backup",
    ],
  },
  {
    icon: <Smartphone className="w-4 h-4" />,
    title: "Power Saving Tips",
    color: "oklch(0.60 0.14 195)",
    items: [
      "Airplane mode saves ~80% battery — enable when not signaling",
      "Lower screen brightness to minimum usable level",
      "Disable Bluetooth, WiFi, GPS when not needed",
      "Close background apps — use one app at a time",
      "Charge devices in rotation — don't charge multiple at once",
    ],
  },
];

const priority = [
  {
    rank: 1,
    device: "Emergency Radio",
    icon: <Radio className="w-3.5 h-3.5" />,
    reason: "Critical for news and signaling",
  },
  {
    rank: 2,
    device: "Torch / Headlamp",
    icon: <Zap className="w-3.5 h-3.5" />,
    reason: "Safety at night",
  },
  {
    rank: 3,
    device: "Phone",
    icon: <Smartphone className="w-3.5 h-3.5" />,
    reason: "Navigation, comms when available",
  },
];

export function ElectricityGuideCard() {
  const { t } = useLanguage();
  return (
    <section
      className="rounded-xl border border-border card-glow h-full"
      style={{ background: "oklch(0.22 0.007 95)" }}
      aria-labelledby="electricity-heading"
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Zap
            className="w-4 h-4"
            style={{ color: "oklch(0.82 0.15 85)" }}
            aria-hidden="true"
          />
          <h2
            id="electricity-heading"
            className="font-display font-bold text-sm uppercase tracking-widest text-foreground"
          >
            {t("electricity.title")}
          </h2>
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.82 0.15 85 / 0.15)",
            color: "oklch(0.82 0.15 85)",
            border: "1px solid oklch(0.82 0.15 85 / 0.3)",
          }}
        >
          {t("electricity.badge")}
        </span>
      </div>

      <ScrollArea className="h-64 px-4">
        <div className="space-y-3 pb-4 pr-2">
          {sections.map((sec) => (
            <article
              key={sec.title}
              className="rounded-lg p-3"
              style={{ background: "oklch(0.15 0.007 95)" }}
              aria-label={sec.title}
            >
              <div
                className="flex items-center gap-2 mb-2"
                style={{ color: sec.color }}
              >
                <span aria-hidden="true">{sec.icon}</span>
                <h3 className="text-xs font-bold uppercase tracking-wide">
                  {sec.title}
                </h3>
              </div>
              <ul className="space-y-1" aria-label={`${sec.title} tips`}>
                {sec.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs flex items-start gap-1.5"
                    style={{ color: "oklch(0.74 0.015 80)" }}
                  >
                    <span
                      className="shrink-0 mt-0.5"
                      style={{ color: sec.color }}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <div
            className="rounded-lg p-3"
            style={{
              background: "oklch(0.15 0.007 95)",
              border: "1px solid oklch(0.82 0.15 85 / 0.2)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide mb-2"
              style={{ color: "oklch(0.82 0.15 85)" }}
            >
              {t("electricity.priority")}
            </p>
            <div className="space-y-1.5">
              {priority.map((p) => (
                <div key={p.rank} className="flex items-center gap-2 text-xs">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                    style={{
                      background: "oklch(0.82 0.15 85)",
                      color: "oklch(0.13 0.007 95)",
                    }}
                  >
                    {p.rank}
                  </span>
                  <span
                    style={{
                      color:
                        p.rank === 1
                          ? "oklch(0.82 0.15 85)"
                          : "oklch(0.74 0.015 80)",
                    }}
                  >
                    {p.device}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.55 0.01 95)" }}
                  >
                    — {p.reason}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </section>
  );
}
