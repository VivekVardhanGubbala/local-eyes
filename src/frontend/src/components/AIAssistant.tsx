import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { MEDICAL_KB_ENTRIES } from "@/data/medicalData";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Bot,
  MessageCircle,
  Mic,
  MicOff,
  RefreshCw,
  Send,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// LanguageContext wired via useLanguage hook above

// TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

// Language code map for speech recognition
const speechLangMap: Record<string, string> = {
  en: "en-IN",
  te: "te-IN",
  hi: "hi-IN",
};

const isSpeechSupported =
  typeof window !== "undefined" &&
  ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
};

interface KBEntry {
  keywords: string[];
  title: string;
  response: string;
}

const knowledgeBase: KBEntry[] = [
  {
    keywords: [
      "water",
      "purif",
      "clean water",
      "drink",
      "boil",
      "contaminated",
      "sodis",
      "filter",
    ],
    title: "Water Purification",
    response: `**WATER PURIFICATION METHODS**

**Method 1 — Boiling (Most Reliable)**
1. Collect water in a clean container.
2. Heat until a rolling boil (large bubbles).
3. Boil for at least 1 minute (3 minutes at high altitude).
4. Let cool naturally — do NOT add ice.
5. Store in a sealed clean container.
✅ Kills bacteria, viruses, and parasites.

**Method 2 — SODIS (Solar Disinfection)**
1. Fill a clear PET plastic bottle with water.
2. Shake bottle to increase oxygen levels.
3. Place on a reflective surface (tin roof) in direct sunlight.
4. Leave for minimum 6 hours (or 2 days if cloudy).
5. Water is safe to drink after treatment.
✅ Free, no chemicals needed.

**Method 3 — Chemical Tablets (Iodine/Chlorine)**
1. Use 2 iodine tablets per 1 litre of water.
2. Crush tablets and mix thoroughly.
3. Wait 30 minutes before drinking.
4. If water is cold/cloudy, wait 60 minutes.
⚠️ Pregnant women and thyroid patients should avoid iodine.

**Method 4 — DIY Sand Filter**
1. Use a large plastic bottle, cut the bottom off.
2. Layer from top: clean cloth → fine sand (10cm) → coarse sand (10cm) → gravel (10cm).
3. Pour water through the top slowly.
4. Always boil or use tablets AFTER sand filtering.
⚠️ Sand filter removes particles but NOT all pathogens.`,
  },
  {
    keywords: [
      "food",
      "clean food",
      "wash vegetable",
      "spoil",
      "safe cook",
      "flood food",
      "contaminated food",
    ],
    title: "Food Cleaning & Safety",
    response: `**FOOD CLEANING & SAFETY**

**Washing Vegetables**
1. Use purified water only.
2. Scrub firm vegetables with a clean brush.
3. Rinse leafy greens in multiple changes of water.
4. Soak in saltwater (1 tsp per litre) for 5 minutes.
5. Rinse again with clean water before cooking.

**Detecting Spoiled Food**
✅ Safe: Normal color, firm texture, no unusual smell.
⚠️ Discard if: Foul smell, slimy texture, mould, strange color, bulging cans.
⚠️ Rule: When in doubt, throw it out.

**Safe Cooking in Disaster Zones**
1. Cook all meat and eggs thoroughly (internal temp above 70C).
2. Reheat leftovers until steaming hot.
3. Keep raw meat separate from cooked food.

**CRITICAL — Floodwater Contamination**
⚠️ Any food touched by floodwater must be DISCARDED.
⚠️ Floodwater contains sewage, chemicals, and pathogens.`,
  },
  {
    keywords: [
      "cpr",
      "cardiac",
      "heart",
      "chest compress",
      "resuscitat",
      "not breathing",
      "unconscious",
      "aed",
    ],
    title: "CPR Procedure",
    response: `**CPR — CARDIOPULMONARY RESUSCITATION**

**Adult CPR**
1. Check scene safety, then tap shoulders: "Are you OK?"
2. Call for help — shout for someone to assist. Call 108.
3. Lay person flat on their back on a firm surface.
4. Place heel of one hand on CENTER of chest (lower sternum).
5. Place other hand on top, fingers interlaced.
6. Compress chest at least 5cm deep at 100–120 beats/min.
7. After 30 compressions: tilt head, lift chin, give 2 rescue breaths.
8. Continue 30:2 ratio until help arrives or person breathes.

**Child CPR (1–12 years)**
1. Give 5 initial rescue breaths FIRST (unlike adult).
2. Use 1 or 2 hands depending on child's size. Compress 5cm deep.

**Infant CPR (under 1 year)**
1. 2 fingers BELOW nipple line on sternum.
2. Compress 4cm deep.
3. Cover infant's mouth AND nose with your mouth.
4. Give 5 initial rescue breaths first.

⚠️ Do not stop CPR unless person recovers or help arrives.`,
  },
  {
    keywords: [
      "wound",
      "cut",
      "bleed",
      "bandage",
      "lacerat",
      "injury",
      "gash",
      "pressure",
    ],
    title: "Wound Care",
    response: `**WOUND CARE — STEP BY STEP**

1. Ensure safety — wear gloves if available.
2. Apply direct pressure — press clean cloth firmly on wound.
3. Hold for 10 minutes — do NOT lift cloth (disturbs clotting).
4. Clean the wound — rinse with clean running water for 5 minutes.
5. Remove debris — use clean tweezers for visible particles.
6. Apply antiseptic — Betadine 5%/Savlon (diluted 1:30) around wound edges.
7. Apply Neosporin/Soframycin ointment — thin layer over wound.
8. Cover the wound — sterile bandage or clean cloth.

**Signs of Infection (seek help immediately)**
⚠️ Increasing redness or warmth around wound
⚠️ Swelling that worsens after 24 hours
⚠️ Pus or cloudy discharge
⚠️ Red streaks spreading from wound
⚠️ Fever above 38 degrees C`,
  },
  {
    keywords: ["burn", "scald", "hot water", "fire burn", "degree"],
    title: "Burn Treatment",
    response: `**BURN TREATMENT GUIDE**

**Immediate Steps (All Burns)**
1. Remove person from heat source — ensure your safety first.
2. Cool burn under COOL running water for 10–20 minutes.
3. Remove watches, rings, clothing near burn (before swelling).
4. Cover loosely with clean non-fluffy material.
⚠️ Do NOT use ice, butter, toothpaste, or flour on burns.

**Burn Types**
✅ 1st Degree — Red, dry, painful. Cool water + aloe.
⚠️ 2nd Degree — Blistered, wet, very painful. Keep blisters intact. Seek medical help.
⚠️ 3rd Degree — White/charred, no pain (nerve damage). EMERGENCY — seek help immediately.

**Chemical Burns**
1. Remove contaminated clothing.
2. Flush with large amounts of water for 20+ minutes.
⚠️ Do NOT neutralize chemical with another chemical.`,
  },
  {
    keywords: [
      "fever",
      "temperature",
      "paracetamol",
      "medicine fever",
      "high temp",
      "crocin",
      "dolo",
    ],
    title: "Fever Medicine Dosage",
    response: `**FEVER MEDICINE — DOSAGE BY AGE & GENDER**

**Paracetamol (Crocin / Dolo / Calpol)**

**Children under 12 years**
- <3 months: AVOID — doctor only
- 3–12 months: 60–120mg (Crocin syrup 120mg/5ml) every 6 hours
- 1–5 years: 120–250mg every 6 hours
- 6–12 years: 250–500mg every 6 hours
- Maximum: 4 doses per 24 hours

**Adult Male (18–60 years)**
- Dose: 500–1000mg per dose
- Frequency: Every 4–6 hours. Maximum: 4g per 24 hours

**Adult Female (18–60 years)**
- Dose: 500mg per dose. Frequency: Every 6 hours
⚠️ Pregnant: 500mg only — safest option. No Ibuprofen.

**Elderly (60+ years)**
- Dose: 500mg only. Frequency: Every 8 hours. Maximum: 2g per 24 hours

⚠️ NEVER give Aspirin (Ecosprin) to children under 16.
⚠️ Avoid if liver disease is present.
✅ Combine with cool damp cloth on forehead. Drink 2–3 litres water daily.`,
  },
  {
    keywords: [
      "headache",
      "body pain",
      "ibuprofen",
      "pain",
      "ache",
      "muscle pain",
      "brufen",
      "volini",
    ],
    title: "Headache & Body Pain",
    response: `**HEADACHE & BODY PAIN — DOSAGE GUIDE**

**Ibuprofen (Brufen / Combiflam)**

**Adult Male (18–60 years)**
- Dose: 400mg every 6–8 hours. Always take WITH food or milk.

**Adult Female (18–60 years)**
- Dose: 400mg every 6–8 hours with food
⚠️ AVOID during pregnancy — use Paracetamol instead

**Children (3 months–12 years)**
- 3–12 months: 50mg every 8 hours WITH food
- 1–5 years: 100mg every 8 hours with food
- 6–12 years: 200mg every 8 hours with food

**Elderly (60+)**
- Use Paracetamol preferably — if Ibuprofen needed: 200mg every 8 hours

**Topical (local pain):**
✅ Volini gel / Diclofenac gel — apply 3–4 times daily on affected area.

⚠️ Avoid Ibuprofen if: kidney disease, stomach ulcers, pregnancy, dengue suspected`,
  },
  {
    keywords: [
      "cough",
      "cold",
      "flu",
      "sneezing",
      "sore throat",
      "runny nose",
      "congestion",
    ],
    title: "Cough & Cold Treatment",
    response: `**COUGH & COLD TREATMENT**

**Home Remedies (First Line)**
1. Steam inhalation: Boil water, breathe steam with towel over head for 10 min.
2. Honey + Ginger tea: 1 tsp honey + 1 tsp ginger juice in warm water.
3. Salt water gargle: half tsp salt in warm water, gargle 3x daily.
4. Turmeric milk: 1 tsp turmeric in warm milk before bed.
5. Rest completely — your body heals fastest at rest.

**Medicines**
- Dry cough: Dextromethorphan syrup (follow pack instructions)
- Wet cough: Guaifenesin (expectorant) — loosens mucus
- Blocked nose: Saline nasal drops (Nasivion/Otrivin), steam inhalation

**ORS (Oral Rehydration)**
- Mix: 1 litre clean water + 6 tsp sugar + half tsp salt

⚠️ Seek Help Immediately If:
⚠️ Breathing difficulty or rapid breathing
⚠️ Chest pain when coughing
⚠️ Coughing blood
⚠️ High fever (above 39C) not responding to paracetamol`,
  },
  {
    keywords: ["flood", "flooding", "flash flood", "floodwater", "inundation"],
    title: "Flood Precautions",
    response: `**FLOOD PRECAUTIONS & SURVIVAL**

**Before the Flood**
1. Move important documents to highest floor in waterproof bag.
2. Turn off electricity at main breaker if water is rising.
3. Fill bathtub and containers with clean water.
4. Move to higher ground before water reaches your area.

**During a Flood**
✅ Stay above water level — upper floors or rooftop.
⚠️ Never walk through floodwater — 15cm can knock you down.
⚠️ 30cm water can move a car — TURN BACK.
⚠️ Do not touch electrical equipment if wet.

**Hideout Locations**
✅ Upper floors or roof (if structure is sound)
✅ Higher ground hills or elevated areas
⚠️ Avoid basements — trap quickly, hard to escape`,
  },
  {
    keywords: ["earthquake", "tremor", "seismic", "quake", "aftershock"],
    title: "Earthquake Precautions",
    response: `**EARTHQUAKE PRECAUTIONS — DROP COVER HOLD**

**During Shaking**
1. DROP to hands and knees immediately.
2. COVER under a sturdy table or desk.
3. HOLD ON until shaking completely stops.
4. Stay away from windows, exterior walls, heavy furniture.
⚠️ Do NOT run outside during shaking.

**After Shaking Stops**
1. Check yourself and others for injuries.
2. Smell for gas — if present, open windows and evacuate.
3. Expect aftershocks — they can be strong.

**Safe Hideout Locations**
✅ Open field away from buildings and power lines
✅ Under a sturdy table during shaking
⚠️ Avoid tall buildings, bridges, old structures`,
  },
  {
    keywords: ["cyclone", "typhoon", "hurricane", "storm", "gale"],
    title: "Cyclone Precautions",
    response: `**CYCLONE PRECAUTIONS & SURVIVAL**

**During the Cyclone**
✅ Stay INDOORS throughout the storm.
✅ Shelter in the INTERIOR room — bathroom or hallway.
✅ Stay away from all windows and glass doors.
⚠️ Do NOT go outside during the eye — storm WILL resume.

**Safe Hideout Locations**
✅ Ground floor interior room (away from windows)
✅ Designated cyclone shelter buildings
⚠️ Avoid mobile homes, caravans, light structures`,
  },
  {
    keywords: ["landslide", "mudslide", "slope", "hill collapse", "mudflow"],
    title: "Landslide Precautions",
    response: `**LANDSLIDE PRECAUTIONS & SURVIVAL**

**Warning Signs**
⚠️ Cracks appearing in hillside soil
⚠️ Rumbling or cracking sounds from hillside
⚠️ Tilting trees, fences, or walls
⚠️ Water turning muddy in streams suddenly

**During a Landslide**
1. Move QUICKLY away from the slide path.
2. Move to the SIDE of the path — not up or down.

**Safe Hideout Locations**
✅ Opposite slope, away from the affected hillside
✅ Open flat ground away from valleys
⚠️ Never shelter at the base of a cliff`,
  },
  {
    keywords: [
      "hideout",
      "shelter",
      "hide",
      "where to go",
      "safe place",
      "refuge",
    ],
    title: "Hideout & Shelter Guide",
    response: `**HIDEOUT & SHELTER BY DISASTER TYPE**

**Flood** ✅ Upper floors of solid brick/concrete buildings ✅ Rooftop or elevated platforms ⚠️ Avoid: Basements, ground floors
**Earthquake** ✅ Open field away from all structures ⚠️ Avoid: Near windows, tall shelves
**Cyclone** ✅ Interior room of a solid building (hallway, bathroom) ⚠️ Avoid: Mobile homes, upper floors
**Landslide** ✅ Move to OPPOSITE side of the slope ⚠️ Avoid: Valley bottoms, base of cliffs`,
  },
  {
    keywords: [
      "radio",
      "frequency",
      "mayday",
      "morse",
      "sos",
      "distress signal",
      "emergency signal",
      "ham",
    ],
    title: "Radio & Emergency Signals",
    response: `**RADIO USE & EMERGENCY SIGNALS**

**Emergency Radio Frequencies (India)**
- 156.8 MHz (Channel 16) — Marine/Coastal distress
- 121.5 MHz — Aviation emergency
- 14.300 MHz — International ham radio emergency
- AM 1000 kHz — All India Radio emergency broadcasts

**How to Send a MAYDAY Call**
1. Tune to Channel 16 (156.8 MHz).
2. Press and hold transmit. Say: MAYDAY MAYDAY MAYDAY (three times).
3. State your name, position, emergency, assistance needed.
4. Release button and wait 10 seconds.

**Morse Code SOS**
✅ S = dot dot dot · O = dash dash dash · S = dot dot dot
✅ Flash torch: 3 short, 3 long, 3 short, pause, repeat.`,
  },
  {
    keywords: [
      "electricity",
      "power",
      "solar",
      "generator",
      "charge",
      "battery",
      "power bank",
    ],
    title: "Electricity Generation",
    response: `**EMERGENCY ELECTRICITY GENERATION**

**Solar Panel Setup**
1. Position panel facing south (India) at 15–20 degree angle.
2. Connect panel to charge controller.
3. Connect to 12V battery, then USB/DC inverter for devices.

**Power Bank Priority Order**
1. Emergency radio (communications first)
2. Mobile phone (calls + GPS)
3. Torch/LED lighting
4. Medical devices (glucose meters, hearing aids)

✅ Airplane mode reduces power consumption by ~50%
✅ Minimum screen brightness extends battery 2x`,
  },
  {
    keywords: [
      "evacuate",
      "evacuation",
      "when to leave",
      "leave now",
      "danger sign",
    ],
    title: "Evacuation Signs",
    response: `**SIGNS YOU MUST EVACUATE IMMEDIATELY**

⚠️ 1. Rising Water — Floodwater entering ground floor.
⚠️ 2. Gas Leak / Smell — Walk out immediately. Do not use switches.
⚠️ 3. Structural Damage — Cracks spreading rapidly in walls or floors.
⚠️ 4. Landslide Rumble — Rumbling from nearby hillside.
⚠️ 5. Official Order — Any official evacuation order must be obeyed immediately.

**60-Second Evacuation Bag**
✅ Aadhar/identity documents in waterproof pouch
✅ Cash (ATMs may not work)
✅ Charged mobile phone + power bank
✅ 1 litre water per person
✅ Essential medicines (3-day supply)`,
  },
  {
    keywords: [
      "clothing",
      "wear",
      "clothes",
      "dress",
      "what to wear",
      "outfit",
    ],
    title: "Clothing Guide for Disasters",
    response: `**CLOTHING GUIDE — WHAT TO WEAR BY DISASTER**

**Flood** ✅ Rubber waterproof boots ✅ Light quick-dry synthetic clothing ✅ Bright colored jacket (visibility) ⚠️ Avoid: Cotton jeans (heavy when wet)
**Earthquake** ✅ Closed-toe sturdy shoes ✅ Helmet if available ✅ Long sleeves and pants
**Cyclone** ✅ Stay indoors ✅ If must go out: waterproof jacket, eye protection ⚠️ Avoid: Umbrellas (become projectiles)
**Landslide** ✅ Rubber boots ✅ Old clothing you can discard ✅ Face mask over nose/mouth`,
  },
  {
    keywords: [
      "kit",
      "bag",
      "supply",
      "72 hour",
      "emergency bag",
      "disaster kit",
      "pack",
      "prepare",
    ],
    title: "72-Hour Disaster Kit",
    response: `**72-HOUR EMERGENCY DISASTER KIT**

**Water & Food**
✅ 4 litres water per person ✅ Water purification tablets ✅ Non-perishable foods: puffed rice, biscuits, dry fruits, canned food

**Medical**
✅ Paracetamol (Crocin/Dolo) ✅ ORS sachets ✅ Betadine + Neosporin/Soframycin ointment ✅ Bandages, gauze ✅ Gloves + Thermometer ✅ Prescription medications (7-day supply)

**Tools & Lighting**
✅ Torch + extra batteries ✅ Whistle ✅ Multi-tool ✅ Waterproof matches + lighter ✅ Rope (10 metres)

**Communication & Documents**
✅ Battery/solar radio ✅ Fully charged power bank ✅ Aadhar card copies ✅ Cash (2000–5000 rupees in small notes)`,
  },
  ...MEDICAL_KB_ENTRIES,
];

