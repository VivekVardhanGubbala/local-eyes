import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Heart, Pill, Stethoscope, Wind } from "lucide-react";
import { useState } from "react";

const woundSteps = [
  {
    step: 1,
    title: "Clean Your Hands",
    desc: "Use sanitizer or wash with clean water before touching the wound.",
  },
  {
    step: 2,
    title: "Stop the Bleeding",
    desc: "Apply firm pressure with a clean cloth or bandage for 10-15 minutes. Don't peek.",
  },
  {
    step: 3,
    title: "Clean the Wound",
    desc: "Rinse gently with clean running water for 5+ minutes. Remove visible debris with clean tweezers.",
  },
  {
    step: 4,
    title: "Apply Antiseptic",
    desc: "Use Betadine, hydrogen peroxide, or clean alcohol on edges only — not deep inside.",
  },
  {
    step: 5,
    title: "Bandage",
    desc: "Cover with sterile gauze or clean cloth. Secure with bandage tape. Change daily.",
  },
  {
    step: 6,
    title: "Watch for Infection",
    desc: "Redness spreading, warmth, swelling, pus, or fever = infection. Seek medical help.",
  },
  {
    step: 7,
    title: "When to Seek Help",
    desc: "Deep cuts, animal bites, puncture wounds, won't stop bleeding after 20min, signs of infection.",
  },
];

const cprSteps = [
  {
    step: 1,
    action: "Check Response",
    detail: "Tap shoulder firmly and shout. Look for normal breathing.",
  },
  {
    step: 2,
    action: "Call for Help",
    detail:
      "Shout for help. Send someone to get medical aid or radio emergency channel.",
  },
  {
    step: 3,
    action: "Position",
    detail: "Lay person flat on back on firm surface. Kneel beside chest.",
  },
  {
    step: 4,
    action: "Chest Compressions",
    detail:
      "Place heel of hand on center of chest (lower half of breastbone). Lock other hand on top. Push DOWN hard 2 inches (5cm) at 100-120/min. Let chest fully rise.",
  },
  {
    step: 5,
    action: "Rescue Breaths (if trained)",
    detail:
      "Tilt head back, lift chin. Pinch nose. Give 2 breaths (1 sec each). Watch chest rise.",
  },
  {
    step: 6,
    action: "Repeat",
    detail:
      "30 compressions : 2 breaths cycle. Continue until breathing resumes or help arrives.",
  },
];

const cprDiffs = [
  {
    who: "Adult",
    compressions: "2 inches deep, 2 hands",
    ratio: "30:2",
    rate: "100-120/min",
  },
  {
    who: "Child (1–8 yr)",
    compressions: "2 inches, 1 or 2 hands",
    ratio: "30:2 (1 rescuer), 15:2 (2 rescuers)",
    rate: "100-120/min",
  },
  {
    who: "Infant (<1 yr)",
    compressions: "1.5 inches, 2 fingers",
    ratio: "30:2",
    rate: "100-120/min",
  },
];

const coldRemedies = [
  {
    remedy: "Steam Inhalation",
    how: "Boil water, lean over bowl (or pot) with towel over head, breathe steam for 10 min. Clears airways.",
  },
  {
    remedy: "Honey + Ginger Tea",
    how: "1 tsp honey + grated ginger in warm water. Soothes throat, natural antimicrobial.",
  },
  {
    remedy: "Warm Saltwater Gargle",
    how: "½ tsp salt in warm water, gargle 30 sec, 3x daily. Kills throat bacteria.",
  },
  {
    remedy: "Rest & Fluids",
    how: "Drink warm water/broth. Sleep 8+ hours. Avoid cold drinks.",
  },
  {
    remedy: "Warm Compress",
    how: "Warm cloth on forehead/chest for congestion and body aches.",
  },
];

const coldWarnings = [
  "Difficulty breathing or chest pain",
  "Lips or fingernails turning blue",
  "High fever (>103°F / 39.4°C)",
  "Symptoms lasting 10+ days",
  "Blood in mucus or cough",
];

const coldAvoid = [
  "Do NOT give Aspirin to children under 18",
  "Do NOT suppress productive cough (clearing mucus)",
  "Do NOT use leftover antibiotics without medical advice",
  "Do NOT eat dairy with chest congestion (thickens mucus)",
];

type MedRow = {
  ageGroup: string;
  medicine: string;
  dosage: string;
  frequency: string;
  note: string;
};

const feverMeds: MedRow[] = [
  {
    ageGroup: "Child < 5 yrs",
    medicine: "Paracetamol syrup 120mg/5ml",
    dosage: "2.5–5 ml",
    frequency: "Every 4–6 hrs",
    note: "⚠ DO NOT give Aspirin to children",
  },
  {
    ageGroup: "Child 6–12 yrs",
    medicine: "Paracetamol 250mg tablet",
    dosage: "1 tablet",
    frequency: "Every 4–6 hrs",
    note: "Max 4 doses/day",
  },
  {
    ageGroup: "Adult Male",
    medicine: "Paracetamol 500mg or Ibuprofen 400mg",
    dosage: "1–2 tablets",
    frequency: "Every 6–8 hrs",
    note: "Take Ibuprofen with food",
  },
  {
    ageGroup: "Adult Female",
    medicine: "Paracetamol 500mg (preferred if pregnant/breastfeeding)",
    dosage: "1 tablet",
    frequency: "Every 6 hrs",
    note: "Avoid Ibuprofen during pregnancy",
  },
  {
    ageGroup: "Elderly 60+",
    medicine: "Paracetamol 500mg only",
    dosage: "1 tablet",
    frequency: "Every 8 hrs",
    note: "Avoid Ibuprofen — monitor kidney function",
  },
];

