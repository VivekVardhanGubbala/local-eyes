import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────
type UrgencyLevel = "critical" | "high" | "medium" | "low";

interface ActionStep {
  text: string;
  urgency: UrgencyLevel;
}

interface SituationType {
  id: string;
  icon: string;
  nameEn: string;
  nameTe: string;
  nameHi: string;
  actions: ActionStep[];
}

interface SituationResult {
  situation: SituationType;
  confidence: number | null; // null = manually selected
}

interface AnalysisHistory {
  id: string;
  timestamp: number;
  imagePreview: string | null;
  results: SituationResult[];
  mode: "online" | "offline";
}

// ─── Offline Situation Database ──────────────────────────────────────────────
const SITUATIONS: SituationType[] = [
  {
    id: "cyclone",
    icon: "🌪️",
    nameEn: "Cyclone",
    nameTe: "తుఫాను",
    nameHi: "चक्रवात",
    actions: [
      {
        text: "Move to interior room away from windows and glass doors immediately",
        urgency: "critical",
      },
      {
        text: "Stay indoors — do NOT go outside even if wind seems to stop (could be the eye)",
        urgency: "critical",
      },
      {
        text: "Turn off electricity at main breaker to prevent electrocution from flooding",
        urgency: "high",
      },
      {
        text: "Fill containers with clean water before supply is cut off",
        urgency: "high",
      },
      {
        text: "Tune to All India Radio (AM 1000 kHz) for official updates",
        urgency: "medium",
      },
    ],
  },
  {
    id: "flood",
    icon: "🌊",
    nameEn: "Flood",
    nameTe: "వరద",
    nameHi: "बाढ़",
    actions: [
      {
        text: "Move to upper floors or rooftop immediately — never shelter in basement",
        urgency: "critical",
      },
      {
        text: "Do NOT walk through floodwater — 15 cm depth can knock you down",
        urgency: "critical",
      },
      {
        text: "Turn off electricity at the main breaker before water reaches electrical panels",
        urgency: "high",
      },
      {
        text: "Discard any food touched by floodwater — contains sewage and pathogens",
        urgency: "high",
      },
      {
        text: "Signal from rooftop using bright cloth; use whistle in sets of 3 blasts",
        urgency: "medium",
      },
    ],
  },
  {
    id: "fire",
    icon: "🔥",
    nameEn: "Fire Accident",
    nameTe: "అగ్ని ప్రమాదం",
    nameHi: "आग दुर्घटना",
    actions: [
      {
        text: "Alert everyone loudly and activate fire alarm if available — evacuate immediately",
        urgency: "critical",
      },
      {
        text: "Stay low to the floor — smoke rises, breathable air is near the ground",
        urgency: "critical",
      },
      {
        text: "Feel doors before opening — if hot, use alternate exit route",
        urgency: "critical",
      },
      {
        text: "Call 101 (Fire) and 112 (Emergency) from a safe location",
        urgency: "high",
      },
      {
        text: "Stop-Drop-Roll if clothing catches fire; cool burns under running water 20 min",
        urgency: "high",
      },
    ],
  },
  {
    id: "earthquake",
    icon: "🏚️",
    nameEn: "Earthquake",
    nameTe: "భూకంపం",
    nameHi: "भूकंप",
    actions: [
      {
        text: "DROP to hands and knees, COVER under sturdy table, HOLD ON until shaking stops",
        urgency: "critical",
      },
      {
        text: "Stay away from windows, exterior walls, and heavy furniture during shaking",
        urgency: "critical",
      },
      {
        text: "After shaking: smell for gas leaks — if present, open windows and evacuate",
        urgency: "high",
      },
      {
        text: "Expect aftershocks — they can be as strong as main quake",
        urgency: "high",
      },
      {
        text: "Move to open field away from buildings and power lines after evacuation",
        urgency: "medium",
      },
    ],
  },
  {
    id: "heatwave",
    icon: "☀️",
    nameEn: "Heatwave",
    nameTe: "వేడి తరంగం",
    nameHi: "लू",
    actions: [
      {
        text: "Move victim to shade or air-conditioned room immediately",
        urgency: "critical",
      },
      {
        text: "If unconscious or confused — apply cold wet cloths to neck, armpits, groin; call 108",
        urgency: "critical",
      },
      {
        text: "Give ORS (1L water + 6tsp sugar + ½tsp salt) or plain water if conscious",
        urgency: "high",
      },
      {
        text: "Avoid outdoors between 11am–4pm; wear light loose cotton clothing if outside",
        urgency: "high",
      },
      {
        text: "Watch for heatstroke signs: skin hot and dry (no sweating), temp above 40°C",
        urgency: "medium",
      },
    ],
  },
  {
    id: "car_accident",
    icon: "🚗",
    nameEn: "Car Accident",
    nameTe: "కార్ ప్రమాదం",
    nameHi: "कार दुर्घटना",
    actions: [
      {
        text: "Call 112 (Emergency) and 108 (Ambulance) immediately",
        urgency: "critical",
      },
      {
        text: "Do NOT move injured person unless fire risk — spinal injury possible",
        urgency: "critical",
      },
      {
        text: "Control severe bleeding with direct firm pressure using clean cloth for 10 minutes",
        urgency: "critical",
      },
      {
        text: "Turn off vehicle ignition; place warning triangle/hazard lights to alert traffic",
        urgency: "high",
      },
      {
        text: "If person not breathing and no pulse — start CPR: 30 compressions + 2 breaths",
        urgency: "high",
      },
    ],
  },
  {
    id: "chemical_spill",
    icon: "⚠️",
    nameEn: "Chemical Spill",
    nameTe: "రసాయన చిందు",
    nameHi: "रासायनिक रिसाव",
    actions: [
      {
        text: "Evacuate upwind immediately — chemicals spread faster downwind",
        urgency: "critical",
      },
      {
        text: "Do NOT re-enter contaminated area without proper protective equipment",
        urgency: "critical",
      },
      {
        text: "If skin exposure: remove contaminated clothing, flush with large amounts of water 20 min",
        urgency: "high",
      },
      {
        text: "Call 112 and inform them of chemical type if known",
        urgency: "high",
      },
      {
        text: "Cover mouth with wet cloth if must pass through area briefly",
        urgency: "medium",
      },
    ],
  },
  {
    id: "landslide",
    icon: "⛰️",
    nameEn: "Landslide",
    nameTe: "కొండచరియ విరిగి పడుట",
    nameHi: "भूस्खलन",
    actions: [
      {
        text: "Move SIDEWAYS away from slide path — not up or down the slope",
        urgency: "critical",
      },
      {
        text: "Get to high flat ground away from valleys and stream channels",
        urgency: "critical",
      },
      {
        text: "Watch for rumbling sounds, tilting trees, or sudden muddy streams as warning signs",
        urgency: "high",
      },
      {
        text: "Never shelter at the base of a cliff or in valley bottoms",
        urgency: "high",
      },
      {
        text: "After event: avoid affected slope until authorities declare it safe",
        urgency: "medium",
      },
    ],
  },
  {
    id: "drought",
    icon: "🏜️",
    nameEn: "Drought",
    nameTe: "కరువు",
    nameHi: "सूखा",
    actions: [
      {
        text: "Conserve water strictly — 5 litres per person per day minimum for survival",
        urgency: "critical",
      },
      {
        text: "Purify all drinking water: boil, SODIS, or chlorine tablets",
        urgency: "high",
      },
      {
        text: "Prioritize food with high water content; avoid salty or spicy food",
        urgency: "high",
      },
      {
        text: "Collect dew and rainwater using plastic sheets stretched between poles",
        urgency: "medium",
      },
      {
        text: "Contact district authorities for water tanker supply (AP: 1916 helpline)",
        urgency: "medium",
      },
    ],
  },
  {
    id: "tsunami",
    icon: "🌊",
    nameEn: "Tsunami",
    nameTe: "సునామి",
    nameHi: "सुनामी",
    actions: [
      {
        text: "Move inland to HIGH GROUND immediately — do NOT wait for official warning",
        urgency: "critical",
      },
      {
        text: "If you feel a strong earthquake near coast — treat as tsunami warning; evacuate",
        urgency: "critical",
      },
      {
        text: "Stay away from coast until all-clear issued — multiple waves can hit hours apart",
        urgency: "critical",
      },
      {
        text: "Do NOT return to coast to watch the wave — minimum 30m elevation required",
        urgency: "high",
      },
      {
        text: "Listen to NDTV / All India Radio for Indian Ocean tsunami alerts",
        urgency: "medium",
      },
    ],
  },
  {
    id: "pandemic",
    icon: "😷",
    nameEn: "Pandemic / Disease",
    nameTe: "మహమ్మారి",
    nameHi: "महामारी",
    actions: [
      {
        text: "Isolate suspected case immediately — separate room with own bathroom if possible",
        urgency: "critical",
      },
      {
        text: "Wear N95/surgical mask; wash hands with soap for 20 seconds; avoid touching face",
        urgency: "high",
      },
      {
        text: "Contact district health helpline (AP: 104) for testing and guidance",
        urgency: "high",
      },
      {
        text: "Ensure adequate hydration and nutrition; monitor for breathing difficulty",
        urgency: "medium",
      },
      {
        text: "Disinfect high-touch surfaces with diluted bleach (1 tsp per litre water)",
        urgency: "medium",
      },
    ],
  },
  {
    id: "body_cuts",
    icon: "🩸",
    nameEn: "Body Cuts / Bleeding",
    nameTe: "శరీర గాయాలు",
    nameHi: "कटे घाव",
    actions: [
      {
        text: "Apply firm direct pressure with clean cloth for 10 minutes — do NOT lift cloth",
        urgency: "critical",
      },
      {
        text: "If bleeding uncontrolled on limb: apply tourniquet 5cm above wound; note time applied",
        urgency: "critical",
      },
      {
        text: "Clean wound with clean running water for 5 minutes; apply Betadine; cover with bandage",
        urgency: "high",
      },
      {
        text: "Apply Soframycin/Neosporin ointment and keep wound covered",
        urgency: "medium",
      },
      {
        text: "Watch for infection: increasing redness, warmth, swelling, pus — seek help if present",
        urgency: "medium",
      },
    ],
  },
  {
    id: "body_burns",
    icon: "🔥",
    nameEn: "Body Burns",
    nameTe: "శరీర కాలిన గాయాలు",
    nameHi: "जलन / जलाव",
    actions: [
      {
        text: "Cool burn under COOL (not ice cold) running water for 10–20 minutes immediately",
        urgency: "critical",
      },
      {
        text: "Remove rings, watches, clothing near burn BEFORE swelling begins",
        urgency: "critical",
      },
      {
        text: "NEVER use ice, butter, toothpaste, or flour — these worsen burns",
        urgency: "critical",
      },
      {
        text: "Cover loosely with clean non-fluffy material; do not burst blisters",
        urgency: "high",
      },
      {
        text: "3rd degree burns (white/charred, no pain): cover and seek emergency help immediately",
        urgency: "critical",
      },
    ],
  },
  {
    id: "pregnancy",
    icon: "🤱",
    nameEn: "Pregnancy Emergency",
    nameTe: "గర్భిణీ అత్యవసర పరిస్థితి",
    nameHi: "गर्भावस्था आपातकाल",
    actions: [
      {
        text: "Call 108 ambulance immediately — all obstetric emergencies need medical help",
        urgency: "critical",
      },
      {
        text: "Keep mother calm, warm, lying on LEFT side to improve blood flow to baby",
        urgency: "critical",
      },
      {
        text: "If delivery imminent: boil water, use clean scissors/blade to cut cord after birth",
        urgency: "high",
      },
      {
        text: "Severe headache + vision changes + swelling = preeclampsia — emergency",
        urgency: "critical",
      },
      {
        text: "Heavy postpartum bleeding: firm uterine massage; do NOT give misoprostol without guidance",
        urgency: "critical",
      },
    ],
  },
  {
    id: "food_poisoning",
    icon: "🍽️",
    nameEn: "Food Poisoning",
    nameTe: "ఆహారం విషప్రయోగం",
    nameHi: "खाद्य विषाक्तता",
    actions: [
      {
        text: "Stop all food intake immediately; allow sips of clean water or ORS every 15 minutes",
        urgency: "high",
      },
      {
        text: "ORS recipe: 1L clean water + 6 tsp sugar + ½ tsp salt — give slowly",
        urgency: "high",
      },
      {
        text: "Do NOT force vomiting unless advised by medical professional",
        urgency: "high",
      },
      {
        text: "Call 112 or 108 if: blood in stool/vomit, high fever, confusion, signs of dehydration",
        urgency: "critical",
      },
      {
        text: "Discard remaining food batch; disinfect all food prep surfaces",
        urgency: "medium",
      },
    ],
  },
  {
    id: "general",
    icon: "🆘",
    nameEn: "General Emergency",
    nameTe: "సాధారణ అత్యవసర పరిస్థితి",
    nameHi: "सामान्य आपातकाल",
    actions: [
      {
        text: "Call 112 (India National Emergency) immediately",
        urgency: "critical",
      },
      {
        text: "Ensure scene safety — do not put yourself at risk trying to help others",
        urgency: "critical",
      },
      {
        text: "Identify number of casualties and nature of emergency for emergency services",
        urgency: "high",
      },
      {
        text: "Begin first aid: check responsiveness, airway, breathing, circulation",
        urgency: "high",
      },
      {
        text: "Keep victim warm, calm, and still until professional help arrives",
        urgency: "medium",
      },
    ],
  },
];

