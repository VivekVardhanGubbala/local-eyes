import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MEDICAL_CATEGORIES,
  type MedRow,
  type MedicalTopic,
} from "@/data/medicalData";
import { AlertTriangle, Heart, Pill, Stethoscope, Wind } from "lucide-react";
import { useState } from "react";

// ─── Legacy data (wound/CPR/cold/medicines remain inline for Overview tab) ───
const woundSteps = [
  {
    step: 1,
    title: "Clean Your Hands",
    desc: "Use sanitizer or wash with clean water before touching the wound.",
  },
  {
    step: 2,
    title: "Stop the Bleeding",
    desc: "Apply firm pressure with a clean cloth or bandage for 10-15 minutes. Do not peek.",
  },
  {
    step: 3,
    title: "Clean the Wound",
    desc: "Rinse gently with clean running water for 5+ minutes. Remove visible debris with clean tweezers.",
  },
  {
    step: 4,
    title: "Apply Antiseptic",
    desc: "Use Betadine 5% or Savlon diluted 1:30 around wound edges — not deep inside.",
  },
  {
    step: 5,
    title: "Antibiotic Ointment",
    desc: "Apply thin layer of Neosporin/Soframycin ointment. Cover with sterile gauze secured with Leucoplast tape.",
  },
  {
    step: 6,
    title: "Watch for Infection",
    desc: "Spreading redness, warmth, swelling, pus, or fever = infection. Seek medical help.",
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
    detail: "Shout for help. Call 112 or 108 (AP Ambulance).",
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
      "Place heel of hand on center of chest (lower sternum). Lock other hand on top. Push DOWN hard 5cm at 100-120/min. Let chest fully rise.",
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
    compressions: "5-6cm deep, 2 hands",
    ratio: "30:2",
    rate: "100-120/min",
  },
  {
    who: "Child (1-8 yr)",
    compressions: "5cm, 1 or 2 hands",
    ratio: "30:2 (1 rescuer)",
    rate: "100-120/min",
  },
  {
    who: "Infant (<1 yr)",
    compressions: "4cm, 2 fingers, BELOW nipple line",
    ratio: "30:2",
    rate: "100-120/min",
  },
];

const coldRemedies = [
  {
    remedy: "Steam Inhalation",
    how: "Boil water, breathe steam with towel over head for 10 min. Clears airways.",
  },
  {
    remedy: "Honey + Ginger Tea",
    how: "1 tsp honey + grated ginger in warm water. Soothes throat.",
  },
  {
    remedy: "Warm Saltwater Gargle",
    how: "Half tsp salt in warm water, gargle 30 sec, 3x daily. Kills throat bacteria.",
  },
  {
    remedy: "Turmeric Milk",
    how: "1 tsp turmeric in warm milk before bed. Anti-inflammatory.",
  },
  {
    remedy: "Rest & Fluids",
    how: "Drink ORS or warm water every hour. Sleep 8+ hours.",
  },
];

const feverMeds: MedRow[] = [
  {
    ageGroup: "Child < 5 yrs",
    medicine: "Paracetamol syrup 120mg/5ml (Crocin)",
    dosage: "2.5–5 ml",
    frequency: "Every 4–6 hrs",
    note: "DO NOT give Aspirin/Ecosprin to children",
  },
  {
    ageGroup: "Child 6–12 yrs",
    medicine: "Paracetamol 250mg tablet (Crocin/Dolo)",
    dosage: "1 tablet",
    frequency: "Every 4–6 hrs",
    note: "Max 4 doses/day",
  },
  {
    ageGroup: "Adult Male",
    medicine: "Paracetamol 500mg or Ibuprofen 400mg (Brufen)",
    dosage: "1–2 tablets",
    frequency: "Every 6–8 hrs",
    note: "Take Ibuprofen with food",
  },
  {
    ageGroup: "Adult Female",
    medicine: "Paracetamol 500mg (safe if pregnant)",
    dosage: "1 tablet",
    frequency: "Every 6 hrs",
    note: "Avoid Ibuprofen during pregnancy",
  },
  {
    ageGroup: "Elderly 60+",
    medicine: "Paracetamol 500mg ONLY",
    dosage: "1 tablet",
    frequency: "Every 8 hrs",
    note: "Avoid Ibuprofen — monitor kidney function",
  },
];

