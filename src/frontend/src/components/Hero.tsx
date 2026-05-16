import { Button } from "@/components/ui/button";
import { ArrowDown, Cpu, MapPin, Radio, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const features = [
    {
      icon: ShieldCheck,
      labelKey: "hero.feat_firstaid",
      color: "oklch(0.48 0.16 25)",
    },
    {
      icon: MapPin,
      labelKey: "hero.feat_hazards",
      color: "oklch(0.82 0.15 85)",
    },
    {
      icon: Radio,
      labelKey: "hero.feat_offline",
      color: "oklch(0.65 0.18 145)",
    },
    { icon: Cpu, labelKey: "hero.feat_localai", color: "oklch(0.55 0.12 220)" },
  ];

  return (
    <section className="topo-bg relative min-h-screen flex items-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, oklch(0.82 0.15 85 / 0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 20% 50%, oklch(0.48 0.16 25 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-body tracking-widest uppercase mb-6"
            style={{ color: "oklch(0.82 0.15 85)" }}
          >
            <Radio className="w-3 h-3" aria-hidden="true" />
            {t("hero.badge")}
          </div>

          <h1
            className="font-display font-extrabold uppercase leading-[0.9] tracking-tight mb-6 text-foreground"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {t("hero.title1")}
            <br />
            <span style={{ color: "oklch(0.82 0.15 85)" }}>
              {t("hero.title2")}
            </span>
            <br />
            {t("hero.title3")}
            <br />
            <span className="text-muted-foreground">{t("hero.title4")}</span>
          </h1>

          <p className="font-body text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="font-display font-bold uppercase tracking-wider rounded-full px-8"
              style={{
                background: "oklch(0.82 0.15 85)",
                color: "oklch(0.13 0.007 95)",
              }}
              onClick={() =>
                document
                  .getElementById("dashboard")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Explore the Local-Eyes emergency dashboard"
              data-ocid="hero.primary_button"
            >
              {t("hero.cta_explore")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-display font-bold uppercase tracking-wider rounded-full px-8 border-border text-foreground hover:bg-accent"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Learn more about Local-Eyes features"
              data-ocid="hero.secondary_button"
            >
              {t("hero.cta_learn")}
            </Button>
          </div>
        </motion.div>

        {/* Right: Device Mockup Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center lg:justify-end"
        >
          <div
            className="relative w-72 rounded-3xl border border-border p-1 shadow-2xl"
            style={{ background: "oklch(0.22 0.007 95)" }}
          >
            {/* Phone notch */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-20 h-1.5 rounded-full bg-border" />
            </div>
            {/* Screen */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "oklch(0.165 0.007 95)" }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Cpu
                        className="w-3 h-3"
                        style={{ color: "oklch(0.13 0.007 95)" }}
                      />
                    </div>
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-foreground">
                      {t("hero.feat_localai")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="pulse-dot w-1.5 h-1.5 rounded-full inline-block"
                      style={{ background: "oklch(0.65 0.18 145)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.18 145)" }}
                    >
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Chat bubble */}
                <div
                  className="rounded-2xl rounded-tl-sm p-3 mb-3"
                  style={{ background: "oklch(0.25 0.007 95)" }}
                >
                  <p className="text-xs font-body text-muted-foreground">
                    {t("hero.chat_q")}
                  </p>
                </div>
                <div
                  className="rounded-2xl rounded-tr-sm p-3 mb-3 ml-4"
                  style={{
                    background: "oklch(0.82 0.15 85 / 0.15)",
                    border: "1px solid oklch(0.82 0.15 85 / 0.25)",
                  }}
                >
                  <p
                    className="text-xs font-body"
                    style={{ color: "oklch(0.92 0.018 82)" }}
                  >
                    {t("hero.chat_a")}
                  </p>
                </div>

                {/* Mini feature list */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {features.map(({ icon: Icon, labelKey, color }) => (
                    <div
                      key={labelKey}
                      className="flex items-center gap-1.5 p-2 rounded-lg border border-border"
                      style={{ background: "oklch(0.22 0.007 95)" }}
                    >
                      <Icon
                        className="w-3 h-3 flex-shrink-0"
                        style={{ color }}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-body text-muted-foreground truncate">
                        {t(labelKey)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.8,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <ArrowDown
          className="w-5 h-5 text-muted-foreground"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