const SITUATION_MAP = Object.fromEntries(SITUATIONS.map((s) => [s.id, s]));

// ─── History helpers ──────────────────────────────────────────────────────────
const HISTORY_KEY = "localeyes_analysis_history";

function loadHistory(): AnalysisHistory[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveHistory(h: AnalysisHistory[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 5)));
  } catch {}
}

// ─── Gemini helpers ───────────────────────────────────────────────────────────
const GEMINI_ANALYZE_PROMPT = `You are an emergency disaster analyst. Analyze this image and identify the TOP 3 emergency or disaster situations that may be occurring.

For EACH situation return exactly this JSON format (no markdown, pure JSON array):
[
  {
    "id": "<one of: cyclone, flood, fire, earthquake, heatwave, car_accident, chemical_spill, landslide, drought, tsunami, pandemic, body_cuts, body_burns, pregnancy, food_poisoning, general>",
    "confidence": <integer 0-100>,
    "reason": "<one sentence why>"
  }
]

Consider the Indian context. If no clear emergency is visible use id: 'general'. Return ONLY the JSON array, no other text.`;

async function analyzeWithGemini(
  base64Image: string,
  mimeType: string,
  apiKey: string,
): Promise<SituationResult[]> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: GEMINI_ANALYZE_PROMPT },
              { inline_data: { mime_type: mimeType, data: base64Image } },
            ],
          },
        ],
      }),
    },
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  // Extract JSON array from response
  const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (!jsonMatch) throw new Error("No JSON in response");
  const parsed = JSON.parse(jsonMatch[0]) as Array<{
    id: string;
    confidence: number;
    reason: string;
  }>;
  return parsed
    .slice(0, 3)
    .map((item) => ({
      situation: SITUATION_MAP[item.id] ?? SITUATION_MAP.general,
      confidence: Math.min(100, Math.max(0, item.confidence)),
    }))
    .filter((r) => r.situation != null);
}

