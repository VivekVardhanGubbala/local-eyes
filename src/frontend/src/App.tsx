import { Toaster } from "@/components/ui/sonner";
import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { AIAssistant } from "./components/AIAssistant";
import { AndhraPradeshMapCard } from "./components/AndhraPradeshMapCard";
import { BasicFirstAidCard } from "./components/BasicFirstAidCard";
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
import { RadioGuideCard } from "./components/RadioGuideCard";
import { SurvivalCard } from "./components/SurvivalCard";
import { TriageCard } from "./components/TriageCard";
import { VijayawadaMapCard } from "./components/VijayawadaMapCard";
import { WaterPurificationCard } from "./components/WaterPurificationCard";

const evacuationSigns = [
  "Rising water entering ground floor",
  "Smell of gas or smoke",
  "Cracks spreading in walls or floors",
  "Loud rumbling or roaring sounds",
  "Official evacuation order issued",
];

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />

        <section
          id="dashboard"
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
                Offline Dashboard
              </span>
              <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-foreground mt-4 tracking-tight">
                Emergency{" "}
                <span style={{ color: "oklch(0.82 0.15 85)" }}>Control</span>{" "}
                Center
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
                  Survival Essentials
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "oklch(0.29 0.007 95)" }}
                />
              </div>
              <h3 className="font-display font-extrabold uppercase text-2xl md:text-3xl text-foreground mt-3 tracking-tight">
                Critical{" "}
                <span style={{ color: "oklch(0.65 0.18 145)" }}>Survival</span>{" "}
                Knowledge
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
                  Signs You Need Immediate Evacuation
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {evacuationSigns.map((sign) => (
                  <div key={sign} className="flex items-start gap-2">
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
                      {sign}
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
                  Maps
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "oklch(0.29 0.007 95)" }}
                />
              </div>
              <h3 className="font-display font-extrabold uppercase text-2xl md:text-3xl text-foreground mt-3 tracking-tight">
                Offline{" "}
                <span style={{ color: "oklch(0.60 0.14 195)" }}>Regional</span>{" "}
                Maps
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
      </main>

      <Footer />
      <AIAssistant />
      <Toaster />
    </div>
  );
}
