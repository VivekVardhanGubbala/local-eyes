// India MOH-aligned medical data for Local-Eyes disaster assistant
// All medicines are available at Indian pharmacies (chemist shops)

export interface Step {
  step: number;
  title: string;
  desc: string;
}

export interface MedRow {
  ageGroup: string;
  medicine: string;
  dosage: string;
  frequency: string;
  note: string;
}

export interface MedicalTopic {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  icon: string;
  summary: string;
  steps?: Step[];
  warnings?: string[];
  doNot?: string[];
  medicines?: MedRow[];
  extraInfo?: { label: string; value: string }[];
}

export interface MedicalCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  topics: MedicalTopic[];
}

// Re-export extended medical data modules
export * from "./medicalData.extended";

// MINOR INJURIES
export const MINOR_INJURIES: MedicalTopic[] = [
  {
    id: "cuts_abrasions",
    title: "Cuts & Abrasions",
    severity: "low",
    icon: "🩹",
    summary: "Minor skin cuts and scrapes. Clean, disinfect and bandage.",
    steps: [
      {
        step: 1,
        title: "Clean Hands",
        desc: "Wash hands or use sanitizer before touching the wound.",
      },
      {
        step: 2,
        title: "Stop Bleeding",
        desc: "Apply firm pressure with a clean cloth for 10-15 min. Do not peek.",
      },
      {
        step: 3,
        title: "Rinse Wound",
        desc: "Flush under clean running water for 5+ minutes. Remove visible debris with clean tweezers.",
      },
      {
        step: 4,
        title: "Antiseptic",
        desc: "Apply Betadine (Povidone-Iodine) solution or Savlon around wound edges.",
      },
      {
        step: 5,
        title: "Apply Ointment",
        desc: "Thin layer of Neosporin/Soframycin ointment on wound.",
      },
      {
        step: 6,
        title: "Bandage",
        desc: "Cover with sterile gauze. Secure with Micropore/Leucoplast tape. Change daily.",
      },
      {
        step: 7,
        title: "Monitor",
        desc: "Watch for spreading redness, warmth, pus, or fever — these mean infection.",
      },
    ],
    warnings: [
      "Deep cuts, puncture wounds, or animal bites need hospital care",
      "Wound not stopping after 20 min = seek emergency help",
      "Spreading redness or red streaks = infection — go to hospital",
    ],
    doNot: [
      "Do NOT use cotton wool directly on wounds (fibres stick)",
      "Do NOT use household items (turmeric paste, soil) on open wounds",
      "Do NOT close a dirty wound before cleaning",
    ],
    medicines: [
      {
        ageGroup: "All ages",
        medicine: "Betadine 5% solution",
        dosage: "Apply to wound edges",
        frequency: "Once when cleaning",
        note: "Available at all Indian pharmacies",
      },
      {
        ageGroup: "All ages",
        medicine: "Savlon antiseptic liquid",
        dosage: "Dilute 1:30 with water",
        frequency: "For wound cleaning",
        note: "Chlorhexidine + Cetrimide; gentler than iodine",
      },
      {
        ageGroup: "All ages",
        medicine: "Neosporin / Soframycin ointment",
        dosage: "Thin layer on wound",
        frequency: "After each dressing change",
        note: "Antibiotic cream; prevents wound infection",
      },
    ],
  },
  {
    id: "bruises",
    title: "Bruises (Contusions)",
    severity: "low",
    icon: "🫙",
    summary:
      "Bruising from blunt impact. RICE: Rest, Ice, Compression, Elevation.",
    steps: [
      {
        step: 1,
        title: "Rest",
        desc: "Stop using the injured area immediately.",
      },
      {
        step: 2,
        title: "Ice",
        desc: "Apply ice pack (or cold wet cloth) wrapped in a thin towel for 15-20 min. Repeat every 2 hrs for first 48 hrs.",
      },
      {
        step: 3,
        title: "Compress",
        desc: "Gently wrap with crepe bandage. Not too tight — check fingers/toes stay pink.",
      },
      {
        step: 4,
        title: "Elevate",
        desc: "Keep injured limb raised above heart level to reduce swelling.",
      },
    ],
    warnings: [
      "Large bruise after impact to head or abdomen = seek emergency help",
      "Bruise with inability to move limb = possible fracture",
      "Bruising around eye after head injury = hospital immediately",
    ],
    doNot: [
      "Do NOT apply heat in first 48 hours (increases swelling)",
      "Do NOT massage a fresh bruise",
    ],
  },
  {
    id: "sprains_strains",
    title: "Sprains & Strains",
    severity: "low",
    icon: "🦵",
    summary:
      "Ligament/muscle injuries from twisting. PRICE method. India medicines: Volini gel.",
    steps: [
      {
        step: 1,
        title: "Protect",
        desc: "Stop activity. Support the injured area — do not put weight on it.",
      },
      { step: 2, title: "Rest", desc: "Avoid all movement for 24-48 hours." },
      {
        step: 3,
        title: "Ice",
        desc: "Cold pack wrapped in cloth for 15-20 min, every 2-3 hours.",
      },
      {
        step: 4,
        title: "Compress",
        desc: "Wrap with crepe bandage. Check regularly — not too tight.",
      },
      {
        step: 5,
        title: "Elevate",
        desc: "Keep the limb above heart level, especially at night.",
      },
    ],
    warnings: [
      "Severe swelling immediately = possible fracture",
      "Unable to bear any weight on foot/ankle = X-ray needed",
      "Joint looks deformed = dislocation, seek help",
    ],
    medicines: [
      {
        ageGroup: "Adult",
        medicine: "Volini gel / Diclofenac gel",
        dosage: "2-3cm strip on skin over injury",
        frequency: "3-4 times daily",
        note: "Available as Volini, Moov, or Diclofenac gel. Not on broken skin.",
      },
      {
        ageGroup: "Adult",
        medicine: "Ibuprofen 400mg (Brufen/Combiflam)",
        dosage: "1 tablet",
        frequency: "Every 8 hours with food",
        note: "Take with food. Avoid if pregnant, kidney issues, or ulcers.",
      },
      {
        ageGroup: "Elderly 60+",
        medicine: "Paracetamol 500mg only",
        dosage: "1 tablet",
        frequency: "Every 8 hours",
        note: "Avoid NSAIDs in elderly.",
      },
    ],
  },
  {
    id: "nosebleed",
    title: "Nosebleed (Epistaxis)",
    severity: "low",
    icon: "👃",
    summary:
      "Pinch soft part of nose. Lean forward. Breathe through mouth for 10 min.",
    steps: [
      {
        step: 1,
        title: "Sit Upright",
        desc: "Sit upright and lean slightly forward. Do NOT tilt head back.",
      },
      {
        step: 2,
        title: "Pinch Nose",
        desc: "Firmly pinch the SOFT part of nose (below the bony bridge). Hold continuously for 10 minutes.",
      },
      {
        step: 3,
        title: "Breathe",
        desc: "Breathe through the mouth. Do not check during 10 minutes.",
      },
      {
        step: 4,
        title: "Cold Compress",
        desc: "Place cold wet cloth on forehead/bridge of nose.",
      },
    ],
    warnings: [
      "Bleeding for more than 30 min = emergency",
      "Nosebleed after head injury = emergency",
      "Blood coming from both nostrils or throat = hospital",
    ],
    doNot: [
      "Do NOT tilt head backward — blood enters airway",
      "Do NOT stuff tissue deep into nostril",
      "Do NOT blow nose during or immediately after bleeding",
    ],
  },
  {
    id: "blisters",
    title: "Blisters",
    severity: "low",
    icon: "🫧",
    summary:
      "Cover and protect. Do NOT pop — the fluid inside protects against infection.",
    steps: [
      {
        step: 1,
        title: "Clean Area",
        desc: "Gently clean around (not on) the blister with antiseptic.",
      },
      {
        step: 2,
        title: "Cover",
        desc: "Cover with a loose, clean bandage or blister pad.",
      },
      {
        step: 3,
        title: "Protect",
        desc: "Cushion the area from further friction.",
      },
      {
        step: 4,
        title: "If Blister Bursts",
        desc: "Clean gently with Betadine. Apply Soframycin ointment. Cover with sterile gauze.",
      },
    ],
    warnings: [
      "Redness spreading around blister = infection",
      "Hot to touch, pus, or fever = infection, seek help",
      "Large blisters from burns need hospital care",
    ],
    doNot: [
      "Do NOT pop blisters — the fluid inside prevents infection",
      "Do NOT peel the skin off a burst blister",
    ],
  },
  {
    id: "insect_bites",
    title: "Insect Bites & Stings",
    severity: "low",
    icon: "🐝",
    summary:
      "Remove stinger, cold compress, calamine lotion. Watch for allergic reaction.",
    steps: [
      {
        step: 1,
        title: "Remove Stinger",
        desc: "Scrape out bee stinger with a credit card edge or fingernail. Do NOT use tweezers.",
      },
      { step: 2, title: "Clean", desc: "Wash site with soap and clean water." },
      {
        step: 3,
        title: "Cold Compress",
        desc: "Ice pack or cold wet cloth for 10-15 min.",
      },
      {
        step: 4,
        title: "Calamine Lotion",
        desc: "Apply Calamine lotion to soothe itching.",
      },
      {
        step: 5,
        title: "Antihistamine",
        desc: "Give Cetirizine (Alerid/Zyrtec) to reduce itching and allergic response.",
      },
    ],
    warnings: [
      "Facial swelling, difficulty breathing, dizziness = ANAPHYLAXIS — EMERGENCY",
      "Multiple bee/wasp stings = hospital immediately",
    ],
    medicines: [
      {
        ageGroup: "Adult",
        medicine: "Cetirizine 10mg (Alerid/Zyrtec)",
        dosage: "1 tablet",
        frequency: "Once daily",
        note: "Causes drowsiness; avoid driving",
      },
      {
        ageGroup: "Child 2-5 yrs",
        medicine: "Cetirizine 2.5mg syrup",
        dosage: "2.5mg",
        frequency: "Once daily",
        note: "Alerid syrup available in India",
      },
      {
        ageGroup: "Child 6-11 yrs",
        medicine: "Cetirizine 5mg",
        dosage: "5mg tablet",
        frequency: "Once daily",
        note: "Take at bedtime",
      },
      {
        ageGroup: "All ages",
        medicine: "Calamine lotion",
        dosage: "Apply to affected area",
        frequency: "3-4 times daily",
        note: "Widely available at all Indian chemists",
      },
    ],
  },
  {
    id: "eye_injuries",
    title: "Eye Injuries",
    severity: "medium",
    icon: "👁️",
    summary:
      "Do not rub. Rinse with clean water. Cover with clean pad. Seek medical help.",
    steps: [
      {
        step: 1,
        title: "Do Not Rub",
        desc: "Rubbing pushes foreign objects deeper into the eye.",
      },
      {
        step: 2,
        title: "Rinse Eye",
        desc: "Flush eye gently with clean water for 10-15 min. Water from inner corner outward.",
      },
      {
        step: 3,
        title: "Cover",
        desc: "Cover with a clean, loose eye pad or cloth. Do NOT press on the eye.",
      },
      {
        step: 4,
        title: "Chemical Splash",
        desc: "Flush continuously with water for 20+ min. Remove contact lenses if present. Rush to hospital.",
      },
    ],
    warnings: [
      "Object embedded in eye = do NOT remove, cover both eyes, rush to hospital",
      "Chemical splash = emergency flush + hospital immediately",
      "Sudden vision loss or severe pain = hospital",
    ],
    doNot: [
      "Do NOT rub the eye under any circumstances",
      "Do NOT try to remove embedded objects",
      "Do NOT put any home remedies in injured eye",
    ],
  },
];