const headacheMeds: MedRow[] = [
  {
    ageGroup: "Child < 5 yrs",
    medicine: "Paracetamol syrup 120mg/5ml",
    dosage: "2.5–5 ml",
    frequency: "Every 4–6 hrs",
    note: "Ensure hydration first. No Aspirin.",
  },
  {
    ageGroup: "Child 6–12 yrs",
    medicine: "Paracetamol 250mg",
    dosage: "1 tablet",
    frequency: "Every 4–6 hrs",
    note: "Offer water first — dehydration common cause",
  },
  {
    ageGroup: "Adult Male",
    medicine: "Paracetamol 500mg or Ibuprofen 400mg",
    dosage: "1–2 tablets",
    frequency: "Every 6–8 hrs",
    note: "Rest in dark/quiet room. Drink 500ml water first.",
  },
  {
    ageGroup: "Adult Female",
    medicine: "Paracetamol 500mg",
    dosage: "1 tablet",
    frequency: "Every 6 hrs",
    note: "Migraine: dark room, cold compress, avoid screens",
  },
  {
    ageGroup: "Elderly 60+",
    medicine: "Paracetamol 500mg only",
    dosage: "1 tablet",
    frequency: "Every 8 hrs",
    note: "Sudden severe headache = emergency — seek help",
  },
];

const bodyPainMeds: MedRow[] = [
  {
    ageGroup: "Child < 5 yrs",
    medicine: "Paracetamol syrup 120mg/5ml",
    dosage: "2.5–5 ml",
    frequency: "Every 4–6 hrs",
    note: "Warm compress on affected area",
  },
  {
    ageGroup: "Child 6–12 yrs",
    medicine: "Paracetamol 250mg",
    dosage: "1 tablet",
    frequency: "Every 4–6 hrs",
    note: "Rest; avoid strenuous activity",
  },
  {
    ageGroup: "Adult Male",
    medicine: "Ibuprofen 400mg (preferred for muscle pain)",
    dosage: "1 tablet",
    frequency: "Every 6–8 hrs",
    note: "Diclofenac gel for localized pain. Take with food.",
  },
  {
    ageGroup: "Adult Female",
    medicine: "Paracetamol 500mg or Ibuprofen 400mg",
    dosage: "1 tablet",
    frequency: "Every 6–8 hrs",
    note: "Diclofenac gel safe for adults. Avoid Ibuprofen if pregnant.",
  },
  {
    ageGroup: "Elderly 60+",
    medicine: "Paracetamol 500mg + warm compress",
    dosage: "1 tablet",
    frequency: "Every 8 hrs",
    note: "Avoid NSAIDs (Ibuprofen). Gentle stretching.",
  },
];

