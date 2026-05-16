// Body zone data for interactive anatomical first aid map
// India MOH-aligned. All medicines from Indian pharmacies.

export interface ZoneScenario {
  id: string;
  title: string;
  severity: "low" | "moderate" | "high" | "critical";
  steps: string[];
  medicines: {
    name: string;
    dosage: string;
    ageGroup: string;
    frequency: string;
    notes: string;
  }[];
  warnings: string[];
  doNot: string[];
}

export interface BodyZone {
  id: string;
  label: string;
  color: string; // oklch highlight
  scenarios: ZoneScenario[];
}

// Re-export extended body zone data
export * from "./bodyZoneData.extended";

export const BODY_ZONE_DATA: Record<string, BodyZone> = {
  head: {
    id: "head",
    label: "Head",
    color: "oklch(0.60 0.18 25)",
    scenarios: [
      {
        id: "scalp_wound",
        title: "Scalp Wound / Laceration",
        severity: "moderate",
        steps: [
          "Apply firm pressure with clean cloth — scalp bleeds heavily even for small cuts.",
          "Do NOT press if skull feels soft or depressed underneath.",
          "Hold pressure for 10-15 minutes continuously.",
          "If bleeding controlled: clean with Savlon diluted in water.",
          "Apply Betadine around wound edges. Cover with sterile gauze.",
          "Deep cuts may need stitches — go to hospital.",
        ],
        medicines: [
          {
            name: "Betadine 5% solution",
            dosage: "Apply to wound edges",
            ageGroup: "All ages",
            frequency: "Once when cleaning",
            notes: "Do NOT apply inside wound",
          },
          {
            name: "Paracetamol 500mg (Crocin/Dolo)",
            dosage: "1 tablet",
            ageGroup: "Adult",
            frequency: "Every 6 hours for pain",
            notes: "",
          },
          {
            name: "Paracetamol syrup (Crocin)",
            dosage: "10-15 mg/kg per dose",
            ageGroup: "Child",
            frequency: "Every 6 hours",
            notes: "",
          },
        ],
        warnings: [
          "If skull feels soft/spongy under the wound: do NOT press hard — possible fracture",
          "Severe headache after scalp wound = possible concussion — hospital",
          "Scalp wound with clear fluid leaking = skull fracture emergency",
        ],
        doNot: [
          "Do NOT apply strong pressure if skull fracture is suspected",
          "Do NOT wash with alcohol directly on wound",
        ],
      },
      {
        id: "concussion",
        title: "Concussion",
        severity: "high",
        steps: [
          "Check AVPU: Alert? Verbal response? Pain only? Unresponsive?",
          "Lay person on their back in a safe position. Stabilize head.",
          "Note: headache, nausea, dizziness, confusion, sensitivity to light.",
          "Do NOT give food/water until fully alert.",
          "Monitor every 5 minutes. Document any changes.",
          "Transport to hospital — all concussions need observation.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "Only if conscious and can swallow",
          },
        ],
        warnings: [
          "Worsening headache, repeated vomiting, unequal pupils = emergency",
          "Loss of consciousness even briefly = hospital mandatory",
          "Confusion, slurred speech, seizures = call 108 immediately",
        ],
        doNot: [
          "Do NOT give Aspirin or Ibuprofen — increases bleeding risk",
          "Do NOT let person 'sleep it off' without supervision",
          "Do NOT leave person alone for first 24 hours",
        ],
      },
      {
        id: "skull_fracture",
        title: "Skull Fracture",
        severity: "critical",
        steps: [
          "Call 108 immediately.",
          "Do NOT move the person unless in immediate danger.",
          "If no spinal injury suspected: lay person flat with head and shoulders slightly raised.",
          "If unconscious and breathing: recovery position (log-roll with spinal precautions).",
          "Stop any scalp bleeding with gentle pressure — do NOT press firmly on fracture site.",
          "Monitor AVPU every 5 minutes until help arrives.",
        ],
        medicines: [],
        warnings: [
          "Clear fluid (CSF) from nose or ears = skull fracture — do NOT plug",
          "'Raccoon eyes' (bruising around both eyes) = skull base fracture",
          "Battle's sign (bruising behind ear) = skull base fracture",
          "Any seizure = call 108 immediately",
        ],
        doNot: [
          "Do NOT press firmly on the fracture site",
          "Do NOT plug ears or nose if fluid is leaking",
          "Do NOT give any oral medications",
          "Do NOT move without spinal precautions",
        ],
      },
      {
        id: "facial_burns",
        title: "Facial Burns",
        severity: "high",
        steps: [
          "Remove person from burn source immediately.",
          "Cool burn with running cool (not ice cold) water for 20 minutes.",
          "Remove spectacles, earrings, or any facial jewelry before swelling starts.",
          "Cover face loosely with clean damp cloth — do NOT use tight bandages on face.",
          "Call 108 — facial burns near airway are a breathing emergency.",
          "Keep person sitting upright if possible to reduce swelling.",
        ],
        medicines: [
          {
            name: "Burnol cream (Turmeric + antiseptic)",
            dosage: "Apply thin layer",
            ageGroup: "All ages",
            frequency: "After cooling, every dressing change",
            notes: "Available at all Indian pharmacies",
          },
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours for pain",
            notes: "",
          },
        ],
        warnings: [
          "Singed eyebrows or nasal hair = airway burn — emergency",
          "Hoarse voice, stridor, or difficulty swallowing after burn = airway burn — call 108",
          "Burns involving >10% body surface = hospital emergency",
        ],
        doNot: [
          "Do NOT apply toothpaste, ghee, butter, or egg on burns",
          "Do NOT use ice water — causes frostbite",
          "Do NOT pop blisters on face",
          "Do NOT apply tight bandage around neck/face",
        ],
      },
      {
        id: "head_immobilization",
        title: "Head & Neck Immobilization",
        severity: "critical",
        steps: [
          "Suspect spinal injury with ALL serious head injuries — immobilize head.",
          "Place both hands on either side of the head. Keep head in neutral position.",
          "Do NOT flex, extend, or rotate the neck at all.",
          "If person must be moved: use log-roll technique with minimum 3 people.",
          "One person controls the head exclusively during any movement.",
          "Call 108 and describe mechanism of injury clearly.",
        ],
        medicines: [],
        warnings: [
          "Any suspected fall from height, vehicle accident, or dive injury = assume spinal injury",
          "Tingling, numbness, or weakness in limbs = spinal cord involvement",
        ],
        doNot: [
          "Do NOT let person move head",
          "Do NOT place pillow under head",
          "Do NOT remove helmet if worn — cut straps only if airway is needed",
        ],
      },
    ],
  },
  eyes: {
    id: "eyes",
    label: "Eyes",
    color: "oklch(0.58 0.17 260)",
    scenarios: [
      {
        id: "foreign_object_eye",
        title: "Foreign Object in Eye",
        severity: "moderate",
        steps: [
          "Do NOT rub the eye — pushes object deeper.",
          "Try to blink rapidly — tears may wash out small particles.",
          "Flush with clean water: pour from inner corner outward for 10-15 minutes.",
          "If visible and loose: lift upper lid over lower lid to dislodge.",
          "If object is not coming out: cover eye with clean pad and go to hospital.",
        ],
        medicines: [
          {
            name: "Saline eye drops (Locula eye drops)",
            dosage: "2-3 drops",
            ageGroup: "All ages",
            frequency: "To help flush debris",
            notes: "Available at Indian chemists",
          },
        ],
        warnings: [
          "Object embedded in eyeball: do NOT remove — cover BOTH eyes and rush to hospital",
          "Metal fragments or shards: hospital only — do not attempt removal",
        ],
        doNot: [
          "Do NOT rub the eye",
          "Do NOT try to remove embedded objects",
          "Do NOT touch eye with unwashed hands",
        ],
      },
      {
        id: "chemical_eye_splash",
        title: "Chemical Splash in Eye",
        severity: "critical",
        steps: [
          "Flush eye IMMEDIATELY with large amounts of clean water.",
          "Hold eyelids open forcibly during flushing.",
          "Flush continuously for at least 20-30 minutes.",
          "Remove contact lenses if present — do not delay flushing to do this.",
          "Pour water from inner corner outward, not across to other eye.",
          "Rush to hospital with the chemical container/label.",
        ],
        medicines: [],
        warnings: [
          "Alkali (lime, caustic soda) burns are worse than acid — flush longer (30+ min)",
          "Time is critical — permanent blindness can occur within minutes",
          "Do not neutralize with acid/alkali — just flush with water",
        ],
        doNot: [
          "Do NOT delay flushing for any reason",
          "Do NOT try to neutralize the chemical with another substance",
          "Do NOT patch the eye before going to hospital",
        ],
      },
      {
        id: "eye_injury_blunt",
        title: "Blunt Eye Injury",
        severity: "high",
        steps: [
          "Do NOT rub or press on the eye.",
          "Apply a clean, loose eye pad — do NOT press.",
          "Have person keep both eyes closed — eyes move together.",
          "Apply cold compress gently AROUND the eye (not on it) for 15 min.",
          "Transport to hospital for examination.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "For pain relief only",
          },
        ],
        warnings: [
          "Blood visible inside the colored part of eye = hyphema — hospital immediately",
          "Sudden vision change, double vision, or severe pain = emergency",
          "Black eye with head injury = always rule out skull fracture",
        ],
        doNot: [
          "Do NOT press on the injured eye",
          "Do NOT give eye drops without medical advice after blunt trauma",
        ],
      },
      {
        id: "corneal_scratch",
        title: "Corneal Scratch / Abrasion",
        severity: "moderate",
        steps: [
          "Do NOT rub the eye.",
          "Rinse gently with clean water or saline eye drops.",
          "Keep eye closed to reduce pain.",
          "Cover with clean eye pad.",
          "Visit an eye doctor — corneal abrasions need antibiotic eye drops.",
        ],
        medicines: [
          {
            name: "Moxifloxacin eye drops (Moxicip)",
            dosage: "1 drop",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "Prescription antibiotic eye drops — pharmacy only",
          },
          {
            name: "Saline eye drops (Locula)",
            dosage: "2 drops",
            ageGroup: "All ages",
            frequency: "For flushing and comfort",
            notes: "",
          },
        ],
        warnings: [
          "Severe pain, photophobia (light sensitivity), or reduced vision = hospital same day",
          "Do not wear contact lenses until healed",
        ],
        doNot: [
          "Do NOT rub eye",
          "Do NOT use steroid eye drops without doctor advice",
        ],
      },
    ],
  },
  ears: {
    id: "ears",
    label: "Ears",
    color: "oklch(0.65 0.16 180)",
    scenarios: [
      {
        id: "bleeding_ear",
        title: "Bleeding from Ear",
        severity: "critical",
        steps: [
          "Do NOT attempt to stop bleeding by plugging the ear.",
          "If clear fluid (CSF): do NOT plug — let it drain.",
          "Cover outer ear loosely with clean, sterile gauze.",
          "Keep patient still. Lie on the bleeding side if possible.",
          "Call 108 immediately — bleeding or fluid from ear after head injury = skull fracture.",
        ],
        medicines: [],
        warnings: [
          "Ear bleeding after head injury = skull fracture — critical emergency",
          "Clear watery fluid from ear = CSF leak — do NOT plug",
          "Never probe the ear canal",
        ],
        doNot: [
          "Do NOT plug the ear canal",
          "Do NOT pour liquids into the ear",
          "Do NOT use cotton buds or probes",
        ],
      },
      {
        id: "foreign_object_ear",
        title: "Foreign Object in Ear",
        severity: "moderate",
        steps: [
          "Do NOT attempt to remove with fingers or cotton buds.",
          "If a live insect: tilt head, pour a few drops of clean cooking oil in ear — insect will suffocate.",
          "Tilt head to affected side — gravity may dislodge small objects.",
          "If not dislodged: go to hospital for safe removal.",
        ],
        medicines: [
          {
            name: "Waxsol ear drops",
            dosage: "2-3 drops",
            ageGroup: "Adult & Child >3 yrs",
            frequency: "To soften wax or help with live insects",
            notes: "Available at Indian pharmacies",
          },
        ],
        warnings: [
          "Do NOT probe with cotton buds — pushes object deeper and risks eardrum perforation",
          "Button batteries in ear = emergency — remove within 1 hour to avoid chemical burns",
        ],
        doNot: [
          "Do NOT probe with tweezers, pins, or cotton buds",
          "Do NOT flush ear with force if eardrum may be perforated",
        ],
      },
      {
        id: "blast_hearing_loss",
        title: "Hearing Loss After Blast / Explosion",
        severity: "high",
        steps: [
          "Move person away from blast zone to safety.",
          "Check for other injuries — blast injuries are often multiple.",
          "Do NOT shout — assume the person has temporary hearing loss.",
          "Check for blood or fluid from ear canal.",
          "Cover ears loosely with clean dressing if bleeding.",
          "Hospital for ear examination — eardrum perforation is common after blasts.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours for pain",
            notes: "",
          },
        ],
        warnings: [
          "Tinnitus (ringing) after blast + hearing loss = eardrum injury — hospital",
          "Dizziness after blast injury = inner ear damage or head injury",
        ],
        doNot: [
          "Do NOT insert anything in ear canal",
          "Do NOT expose to more loud noise until examined",
        ],
      },
    ],
  },
  nose_throat: {
    id: "nose_throat",
    label: "Nose / Throat",
    color: "oklch(0.65 0.17 140)",
    scenarios: [
      {
        id: "nosebleed",
        title: "Nosebleed (Epistaxis)",
        severity: "low",
        steps: [
          "Sit upright. Lean slightly FORWARD — not backward.",
          "Pinch the SOFT lower part of the nose firmly.",
          "Hold continuously for 10 full minutes — do not check.",
          "Apply cold wet cloth to forehead.",
          "After 10 min: if stopped, do not blow nose for 2 hours.",
          "If still bleeding at 30 min: hospital emergency.",
        ],
        medicines: [],
        warnings: [
          "Nosebleed after head injury = possible skull fracture — emergency",
          "Bleeding from both nostrils = hospital",
          "Blood draining into throat = risk of nausea/vomiting — lean forward",
          "On blood thinners (Warfarin, Ecosprin): hospital for bleeding >10 min",
        ],
        doNot: [
          "Do NOT tilt head backward — blood flows into airway",
          "Do NOT pack tissue deep into nostril",
          "Do NOT blow nose immediately after bleeding stops",
        ],
      },
      {
        id: "choking_adult",
        title: "Choking — Adult",
        severity: "critical",
        steps: [
          "Mild choking (can cough/speak): encourage strong coughing.",
          "Severe choking (silent, cannot speak, turning blue): act immediately.",
          "5 sharp back blows between shoulder blades with heel of hand.",
          "5 abdominal thrusts (Heimlich): stand behind, fist between navel and ribs, pull sharply inward+upward.",
          "Alternate 5 back blows + 5 abdominal thrusts until object dislodged or person loses consciousness.",
          "If unconscious: begin CPR. Look for visible object before each breath.",
        ],
        medicines: [],
        warnings: [
          "Silent person who cannot cough = severe obstruction — act immediately",
          "Blue lips (cyanosis) = oxygen deprivation — seconds matter",
          "Abdominal thrusts can cause internal injury — hospital check after if pregnant",
        ],
        doNot: [
          "Do NOT do abdominal thrusts on pregnant women — use chest thrusts instead",
          "Do NOT do finger sweeps blindly in mouth",
          "Do NOT slap back while person is upright unless also doing Heimlich",
        ],
      },
      {
        id: "throat_injury",
        title: "Throat / Neck Injury",
        severity: "critical",
        steps: [
          "Keep person calm and still.",
          "Do NOT bend or extend the neck.",
          "If wound: apply gentle pressure with clean cloth — do NOT apply pressure to both sides of neck simultaneously.",
          "Sit person upright if breathing is difficult.",
          "Call 108 immediately.",
          "Monitor for worsening breathing, swallowing difficulty, or voice change.",
        ],
        medicines: [],
        warnings: [
          "Neck wound with pulsating bleeding = major vessel injury — extreme emergency",
          "Swelling closing airway = prepare for difficult breathing — call 108",
          "Hoarse or muffled voice after neck injury = airway damage",
        ],
        doNot: [
          "Do NOT press on both sides of neck simultaneously — blocks blood flow to brain",
          "Do NOT remove any embedded object from throat/neck",
          "Do NOT give food or drink",
        ],
      },
      {
        id: "airway_obstruction",
        title: "Airway Obstruction / Unconscious",
        severity: "critical",
        steps: [
          "Check response — call for help.",
          "Open airway: tilt head back, lift chin (head-tilt chin-lift).",
          "Look, listen, feel for breathing for 10 seconds.",
          "Not breathing: give 2 rescue breaths.",
          "No pulse: begin CPR (30 compressions : 2 breaths at 100-120/min).",
          "Continue until breathing resumes or 108 arrives.",
        ],
        medicines: [],
        warnings: [
          "Suspected spinal injury: do NOT use head-tilt — use jaw thrust instead",
          "Vomit in airway: turn to side immediately and clear with fingers",
        ],
        doNot: [
          "Do NOT delay starting CPR to find AED or ambulance",
          "Do NOT perform abdominal thrusts on unconscious person",
        ],
      },
    ],
  },
  chest: {
    id: "chest",
    label: "Chest",
    color: "oklch(0.55 0.20 15)",
    scenarios: [
      {
        id: "rib_fracture",
        title: "Rib Fracture",
        severity: "high",
        steps: [
          "Support the injured side with arm or pillow held against chest.",
          "Encourage shallow breaths — deep breathing is painful but necessary.",
          "Sit person upright at 45 degrees — easier to breathe.",
          "Apply cold compress wrapped in cloth to area.",
          "Transport to hospital for X-ray.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin/Dolo)",
            dosage: "1-2 tablets",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "Take with food. Essential for breathing comfort",
          },
          {
            name: "Ibuprofen 400mg (Brufen/Combiflam)",
            dosage: "1 tablet",
            ageGroup: "Adult (non-elderly)",
            frequency: "Every 8 hours with food",
            notes:
              "Reduces inflammation. Avoid if elderly, kidney issues, or stomach ulcers",
          },
        ],
        warnings: [
          "3+ rib fractures in a row = flail chest — breathing paradox — emergency",
          "Difficulty breathing, blue lips = pneumothorax — emergency",
          "Coughing blood after rib injury = internal bleeding — call 108",
        ],
        doNot: [
          "Do NOT bind/strap the chest tightly — restricts breathing",
          "Do NOT push fractured rib area",
        ],
      },
      {
        id: "penetrating_chest",
        title: "Penetrating Chest Wound",
        severity: "critical",
        steps: [
          "Seal the wound with palm immediately — stops air entering chest.",
          "Create a 3-sided seal: use plastic wrapper, food packaging, or foil. Tape 3 sides, leave bottom open as one-way valve.",
          "Sit person at 45 degrees — semi-upright for easier breathing.",
          "Call 108 immediately.",
          "Monitor: if breathing gets worse, lift bottom of seal briefly (tension pneumothorax).",
        ],
        medicines: [],
        warnings: [
          "Sucking/gurgling sound from wound = open pneumothorax — seal immediately",
          "Trachea shifting to one side = tension pneumothorax — release seal briefly",
          "Do NOT remove any embedded object from chest",
        ],
        doNot: [
          "Do NOT remove impaled object",
          "Do NOT seal all 4 sides (causes tension pneumothorax)",
          "Do NOT lay person flat",
        ],
      },
      {
        id: "cardiac_arrest",
        title: "Cardiac Arrest / CPR",
        severity: "critical",
        steps: [
          "Check response: tap shoulders, shout.",
          "Call 108 immediately. Ask bystander to get AED if available.",
          "Check breathing for 10 seconds (look/listen/feel).",
          "Not breathing normally: place heel of hand on center of chest (lower half of sternum).",
          "Push hard and fast: at least 5-6cm deep, 100-120 compressions per minute.",
          "30 compressions : 2 rescue breaths. Continue until 108 arrives or person recovers.",
        ],
        medicines: [],
        warnings: [
          "Agonal gasping (slow, irregular gasps) = cardiac arrest — start CPR",
          "Do NOT stop CPR to check pulse — check only after 2 minutes",
          "If AED available: use it immediately — it talks you through each step",
        ],
        doNot: [
          "Do NOT delay CPR waiting for ambulance",
          "Do NOT compress on the very bottom tip of sternum (xiphoid)",
          "Do NOT give CPR to person who is breathing normally",
        ],
      },
      {
        id: "breathing_difficulty",
        title: "Difficulty Breathing (Dyspnea)",
        severity: "high",
        steps: [
          "Sit person upright — sitting forward with hands on knees (tripod position).",
          "Loosen any tight clothing around chest or neck.",
          "Keep calm — anxiety worsens breathing.",
          "If asthma: salbutamol inhaler (Asthalin) 2-4 puffs every 20 min.",
          "If no improvement in 15 min or lips/nails turning blue: call 108.",
          "Give oxygen if available.",
        ],
        medicines: [
          {
            name: "Salbutamol inhaler (Asthalin/Ventolin)",
            dosage: "2-4 puffs",
            ageGroup: "Adult & Child >5 yrs",
            frequency: "Every 20 min (max 3 times)",
            notes: "For asthma/COPD. Available OTC at Indian pharmacies",
          },
        ],
        warnings: [
          "Blue lips or fingertips (cyanosis) = low oxygen — emergency",
          "Silent chest (no wheeze in known asthma) = very severe — call 108",
          "Breathing difficulty with chest pain = possible heart attack — call 108",
        ],
        doNot: [
          "Do NOT lay person down — makes breathing harder",
          "Do NOT give too much water",
        ],
      },
      {
        id: "pneumothorax",
        title: "Pneumothorax (Collapsed Lung)",
        severity: "critical",
        steps: [
          "Position person sitting upright at 45 degrees.",
          "Call 108 immediately.",
          "For open chest wound: apply 3-sided chest seal.",
          "Monitor breathing rate and oxygen saturation if pulse oximeter available.",
          "Reassure — keep calm. Anxiety worsens breathing.",
          "If available: oxygen by mask.",
        ],
        medicines: [],
        warnings: [
          "Tension pneumothorax: trachea deviates, neck veins bulge — immediate hospital",
          "Sudden onset sharp chest pain + breathlessness + no injury = spontaneous pneumothorax",
          "Tall, thin young men are at higher risk of spontaneous pneumothorax",
        ],
        doNot: ["Do NOT lay person flat", "Do NOT delay hospital transport"],
      },
    ],
  },
  abdomen: {
    id: "abdomen",
    label: "Abdomen",
    color: "oklch(0.62 0.18 50)",
    scenarios: [
      {
        id: "internal_bleeding",
        title: "Suspected Internal Bleeding",
        severity: "critical",
        steps: [
          "Lay person flat on back. Elevate legs 30cm if no spinal injury.",
          "Keep person still and warm (blanket).",
          "Do NOT give food, water, or any oral medications.",
          "Call 108 immediately.",
          "Monitor: pulse rate, skin color (pale = shock), breathing, and consciousness.",
          "If vomiting: recovery position (on side) to prevent choking.",
        ],
        medicines: [],
        warnings: [
          "Signs of shock: pale, cold, clammy skin, rapid weak pulse, confusion",
          "Rigid/board-like abdomen = peritonitis — surgical emergency",
          "Blood in urine or vomit after abdominal trauma = call 108",
        ],
        doNot: [
          "Do NOT give food or drink",
          "Do NOT press firmly on suspected internal bleeding area",
          "Do NOT give painkillers — masks symptoms needed for diagnosis",
        ],
      },
      {
        id: "abdominal_wound",
        title: "Open Abdominal Wound",
        severity: "critical",
        steps: [
          "Call 108 immediately.",
          "If organs are exposed: do NOT push back inside.",
          "Cover exposed organs with clean damp cloth — keep moist.",
          "Cover over the cloth with cling film or clean plastic.",
          "Lay person on back with knees slightly bent (relaxes abdominal muscles).",
          "Keep person warm. Do not give food/water.",
        ],
        medicines: [],
        warnings: [
          "Evisceration (organs outside body) is a surgical emergency — hospital immediately",
          "Do NOT attempt to clean or probe the wound",
          "Keep exposed organs moist at all times",
        ],
        doNot: [
          "Do NOT push organs back inside",
          "Do NOT probe or clean the wound interior",
          "Do NOT apply tight bandages over exposed organs",
        ],
      },
      {
        id: "appendicitis_signs",
        title: "Appendicitis Signs",
        severity: "high",
        steps: [
          "Identify: pain beginning around navel, then moving to lower-right abdomen.",
          "Note associated symptoms: fever (low-grade), nausea, vomiting, loss of appetite.",
          "Rebound tenderness: press on right lower abdomen, release quickly — sharp pain on release = positive sign.",
          "Transport to hospital immediately — appendicitis requires surgery.",
          "Do NOT give any food or water (person may need surgery).",
        ],
        medicines: [],
        warnings: [
          "If pain suddenly disappears after being severe: possible rupture — emergency",
          "Ruptured appendix: high fever, severe pain, rigid abdomen = life-threatening",
          "Common age group: 10-30 years. Can occur at any age.",
        ],
        doNot: [
          "Do NOT give laxatives or enemas",
          "Do NOT apply heat (hot water bottle) to right lower abdomen",
          "Do NOT give food or water",
        ],
      },
      {
        id: "bowel_injury",
        title: "Bowel Injury (Penetrating Trauma)",
        severity: "critical",
        steps: [
          "Call 108 immediately — requires surgical intervention.",
          "Keep person still on their back with knees bent.",
          "Cover any external wound with clean, moist dressing.",
          "Do NOT remove embedded objects.",
          "Monitor for signs of shock (pale, cold, rapid pulse).",
          "Keep person warm and calm.",
        ],
        medicines: [],
        warnings: [
          "Contamination from bowel contents causes severe infection within hours",
          "Peritonitis signs: rigid abdomen, high fever, extreme pain",
          "This is always a surgical emergency",
        ],
        doNot: [
          "Do NOT give food or water",
          "Do NOT remove embedded objects",
          "Do NOT delay transport",
        ],
      },
    ],
  },
  back_spine: {
    id: "back_spine",
    label: "Back / Spine",
    color: "oklch(0.60 0.16 300)",
    scenarios: [
      {
        id: "spinal_injury",
        title: "Spinal Injury — Do Not Move",
        severity: "critical",
        steps: [
          "DO NOT move the person. Call 108 immediately.",
          "Hold the head with both hands to maintain neutral position.",
          "Tell person not to move — even a small movement can cause permanent paralysis.",
          "If person must be moved (fire/flooding): log-roll with minimum 3 people. One controls the head only.",
          "Monitor AVPU, breathing, and sensation in hands/feet every 5 minutes.",
          "Keep person warm and calm until 108 arrives.",
        ],
        medicines: [],
        warnings: [
          "ANY fall from height, vehicle accident, or violent impact = assume spinal injury",
          "Tingling, numbness, or weakness in arms/legs = spinal cord damage",
          "Breathing difficulty with neck injury = high cervical injury — airway at risk",
        ],
        doNot: [
          "Do NOT bend, twist, or rotate the spine",
          "Do NOT place pillow under head",
          "Do NOT allow the person to walk or sit up on their own",
          "Do NOT remove helmet — cut chin strap if airway access needed",
        ],
      },
      {
        id: "back_fracture",
        title: "Back / Vertebral Fracture",
        severity: "critical",
        steps: [
          "Keep person completely still.",
          "If conscious and stable: do NOT move without trained help.",
          "Call 108. Describe mechanism of injury (fall height, impact).",
          "Steady reassurance — keep calm.",
          "If log-roll needed: 3+ people, one controls head, all turn as one unit.",
          "Hospital for X-ray/MRI — unstable fractures can cause paralysis with movement.",
        ],
        medicines: [],
        warnings: [
          "Any sharp or electric-shock-like pain shooting to legs = nerve compression",
          "Loss of bladder/bowel control with back injury = spinal cord emergency",
        ],
        doNot: [
          "Do NOT apply heat or massage to site of injury",
          "Do NOT allow sitting or standing",
        ],
      },
      {
        id: "nerve_compression",
        title: "Nerve Compression / Sciatica",
        severity: "moderate",
        steps: [
          "Help person to a comfortable position — usually lying down eases pressure.",
          "Apply cold pack (first 48 hours) then warm compress to affected area.",
          "Avoid bending forward — partial rest recommended.",
          "Paracetamol or Ibuprofen for pain as appropriate.",
          "Gentle walking is better than complete bed rest after initial acute phase.",
          "See doctor if pain severe or does not improve in 3-5 days.",
        ],
        medicines: [
          {
            name: "Ibuprofen 400mg (Brufen/Combiflam)",
            dosage: "1 tablet",
            ageGroup: "Adult",
            frequency: "Every 8 hours with food",
            notes: "Take with food",
          },
          {
            name: "Diclofenac gel (Voveran/Voltaren)",
            dosage: "Small strip on skin over pain",
            ageGroup: "Adult",
            frequency: "2-3 times daily",
            notes: "Do NOT apply on broken skin",
          },
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "1 tablet",
            ageGroup: "Elderly / all ages",
            frequency: "Every 6 hours",
            notes: "Safer option for elderly",
          },
        ],
        warnings: [
          "Saddle anesthesia (numbness in groin/inner thighs) = cauda equina emergency",
          "Loss of bladder/bowel control = spinal emergency — call 108",
        ],
        doNot: [
          "Do NOT apply forceful manipulation by untrained person",
          "Do NOT lift heavy objects",
        ],
      },
    ],
  },
  arm_left: {
    id: "arm_left",
    label: "Left Arm",
    color: "oklch(0.68 0.16 200)",
    scenarios: [
      {
        id: "arm_fracture",
        title: "Arm Fracture",
        severity: "high",
        steps: [
          "Do NOT attempt to straighten the arm.",
          "Splint in position found: use rolled newspaper, cardboard, or bamboo.",
          "Pad around the splint with soft cloth.",
          "Make a sling from a dupatta or torn cloth — support from elbow to wrist.",
          "Check circulation: fingers should remain warm and pink. If blue/cold: loosen.",
          "Go to hospital for X-ray.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "",
          },
          {
            name: "Ibuprofen 400mg (Brufen)",
            dosage: "400mg",
            ageGroup: "Adult",
            frequency: "Every 8 hours with food",
            notes: "Reduces swelling. Avoid in elderly",
          },
        ],
        warnings: [
          "Open fracture (bone through skin): cover with clean wet cloth — surgical emergency",
          "Numbness or tingling in fingers = possible nerve injury",
          "Radial pulse absent at wrist after arm fracture = vascular injury — urgent",
        ],
        doNot: [
          "Do NOT try to straighten fractured bone",
          "Do NOT apply tight bandage that cuts off circulation",
        ],
      },
      {
        id: "arm_dislocation",
        title: "Shoulder / Elbow Dislocation",
        severity: "high",
        steps: [
          "Do NOT attempt to relocate the joint — can cause nerve/blood vessel damage.",
          "Immobilize arm in position found — dupatta sling.",
          "Apply ice pack wrapped in cloth to reduce swelling.",
          "Give Paracetamol for pain.",
          "Transport to hospital for professional reduction.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg-1g",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "",
          },
        ],
        warnings: [
          "Numbness or weakness in hand after dislocation = nerve involvement",
          "Shoulder dislocation with deformity = do NOT force back",
        ],
        doNot: [
          "Do NOT try to reduce (put back) the dislocation",
          "Do NOT apply direct pressure to the joint",
        ],
      },
      {
        id: "arm_laceration",
        title: "Deep Arm Laceration",
        severity: "high",
        steps: [
          "Apply direct firm pressure with clean cloth.",
          "Elevate arm above heart level.",
          "Hold pressure for 15 minutes continuously.",
          "If bleeding not controlled: apply tourniquet 5-8cm above wound.",
          "Write time tourniquet applied on skin with pen.",
          "Go to hospital — deep lacerations may need stitches and tendon/nerve assessment.",
        ],
        medicines: [
          {
            name: "Betadine 5%",
            dosage: "Apply to wound edges",
            ageGroup: "All ages",
            frequency: "During cleaning",
            notes: "",
          },
          {
            name: "Neosporin ointment",
            dosage: "Thin layer",
            ageGroup: "All ages",
            frequency: "Every dressing change",
            notes: "",
          },
        ],
        warnings: [
          "Pulsating bright red bleeding = arterial — tourniquet and call 108",
          "Loss of grip strength after arm laceration = possible tendon cut",
          "Tingling fingers after arm cut = possible nerve damage",
        ],
        doNot: [
          "Do NOT remove tourniquet once applied",
          "Do NOT close dirty wound before cleaning",
        ],
      },
      {
        id: "tourniquet_arm",
        title: "Tourniquet Application (Arm)",
        severity: "critical",
        steps: [
          "Apply ONLY for uncontrolled limb bleeding or traumatic amputation.",
          "Apply 5-8cm above the wound (not over joint).",
          "Use dupatta, belt, or torn cloth — twist tightly until bleeding stops.",
          "Twist a stick or pen through knot, turn until bleeding stops.",
          "Write the exact TIME of application on skin (or paper).",
          "Do NOT loosen or remove — hospital only.",
        ],
        medicines: [],
        warnings: [
          "Tourniquet MUST be documented with time — surgeons need this",
          "Limb viable within 2 hours with tourniquet in field conditions",
          "Never apply over a joint (elbow/knee)",
        ],
        doNot: [
          "Do NOT apply tourniquet for minor bleeding",
          "Do NOT remove once applied in field",
          "Do NOT cover the tourniquet — it must be visible",
        ],
      },
    ],
  },
  arm_right: {
    id: "arm_right",
    label: "Right Arm",
    color: "oklch(0.68 0.16 200)",
    scenarios: [
      {
        id: "arm_fracture_r",
        title: "Arm Fracture",
        severity: "high",
        steps: [
          "Do NOT attempt to straighten the arm.",
          "Splint in position found: use rolled newspaper, cardboard, or bamboo.",
          "Pad around the splint with soft cloth.",
          "Make a sling from a dupatta or torn cloth — support from elbow to wrist.",
          "Check circulation: fingers should remain warm and pink. If blue/cold: loosen.",
          "Go to hospital for X-ray.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "",
          },
          {
            name: "Ibuprofen 400mg (Brufen)",
            dosage: "400mg",
            ageGroup: "Adult",
            frequency: "Every 8 hours with food",
            notes: "",
          },
        ],
        warnings: [
          "Open fracture (bone through skin): cover with clean wet cloth — surgical emergency",
          "Numbness or tingling in fingers = possible nerve injury",
        ],
        doNot: [
          "Do NOT try to straighten fractured bone",
          "Do NOT apply tight bandage that cuts off circulation",
        ],
      },
      {
        id: "arm_burn",
        title: "Arm Burns",
        severity: "moderate",
        steps: [
          "Remove person from burn source.",
          "Remove jewelry (rings, bangles, watch) before swelling.",
          "Cool with running cool water for 20 minutes — not ice.",
          "Do NOT pop blisters.",
          "Cover with clean damp cloth or Burnol dressing.",
          "Burns >1 palm size: hospital for assessment.",
        ],
        medicines: [
          {
            name: "Burnol cream",
            dosage: "Apply after cooling",
            ageGroup: "All ages",
            frequency: "Every dressing change",
            notes: "",
          },
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "",
          },
        ],
        warnings: [
          "Burns larger than palm of hand = hospital",
          "Electrical burns on arm: entry burn visible, exit burn (usually foot) may be hidden",
        ],
        doNot: [
          "Do NOT apply toothpaste, ghee, or butter to burns",
          "Do NOT use ice water",
          "Do NOT pop burn blisters",
        ],
      },
    ],
  },
  hands: {
    id: "hands",
    label: "Hands / Wrists",
    color: "oklch(0.70 0.14 80)",
    scenarios: [
      {
        id: "finger_amputation",
        title: "Finger / Hand Amputation",
        severity: "critical",
        steps: [
          "Apply firm pressure to stump with clean cloth.",
          "Apply tourniquet to wrist if pressure not controlling bleeding.",
          "Preserve amputated finger: wrap in clean damp cloth, place in plastic bag.",
          "Place the sealed bag in a container with ice water (NOT directly on ice).",
          "Rush to hospital — replantation possible within 6 hours if part is kept cool.",
          "Write tourniquet time on skin.",
        ],
        medicines: [],
        warnings: [
          "Replantation success rate drops sharply after 6 hours — rush to hospital",
          "Keep the amputated part at 4°C (not frozen) — use ice water, not dry ice",
          "Call 108 while transporting",
        ],
        doNot: [
          "Do NOT place amputated part directly on ice — frostbite damages tissues",
          "Do NOT attempt to reattach at the scene",
          "Do NOT scrub the amputated part",
        ],
      },
      {
        id: "hand_crush",
        title: "Crush Injury (Hand)",
        severity: "high",
        steps: [
          "Remove the crushing force if safe to do so.",
          "If entrapped >15 min: call 108 before removal — crush syndrome risk.",
          "Check circulation: capillary refill (press nail, should go pink within 2 sec).",
          "Apply cold compress to reduce swelling.",
          "Elevate hand above heart level.",
          "Go to hospital — X-ray for fractures, assess for compartment syndrome.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "",
          },
        ],
        warnings: [
          "Compartment syndrome: severe pain on stretching fingers, hand feels very hard/tight — surgical emergency",
          "Prolonged crush (>15 min): myoglobin release can cause kidney failure — IV fluids needed",
        ],
        doNot: [
          "Do NOT apply tight wrapping over crush injury",
          "Do NOT remove trapped limb without medical knowledge if trapped >15 min",
        ],
      },
      {
        id: "deep_hand_cut",
        title: "Deep Hand / Wrist Cut",
        severity: "high",
        steps: [
          "Apply direct pressure with clean cloth — elevate above heart.",
          "Hold pressure for 15 minutes.",
          "Check finger movement — if cannot move fingers = tendon may be cut.",
          "Check sensation — numbness or tingling = nerve damage.",
          "Even if bleeding stops: go to hospital for tendon/nerve assessment.",
        ],
        medicines: [
          {
            name: "Betadine 5%",
            dosage: "Apply to wound edges",
            ageGroup: "All ages",
            frequency: "Once during cleaning",
            notes: "",
          },
          {
            name: "Neosporin ointment",
            dosage: "Thin layer",
            ageGroup: "All ages",
            frequency: "Every dressing change",
            notes: "",
          },
        ],
        warnings: [
          "Inability to bend/extend any finger = possible tendon damage — microsurgery needed",
          "Wrist cut with visible structures inside = surgical emergency",
        ],
        doNot: [
          "Do NOT probe the wound",
          "Do NOT attempt to close deeply contaminated wounds",
        ],
      },
      {
        id: "hand_burn",
        title: "Hand Burns",
        severity: "moderate",
        steps: [
          "Remove rings and bangles immediately before swelling.",
          "Cool under running water for 20 minutes.",
          "Do NOT pop blisters on hands.",
          "Cover loosely with clean damp gauze.",
          "Any hand burn = hospital — hands have critical function.",
        ],
        medicines: [
          {
            name: "Burnol cream",
            dosage: "Apply after cooling",
            ageGroup: "All ages",
            frequency: "Every dressing change",
            notes: "",
          },
        ],
        warnings: [
          "Full thickness hand burns: white/leathery skin = hospital immediately",
          "Circumferential (all-around) burns on fingers: circulation at risk",
        ],
        doNot: [
          "Do NOT apply ghee, turmeric, or toothpaste",
          "Do NOT wrap fingers together",
        ],
      },
    ],
  },
  leg_left: {
    id: "leg_left",
    label: "Left Leg",
    color: "oklch(0.63 0.16 160)",
    scenarios: [
      {
        id: "femur_fracture",
        title: "Femur (Thigh Bone) Fracture",
        severity: "critical",
        steps: [
          "Call 108 immediately — femur fractures cause significant internal blood loss.",
          "Immobilize leg in position found — do NOT straighten.",
          "Traction splint if trained and available. Otherwise: tie legs together with padding between.",
          "Elevate leg only if no fracture of hip/pelvis.",
          "Treat for shock: lay flat, keep warm.",
          "Monitor for shock signs: pale, sweating, rapid pulse.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "If conscious and can swallow",
          },
        ],
        warnings: [
          "Femur fracture can cause 1-2 litres of internal blood loss — shock risk is high",
          "Thigh swelling and deformity = suspect femur fracture",
          "Elderly hip/femur fracture: do NOT move — call 108",
        ],
        doNot: [
          "Do NOT straighten the leg",
          "Do NOT allow person to walk",
          "Do NOT apply tourniquet above femur fracture (no distal limb bleeding point)",
        ],
      },
      {
        id: "knee_dislocation",
        title: "Knee Dislocation",
        severity: "critical",
        steps: [
          "Do NOT attempt to relocate the knee.",
          "Immobilize in position found — roll blanket/cloth along each side of leg.",
          "Check pedal pulse (top of foot): absent pulse = vascular emergency — call 108.",
          "Apply cold pack wrapped in cloth to reduce swelling.",
          "Call 108 — knee dislocation frequently tears the popliteal artery.",
        ],
        medicines: [],
        warnings: [
          "Knee dislocation can tear the popliteal artery — absent foot pulse = limb-threatening",
          "Always check foot/ankle pulse and sensation after knee injury",
        ],
        doNot: [
          "Do NOT attempt to reduce/relocate",
          "Do NOT apply tight wrapping",
        ],
      },
      {
        id: "thigh_wound",
        title: "Thigh Wound with Heavy Bleeding",
        severity: "critical",
        steps: [
          "Apply direct firm pressure with both hands — thigh wounds bleed heavily.",
          "If pressure insufficient: apply tourniquet as HIGH as possible on thigh.",
          "Twist until bleeding stops. Write time on skin.",
          "Call 108 immediately.",
          "Treat for shock: lay flat, elevate legs if no fracture.",
          "Keep person warm and calm.",
        ],
        medicines: [],
        warnings: [
          "Femoral artery wound can cause death within 2-3 minutes",
          "Tourniquet on thigh: apply as high as possible",
          "Do NOT remove tourniquet once applied in field",
        ],
        doNot: ["Do NOT remove tourniquet", "Do NOT probe the wound"],
      },
    ],
  },
  leg_right: {
    id: "leg_right",
    label: "Right Leg",
    color: "oklch(0.63 0.16 160)",
    scenarios: [
      {
        id: "tibial_fracture",
        title: "Leg / Shin Bone Fracture",
        severity: "high",
        steps: [
          "Immobilize leg in found position.",
          "Splint with two straight pieces of bamboo/cardboard each side.",
          "Pad with soft cloth. Tie above and below the fracture.",
          "Check foot: toes must stay warm and pink.",
          "Transport to hospital for X-ray and casting.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "",
          },
          {
            name: "Ibuprofen 400mg (Brufen)",
            dosage: "400mg",
            ageGroup: "Adult",
            frequency: "Every 8 hours with food",
            notes: "",
          },
        ],
        warnings: [
          "Open fracture (bone piercing skin) = surgical emergency — cover with clean wet cloth, call 108",
          "Compartment syndrome: severe pain even at rest, hard tight leg = surgical emergency",
        ],
        doNot: ["Do NOT attempt to straighten", "Do NOT allow weight-bearing"],
      },
      {
        id: "dvt_signs",
        title: "Deep Vein Thrombosis (DVT) Signs",
        severity: "high",
        steps: [
          "Identify signs: calf pain, swelling, warmth, and redness in one leg.",
          "Do NOT massage the calf — can dislodge clot to lungs.",
          "Keep leg slightly elevated.",
          "Transport to hospital urgently — anticoagulation (blood thinners) needed.",
          "Sudden breathing difficulty with DVT = possible pulmonary embolism — call 108.",
        ],
        medicines: [],
        warnings: [
          "If sudden shortness of breath, chest pain, or cough with blood = pulmonary embolism — call 108",
          "DVT common after flood disasters (prolonged sitting/standing in water)",
          "High risk: post-surgery, pregnancy, prolonged immobility",
        ],
        doNot: [
          "Do NOT massage the calf",
          "Do NOT apply heat",
          "Do NOT give aspirin without medical advice",
        ],
      },
    ],
  },
  feet: {
    id: "feet",
    label: "Feet / Ankles",
    color: "oklch(0.67 0.14 100)",
    scenarios: [
      {
        id: "ankle_sprain",
        title: "Ankle Sprain",
        severity: "low",
        steps: [
          "PRICE: Protect, Rest, Ice, Compress, Elevate.",
          "Protect: remove shoes — stop activity.",
          "Ice: cold pack wrapped in cloth for 20 min, every 2-3 hours for 48 hrs.",
          "Compress: crepe bandage from toes upward to mid-calf. Not too tight.",
          "Elevate: keep foot raised above hip level especially when sleeping.",
          "If cannot bear any weight after 48 hrs: X-ray (Ottawa ankle rules).",
        ],
        medicines: [
          {
            name: "Ibuprofen 400mg (Brufen/Combiflam)",
            dosage: "1 tablet",
            ageGroup: "Adult",
            frequency: "Every 8 hours with food",
            notes: "Reduces swelling and pain",
          },
          {
            name: "Diclofenac gel (Voveran)",
            dosage: "2-3cm strip on skin",
            ageGroup: "Adult",
            frequency: "3-4 times daily",
            notes: "Not on broken skin",
          },
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "1 tablet",
            ageGroup: "Elderly",
            frequency: "Every 6 hours",
            notes: "Safer for elderly",
          },
        ],
        warnings: [
          "Complete inability to bear weight = possible fracture — X-ray needed",
          "Bone tenderness at tip of fibula or navicular bone = fracture suspected",
          "Snapping sensation at time of injury = may be ligament rupture",
        ],
        doNot: [
          "Do NOT apply heat in first 48 hours",
          "Do NOT walk on it if suspected fracture",
          "Do NOT wrap toes inside bandage",
        ],
      },
      {
        id: "foot_crush",
        title: "Foot Crush Injury",
        severity: "high",
        steps: [
          "Remove crushing force if safe — call 108 if trapped >15 min.",
          "Do NOT remove shoe forcibly if foot is badly swollen.",
          "Apply cold pack wrapped in cloth to reduce swelling.",
          "Elevate foot above heart level.",
          "Check toes: sensation and capillary refill (press nail — should pink up in 2 sec).",
          "Hospital for X-ray — multiple foot bones can be fractured.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "",
          },
        ],
        warnings: [
          "Compartment syndrome of foot: severe pain, inability to move toes, foot feels very hard",
          "Numb or cold toes = vascular or nerve damage",
        ],
        doNot: [
          "Do NOT allow weight-bearing",
          "Do NOT apply tight cast-like bandage",
        ],
      },
      {
        id: "diabetic_foot",
        title: "Diabetic Foot Wound",
        severity: "high",
        steps: [
          "Clean wound gently with Savlon diluted 1:30.",
          "Apply Betadine to wound edges.",
          "Cover with sterile non-stick dressing.",
          "Avoid all weight-bearing on the wound.",
          "Hospital visit same day — diabetic foot wounds get infected rapidly.",
          "Monitor for spreading redness, warmth, pus, or fever.",
        ],
        medicines: [
          {
            name: "Betadine 5% solution",
            dosage: "Apply to wound edges",
            ageGroup: "Diabetic adults",
            frequency: "Every dressing change",
            notes: "Do NOT use full strength inside wound",
          },
          {
            name: "Soframycin ointment",
            dosage: "Thin layer",
            ageGroup: "All ages",
            frequency: "Every dressing change",
            notes: "",
          },
        ],
        warnings: [
          "Diabetic foot wounds can progress to gangrene within 24-48 hours",
          "Even a small blister or sore on a diabetic foot = hospital that day",
          "Diabetics often have reduced sensation — check feet daily",
        ],
        doNot: [
          "Do NOT apply heat",
          "Do NOT pop blisters",
          "Do NOT use tight footwear",
          "Do NOT delay hospital visit",
        ],
      },
      {
        id: "foot_bone_injury",
        title: "Foot Bone Fracture / Metatarsal",
        severity: "moderate",
        steps: [
          "Immobilize with firm bandage from toes to mid-ankle.",
          "Apply ice pack wrapped in cloth.",
          "Elevate above heart level.",
          "No weight-bearing — use crutches or support.",
          "X-ray at hospital — metatarsal fractures are easily missed.",
        ],
        medicines: [
          {
            name: "Ibuprofen 400mg (Brufen)",
            dosage: "400mg",
            ageGroup: "Adult",
            frequency: "Every 8 hours with food",
            notes: "",
          },
          {
            name: "Paracetamol 500mg (Crocin)",
            dosage: "500mg",
            ageGroup: "All",
            frequency: "Every 6 hours",
            notes: "",
          },
        ],
        warnings: [
          "5th metatarsal (outer foot bone) fracture: very common — easy to miss",
          "Stress fracture from prolonged walking: progressive foot pain",
        ],
        doNot: [
          "Do NOT allow weight-bearing",
          "Do NOT apply tight bandage that cuts off circulation",
        ],
      },
    ],
  },
};