// MAJOR INJURIES
export const MAJOR_INJURIES: MedicalTopic[] = [
  {
    id: "severe_bleeding",
    title: "Severe Bleeding",
    severity: "critical",
    icon: "🩸",
    summary:
      "Direct pressure with clean cloth. Tourniquet for limb bleeding. Call 108.",
    steps: [
      { step: 1, title: "Ensure Safety", desc: "Wear gloves if available." },
      {
        step: 2,
        title: "Direct Pressure",
        desc: "Press HARD on wound with cleanest available material — shirt, dupatta, torn cloth.",
      },
      {
        step: 3,
        title: "Hold 15 Minutes",
        desc: "Do not lift cloth — disturbs clot. If soaks through, add more on top.",
      },
      {
        step: 4,
        title: "Tourniquet",
        desc: "Limb bleeding not stopping: apply dupatta/belt 5-8cm ABOVE wound. Tighten until bleeding stops. Write TIME applied.",
      },
      {
        step: 5,
        title: "Elevate",
        desc: "Raise bleeding limb above heart level if no fracture suspected.",
      },
      {
        step: 6,
        title: "Call 108",
        desc: "Call 108 (AP Ambulance) immediately. Keep person warm and calm.",
      },
    ],
    warnings: [
      "Pale, cold, sweating + rapid pulse = shock — lay flat, elevate legs",
      "Tourniquet MUST be documented with time applied — never remove in field",
      "Abdominal wound with protruding organs: cover with wet clean cloth, do NOT push back",
    ],
    doNot: [
      "Do NOT remove a tourniquet once applied in emergency",
      "Do NOT give anything by mouth to a severely bleeding person",
    ],
  },
  {
    id: "fractures",
    title: "Fractures (Broken Bones)",
    severity: "high",
    icon: "🦴",
    summary:
      "Immobilize, do NOT straighten. Splint with available materials. Call 108.",
    steps: [
      {
        step: 1,
        title: "Do Not Move",
        desc: "Do NOT attempt to straighten or reposition the bone.",
      },
      {
        step: 2,
        title: "Splint In Position",
        desc: "Immobilize the limb as found. Use boards, sticks, rolled newspapers, or firm cloth.",
      },
      {
        step: 3,
        title: "Pad & Secure",
        desc: "Pad around splint with soft cloth. Tie above AND below fracture site.",
      },
      {
        step: 4,
        title: "Check Circulation",
        desc: "Check every 15 min: fingers/toes should be warm and pink. If cold/blue: loosen ties.",
      },
      {
        step: 5,
        title: "Open Fracture",
        desc: "Bone visible: cover loosely with clean wet cloth. Do NOT push bone back in. Surgical emergency.",
      },
    ],
    warnings: [
      "Open fracture (bone through skin) = surgical emergency, call 108",
      "Suspected hip/pelvis fracture = do NOT move, call 108",
      "Neck/spine fracture suspected = do NOT move person, call 108",
    ],
    extraInfo: [
      {
        label: "Closed Fracture",
        value: "Bone broken, skin intact. Immobilize and transport.",
      },
      {
        label: "Open Fracture",
        value: "Bone piercing skin — high infection risk. Surgical emergency.",
      },
      {
        label: "Splint material",
        value: "Straight stick, rolled newspaper, bamboo, cardboard.",
      },
    ],
  },
  {
    id: "dislocations",
    title: "Dislocations",
    severity: "high",
    icon: "🔄",
    summary:
      "Bone out of joint. Do NOT force it back. Immobilize and transport to hospital.",
    steps: [
      {
        step: 1,
        title: "Do Not Force",
        desc: "NEVER try to push or pull a dislocated joint back into place — can damage nerves and blood vessels.",
      },
      {
        step: 2,
        title: "Immobilize",
        desc: "Support the joint in position found. Sling for shoulder/elbow. Padding for hip/knee.",
      },
      {
        step: 3,
        title: "Ice",
        desc: "Apply ice or cold pack wrapped in cloth to reduce pain and swelling.",
      },
      {
        step: 4,
        title: "Transport",
        desc: "Take to hospital. Joint reduction must be done by trained medical staff.",
      },
    ],
    warnings: [
      "Severe swelling, bruising, or numbness = possible blood vessel/nerve damage",
      "Hip dislocation = serious emergency, call 108",
    ],
  },
  {
    id: "head_trauma",
    title: "Head Trauma",
    severity: "critical",
    icon: "🧠",
    summary: "Do NOT move unless in danger. Monitor AVPU scale every 5 min.",
    steps: [
      {
        step: 1,
        title: "AVPU Check",
        desc: "Alert? Verbal response? Pain response? Unresponsive? Document every 5 min.",
      },
      {
        step: 2,
        title: "Do Not Move",
        desc: "Do NOT move unless in immediate danger. Suspect spinal injury with all head traumas.",
      },
      {
        step: 3,
        title: "If Unconscious",
        desc: "Place in recovery position (on side) only if breathing. Tilt head slightly, lift chin.",
      },
      {
        step: 4,
        title: "Stop Scalp Bleeding",
        desc: "Scalp bleeds heavily — apply gentle pressure. Do NOT press if skull fracture suspected.",
      },
      {
        step: 5,
        title: "Monitor",
        desc: "Watch breathing every 5 min. Note vomiting, headache, confusion, or unequal pupils.",
      },
    ],
    warnings: [
      "Unequal pupils, seizures, or confusion = call 108 immediately",
      "Clear fluid from nose or ears = skull fracture — emergency",
      "Loss of consciousness even briefly = hospital observation mandatory",
    ],
    extraInfo: [
      {
        label: "Concussion Signs",
        value:
          "Headache, dizziness, nausea, confusion, light sensitivity, brief loss of consciousness.",
      },
      {
        label: "Serious Head Injury",
        value:
          "Seizures, prolonged unconsciousness, unequal pupils, repeated vomiting.",
      },
      {
        label: "AVPU Scale",
        value: "A=Alert, V=Verbal, P=Pain, U=Unresponsive.",
      },
    ],
  },
  {
    id: "spinal_injuries",
    title: "Spinal Injuries",
    severity: "critical",
    icon: "⚕️",
    summary:
      "DO NOT MOVE the person. Cervical spine precautions. Log-roll only if trained.",
    steps: [
      {
        step: 1,
        title: "Do NOT Move",
        desc: "NEVER bend, twist, or lift the head/neck. Even small movements can cause permanent paralysis.",
      },
      {
        step: 2,
        title: "Stabilize Head",
        desc: "Gently hold the head still with both hands. Maintain neutral position.",
      },
      {
        step: 3,
        title: "Reassure",
        desc: "Keep person calm. Encourage them not to move.",
      },
      {
        step: 4,
        title: "Log-Roll Only",
        desc: "If must be moved (airway): log-roll with 3+ people, one controls head exclusively.",
      },
      {
        step: 5,
        title: "Call 108",
        desc: "Spinal emergency. Call 108 immediately. Describe mechanism of injury.",
      },
    ],
    doNot: [
      "Do NOT move the person unless absolutely necessary (fire/drowning)",
      "Do NOT put a pillow under the head",
      "Do NOT allow person to walk if spinal injury suspected",
    ],
  },
  {
    id: "chest_wounds",
    title: "Chest Wounds",
    severity: "critical",
    icon: "💨",
    summary:
      "Seal open chest wound with palm or plastic. 3-sided seal. Call 108.",
    steps: [
      {
        step: 1,
        title: "Seal Immediately",
        desc: "Cover open chest wound with your palm immediately — stops air entering chest cavity.",
      },
      {
        step: 2,
        title: "3-Sided Seal",
        desc: "Use plastic (bag, wrapper) or foil. Tape 3 sides only — leave bottom open as a one-way valve.",
      },
      {
        step: 3,
        title: "Position",
        desc: "Sit person at 45 degrees (semi-upright) to ease breathing. Do not lay flat.",
      },
      {
        step: 4,
        title: "Monitor",
        desc: "Watch for worsening breathing or loss of consciousness.",
      },
    ],
    warnings: [
      "Gurgling or sucking sound from chest wound = seal immediately",
      "Rib fractures with breathing difficulty = hospital immediately",
    ],
  },
  {
    id: "amputations",
    title: "Traumatic Amputations",
    severity: "critical",
    icon: "🚨",
    summary:
      "Control bleeding with pressure. Preserve amputated part in wet clean cloth. Rush to hospital.",
    steps: [
      {
        step: 1,
        title: "Control Bleeding",
        desc: "Apply strong direct pressure to the stump with cleanest material available.",
      },
      {
        step: 2,
        title: "Tourniquet",
        desc: "If pressure not controlling bleeding: apply tourniquet above stump. Write time applied.",
      },
      {
        step: 3,
        title: "Preserve Part",
        desc: "Wrap amputated part in clean damp cloth. Place in plastic bag. Place in ice water (NOT directly on ice). Rush to hospital.",
      },
      {
        step: 4,
        title: "Treat for Shock",
        desc: "Lay person flat. Elevate legs. Keep warm. Talk calmly.",
      },
      {
        step: 5,
        title: "Rush to Hospital",
        desc: "Replantation possible within 6 hrs for fingers/hands if part kept cool and moist.",
      },
    ],
    warnings: [
      "Call 108 immediately — time is critical for replantation",
      "Do NOT put amputated part directly on ice — causes frostbite damage",
    ],
  },
];