// ─── Utility ──────────────────────────────────────────────────────────────────
function fileToBase64(
  file: File,
): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] ?? "";
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function fileToPreviewUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const URGENCY_STYLES: Record<
  UrgencyLevel,
  { label: string; bg: string; text: string; border: string }
> = {
  critical: {
    label: "CRITICAL",
    bg: "oklch(0.48 0.16 25 / 0.15)",
    text: "oklch(0.75 0.18 25)",
    border: "oklch(0.48 0.16 25 / 0.4)",
  },
  high: {
    label: "HIGH",
    bg: "oklch(0.55 0.15 45 / 0.12)",
    text: "oklch(0.78 0.14 45)",
    border: "oklch(0.55 0.15 45 / 0.35)",
  },
  medium: {
    label: "MED",
    bg: "oklch(0.82 0.15 85 / 0.1)",
    text: "oklch(0.82 0.15 85)",
    border: "oklch(0.82 0.15 85 / 0.3)",
  },
  low: {
    label: "LOW",
    bg: "oklch(0.65 0.18 145 / 0.1)",
    text: "oklch(0.65 0.18 145)",
    border: "oklch(0.65 0.18 145 / 0.3)",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function UrgencyBadge({ level }: { level: UrgencyLevel }) {
  const s = URGENCY_STYLES[level];
  return (
    <span
      className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider flex-shrink-0"
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
      }}
    >
      {s.label}
    </span>
  );
}

