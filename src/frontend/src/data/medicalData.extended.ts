// Local-Eyes Medical Data — Extended Module
// India MOH-aligned. Infectious diseases, AP-specific conditions, and detailed pregnancy protocols.
// All medicines are available at Indian pharmacies (chemist shops).

import type { MedicalCategory, MedicalTopic } from "./medicalData";

// ---------------------------------------------------------------------------
// INFECTIOUS DISEASES — AP / India specific (40+ conditions)
// ---------------------------------------------------------------------------

export const INFECTIOUS_DISEASES: MedicalTopic[] = [
  {
    id: "dengue",
    title: "Dengue Fever",
    severity: "high",
    icon: "🦟",
    summary:
      "Aedes mosquito-borne. Sudden high fever, severe headache, rash. Endemic in AP monsoon season.",
    steps: [
      {
        step: 1,
        title: "Identify Dengue",
        desc: "Sudden onset fever >39°C, severe headache behind eyes, joint/muscle pain (breakbone fever), rash appearing on day 3-5, mild bleeding (nose, gums).",
      },
      {
        step: 2,
        title: "Rest and Fluids",
        desc: "Complete bed rest. Drink 3+ litres daily: water, ORS, coconut water, diluted fruit juices.",
      },
      {
        step: 3,
        title: "Fever Control",
        desc: "Paracetamol ONLY for fever. Never give Ibuprofen, Aspirin, or Diclofenac — increases bleeding risk.",
      },
      {
        step: 4,
        title: "Watch Warning Signs",
        desc: "Day 3-7: watch for: severe abdominal pain, persistent vomiting, bleeding under skin (petechiae), black/tar stools, difficulty breathing. Go to hospital IMMEDIATELY.",
      },
      {
        step: 5,
        title: "Hospital for Platelet Count",
        desc: "Platelet count test at 24-48 hr intervals once diagnosed. <100,000: hospital admission. <20,000: ICU.",
      },
    ],
    warnings: [
      "Warning signs of severe dengue: abdominal pain, persistent vomiting, rapid breathing, bleeding, sudden fever break with weakness",
      "AP dengue season: July-November, peak after monsoon; Vijayawada, Vizag, Guntur are high-risk zones",
      "Dengue can be fatal within 24 hours if warning signs missed",
    ],
    doNot: [
      "Do NOT give Aspirin, Ibuprofen, or Diclofenac — causes severe hemorrhage",
      "Do NOT give blood transfusion without platelet count",
      "Do NOT use mosquito coils in enclosed room with patient",
    ],
    medicines: [
      {
        ageGroup: "Adult",
        medicine: "Paracetamol 500mg (Crocin/Dolo)",
        dosage: "1g",
        frequency: "Every 6 hours for fever >38.5°C",
        note: "Maximum 4g per day. Only safe analgesic in dengue.",
      },
      {
        ageGroup: "Child 6-12 yrs",
        medicine: "Paracetamol 250mg syrup (Crocin)",
        dosage: "10-15 mg/kg",
        frequency: "Every 6 hours",
        note: "Max 4 doses daily",
      },
      {
        ageGroup: "Adult",
        medicine: "ORS (Electral/Jeevan Jal)",
        dosage: "1 sachet in 1 litre water",
        frequency: "Sip 200 ml every hour",
        note: "Prevents dengue shock syndrome",
      },
    ],
    extraInfo: [
      {
        label: "Dengue Hemorrhagic Fever",
        value:
          "Severe form with bleeding, organ damage, and shock. Mortality 5-20% without treatment.",
      },
      {
        label: "NS1 Antigen Test",
        value:
          "Early diagnosis test available at AP Labs, Dr Lal Pathlabs from Day 1 of fever.",
      },
      {
        label: "AP IDSP",
        value:
          "AP Integrated Disease Surveillance Project tracks dengue outbreaks; district IDSP office: report cluster cases",
      },
    ],
  },
  {
    id: "malaria",
    title: "Malaria",
    severity: "high",
    icon: "🦠",
    summary:
      "Plasmodium falciparum malaria in AP is serious. Fever with chills, sweating in cycles. Seek blood test immediately.",
    steps: [
      {
        step: 1,
        title: "Identify Malaria",
        desc: "Classic: fever with rigors/shaking chills, then sweating. Cycle: 48 hrs (P.vivax) or 72 hrs (P.falciparum). Also: headache, muscle pain, nausea.",
      },
      {
        step: 2,
        title: "Rapid Diagnostic Test (RDT)",
        desc: "Request RDT at any AP PHC or CHC — result in 15 min. Or ASHA worker has RDT kit in villages.",
      },
      {
        step: 3,
        title: "Seek Treatment Immediately",
        desc: "Do NOT self-treat. Prescription artemisinin-based combination therapy (ACT) required. Free at all govt health facilities.",
      },
      {
        step: 4,
        title: "Severe Malaria",
        desc: "Symptoms of severe P.falciparum: confusion, seizures, extreme weakness, jaundice, dark brown/black urine = cerebral or complicated malaria = ICU emergency.",
      },
      {
        step: 5,
        title: "Fluid Intake",
        desc: "During fever: ORS, coconut water, plenty of fluids. Prevent dehydration.",
      },
    ],
    warnings: [
      "P.falciparum malaria in AP tribal areas (Visakhapatnam Agency, East Godavari) = medical emergency",
      "Cerebral malaria: confusion + fever = call 108 immediately",
      "Dark urine (blackwater fever) = severe complication — hospital ICU",
    ],
    doNot: [
      "Do NOT take Chloroquine without testing — widespread resistance in AP",
      "Do NOT give Ibuprofen or Aspirin in malaria (dengue co-infection possible)",
    ],
    medicines: [
      {
        ageGroup: "Adult",
        medicine: "Artemether + Lumefantrine (Falcigo/Coartem)",
        dosage: "4 tablets twice daily for 3 days",
        frequency: "On days 0, 1, 2",
        note: "First-line for P.falciparum in AP; available FREE at govt facilities",
      },
      {
        ageGroup: "Adult",
        medicine: "Chloroquine 500mg (as phosphate)",
        dosage: "Day 1: 10mg/kg; Day 2-3: 5mg/kg",
        frequency: "Per WHO protocol",
        note: "For P.vivax ONLY; resistance in falciparum",
      },
      {
        ageGroup: "Adult",
        medicine: "Paracetamol 500mg",
        dosage: "1g",
        frequency: "Every 6 hours during fever",
        note: "Symptom relief only",
      },
    ],
    extraInfo: [
      {
        label: "AP Malaria Districts",
        value:
          "Highest burden: Visakhapatnam Agency, East Godavari, Srikakulam tribal areas",
      },
      {
        label: "Prevention",
        value:
          "Insecticide-treated bed nets (LLIN) distributed free by AP Health Dept; deltamethrin spray for rooms",
      },
      {
        label: "Primaquine",
        value:
          "Must be given with vivax malaria treatment (for radical cure); check G6PD status first",
      },
    ],
  },
  {
    id: "cholera",
    title: "Cholera",
    severity: "critical",
    icon: "💧",
    summary:
      "Severe watery diarrhea after flood or contaminated water. Rapid dehydration. ORS life-saving. Hospital for severe cases.",
    steps: [
      {
        step: 1,
        title: "Identify Cholera",
        desc: "Sudden onset profuse watery diarrhea (rice-water stools), vomiting, rapid dehydration. No fever initially. Associated with flood water or contaminated well.",
      },
      {
        step: 2,
        title: "Start ORS Immediately",
        desc: "Give ORS aggressively: 200-400 ml after EVERY loose stool in adults. Children: 75-150ml after each stool. This prevents death.",
      },
      {
        step: 3,
        title: "Home ORS Recipe",
        desc: "If packets unavailable: 6 level teaspoons sugar + 1/2 teaspoon salt + 1 litre clean boiled water. Mix and give frequently.",
      },
      {
        step: 4,
        title: "Zinc for Children",
        desc: "Give Zinc 20mg tablet daily for 10-14 days alongside ORS for children under 5.",
      },
      {
        step: 5,
        title: "Hospital Threshold",
        desc: "Sunken eyes, no skin turgor (skin pinch stays up), unable to drink: IV fluids needed — go to hospital.",
      },
    ],
    warnings: [
      "Cholera kills through DEHYDRATION — ORS started within 1 hour of first stool saves lives",
      "AP cholera outbreaks: post-cyclone and post-flood in delta districts; 2009, 2017, 2020 outbreaks",
      "Infected person's stool highly contagious — strict hand hygiene; disinfect toilet",
    ],
    medicines: [
      {
        ageGroup: "Adult",
        medicine: "ORS (WHO formula) — Electral/Jeevan Jal",
        dosage: "200-400ml after each loose stool",
        frequency: "Continuously until diarrhea stops",
        note: "Most important treatment",
      },
      {
        ageGroup: "Child under 5",
        medicine: "ORS + Zinc 20mg tablet",
        dosage: "Full ORS protocol + Zinc 20mg",
        frequency: "Zinc: once daily for 14 days",
        note: "Zinc from ASHA kit or PHC",
      },
      {
        ageGroup: "Adult (confirmed cholera)",
        medicine: "Doxycycline 300mg (single dose)",
        dosage: "300mg once",
        frequency: "Single dose antibiotic reduces duration",
        note: "Antibiotic secondary to ORS; not for children <8 yrs",
      },
    ],
    extraInfo: [
      {
        label: "Dehydration Assessment",
        value:
          "Mild: thirsty, alert. Moderate: sunken eyes, dry mouth, pinch test slow. Severe: very sunken, cannot drink, collapsed = IV only",
      },
      {
        label: "AP post-flood protocol",
        value:
          "All AP PHCs activate cholera treatment posts after floods; free ORS and zinc available",
      },
    ],
  },
  {
    id: "leptospirosis",
    title: "Leptospirosis",
    severity: "high",
    icon: "💀",
    summary:
      "Post-flood bacterial infection from rat/animal urine in flood water. AP monsoon risk. High fever + muscle pain + jaundice.",
    steps: [
      {
        step: 1,
        title: "Identify Leptospirosis",
        desc: "Onset 2-30 days after flood water contact: sudden high fever, severe muscle aches (calf muscles especially), headache, red eyes (conjunctival suffusion), jaundice in severe cases.",
      },
      {
        step: 2,
        title: "Critical — Do NOT dismiss as flu",
        desc: "Without treatment: can cause liver failure (Weil's disease), kidney failure, bleeding, and death within 1-2 weeks.",
      },
      {
        step: 3,
        title: "Seek Medical Care Immediately",
        desc: "Report flood water contact history to doctor. Simple blood test confirms diagnosis.",
      },
      {
        step: 4,
        title: "Hospital Admission",
        desc: "All suspected leptospirosis cases should be admitted for IV Penicillin/Doxycycline and organ monitoring.",
      },
    ],
    warnings: [
      "AP delta districts: Weil's disease (severe leptospirosis) mortality 10-40% if untreated",
      "Walking barefoot in flood water is highest risk; wear rubber boots after floods",
      "AP post-Krishna/Godavari floods: leptospirosis is always a concern",
    ],
    doNot: [
      "Do NOT dismiss high fever after flood exposure as 'simple viral fever'",
      "Do NOT walk barefoot in flood water — rat urine contamination is invisible",
    ],
    medicines: [
      {
        ageGroup: "Adult",
        medicine: "Doxycycline 100mg",
        dosage: "100mg",
        frequency: "Twice daily for 7 days",
        note: "First choice for mild leptospirosis; start within first 5 days",
      },
      {
        ageGroup: "Adult (severe)",
        medicine: "Benzylpenicillin IV (hospital only)",
        dosage: "1.5 MU IV every 6 hours",
        frequency: "7 days IV",
        note: "Severe Weil's disease: hospital ICU",
      },
      {
        ageGroup: "Prevention",
        medicine: "Doxycycline 200mg weekly (prophylaxis)",
        dosage: "200mg",
        frequency: "Once weekly during flood exposure",
        note: "AP Health Dept protocol for rescue workers in flood zones",
      },
    ],
    extraInfo: [
      {
        label: "AP Burden",
        value:
          "Krishna, Guntur, East Godavari, West Godavari: highest leptospirosis burden in AP post-monsoon",
      },
      {
        label: "Prevention",
        value:
          "Rubber boots + gloves + washing after flood water contact; rodent control in grain storage",
      },
    ],
  },
  {
    id: "typhoid",
    title: "Typhoid Fever",
    severity: "high",
    icon: "🌡️",
    summary:
      "Contaminated water/food. Stepwise rising fever 1 week. Constipation early, then diarrhea. Antibiotic treatment essential.",
    steps: [
      {
        step: 1,
        title: "Identify Typhoid",
        desc: "Week 1: fever rising gradually each day (stepladder pattern), headache, constipation. Week 2: continuous high fever, rose spots on chest, diarrhea may start. Week 3+: complications possible.",
      },
      {
        step: 2,
        title: "Blood Test",
        desc: "Widal test (available at all AP labs, ~₹200); blood culture most accurate but takes 5-7 days. Widal positive from Week 2.",
      },
      {
        step: 3,
        title: "Complete Antibiotic Course",
        desc: "14-day course is essential. Stopping early causes relapse and drug resistance.",
      },
      {
        step: 4,
        title: "Nutrition",
        desc: "Soft bland foods: rice, curd, dal water, khichdi. No spicy/oily food. Adequate hydration.",
      },
      {
        step: 5,
        title: "Isolation",
        desc: "Strict handwashing. Separate plates/cups. No cooking for others during illness.",
      },
    ],
    warnings: [
      "Intestinal perforation (sudden severe abdominal pain after 3+ weeks): surgical emergency",
      "Multi-drug resistant typhoid in AP — always get antibiotic sensitivity testing",
      "AP typhoid season: monsoon and post-monsoon (June-November)",
    ],
    medicines: [
      {
        ageGroup: "Adult",
        medicine: "Cefixime 400mg (Zifi/Cefix)",
        dosage: "200mg",
        frequency: "Twice daily for 14 days",
        note: "First line for uncomplicated typhoid in AP (drug resistance pattern)",
      },
      {
        ageGroup: "Child",
        medicine: "Cefixime syrup 100mg/5ml",
        dosage: "8 mg/kg/day",
        frequency: "In 2 divided doses for 14 days",
        note: "Available at all chemists",
      },
      {
        ageGroup: "Adult (alternative)",
        medicine: "Azithromycin 1g (Azithral)",
        dosage: "500mg daily",
        frequency: "For 7 days",
        note: "For uncomplicated typhoid",
      },
    ],
    extraInfo: [
      {
        label: "Vaccination",
        value:
          "Typbar-TCV typhoid conjugate vaccine: single IM dose for >6 months age; available at AP immunization centers",
      },
      {
        label: "Widal Interpretation",
        value:
          "O antigen >1:160, H antigen >1:160 = positive; interpret with clinical picture",
      },
    ],
  },
  {
    id: "rabies",
    title: "Rabies (Animal Bite)",
    severity: "critical",
    icon: "🐶",
    summary:
      "Dog/monkey/bat bites in AP. Immediate wound washing for 15 min. Vaccination (PEP) starts within 24 hours. Rabies is 100% fatal once symptoms appear.",
    steps: [
      {
        step: 1,
        title: "Wash Immediately",
        desc: "WASH WOUND with soap and running water for MINIMUM 15 minutes. This is the most important first step — removes virus from wound.",
      },
      {
        step: 2,
        title: "Antiseptic",
        desc: "Apply Betadine (Povidone-Iodine) to wound generously after washing.",
      },
      {
        step: 3,
        title: "Go to Hospital Within 24 Hours",
        desc: "Post-Exposure Prophylaxis (PEP) vaccine must start within 24 hours. Free at all AP Govt Hospitals and anti-rabies clinics.",
      },
      {
        step: 4,
        title: "PEP Schedule",
        desc: "5 doses: Day 0, 3, 7, 14, 28. All 5 doses MUST be completed. If animal confirmed well after 10 days: 3rd dose onwards can be stopped.",
      },
      {
        step: 5,
        title: "RIG for High-Risk Bites",
        desc: "Head/neck/hand bites, multiple bites: Rabies Immunoglobulin (RIG) injection into wound site on Day 0.",
      },
    ],
    warnings: [
      "Once rabies symptoms appear: 100% fatal — no treatment exists for rabies encephalitis",
      "AP stray dog density: India has 35 million stray dogs; AP is high-risk state",
      "Monkey bites in Tirupati, Araku, and forest areas are common",
    ],
    doNot: [
      "Do NOT suture (stitch) the bite wound immediately — traps virus",
      "Do NOT apply chilli, lime, or traditional remedies to bite — delays real treatment",
      "Do NOT skip any vaccine dose in the PEP schedule",
    ],
    medicines: [
      {
        ageGroup: "All ages",
        medicine: "Purified Chick Embryo Cell (PCEC) Rabies Vaccine",
        dosage: "1 ml IM in deltoid",
        frequency: "Days 0, 3, 7, 14, 28 — 5 doses total",
        note: "FREE at all AP Govt hospitals and anti-rabies clinics",
      },
      {
        ageGroup: "High-risk bites",
        medicine: "Human Rabies Immunoglobulin (RIG) 40 IU/kg",
        dosage: "Infiltrate wound + remaining IM",
        frequency: "Day 0 only — once",
        note: "Available at District Hospitals; may need to travel",
      },
    ],
    extraInfo: [
      {
        label: "AP Anti-Rabies Clinics",
        value:
          "Available at King George Hospital Vizag, GGH Vijayawada, RIMS Kadapa, SVIMS Tirupati",
      },
      {
        label: "Cat bites",
        value: "Treat same as dog bites — PEP protocol applies",
      },
    ],
  },
  {
    id: "tetanus",
    title: "Tetanus (Lockjaw)",
    severity: "critical",
    icon: "🦠",
    summary:
      "Puncture wounds, rusty nail injuries, soil-contaminated wounds. Vaccination prevents it. Tetanus toxoid in 6 hours.",
    steps: [
      {
        step: 1,
        title: "Clean Wound Immediately",
        desc: "Wound washing with running water + soap 15 min. Remove visible soil/debris. Apply Betadine.",
      },
      {
        step: 2,
        title: "Tetanus Toxoid (TT) Injection",
        desc: "All wounds with soil/rust/animal bite: TT injection within 6 hours. Free at all AP PHCs and hospitals.",
      },
      {
        step: 3,
        title: "TIG for High-Risk Wounds",
        desc: "Deep puncture/heavily contaminated wound + unknown vaccination history: Tetanus Immunoglobulin (TIG) 500 IU IM at different site from TT.",
      },
      {
        step: 4,
        title: "Symptom Recognition",
        desc: "Tetanus symptoms appear 3-21 days: jaw stiffness, difficulty opening mouth, muscle spasms. ANY jaw stiffness after wound = EMERGENCY.",
      },
    ],
    warnings: [
      "Tetanus once established: ICU, ventilator, months of treatment; mortality 25-50%",
      "Agricultural workers in AP: high risk from field injuries and rusty tools",
      "Ensure all family members have TT vaccination (DPT + booster every 10 years)",
    ],
    medicines: [
      {
        ageGroup: "All ages (prevention)",
        medicine: "Tetanus Toxoid (TT) injection 0.5ml",
        dosage: "0.5ml IM in deltoid",
        frequency:
          "Single dose within 6 hrs of wound; booster if last TT >10 years",
        note: "FREE at all AP PHCs; also DPT vaccine for children",
      },
      {
        ageGroup: "High risk wounds",
        medicine: "Tetanus Immunoglobulin (TIG) 500 IU",
        dosage: "500 IU IM",
        frequency: "Single dose (passive immunity)",
        note: "At different injection site from TT",
      },
    ],
    extraInfo: [
      {
        label: "Wound classification",
        value:
          "Clean wounds: TT if >10 yrs since last. Dirty wounds: TT regardless of history. Deep puncture: TT + TIG.",
      },
      {
        label: "Neonatal tetanus",
        value:
          "Umbilical cord infection in newborns: prevent by delivery in clean conditions + TT in pregnant mother",
      },
    ],
  },
  {
    id: "japanese_encephalitis",
    title: "Japanese Encephalitis (JE)",
    severity: "critical",
    icon: "🧠",
    summary:
      "Mosquito-borne viral brain infection. AP districts: East Godavari, West Godavari. Sudden fever + confusion + seizures.",
    steps: [
      {
        step: 1,
        title: "Identify JE",
        desc: "After mosquito bite in JE area: sudden high fever, severe headache, neck stiffness, confusion, seizures, loss of consciousness.",
      },
      {
        step: 2,
        title: "Emergency Hospital",
        desc: "JE requires ICU. Call 108 immediately. No delay acceptable.",
      },
      {
        step: 3,
        title: "Supportive Care En Route",
        desc: "Recovery position if unconscious. Control seizures: protect from injury, do NOT restrain. Keep airway open.",
      },
    ],
    warnings: [
      "JE mortality 25-40%; neurological disability in 50% of survivors",
      "AP JE districts: East Godavari, West Godavari, Krishna — paddy field areas with Culex mosquitoes",
      "JE season: July-December (monsoon and post-monsoon)",
    ],
    doNot: [
      "Do NOT attempt to treat at home — ICU ventilator support may be required",
    ],
    medicines: [
      {
        ageGroup: "All children in JE areas (prevention)",
        medicine: "JE Vaccine (JENVAC/CD-JEV)",
        dosage: "0.5ml IM",
        frequency: "2 doses: Day 0 and Day 28",
        note: "FREE under AP Universal Immunization Programme in endemic districts",
      },
    ],
    extraInfo: [
      {
        label: "AP JE surveillance",
        value:
          "AP IDSP tracks JE clusters; report any fever + brain symptoms cluster to PHC",
      },
    ],
  },
  {
    id: "covid_complications",
    title: "COVID-19 Complications",
    severity: "high",
    icon: "🦠",
    summary:
      "COVID complications: low oxygen, severe pneumonia, blood clots. Monitor SpO2. Hospital if <94%.",
    steps: [
      {
        step: 1,
        title: "Monitor Oxygen",
        desc: "Pulse oximeter: measure SpO2 (oxygen saturation). Normal >95%. Below 94%: hospital. Below 90%: ICU emergency.",
      },
      {
        step: 2,
        title: "Proning",
        desc: "Awake proning: lie FACE DOWN for 30 min-2 hrs 4 times daily. Significantly improves oxygenation in COVID pneumonia.",
      },
      {
        step: 3,
        title: "Hydration",
        desc: "Drink 3 litres water daily. Warm fluids preferred. ORS if dehydrated.",
      },
      {
        step: 4,
        title: "Seek Emergency Care",
        desc: "Call 108 if: SpO2 <94%, severe difficulty breathing, confusion, persistent chest pain or pressure, unable to drink.",
      },
    ],
    warnings: [
      "Happy hypoxia: COVID patients may have SpO2 dropping to dangerous levels without feeling breathless",
      "AP COVID second wave: April-May 2021 overwhelmed AP healthcare; monitor early signs",
    ],
    medicines: [
      {
        ageGroup: "Adult with COVID pneumonia",
        medicine: "Paracetamol 500mg (Crocin)",
        dosage: "1g",
        frequency: "Every 6 hours for fever",
        note: "Symptom management only; no antivirals self-prescribed",
      },
    ],
    extraInfo: [
      {
        label: "AP COVID Helpline",
        value: "1800-200-1166 (AP COVID helpline 24 hours)",
      },
      {
        label: "Vaccination",
        value:
          "Covaxin/Covishield available at all AP PHCs and health centers free",
      },
    ],
  },
  {
    id: "tuberculosis_exposure",
    title: "TB Exposure in Disaster Shelters",
    severity: "medium",
    icon: "🤡",
    summary:
      "TB spreads in crowded relief camps. Cough >2 weeks + blood = TB suspect. NIKSHAY POSHAN YOJANA support in India.",
    steps: [
      {
        step: 1,
        title: "Identify TB Risk",
        desc: "Any person with cough >2 weeks, especially with blood-tinged sputum, fever in evenings, night sweats, weight loss = TB suspect.",
      },
      {
        step: 2,
        title: "Isolate and Test",
        desc: "Separate coughing person in camp or shelter. Refer to ASHA/PHC for sputum test — free at all AP government facilities.",
      },
      {
        step: 3,
        title: "Treatment",
        desc: "Free TB treatment (DOTS — Directly Observed Treatment) at all AP government health facilities under Revised National TB Control Programme (RNTCP).",
      },
      {
        step: 4,
        title: "Camp Measures",
        desc: "Ventilate shelter properly. Ensure cross-flow of fresh air. Disinfect sleeping surfaces.",
      },
    ],
    warnings: [
      "Crowded relief camps after AP floods/cyclones: TB transmission risk rises significantly",
      "Drug-resistant TB (MDR-TB) exists in AP — proper testing essential before treatment",
    ],
    medicines: [
      {
        ageGroup: "All ages (prevention)",
        medicine: "BCG vaccine (at birth)",
        dosage: "0.1ml intradermal",
        frequency: "Once at birth",
        note: "BCG protects against severe childhood TB",
      },
      {
        ageGroup: "Adult (active TB)",
        medicine: "RNTCP 4-drug regimen: HRZE",
        dosage: "Per weight-based table",
        frequency: "Daily for 6 months",
        note: "FREE under National TB programme. NIKSHAY POSHAN: ₹500/month for nutrition",
      },
    ],
    extraInfo: [
      {
        label: "NIKSHAY Portal",
        value:
          "TB patients registered on NIKSHAY get ₹500/month direct bank transfer for nutrition support",
      },
      {
        label: "Sputum Test",
        value:
          "Free CBNAAT test at AP District Hospitals — results in 2 hours; detects drug resistance",
      },
    ],
  },
  {
    id: "heat_exhaustion_extended",
    title: "Severe Heat Illness (Extended Protocol)",
    severity: "critical",
    icon: "☀️",
    summary:
      "AP summer 45°C+. Progressive heat illness: cramps → exhaustion → heatstroke. Full protocol for all stages.",
    steps: [
      {
        step: 1,
        title: "Stage 1: Heat Cramps",
        desc: "Muscle spasms during/after exercise in heat. Move to shade, give ORS or salty water, gentle stretching of affected muscle. Rest minimum 3 hours.",
      },
      {
        step: 2,
        title: "Stage 2: Heat Exhaustion",
        desc: "Heavy sweating, pale moist skin, weakness, dizziness, nausea, rapid weak pulse, temperature <40°C. Cool environment + ORS 1 litre over 1 hour. Horizontal with legs raised.",
      },
      {
        step: 3,
        title: "Stage 3: Heatstroke",
        desc: "Hot DRY skin (no sweating), confusion, temperature >40°C. EMERGENCY. Cool AGGRESSIVELY while calling 108: wet sheets, ice packs to neck/armpits/groin, fan continuously.",
      },
      {
        step: 4,
        title: "Cooling Techniques (Priority)",
        desc: "Ice bath most effective if available. Next: misting with fan. Next: wet sheets + fan. Ice packs at armpits, groin, and neck (pulse points) simultaneously.",
      },
      {
        step: 5,
        title: "Stop Cooling",
        desc: "Stop cooling when rectal temperature reaches 39°C (if thermometer available) to prevent overcooling. Hospital admission mandatory.",
      },
    ],
    warnings: [
      "Heatstroke target temperature >40°C: every minute of delay increases brain damage",
      "Exertional heatstroke (young healthy person in exercise): faster and more dangerous than classical",
      "AP state employees, construction workers, APSWREIS hostels: highest risk groups",
    ],
    medicines: [
      {
        ageGroup: "Adult (heat exhaustion)",
        medicine: "ORS (Electral)",
        dosage: "1 litre over 60 min",
        frequency: "Continue until urine is pale yellow",
        note: "Do NOT give to unconscious person",
      },
      {
        ageGroup: "Child (heat exhaustion)",
        medicine: "ORS",
        dosage: "20ml/kg over 4 hours",
        frequency: "Sip continuously",
        note: "Cetirizine not needed; cooling is treatment",
      },
    ],
    extraInfo: [
      {
        label: "AP Heatwave Protocol",
        value:
          "AP government: cooling centers open in all districts when temperature exceeds 43°C",
      },
      {
        label: "NDMA Guidelines",
        value:
          "Avoid outdoor work 12 pm-3 pm during heat advisories; drink water even before feeling thirsty",
      },
    ],
  },
  {
    id: "dehydration_children",
    title: "Dehydration in Children (ORS Protocol)",
    severity: "high",
    icon: "💧",
    summary:
      "Children dehydrate fast in AP heat. ORS is life-saving. Assess with AVPU, skin turgor, and fontanelle.",
    steps: [
      {
        step: 1,
        title: "Assess Dehydration",
        desc: "Mild: thirsty, alert. Moderate: sunken eyes, dry mouth, skin pinch slow. Severe: very sunken, weak/drowsy, no tears, unable to drink.",
      },
      {
        step: 2,
        title: "ORS for Mild",
        desc: "Mild dehydration: give 50-100ml ORS per kg body weight over 3-4 hours. 10 kg child: 500-1000ml ORS in 4 hours.",
      },
      {
        step: 3,
        title: "ORS for Moderate",
        desc: "Moderate: 100 ml/kg ORS over 3 hours, then reassess. Spoon-feed if child refuses cup.",
      },
      {
        step: 4,
        title: "Zinc Supplement",
        desc: "All children with diarrhea + dehydration: Zinc 20mg daily for 14 days. Reduces future diarrhea episodes.",
      },
      {
        step: 5,
        title: "Hospital for Severe",
        desc: "Severe dehydration or child unable to drink: hospital immediately for IV Ringer's Lactate 100ml/kg over 3 hours.",
      },
    ],
    warnings: [
      "Severe dehydration in child under 5 = medical emergency; child can die within hours",
      "AP summer: children can become severely dehydrated in 4-6 hours of diarrhea+vomiting",
      "Never give Loperamide (Imodium) to children — dangerous",
    ],
    medicines: [
      {
        ageGroup: "Under 5 years",
        medicine: "ORS (WHO formula) + Zinc 20mg",
        dosage: "ORS: 75ml/kg in 4 hrs (moderate dehydration)",
        frequency: "Continuously until hydrated",
        note: "Zinc 20mg daily for 14 days",
      },
      {
        ageGroup: "5-12 years",
        medicine: "ORS alone sufficient for mild-moderate",
        dosage: "100ml/kg over 4 hrs",
        frequency: "Until rehydrated",
        note: "Zinc 20mg daily for 14 days",
      },
    ],
    extraInfo: [
      {
        label: "ORS brands",
        value:
          "Electral, Nandrol, Jeevan Jal — all available at AP PHCs free during diarrhea outbreaks",
      },
      {
        label: "Homemade ORS",
        value:
          "6 teaspoons sugar + 1/2 teaspoon salt + 1 litre boiled water. Effective emergency alternative.",
      },
    ],
  },
  {
    id: "malnutrition_children_ap",
    title: "Malnutrition in Children (AP Rural)",
    severity: "high",
    icon: "🧒",
    summary:
      "SAM (Severe Acute Malnutrition) common in AP tribal areas. MUAC <11.5cm = emergency. NRC admission.",
    steps: [
      {
        step: 1,
        title: "Assess with MUAC",
        desc: "Mid-Upper Arm Circumference tape (MUAC): <11.5cm (red) = SAM; 11.5-12.5cm (yellow) = MAM; >12.5cm (green) = normal. ASHA workers carry MUAC tapes.",
      },
      {
        step: 2,
        title: "Danger Signs in Malnourished Child",
        desc: "Bilateral pitting edema (kwashiorkor), severe muscle wasting, inability to eat, or any medical complication = NRC admission.",
      },
      {
        step: 3,
        title: "Ready-to-Use Therapeutic Food (RUTF)",
        desc: "SAM children: RUTF (Plumpy'Nut or equivalent) given by ASHA workers or NRC — 50 kcal/kg/day. Do not dilute.",
      },
      {
        step: 4,
        title: "Emergency F-75 Feed",
        desc: "NRC provides F-75 starter formula for stabilization, then F-100 for catch-up growth. Hospital admission for SAM with complications.",
      },
    ],
    warnings: [
      "AP tribal belt: Vizag Agency, East Godavari Agency, Srikakulam — SAM prevalence >15%",
      "Measles, diarrhea, or infection in SAM child = critical emergency",
    ],
    medicines: [
      {
        ageGroup: "SAM child",
        medicine: "Ready-to-Use Therapeutic Food (RUTF)",
        dosage: "Per weight chart",
        frequency: "Distributed by ASHA/Anganwadi; 5-6 times daily",
        note: "NRC: Nutrition Rehabilitation Centre at AP District Hospitals provides free admission and treatment",
      },
      {
        ageGroup: "MAM child",
        medicine: "Supplementary nutrition (ICDS)",
        dosage: "Extra protein + calorie supplement",
        frequency: "Daily through Anganwadi centre",
        note: "AP ICDS provides hot cooked meals at Anganwadi",
      },
    ],
    extraInfo: [
      {
        label: "NRC locations AP",
        value:
          "NRC at District Hospitals: Vizag, Rajam, Kakinada, Eluru, Vijayawada, Nellore, Kurnool, Anantapur, Kadapa, Tirupati",
      },
      {
        label: "ICDS AP",
        value:
          "AP Integrated Child Development Services: Anganwadi centers provide daily nutrition, immunization, and health monitoring for under-6 children",
      },
    ],
  },
  {
    id: "snakebite_child_dosage",
    title: "Child Snakebite — Dosage Protocol",
    severity: "critical",
    icon: "🐍",
    summary:
      "Child snakebite in AP — same protocol as adult but antivenom dosing differs. Time to hospital is critical.",
    steps: [
      {
        step: 1,
        title: "Identical to Adult Protocol",
        desc: "Immobilize, keep bitten limb below heart, remove tight items, walk calmly to hospital. Do NOT apply tourniquet, cut, or suck.",
      },
      {
        step: 2,
        title: "Faster Progression",
        desc: "Children have smaller blood volume — venom effects appear faster and are more severe. Do NOT wait for symptoms.",
      },
      {
        step: 3,
        title: "Antivenom Dosing",
        desc: "CRITICAL: Antivenom (ASV) dose for children = SAME as adult. 10 vials for neurotoxic signs, 20 vials for haemotoxic signs. Do NOT reduce for weight.",
      },
      {
        step: 4,
        title: "Monitor",
        desc: "Monitor for anaphylaxis to antivenom: hives, wheezing within 1 hour of ASV. Adrenaline 0.01mg/kg IM if reaction.",
      },
    ],
    warnings: [
      "Children play on ground and in fields — highest snakebite risk group in AP",
      "Most AP snakebite deaths in children occur from delay in reaching hospital",
    ],
    medicines: [
      {
        ageGroup: "Child (all sizes)",
        medicine: "Polyvalent Anti-Snake Venom (PASV)",
        dosage: "SAME AS ADULT: 10 vials IV for neurotoxic, 20 for haemotoxic",
        frequency: "Repeat at 6 hrs if no improvement",
        note: "FREE at all AP Govt Hospitals; do NOT reduce dose for children",
      },
      {
        ageGroup: "Child (pain)",
        medicine: "Paracetamol syrup 120mg/5ml",
        dosage: "10-15 mg/kg",
        frequency: "Every 6 hours",
        note: "NO Ibuprofen or Aspirin for snakebite",
      },
    ],
    extraInfo: [
      {
        label: "ASV reaction",
        value:
          "Adrenaline 0.01mg/kg IM + Hydrocortisone 5mg/kg IV pre-medication given in govt hospitals before ASV",
      },
    ],
  },
  {
    id: "preterm_labor",
    title: "Preterm Labor (Before 37 Weeks)",
    severity: "critical",
    icon: "🤱",
    summary:
      "Regular contractions before 37 weeks. Hospital immediately. Tocolysis and steroids may save baby.",
    steps: [
      {
        step: 1,
        title: "Identify Preterm Labor",
        desc: "Regular contractions before 37 weeks, possible water breaking, low back pain coming and going, pelvic pressure. Any of these before 37 weeks = call 102 immediately.",
      },
      {
        step: 2,
        title: "Lateral Position",
        desc: "Lie on left side to improve blood flow to baby. Avoid upright position which can accelerate labor.",
      },
      {
        step: 3,
        title: "Do NOT Panic",
        desc: "Reassure mother. Hospital can often stop premature labor if caught early with tocolytic drugs.",
      },
      {
        step: 4,
        title: "If Birth is Imminent",
        desc: "Follow emergency delivery protocol. Premature baby: extra warmth critical. Immediate skin-to-skin. Rush to hospital.",
      },
    ],
    warnings: [
      "Premature baby under 28 weeks: needs NICU immediately",
      "28-34 weeks: hospital can give steroids to mature baby's lungs in 24-48 hours if delivery can be delayed",
    ],
    medicines: [
      {
        ageGroup: "Pregnant woman (hospital only)",
        medicine: "Betamethasone IM (lung maturation)",
        dosage: "12mg IM",
        frequency: "Two doses 24 hours apart (if delivery before 34 weeks)",
        note: "Hospital administration only; dramatically reduces premature baby death",
      },
      {
        ageGroup: "Premature neonate (hospital only)",
        medicine: "Surfactant therapy",
        dosage: "Per weight",
        frequency: "Single dose in NICU",
        note: "Available at AP Medical College NICU facilities",
      },
    ],
    extraInfo: [
      {
        label: "AP 102 JSY ambulance",
        value:
          "Free transport for premature labor to hospital under AP JSY (Janani Suraksha Yojana)",
      },
      {
        label: "NRC/SNCU AP",
        value:
          "Sick Newborn Care Units at AP District Hospitals for premature and sick neonates",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// EXTENDED MEDICAL CATEGORIES for UI integration
// ---------------------------------------------------------------------------

export const EXTENDED_MEDICAL_CATEGORIES: MedicalCategory[] = [
  {
    id: "infectious",
    label: "Infectious Diseases",
    icon: "🤡",
    color: "oklch(0.62 0.18 30)",
    topics: INFECTIOUS_DISEASES,
  },
];

// ---------------------------------------------------------------------------
// EXTENDED KB ENTRIES for AI chatbot — additional scenarios
// ---------------------------------------------------------------------------
export interface ExtendedKBEntry {
  keywords: string[];
  title: string;
  response: string;
}

export const EXTENDED_MEDICAL_KB_ENTRIES: ExtendedKBEntry[] = [
  {
    keywords: [
      "dengue",
      "dengue fever",
      "dengue symptoms",
      "platelet",
      "breakbone",
      "hemorrhagic",
    ],
    title: "Dengue Fever Protocol",
    response:
      "DENGUE FEVER: Give Paracetamol only — NEVER Ibuprofen or Aspirin. Start ORS immediately. Monitor platelets daily from day 3. Hospital if: severe abdominal pain, persistent vomiting, bleeding, or sudden fever break with weakness. Free test at AP PHC.",
  },
  {
    keywords: [
      "malaria",
      "paludism",
      "falciparum",
      "vivax",
      "chills",
      "rigors",
      "malaria chills",
    ],
    title: "Malaria Emergency",
    response:
      "MALARIA: Sudden fever with shaking chills and sweating in cycles. Seek blood test (RDT) at AP PHC immediately — free. Do NOT self-treat with Chloroquine (resistance). AP tribal areas: always suspect P.falciparum. Artemisinin treatment free at government hospitals.",
  },
  {
    keywords: [
      "cholera",
      "rice water stool",
      "watery diarrhea",
      "diarrhea flood",
      "acute diarrhea",
      "gastroenteritis",
    ],
    title: "Cholera / Severe Diarrhea",
    response:
      "CHOLERA: Start ORS immediately — every minute matters. 200-400ml after every loose stool. Homemade ORS: 6 tsp sugar + 0.5 tsp salt in 1 litre boiled water. Children: add Zinc 20mg daily. Hospital if unable to drink or extreme weakness.",
  },
  {
    keywords: [
      "leptospirosis",
      "lepto",
      "flood fever",
      "rat fever",
      "jaundice fever",
      "weil's disease",
    ],
    title: "Leptospirosis (Flood Fever)",
    response:
      "LEPTOSPIROSIS: After flood water contact with high fever + severe muscle pain (especially calves) + red eyes = hospital immediately. NOT just a flu. Can cause liver/kidney failure. Doxycycline antibiotic is treatment. Wear rubber boots in flood water.",
  },
  {
    keywords: [
      "typhoid",
      "enteric fever",
      "stepladder fever",
      "salmonella",
      "rose spots",
    ],
    title: "Typhoid Fever",
    response:
      "TYPHOID: Fever rising daily for a week + headache + constipation. Widal test at AP Lab ~₹200. Cefixime 400mg daily for 14 days (first line AP). Complete FULL course. Bland diet: khichdi, curd, dal water. Strict hygiene to avoid spreading.",
  },
  {
    keywords: [
      "dog bite",
      "cat bite",
      "monkey bite",
      "rabies",
      "animal bite",
      "stray dog",
      "pep vaccine",
    ],
    title: "Animal Bite / Rabies Prevention",
    response:
      "ANIMAL BITE: Wash wound with soap + running water for 15 FULL minutes immediately. Apply Betadine. Go to hospital within 24 hours for FREE PEP vaccine (5 doses over 28 days). Available at King George Hospital Vizag, GGH Vijayawada, SVIMS Tirupati. Do NOT stitch wound immediately.",
  },
  {
    keywords: [
      "tetanus",
      "lockjaw",
      "rusty nail",
      "puncture wound",
      "tetanus injection",
      "tt injection",
    ],
    title: "Tetanus Prevention",
    response:
      "TETANUS: Any wound with soil/rust/animal contact: Tetanus Toxoid (TT) injection within 6 hours — FREE at AP PHC. Deep puncture wound: also need Tetanus Immunoglobulin (TIG) at hospital. Jaw stiffness 3-21 days after wound = emergency 108.",
  },
  {
    keywords: [
      "jaundice",
      "yellow eyes",
      "liver failure",
      "hepatitis",
      "viral hepatitis",
    ],
    title: "Jaundice / Hepatitis",
    response:
      "JAUNDICE: Yellow skin/eyes + dark urine + pale stools. Rest and fluids for viral hepatitis A/E (common in AP). Hepatitis B: hospital for antiviral. Avoid fatty foods and alcohol. Liver function test at AP lab. If confusion or bleeding = acute liver failure emergency 108.",
  },
  {
    keywords: [
      "pneumonia",
      "chest infection",
      "respiratory infection",
      "lung infection",
      "breathing difficulty fever",
    ],
    title: "Pneumonia",
    response:
      "PNEUMONIA: Fever + productive cough + rapid breathing + chest pain. Hospital for chest X-ray and antibiotic prescription. Amoxicillin for community-acquired pneumonia. In disasters/relief camps: spread rapidly in crowded conditions. All respiratory infections with SpO2 <95% need hospital.",
  },
];
