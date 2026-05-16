// Body Zone Data — Extended Scenarios
// Detailed treatment protocols per zone with Indian pharmacy medicine names,
// age/gender-specific dosage tables, and hospital referral criteria.

import type { BodyZone } from "./bodyZoneData";

// ---------------------------------------------------------------------------
// EXTENDED BODY ZONE DATA — new scenarios for existing zones + new zones
// ---------------------------------------------------------------------------

export const EXTENDED_BODY_ZONES: Record<
  string,
  Partial<BodyZone> & { extraScenarios: BodyZone["scenarios"] }
> = {
  head: {
    extraScenarios: [
      {
        id: "heat_stroke_head",
        title: "Heatstroke — Brain Emergency",
        severity: "critical",
        steps: [
          "Remove from hot environment immediately to shade or AC room.",
          "Remove excess clothing.",
          "Wet entire body with water, fan vigorously simultaneously.",
          "Apply ice packs to BOTH sides of neck, both armpits, and groin (major pulse points).",
          "AP summer: call 108 — body temp may be 41-43°C.",
          "Monitor for seizures — protect head if seizing.",
        ],
        medicines: [
          {
            name: "Normal Saline IV (hospital only)",
            dosage: "1 litre over 30 min",
            ageGroup: "Adult",
            frequency: "IV rehydration",
            notes: "For severe heatstroke with altered consciousness",
          },
        ],
        warnings: [
          "Heatstroke brain damage begins above 41°C — cool before hospital transfer",
          "AP summer peak (May-June): Ongole, Kurnool, Nandyal reach 47-48°C",
          "Children in cars: car interior reaches 60°C within 10 min in AP summer",
        ],
        doNot: [
          "Do NOT give fluids by mouth to unconscious person",
          "Do NOT use ice water bath for elderly (can cause cardiac shock)",
        ],
      },
      {
        id: "stroke_fast",
        title: "Stroke (FAST Assessment)",
        severity: "critical",
        steps: [
          "F — Face drooping: Ask to smile. One side drooping = positive.",
          "A — Arm weakness: Raise both arms. One drifts down = positive.",
          "S — Speech slurred: Ask to repeat 'The sky is blue.' Slurred/wrong words = positive.",
          "T — Time: Call 112 IMMEDIATELY. Note the exact time symptoms started.",
          "Thrombolysis window: 4.5 hours from symptom start. Every minute = 2 million neurons lost.",
          "Do NOT give aspirin at home — hemorrhagic stroke would worsen.",
        ],
        medicines: [
          {
            name: "Aspirin 325mg (after hospital rules out hemorrhage)",
            dosage: "325mg",
            ageGroup: "Adult",
            frequency: "Single dose in ischemic stroke only",
            notes:
              "Hospital decision ONLY; NEVER self-administer for suspected stroke",
          },
        ],
        warnings: [
          "Stroke mimics: low blood sugar, seizure, severe migraine can look like stroke — still call 112",
          "AP stroke centers: KIMS Vijayawada, Yashoda Hyderabad, SVIMS Tirupati have tPA thrombolysis",
          "TIA (mini-stroke): FAST symptoms that resolve in <24 hours — still go to hospital urgently",
        ],
        doNot: [
          "Do NOT let person 'sleep it off' — every minute without treatment causes permanent damage",
          "Do NOT give aspirin at home without hospital diagnosis",
        ],
      },
    ],
  },
  chest: {
    extraScenarios: [
      {
        id: "heart_attack_india",
        title: "Heart Attack (Myocardial Infarction)",
        severity: "critical",
        steps: [
          "Classic symptoms: central crushing chest pain radiating to left arm/jaw, sweating, nausea.",
          "AP atypical: elderly/diabetics may have only breathlessness or jaw/back pain (silent MI).",
          "CALL 108 IMMEDIATELY — golden hour treatment doubles survival.",
          "Sit person upright, loosen tight clothing, keep calm.",
          "If conscious and not allergic: Aspirin 325mg single dose (chew, do not swallow whole).",
          "Hospital STEMI treatment: angioplasty (PCI) within 90 min is gold standard.",
        ],
        medicines: [
          {
            name: "Aspirin 325mg (Ecosprin)",
            dosage: "325mg — chew",
            ageGroup: "Adult",
            frequency: "Single dose at onset",
            notes:
              "Only if conscious, not aspirin-allergic, no recent bleeding; chew tablet for faster absorption",
          },
          {
            name: "GTN spray/tablet (Sorbitrate)",
            dosage: "0.4 mg sublingual or spray",
            ageGroup: "Adult",
            frequency: "Every 5 min up to 3 doses",
            notes:
              "ONLY if prescribed. BP >90 systolic. Do NOT use if Sildenafil taken in last 24 hrs",
          },
        ],
        warnings: [
          "AP risk factors: younger age, high-stress agriculture workers, tobacco users (AP has high tobacco use)",
          "Women may have atypical symptoms: fatigue, jaw pain, nausea without chest pain",
          "Do NOT drive patient yourself — call 108; patient should not walk",
        ],
        doNot: [
          "Do NOT give aspirin if person is unconscious, vomiting, or has active bleeding",
          "Do NOT give GTN if blood pressure is low (pale/faint person)",
        ],
      },
    ],
  },
  abdomen: {
    extraScenarios: [
      {
        id: "pregnancy_abdo_pain",
        title: "Abdominal Pain in Pregnancy",
        severity: "critical",
        steps: [
          "Always take seriously in pregnancy — normal pregnancy has mild round ligament pain (sharp/shooting, brief).",
          "DANGER: Constant severe pain, bleeding, fever, shoulder pain, dizziness = emergency.",
          "Placental abruption: sudden severe constant pain + uterus hard as board + bleeding.",
          "Ectopic pregnancy (early pregnancy): lower abdominal pain + dizziness + shoulder pain = EMERGENCY.",
          "Call 102 immediately for any severe abdominal pain in pregnancy.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg ONLY",
            dosage: "500mg",
            ageGroup: "Pregnant women",
            frequency: "Every 6 hours for mild pain",
            notes:
              "ONLY safe analgesic; NEVER Ibuprofen, Diclofenac, or Aspirin",
          },
        ],
        warnings: [
          "Ruptured ectopic pregnancy bleeds internally — woman can die within 30 min",
          "Placental abruption: baby can lose oxygen rapidly",
        ],
        doNot: [
          "Do NOT give NSAIDs (Ibuprofen, Diclofenac, Naproxen) to pregnant women",
          "Do NOT apply heat to abdomen in pregnancy",
        ],
      },
    ],
  },
  back_spine: {
    extraScenarios: [
      {
        id: "acute_back_pain",
        title: "Acute Back Pain (Muscular / Mechanical)",
        severity: "moderate",
        steps: [
          "Distinguish from spinal injury: recent trauma, falls, accident = assume spinal injury (see critical protocol).",
          "Muscular back pain: comes on with lifting/bending, relieved by rest, no leg numbness.",
          "Apply ice pack (first 48 hours), then warm compress.",
          "Short rest: maximum 48 hours complete bed rest, then gentle movement is better.",
          "Paracetamol or Ibuprofen for pain with food.",
        ],
        medicines: [
          {
            name: "Paracetamol 500mg (Crocin/Dolo)",
            dosage: "1g",
            ageGroup: "Adult",
            frequency: "Every 6 hours",
            notes: "First choice; safe for most adults",
          },
          {
            name: "Ibuprofen 400mg (Brufen/Combiflam)",
            dosage: "400mg",
            ageGroup: "Adult (non-elderly, no kidney issues)",
            frequency: "Every 8 hours with food",
            notes: "Anti-inflammatory; avoid in elderly",
          },
          {
            name: "Diclofenac gel (Voveran)",
            dosage: "Small strip applied to painful area",
            ageGroup: "Adult",
            frequency: "3 times daily",
            notes: "Topical — fewer systemic side effects",
          },
          {
            name: "Muscle relaxant: Methocarbamol (Robaxin/Tydon)",
            dosage: "500mg",
            ageGroup: "Adult",
            frequency: "Every 8 hours for 3-5 days",
            notes: "For acute muscle spasm; causes drowsiness; do not drive",
          },
        ],
        warnings: [
          "Saddle anesthesia (groin/inner thigh numbness) + back pain = cauda equina emergency — call 108",
          "Back pain with fever >38.5°C = possible infection (discitis, spinal abscess)",
        ],
        doNot: [
          "Do NOT use traditional massage on acute injured back",
          "Do NOT lift or bend during acute phase",
        ],
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// DOSAGE TABLES — Complete Indian pharmacy name tables by age group
// ---------------------------------------------------------------------------

export interface DosageEntry {
  medicine: string;
  brand: string;
  dosages: {
    ageGroup: string;
    dose: string;
    frequency: string;
    route: string;
    notes: string;
  }[];
  warnings: string[];
  availability: string;
}

export const COMPREHENSIVE_DOSAGE_TABLE: DosageEntry[] = [
  {
    medicine: "Paracetamol (Acetaminophen)",
    brand: "Crocin 500mg, Dolo 650mg, Calpol, Tylenol",
    dosages: [
      {
        ageGroup: "Neonate (<1 month)",
        dose: "AVOID",
        frequency: "Doctor only",
        route: "Oral",
        notes: "Do NOT self-medicate neonates",
      },
      {
        ageGroup: "Infant 1-3 months",
        dose: "AVOID — doctor only",
        frequency: "Doctor only",
        route: "Oral",
        notes: "",
      },
      {
        ageGroup: "Infant 3-12 months",
        dose: "60-120mg (2.5-5ml syrup)",
        frequency: "Every 4-6 hours; max 4 doses/day",
        route: "Oral",
        notes: "Use Crocin 120mg/5ml syrup; based on weight",
      },
      {
        ageGroup: "Child 1-5 years",
        dose: "120-250mg",
        frequency: "Every 4-6 hours; max 4 doses/day",
        route: "Oral",
        notes: "Syrup preferred; weigh child for accuracy",
      },
      {
        ageGroup: "Child 6-12 years",
        dose: "250-500mg",
        frequency: "Every 4-6 hours; max 4 doses/day",
        route: "Oral",
        notes: "Tablet or syrup",
      },
      {
        ageGroup: "Adult (male/female)",
        dose: "500-1000mg",
        frequency: "Every 4-6 hours; max 4g/day",
        route: "Oral",
        notes: "Dolo 650 is very popular in India",
      },
      {
        ageGroup: "Elderly (60+ years)",
        dose: "500mg",
        frequency: "Every 6 hours; max 2g/day",
        route: "Oral",
        notes: "Reduce dose in elderly with liver disease",
      },
      {
        ageGroup: "Pregnant women",
        dose: "500mg",
        frequency: "Every 6 hours; use minimum necessary",
        route: "Oral",
        notes: "Only safe analgesic in pregnancy; still use minimum dose",
      },
    ],
    warnings: [
      "Never exceed 4g/day in adults (liver damage)",
      "Avoid in liver disease",
      "NEVER give to neonates without prescription",
    ],
    availability:
      "All Indian pharmacies OTC; Crocin, Dolo are most common brands",
  },
  {
    medicine: "Ibuprofen (NSAID)",
    brand: "Brufen 400mg, Combiflam (Ibuprofen+Paracetamol), Ibugesic",
    dosages: [
      {
        ageGroup: "Infant <3 months",
        dose: "NOT RECOMMENDED",
        frequency: "Not for infants",
        route: "Oral",
        notes: "",
      },
      {
        ageGroup: "Child 3-12 months",
        dose: "50mg (2.5ml of 100mg/5ml syrup)",
        frequency: "Every 8 hours with food",
        route: "Oral",
        notes: "Only with food; not for dehydration/dengue",
      },
      {
        ageGroup: "Child 1-5 years",
        dose: "100mg",
        frequency: "Every 8 hours with food",
        route: "Oral",
        notes: "Avoid in dengue and dehydration",
      },
      {
        ageGroup: "Child 6-12 years",
        dose: "200mg",
        frequency: "Every 8 hours with food",
        route: "Oral",
        notes: "With food always",
      },
      {
        ageGroup: "Adult (male)",
        dose: "400mg",
        frequency: "Every 8 hours with food; max 1200mg/day",
        route: "Oral",
        notes: "",
      },
      {
        ageGroup: "Adult (female, non-pregnant)",
        dose: "400mg",
        frequency: "Every 8 hours with food",
        route: "Oral",
        notes:
          "Avoid before or during menstrual flow if causing excess bleeding",
      },
      {
        ageGroup: "Elderly (60+ years)",
        dose: "AVOID or 200mg maximum",
        frequency: "If necessary: once daily with food",
        route: "Oral",
        notes:
          "High risk GI bleeding and kidney failure in elderly; use Paracetamol instead",
      },
      {
        ageGroup: "Pregnant women",
        dose: "CONTRAINDICATED",
        frequency: "NEVER",
        route: "N/A",
        notes: "Causes premature closure of ductus arteriosus; use Paracetamol",
      },
    ],
    warnings: [
      "NEVER in dengue — increases bleeding",
      "NEVER in pregnancy",
      "Avoid with alcohol",
      "Avoid in kidney disease, peptic ulcer",
      "Always with food",
    ],
    availability:
      "OTC at all Indian pharmacies; Brufen and Combiflam are most common",
  },
  {
    medicine: "Cetirizine (Antihistamine)",
    brand: "Alerid, Zyrtec, Cetcip 10mg",
    dosages: [
      {
        ageGroup: "Child under 2 years",
        dose: "NOT RECOMMENDED under 2 years",
        frequency: "Doctor only",
        route: "Oral",
        notes: "",
      },
      {
        ageGroup: "Child 2-5 years",
        dose: "2.5mg (2.5ml of Alerid syrup)",
        frequency: "Once daily at bedtime",
        route: "Oral",
        notes: "Alerid-DS 2.5mg/5ml syrup",
      },
      {
        ageGroup: "Child 6-11 years",
        dose: "5mg",
        frequency: "Once daily at bedtime",
        route: "Oral",
        notes: "Half tablet or 5ml syrup",
      },
      {
        ageGroup: "Adult (male/female)",
        dose: "10mg",
        frequency: "Once daily at bedtime",
        route: "Oral",
        notes: "Causes mild drowsiness; avoid driving",
      },
      {
        ageGroup: "Elderly (60+ years)",
        dose: "5mg",
        frequency: "Once daily",
        route: "Oral",
        notes: "Lower dose as drowsiness worse in elderly",
      },
      {
        ageGroup: "Pregnant women",
        dose: "10mg if necessary",
        frequency: "Once daily",
        route: "Oral",
        notes: "Relatively safe; use only if benefits outweigh risks",
      },
    ],
    warnings: [
      "Causes drowsiness — avoid driving",
      "Interaction with alcohol and sedatives",
    ],
    availability:
      "OTC at all Indian pharmacies; Alerid is most common AP brand",
  },
  {
    medicine: "ORS (Oral Rehydration Solution)",
    brand: "Electral, Jeevan Jal, Nandrol ORS (WHO formula)",
    dosages: [
      {
        ageGroup: "Infant 0-12 months",
        dose: "50-100ml/kg over 3-4 hours",
        frequency: "After each loose stool: 50-100ml",
        route: "Oral",
        notes: "Spoon-feed if refuses cup; no bottles",
      },
      {
        ageGroup: "Child 1-5 years",
        dose: "100ml/kg over 3-4 hours for moderate dehydration",
        frequency: "After each loose stool: 100-200ml",
        route: "Oral",
        notes: "Plus Zinc 20mg daily 14 days",
      },
      {
        ageGroup: "Child 6-12 years",
        dose: "100ml/kg over 4 hours",
        frequency: "After each stool: 200ml",
        route: "Oral",
        notes: "",
      },
      {
        ageGroup: "Adult (male/female)",
        dose: "200-400ml after each loose stool",
        frequency: "Continuously",
        route: "Oral",
        notes: "Total 2-4L/day in cholera",
      },
      {
        ageGroup: "Elderly (60+ years)",
        dose: "200-300ml after each loose stool",
        frequency: "Continuously, sip slowly",
        route: "Oral",
        notes: "Monitor for signs of fluid overload in heart failure patients",
      },
      {
        ageGroup: "Pregnant women",
        dose: "200-400ml after each loose stool",
        frequency: "Continuously",
        route: "Oral",
        notes: "Essential in pregnancy; dehydration increases preterm risk",
      },
    ],
    warnings: [
      "Do NOT give glucose water instead — ORS has specific electrolyte ratio",
      "Do NOT use sports drinks (Gatorade) as substitute in infants",
    ],
    availability:
      "FREE at all AP PHCs; available at all chemists; distributed free during floods/epidemics",
  },
  {
    medicine: "Betadine Solution (Povidone-Iodine)",
    brand: "Betadine 5% solution, Wokadine",
    dosages: [
      {
        ageGroup: "All ages (wound cleaning)",
        dose: "Apply to wound EDGES",
        frequency: "Once when cleaning wound",
        route: "Topical",
        notes:
          "Dilute 1:10 with water for wound irrigation; do NOT use full strength inside wound",
      },
      {
        ageGroup: "Newborn cord care",
        dose: "NOT RECOMMENDED for cord care — increases iodine absorption",
        frequency: "N/A",
        route: "N/A",
        notes: "Use chlorhexidine for cord care in India",
      },
    ],
    warnings: [
      "Do NOT use full strength inside deep wounds",
      "Do NOT use on large area burns",
      "Can stain skin/clothing brown",
    ],
    availability:
      "Available at all Indian pharmacies; standard antiseptic in India",
  },
  {
    medicine: "Salbutamol / Albuterol (Bronchodilator)",
    brand: "Asthalin inhaler (Cipla), Ventolin",
    dosages: [
      {
        ageGroup: "Child >5 years",
        dose: "1-2 puffs",
        frequency: "Every 20 min up to 3 times in acute asthma",
        route: "Inhalation",
        notes: "Use spacer device in children for better delivery",
      },
      {
        ageGroup: "Adult (male/female)",
        dose: "2-4 puffs",
        frequency: "Every 20 min up to 3 times",
        route: "Inhalation",
        notes: "Hold breath 10 seconds after each puff",
      },
      {
        ageGroup: "Elderly (60+ years)",
        dose: "2 puffs",
        frequency: "Every 20 min up to 3 times",
        route: "Inhalation",
        notes: "Monitor heart rate — tachycardia common",
      },
    ],
    warnings: [
      "Causes tremor and rapid heart rate",
      "Silent chest with no wheeze = very severe asthma — call 108",
      "Overuse >3 times/day = uncontrolled asthma, see doctor",
    ],
    availability:
      "Available OTC at Indian pharmacies; Asthalin 100mcg inhaler ~₹80",
  },
  {
    medicine: "Zinc Tablets (20mg)",
    brand: "Zincovit, Zinkid, Z-Vit, plain zinc 20mg",
    dosages: [
      {
        ageGroup: "Under 6 months",
        dose: "10mg",
        frequency: "Once daily for 14 days with diarrhea",
        route: "Oral",
        notes: "Dissolve in ORS or breast milk",
      },
      {
        ageGroup: "Child 6 months - 5 years",
        dose: "20mg",
        frequency: "Once daily for 14 days with diarrhea",
        route: "Oral",
        notes: "Given with ORS for acute diarrhea; free from ASHA kits",
      },
      {
        ageGroup: "Child 5-12 years",
        dose: "20mg",
        frequency: "Once daily for 14 days",
        route: "Oral",
        notes: "",
      },
    ],
    warnings: [
      "Zinc does not replace ORS — both needed",
      "Excess zinc causes nausea",
    ],
    availability:
      "Free from ASHA kits during diarrhea outbreaks; also at pharmacies",
  },
  {
    medicine: "Antacid / H2 blocker",
    brand:
      "Digene (antacid gel), Gelusil, Ranitidine 150mg, Pantoprazole 40mg (Pan-D)",
    dosages: [
      {
        ageGroup: "Adult (male)",
        dose: "Pantoprazole 40mg",
        frequency: "Once daily before breakfast (for gastritis/GERD)",
        route: "Oral",
        notes: "Empty stomach; available OTC in India",
      },
      {
        ageGroup: "Adult (female)",
        dose: "Pantoprazole 40mg",
        frequency: "Once daily",
        route: "Oral",
        notes: "",
      },
      {
        ageGroup: "Elderly",
        dose: "20mg",
        frequency: "Once daily",
        route: "Oral",
        notes: "Reduce dose in elderly",
      },
      {
        ageGroup: "All ages (acute)",
        dose: "Digene/Gelusil antacid gel 2 tsps",
        frequency: "3 times daily after meals",
        route: "Oral",
        notes: "Antacids for immediate relief",
      },
    ],
    warnings: [
      "Long-term PPI use: risk of B12 deficiency and infection",
      "Not for gastric cancer symptoms: weight loss, black stools — see doctor",
    ],
    availability: "Pan-D widely available at Indian pharmacies OTC",
  },
];

// Combined export for UI consumption
export const ALL_DOSAGE_ENTRIES = COMPREHENSIVE_DOSAGE_TABLE;
