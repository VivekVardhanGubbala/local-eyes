import { Battery, Map as MapIcon, ShieldCheck, WifiOff } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: WifiOff,
    title: "Local AI",
    subtitle: "No Internet",
    desc: "Quantized SLM runs entirely on-device. Zero cloud dependency. Works when towers are down.",
    color: "oklch(0.82 0.15 85)",
  },
  {
    icon: Battery,
    title: "Rugged & Low Power",
    subtitle: "Edge Ready",
    desc: "Optimized for Raspberry Pi, Android, and low-power devices. Runs for days on a battery pack.",
    color: "oklch(0.65 0.18 145)",
  },
  {
    icon: MapIcon,
    title: "Maps & Knowledge",
    subtitle: "Offline First",
    desc: "Pre-loaded topographic maps, first-aid protocols, and survival guides — always accessible.",
    color: "oklch(0.55 0.12 220)",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    subtitle: "No Data Leaves",
    desc: "All processing happens on your device. No logs, no telemetry, no servers involved.",
    color: "oklch(0.70 0.14 110)",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="topo-bg py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-border text-muted-foreground">
            Built for Extremes
          </span>
          <h2
            id="features-heading"
            className="font-display font-extrabold uppercase text-3xl md:text-4xl text-foreground mt-4 tracking-tight"
          >
            Why <span style={{ color: "oklch(0.82 0.15 85)" }}>Local-Eyes</span>
            ?
          </h2>
        </motion.div>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 list-none">
          {FEATURES.map((feat, i) => (
            <motion.article
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border p-6 flex flex-col items-center text-center card-glow"
              style={{ background: "oklch(0.22 0.007 95)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background: `${feat.color.slice(0, -1)} / 0.15)`,
                  border: `1px solid ${feat.color.slice(0, -1)} / 0.3)`,
                }}
                aria-hidden="true"
              >
                <feat.icon
                  className="w-6 h-6"
                  style={{ color: feat.color }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display font-bold uppercase tracking-wide text-sm text-foreground mb-0.5">
                {feat.title}
              </h3>
              <p
                className="text-xs font-body uppercase tracking-wider mb-3"
                style={{ color: feat.color }}
              >
                {feat.subtitle}
              </p>
              <p className="text-xs font-body text-muted-foreground leading-relaxed">
                {feat.desc}
              </p>
            </motion.article>
          ))}
        </ul>
      </div>
    </section>
  );
}