const QUICK_CHIPS = [
  "How to purify water?",
  "CPR steps",
  "Flood precautions",
  "Treat a wound",
  "Fever medicine dosage",
  "Snakebite India protocol",
  "Heatstroke Vijayawada",
  "Child medicine dosage",
  "Pregnancy emergency",
  "Asthma attack",
  "Diabetic emergency",
  "Fracture first aid",
  "Elderly care disaster",
  "What to pack in kit",
];

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "ai",
  text: `**WELCOME TO LOCAL-EYES AI ASSISTANT**

I am your disaster survival guide for India and Andhra Pradesh. Ask me anything about:

✅ First Aid — CPR, wounds, burns, fractures, severe bleeding
✅ Medical — snakebite, heatstroke, asthma, diabetes, anaphylaxis
✅ Pregnancy — emergency delivery, eclampsia, postpartum
✅ Pediatric — child medicine dosages, infant CPR, choking
✅ Elderly — falls, medication risks, heat vulnerability
✅ Disasters — flood, earthquake, cyclone, landslide
✅ Survival — water purification, food safety, radio signals

Select a quick topic below or type your question.

💡 Toggle 'Online' in the header for live Gemini AI answers (requires API key + internet).`,
};

function getBotResponse(query: string): string {
  const lower = query.toLowerCase();
  const words = lower.split(/\s+/);

  let best: { entry: KBEntry; score: number } | null = null;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      const kwLower = kw.toLowerCase();
      if (lower.includes(kwLower)) {
        score += kw.split(" ").length * 2;
      } else {
        for (const w of words) {
          if (w.length > 3 && kwLower.includes(w)) score += 1;
        }
        for (const kwWord of kwLower.split(/\s+/)) {
          if (kwWord.length > 3 && lower.includes(kwWord)) score += 1;
        }
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  if (best && best.score > 0) return best.entry.response;

  return `I don't have specific info on that, but I can help with:\n\n✅ Water purification methods (boiling, SODIS, tablets)\n✅ First Aid (CPR, wounds, burns, fever, pain)\n✅ Disaster survival (floods, earthquakes, cyclones, landslides)\n✅ Emergency kits, clothing, radio signals\n\nTry asking: "How to purify water?", "CPR steps", or "What to do in a flood?"\n\n⚠️ For life-threatening emergencies, call 112 (India Emergency) when possible.`;
}

function renderLine(line: string, lineKey: string) {
  if (!line.trim()) return <div key={lineKey} className="h-1" />;
  if (/^\*\*[^*]+\*\*$/.test(line.trim())) {
    return (
      <p
        key={lineKey}
        className="font-bold uppercase tracking-wide text-xs mt-2"
        style={{ color: "oklch(0.82 0.15 85)" }}
      >
        {line.replace(/\*\*/g, "")}
      </p>
    );
  }
  if (line.startsWith("⚠️") || line.startsWith("⚠")) {
    return (
      <p
        key={lineKey}
        className="flex gap-1.5"
        style={{ color: "oklch(0.75 0.16 45)" }}
      >
        <span className="shrink-0">⚠️</span>
        <span>{line.replace(/^⚠️?\s*/, "")}</span>
      </p>
    );
  }
  if (line.startsWith("✅")) {
    return (
      <p
        key={lineKey}
        className="flex gap-1.5"
        style={{ color: "oklch(0.75 0.18 145)" }}
      >
        <span className="shrink-0">✅</span>
        <span>{line.replace(/^✅\s*/, "")}</span>
      </p>
    );
  }
  if (/^\d+\.\s/.test(line)) {
    return (
      <p
        key={lineKey}
        className="flex gap-2"
        style={{ color: "oklch(0.88 0.01 95)" }}
      >
        <span
          className="shrink-0 font-bold"
          style={{ color: "oklch(0.82 0.15 85)" }}
        >
          {line.match(/^\d+/)![0]}.
        </span>
        <span>{line.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "")}</span>
      </p>
    );
  }
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p key={lineKey} style={{ color: "oklch(0.88 0.01 95)" }}>
      {parts.map((part, j) =>
        part.startsWith("**") && part.endsWith("**") ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: inline bold parts are static
          <strong key={j} style={{ color: "oklch(0.92 0.01 95)" }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </p>
  );
}

function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="text-sm leading-relaxed space-y-1">
      {lines.map((line, i) => renderLine(line, `line-${i}`))}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start" data-ocid="ai.loading_state">
      <div
        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mr-2"
        style={{
          background: "oklch(0.82 0.15 85 / 0.12)",
          border: "1px solid oklch(0.82 0.15 85 / 0.25)",
        }}
      >
        <Bot className="w-3.5 h-3.5" style={{ color: "oklch(0.82 0.15 85)" }} />
      </div>
      <div
        className="px-4 py-3 rounded-2xl flex gap-1 items-center"
        style={{
          background: "oklch(0.19 0.007 95)",
          border: "1px solid oklch(0.29 0.007 95)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "oklch(0.82 0.15 85)" }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function scrollToBottom(ref: React.RefObject<HTMLDivElement | null>) {
  const el = ref.current?.querySelector("[data-radix-scroll-area-viewport]");
  if (el) el.scrollTop = el.scrollHeight;
}

const GEMINI_SYSTEM_INSTRUCTION =
  "You are Local-Eyes AI, a disaster survival and medical expert for India and Andhra Pradesh. Give detailed, step-by-step, actionable answers about: water purification, food safety, first aid (CPR, wounds, burns, fractures, severe bleeding, snakebite, heatstroke, drowning, electrocution), medical emergencies (asthma, anaphylaxis, diabetic emergencies, dental emergencies), pregnancy and obstetric emergencies (labour, emergency delivery, eclampsia, postpartum hemorrhage), pediatric emergencies (child medicine dosages, infant CPR, choking, febrile seizures), elderly care (falls, hip fracture, medication risks, heat vulnerability), disaster survival (floods, earthquakes, cyclones, landslides), emergency kit packing, radio signals, electricity generation, shelter/hideout. Always mention India-specific medicines available at Indian pharmacies/chemists (Paracetamol=Crocin/Dolo, Ibuprofen=Brufen/Combiflam, Salbutamol=Asthalin, Cetirizine=Alerid). Reference AP/Vijayawada context when relevant. NEVER give Aspirin to children. NEVER give NSAIDs to pregnant women. Format with numbered steps. Use ✅ for safe actions and ⚠️ for warnings. Be concise but complete.";

export function AIAssistant() {
  const { lang: appLang } = useLanguage();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [internetMode, setInternetMode] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState<string>(() => {
    return localStorage.getItem("localeyes_gemini_key") ?? "";
  });
  const [awaitingApiKey, setAwaitingApiKey] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => scrollToBottom(scrollAreaRef), 100);
      inputRef.current?.focus();
    }
  }, [open]);

  const appendMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    requestAnimationFrame(() => scrollToBottom(scrollAreaRef));
  }, []);

  function handleInternetModeToggle(checked: boolean) {
    if (!checked) {
      setInternetMode(false);
      setAwaitingApiKey(false);
      return;
    }
    // Turning ON
    if (!navigator.onLine) {
      appendMessage({
        id: `a-${Date.now()}`,
        role: "ai",
        text: "No internet connection detected. Please connect to the internet first, then enable Online Mode.",
      });
      return;
    }
    if (!geminiApiKey) {
      appendMessage({
        id: `a-${Date.now()}`,
        role: "ai",
        text: "To use Online Mode, please type your **Google Gemini API key** below.\n\n✅ It starts with 'AIza...' and is free from Google AI Studio (aistudio.google.com).\n\nType your key and press Send to activate Online Mode.",
      });
      setAwaitingApiKey(true);
      setInternetMode(true);
      return;
    }
    setInternetMode(true);
    appendMessage({
      id: `a-${Date.now()}`,
      role: "ai",
      text: "🌐 Online Mode activated! I'll now use Google Gemini for live, detailed answers. Ask me anything!",
    });
  }

  async function send(text?: string) {
    const txt = (text ?? input).trim();
    if (!txt || loading) return;
    setInput("");
    appendMessage({ id: `u-${Date.now()}`, role: "user", text: txt });

    // Handle API key input
    if (awaitingApiKey && txt.startsWith("AIza")) {
      localStorage.setItem("localeyes_gemini_key", txt);
      setGeminiApiKey(txt);
      setAwaitingApiKey(false);
      appendMessage({
        id: `a-${Date.now()}`,
        role: "ai",
        text: "✅ API key saved! Online Mode is now active. Ask me anything — I'll give you live, detailed answers powered by Google Gemini.",
      });
      return;
    }

    setLoading(true);

    // Online mode — call Gemini API
    if (internetMode && geminiApiKey && !awaitingApiKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }],
              },
              contents: [
                ...messages.slice(-10).map((m) => ({
                  role: m.role === "user" ? "user" : "model",
                  parts: [{ text: m.text }],
                })),
                { role: "user", parts: [{ text: txt }] },
              ],
            }),
          },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const aiText: string =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        if (aiText) {
          appendMessage({ id: `a-${Date.now()}`, role: "ai", text: aiText });
          setLoading(false);
          return;
        }
        throw new Error("Empty response");
      } catch {
        const offlineResp = getBotResponse(txt);
        appendMessage({
          id: `a-${Date.now()}`,
          role: "ai",
          text: `⚠️ (Online unavailable — using offline guide)\n\n${offlineResp}`,
        });
        setLoading(false);
        return;
      }
    }

    // Offline mode
    setTimeout(
      () => {
        const response = getBotResponse(txt);
        appendMessage({ id: `a-${Date.now()}`, role: "ai", text: response });
        setLoading(false);
      },
      700 + Math.random() * 400,
    );
  }

  // Cleanup recognition on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  function stopListening() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  }

  function handleMicClick() {
    setMicError(null);

    if (isListening) {
      stopListening();
      return;
    }

    if (!isSpeechSupported) return;

    const SpeechRecognitionCtor =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = speechLangMap[appLang] ?? "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      if (transcript) {
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      }
      setIsListening(false);
      recognitionRef.current = null;
      inputRef.current?.focus();
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      recognitionRef.current = null;
      if (
        event.error === "not-allowed" ||
        event.error === "permission-denied"
      ) {
        setMicError(
          "Microphone access denied. Please allow microphone permission in your browser settings and try again.",
        );
      } else if (event.error === "no-speech") {
        setMicError("No speech detected. Please try speaking again.");
      } else {
        setMicError("Speech recognition error. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setIsListening(false);
      recognitionRef.current = null;
      setMicError("Could not start microphone. Please try again.");
    }
  }

  function reset() {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setLoading(false);
    setAwaitingApiKey(false);
    stopListening();
    setMicError(null);
  }

  const isOnlineActive = internetMode && !awaitingApiKey && !!geminiApiKey;

  return (
    <>
      <motion.button
        type="button"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-glow flex items-center justify-center"
        style={{
          background: internetMode
            ? "oklch(0.82 0.15 85)"
            : "oklch(0.82 0.15 85)",
          color: "oklch(0.13 0.007 95)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        data-ocid="ai.open_modal_button"
        aria-label="Open AI assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "oklch(0.08 0.007 95 / 0.7)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 35 }}
              className="fixed top-0 right-0 h-full z-50 w-full md:w-[440px] flex flex-col shadow-2xl"
              style={{
                background: "oklch(0.17 0.007 95)",
                borderLeft: "1px solid oklch(0.29 0.007 95)",
              }}
              data-ocid="ai.modal"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4 flex-shrink-0"
                style={{ borderBottom: "1px solid oklch(0.27 0.007 95)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: "oklch(0.82 0.15 85 / 0.15)",
                      border: "1px solid oklch(0.82 0.15 85 / 0.35)",
                    }}
                  >
                    <Bot
                      className="w-4 h-4"
                      style={{ color: "oklch(0.82 0.15 85)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-display font-bold text-sm uppercase tracking-wider"
                      style={{ color: "oklch(0.92 0.01 95)" }}
                    >
                      Local-Eyes AI
                    </p>
                    <div className="flex items-center gap-1.5">
                      {isOnlineActive ? (
                        <>
                          <Wifi
                            className="w-3 h-3"
                            style={{ color: "oklch(0.82 0.15 85)" }}
                          />
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "oklch(0.82 0.15 85)" }}
                          >
                            Online Mode
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className="w-2 h-2 rounded-full pulse-dot inline-block"
                            style={{ background: "oklch(0.65 0.18 145)" }}
                          />
                          <span
                            className="text-xs"
                            style={{ color: "oklch(0.65 0.18 145)" }}
                          >
                            Offline Mode
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right controls: Online toggle + refresh + close */}
                <div className="flex items-center gap-2">
                  {/* Internet Mode Toggle */}
                  <div className="flex items-center gap-1.5">
                    {internetMode ? (
                      <Wifi
                        className="w-3.5 h-3.5"
                        style={{ color: "oklch(0.82 0.15 85)" }}
                      />
                    ) : (
                      <WifiOff
                        className="w-3.5 h-3.5"
                        style={{ color: "oklch(0.50 0.01 95)" }}
                      />
                    )}
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: internetMode
                          ? "oklch(0.82 0.15 85)"
                          : "oklch(0.55 0.01 95)",
                      }}
                    >
                      Online
                    </span>
                    <Switch
                      checked={internetMode}
                      onCheckedChange={handleInternetModeToggle}
                      data-ocid="ai.toggle"
                      aria-label="Toggle online mode"
                      className="scale-75 origin-right"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    className="p-2 rounded-lg transition-colors hover:bg-white/5"
                    title="Clear conversation"
                    data-ocid="ai.secondary_button"
                    style={{ color: "oklch(0.60 0.01 95)" }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg transition-colors hover:bg-white/5"
                    data-ocid="ai.close_button"
                    style={{ color: "oklch(0.60 0.01 95)" }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Online mode banner */}
              <AnimatePresence>
                {isOnlineActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden flex-shrink-0"
                  >
                    <div
                      className="px-5 py-2 flex items-center gap-2 text-xs font-medium"
                      style={{
                        background: "oklch(0.82 0.15 85 / 0.08)",
                        borderBottom: "1px solid oklch(0.82 0.15 85 / 0.2)",
                        color: "oklch(0.82 0.15 85)",
                      }}
                    >
                      <Wifi className="w-3.5 h-3.5 flex-shrink-0" />
                      Powered by Google Gemini — Live, detailed disaster answers
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.role === "ai" && (
                        <div
                          className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5"
                          style={{
                            background: "oklch(0.82 0.15 85 / 0.12)",
                            border: "1px solid oklch(0.82 0.15 85 / 0.25)",
                          }}
                        >
                          <Bot
                            className="w-3.5 h-3.5"
                            style={{ color: "oklch(0.82 0.15 85)" }}
                          />
                        </div>
                      )}
                      <div
                        className="max-w-[85%] px-4 py-3 rounded-2xl"
                        style={
                          msg.role === "user"
                            ? {
                                background: "oklch(0.82 0.15 85 / 0.18)",
                                border: "1px solid oklch(0.82 0.15 85 / 0.3)",
                                borderBottomRightRadius: "4px",
                              }
                            : {
                                background: "oklch(0.19 0.007 95)",
                                border: "1px solid oklch(0.29 0.007 95)",
                                borderTopLeftRadius: "4px",
                              }
                        }
                      >
                        {msg.role === "user" ? (
                          <p
                            className="text-sm"
                            style={{ color: "oklch(0.92 0.018 82)" }}
                          >
                            {msg.text}
                          </p>
                        ) : (
                          <FormattedMessage text={msg.text} />
                        )}
                      </div>
                    </div>
                  ))}
                  {loading && <TypingIndicator />}
                </div>
              </ScrollArea>

              {/* Quick chips */}
              {messages.length <= 2 && !loading && (
                <div
                  className="px-4 py-3 flex-shrink-0 overflow-x-auto"
                  style={{ borderTop: "1px solid oklch(0.24 0.007 95)" }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: "oklch(0.55 0.01 95)" }}
                  >
                    Quick topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => send(chip)}
                        className="text-xs px-3 py-1.5 rounded-full transition-colors"
                        style={{
                          background: "oklch(0.23 0.007 95)",
                          border: "1px solid oklch(0.33 0.007 95)",
                          color: "oklch(0.80 0.01 95)",
                        }}
                        data-ocid="ai.toggle"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div
                className="flex flex-col gap-1.5 p-4 flex-shrink-0"
                style={{ borderTop: "1px solid oklch(0.27 0.007 95)" }}
              >
                {/* Mic error message */}
                {micError && (
                  <div
                    className="text-xs px-3 py-2 rounded-lg"
                    style={{
                      background: "oklch(0.65 0.16 27 / 0.12)",
                      border: "1px solid oklch(0.65 0.16 27 / 0.3)",
                      color: "oklch(0.75 0.16 45)",
                    }}
                    data-ocid="ai.error_state"
                  >
                    {micError}
                  </div>
                )}

                {/* Listening indicator */}
                {isListening && (
                  <motion.div
                    className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: "oklch(0.65 0.16 27 / 0.1)",
                      border: "1px solid oklch(0.65 0.16 27 / 0.25)",
                      color: "oklch(0.75 0.16 27)",
                    }}
                    data-ocid="ai.loading_state"
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: "oklch(0.65 0.2 27)" }}
                      animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                      transition={{
                        duration: 1.2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    Listening... Speak now
                  </motion.div>
                )}

                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    placeholder={
                      awaitingApiKey
                        ? "Paste your Gemini API key (AIza...)"
                        : isOnlineActive
                          ? "Ask Gemini AI anything..."
                          : "Ask anything — water, CPR, floods..."
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    className="flex-1 text-sm"
                    type={awaitingApiKey ? "password" : "text"}
                    style={{
                      background: "oklch(0.21 0.007 95)",
                      borderColor: awaitingApiKey
                        ? "oklch(0.82 0.15 85 / 0.5)"
                        : isListening
                          ? "oklch(0.65 0.2 27 / 0.6)"
                          : "oklch(0.31 0.007 95)",
                      color: "oklch(0.92 0.01 95)",
                    }}
                    data-ocid="ai.input"
                  />

                  {/* Microphone button — hidden if Speech API not supported */}
                  {isSpeechSupported && !awaitingApiKey && (
                    <motion.button
                      type="button"
                      onClick={handleMicClick}
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center relative"
                      style={{
                        background: isListening
                          ? "oklch(0.65 0.2 27 / 0.2)"
                          : "oklch(0.24 0.007 95)",
                        border: isListening
                          ? "1px solid oklch(0.65 0.2 27 / 0.5)"
                          : "1px solid oklch(0.34 0.007 95)",
                        color: isListening
                          ? "oklch(0.75 0.2 27)"
                          : "oklch(0.65 0.01 95)",
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.92 }}
                      title={isListening ? "Stop recording" : "Voice input"}
                      aria-label={
                        isListening ? "Stop recording" : "Start voice input"
                      }
                      data-ocid="ai.toggle"
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                      {isListening && (
                        <motion.span
                          className="absolute inset-0 rounded-xl"
                          style={{
                            border: "2px solid oklch(0.65 0.2 27 / 0.6)",
                          }}
                          animate={{
                            opacity: [0.8, 0, 0.8],
                            scale: [1, 1.25, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.button>
                  )}

                  <Button
                    size="icon"
                    className="flex-shrink-0 rounded-xl"
                    style={{
                      background: "oklch(0.82 0.15 85)",
                      color: "oklch(0.13 0.007 95)",
                    }}
                    onClick={() => send()}
                    disabled={loading || !input.trim()}
                    data-ocid="ai.submit_button"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