// OBSTETRIC (PREGNANCY) EMERGENCIES
export const OBSTETRIC: MedicalTopic[] = [
  {
    id: "labor_signs",
    title: "Signs of Labour",
    severity: "medium",
    icon: "🤰",
    summary:
      "Regular contractions, bloody show, water breaking. Call 102 (AP free ambulance).",
    steps: [
      {
        step: 1,
        title: "Identify Labour",
        desc: "Regular contractions 5 min apart, lasting 45-60 sec = active labour.",
      },
      {
        step: 2,
        title: "Bloody Show",
        desc: "Pink/blood-tinged mucus plug discharge is normal early labour sign.",
      },
      {
        step: 3,
        title: "Water Breaking",
        desc: "Note time and color. Green/brown color = fetal distress — emergency.",
      },
      {
        step: 4,
        title: "Call 102",
        desc: "Call 102 (Government ambulance, free in AP/India) immediately.",
      },
    ],
    warnings: [
      "Contractions closer than 5 min = hospital immediately",
      "Green/yellow amniotic fluid = fetal distress — emergency",
      "Heavy vaginal bleeding = emergency — call 102",
    ],
  },
  {
    id: "emergency_delivery",
    title: "Emergency Delivery",
    severity: "critical",
    icon: "👶",
    summary:
      "If delivery is imminent and no help available. Catch and keep baby warm.",
    steps: [
      {
        step: 1,
        title: "Prepare",
        desc: "Clean hands thoroughly. Lay clean cloth/sheets under the mother. Keep warm water ready.",
      },
      {
        step: 2,
        title: "Push with Contractions",
        desc: "Encourage mother to push during contractions. Rest between.",
      },
      {
        step: 3,
        title: "Catch Baby",
        desc: "As head emerges: support gently with both hands. Do NOT pull. Let body rotate naturally.",
      },
      {
        step: 4,
        title: "Clear Airway",
        desc: "Once baby is out: clear mouth and nose with clean finger or soft cloth. Hold head DOWN slightly.",
      },
      {
        step: 5,
        title: "Warmth",
        desc: "Dry baby immediately with clean cloth. Keep skin-to-skin contact with mother. Cover both.",
      },
      {
        step: 6,
        title: "Cord",
        desc: "Do NOT cut umbilical cord unless trained and have sterile scissors/blade.",
      },
      {
        step: 7,
        title: "Placenta",
        desc: "Placenta delivers 5-30 min after baby. Save it for hospital staff. Do NOT pull cord.",
      },
    ],
    warnings: [
      "DO NOT cut the cord unless trained and equipment is sterile",
      "Cord around baby neck: gently slide over head, do NOT pull",
      "Baby not breathing: rub back vigorously, stimulate soles of feet",
    ],
    doNot: [
      "Do NOT give NSAIDs (Ibuprofen/Diclofenac) to pregnant women — Paracetamol ONLY",
      "Do NOT pull on umbilical cord to deliver placenta",
    ],
  },
  {
    id: "postpartum_hemorrhage",
    title: "Postpartum Hemorrhage",
    severity: "critical",
    icon: "🩸",
    summary:
      "Excessive bleeding after delivery. Massage uterus, encourage breastfeeding, call 102.",
    steps: [
      {
        step: 1,
        title: "Massage Fundus",
        desc: "Hand below navel. Firmly massage in circular motion to help uterus contract.",
      },
      {
        step: 2,
        title: "Encourage Breastfeeding",
        desc: "Put baby to breast — triggers natural oxytocin release and uterine contraction.",
      },
      {
        step: 3,
        title: "Empty Bladder",
        desc: "Full bladder prevents uterus from contracting.",
      },
      {
        step: 4,
        title: "Elevate Legs",
        desc: "Raise legs to improve blood flow to vital organs.",
      },
      {
        step: 5,
        title: "Call 102",
        desc: "Call 102 immediately. Leading cause of maternal death in India.",
      },
    ],
    warnings: [
      "Bleeding soaking more than 1 pad in 15 min after delivery = EMERGENCY",
      "Uterus feels soft/boggy after delivery = massage immediately",
    ],
  },
  {
    id: "preeclampsia_eclampsia",
    title: "Pre-eclampsia & Eclampsia",
    severity: "critical",
    icon: "⚡",
    summary:
      "Severe headache, vision changes, BP >140/90. Eclampsia = seizures in pregnancy.",
    steps: [
      {
        step: 1,
        title: "Identify Signs",
        desc: "Pre-eclampsia: severe headache, vision changes (flashing lights), severe swelling, BP >=140/90.",
      },
      {
        step: 2,
        title: "Lay on Left Side",
        desc: "Left lateral position improves blood flow to placenta.",
      },
      {
        step: 3,
        title: "If Seizure",
        desc: "Protect from injury. Do NOT restrain. Do NOT put anything in mouth. Left lateral position after seizure.",
      },
      {
        step: 4,
        title: "Safe Pain Relief Only",
        desc: "Only Paracetamol 500mg for pain/headache. NO Aspirin, Ibuprofen, or Diclofenac.",
      },
      {
        step: 5,
        title: "Emergency Transport",
        desc: "Call 102 immediately. Life-threatening to mother and baby.",
      },
    ],
    warnings: [
      "Seizures in pregnant woman = eclampsia — call 102 immediately",
      "Do NOT give Aspirin or NSAIDs to pregnant women — EVER",
    ],
    medicines: [
      {
        ageGroup: "Pregnant women",
        medicine: "Paracetamol 500mg ONLY",
        dosage: "1 tablet",
        frequency: "Every 6 hours if needed",
        note: "The ONLY safe painkiller in pregnancy.",
      },
    ],
  },
  {
    id: "cord_prolapse",
    title: "Umbilical Cord Prolapse",
    severity: "critical",
    icon: "🚨",
    summary:
      "Cord visible outside vagina. Keep moist, knee-chest position. Rush to hospital.",
    steps: [
      {
        step: 1,
        title: "Do NOT Push Cord Back",
        desc: "Keep cord moist with clean wet cloth. Never push inside.",
      },
      {
        step: 2,
        title: "Knee-Chest Position",
        desc: "Mother kneeling, chest down on floor, bottom up — relieves pressure on cord.",
      },
      {
        step: 3,
        title: "Call 102 Now",
        desc: "Critical surgical emergency requiring immediate cesarean section. Call 102.",
      },
      {
        step: 4,
        title: "Keep Cord Warm",
        desc: "Keep cord wrapped in clean wet warm cloth until help arrives.",
      },
    ],
    warnings: [
      "Cord prolapse requires urgent C-section — hospital only",
      "Rush to nearest hospital — time is critical for baby survival",
    ],
  },
];