function MedTable({ rows }: { rows: MedRow[] }) {
  return (
    <ScrollArea className="h-52">
      <div className="space-y-2 pr-2">
        {rows.map((r) => (
          <div
            key={r.ageGroup}
            className="rounded-lg p-2.5 text-xs"
            style={{ background: "oklch(0.15 0.007 95)" }}
          >
            <p
              className="font-bold uppercase tracking-wide mb-1"
              style={{ color: "oklch(0.82 0.15 85)" }}
            >
              {r.ageGroup}
            </p>
            <p className="text-foreground font-medium">{r.medicine}</p>
            <div
              className="flex gap-4 mt-1"
              style={{ color: "oklch(0.74 0.015 80)" }}
            >
              <span>
                Dose: <span className="text-foreground">{r.dosage}</span>
              </span>
              <span>
                Freq: <span className="text-foreground">{r.frequency}</span>
              </span>
            </div>
            {r.note && (
              <p className="mt-1" style={{ color: "oklch(0.65 0.14 40)" }}>
                ⚠ {r.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function BasicFirstAidCard() {
  const [medTab, setMedTab] = useState("fever");

  return (
    <div
      className="rounded-xl border border-border card-glow h-full"
      style={{ background: "oklch(0.22 0.007 95)" }}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4" style={{ color: "oklch(0.65 0.2 10)" }} />
          <span className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            Basic First Aid
          </span>
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.65 0.2 10 / 0.15)",
            color: "oklch(0.65 0.2 10)",
            border: "1px solid oklch(0.65 0.2 10 / 0.3)",
          }}
        >
          Emergency
        </span>
      </div>

      <Tabs defaultValue="wounds" className="px-4 pb-4">
        <TabsList
          className="w-full h-8 p-0.5 mb-3"
          style={{ background: "oklch(0.15 0.007 95)" }}
        >
          {[
            {
              value: "wounds",
              label: "Wounds",
              icon: <Stethoscope className="w-3 h-3" />,
            },
            { value: "cpr", label: "CPR", icon: <Heart className="w-3 h-3" /> },
            {
              value: "cold",
              label: "Cold",
              icon: <Wind className="w-3 h-3" />,
            },
            {
              value: "meds",
              label: "Medicines",
              icon: <Pill className="w-3 h-3" />,
            },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              data-ocid={`firstaid.${tab.value}.tab`}
              className="flex-1 text-xs h-7 flex items-center gap-1 data-[state=active]:text-[oklch(0.13_0.007_95)] rounded-full transition-all"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Wounds */}
        <TabsContent value="wounds" className="mt-0">
          <ScrollArea className="h-52">
            <div className="space-y-2 pr-2">
              {woundSteps.map(({ step, title, desc }) => (
                <div
                  key={step}
                  className="flex gap-3 rounded-lg p-2.5"
                  style={{ background: "oklch(0.15 0.007 95)" }}
                >
                  <span
                    className="font-bold text-sm shrink-0 w-5 text-center"
                    style={{ color: "oklch(0.82 0.15 85)" }}
                  >
                    {step}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {title}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.74 0.015 80)" }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* CPR */}
        <TabsContent value="cpr" className="mt-0">
          <ScrollArea className="h-52">
            <div className="space-y-2 pr-2">
              {cprSteps.map(({ step, action, detail }) => (
                <div
                  key={step}
                  className="flex gap-3 rounded-lg p-2.5"
                  style={{ background: "oklch(0.15 0.007 95)" }}
                >
                  <span
                    className="font-bold text-sm shrink-0 w-5 text-center"
                    style={{ color: "oklch(0.65 0.2 10)" }}
                  >
                    {step}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {action}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.74 0.015 80)" }}
                    >
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
              <div
                className="rounded-lg p-2.5 mt-1"
                style={{
                  background: "oklch(0.15 0.007 95)",
                  border: "1px solid oklch(0.29 0.007 95)",
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-wide mb-2"
                  style={{ color: "oklch(0.82 0.15 85)" }}
                >
                  Adult vs Child Differences
                </p>
                <div className="space-y-1">
                  {cprDiffs.map((d) => (
                    <div key={d.who} className="text-xs">
                      <span className="font-semibold text-foreground">
                        {d.who}:{" "}
                      </span>
                      <span style={{ color: "oklch(0.74 0.015 80)" }}>
                        {d.compressions} · {d.ratio} · {d.rate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Cough / Cold */}
        <TabsContent value="cold" className="mt-0">
          <ScrollArea className="h-52">
            <div className="space-y-2 pr-2">
              <p
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: "oklch(0.65 0.18 145)" }}
              >
                Home Remedies
              </p>
              {coldRemedies.map((r) => (
                <div
                  key={r.remedy}
                  className="rounded-lg p-2"
                  style={{ background: "oklch(0.15 0.007 95)" }}
                >
                  <p className="text-xs font-semibold text-foreground">
                    {r.remedy}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.74 0.015 80)" }}
                  >
                    {r.how}
                  </p>
                </div>
              ))}
              <p
                className="text-xs font-bold uppercase tracking-wide mt-2"
                style={{ color: "oklch(0.65 0.2 25)" }}
              >
                Seek Help If:
              </p>
              {coldWarnings.map((w) => (
                <div
                  key={w}
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "oklch(0.65 0.2 25)" }}
                >
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  {w}
                </div>
              ))}
              <p
                className="text-xs font-bold uppercase tracking-wide mt-2"
                style={{ color: "oklch(0.60 0.14 40)" }}
              >
                Do NOT:
              </p>
              {coldAvoid.map((a) => (
                <p
                  key={a}
                  className="text-xs"
                  style={{ color: "oklch(0.74 0.015 80)" }}
                >
                  ✗ {a}
                </p>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Medicines */}
        <TabsContent value="meds" className="mt-0">
          <div className="flex gap-1 mb-3">
            {(["fever", "headache", "bodypain"] as const).map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setMedTab(t)}
                data-ocid={`firstaid.med.${t}.tab`}
                className="flex-1 text-xs py-1 rounded-lg font-bold uppercase tracking-wide transition-all"
                style={
                  medTab === t
                    ? {
                        background: "oklch(0.82 0.15 85)",
                        color: "oklch(0.13 0.007 95)",
                      }
                    : {
                        background: "oklch(0.15 0.007 95)",
                        color: "oklch(0.74 0.015 80)",
                      }
                }
              >
                {t === "bodypain"
                  ? "Body Pain"
                  : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          {medTab === "fever" && <MedTable rows={feverMeds} />}
          {medTab === "headache" && <MedTable rows={headacheMeds} />}
          {medTab === "bodypain" && <MedTable rows={bodyPainMeds} />}
          <div
            className="mt-3 rounded-lg p-2.5 flex items-start gap-2"
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
              Always consult a medical professional when available. These are
              emergency guidelines only.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