function LoadingSpinner() {
  return (
    <div
      className="flex flex-col items-center gap-4 py-8"
      data-ocid="situation.loading_state"
      aria-label="Analyzing image with Gemini AI..."
    >
      <div className="relative w-12 h-12">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid oklch(0.82 0.15 85 / 0.2)" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid transparent",
            borderTopColor: "oklch(0.82 0.15 85)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
      <p
        className="text-sm font-medium"
        style={{ color: "oklch(0.82 0.15 85)" }}
      >
        Analyzing with Gemini AI...
      </p>
      <p className="text-xs" style={{ color: "oklch(0.55 0.01 95)" }}>
        Identifying emergency situations
      </p>
    </div>
  );
}

function SituationCard({
  result,
  index,
  lang,
}: {
  result: SituationResult;
  index: number;
  lang: "en" | "te" | "hi";
}) {
  const [expanded, setExpanded] = useState(false);
  const s = result.situation;
  const name = lang === "te" ? s.nameTe : lang === "hi" ? s.nameHi : s.nameEn;
  const rankColors = [
    "oklch(0.82 0.15 85)",
    "oklch(0.75 0.12 195)",
    "oklch(0.65 0.18 145)",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl overflow-hidden card-glow cursor-pointer"
      style={{
        background: "oklch(0.12 0.02 240 / 0.8)",
        border: "1px solid oklch(0.3 0.05 240 / 0.3)",
      }}
      data-ocid={`situation.result.item.${index + 1}`}
      onClick={() => setExpanded((v) => !v)}
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${name} situation result ${result.confidence !== null ? `${result.confidence}% confidence` : "manually selected"}`}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && setExpanded((v) => !v)
      }
    >
      {/* Card header */}
      <div className="flex items-start gap-3 p-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background: "oklch(0.18 0.02 240 / 0.8)",
            border: "1px solid oklch(0.35 0.05 240 / 0.3)",
          }}
        >
          {s.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p
              className="font-display font-bold text-sm uppercase tracking-wide truncate"
              style={{ color: "oklch(0.92 0.01 95)" }}
            >
              {name}
            </p>
            {result.confidence !== null ? (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0"
                style={{
                  background: `${rankColors[index]}1a`,
                  border: `1px solid ${rankColors[index]}40`,
                  color: rankColors[index],
                }}
              >
                <span>{result.confidence}%</span>
                <span className="text-[10px] font-normal opacity-70">
                  confidence
                </span>
              </div>
            ) : (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0"
                style={{
                  background: "oklch(0.65 0.18 145 / 0.15)",
                  color: "oklch(0.65 0.18 145)",
                  border: "1px solid oklch(0.65 0.18 145 / 0.3)",
                }}
              >
                Selected
              </span>
            )}
          </div>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.01 95)" }}
          >
            Tap to {expanded ? "collapse" : "view"} action steps →
          </p>
        </div>
      </div>

      {/* Expanded action steps */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 space-y-2"
              style={{ borderTop: "1px solid oklch(0.3 0.05 240 / 0.3)" }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-widest pt-3 mb-2"
                style={{ color: "oklch(0.55 0.01 95)" }}
              >
                Immediate Actions
              </p>
              <ol className="space-y-2" aria-label="Immediate action steps">
                {s.actions.map((action, ai) => (
                  <li
                    key={`action-${action.urgency}-${ai}`}
                    className="flex items-start gap-2.5"
                  >
                    <UrgencyBadge level={action.urgency} />
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.82 0.01 95)" }}
                    >
                      {action.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HistoryItem({
  entry,
  onRestore,
  lang,
}: {
  entry: AnalysisHistory;
  onRestore: (e: AnalysisHistory) => void;
  lang: "en" | "te" | "hi";
}) {
  const date = new Date(entry.timestamp);
  return (
    <button
      type="button"
      onClick={() => onRestore(entry)}
      className="w-full text-left flex items-center gap-3 p-2.5 rounded-lg transition-colors hover:bg-white/5"
      style={{ border: "1px solid oklch(0.28 0.007 95)" }}
    >
      {entry.imagePreview ? (
        <img
          src={entry.imagePreview}
          alt="Analysis thumbnail"
          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
        />
      ) : (
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: "oklch(0.2 0.007 95)" }}
        >
          {entry.results[0]?.situation.icon ?? "🆘"}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p
          className="text-xs font-semibold truncate"
          style={{ color: "oklch(0.82 0.01 95)" }}
        >
          {entry.results
            .map((r) =>
              lang === "te"
                ? r.situation.nameTe
                : lang === "hi"
                  ? r.situation.nameHi
                  : r.situation.nameEn,
            )
            .join(" • ")}
        </p>
        <p className="text-[10px]" style={{ color: "oklch(0.50 0.01 95)" }}>
          {date.toLocaleDateString("en-IN")} · {entry.mode}
        </p>
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function SituationAnalyzer() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SituationResult[] | null>(null);
  const [analysisMode, setAnalysisMode] = useState<"online" | "offline">(
    "offline",
  );
  const [history, setHistory] = useState<AnalysisHistory[]>(loadHistory);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const geminiApiKey =
    typeof localStorage !== "undefined"
      ? (localStorage.getItem("localeyes_gemini_key") ?? "")
      : "";
  const isOnline = !!geminiApiKey && navigator.onLine;

  // Sync mode when API key availability changes
  useEffect(() => {
    setAnalysisMode(isOnline ? "online" : "offline");
  }, [isOnline]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setImageFile(file);
      setResults(null);
      setError(null);
      const preview = await fileToPreviewUrl(file);
      setImagePreview(preview);
      // Auto-analyze if online
      if (isOnline) {
        runOnlineAnalysis(file, preview);
      }
    },
    [isOnline],
  );

  async function runOnlineAnalysis(file: File, preview: string) {
    setLoading(true);
    setError(null);
    try {
      const { base64, mimeType } = await fileToBase64(file);
      const apiResults = await analyzeWithGemini(
        base64,
        mimeType,
        geminiApiKey,
      );
      if (apiResults.length === 0) throw new Error("No situations detected");
      setResults(apiResults);
      setAnalysisMode("online");
      const entry: AnalysisHistory = {
        id: `h-${Date.now()}`,
        timestamp: Date.now(),
        imagePreview: preview,
        results: apiResults,
        mode: "online",
      };
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, 5);
        saveHistory(next);
        return next;
      });
    } catch (err) {
      setError(
        `Gemini analysis failed: ${err instanceof Error ? err.message : "Unknown error"}. Use manual selection below.`,
      );
      setAnalysisMode("offline");
    } finally {
      setLoading(false);
    }
  }

  function handleManualSelect(situation: SituationType) {
    const existing = results ?? [];
    const alreadySelected = existing.find(
      (r) => r.situation.id === situation.id,
    );
    if (alreadySelected) {
      // Deselect
      const next = existing.filter((r) => r.situation.id !== situation.id);
      setResults(next.length > 0 ? next : null);
      return;
    }
    if (existing.length >= 3) return; // max 3
    const next = [...existing, { situation, confidence: null }];
    setResults(next);
    setAnalysisMode("offline");
    const entry: AnalysisHistory = {
      id: `h-${Date.now()}`,
      timestamp: Date.now(),
      imagePreview,
      results: next,
      mode: "offline",
    };
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, 5);
      saveHistory(updated);
      return updated;
    });
  }

  function restoreHistory(entry: AnalysisHistory) {
    setResults(entry.results);
    setAnalysisMode(entry.mode);
    setImagePreview(entry.imagePreview);
    setShowHistory(false);
    setError(null);
  }

  function reset() {
    setImageFile(null);
    setImagePreview(null);
    setResults(null);
    setError(null);
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const selectedIds = new Set(results?.map((r) => r.situation.id) ?? []);

  return (
    <>
      {/* Dashboard Card — collapsed trigger */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-2xl card-glow cursor-pointer select-none"
        style={{
          background: "oklch(0.12 0.02 240 / 0.8)",
          border: "1px solid oklch(0.3 0.05 240 / 0.3)",
        }}
        onClick={() => setOpen(true)}
        tabIndex={0}
        aria-label="Open Situation Analyzer to identify emergency situations"
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
        data-ocid="situation.open_modal_button"
      >
        <div className="p-5 flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background: "oklch(0.18 0.04 30 / 0.5)",
              border: "1px solid oklch(0.45 0.12 30 / 0.3)",
            }}
          >
            📸
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className="font-display font-extrabold uppercase text-sm tracking-widest"
                style={{ color: "oklch(0.92 0.01 95)" }}
              >
                {lang === "te"
                  ? "పరిస్థితి విశ్లేషకుడు"
                  : lang === "hi"
                    ? "स्थिति विश्लेषक"
                    : "Situation Analyzer"}
              </h3>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                style={{
                  background: isOnline
                    ? "oklch(0.82 0.15 85 / 0.12)"
                    : "oklch(0.65 0.18 145 / 0.12)",
                  color: isOnline
                    ? "oklch(0.82 0.15 85)"
                    : "oklch(0.65 0.18 145)",
                  border: isOnline
                    ? "1px solid oklch(0.82 0.15 85 / 0.3)"
                    : "1px solid oklch(0.65 0.18 145 / 0.3)",
                }}
              >
                {isOnline ? "AI-Powered" : "Offline"}
              </span>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.65 0.01 95)" }}
            >
              {lang === "te"
                ? "ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి — మనం ఏ ప్రమాదంలో ఉన్నారో గుర్తిస్తుంది"
                : lang === "hi"
                  ? "फ़ोटो लें या अपलोड करें — स्थिति की पहचान और तत्काल कदम पाएं"
                  : "Take or upload a photo to identify your emergency situation and get immediate action steps"}
            </p>
          </div>
        </div>
        <div
          className="px-5 pb-4 flex items-center gap-2 text-xs"
          style={{ color: "oklch(0.55 0.01 95)" }}
        >
          <span>16 situations covered</span>
          <span>·</span>
          <span>Cyclone • Flood • Fire • Accident +12 more</span>
        </div>
      </motion.div>

      {/* Full Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="sa-overlay"
              className="fixed inset-0 z-40"
              style={{ background: "oklch(0.08 0.007 95 / 0.85)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="sa-modal"
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 16 }}
                transition={{ type: "spring", stiffness: 340, damping: 32 }}
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
                style={{
                  background: "oklch(0.12 0.015 240)",
                  border: "1px solid oklch(0.3 0.05 240 / 0.4)",
                }}
                data-ocid="situation.dialog"
                aria-modal="true"
                aria-labelledby="situation-dialog-title"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal header */}
                <div
                  className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
                  style={{
                    background: "oklch(0.12 0.015 240)",
                    borderBottom: "1px solid oklch(0.28 0.05 240 / 0.35)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📸</span>
                    <div>
                      <h2
                        className="font-display font-extrabold uppercase text-sm tracking-widest"
                        style={{ color: "oklch(0.92 0.01 95)" }}
                        id="situation-dialog-title"
                      >
                        {lang === "te"
                          ? "పరిస్థితి విశ్లేషకుడు"
                          : lang === "hi"
                            ? "स्थिति विश्लेषक"
                            : "Situation Analyzer"}
                      </h2>
                      <p
                        className="text-[10px]"
                        style={{ color: "oklch(0.55 0.01 95)" }}
                      >
                        {isOnline
                          ? "Gemini AI analysis active"
                          : "Offline manual mode"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {history.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowHistory((v) => !v)}
                        className="text-xs px-2.5 py-1.5 rounded-lg transition-colors hover:bg-white/5"
                        style={{
                          background: showHistory
                            ? "oklch(0.82 0.15 85 / 0.12)"
                            : "oklch(0.2 0.007 95)",
                          color: showHistory
                            ? "oklch(0.82 0.15 85)"
                            : "oklch(0.60 0.01 95)",
                          border: "1px solid oklch(0.3 0.007 95)",
                        }}
                        data-ocid="situation.toggle"
                      >
                        History ({history.length})
                      </button>
                    )}
                    {(imagePreview || results) && (
                      <button
                        type="button"
                        onClick={reset}
                        className="text-xs px-2.5 py-1.5 rounded-lg transition-colors hover:bg-white/5"
                        style={{
                          background: "oklch(0.2 0.007 95)",
                          color: "oklch(0.60 0.01 95)",
                          border: "1px solid oklch(0.3 0.007 95)",
                        }}
                        data-ocid="situation.secondary_button"
                      >
                        Reset
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                      style={{ color: "oklch(0.55 0.01 95)" }}
                      data-ocid="situation.close_button"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-6">
                  {/* History panel */}
                  <AnimatePresence>
                    {showHistory && history.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2">
                          <p
                            className="text-[10px] font-bold uppercase tracking-widest"
                            style={{ color: "oklch(0.55 0.01 95)" }}
                          >
                            Recent Analyses
                          </p>
                          {history.map((entry) => (
                            <HistoryItem
                              key={entry.id}
                              entry={entry}
                              onRestore={restoreHistory}
                              lang={lang}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Photo upload */}
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-3"
                      style={{ color: "oklch(0.55 0.01 95)" }}
                    >
                      {lang === "te"
                        ? "ఫోటో తీయండి / అప్‌లోడ్"
                        : lang === "hi"
                          ? "फोटो लें / अपलोड करें"
                          : "Take / Upload Photo"}
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleFileChange}
                      data-ocid="situation.upload_button"
                    />
                    {!imagePreview ? (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full rounded-xl py-8 flex flex-col items-center gap-3 transition-colors"
                        style={{
                          background: "oklch(0.15 0.02 240 / 0.5)",
                          border: "2px dashed oklch(0.35 0.05 240 / 0.5)",
                        }}
                        aria-label="Upload a photo to identify emergency situation"
                        data-ocid="situation.dropzone"
                      >
                        <span className="text-4xl">📷</span>
                        <div className="text-center">
                          <p
                            className="font-display font-bold text-sm"
                            style={{ color: "oklch(0.82 0.01 95)" }}
                          >
                            {lang === "te"
                              ? "ఫోటో తీయండి"
                              : lang === "hi"
                                ? "फोटो लें"
                                : "Take Photo / Upload Image"}
                          </p>
                          <p
                            className="text-xs mt-1"
                            style={{ color: "oklch(0.50 0.01 95)" }}
                          >
                            {isOnline
                              ? "Gemini AI will automatically identify the situation"
                              : "Upload to enable AI analysis or select manually below"}
                          </p>
                        </div>
                      </motion.button>
                    ) : (
                      <div className="flex gap-3 items-start">
                        <img
                          src={imagePreview}
                          alt="Uploaded situation"
                          className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                          style={{
                            border: "1px solid oklch(0.3 0.05 240 / 0.4)",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "oklch(0.82 0.01 95)" }}
                          >
                            {imageFile?.name ?? "Image uploaded"}
                          </p>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: "oklch(0.50 0.01 95)" }}
                          >
                            {analysisMode === "online"
                              ? "Analyzed by Gemini AI"
                              : "Manual mode"}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                              style={{
                                background: "oklch(0.2 0.007 95)",
                                color: "oklch(0.70 0.01 95)",
                                border: "1px solid oklch(0.3 0.007 95)",
                              }}
                              data-ocid="situation.upload_button"
                            >
                              Change photo
                            </button>
                            {isOnline && imageFile && !loading && (
                              <button
                                type="button"
                                onClick={() =>
                                  imageFile &&
                                  imagePreview &&
                                  runOnlineAnalysis(imageFile, imagePreview)
                                }
                                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                                style={{
                                  background: "oklch(0.82 0.15 85 / 0.12)",
                                  color: "oklch(0.82 0.15 85)",
                                  border: "1px solid oklch(0.82 0.15 85 / 0.3)",
                                }}
                                data-ocid="situation.primary_button"
                              >
                                Re-analyze
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Loading state */}
                  <AnimatePresence>
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <LoadingSpinner />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error state */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        role="alert"
                        aria-live="assertive"
                        className="p-3 rounded-xl text-xs"
                        style={{
                          background: "oklch(0.48 0.16 25 / 0.1)",
                          border: "1px solid oklch(0.48 0.16 25 / 0.35)",
                          color: "oklch(0.75 0.16 25)",
                        }}
                        data-ocid="situation.error_state"
                      >
                        ⚠️ {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Manual selection grid — shown when offline OR as fallback */}
                  {!loading && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p
                          className="text-[10px] font-bold uppercase tracking-widest"
                          style={{ color: "oklch(0.55 0.01 95)" }}
                        >
                          {analysisMode === "offline"
                            ? lang === "te"
                              ? "పరిస్థితిని ఎంచుకోండి (గరిష్టంగా 3)"
                              : lang === "hi"
                                ? "स्थिति चुनें (अधिकतम 3)"
                                : "Select Situation (max 3)"
                            : lang === "te"
                              ? "మాన్యువల్ ఓవర్‌రైడ్"
                              : lang === "hi"
                                ? "मैनुअल ओवरराइड"
                                : "Manual Override"}
                        </p>
                        {results && results.length > 0 && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: "oklch(0.82 0.15 85 / 0.12)",
                              color: "oklch(0.82 0.15 85)",
                              border: "1px solid oklch(0.82 0.15 85 / 0.3)",
                            }}
                          >
                            {results.length}/3 selected
                          </span>
                        )}
                      </div>
                      <div
                        className="grid grid-cols-4 gap-2"
                        data-ocid="situation.list"
                        aria-label="Select emergency situation manually (maximum 3)"
                      >
                        {SITUATIONS.map((s, idx) => {
                          const isSelected = selectedIds.has(s.id);
                          const isDisabled =
                            !isSelected &&
                            (results?.length ?? 0) >= 3 &&
                            analysisMode === "offline";
                          const name =
                            lang === "te"
                              ? s.nameTe
                              : lang === "hi"
                                ? s.nameHi
                                : s.nameEn;
                          return (
                            <motion.button
                              key={s.id}
                              type="button"
                              whileHover={!isDisabled ? { scale: 1.04 } : {}}
                              whileTap={!isDisabled ? { scale: 0.95 } : {}}
                              disabled={isDisabled}
                              onClick={() => handleManualSelect(s)}
                              className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-center transition-all min-h-[64px] focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                              aria-label={`${name}: ${isSelected ? "selected, tap to deselect" : "tap to select"}`}
                              aria-pressed={isSelected}
                              style={{
                                background: isSelected
                                  ? "oklch(0.65 0.18 145 / 0.15)"
                                  : "oklch(0.17 0.02 240 / 0.8)",
                                border: isSelected
                                  ? "1px solid oklch(0.65 0.18 145 / 0.5)"
                                  : "1px solid oklch(0.28 0.05 240 / 0.3)",
                                opacity: isDisabled ? 0.4 : 1,
                              }}
                              data-ocid={`situation.item.${idx + 1}`}
                            >
                              <span className="text-xl leading-none">
                                {s.icon}
                              </span>
                              <span
                                className="text-[9px] font-semibold leading-tight"
                                style={{
                                  color: isSelected
                                    ? "oklch(0.75 0.18 145)"
                                    : "oklch(0.65 0.01 95)",
                                }}
                              >
                                {name.split(" ").slice(0, 2).join(" ")}
                              </span>
                              {isSelected && (
                                <span
                                  className="text-[8px]"
                                  style={{ color: "oklch(0.65 0.18 145)" }}
                                >
                                  ✓
                                </span>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Results panel */}
                  <AnimatePresence>
                    {results && results.length > 0 && !loading && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                        aria-label="Analysis results"
                        aria-live="polite"
                      >
                        <p
                          className="text-[10px] font-bold uppercase tracking-widest"
                          style={{ color: "oklch(0.55 0.01 95)" }}
                        >
                          {lang === "te"
                            ? "గుర్తించిన పరిస్థితులు"
                            : lang === "hi"
                              ? "पहचानी गई स्थितियां"
                              : "Detected Situations — Tap to expand action steps"}
                        </p>
                        {results.map((r, i) => (
                          <SituationCard
                            key={`${r.situation.id}-${i}`}
                            result={r}
                            index={i}
                            lang={lang}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* What to do next */}
                  {results && results.length > 0 && !loading && (
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "oklch(0.15 0.02 240 / 0.5)",
                        border: "1px solid oklch(0.3 0.05 240 / 0.3)",
                      }}
                      data-ocid="situation.panel"
                    >
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest mb-3"
                        style={{ color: "oklch(0.55 0.01 95)" }}
                      >
                        {lang === "te"
                          ? "తర్వాత ఏమి చేయాలి"
                          : lang === "hi"
                            ? "आगे क्या करें"
                            : "What To Do Next"}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          {
                            icon: "🩺",
                            label: "First Aid Guide",
                            labelTe: "ప్రథమ చికిత్స",
                            labelHi: "प्राथमिक उपचार",
                            href: "#dashboard",
                          },
                          {
                            icon: "🌿",
                            label: "Survival Guide",
                            labelTe: "మనుగడ మార్గదర్శి",
                            labelHi: "उत्तरजीविता गाइड",
                            href: "#dashboard",
                          },
                          {
                            icon: "📞",
                            label: "Call 112",
                            labelTe: "112 కి కాల్ చేయండి",
                            labelHi: "112 पर कॉल करें",
                            href: "tel:112",
                          },
                        ].map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-colors hover:bg-white/5"
                            style={{
                              background: "oklch(0.18 0.02 240 / 0.6)",
                              border: "1px solid oklch(0.3 0.05 240 / 0.3)",
                            }}
                            onClick={
                              item.href.startsWith("#")
                                ? () => setOpen(false)
                                : undefined
                            }
                            data-ocid="situation.link"
                          >
                            <span className="text-xl">{item.icon}</span>
                            <span
                              className="text-[10px] font-semibold leading-tight"
                              style={{ color: "oklch(0.75 0.01 95)" }}
                            >
                              {lang === "te"
                                ? item.labelTe
                                : lang === "hi"
                                  ? item.labelHi
                                  : item.label}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty state */}
                  {!results && !loading && (
                    <div
                      className="text-center py-6"
                      data-ocid="situation.empty_state"
                    >
                      <p className="text-2xl mb-2">🔍</p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.60 0.01 95)" }}
                      >
                        {lang === "te"
                          ? "ఫోటో అప్‌లోడ్ చేయండి లేదా పై నుండి పరిస్థితిని ఎంచుకోండి"
                          : lang === "hi"
                            ? "फ़ोटो अपलोड करें या ऊपर से स्थिति चुनें"
                            : "Upload a photo or select a situation above to see action steps"}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