// ENVIRONMENTAL EMERGENCIES
export const ENVIRONMENTAL: MedicalTopic[] = [
  {
    id: "snakebite",
    title: "Snake Bite (India Protocol)",
    severity: "critical",
    icon: "🐍",
    summary:
      "Immobilize, keep below heart. NO tourniquet/ice/suction. Walk to hospital.",
    steps: [
      {
        step: 1,
        title: "Move Away Safely",
        desc: "Move away from snake. Note its appearance (color, pattern) — do NOT capture.",
      },
      {
        step: 2,
        title: "Immobilize",
        desc: "Keep bitten limb still and below heart level. Movement speeds venom absorption.",
      },
      {
        step: 3,
        title: "Remove Tight Items",
        desc: "Remove rings, bangles, watch, tight clothing before swelling starts.",
      },
      {
        step: 4,
        title: "Walk to Help",
        desc: "If hospital within 30 min: walk calmly. Running increases heart rate and venom absorption.",
      },
      {
        step: 5,
        title: "Mark Swelling",
        desc: "Mark swelling edge with pen every 15 min with time — helps doctors assess.",
      },
      {
        step: 6,
        title: "Hospital Only",
        desc: "Antivenom ONLY at government hospitals. Call 108/112 for ambulance.",
      },
    ],
    warnings: [
      "India Big 4 snakes: Cobra, Common Krait, Russell's Viper, Saw-Scaled Viper — all need antivenom",
      "Most snakebite deaths in India are from DELAY in reaching hospital",
      "Krait bites are often painless — victim may not know they were bitten",
    ],
    doNot: [
      "Do NOT apply tourniquet — causes tissue death",
      "Do NOT apply ice — ineffective, delays hospital trip",
      "Do NOT cut and suck venom — causes infection, not effective",
      "Do NOT apply electric shock — dangerous myth",
      "Do NOT give alcohol, herbal remedies, or apply poultice",
    ],
    extraInfo: [
      {
        label: "Cobra bite",
        value:
          "Pain + swelling, drooping eyelids, difficulty swallowing/breathing (neurotoxic).",
      },
      {
        label: "Krait bite",
        value:
          "Often painless, abdominal pain, drooping eyelids, breathing difficulty (neurotoxic).",
      },
      {
        label: "Russell's Viper",
        value:
          "Severe pain + bleeding from site, gum bleeding, kidney failure (haemotoxic).",
      },
      {
        label: "Antivenom availability",
        value:
          "Free polyvalent antivenom at all AP Government hospitals, PHC, CHC, District Hospitals.",
      },
    ],
  },
  {
    id: "scorpion_sting",
    title: "Scorpion Sting",
    severity: "high",
    icon: "🦂",
    summary:
      "Wash, cold compress, pain relief. Children always to hospital. Red scorpion is dangerous.",
    steps: [
      {
        step: 1,
        title: "Wash Site",
        desc: "Wash sting site with soap and water.",
      },
      {
        step: 2,
        title: "Cold Compress",
        desc: "Apply cold pack wrapped in cloth for 10-15 min.",
      },
      { step: 3, title: "Pain Relief", desc: "Give Paracetamol for pain." },
      {
        step: 4,
        title: "Monitor",
        desc: "Watch for muscle spasms, drooling, sweating, breathing difficulty.",
      },
      {
        step: 5,
        title: "Children Hospital",
        desc: "All children stung by scorpion go to hospital immediately. Red scorpion = life-threatening.",
      },
    ],
    warnings: [
      "Indian Red Scorpion (AP/Maharashtra/TN) is one of most dangerous scorpions in the world",
      "Antidote (Prazosin) only available at hospitals",
    ],
    medicines: [
      {
        ageGroup: "Adult",
        medicine: "Paracetamol 500mg (Crocin/Dolo)",
        dosage: "1 tablet",
        frequency: "Every 6 hours for pain",
        note: "",
      },
      {
        ageGroup: "Child",
        medicine: "Paracetamol syrup (Crocin syrup)",
        dosage: "10-15 mg/kg per dose",
        frequency: "Every 6 hours",
        note: "Take child to hospital immediately.",
      },
    ],
  },
  {
    id: "heatstroke",
    title: "Heatstroke & Heat Exhaustion",
    severity: "high",
    icon: "☀️",
    summary:
      "Vijayawada/AP summer: >45°C. Cool immediately. ORS. Heatstroke = emergency.",
    steps: [
      {
        step: 1,
        title: "Identify Type",
        desc: "Heat Exhaustion: sweating, pale/moist skin, weakness. Heatstroke: NO sweating, hot/dry skin, temp >40°C, confusion.",
      },
      {
        step: 2,
        title: "Move to Cool Area",
        desc: "Move out of sun into shade or cool indoor space. Remove excess clothing.",
      },
      {
        step: 3,
        title: "Cool Body",
        desc: "Heatstroke: wet sheets, cold sponge on entire body. Ice packs to neck, armpits, groin. Fan vigorously.",
      },
      {
        step: 4,
        title: "ORS Fluids",
        desc: "Heat exhaustion (conscious): give ORS or lemon-salt water. Slow sipping.",
      },
      {
        step: 5,
        title: "Heatstroke = Call 108",
        desc: "Heatstroke with confusion and no sweating = call 108. Cool aggressively while waiting.",
      },
    ],
    warnings: [
      "Vijayawada/AP temperatures exceed 45°C in summer — very high heatstroke risk",
      "Do NOT give fluids to unconscious person",
      "Elderly and children are at highest risk",
    ],
    extraInfo: [
      {
        label: "Heat Exhaustion",
        value: "Temp normal or <38°C, sweating, pale, weak. Rest + fluids.",
      },
      {
        label: "Heatstroke",
        value: "Temp >40°C, NO sweating, confused, hot dry skin. EMERGENCY.",
      },
      {
        label: "AP Prevention",
        value:
          "Avoid outdoor work 11am-4pm. Drink 3-4 litres water daily. Light cotton clothing. Carry ORS.",
      },
    ],
  },
  {
    id: "drowning",
    title: "Drowning",
    severity: "critical",
    icon: "🌊",
    summary:
      "Call for help. Rescue breathing. CPR if no pulse. Recovery position. Hospital mandatory.",
    steps: [
      {
        step: 1,
        title: "Call for Help",
        desc: "Shout for help. Call 112/108. Do NOT enter water unless trained.",
      },
      {
        step: 2,
        title: "Reach or Throw",
        desc: "Reach with stick/rope, or throw floating object. Only enter water if trained.",
      },
      {
        step: 3,
        title: "Rescue Breathing",
        desc: "Start rescue breaths on shore if person not breathing. Give 5 initial rescue breaths.",
      },
      {
        step: 4,
        title: "CPR",
        desc: "No pulse: begin CPR (30:2). Continue until breathing resumes or help arrives.",
      },
      {
        step: 5,
        title: "Recovery Position",
        desc: "If breathing: place on side. Water will drain from mouth.",
      },
      {
        step: 6,
        title: "Hospital Mandatory",
        desc: "All near-drowning victims MUST go to hospital — secondary drowning can occur hours later.",
      },
    ],
    doNot: [
      "Do NOT hang victim upside down to drain water — delays CPR",
      "Do NOT leave rescued person alone even if conscious",
    ],
  },
  {
    id: "electrocution",
    title: "Electrocution",
    severity: "critical",
    icon: "⚡",
    summary:
      "Cut power FIRST. Do NOT touch victim. CPR if no pulse. Burns at entry/exit points.",
    steps: [
      {
        step: 1,
        title: "Cut Power",
        desc: "Switch off at main circuit breaker BEFORE approaching. Use DRY non-conductive material to push wire away if needed.",
      },
      {
        step: 2,
        title: "Do NOT Touch",
        desc: "Do NOT touch victim until power is definitely OFF.",
      },
      {
        step: 3,
        title: "Check & CPR",
        desc: "Once safe: check pulse and breathing. Begin CPR immediately if no pulse.",
      },
      {
        step: 4,
        title: "Treat Burns",
        desc: "Look for entry wound and exit wound (usually foot). Cover both with clean dressings.",
      },
      {
        step: 5,
        title: "Call 108",
        desc: "All electrocution victims need hospital — heart arrhythmia can appear hours later.",
      },
    ],
    warnings: [
      "High-voltage lines: call APEPDCL (1912) to disconnect power",
      "Lightning strike: same treatment + CPR if no pulse",
    ],
  },
  {
    id: "chemical_exposure",
    title: "Chemical Exposure",
    severity: "high",
    icon: "☣️",
    summary:
      "Remove clothing. Rinse with water 15+ min. Do NOT induce vomiting for ingestion.",
    steps: [
      {
        step: 1,
        title: "Protect Yourself",
        desc: "Wear gloves/mask if available. Do NOT inhale fumes.",
      },
      {
        step: 2,
        title: "Remove Clothing",
        desc: "Remove contaminated clothing and shoes. Cut off if needed — do NOT pull over head.",
      },
      {
        step: 3,
        title: "Skin: Rinse",
        desc: "Flush affected skin with large amounts of clean water for 15-20 minutes.",
      },
      {
        step: 4,
        title: "Eye: Flush",
        desc: "Eye exposure: flush with clean water for 20+ min. Remove contact lenses. Hospital immediately.",
      },
      {
        step: 5,
        title: "Ingestion",
        desc: "If swallowed: do NOT induce vomiting. Give water to dilute. Rush to hospital with chemical container.",
      },
    ],
    doNot: [
      "Do NOT induce vomiting after chemical ingestion",
      "Do NOT mix chemicals — creates toxic fumes",
      "Bring chemical container/label to hospital — critical for treatment",
    ],
  },
];