const headacheMeds: MedRow[] = [
  {
    ageGroup: "Child < 5 yrs",
    medicine: "Paracetamol syrup 120mg/5ml (Crocin)",
    dosage: "2.5–5 ml",
    frequency: "Every 4–6 hrs",
    note: "Ensure hydration first. No Aspirin.",
  },
  {
    ageGroup: "Child 6–12 yrs",
    medicine: "Paracetamol 250mg (Crocin/Dolo)",
    dosage: "1 tablet",
    frequency: "Every 4–6 hrs",
    note: "Offer water first — dehydration is common cause",
  },
  {
    ageGroup: "Adult Male",
    medicine: "Paracetamol 500mg or Ibuprofen 400mg",
    dosage: "1–2 tablets",
    frequency: "Every 6–8 hrs",
    note: "Drink 500ml water first. Rest in dark room.",
  },
  {
    ageGroup: "Adult Female",
    medicine: "Paracetamol 500mg",
    dosage: "1 tablet",
    frequency: "Every 6 hrs",
    note: "Migraine: dark room, cold compress on forehead",
  },
  {
    ageGroup: "Elderly 60+",
    medicine: "Paracetamol 500mg ONLY",
    dosage: "1 tablet",
    frequency: "Every 8 hrs",
    note: "Sudden severe headache = emergency — call 108",
  },
];

const bodyPainMeds: MedRow[] = [
  {
    ageGroup: "Child < 5 yrs",
    medicine: "Paracetamol syrup 120mg/5ml (Crocin)",
    dosage: "2.5–5 ml",
    frequency: "Every 4–6 hrs",
    note: "Warm compress on affected area",
  },
  {
    ageGroup: "Child 6–12 yrs",
    medicine: "Paracetamol 250mg (Crocin/Dolo)",
    dosage: "1 tablet",
    frequency: "Every 4–6 hrs",
    note: "Rest; avoid strenuous activity",
  },
  {
    ageGroup: "Adult Male",
    medicine: "Ibuprofen 400mg (Brufen/Combiflam) preferred",
    dosage: "1 tablet",
    frequency: "Every 6–8 hrs",
    note: "Volini/Diclofenac gel for localized pain. Take with food.",
  },
  {
    ageGroup: "Adult Female",
    medicine: "Paracetamol 500mg or Ibuprofen 400mg",
    dosage: "1 tablet",
    frequency: "Every 6–8 hrs",
    note: "Avoid Ibuprofen if pregnant. Volini gel safe for adults.",
  },
  {
    ageGroup: "Elderly 60+",
    medicine: "Paracetamol 500mg + warm compress",
    dosage: "1 tablet",
    frequency: "Every 8 hrs",
    note: "Avoid NSAIDs (Ibuprofen/Diclofenac). Gentle stretching.",
  },
];

const SEVERITY_COLORS: Record<string, string> = {
  low: "oklch(0.65 0.18 145)",
  medium: "oklch(0.72 0.14 60)",
  high: "oklch(0.75 0.16 45)",
  critical: "oklch(0.65 0.2 10)",
};

