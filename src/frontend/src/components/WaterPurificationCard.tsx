import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Droplets } from "lucide-react";

const methods = [
  {
    num: 1,
    title: "Boiling",
    color: "oklch(0.65 0.2 25)",
    time: "~15 min",
    steps: [
      "Collect water in a clean metal or heat-safe container",
      "Filter through clean cloth to remove debris",
      "Bring to a full rolling boil on fire or stove",
      "Boil for 1 minute (3 minutes if above 2000m altitude)",
      "Cool with lid on — do not open until drinkable temp",
      "Store in clean covered container. Safe within 24 hrs.",
    ],
  },
  {
    num: 2,
    title: "Solar Disinfection (SODIS)",
    color: "oklch(0.82 0.15 85)",
    time: "6–12 hrs",
    steps: [
      "Use clear PET plastic bottles or glass bottles",
      "Filter water through cloth first (must be clear/pale)",
      "Fill bottles completely — no air space",
      "Place on reflective surface in full direct sunlight",
      "Leave 6 hours (12+ hours if cloudy or partly cloudy)",
      "Do NOT use if water appears turbid or brown",
      "Mark bottle 'SAFE' with marker once done",
    ],
  },
  {
    num: 3,
    title: "Chemical Treatment (Tablets)",
    color: "oklch(0.65 0.18 145)",
    time: "30 min–4 hrs",
    steps: [
      "Filter visible debris from water through cloth",
      "Drop 1 chlorine or iodine tablet per litre (read pack)",
      "Stir and wait 30 minutes before drinking",
      "For iodine in cold water: wait 4 hours",
      "Mild chemical taste is normal and safe",
      "Pregnant women: avoid iodine tabs — use chlorine",
    ],
  },
  {
    num: 4,
    title: "DIY Sand Filter",
    color: "oklch(0.60 0.14 195)",
    time: "~20 min (prep)",
    steps: [
      "Cut a plastic bottle in half (inverted top = funnel)",
      "Layer from bottom upward: large gravel, small stones, coarse sand, fine sand, folded cloth",
      "Pour dirty water through top layer slowly",
      "Collect filtered water in clean container below",
      "IMPORTANT: MUST follow with boiling or chemical treatment",
      "Sand filter removes debris only — not bacteria or viruses",
    ],
  },
];

export function WaterPurificationCard() {
  return (
    <div
      className="rounded-xl border border-border card-glow h-full"
      style={{ background: "oklch(0.22 0.007 95)" }}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <Droplets
            className="w-4 h-4"
            style={{ color: "oklch(0.60 0.14 195)" }}
          />
          <span className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            Water Purification
          </span>
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.60 0.14 195 / 0.15)",
            color: "oklch(0.60 0.14 195)",
            border: "1px solid oklch(0.60 0.14 195 / 0.3)",
          }}
        >
          Step-by-Step
        </span>
      </div>

      <div className="px-4 pb-2">
        <div
          className="rounded-lg px-3 py-2 flex items-start gap-2 mb-3"
          style={{
            background: "oklch(0.48 0.16 25 / 0.15)",
            border: "1px solid oklch(0.48 0.16 25 / 0.35)",
          }}
        >
          <AlertTriangle
            className="w-3.5 h-3.5 shrink-0 mt-0.5"
            style={{ color: "oklch(0.65 0.2 25)" }}
          />
          <p className="text-xs" style={{ color: "oklch(0.65 0.2 25)" }}>
            <strong>Never drink floodwater directly.</strong> Floodwater
            contains sewage, chemicals, and disease-causing organisms.
          </p>
        </div>
      </div>

      <ScrollArea className="h-60 px-4">
        <div className="space-y-3 pb-4 pr-2">
          {methods.map((m) => (
            <div
              key={m.num}
              className="rounded-lg p-3"
              style={{ background: "oklch(0.15 0.007 95)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                    style={{
                      background: m.color,
                      color: "oklch(0.13 0.007 95)",
                    }}
                  >
                    {m.num}
                  </span>
                  <p
                    className="text-xs font-bold uppercase tracking-wide"
                    style={{ color: m.color }}
                  >
                    {m.title}
                  </p>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${m.color.slice(0, -1)} / 0.15)`,
                    color: m.color,
                  }}
                >
                  {m.time}
                </span>
              </div>
              <ol className="space-y-1">
                {m.steps.map((step) => (
                  <li key={step} className="flex gap-2 text-xs">
                    <span
                      className="shrink-0 font-bold"
                      style={{ color: m.color }}
                    >
                      ›
                    </span>
                    <span
                      style={{
                        color: step.startsWith("IMPORTANT")
                          ? "oklch(0.65 0.2 25)"
                          : "oklch(0.74 0.015 80)",
                      }}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