// SYSTEMIC EMERGENCIES
export const SYSTEMIC: MedicalTopic[] = [
  {
    id: "diabetic_emergencies",
    title: "Diabetic Emergencies",
    severity: "high",
    icon: "🍬",
    summary:
      "Hypoglycemia: give sugar immediately. Hyperglycemia/DKA: water + hospital.",
    steps: [
      {
        step: 1,
        title: "Identify Type",
        desc: "Hypoglycemia (Low): confusion, shaking, sweating, pale, rapid pulse — sudden onset. Hyperglycemia (High): extreme thirst, fruity breath, slow onset.",
      },
      {
        step: 2,
        title: "Hypoglycemia Treatment",
        desc: "Conscious: give 3 glucose tablets, or 3 tsp sugar in water, or ORS with sugar, or 150ml fruit juice. Re-check in 15 min.",
      },
      {
        step: 3,
        title: "Unconscious Hypoglycemia",
        desc: "Do NOT give by mouth. Rub sugary jam/honey on inside of cheeks. Recovery position. Call 108.",
      },
      {
        step: 4,
        title: "Hyperglycemia",
        desc: "Give clean water slowly. Do NOT give sugar. Hospital for insulin and IV fluids.",
      },
    ],
    warnings: [
      "Unconscious diabetic patient = never give anything by mouth",
      "DKA: fruity breath + extreme thirst + confusion = hospital immediately",
    ],
    extraInfo: [
      {
        label: "Hypoglycemia",
        value:
          "Blood sugar <70 mg/dL. Symptoms appear suddenly. Give sugar if conscious.",
      },
      {
        label: "DKA",
        value:
          "Blood sugar >250 mg/dL. Develops over hours. Hospital for insulin + fluids.",
      },
      {
        label: "Disaster prep",
        value: "7-day insulin supply in cool container. Carry glucometer.",
      },
    ],
  },
  {
    id: "asthma_attack",
    title: "Asthma Attack",
    severity: "high",
    icon: "💨",
    summary:
      "Upright position. Salbutamol inhaler 2-4 puffs. Pursed lip breathing. Hospital if no improvement.",
    steps: [
      {
        step: 1,
        title: "Upright Position",
        desc: "Sit upright, leaning slightly forward with hands on knees. Do NOT lay down.",
      },
      {
        step: 2,
        title: "Use Inhaler",
        desc: "Salbutamol (Asthalin/Ventolin) inhaler: 2-4 puffs. Repeat every 20 min up to 3 times.",
      },
      {
        step: 3,
        title: "Pursed Lip Breathing",
        desc: "In through nose (2 sec), out slowly through pursed lips (4 sec).",
      },
      {
        step: 4,
        title: "Calm & Reassure",
        desc: "Anxiety worsens asthma. Stay calm, speak quietly. Loosen tight clothing.",
      },
      {
        step: 5,
        title: "Hospital Threshold",
        desc: "No improvement in 15 min, unable to speak in sentences, lips turning blue = call 108.",
      },
    ],
    warnings: [
      "Silent chest (no wheeze) = very dangerous — call 108 immediately",
      "Dust and smoke from disasters are major asthma triggers",
    ],
    medicines: [
      {
        ageGroup: "Adult & Child >5 yrs",
        medicine: "Salbutamol inhaler (Asthalin/Ventolin)",
        dosage: "2-4 puffs",
        frequency: "Every 20 min up to 3 times",
        note: "Available at most Indian chemists without prescription.",
      },
    ],
  },
  {
    id: "anaphylaxis",
    title: "Anaphylaxis (Severe Allergy)",
    severity: "critical",
    icon: "🚨",
    summary:
      "Hives + breathing difficulty + BP drop. Lay flat legs up. Epinephrine if available.",
    steps: [
      {
        step: 1,
        title: "Identify",
        desc: "Hives/rash, swollen face/throat, difficulty breathing, wheezing, dizziness — within minutes of trigger.",
      },
      {
        step: 2,
        title: "Lay Flat",
        desc: "Lay person flat. Elevate legs 30-45 degrees. If breathing difficulty: semi-upright.",
      },
      {
        step: 3,
        title: "Epinephrine",
        desc: "If Epipen available: inject into outer thigh. Hold for 10 seconds. Repeat in 5 min if needed.",
      },
      {
        step: 4,
        title: "Antihistamine",
        desc: "Give Cetirizine 10mg (Alerid) as second-line only — NOT a substitute for epinephrine.",
      },
      {
        step: 5,
        title: "Call 108",
        desc: "All anaphylaxis needs hospital — biphasic reaction can occur 4-8 hours later.",
      },
    ],
    warnings: [
      "Epinephrine is the ONLY life-saving treatment for anaphylaxis",
      "Antihistamines alone are NOT sufficient for severe anaphylaxis",
      "Biphasic reaction: can recur 4-8 hours later — hospital observation mandatory",
    ],
  },
  {
    id: "dental_emergencies",
    title: "Dental Emergencies",
    severity: "medium",
    icon: "🦷",
    summary:
      "Knocked-out tooth in milk. Pain: Paracetamol + clove oil. Dental visit ASAP.",
    steps: [
      {
        step: 1,
        title: "Knocked-Out Tooth",
        desc: "Handle by crown (white part), NOT root. Do NOT scrub. Rinse briefly in milk. Replant in socket OR store in milk/saliva.",
      },
      {
        step: 2,
        title: "1-Hour Window",
        desc: "Replantation success highest within 30 min, possible up to 1 hour. Rush to dentist with tooth in milk.",
      },
      {
        step: 3,
        title: "Fracture",
        desc: "Cover sharp edges with clean cloth. Save fragments in milk.",
      },
      {
        step: 4,
        title: "Toothache",
        desc: "Rinse with warm salt water. Apply clove oil (Lavang tel) on cotton to tooth. Paracetamol for pain.",
      },
    ],
    medicines: [
      {
        ageGroup: "Adult",
        medicine: "Paracetamol 500mg (Crocin/Dolo)",
        dosage: "1-2 tablets",
        frequency: "Every 6 hours",
        note: "",
      },
      {
        ageGroup: "All ages",
        medicine: "Clove oil (Lavang tel)",
        dosage: "Tiny drop on cotton on tooth",
        frequency: "As needed",
        note: "Natural dental analgesic. Available at Indian chemists.",
      },
    ],
  },
];

