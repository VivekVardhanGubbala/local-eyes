import { ScrollArea } from "@/components/ui/scroll-area";
import { Radio } from "lucide-react";

const freqs = [
  {
    freq: "156.800 MHz (Ch 16)",
    use: "International marine distress — universal rescue channel",
  },
  { freq: "121.5 MHz", use: "Aviation emergency — monitored by aircraft" },
  {
    freq: "27.065 MHz (CB Ch 9)",
    use: "CB radio emergency channel — ground-level range",
  },
  { freq: "100–108 MHz FM", use: "Local civil defense & emergency broadcasts" },
  {
    freq: "AM Broadcast",
    use: "Government disaster bulletins when FM is down",
  },
];

const operateSteps = [
  "Power on and let radio initialize (5–10 seconds)",
  "Set to emergency channel (see frequencies above)",
  "Adjust squelch until static just disappears",
  "Listen for at least 2 minutes before transmitting",
  "Press PTT (Push-To-Talk) to speak, release to listen",
  "Speak clearly, slowly — keep messages short",
];

const helpScript = [
  "MAYDAY MAYDAY MAYDAY (or: EMERGENCY EMERGENCY EMERGENCY)",
  "This is [your name]",
  "Location: [describe nearest landmark, street, or coordinates]",
  "Nature of emergency: [flood / injury / fire / trapped]",
  "Number of people: [count]",
  "We need: [medical help / evacuation / food & water]",
  "Repeat the above 3 times, then wait 2 minutes for reply",
];

const morseLetters = [
  { signal: "S", morse: "· · ·", desc: "3 short signals" },
  { signal: "O", morse: "— — —", desc: "3 long signals" },
  { signal: "S2", morse: "· · ·", desc: "3 short signals" },
];

const batteryTips = [
  "Turn radio OFF when not actively listening",
  "Check channels every 30 minutes on schedule",
  "Use earphones to reduce speaker power draw",
  "Keep spare alkaline batteries in waterproof bag",
  "Rechargeable NiMH batteries: pair with solar panel",
];

export function RadioGuideCard() {
  return (
    <div
      className="rounded-xl border border-border card-glow h-full"
      style={{ background: "oklch(0.22 0.007 95)" }}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Radio
            className="w-4 h-4"
            style={{ color: "oklch(0.60 0.14 195)" }}
          />
          <span className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            Radio Communication
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
          Comms
        </span>
      </div>

      <ScrollArea className="h-64 px-4">
        <div className="space-y-3 pb-4 pr-2">
          {/* Operation */}
          <div
            className="rounded-lg p-3"
            style={{ background: "oklch(0.15 0.007 95)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide mb-2"
              style={{ color: "oklch(0.60 0.14 195)" }}
            >
              Basic Operation
            </p>
            <ol className="space-y-1">
              {operateSteps.map((s) => (
                <li key={s} className="flex gap-2 text-xs">
                  <span
                    className="shrink-0 font-bold"
                    style={{ color: "oklch(0.82 0.15 85)" }}
                  >
                    ›
                  </span>
                  <span style={{ color: "oklch(0.74 0.015 80)" }}>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Frequencies */}
          <div
            className="rounded-lg p-3"
            style={{ background: "oklch(0.15 0.007 95)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide mb-2"
              style={{ color: "oklch(0.65 0.18 145)" }}
            >
              Emergency Frequencies
            </p>
            <div className="space-y-1.5">
              {freqs.map((f) => (
                <div key={f.freq}>
                  <span className="text-xs font-bold text-foreground">
                    {f.freq}
                  </span>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.74 0.015 80)" }}
                  >
                    {f.use}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Help Script */}
          <div
            className="rounded-lg p-3"
            style={{
              background: "oklch(0.15 0.007 95)",
              border: "1px solid oklch(0.48 0.16 25 / 0.3)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide mb-2"
              style={{ color: "oklch(0.65 0.2 25)" }}
            >
              Calling for Help — Script
            </p>
            <ol className="space-y-0.5">
              {helpScript.map((line) => (
                <li
                  key={line}
                  className="text-xs"
                  style={{
                    color: line.startsWith("MAYDAY")
                      ? "oklch(0.65 0.2 25)"
                      : "oklch(0.74 0.015 80)",
                  }}
                >
                  {line}
                </li>
              ))}
            </ol>
          </div>

          {/* Morse SOS */}
          <div
            className="rounded-lg p-3"
            style={{ background: "oklch(0.15 0.007 95)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide mb-2"
              style={{ color: "oklch(0.82 0.15 85)" }}
            >
              Morse SOS — · · · — — — · · ·
            </p>
            <div className="flex gap-2 mb-2">
              {morseLetters.map((m) => (
                <div key={m.signal} className="flex-1 text-center">
                  <p
                    className="text-base font-bold"
                    style={{ color: "oklch(0.82 0.15 85)" }}
                  >
                    {m.morse}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.74 0.015 80)" }}
                  >
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: "oklch(0.74 0.015 80)" }}>
              Use torch, mirror reflection, whistle, or tap on metal pipe to
              send SOS.
            </p>
          </div>

          {/* Battery tips */}
          <div
            className="rounded-lg p-3"
            style={{ background: "oklch(0.15 0.007 95)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide mb-2"
              style={{ color: "oklch(0.74 0.12 60)" }}
            >
              Battery Conservation
            </p>
            <ul className="space-y-1">
              {batteryTips.map((t) => (
                <li
                  key={t}
                  className="text-xs flex items-start gap-1.5"
                  style={{ color: "oklch(0.74 0.015 80)" }}
                >
                  <span
                    className="shrink-0"
                    style={{ color: "oklch(0.74 0.12 60)" }}
                  >
                    ›
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
