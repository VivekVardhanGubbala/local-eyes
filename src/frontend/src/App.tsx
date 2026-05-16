import { Toaster } from "@/components/ui/sonner";
import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { AndhraPradeshMapCard } from "./components/AndhraPradeshMapCard";
import { BasicFirstAidCard } from "./components/BasicFirstAidCard";
import { ChatSection } from "./components/ChatSection";
import { ClothingGuideCard } from "./components/ClothingGuideCard";
import { DisasterKitCard } from "./components/DisasterKitCard";
import { ElectricityGuideCard } from "./components/ElectricityGuideCard";
import { EmergencyContactsCard } from "./components/EmergencyContactsCard";
import { FeaturesSection } from "./components/FeaturesSection";
import { FirstAidCard } from "./components/FirstAidCard";
import { FoodGuideCard } from "./components/FoodGuideCard";
import { Footer } from "./components/Footer";
import { HazardCard } from "./components/HazardCard";
import { Hero } from "./components/Hero";
import { HideoutGuideCard } from "./components/HideoutGuideCard";
import { Nav } from "./components/Nav";
import NetworkStatusBanner from "./components/NetworkStatusBanner";
import { RadioGuideCard } from "./components/RadioGuideCard";
import { SituationAnalyzer } from "./components/SituationAnalyzer";
import { SurvivalCard } from "./components/SurvivalCard";
import { TriageCard } from "./components/TriageCard";
import { VijayawadaMapCard } from "./components/VijayawadaMapCard";
import { WaterPurificationCard } from "./components/WaterPurificationCard";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";

const evacuationSigns = ["evac1", "evac2", "evac3", "evac4", "evac5"];

function AppContent() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip-to-content: visible on focus, hidden otherwise */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-cyan-500 focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-bold"
      >
        Skip to main content
      </a>
      <NetworkStatusBanner />
      <header>
        <Nav />
      </header>
      <main id="main-content">
        <Hero />

        <section
          id="dashboard"
          aria-labelledby="dashboard-heading"
          className="py-16 px-4"
          style={{ background: "oklch(0.15 0.007 95)" }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-border text-muted-foreground">
                {t("dashboard.label")}
              </span>
              <h2
                id="dashboard-heading"
                className="font-display font-extrabold uppercase text-3xl md:text-4xl text-foreground mt-4 tracking-tight"
              >
                {t("dashboard.title1")}{" "}
                <span style={{ color: "oklch(0.82 0.15 85)" }}>
                  {t("dashboard.title2")}
                </span>{" "}
                {t("dashboard.title3")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {/* Emergency Contacts — first, full width */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="md:col-span-2"
              >
                <EmergencyContactsCard />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="md:col-span-2"
              >
                <SituationAnalyzer />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <FirstAidCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <SurvivalCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <HazardCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <TriageCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="md:col-span-2"
              >
                <FoodGuideCard />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-border text-muted-foreground">
                  {t("dashboard.survival_label")}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "oklch(0.29 0.007 95)" }}
                />
              </div>
              <h3 className="font-display font-extrabold uppercase text-2xl md:text-3xl text-foreground mt-3 tracking-tight">
                {t("dashboard.survival_title1")}{" "}
                <span style={{ color: "oklch(0.65 0.18 145)" }}>
                  {t("dashboard.survival_title2")}
                </span>{" "}
                {t("dashboard.survival_title3")}
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6 rounded-xl border p-4"
              style={{
                background: "oklch(0.48 0.16 25 / 0.12)",
                borderColor: "oklch(0.48 0.16 25 / 0.45)",
              }}
              data-ocid="evacuation.panel"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.65 0.2 25)" }}
                />
                <p
                  className="text-xs font-display font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.65 0.2 25)" }}
                >
                  {t("dashboard.evacuation_title")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {evacuationSigns.map((key) => (
                  <div key={key} className="flex items-start gap-2">
                    <span
                      className="text-sm shrink-0"
                      style={{ color: "oklch(0.65 0.2 25)" }}
                    >
                      ⚠
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "oklch(0.88 0.01 95)" }}
                    >
                      {t(`dashboard.${key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <BasicFirstAidCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <ElectricityGuideCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <RadioGuideCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <WaterPurificationCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ClothingGuideCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <DisasterKitCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-2"
              >
                <HideoutGuideCard />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-border text-muted-foreground">
                  {t("dashboard.maps_label")}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "oklch(0.29 0.007 95)" }}
                />
              </div>
              <h3 className="font-display font-extrabold uppercase text-2xl md:text-3xl text-foreground mt-3 tracking-tight">
                {t("dashboard.maps_title1")}{" "}
                <span style={{ color: "oklch(0.60 0.14 195)" }}>
                  {t("dashboard.maps_title2")}
                </span>{" "}
                {t("dashboard.maps_title3")}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <AndhraPradeshMapCard />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <VijayawadaMapCard />
              </motion.div>
            </div>
          </div>
        </section>

        <FeaturesSection />

        <section id="chat" aria-labelledby="chat-heading">
          <ChatSection />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