// PEDIATRIC
export const PEDIATRIC: MedicalTopic[] = [
  {
    id: "pediatric_dosages",
    title: "Pediatric Medicine Dosages",
    severity: "medium",
    icon: "👦",
    summary:
      "Age/weight-based dosing for Indian medicines. NO Aspirin in children.",
    medicines: [
      {
        ageGroup: "<3 months",
        medicine: "Paracetamol",
        dosage: "AVOID — doctor only",
        frequency: "—",
        note: "Do not self-medicate infants <3 months",
      },
      {
        ageGroup: "3-12 months",
        medicine: "Paracetamol syrup 120mg/5ml (Crocin)",
        dosage: "60-120mg (2.5-5ml)",
        frequency: "Every 6 hours",
        note: "Max 4 doses/day. Weigh baby for accuracy.",
      },
      {
        ageGroup: "1-5 years",
        medicine: "Paracetamol syrup/tablet",
        dosage: "120-250mg",
        frequency: "Every 6 hours",
        note: "Syrup preferred. Max 4 doses/day.",
      },
      {
        ageGroup: "6-12 years",
        medicine: "Paracetamol 250-500mg (Crocin/Dolo)",
        dosage: "250-500mg",
        frequency: "Every 6 hours",
        note: "Max 4 doses/day.",
      },
      {
        ageGroup: "3-12 months",
        medicine: "Ibuprofen syrup 100mg/5ml (Brufen)",
        dosage: "50mg (2.5ml)",
        frequency: "Every 8 hours WITH food",
        note: "NOT for infants <3 months.",
      },
      {
        ageGroup: "1-5 years",
        medicine: "Ibuprofen syrup/tablet",
        dosage: "100mg",
        frequency: "Every 8 hours with food",
        note: "NOT in dengue/dehydration.",
      },
      {
        ageGroup: "6-12 years",
        medicine: "Ibuprofen 200mg",
        dosage: "200mg",
        frequency: "Every 8 hours with food",
        note: "Avoid if dengue suspected.",
      },
      {
        ageGroup: "2-5 years",
        medicine: "Cetirizine syrup 5mg/5ml (Alerid)",
        dosage: "2.5mg (2.5ml)",
        frequency: "Once daily at bedtime",
        note: "Causes drowsiness.",
      },
      {
        ageGroup: "6-11 years",
        medicine: "Cetirizine 5mg (Alerid)",
        dosage: "5mg",
        frequency: "Once daily at bedtime",
        note: "",
      },
    ],
    warnings: [
      "NEVER give Aspirin (Ecosprin/Aspro) to children under 16 — risk of Reye's syndrome",
      "Ibuprofen: avoid in dehydrated children, suspected dengue, or kidney problems",
      "Always calculate dose by WEIGHT not just age for infants",
    ],
  },
  {
    id: "infant_cpr",
    title: "Infant & Child CPR",
    severity: "critical",
    icon: "👶",
    summary:
      "Infant: 2-finger compression, 4cm depth, cover mouth AND nose. 30:2 ratio.",
    steps: [
      {
        step: 1,
        title: "Check Response",
        desc: "Flick sole of foot. No response = unresponsive. Call for help.",
      },
      {
        step: 2,
        title: "Infant Airway",
        desc: "Tilt head GENTLY to neutral sniffing position — NOT hyperextended.",
      },
      {
        step: 3,
        title: "Infant Breaths",
        desc: "Cover BOTH mouth AND nose with your mouth. Give 5 initial gentle rescue breaths.",
      },
      {
        step: 4,
        title: "Infant Compressions",
        desc: "2 fingers just BELOW nipple line on sternum. Push down 4cm. 30 compressions at 100-120/min.",
      },
      {
        step: 5,
        title: "Child (1-8 yrs)",
        desc: "1-2 hands on lower half of sternum. Push 5cm deep. 30:2 ratio. 100-120/min.",
      },
    ],
    extraInfo: [
      {
        label: "Key difference from adult",
        value:
          "Infants: 2 fingers, 4cm depth, cover mouth AND nose. Child: begin with 5 rescue breaths (unlike adult).",
      },
    ],
  },
  {
    id: "pediatric_choking",
    title: "Choking (Child & Infant)",
    severity: "critical",
    icon: "🍬",
    summary:
      "Infants: 5 back blows + 5 chest thrusts. Children >1yr: Heimlich maneuver.",
    steps: [
      {
        step: 1,
        title: "Assess",
        desc: "Mild: child can cough/cry/speak → encourage coughing. Severe: silent, cannot cough, turning blue = act immediately.",
      },
      {
        step: 2,
        title: "Infant (<1 yr)",
        desc: "Face down on forearm. 5 firm back blows between shoulder blades. Flip face up: 5 chest thrusts. Alternate until object dislodged.",
      },
      {
        step: 3,
        title: "Child (>1 yr)",
        desc: "Stand behind child. Fist between navel and ribs. 5 upward inward thrusts (Heimlich). Repeat.",
      },
      {
        step: 4,
        title: "Unconscious",
        desc: "If child loses consciousness: begin CPR. Only remove visible object if clearly seen.",
      },
    ],
    doNot: [
      "Do NOT do abdominal thrusts on infants under 1 year",
      "Do NOT do blind finger sweeps in mouth — pushes object deeper",
    ],
  },
  {
    id: "febrile_seizures",
    title: "Febrile Seizures (Child)",
    severity: "high",
    icon: "🌡️",
    summary:
      "Seizure due to high fever. Safety position. Do NOT put anything in mouth. Hospital if >5 min.",
    steps: [
      {
        step: 1,
        title: "Stay Calm",
        desc: "Febrile seizures are common in children 6 months-5 years and usually harmless. Most last under 5 min.",
      },
      {
        step: 2,
        title: "Safety Position",
        desc: "Place child on their side on the floor. Remove nearby hard/sharp objects.",
      },
      {
        step: 3,
        title: "Do NOT Restrain",
        desc: "Do NOT hold the child down. Do NOT put anything in the mouth.",
      },
      {
        step: 4,
        title: "Time the Seizure",
        desc: "Note the start time. Record how long it lasts.",
      },
      {
        step: 5,
        title: "After Seizure",
        desc: "Child may be confused/sleepy — normal post-ictal state. Recovery position. Monitor breathing.",
      },
      {
        step: 6,
        title: "Hospital",
        desc: "All first febrile seizures go to hospital. Seizure >5 min = call 108 immediately.",
      },
    ],
    doNot: [
      "Do NOT put fingers, spoon, or cloth in mouth — causes injury; tongue-swallowing is a myth",
      "Do NOT restrain the child during seizure",
    ],
  },
];

// ELDERLY CARE
export const ELDERLY: MedicalTopic[] = [
  {
    id: "fall_management",
    title: "Fall Management (Elderly)",
    severity: "high",
    icon: "🧓",
    summary:
      "Suspect hip fracture. Do NOT move without assessment. Call 108. Immobilize.",
    steps: [
      {
        step: 1,
        title: "Do Not Rush",
        desc: "Do NOT immediately pull them up. Assess consciousness, pain location, and ability to move limbs.",
      },
      {
        step: 2,
        title: "Hip Fracture Check",
        desc: "Signs: severe hip/groin pain, inability to lift leg, foot pointing outward. If suspected: do NOT move, call 108.",
      },
      {
        step: 3,
        title: "If Safe to Move",
        desc: "No severe pain or fracture: help roll to side, then kneel, then use chair to stand up slowly.",
      },
      {
        step: 4,
        title: "Head Injury Check",
        desc: "Any confusion, headache, or unequal pupils = hospital immediately.",
      },
    ],
    warnings: [
      "Hip fractures in elderly are life-threatening if untreated — call 108",
      "Head injury in elderly on blood thinners = emergency even with minor impact",
    ],
  },
  {
    id: "elderly_medications",
    title: "Elderly Medication Risks in Disasters",
    severity: "high",
    icon: "💊",
    summary:
      "Common India elderly medicines: Metformin, Atenolol, Amlodipine. Interruption risks.",
    warnings: [
      "Metformin (Glycomet): interruption causes high blood sugar. Continue if possible.",
      "Atenolol/Metoprolol: sudden stopping causes rebound high BP and heart rate — must continue",
      "Amlodipine: BP medication — missing doses increases stroke risk",
      "Warfarin: if dose missed, clotting risk increases. Hospital guidance needed.",
      "Anti-epileptics (Phenytoin/Levipil): must not miss doses — seizure risk if stopped",
    ],
    extraInfo: [
      {
        label: "Disaster Kit Rule",
        value:
          "7-day supply of ALL regular medications in disaster kit. Prescription photo in phone.",
      },
      {
        label: "Metformin in disaster",
        value: "Avoid if dehydrated or kidney function compromised.",
      },
      {
        label: "BP medications",
        value: "Atenolol, Amlodipine, Telmisartan — never stop abruptly.",
      },
    ],
  },
  {
    id: "elderly_heat",
    title: "Elderly Heat Vulnerability (AP)",
    severity: "high",
    icon: "☀️",
    summary:
      "Elderly most at risk in AP summer. Extra water, shade, ORS. Monitor for confusion.",
    steps: [
      {
        step: 1,
        title: "Hydration",
        desc: "Ensure 2-3 litres water or ORS per day. Thirst sensation decreases with age.",
      },
      {
        step: 2,
        title: "Shade & Ventilation",
        desc: "Keep in shaded, ventilated area. Wet towel on neck, wrists, and ankles.",
      },
      {
        step: 3,
        title: "Avoid Outdoor Activity",
        desc: "No outdoor activity 11am-4pm during AP summer (March-June).",
      },
      {
        step: 4,
        title: "Monitor Confusion",
        desc: "Confusion in elderly in heat = possible heatstroke or dehydration. Check temperature immediately.",
      },
    ],
    warnings: [
      "Elderly are 10x more likely to die from heatstroke than younger adults",
      "Many BP and diabetes medications increase heat sensitivity",
    ],
  },
  {
    id: "elderly_cognition",
    title: "Cognitive Changes Under Stress",
    severity: "medium",
    icon: "🧠",
    summary:
      "Confusion in elderly may be medical, not just stress. AVPU + FAST stroke check.",
    steps: [
      {
        step: 1,
        title: "AVPU Assessment",
        desc: "Alert? Verbal response? Pain response only? Unresponsive?",
      },
      {
        step: 2,
        title: "Rule Out Medical Causes",
        desc: "Confusion could be: dehydration, hypoglycemia, heatstroke, missed medication, infection (UTI common), or stroke.",
      },
      {
        step: 3,
        title: "FAST Stroke Check",
        desc: "Face drooping? Arm weakness? Speech slurred? Time to call = call 112 immediately.",
      },
      {
        step: 4,
        title: "Reorient Gently",
        desc: "Speak calmly and clearly. Familiar objects (phone, photo) help orientation.",
      },
    ],
    extraInfo: [
      {
        label: "FAST stroke check",
        value:
          "F=Face drooping, A=Arm weakness, S=Speech slurred, T=Time to call 112.",
      },
      {
        label: "Delirium vs Dementia",
        value:
          "Delirium: sudden onset, usually medical cause. Dementia: gradual. Sudden change = medical emergency.",
      },
    ],
  },
  {
    id: "wound_healing_elderly",
    title: "Wound Care — Elderly",
    severity: "medium",
    icon: "🩹",
    summary:
      "Slower healing, higher infection risk. Daily monitoring. Betadine + Soframycin.",
    steps: [
      {
        step: 1,
        title: "Clean Carefully",
        desc: "Elderly skin tears easily. Use gentle Savlon diluted 1:30. Do NOT use alcohol directly on skin.",
      },
      {
        step: 2,
        title: "Antibiotic Ointment",
        desc: "Apply Soframycin or Neosporin at every dressing change. Elderly wounds prone to infection.",
      },
      {
        step: 3,
        title: "Daily Monitoring",
        desc: "Check wound daily: increasing redness, warmth, swelling, or pus = infection. Act quickly.",
      },
      {
        step: 4,
        title: "Pressure Sores",
        desc: "Bed-bound elderly: change position every 2 hours. Check heels, hips, tailbone daily.",
      },
    ],
    warnings: [
      "Wound infection progresses faster in elderly — daily monitoring essential",
      "Diabetic elderly: any foot wound = hospital visit even if small",
    ],
  },
];