function MedTable({ rows }: { rows: MedRow[] }) {
  return (
    <ScrollArea className="h-48">
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

function StepList({ steps }: { steps: NonNullable<MedicalTopic["steps"]> }) {
  return (
    <ol className="space-y-2" aria-label="Treatment steps">
      {steps.map(({ step, title, desc }) => (
        <li
          key={step}
          className="flex gap-3 rounded-lg p-2.5"
          style={{ background: "oklch(0.15 0.007 95)" }}
        >
          <span
            className="font-bold text-sm shrink-0 w-5 text-center"
            style={{ color: "oklch(0.82 0.15 85)" }}
            aria-hidden="true"
          >
            {step}
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">{title}</p>
            <p className="text-xs" style={{ color: "oklch(0.74 0.015 80)" }}>
              {desc}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// StepList uses numbered steps for screen readers
function TopicCard({ topic }: { topic: MedicalTopic }) {
  const [open, setOpen] = useState(false);
  const sevColor = SEVERITY_COLORS[topic.severity];

  return (
    <div
      className="rounded-lg border"
      style={{
        borderColor: "oklch(0.27 0.007 95)",
        background: "oklch(0.17 0.007 95)",
      }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between p-2.5 min-h-[48px] text-left focus:ring-2 focus:ring-cyan-400 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`topic-content-${topic.id}`}
        data-ocid={`firstaid.${topic.id}.toggle`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base shrink-0">{topic.icon}</span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {topic.title}
            </p>
            <p
              className="text-xs truncate"
              style={{ color: "oklch(0.60 0.01 95)" }}
            >
              {topic.summary.slice(0, 60)}
              {topic.summary.length > 60 ? "…" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span
            className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full"
            style={{
              background: `${sevColor}22`,
              color: sevColor,
              border: `1px solid ${sevColor}44`,
            }}
          >
            {topic.severity}
          </span>
          <span
            className="text-xs"
            style={{ color: "oklch(0.50 0.01 95)" }}
            aria-hidden="true"
          >
            {open ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {open && (
        <section
          id={`topic-content-${topic.id}`}
          className="px-3 pb-3 space-y-3"
          style={{ borderTop: "1px solid oklch(0.24 0.007 95)" }}
          aria-label={`${topic.title} details`}
        >
          <p className="text-xs mt-2" style={{ color: "oklch(0.74 0.015 80)" }}>
            {topic.summary}
          </p>

          {topic.steps && topic.steps.length > 0 && (
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-wide mb-1.5"
                style={{ color: "oklch(0.65 0.18 145)" }}
              >
                Steps
              </p>
              <ScrollArea className="h-40">
                <div className="pr-1">
                  <StepList steps={topic.steps} />
                </div>
              </ScrollArea>
            </div>
          )}

          {topic.medicines && topic.medicines.length > 0 && (
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-wide mb-1.5"
                style={{ color: "oklch(0.82 0.15 85)" }}
              >
                Medicines
              </p>
              <MedTable rows={topic.medicines} />
            </div>
          )}

          {topic.warnings && topic.warnings.length > 0 && (
            <div className="space-y-1">
              <p
                className="text-[10px] font-bold uppercase tracking-wide"
                style={{ color: "oklch(0.65 0.2 25)" }}
              >
                Warnings
              </p>
              {topic.warnings.map((w) => (
                <div
                  key={w}
                  className="flex items-start gap-1.5 text-[11px]"
                  style={{ color: "oklch(0.65 0.2 25)" }}
                >
                  <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          )}

          {topic.doNot && topic.doNot.length > 0 && (
            <div className="space-y-0.5">
              <p
                className="text-[10px] font-bold uppercase tracking-wide"
                style={{ color: "oklch(0.60 0.14 40)" }}
              >
                Do NOT
              </p>
              {topic.doNot.map((d) => (
                <p
                  key={d}
                  className="text-[11px]"
                  style={{ color: "oklch(0.74 0.015 80)" }}
                >
                  ✗ {d}
                </p>
              ))}
            </div>
          )}

          {topic.extraInfo && topic.extraInfo.length > 0 && (
            <div className="space-y-1">
              {topic.extraInfo.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded p-2 text-[11px]"
                  style={{ background: "oklch(0.14 0.007 95)" }}
                >
                  <span className="font-semibold text-foreground">
                    {label}:{" "}
                  </span>
                  <span style={{ color: "oklch(0.74 0.015 80)" }}>{value}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export function BasicFirstAidCard() {
  const [medTab, setMedTab] = useState("fever");

  const MAIN_TABS = [
    {
      value: "overview",
      label: "Overview",
      icon: <Stethoscope className="w-3 h-3" />,
    },
    { value: "cpr", label: "CPR", icon: <Heart className="w-3 h-3" /> },
    { value: "cold", label: "Cold", icon: <Wind className="w-3 h-3" /> },
    { value: "meds", label: "Meds", icon: <Pill className="w-3 h-3" /> },
    ...MEDICAL_CATEGORIES.map((cat) => ({
      value: cat.id,
      label: cat.label.split(" ")[0],
      icon: <span className="text-[10px]">{cat.icon}</span>,
    })),
  ];

  return (
    <section
      className="rounded-xl border border-border card-glow h-full"
      style={{ background: "oklch(0.22 0.007 95)" }}
      aria-labelledby="basicfirstaid-heading"
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Heart
            className="w-4 h-4"
            style={{ color: "oklch(0.65 0.2 10)" }}
            aria-hidden="true"
          />
          <h2
            id="basicfirstaid-heading"
            className="font-display font-bold text-sm uppercase tracking-widest text-foreground"
          >
            Medical Guide
          </h2>
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.65 0.2 10 / 0.15)",
            color: "oklch(0.65 0.2 10)",
            border: "1px solid oklch(0.65 0.2 10 / 0.3)",
          }}
        >
          MOH India
        </span>
      </div>

      <Tabs defaultValue="overview" className="px-4 pb-4">
        {/* Scrollable tab list */}
        <div
          className="overflow-x-auto pb-1 mb-3"
          style={{ scrollbarWidth: "none" }}
        >
          <TabsList
            className="flex w-max h-8 p-0.5 gap-0.5"
            style={{ background: "oklch(0.15 0.007 95)", minWidth: "100%" }}
          >
            {MAIN_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-ocid={`firstaid.${tab.value}.tab`}
                className="flex items-center gap-1 text-[10px] h-7 px-2 whitespace-nowrap data-[state=active]:text-[oklch(0.13_0.007_95)] rounded-full transition-all"
              >
                {tab.icon}
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Overview — Wound Care */}
        <TabsContent value="overview" className="mt-0">
          <ScrollArea className="h-56">
            <div className="space-y-2 pr-2">
              <p
                className="text-[10px] font-bold uppercase tracking-wide"
                style={{ color: "oklch(0.65 0.18 145)" }}
              >
                Wound Care Steps
              </p>
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
              <div
                className="rounded-lg p-2.5 mt-1"
                style={{
                  background: "oklch(0.48 0.16 25 / 0.12)",
                  border: "1px solid oklch(0.48 0.16 25 / 0.3)",
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase mb-1"
                  style={{ color: "oklch(0.65 0.2 25)" }}
                >
                  When to Seek Help
                </p>
                {[
                  "Deep cuts that may need stitches",
                  "Animal bites or puncture wounds",
                  "Wound not stopping after 20 min",
                  "Red streaks spreading from wound",
                ].map((w) => (
                  <p
                    key={w}
                    className="text-xs flex gap-1.5"
                    style={{ color: "oklch(0.65 0.2 25)" }}
                  >
                    <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                    {w}
                  </p>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* CPR */}
        <TabsContent value="cpr" className="mt-0">
          <ScrollArea className="h-56">
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
                  Adult vs Child vs Infant
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
          <ScrollArea className="h-56">
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
              <div
                className="rounded-lg p-2.5"
                style={{
                  background: "oklch(0.48 0.16 25 / 0.1)",
                  border: "1px solid oklch(0.48 0.16 25 / 0.3)",
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase mb-1"
                  style={{ color: "oklch(0.65 0.2 25)" }}
                >
                  Seek Help If:
                </p>
                {[
                  "Breathing difficulty or chest pain",
                  "Lips or fingernails turning blue",
                  "High fever >39°C not responding to medicine",
                  "Coughing blood",
                ].map((w) => (
                  <p
                    key={w}
                    className="text-xs flex gap-1.5"
                    style={{ color: "oklch(0.65 0.2 25)" }}
                  >
                    <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                    {w}
                  </p>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Medicines */}
        <TabsContent value="meds" className="mt-0">
          <div className="flex gap-1 mb-2">
            {(["fever", "headache", "bodypain"] as const).map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setMedTab(t)}
                role="tab"
                aria-selected={medTab === t}
                data-ocid={`firstaid.med.${t}.tab`}
                className="flex-1 text-[10px] py-1 min-h-[32px] rounded-lg font-bold uppercase tracking-wide transition-all focus:ring-2 focus:ring-cyan-400 focus:outline-none"
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
            className="mt-2 rounded-lg p-2.5 flex items-start gap-2"
            style={{
              background: "oklch(0.48 0.16 25 / 0.12)",
              border: "1px solid oklch(0.48 0.16 25 / 0.3)",
            }}
          >
            <AlertTriangle
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
              style={{ color: "oklch(0.65 0.2 25)" }}
              aria-hidden="true"
            />
            <p className="text-xs" style={{ color: "oklch(0.65 0.2 25)" }}>
              Always consult a medical professional when available. These are
              emergency guidelines only.
            </p>
          </div>
        </TabsContent>

        {/* Dynamic category tabs */}
        {MEDICAL_CATEGORIES.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="mt-0">
            <ScrollArea className="h-56">
              <div className="space-y-2 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{cat.icon}</span>
                  <p
                    className="text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: cat.color }}
                  >
                    {cat.label} — Tap a topic to expand
                  </p>
                </div>
                {cat.topics.map((topic) => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