// ORGANIZED CATEGORIES (for UI tabs)
export const MEDICAL_CATEGORIES: MedicalCategory[] = [
  {
    id: "minor",
    label: "Minor Injuries",
    icon: "🩹",
    color: "oklch(0.65 0.18 145)",
    topics: MINOR_INJURIES,
  },
  {
    id: "major",
    label: "Major Injuries",
    icon: "🩸",
    color: "oklch(0.65 0.2 10)",
    topics: MAJOR_INJURIES,
  },
  {
    id: "obstetric",
    label: "Pregnancy",
    icon: "🤰",
    color: "oklch(0.70 0.15 300)",
    topics: OBSTETRIC,
  },
  {
    id: "environmental",
    label: "Environmental",
    icon: "🌿",
    color: "oklch(0.68 0.16 130)",
    topics: ENVIRONMENTAL,
  },
  {
    id: "systemic",
    label: "Systemic",
    icon: "💊",
    color: "oklch(0.65 0.15 220)",
    topics: SYSTEMIC,
  },
  {
    id: "pediatric",
    label: "Pediatric",
    icon: "👶",
    color: "oklch(0.72 0.14 60)",
    topics: PEDIATRIC,
  },
  {
    id: "elderly",
    label: "Elderly",
    icon: "🧓",
    color: "oklch(0.70 0.12 240)",
    topics: ELDERLY,
  },
];

// KB ENTRIES FOR AI CHATBOT
export interface KBEntry {
  keywords: string[];
  title: string;
  response: string;
}

export const MEDICAL_KB_ENTRIES: KBEntry[] = [
  {
    keywords: [
      "snake",
      "snakebite",
      "cobra",
      "krait",
      "viper",
      "serpent",
      "bite",
    ],
    title: "Snakebite First Aid (India)",
    response: `**SNAKEBITE — INDIA PROTOCOL (MOH Guidelines)**

**Immediately Do:**
1. Move person away from snake safely.
2. Immobilize bitten limb — keep BELOW heart level.
3. Remove rings, bangles, watches, tight clothing before swelling.
4. Walk calmly to nearest hospital. Call 108 for ambulance.
5. Mark swelling edge with pen every 15 min to track progression.

**India's Big 4 Snakes (All need antivenom at hospital):**
✅ Cobra — drooping eyelids, breathing difficulty (neurotoxic)
✅ Common Krait — often painless bite, abdominal pain, night bite
✅ Russell's Viper — severe pain, bleeding, kidney failure (haemotoxic)
✅ Saw-Scaled Viper — bleeding from site, blood in urine (haemotoxic)

⚠️ ANTIVENOM ONLY at Government Hospital — free at all AP govt hospitals.
⚠️ AP Ambulance: 108

**DO NOT:**
⚠️ Do NOT apply tourniquet — worsens outcome, causes tissue death
⚠️ Do NOT apply ice — ineffective, delays hospital
⚠️ Do NOT cut and suck — ineffective and causes infection
⚠️ Do NOT apply electric shock — dangerous myth
⚠️ Do NOT give herbal medicines or alcohol`,
  },
  {
    keywords: [
      "scorpion",
      "scorpion sting",
      "red scorpion",
      "stung by scorpion",
    ],
    title: "Scorpion Sting (India)",
    response: `**SCORPION STING — INDIA**

1. Wash sting site with soap and water.
2. Cold pack wrapped in cloth for 10-15 min.
3. Paracetamol 500mg for adults for pain.
4. Watch for: muscle spasms, drooling, sweating, breathing difficulty.

**Indian Red Scorpion (AP, Maharashtra, Tamil Nadu):**
⚠️ One of most dangerous scorpions in the world.
⚠️ All children stung by any scorpion = hospital immediately.
⚠️ Antidote (Prazosin) only at hospitals.

✅ Most adult stings are painful but not life-threatening.
⚠️ Any breathing difficulty or child = hospital immediately.`,
  },
  {
    keywords: [
      "heatstroke",
      "heat stroke",
      "heat exhaustion",
      "sunstroke",
      "overheating",
      "vijayawada heat",
      "summer heat",
    ],
    title: "Heatstroke & Heat Exhaustion (AP/Vijayawada)",
    response: `**HEATSTROKE & HEAT EXHAUSTION — AP/Vijayawada**

⚠️ Vijayawada temperatures exceed 45°C in summer (March-June). Very high risk.

**Heat Exhaustion (less severe):**
✅ Heavy sweating, pale moist skin, weakness, nausea.
Treatment: Move to shade, cool with wet cloth, give ORS or lemon-salt water.

**Heatstroke (EMERGENCY):**
⚠️ Temperature >40°C, NO sweating, hot DRY skin, confusion.
1. Move to cool area immediately. Remove excess clothing.
2. Wet entire body with cold water sponge.
3. Ice packs to neck, armpits, and groin.
4. Fan vigorously.
5. Call 108 — do NOT delay.

⚠️ Do NOT give fluids to unconscious person.
✅ AP Prevention: Avoid outdoor activity 11am-4pm. Drink 3-4 litres water daily.
✅ ORS: 1 litre water + 1 tsp salt + 6 tsp sugar.`,
  },
  {
    keywords: [
      "fracture",
      "broken bone",
      "break bone",
      "bone injury",
      "splint",
      "fracture treatment",
    ],
    title: "Fracture First Aid",
    response: `**FRACTURE FIRST AID — India MOH Guidelines**

1. Do NOT attempt to straighten or reposition the bone.
2. Immobilize limb in the position you find it.
3. Splint with: straight stick, rolled newspaper, bamboo, or cardboard.
4. Pad around splint with soft cloth. Tie ABOVE and BELOW fracture.
5. Check circulation every 15 min: fingers/toes must stay pink and warm.
6. Call 108 for transport.

**Open Fracture (bone through skin):**
⚠️ Cover with clean wet cloth — do NOT push bone in.
⚠️ Surgical emergency — call 108.

**Hip Fracture in Elderly:**
⚠️ Do NOT move — call 108 and wait.
⚠️ Signs: severe hip pain, foot pointing outward, cannot lift leg.`,
  },
  {
    keywords: [
      "bleed",
      "bleeding",
      "blood",
      "severe bleed",
      "tourniquet",
      "haemorrhage",
      "hemorrhage",
    ],
    title: "Severe Bleeding Control",
    response: `**SEVERE BLEEDING CONTROL — India MOH Trauma Guidelines**

1. Apply DIRECT PRESSURE with cleanest available material (dupatta, shirt, cloth).
2. Press HARD for 15 minutes continuously. Do NOT lift cloth.
3. If cloth soaks through: add more on top, do NOT remove original.

**Tourniquet (limb bleeding only):**
1. Apply 5-8cm ABOVE the wound.
2. Use dupatta, belt, or torn cloth — twist with stick until bleeding stops.
3. Write TIME applied on person's forehead.
4. Do NOT remove once applied in field.

⚠️ Abdominal wound with exposed organs: wet clean cloth, do NOT push back.
⚠️ Shock (pale, cold, rapid pulse): lay flat, elevate legs, call 108.
✅ Call 108 (AP Ambulance) for all severe bleeding.`,
  },
  {
    keywords: [
      "pregnant",
      "pregnancy",
      "labour",
      "delivery",
      "obstetric",
      "miscarriage",
      "eclampsia",
      "prenatal",
    ],
    title: "Pregnancy Emergencies",
    response: `**PREGNANCY EMERGENCIES — India Protocol**

**Labour Signs:**
✅ Regular contractions, bloody show, water breaking = call 102 (Free AP ambulance).
⚠️ Green/yellow amniotic fluid = fetal distress — emergency.

**Emergency Delivery:**
1. Clean hands. Lay clean cloth under mother.
2. Support baby's head as it emerges — do NOT pull.
3. Clear baby's airway. Dry immediately — skin-to-skin with mother.
4. Do NOT cut umbilical cord unless trained with sterile scissors.
5. Call 102 even after delivery.

**Eclampsia (Seizures):**
⚠️ Left side position. Protect from injury. Do NOT restrain. Call 102.

**CRITICAL — Medicines in Pregnancy:**
✅ ONLY Paracetamol 500mg is safe for pain/fever.
⚠️ NEVER give Aspirin, Ibuprofen, Diclofenac, or Combiflam to pregnant women.
⚠️ Heavy bleeding after delivery = EMERGENCY: massage uterus (below navel), breastfeed, call 102.`,
  },
  {
    keywords: [
      "drowning",
      "drowned",
      "water rescue",
      "submersion",
      "near drowning",
    ],
    title: "Drowning Response",
    response: `**DROWNING RESPONSE**

1. Call for help immediately. Do NOT enter water unless trained.
2. Reach with rope, stick, or throw floating object first.
3. Once on shore: check breathing.
4. Not breathing: give 5 initial rescue breaths.
5. No pulse: CPR (30 compressions : 2 breaths).
6. Breathing: recovery position (on side) — water drains from mouth.

⚠️ ALL near-drowning victims MUST go to hospital.
⚠️ Secondary drowning: fluid in lungs causes breathing difficulty HOURS later.
⚠️ Do NOT hang victim upside down — delays CPR.
⚠️ Watch for hypothermia — keep warm after rescue.`,
  },
  {
    keywords: [
      "child dose",
      "pediatric dose",
      "baby medicine",
      "infant medicine",
      "children medicine",
      "fever child",
      "crocin child",
    ],
    title: "Pediatric Medicine Dosages (India)",
    response: `**PEDIATRIC MEDICINE DOSAGES — India**

**Paracetamol (Crocin/Dolo syrup 120mg/5ml):**
- <3 months: AVOID — doctor only
- 3-12 months: 60-120mg (2.5-5ml) every 6 hours
- 1-5 years: 120-250mg every 6 hours
- 6-12 years: 250-500mg every 6 hours
- Max: 4 doses per 24 hours

**Ibuprofen (Brufen syrup 100mg/5ml):**
- <3 months: DO NOT USE
- 3-12 months: 50mg every 8 hours WITH food
- 1-5 years: 100mg every 8 hours with food
- 6-12 years: 200mg every 8 hours with food
⚠️ Avoid in dehydration, dengue suspected, or kidney issues.

**Cetirizine (Alerid syrup 5mg/5ml):**
- 2-5 years: 2.5mg once daily at bedtime
- 6-11 years: 5mg once daily at bedtime

⚠️ NEVER give Aspirin (Ecosprin) to children under 16 — Reye's syndrome risk.`,
  },
  {
    keywords: [
      "infant cpr",
      "baby cpr",
      "child cpr",
      "choking baby",
      "infant choking",
      "child choking",
    ],
    title: "Infant & Child CPR / Choking",
    response: `**INFANT & CHILD CPR**

**Infant (<1 year):**
1. Flick sole of foot. No response = unresponsive. Call help.
2. Tilt head gently — neutral sniffing position.
3. Cover BOTH mouth AND nose. Give 5 initial rescue breaths.
4. 2 fingers BELOW nipple line. Push 4cm. 30:2 at 100-120/min.

**Child (1-8 years):**
1. Give 5 initial rescue breaths first (unlike adult protocol).
2. 1-2 hands on lower half of sternum. Push 5cm. 30:2.

**Infant Choking:**
✅ 5 back blows (face down on forearm, between shoulder blades)
✅ Flip face up: 5 chest thrusts (2 fingers on sternum)
✅ Alternate until object dislodged.

**Child Choking (>1yr): Heimlich maneuver**
✅ Stand behind child. Fist between navel and ribs. 5 upward inward thrusts.
⚠️ Do NOT do abdominal thrusts on infants under 1 year.`,
  },
  {
    keywords: [
      "diabetes",
      "diabetic",
      "blood sugar",
      "hypoglycemia",
      "hyperglycemia",
      "insulin",
      "low sugar",
      "high sugar",
    ],
    title: "Diabetic Emergencies",
    response: `**DIABETIC EMERGENCIES**

**Hypoglycemia (Low Sugar <70 mg/dL):**
Symptoms: Sudden confusion, shaking, sweating, pale, rapid pulse.
✅ Conscious: 3 glucose tablets OR 3 tsp sugar in water OR ORS with sugar OR 150ml fruit juice.
✅ Re-check in 15 min. Repeat if still symptomatic.

⚠️ Unconscious: rub sugary jam on inner cheek. Recovery position. Call 108.

**Hyperglycemia / DKA (High Sugar):**
Symptoms: Extreme thirst, fruity breath, slow onset.
1. Give clean water slowly.
2. Do NOT give sugar.
3. Hospital for insulin + IV fluids — DKA requires ICU.

✅ Disaster prep: 7-day insulin supply in cool container. Keep glucometer in kit.`,
  },
  {
    keywords: [
      "asthma",
      "wheeze",
      "wheezing",
      "inhaler",
      "breathing attack",
      "salbutamol",
      "asthalin",
      "ventolin",
    ],
    title: "Asthma Attack Management",
    response: `**ASTHMA ATTACK — EMERGENCY MANAGEMENT**

1. Sit UPRIGHT, leaning slightly forward. Do NOT lay down.
2. Salbutamol inhaler (Asthalin/Ventolin): 2-4 puffs every 20 min up to 3 times.
3. Pursed lip breathing: in through nose (2 sec), out slowly through pursed lips (4 sec).
4. Loosen tight clothing. Stay calm — anxiety worsens breathing.

**Danger Signs — Call 108:**
⚠️ No improvement in 15 min with inhaler
⚠️ Cannot speak in full sentences
⚠️ Lips or fingernails turning blue
⚠️ Silent chest (no wheeze sound) — very dangerous

⚠️ Dust and smoke from disasters are major asthma triggers.
✅ Cover nose/mouth with damp cloth in dusty conditions.`,
  },
  {
    keywords: [
      "anaphylaxis",
      "severe allergy",
      "allergic reaction",
      "epipen",
      "throat swelling",
      "anaphylactic shock",
    ],
    title: "Anaphylaxis (Severe Allergy)",
    response: `**ANAPHYLAXIS — SEVERE ALLERGIC REACTION**

Signs: Hives, swollen face/throat, difficulty breathing, wheezing, dizziness, collapse.
Occurs within minutes of trigger (bee sting, food, medicine).

**Emergency Steps:**
1. Call 108 immediately.
2. Lay flat. Elevate legs 30-45 degrees.
3. If breathing difficulty: semi-upright (45 degrees).
4. Epipen if available: inject into outer thigh, hold 10 seconds.
5. Cetirizine 10mg (Alerid) as secondary only — NOT replacement for epinephrine.

⚠️ Epinephrine injection is the ONLY effective treatment.
⚠️ Biphasic reaction may occur 4-8 hours later — hospital observation mandatory.
Common India triggers: bee/wasp stings, peanuts, seafood, penicillin.`,
  },
  {
    keywords: [
      "electrocution",
      "electric shock",
      "electricity accident",
      "current shock",
      "lightning strike",
    ],
    title: "Electrocution Response",
    response: `**ELECTROCUTION RESPONSE**

⚠️ DO NOT TOUCH VICTIM UNTIL POWER IS CONFIRMED OFF.

1. Switch off at main circuit breaker immediately.
2. If not possible: use DRY non-conductive object (dry wood, plastic) to push wire away.
3. Call 108.
4. Power OFF: check pulse and breathing.
5. No pulse: begin CPR immediately.
6. Look for entry burn and exit burn (usually foot). Cover both.

⚠️ High-voltage lines: Call APEPDCL (1912) to disconnect.
⚠️ Lightning strike: same treatment + CPR if no pulse.
⚠️ Heart arrhythmia can appear hours after — hospital mandatory.`,
  },
  {
    keywords: [
      "minor injury",
      "cut treatment",
      "scrape",
      "abrasion",
      "blister",
      "sprain treatment",
      "bruise",
    ],
    title: "Minor Injury First Aid",
    response: `**MINOR INJURY FIRST AID**

**Cuts & Abrasions:**
1. Clean hands first.
2. Rinse wound with clean water 5+ min.
3. Apply Betadine (Povidone-Iodine 5%) to wound edges.
4. Apply Neosporin/Soframycin ointment.
5. Cover with sterile gauze. Change daily.

**Sprains (PRICE method):**
✅ Protect, Rest, Ice (15-20 min), Compress (crepe bandage), Elevate.
✅ Volini gel or Diclofenac gel for pain — apply 3-4 times daily.
✅ Ibuprofen 400mg (Brufen) with food for adults.

**Nosebleed:**
1. Sit upright, lean FORWARD (not back).
2. Pinch soft part of nose for 10 full minutes.
3. Cold compress on forehead.

**Insect Bite:**
1. Remove stinger by scraping (not tweezers).
2. Cold compress. Calamine lotion.
3. Cetirizine 10mg (Alerid) for adults.`,
  },
  {
    keywords: [
      "elderly fall",
      "hip fracture",
      "old person fall",
      "senior care",
      "elderly medication",
      "elderly medicine",
    ],
    title: "Elderly Care in Disasters",
    response: `**ELDERLY CARE IN DISASTERS**

**Falls:**
⚠️ Do NOT immediately pull up — assess for hip fracture first.
⚠️ Signs of hip fracture: severe hip/groin pain, foot outward, cannot lift leg.
If suspected: Do NOT move. Call 108.

**Medication Continuity:**
⚠️ Metformin (Glycomet): maintain — interruption causes hyperglycemia
⚠️ Atenolol/Metoprolol: do NOT stop suddenly — rebound hypertension
⚠️ Amlodipine/Telmisartan: missing doses = stroke risk
⚠️ Anti-epileptics: NEVER miss — seizure risk if stopped
✅ 7-day supply of ALL regular medications in disaster kit.

**AP Summer Heat:**
✅ 2-3 litres water daily. No outdoor activity 11am-4pm.
✅ Watch for sudden confusion — could be heatstroke, dehydration, or stroke.

**Confusion: FAST stroke check:**
F=Face drooping, A=Arm weakness, S=Speech slurred, T=Time to call 112.`,
  },
];
