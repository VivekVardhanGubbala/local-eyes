// Local-Eyes Survival Data — India / Andhra Pradesh focused
// 250+ scenarios across disaster types and general survival categories

// Re-export extended data modules so consuming components only need one import
export * from "./survivalData.extended";

export interface Scenario {
  id: string;
  title: string;
  description: string;
  steps: string[];
  materials: string[];
  apSpecific: string;
  urgency: "critical" | "high" | "medium" | "low";
}

export interface ScenarioCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  scenarios: Scenario[];
}

export const DISASTER_SCENARIOS: Record<string, ScenarioCategory> = {
  // NOTE: Additional scenarios added via EXTENDED_SCENARIOS in survivalData.extended.ts
  // Import from there for: stampede, industrial_accident, forest_fire, road_accident (expanded)
  // Also import EDIBLE_PLANTS_DECCAN/COASTAL/EASTERN_GHATS/WESTERN_AP, TOXIC_SPECIES,
  // SAFE_FOODS, EMERGENCY_RADIO, WATER_PURIFICATION, and ALL_EDIBLE_PLANTS from survivalData.extended.ts
  cyclone: {
    id: "cyclone",
    title: "Cyclone",
    icon: "🌀",
    description: "Bay of Bengal cyclones affecting AP coastal districts",
    scenarios: [
      {
        id: "cy1",
        title: "Pre-Cyclone Evacuation",
        description: "Evacuate coastal areas before landfall.",
        steps: [
          "Listen to All India Radio / DD for warnings",
          "Move inland ≥3 km from coast before wind >63 km/h",
          "Go to designated cyclone shelter (pucca building)",
          "Carry ID, medicines, water, food for 3 days",
          "Inform neighbors and help elderly",
        ],
        materials: [
          "Water 5L/person",
          "Dry food",
          "Torch + batteries",
          "Important documents in waterproof bag",
        ],
        apSpecific:
          "Cyclone shelters on AP coast: Vizag (GVMC), Kakinada, Machilipatnam, Nellore — marked with blue boards",
        urgency: "critical",
      },
      {
        id: "cy2",
        title: "During Cyclone Indoors",
        description: "Stay safe inside a strong building during landfall.",
        steps: [
          "Stay away from windows and glass",
          "Move to innermost room on ground floor",
          "Crouch under sturdy table if roof lifts",
          "Do NOT use lifts or go outside during eye of storm",
          "Keep mobile at 20% brightness to save battery",
        ],
        materials: ["Torch", "Whistle", "Fully charged power bank"],
        apSpecific:
          "AP cyclones: Hudhud (2014) destroyed Vizag; stay indoors 6–18 hrs after landfall",
        urgency: "critical",
      },
      {
        id: "cy3",
        title: "Shelter in Pucca Building",
        description:
          "Use a reinforced concrete building for maximum protection.",
        steps: [
          "Identify nearest multi-storey pucca building pre-disaster",
          "Go to 2nd/3rd floor if storm surge expected",
          "Seal gaps under doors with wet cloth",
          "Switch off all electrical mains",
          "Fill bathtub and buckets before power cut",
        ],
        materials: ["Wet cloth strips", "Tape for windows"],
        apSpecific:
          "AP coastal: storm surge risk in Krishna, Guntur, East Godavari, Srikakulam districts",
        urgency: "critical",
      },
      {
        id: "cy4",
        title: "Storm Surge Escape",
        description: "Escape rising seawater after cyclone landfall.",
        steps: [
          "Move to highest point — building roof or hill",
          "Do not attempt swimming in surge water (debris)",
          "Signal rescuers with bright cloth or mirror",
          "Avoid downed power lines in water",
          "Wait for official all-clear before descending",
        ],
        materials: ["Rope", "Bright colored cloth"],
        apSpecific:
          "AP surge hotspots: Bhavani Island (Vijayawada), Kakinada bay, Pulicat lagoon",
        urgency: "critical",
      },
      {
        id: "cy5",
        title: "Post-Cyclone Water Safety",
        description: "Avoid contaminated water after the storm.",
        steps: [
          "Do not drink tap water — pipes may be contaminated",
          "Boil all water for 5 minutes",
          "Use ORS sachets if diarrhea starts",
          "Avoid wading in flood water",
          "Report contaminated wells to panchayat",
        ],
        materials: [
          "ORS sachets",
          "Water purification tablets",
          "Pot for boiling",
        ],
        apSpecific:
          "After cyclone, AP Rural Water Supply Dept distributes chlorine tabs — collect from village sachivalayam",
        urgency: "high",
      },
      {
        id: "cy6",
        title: "Tree Fall & Debris Removal",
        description: "Safely clear downed trees after the storm.",
        steps: [
          "Check for power lines before touching any fallen tree",
          "Use saw/axe from uphill side of trunk",
          "Never work alone — use buddy system",
          "Wear rubber-soled shoes",
          "Call NDRF 1078 if tree blocks road",
        ],
        materials: ["Hand saw", "Axe", "Rubber gloves", "Rope"],
        apSpecific:
          "AP roads most blocked: NH 16 (coastal) and NH 65 after Bay of Bengal cyclones",
        urgency: "high",
      },
      {
        id: "cy7",
        title: "Livestock & Cattle Safety",
        description: "Protect animals during cyclone.",
        steps: [
          "Move cattle to upper floor of stable or high ground",
          "Remove tethers — let them find footing",
          "Mark animals with paint or tag for identification",
          "Provide dry fodder before storm",
          "After storm check for injuries — call veterinary helpline 1962",
        ],
        materials: ["Rope", "Paint/spray", "Dry fodder"],
        apSpecific:
          "AP Animal Husbandry Dept hotline: 1800-425-0091; cattle camps set up after Hudhud in Vizag district",
        urgency: "medium",
      },
      {
        id: "cy8",
        title: "Cyclone Early Warning Signals",
        description: "Recognize official AP cyclone alert levels.",
        steps: [
          "Yellow: be alert, check supplies",
          "Orange: restrict movement, move vulnerable people",
          "Red: evacuate immediately",
          "Tune to AIR Vijayawada 100.6 FM or Doordarshan for updates",
          "Do not spread rumours — only official sources",
        ],
        materials: ["Battery radio", "Mobile with emergency alerts enabled"],
        apSpecific:
          "AP SDMA app gives district-level alerts; IMD Vishakhapatnam is nodal centre for Bay of Bengal cyclones",
        urgency: "high",
      },
      {
        id: "cy9",
        title: "First Aid After Cyclone Injuries",
        description: "Treat flying debris injuries.",
        steps: [
          "Flush wounds with clean water 10 min",
          "Apply pressure with clean cloth",
          "Bandage firmly but not too tight",
          "Check tetanus vaccination status",
          "Evacuate severe cases to PHC/hospital",
        ],
        materials: [
          "Clean cloth/bandages",
          "Antiseptic (Dettol/Savlon)",
          "ORS",
        ],
        apSpecific:
          "AP DM hospitals: King George Hospital Vizag, GGH Kakinada, GGH Machilipatnam",
        urgency: "high",
      },
      {
        id: "cy10",
        title: "Power Line Hazards",
        description: "Avoid electrocution from downed power lines.",
        steps: [
          "Assume all downed lines are live",
          "Stay 10 m away from any fallen wire",
          "Never touch a person in contact with a wire",
          "Call APSPDCL: 1912 immediately",
          "If in car near a live wire — stay inside until help arrives",
        ],
        materials: ["None — stay back"],
        apSpecific:
          "AP Power: APSPDCL (southern) and APEPDCL (northern); call 1912 for emergencies",
        urgency: "critical",
      },
      {
        id: "cy11",
        title: "Child & Elderly Cyclone Care",
        description: "Extra precautions for vulnerable people.",
        steps: [
          "Children: keep beside adult at all times, no school/outdoor play",
          "Elderly: carry extra medicines (BP, diabetes), wheelchair/cot to upper floor",
          "Use face masks in dust after storm",
          "Watch for anxiety attacks — reassure calmly",
          "Register vulnerable family at nearest sachivalayam before cyclone season (June–Nov)",
        ],
        materials: ["Extra medicines", "Face masks", "Extra water"],
        apSpecific:
          "AP cyclone season: Oct–Dec most active; register vulnerable persons at gram sachivalayam",
        urgency: "high",
      },
    ],
  },
  flood: {
    id: "flood",
    title: "Flood",
    icon: "🌊",
    description: "Krishna, Godavari river flooding and urban flash floods",
    scenarios: [
      {
        id: "fl1",
        title: "Flash Flood Escape",
        description: "Move fast when water rises suddenly.",
        steps: [
          "Move to highest ground immediately — don't wait",
          "Do not try to walk through water >15 cm deep",
          "Abandon car if water reaches door sills",
          "Get to roof or treetop if surrounded",
          "Signal with bright cloth or mirror",
        ],
        materials: ["Rope", "Life jacket / tyre tube", "Bright cloth"],
        apSpecific:
          "AP flash flood zones: Vizag LBC canal, Vijayawada Budameru drain; Krishna floods annually at Prakasam Barrage",
        urgency: "critical",
      },
      {
        id: "fl2",
        title: "Godavari/Krishna Flood Alert",
        description: "Respond to river flood warnings.",
        steps: [
          "Follow AP flood bulletins — all 3 hours on AIR",
          "Level 1 alert: store water, food",
          "Level 2: move valuables to upper floor",
          "Level 3: evacuate immediately to relief camp",
          "Never return home until official clearance",
        ],
        materials: [
          "Battery radio",
          "Documents in plastic bag",
          "3-day ration",
        ],
        apSpecific:
          'AP Flood Info Centre: 1800-425-4440; Prakasam Barrage inflow data at "AP Water Resources" website',
        urgency: "critical",
      },
      {
        id: "fl3",
        title: "Flood Water Rescue",
        description: "Rescue a person trapped in flood water.",
        steps: [
          "Throw rope — never jump in after someone",
          "Use boat / tyre tube / plastic drum as flotation",
          "Pull person to land from upstream side",
          "Check for injury after rescue",
          "Warm person (hypothermia risk even in AP summers)",
        ],
        materials: ["Rope 10 m", "Tyre tube", "Plastic drum"],
        apSpecific:
          "NDRF 12th Battalion based at Vijayawada conducts Krishna/Godavari flood rescues",
        urgency: "critical",
      },
      {
        id: "fl4",
        title: "Floodwater Contamination",
        description: "Avoid disease from flood water.",
        steps: [
          "Never drink flood water",
          "Wash hands with soap after any contact",
          "Boil or chlorinate all water before drinking",
          "Watch for cholera/typhoid symptoms (diarrhea, fever)",
          "ORS immediately if dehydration starts",
        ],
        materials: ["Chlorine tablets", "ORS", "Soap"],
        apSpecific:
          "Leptospirosis risk in AP delta districts — avoid walking barefoot in flood water; seek immediate treatment",
        urgency: "high",
      },
      {
        id: "fl5",
        title: "Flood Relief Camp",
        description: "Get help at a government relief camp.",
        steps: [
          "Register with camp in-charge on arrival",
          "Collect ration card and food coupons",
          "Report medical needs immediately",
          "Keep children supervised at all times",
          "Report any missing persons to police/revenue officer",
        ],
        materials: ["ID documents", "Mobile phone"],
        apSpecific:
          "AP relief camps: set up at government schools by Revenue Dept; AP CM Relief Fund: 1100",
        urgency: "medium",
      },
      {
        id: "fl6",
        title: "Flood-Proof Your Home",
        description: "Protect property before floods arrive.",
        steps: [
          "Move furniture/electronics to upper floor",
          "Seal gaps with sandbags or wet cloth",
          "Switch off electricity at main breaker",
          "Note meter reading for insurance",
          "Photograph property before leaving",
        ],
        materials: ["Sandbags", "Plastic sheeting", "Rope"],
        apSpecific:
          "AP houses near Krishna delta: raise door thresholds by brick layer before monsoon (June–Sep)",
        urgency: "medium",
      },
      {
        id: "fl7",
        title: "Stranded in Flood Vehicle",
        description: "Escape a car caught in rising flood water.",
        steps: [
          "Open window immediately before water pressure builds",
          "Unbuckle seatbelts of all passengers",
          "Children go first",
          "Use headrest rod to break window if stuck",
          "Wait for car to fill slightly to equalize pressure then push door open",
        ],
        materials: ["Window breaker tool (keep in glovebox)"],
        apSpecific:
          "AP underpasses flood within minutes of heavy rain: avoid Vijayawada underpasses during rains",
        urgency: "critical",
      },
      {
        id: "fl8",
        title: "Snake Encounter After Flood",
        description: "Handle snakes displaced by floods.",
        steps: [
          "Assume all snakes post-flood are venomous",
          "Use torch before stepping anywhere",
          "Shake out shoes and clothing before wearing",
          "If bitten: immobilize limb, go to hospital immediately",
          "Do NOT cut wound or suck venom",
        ],
        materials: ["Torch", "Stick for checking"],
        apSpecific:
          "AP common post-flood snakes: Russell's viper, Indian cobra, kraits; anti-venom at Govt hospitals",
        urgency: "critical",
      },
      {
        id: "fl9",
        title: "Flood Post-Cleanup Safety",
        description: "Safely return home after floodwaters recede.",
        steps: [
          "Check structure for cracks before entering",
          "Open all windows — gas may have accumulated",
          "Wear rubber boots and gloves",
          "Pump out water slowly — too fast can destabilize foundation",
          "Discard all food exposed to flood water",
        ],
        materials: ["Rubber boots", "Gloves", "Torch", "Disinfectant"],
        apSpecific:
          "AP post-flood disinfection: ASHA worker will inspect — call PHC for bleach powder",
        urgency: "high",
      },
      {
        id: "fl10",
        title: "Flood Signaling for Rescue",
        description: "Attract rescue teams when trapped.",
        steps: [
          "Write large SOS on roof with chalk/paint",
          "Wave bright cloth from highest point",
          "Blow whistle 3 times repeatedly",
          "Flash torch at night in groups of 3",
          "Call 112 or NDRF 1078 if mobile works",
        ],
        materials: ["Bright cloth", "Whistle", "Torch"],
        apSpecific:
          "AP rescue helicopter: signal from flat open area; NDRF uses boat convoys on Godavari and Krishna",
        urgency: "critical",
      },
    ],
  },
  fire: {
    id: "fire",
    title: "Fire",
    icon: "🔥",
    description: "Building fires, forest fires, and kitchen accidents",
    scenarios: [
      {
        id: "fi1",
        title: "Building Fire Escape",
        description: "Escape a burning building safely.",
        steps: [
          'Alert everyone — shout "FIRE" loudly',
          "Crawl low under smoke to exit",
          "Touch door before opening — if hot, use alternate route",
          "Do NOT use lifts",
          "Meet at pre-agreed muster point outside",
        ],
        materials: ["Wet cloth for breathing"],
        apSpecific:
          "AP Fire: call 101; Vijayawada Fire Station: 0866-2570101; Vizag Fire: 0891-2756101",
        urgency: "critical",
      },
      {
        id: "fi2",
        title: "Kitchen LPG Fire",
        description: "Handle a gas cylinder or stove fire.",
        steps: [
          "Turn off regulator FIRST if reachable",
          "Do NOT use water on gas fire",
          "Wet blanket over burner flame to smother",
          "Open all doors and windows",
          "If cylinder is on fire — evacuate 50 m and call 101",
        ],
        materials: ["Wet blanket", "ABC dry powder extinguisher"],
        apSpecific:
          "LPG fire: call HPCL/BPCL emergency on cylinder label; AP LPG accidents peak in summer (40°C+)",
        urgency: "critical",
      },
      {
        id: "fi3",
        title: "Clothing Fire",
        description: "Stop, drop and roll if clothing catches fire.",
        steps: [
          "STOP — do not run (oxygen feeds fire)",
          "DROP to ground immediately",
          "ROLL repeatedly to smother flames",
          "Cool with water 10 minutes",
          "Cover with clean sheet — rush to hospital",
        ],
        materials: ["Water", "Clean sheet"],
        apSpecific:
          "AP saree fire risk: synthetic saree catches fire instantly from stove; use cotton when cooking",
        urgency: "critical",
      },
      {
        id: "fi4",
        title: "Forest Fire in Eastern Ghats",
        description: "Escape a forest or scrub fire.",
        steps: [
          "Move perpendicular to wind direction — not away from it",
          "Move downhill where fire spreads slower",
          "Seek rocky / bare ground — no fuel zone",
          "Cross fire line at narrow point if trapped",
          "Call Forest Dept: 1926",
        ],
        materials: ["Wet cloth for face", "Water bottle"],
        apSpecific:
          "AP Eastern Ghats forest fires: Feb–May in Visakhapatnam, East Godavari Agency areas (tribal regions)",
        urgency: "critical",
      },
      {
        id: "fi5",
        title: "Electrical Fire",
        description: "Handle fire from electrical equipment.",
        steps: [
          "Switch off main breaker FIRST",
          "Use CO2 or dry powder extinguisher — NEVER water",
          "Do NOT touch equipment with wet hands",
          "If fire spreads to wall — evacuate",
          "Call 101",
        ],
        materials: ["CO2 fire extinguisher", "Rubber gloves"],
        apSpecific:
          "AP electrical fires increase in summer due to overloaded ACs and power fluctuations; use stabilizers",
        urgency: "critical",
      },
      {
        id: "fi6",
        title: "Burn First Aid",
        description: "Treat burns on site.",
        steps: [
          "Cool burn under running water 10–20 min (NOT ice)",
          "Remove rings/watches near burn before swelling",
          "Cover loosely with clean wet cloth",
          "Do NOT burst blisters",
          "Rush to hospital if >20% body, face, hands, or joints",
        ],
        materials: [
          "Running water",
          "Clean cloth",
          "Paracetamol (Crocin) for pain",
        ],
        apSpecific:
          "Nearest burns unit in AP: KIMS Vijayawada, King George Hospital Vizag",
        urgency: "critical",
      },
      {
        id: "fi7",
        title: "Smoke Inhalation",
        description: "Treat a person who has inhaled smoke.",
        steps: [
          "Move to fresh air immediately",
          "Loosen clothing around neck",
          "Sit upright — not lying down",
          "Give water to sip",
          "Call 108 if unconscious or blue lips",
        ],
        materials: ["Fresh air", "Water"],
        apSpecific:
          "AP Ambulance 108 is free — available in all AP districts 24/7",
        urgency: "critical",
      },
      {
        id: "fi8",
        title: "Fire Extinguisher Use (PASS)",
        description: "Correct fire extinguisher technique.",
        steps: [
          "P — Pull the safety pin",
          "A — Aim at base of fire",
          "S — Squeeze the handle",
          "S — Sweep side to side",
          "Back away when fire is out; never turn your back",
        ],
        materials: ["ABC or CO2 extinguisher"],
        apSpecific:
          "AP law: all commercial buildings >250 sq m must have fire extinguisher; check expiry date annually",
        urgency: "high",
      },
      {
        id: "fi9",
        title: "Fireproofing Your Home",
        description: "Reduce fire risk in the home.",
        steps: [
          "Keep dry grass/leaves cleared 3 m from walls",
          "Store LPG cylinder upright in ventilated area",
          "Install smoke alarm near kitchen",
          "Keep bucket of sand near stove",
          "Plan 2 escape routes from each room",
        ],
        materials: ["Smoke alarm", "Sand bucket"],
        apSpecific:
          "AP thatched roof villages: smear mud plaster on walls; keep water barrel outside during harvest season",
        urgency: "medium",
      },
      {
        id: "fi10",
        title: "Vehicle Fire",
        description: "React to a car or auto catching fire.",
        steps: [
          "Stop vehicle, switch off engine, apply handbrake",
          "Get everyone out immediately",
          "Move ≥50 m away — fuel tank may explode",
          "Call 101",
          "Do NOT go back for belongings",
        ],
        materials: ["Car fire extinguisher (keep under seat)"],
        apSpecific:
          "AP vehicle fire: petrol auto-rickshaws are high risk; LPG auto: call HPCL helpline on label",
        urgency: "critical",
      },
    ],
  },
  earthquake: {
    id: "earthquake",
    title: "Earthquake",
    icon: "🏚️",
    description: "Seismic events affecting AP and surrounding regions",
    scenarios: [
      {
        id: "eq1",
        title: "Drop, Cover, Hold On",
        description: "Protect yourself during earthquake shaking.",
        steps: [
          "DROP to hands and knees immediately",
          "Get COVER under a strong desk or against interior wall",
          "HOLD ON until shaking stops",
          "Protect head and neck with arms",
          "Stay away from windows and exterior walls",
        ],
        materials: ["None needed — use body position"],
        apSpecific:
          "AP seismic zone: Zone II-III; Guntur and Nalgonda regions have moderate risk; Vizag coast Zone III",
        urgency: "critical",
      },
      {
        id: "eq2",
        title: "After Shaking Stops",
        description: "Immediate actions after an earthquake.",
        steps: [
          "Check yourself for injuries before helping others",
          "Expect aftershocks — stay out of damaged buildings",
          "Check for gas leaks — sniff, check stove flame",
          "Do not use matches or lighters after quake",
          "Listen to AIR for official instructions",
        ],
        materials: ["Torch", "First aid kit"],
        apSpecific:
          "AP: call 112 for rescue; NDRF 12 Battalion (Vijayawada) deploys for urban search and rescue",
        urgency: "critical",
      },
      {
        id: "eq3",
        title: "Building Collapse Survival",
        description: "Survive being trapped in rubble.",
        steps: [
          "Cover mouth with cloth to avoid dust inhalation",
          "Tap on pipe or wall — rescuers listen for this",
          "Don't shout continuously — save energy, signal every few minutes",
          "Try to move toward light or sound",
          "Conserve water — sip slowly",
        ],
        materials: ["Cloth for mouth", "Whistle"],
        apSpecific:
          "AP NDRF rescue teams equipped with USAR (Urban Search and Rescue) kits; survival window 72 hrs",
        urgency: "critical",
      },
      {
        id: "eq4",
        title: "Gas Leak After Earthquake",
        description: "Handle gas leak in damaged building.",
        steps: [
          "If you smell gas — do NOT switch any lights",
          "Leave building immediately with open mouth",
          "Leave door open when exiting",
          "Turn off gas at meter outside if accessible",
          "Call gas emergency and stay upwind",
        ],
        materials: ["None — get out first"],
        apSpecific:
          "AP gas pipelines: GAIL and HPCL pipelines in Vizag industrial area; call 1906 (GAIL) for gas leak",
        urgency: "critical",
      },
      {
        id: "eq5",
        title: "Earthquake at School",
        description: "Protect children in a school building.",
        steps: [
          'Teachers: say "Drop Cover Hold On" immediately',
          "Students under desks, face away from windows",
          "Do not rush for exit during shaking",
          "After shaking: orderly exit via fire routes",
          "Assembly in open playground — away from buildings",
        ],
        materials: ["School emergency plan"],
        apSpecific:
          "AP Education Dept mandates earthquake drills in all government schools in Zone II-III districts",
        urgency: "critical",
      },
      {
        id: "eq6",
        title: "Tsunami Warning After Quake",
        description: "Respond if earthquake felt near AP coast.",
        steps: [
          "Earthquake near coast = possible tsunami",
          "If sea suddenly recedes — run inland immediately",
          "Don't wait for official warning — go to high ground",
          "Move ≥30 m elevation or 2 km inland",
          "Do not return for hours even if sea appears calm",
        ],
        materials: ["Shoes", "Essential bag"],
        apSpecific:
          "AP tsunami evacuation routes: INCOIS early warning system; sirens on AP coast at Vizag, Kakinada, Nellore",
        urgency: "critical",
      },
      {
        id: "eq7",
        title: "Earthquake Crush Injury First Aid",
        description: "Treat a person trapped under debris.",
        steps: [
          "Do NOT move person with possible spinal injury",
          "Control bleeding with firm pressure",
          "Keep person warm and calm",
          "Warning: Crush syndrome — remove from rubble only with medical present",
          "Give sips of water if conscious and no abdominal injury",
        ],
        materials: ["Cloth for pressure", "Blanket"],
        apSpecific:
          "Call 108 immediately; KIMS and Apollo hospitals in Vijayawada have trauma ICU",
        urgency: "critical",
      },
      {
        id: "eq8",
        title: "Safe vs Unsafe Buildings",
        description: "Identify which structures to shelter in.",
        steps: [
          "Safe: RCC buildings with pillar-beam design",
          "Unsafe: old brick structures without columns, thatched roofs",
          "Triangles of life: next to large furniture, NOT under it",
          "Interior walls safer than exterior",
          "Never shelter under flyovers or bridges",
        ],
        materials: ["Knowledge only"],
        apSpecific:
          "AP: many village houses are load-bearing brick — most dangerous; new constructions follow IS 1893 code",
        urgency: "high",
      },
      {
        id: "eq9",
        title: "Earthquake in Lift (Elevator)",
        description: "Escape a stuck elevator after earthquake.",
        steps: [
          "Press all floor buttons — exit at first stop",
          "Drop Cover Hold On until shaking stops",
          "Press emergency call button",
          "Do NOT force doors open between floors",
          "Call out for help through door gaps",
        ],
        materials: ["Mobile phone"],
        apSpecific:
          "Vijayawada and Vizag high-rises: all elevators must have ARD (Automatic Rescue Device) per NBC 2016",
        urgency: "high",
      },
      {
        id: "eq10",
        title: "Earthquake Preparedness Kit",
        description: "Assemble home earthquake kit.",
        steps: [
          "Water: 3L/person/day for 3 days",
          "Food: 3-day supply of dry goods",
          "Torch + batteries + power bank",
          "First aid kit with BP tablets, ORS, Crocin",
          "Copy of Aadhaar, bank details in sealed plastic",
        ],
        materials: ["As listed above"],
        apSpecific:
          'AP SDMA recommends all households in Zone II-III maintain a "Go Bag" under bed',
        urgency: "medium",
      },
    ],
  },
  heatwave: {
    id: "heatwave",
    title: "Heatwave",
    icon: "☀️",
    description: "Extreme heat events in AP summers (45°C+)",
    scenarios: [
      {
        id: "hw1",
        title: "Heatstroke Emergency",
        description: "Treat severe heat illness immediately.",
        steps: [
          "Move person to shade or AC room",
          "Remove excess clothing",
          "Wet skin with water and fan vigorously",
          "Place ice packs at neck, armpits, groin",
          "Call 108 — this is life-threatening",
        ],
        materials: ["Water", "Fan", "Ice/cold packs", "Wet cloth"],
        apSpecific:
          "AP heatwave deaths peak May–June in Rayalaseema; Ongole, Nandyal, Kurnool reach 47–48°C",
        urgency: "critical",
      },
      {
        id: "hw2",
        title: "Heat Exhaustion Treatment",
        description: "Cool down a person with heat exhaustion.",
        steps: [
          "Move to cool shade",
          "Give ORS or salted water to drink (1 litre slowly)",
          "Wet cool cloth on forehead, neck, wrists",
          "Rest lying down with legs slightly elevated",
          "Monitor — if confusion or vomiting, call 108",
        ],
        materials: ["ORS sachet", "Water", "Wet cloth"],
        apSpecific:
          "AP AP: free ORS distribution at all government PHCs during heatwave season (April–June)",
        urgency: "high",
      },
      {
        id: "hw3",
        title: "Outdoor Worker Heat Safety",
        description: "Protect agricultural and construction workers.",
        steps: [
          "Work only 6–10 AM and after 5 PM",
          "Drink 1 glass water every 20 minutes",
          "Wear white/light cotton, cover head",
          "Rest 10 min every hour in shade",
          "Buddy system — watch each other for confusion",
        ],
        materials: ["Wide hat", "Cotton clothing", "Water bottle"],
        apSpecific:
          "AP Labour Dept: employers must provide shade, water, ORS for workers during heat advisory (IMD alert)",
        urgency: "high",
      },
      {
        id: "hw4",
        title: "Children in Heat",
        description: "Protect children from extreme heat.",
        steps: [
          "NEVER leave child in parked car — car reaches 60°C+",
          "Give water or buttermilk every hour",
          "Cool bath twice daily if possible",
          "No outdoor play between 11 AM–5 PM",
          "Signs of heat illness: red face, no sweat, confusion — 108 immediately",
        ],
        materials: ["Water", "Buttermilk/chaas", "Wet cloth"],
        apSpecific:
          "AP ICDS centers close between 11 AM–3 PM during heatwave season",
        urgency: "high",
      },
      {
        id: "hw5",
        title: "Cooling Without Electricity",
        description: "Stay cool during power cuts in heatwave.",
        steps: [
          "Hang wet jute sacks in windows — evaporative cooling",
          "Sleep on ground floor or terrace after midnight",
          "Khus (vetiver) screen in windows",
          "Cook at night or early morning",
          "Clay pot (matka) for cool drinking water",
        ],
        materials: ["Wet jute", "Clay pot", "Khus mat"],
        apSpecific:
          "AP power cuts during heatwave: 6–8 hrs daily in rural areas; portable battery fans available at APCOB subsidized price",
        urgency: "high",
      },
      {
        id: "hw6",
        title: "Sunburn Treatment",
        description: "Treat sunburned skin.",
        steps: [
          "Get to shade immediately",
          "Cool with wet cloth — do not use ice directly",
          "Apply calamine lotion or aloe vera gel",
          "Crocin 500mg for pain if adult",
          "Drink plenty of water",
        ],
        materials: ["Calamine lotion", "Aloe vera", "Crocin"],
        apSpecific:
          "AP coastal sunburn: Vizag, Kakinada beaches — coconut oil NOT recommended for sunburn",
        urgency: "medium",
      },
      {
        id: "hw7",
        title: "Heat Wave Livestock Care",
        description: "Protect animals during extreme heat.",
        steps: [
          "Ensure continuous water supply",
          "Provide shade — never tether in direct sun",
          "Feed in early morning/evening only",
          "Cool with water spray",
          "Call vet if animal is staggering or not eating",
        ],
        materials: ["Extra water", "Shade structure"],
        apSpecific:
          "AP Animal Husbandry: 1800-425-0091; AP summer 2023 had 1000+ cattle deaths in Kurnool from heat",
        urgency: "medium",
      },
      {
        id: "hw8",
        title: "Heat Wave Food Safety",
        description: "Avoid food poisoning in extreme heat.",
        steps: [
          "Cook fresh — never eat food left out >2 hours at 40°C+",
          "Rice and curry go bad in 4 hours in summer",
          "Prefer dry foods: murukkus, dry chilli, pickles",
          "Coconut/tamarind water for electrolytes",
          "ORS if diarrhea starts",
        ],
        materials: ["ORS", "Dry stored foods"],
        apSpecific:
          "AP summer food safety: street-side cut fruit and juices are highest risk; avoid between April–June",
        urgency: "medium",
      },
      {
        id: "hw9",
        title: "Heatwave Alert Levels",
        description: "AP government heatwave warning system.",
        steps: [
          "Yellow (40–42°C): restrict outdoor movement 12–4 PM",
          "Orange (43–45°C): schools close, construction pause",
          "Red (>45°C): maximum restrictions, camps open",
          "Tune IMD Hyderabad: All India Radio",
          "AP SDMA SMS alerts on registered mobile numbers",
        ],
        materials: ["Battery radio", "Mobile"],
        apSpecific:
          "AP Heatwave Action Plan: District DM offices run cooling centers at public buildings in all 13 districts",
        urgency: "high",
      },
      {
        id: "hw10",
        title: "Home Cooling Techniques",
        description: "Keep home cool without AC.",
        steps: [
          "White-wash roof — reduces temperature 5°C",
          "Keep curtains/chiks closed from 10 AM–5 PM",
          "Cross-ventilation: open east-west windows at night",
          "Roof garden or wet gunny sacks on roof",
          "Avoid cooking on gas between 11 AM–4 PM",
        ],
        materials: ["White lime wash", "Bamboo chiks"],
        apSpecific:
          "AP EPSEB distributes whitewash material free in identified heatwave villages; apply before summer",
        urgency: "low",
      },
    ],
  },
  car_accident: {
    id: "car_accident",
    title: "Car Accident",
    icon: "🚗",
    description: "Road accidents, first response and victim care",
    scenarios: [
      {
        id: "ca1",
        title: "Accident Scene Safety",
        description: "Make the accident scene safe before helping.",
        steps: [
          "Switch on hazard lights immediately",
          "Place reflective triangle 50 m behind accident",
          "Switch off all vehicle engines",
          "Call 112 and 108 (ambulance)",
          "Keep spectators 5 m back",
        ],
        materials: ["Reflective triangle", "Mobile phone"],
        apSpecific:
          "AP High-risk roads: NH 16 (Vijayawada–Vizag), NH 44 (Hyderabad–Kurnool); NHAI helpline 1033",
        urgency: "critical",
      },
      {
        id: "ca2",
        title: "Unconscious Victim — Do Not Move",
        description: "Protect spinal injury victims.",
        steps: [
          "Do NOT move unless fire/water threat",
          'Talk to them: "Can you hear me?"',
          "Recovery position only if breathing but unconscious",
          "Control head with both hands if must move",
          "Keep checking breathing until ambulance arrives",
        ],
        materials: ["Nothing — hands only"],
        apSpecific:
          "AP 108 ambulance provides real-time guidance by phone for trauma management",
        urgency: "critical",
      },
      {
        id: "ca3",
        title: "Severe Bleeding Control",
        description: "Stop arterial bleeding from a crash injury.",
        steps: [
          "Apply firm continuous pressure — use palm over wound",
          "Use clean cloth/shirt — do NOT remove once soaked",
          "Elevate limb above heart if possible",
          "Tourniquet: apply 5 cm above wound, tighten until bleeding stops",
          "Mark time of tourniquet application on victim's skin",
        ],
        materials: ["Clean cloth", "Belt or strip for tourniquet"],
        apSpecific:
          "AP trauma: belt tourniquet widely used by first responders; commercial tourniquets at all AP 108 ambulances",
        urgency: "critical",
      },
      {
        id: "ca4",
        title: "Trapped in Vehicle",
        description: "Free an occupant trapped in a crashed vehicle.",
        steps: [
          "Try all doors from outside",
          "Break side window with headrest rod at corner",
          "Clear glass before reaching in",
          "Stabilize person's neck if moving them",
          "Wait for fire brigade (101) if severely trapped",
        ],
        materials: ["Headrest rod", "Cloth to protect from glass"],
        apSpecific:
          "AP Fire Dept has Jaws of Life extrication equipment at major city fire stations",
        urgency: "critical",
      },
      {
        id: "ca5",
        title: "Fracture Immobilization",
        description: "Stabilize broken bones before transport.",
        steps: [
          "Do NOT straighten the limb",
          "Splint using sticks, umbrella, or rolled newspaper",
          "Bind above and below the fracture",
          "Check pulse below fracture every 10 min",
          "Gently transport to hospital on flat board if available",
        ],
        materials: ["Sticks/umbrella", "Cloth strips for binding"],
        apSpecific:
          "AP Good Samaritan Law: protects helpers from legal liability; help without fear",
        urgency: "high",
      },
      {
        id: "ca6",
        title: "Two-Wheeler Helmet Removal",
        description: "Correct helmet removal after crash.",
        steps: [
          "Helmet removal only if needed for CPR or breathing",
          "One person stabilizes neck, second removes helmet",
          "Undo strap, expand sides gently, tilt back carefully",
          "Keep neck neutral throughout",
          "Cover head with cloth after removal",
        ],
        materials: ["Two people needed", "Cloth for head"],
        apSpecific:
          "AP: two-wheeler accidents = 60% of all road deaths; helmet removal training given to police constables",
        urgency: "critical",
      },
      {
        id: "ca7",
        title: "Road Accident CPR",
        description: "Perform CPR at accident site.",
        steps: [
          "Check responsiveness: shout and shoulder tap",
          "If not breathing: 30 chest compressions at 100/min",
          "2 rescue breaths if trained",
          "Continue until ambulance arrives",
          "Don't stop unless person recovers or you are exhausted",
        ],
        materials: ["Firm ground"],
        apSpecific:
          "AP Good Samaritan guidelines: CPR by layperson is protected; 108 dispatcher gives phone guidance",
        urgency: "critical",
      },
      {
        id: "ca8",
        title: "Fuel Spill After Crash",
        description: "Handle fuel leak at accident scene.",
        steps: [
          "Turn off engine of all vehicles",
          "No smoking, no phones near spill",
          "Move victims upwind of spill",
          "Cover spill with soil or sand",
          "Call 101 and HPCL 1800-2333555 for tanker accidents",
        ],
        materials: ["Dry sand"],
        apSpecific:
          "NH 16 has many fuel tankers; AP Police trained to manage tanker accidents; call 100/112",
        urgency: "critical",
      },
      {
        id: "ca9",
        title: "Night Accident Visibility",
        description: "Make accident site visible to other vehicles.",
        steps: [
          "Turn on all hazard lights",
          "Place triangles/reflectors at 50 and 100 m behind",
          "Light phone torches on road edges",
          "Assign person to wave down approaching vehicles",
          "Wear light-colored clothing",
        ],
        materials: ["Reflective triangles", "Torch"],
        apSpecific:
          "AP NH 16 night accidents: high-speed trucks; flashlight on road edge visible from 200 m",
        urgency: "critical",
      },
      {
        id: "ca10",
        title: "Shock Treatment After Accident",
        description: "Manage traumatic shock in a victim.",
        steps: [
          "Lay person flat, elevate legs 30 cm",
          "Keep warm with blanket/clothing",
          "Do NOT give food or water",
          "Reassure continuously",
          "Rapid transport to hospital (golden hour = 60 min)",
        ],
        materials: ["Blanket or extra clothing"],
        apSpecific:
          "Nearest trauma centres in AP: NIMHANS Kurnool, AIIMS Mangalagiri, KGH Vizag",
        urgency: "critical",
      },
    ],
  },
  chemical_spill: {
    id: "chemical_spill",
    title: "Chemical Spill",
    icon: "⚗️",
    description: "Industrial chemical accidents and gas leaks",
    scenarios: [
      {
        id: "ch1",
        title: "Chemical Gas Cloud Escape",
        description: "Escape an outdoor chemical gas release.",
        steps: [
          "Move crosswind (90°) — not upwind or downwind",
          "Get indoors if toxic cloud approaching",
          "Seal doors/windows with wet cloth",
          "Switch off HVAC/fans",
          "Call 101, 112, and factory emergency number",
        ],
        materials: ["Wet cloth", "Tape for sealing"],
        apSpecific:
          "AP industrial corridors: Visakhapatnam steel plant area, Kakinada port, Atchutapuram SEZ — high chemical risk",
        urgency: "critical",
      },
      {
        id: "ch2",
        title: "Chemical Eye Splash",
        description: "First aid for chemicals in eyes.",
        steps: [
          "Flush eye with water continuously for 15–20 min",
          "Hold eye open with fingers",
          "Remove contact lenses during flush",
          "Do NOT rub eye",
          "Ophthalmology hospital immediately",
        ],
        materials: ["Running water"],
        apSpecific:
          "AP: Rajiv Gandhi Institute of Medical Sciences Ongole, KGH Vizag have 24hr ophthalmology",
        urgency: "critical",
      },
      {
        id: "ch3",
        title: "Acid Spill on Skin",
        description: "Treat acid contact on skin.",
        steps: [
          "Remove contaminated clothing (cut off if stuck)",
          "Flood skin with large amounts of water 20 min",
          "Do NOT neutralize with alkali — more damage",
          "Cover loosely with clean cloth",
          "Hospital immediately",
        ],
        materials: ["Running water", "Clean cloth"],
        apSpecific:
          "AP: sulfuric acid and HCl common in Vizag industrial area; antidote reference chart at factory safety officer",
        urgency: "critical",
      },
      {
        id: "ch4",
        title: "Pesticide Poisoning",
        description: "Treat organophosphate (pesticide) poisoning.",
        steps: [
          "Remove from exposure, remove clothes",
          "If on skin: wash with soap and water thoroughly",
          "If swallowed: do NOT induce vomiting",
          "Signs: pinpoint pupils, sweating, vomiting, fits",
          "Hospital urgently — Atropine antidote available",
        ],
        materials: ["Soap", "Water"],
        apSpecific:
          "AP agricultural region: pesticide poisoning highest in AP, especially cotton belt (Guntur, Krishna, Kurnool)",
        urgency: "critical",
      },
      {
        id: "ch5",
        title: "Gas Cylinder Leak",
        description: "Handle domestic LPG cylinder gas leak.",
        steps: [
          "Do NOT switch on/off any electrical switch",
          "Open all doors and windows",
          "Turn off cylinder valve if reachable",
          "Evacuate building",
          "Call 1906 (GAIL) or LPG dealer emergency number",
        ],
        materials: ["None — get out first"],
        apSpecific:
          "AP HPCL/BPCL cylinder emergency: number printed on cylinder — call from outside building",
        urgency: "critical",
      },
      {
        id: "ch6",
        title: "Chemical Plant Shelter-in-Place",
        description: "Protect yourself inside when outdoors is toxic.",
        steps: [
          "Close all windows and external doors",
          "Seal gaps with wet cloth or tape",
          "Turn off AC and all ventilation",
          "Go to room with least windows",
          'Monitor radio/mobile for "all clear" signal',
        ],
        materials: ["Wet cloth", "Tape", "Battery radio"],
        apSpecific:
          'AP District Collectors can issue "Shelter in Place" order via NDMA app and AP Alert SMS',
        urgency: "critical",
      },
      {
        id: "ch7",
        title: "Unknown Chemical Odor",
        description: "Respond to an unidentified chemical smell.",
        steps: [
          "Immediately move upwind",
          "Do not touch liquids on ground",
          "Call 112 with location description",
          "Note color of fumes (orange = NO2, green = chlorine)",
          "Keep 500 m distance until fire dept confirms safe",
        ],
        materials: ["Mobile phone"],
        apSpecific:
          "AP Pollution Control Board emergency: 040-23435038; available 24/7 for industrial accidents",
        urgency: "critical",
      },
      {
        id: "ch8",
        title: "Decontamination After Exposure",
        description: "Basic decontamination at scene.",
        steps: [
          "Remove and bag all clothing (double-bag)",
          "Shower with soap and water head-to-toe 15 min",
          "Do not scrub — pat skin",
          "Use fresh clean clothes",
          "Bag used towels for disposal",
        ],
        materials: ["Soap", "Water", "Plastic bags for contaminated items"],
        apSpecific:
          "AP hospitals with decontamination facilities: VIMSAR Berhampur (for north AP), KGH Vizag",
        urgency: "high",
      },
      {
        id: "ch9",
        title: "Chemical Ingestion",
        description: "First aid for swallowed chemicals.",
        steps: [
          "Call 1800-116-117 (Poison Control India) immediately",
          "Do NOT induce vomiting unless instructed",
          "If acid/alkali swallowed: give water or milk if conscious",
          "Note chemical name for doctors",
          "Keep original container for hospital",
        ],
        materials: ["Water or milk", "Original container"],
        apSpecific:
          "India Poison Control: 1800-116-117 (toll free); AIIMS Mangalagiri has toxicology unit",
        urgency: "critical",
      },
      {
        id: "ch10",
        title: "Industrial Accident Evacuation",
        description: "Organized factory evacuation after chemical release.",
        steps: [
          "Follow site emergency siren — one long blast = evacuate",
          "Move to designated muster point upwind",
          "Do not re-enter until site safety officer gives clearance",
          "Injured workers: hospital via 108",
          "Account for all workers at muster point",
        ],
        materials: ["Site emergency card"],
        apSpecific:
          "AP: HPCL Vizag refinery, NTPC Simhadri, GITAM area plants maintain mutual aid emergency groups",
        urgency: "critical",
      },
    ],
  },
  landslide: {
    id: "landslide",
    title: "Landslide",
    icon: "⛰️",
    description: "Eastern Ghats and hill areas debris flow",
    scenarios: [
      {
        id: "ls1",
        title: "Landslide Escape Route",
        description: "Escape a moving landslide.",
        steps: [
          "Move quickly to the side — never run downslope",
          "Escape laterally out of the landslide path",
          "If caught: curl up and protect head with arms",
          "Move to high ground once clear",
          "Do not return to site",
        ],
        materials: ["Shoes — always wear before sleeping in hill areas"],
        apSpecific:
          "AP Eastern Ghats: Araku Valley, Lambasingi, Paderu are high-risk landslide zones during NE monsoon",
        urgency: "critical",
      },
      {
        id: "ls2",
        title: "Landslide Early Warning Signs",
        description: "Recognize precursor signs before a landslide.",
        steps: [
          "Cracks in ground or road",
          "Unusual sounds from slope: cracking, rumbling",
          "Tilting trees or poles",
          "Springs/streams suddenly turbid or blocked",
          "Evacuate uphill immediately if these appear",
        ],
        materials: ["Mobile phone to report to 112"],
        apSpecific:
          "AP DMA runs rain gauge network in Visakhapatnam Agency; >100 mm in 24h = landslide alert",
        urgency: "high",
      },
      {
        id: "ls3",
        title: "Blocked Road After Landslide",
        description: "Handle road blocked by landslide debris.",
        steps: [
          "Do not attempt to drive over debris",
          "Check for secondary slides before approaching",
          "Turn back on road",
          "Report to NHAI 1033 or State PWD 1800-425-4440",
          "Find alternate route using offline map",
        ],
        materials: ["Offline maps", "Mobile phone"],
        apSpecific:
          "AP hill roads: Araku–Paderu, Chodavaram–Tuni routes frequently blocked after NE monsoon (Oct–Dec)",
        urgency: "high",
      },
      {
        id: "ls4",
        title: "Person Buried in Landslide",
        description: "Rescue someone buried in debris.",
        steps: [
          "Check for secondary slide before approaching",
          "Dig with hands/tools starting from head toward body",
          "Uncover face/airway first",
          "Do not jerk body — possible spinal injury",
          "Call 112 — NDRF teams have GPS and thermal search",
        ],
        materials: ["Spade", "Rope"],
        apSpecific:
          "NDRF 12th Battalion (Vijayawada) has landslide rescue teams; air evacuation via Coast Guard Vizag",
        urgency: "critical",
      },
      {
        id: "ls5",
        title: "Safe House Selection in Hills",
        description: "Choose safe shelter in landslide-prone areas.",
        steps: [
          "Avoid base of steep slopes and gullies",
          "Look for houses on ridges or stable rocky ground",
          "Check for slope face cracks near house",
          "Avoid areas with disturbed vegetation on slope above",
          "Ask local tribal community about historical slide paths",
        ],
        materials: ["Local knowledge"],
        apSpecific:
          "AP tribal hamlets: Kondh, Koya, Savara communities have traditional slope-reading knowledge",
        urgency: "medium",
      },
      {
        id: "ls6",
        title: "Post-Landslide Medical Care",
        description: "Treat injuries after a landslide.",
        steps: [
          "Fractures: splint and immobilize",
          "Head injuries: keep still, no water",
          "Crush injuries: do not release suddenly — risk of crush syndrome",
          "All injuries need hospital assessment",
          "Wound contamination with soil: tetanus injection needed",
        ],
        materials: ["Bandages", "Splint materials"],
        apSpecific:
          "AP ITDA hospitals (tribal area): Paderu, Seethampeta provide emergency care in remote hill zones",
        urgency: "critical",
      },
      {
        id: "ls7",
        title: "Landslide and Flood Combination",
        description: "Handle simultaneous landslide + flood in hills.",
        steps: [
          "Debris flows carry trees and boulders — stay far from stream beds",
          "Move to mid-slope (not too high, not in valley)",
          "Avoid river crossings during and after rain",
          "Village bridge check: inspect for cracks before crossing",
          "Wait 12 hrs after heavy rain before driving hill roads",
        ],
        materials: ["None — behavioral precaution"],
        apSpecific:
          "AP Vamsadhara, Nagavali rivers in north AP: landslide-triggered flash floods in Agency areas",
        urgency: "critical",
      },
      {
        id: "ls8",
        title: "Mudslide in Villages",
        description: "Village-level response to slope mud flow.",
        steps: [
          "Ring temple bell or beat drum — community alert",
          "Move all people uphill immediately",
          "Leave livestock to find their way",
          "Account for all villagers",
          "Report to Revenue Divisional Officer via sarpanch",
        ],
        materials: ["Communication device"],
        apSpecific:
          "AP Revenue Dept: MPDO coordinates village-level evacuation; Village Sachivalayam volunteers are first responders",
        urgency: "critical",
      },
      {
        id: "ls9",
        title: "Night Landslide Survival",
        description: "Respond when a landslide occurs at night.",
        steps: [
          "Keep torch next to bed in hill areas during monsoon",
          "At sound of rumble — flee immediately without dressing",
          "Shout to wake neighbors",
          "Gather at temple, school, or pucca community hall",
          "Stay until dawn before moving",
        ],
        materials: ["Torch at bedside"],
        apSpecific:
          "AP night landslides: most fatalities Oct–Nov in Visakhapatnam Agency; CWRDM issues hill warnings at 8 PM",
        urgency: "critical",
      },
      {
        id: "ls10",
        title: "Landslide Camp and Recovery",
        description: "Organize a temporary camp after landslide disaster.",
        steps: [
          "Set up on high stable ground",
          "Prioritize drinking water — streams may be contaminated",
          "Collect firewood for cooking and warmth",
          "Build temporary shelter using plastic sheeting and poles",
          "Contact ITDA/DRDA for relief material",
        ],
        materials: ["Plastic sheets", "Rope", "Firewood"],
        apSpecific:
          "AP ITDA Paderu and DRDA offices coordinate hill tribe relief; AP CM Relief Fund 1100",
        urgency: "high",
      },
    ],
  },
  drought: {
    id: "drought",
    title: "Drought",
    icon: "🏜️",
    description: "Water scarcity in Rayalaseema and Telangana border areas",
    scenarios: [
      {
        id: "dr1",
        title: "Emergency Water Finding",
        description: "Locate water during severe drought.",
        steps: [
          "Dig in dry stream beds (moist sand may hold water)",
          "Collect morning dew on plastic sheets",
          "Follow animal trails — lead to water",
          "Observe vegetation: tamarind/fig trees indicate groundwater",
          "Contact Revenue Dept for tanker water",
        ],
        materials: ["Plastic sheet", "Digging tool", "Container"],
        apSpecific:
          "AP Rayalaseema drought: tanker supply operated by district RWSS; call 1800-425-2625 (RWSS helpline)",
        urgency: "critical",
      },
      {
        id: "dr2",
        title: "Water Conservation",
        description: "Make available water last longer.",
        steps: [
          "Drinking priority: 2.5L/person/day minimum",
          "Cooking water: reuse rice/dal boiling water for washing",
          "Bathing: 5L sponge bath vs 100L shower",
          "Toilet: flush only once daily using stored water",
          "Repair all leaks immediately",
        ],
        materials: ["Storage containers", "Bucket"],
        apSpecific:
          "AP RWSS drought protocol: 5L/person/day minimum supply from tanker",
        urgency: "high",
      },
      {
        id: "dr3",
        title: "Water Purification Without Power",
        description: "Purify limited water without electricity.",
        steps: [
          "Boil for 5 minutes — kills all pathogens",
          "Solar SODIS: fill PET bottle, place in sun 6 hours",
          "Chlorine tablet: 1 tab per 1L, wait 30 min",
          "Ceramic pot filter: slow but effective",
          "Cloth filter + charcoal + sand layers",
        ],
        materials: ["Fuel for boiling", "PET bottles", "Chlorine tablets"],
        apSpecific:
          "AP Rural Water Supply provides free chlorine tablets at all PHCs and sachivalayams during drought",
        urgency: "high",
      },
      {
        id: "dr4",
        title: "Crop Failure Food Security",
        description: "Manage food when harvest fails.",
        steps: [
          "Register for NFSA ration card immediately",
          "AP midday meal scheme for children — ensure children attend school",
          "Local market: buy sorghum/bajra — cheaper and drought-resistant",
          "Government food camps: revenue divisional officer",
          "Collect wild fruits: tamarind, wood apple, Neem berries (edible)",
        ],
        materials: ["Ration card"],
        apSpecific:
          "AP NFSA: 5 kg rice/wheat per person per month for BPL families; distribution at fair price shops",
        urgency: "high",
      },
      {
        id: "dr5",
        title: "Drought Health Risks",
        description: "Manage health during water scarcity.",
        steps: [
          "Dehydration: dark urine = danger sign — drink more",
          "Malnutrition in children: ICDS anganwadi for supplementary food",
          "Mental health: drought-related stress — talk to ASHA worker",
          "Skin hygiene: minimal water hand wash still essential",
          "Eye infections increase in drought — avoid touching eyes",
        ],
        materials: ["ORS", "Soap"],
        apSpecific:
          "AP ICDS: malnutrition monitoring in Rayalaseema anganwadis during drought years; MAM/SAM treatment at NRC",
        urgency: "high",
      },
      {
        id: "dr6",
        title: "Livestock in Drought",
        description: "Keep animals alive during water shortage.",
        steps: [
          "Priority water: cattle need 30–40L/day; goats 2–4L/day",
          "Move livestock to where water/fodder is available (migration)",
          "Sell non-essential animals before they die",
          "Fodder camps: contact District Livestock Officer",
          "Check for dehydration: skin pinch test on neck",
        ],
        materials: ["Water containers", "Rope for migration"],
        apSpecific:
          "AP Animal Husbandry fodder camps during drought in Anantapur, Kurnool, YSR Kadapa districts",
        urgency: "high",
      },
      {
        id: "dr7",
        title: "Rainwater Harvesting",
        description: "Collect and store monsoon rain.",
        steps: [
          "Clean rooftop before first rain",
          "Connect roof drain to tank via first-flush diverter",
          "Underground sump: 5000L minimum for family of 5",
          "Cover storage to prevent mosquito breeding",
          "Recharge groundwater with percolation pit",
        ],
        materials: ["PVC pipes", "Tank", "First-flush device"],
        apSpecific:
          "AP RWSS subsidizes rooftop rainwater harvesting in Rayalaseema under JNARD scheme",
        urgency: "low",
      },
      {
        id: "dr8",
        title: "Drought Migration Safety",
        description: "Stay safe when migrating for work/water.",
        steps: [
          "Inform panchayat before leaving",
          "Keep Aadhaar, ration card copies with you",
          "Children's education: get TC (transfer certificate)",
          "Register at destination panchayat for entitlements",
          "Maintain communication with family members who stay",
        ],
        materials: ["Documents", "Mobile phone"],
        apSpecific:
          "AP Anantapur, Kurnool: seasonal migration of 500,000+ workers to Bengaluru/Chennai during drought years",
        urgency: "medium",
      },
      {
        id: "dr9",
        title: "Well Digging for Emergency Water",
        description: "Dig a shallow well in dry conditions.",
        steps: [
          "Find lowest point in dry stream bed or depression",
          "Dig down to moist layer (usually 1–3 m)",
          "Line walls with stones to prevent collapse",
          "Cover well top with cloth to prevent contamination",
          "Purify water before drinking",
        ],
        materials: ["Spade", "Stones", "Container"],
        apSpecific:
          "AP Rayalaseema: hard rock terrain — 3–6 m depth may be needed; use iron bar to break rock layer",
        urgency: "high",
      },
      {
        id: "dr10",
        title: "Drought Conflict Prevention",
        description: "Prevent water-related conflict in communities.",
        steps: [
          "Village water committee: schedule equitable distribution",
          "Daily tanker: village headman supervises distribution",
          "Avoid night-time water collection disputes",
          "Report water theft to revenue inspector",
          "Women's groups: manage queue system fairly",
        ],
        materials: ["Community register"],
        apSpecific:
          "AP Village Sachivalayam: water committee (Jala Samiti) legally recognized; gram sabha resolves disputes",
        urgency: "medium",
      },
    ],
  },
  tsunami: {
    id: "tsunami",
    title: "Tsunami",
    icon: "🌊",
    description: "Indian Ocean tsunami affecting AP and Odisha coasts",
    scenarios: [
      {
        id: "ts1",
        title: "Tsunami Immediate Escape",
        description: "React within minutes of a tsunami warning.",
        steps: [
          "Earthquake near coast = automatic tsunami risk",
          "Do NOT wait for siren — start moving inland immediately",
          "Move to high ground ≥30 m elevation or 2 km from shore",
          "On foot if needed — roads may be jammed",
          "Do not return for any reason until official all-clear",
        ],
        materials: ["Shoes", "Nothing else — time is critical"],
        apSpecific:
          "AP coast 2004 tsunami: 105 km/h waves; INCOIS early warning gives 15–45 min notice depending on quake location",
        urgency: "critical",
      },
      {
        id: "ts2",
        title: "Sea Withdrawal Warning Sign",
        description: "Recognize the natural warning of incoming tsunami.",
        steps: [
          "If sea suddenly recedes far from shore",
          "You have 5–20 minutes before tsunami arrives",
          "Run inland immediately — no time for belongings",
          "Alert everyone on beach",
          "This is MORE reliable than sirens",
        ],
        materials: ["Only your legs — run"],
        apSpecific:
          "AP 2004 tsunami: fishermen who recognized sea withdrawal and ran saved their lives; those who stayed died",
        urgency: "critical",
      },
      {
        id: "ts3",
        title: "Trapped in Tsunami Wave",
        description: "Survive if caught by tsunami water.",
        steps: [
          "Grab onto something solid — tree, post, building",
          "Protect head from debris — biggest killer",
          "Don't fight current — conserve energy",
          "Climb onto debris if floating",
          "Wave brightly colored item when rescuers come",
        ],
        materials: ["Rope if accessible"],
        apSpecific:
          "AP coast: coconut palms are strong — grip trunk, not fronds; avoid electricity poles (collapse risk)",
        urgency: "critical",
      },
      {
        id: "ts4",
        title: "Tsunami Multiple Wave Danger",
        description: "Stay safe between tsunami waves.",
        steps: [
          "First wave is often NOT the largest",
          "Stay at high ground for minimum 4 hours",
          "Subsequent waves arrive every 5–60 minutes",
          "Listen to INCOIS/AIR radio for wave series data",
          'Only return when "All Clear" officially declared',
        ],
        materials: ["Battery radio", "Water"],
        apSpecific:
          "2004 AP tsunami had 3 waves; many deaths from second/third wave as people returned to check damage",
        urgency: "critical",
      },
      {
        id: "ts5",
        title: "Tsunami Evacuation Route",
        description: "Use marked evacuation routes effectively.",
        steps: [
          "Know your nearest tsunami evacuation route (blue signs)",
          "Walk briskly — don't run (risk of falling)",
          "Help elderly/disabled neighbors",
          "Designated shelter: multi-storey pucca building or hillock",
          "Gather at muster point for family headcount",
        ],
        materials: ["Pre-knowledge of route"],
        apSpecific:
          "AP coast: INCOIS and SDMA have installed tsunami warning sirens in Vizag, Kakinada, Machilipatnam, Nellore, Ongole",
        urgency: "critical",
      },
      {
        id: "ts6",
        title: "Fishing Boat Tsunami Safety",
        description: "Protect fishermen at sea during tsunami.",
        steps: [
          "At sea: tsunami is only 1 m high — safer than on shore",
          "Do NOT return to harbor if warning issued",
          "Move to deeper water (>200 m depth) and wait",
          "Keep EDF radio (kuppam radio) on",
          "Return only after harbor authority all-clear",
        ],
        materials: ["Marine radio", "Life jackets"],
        apSpecific:
          "AP fisheries: 1.5 lakh fishing boats; coast guard VHF channel 16 for emergency; Vizag coast guard 0891-2510893",
        urgency: "critical",
      },
      {
        id: "ts7",
        title: "Tsunami Debris Field Navigation",
        description: "Move safely through post-tsunami debris.",
        steps: [
          "Assume all downed lines are electrified",
          "Watch for unstable structures above",
          "Probe path with stick before stepping",
          "Avoid flood water — sewage and chemicals mixed in",
          "Mark cleared paths for rescue teams",
        ],
        materials: ["Stick", "Rubber boots"],
        apSpecific:
          "2004 AP tsunami: debris fields in Nellore, Ongole coastal villages; NDRF teams from Vijayawada deployed",
        urgency: "high",
      },
      {
        id: "ts8",
        title: "Post-Tsunami Drinking Water",
        description: "Find clean water after tsunami damage.",
        steps: [
          "All surface water is contaminated with seawater and sewage",
          "Bottled/sachet water only",
          "Boil and chlorinate any collected rainwater",
          "Sea water is NOT drinkable even if filtered",
          "Report to relief camp for water distribution",
        ],
        materials: ["Chlorine tablets", "Sealed water bottles"],
        apSpecific:
          "AP RWSS Emergency Water Supply teams deploy after tsunami; tankers from Guntur and Nellore pre-positioned",
        urgency: "critical",
      },
      {
        id: "ts9",
        title: "Tsunami Missing Persons",
        description: "Locate family separated by tsunami.",
        steps: [
          "Report immediately to nearest revenue officer/police",
          "NDRF maintains a missing persons register",
          'Social media: "AP Disaster Missing Persons" groups activated',
          "Hospital rounds: check each district hospital",
          "AP CM Relief cell: 1100 — tracks family reunification",
        ],
        materials: ["Photo ID of missing person"],
        apSpecific:
          "2004 AP tsunami: 105 deaths officially; UNDP coordinated family tracing; AP Police missing person portal: sppolice.gov.in",
        urgency: "high",
      },
      {
        id: "ts10",
        title: "Tsunami Preparedness for Coastal Families",
        description: "Annual preparation for coastal AP residents.",
        steps: [
          "Know 3 evacuation routes from your house",
          'Keep "Go Bag" packed: docs, meds, water, food',
          "Register mobile with INCOIS tsunami alert: incois.gov.in",
          "Annual drill: participate in NDMA mock tsunami exercises",
          "Check if your house is in inundation zone: INCOIS maps online",
        ],
        materials: ["Go Bag", "Mobile registered with INCOIS"],
        apSpecific:
          "AP SDMA runs annual tsunami mock drills in all 9 coastal districts every November",
        urgency: "medium",
      },
    ],
  },
  pandemic: {
    id: "pandemic",
    title: "Pandemic",
    icon: "🦠",
    description: "Disease outbreak response and isolation protocols",
    scenarios: [
      {
        id: "pan1",
        title: "Home Isolation Protocol",
        description: "Properly isolate a sick family member.",
        steps: [
          "Separate room for sick person with attached bathroom",
          "Caregiver: N95 mask, gloves, face shield",
          "Dedicated utensils for sick person",
          "Ventilate room — open windows",
          "Monitor temperature and oxygen (SpO2) twice daily",
        ],
        materials: ["N95 mask", "Oximeter", "Thermometer", "Sanitizer"],
        apSpecific:
          "AP Health Dept: COVID-19 home isolation kit distributed free at PHCs; AP COVID helpline: 104",
        urgency: "high",
      },
      {
        id: "pan2",
        title: "Emergency Warning Signs",
        description: "Recognize when to call ambulance immediately.",
        steps: [
          "SpO2 below 94% = emergency",
          "Breathing difficulty at rest",
          "Persistent chest pain",
          "Confusion or inability to stay awake",
          "Call 108 — AP ambulance free of charge",
        ],
        materials: ["Pulse oximeter", "Mobile phone"],
        apSpecific:
          "AP: 108 ambulance has oxygen supply; call early — do not wait until critical",
        urgency: "critical",
      },
      {
        id: "pan3",
        title: "Personal Protective Equipment",
        description: "Correct use of masks and PPE.",
        steps: [
          "Wash hands before putting on mask",
          "N95/FFP2: for high-risk indoor care",
          "3-ply surgical: for general public use",
          "Mask covers nose AND mouth",
          "Do not reuse disposable masks; wash cloth masks daily",
        ],
        materials: ["Masks", "Soap or sanitizer"],
        apSpecific:
          "AP PHCs distribute free masks during outbreak; call village health nurse or ASHA worker",
        urgency: "high",
      },
      {
        id: "pan4",
        title: "Disinfecting Home",
        description: "Clean and disinfect household surfaces.",
        steps: [
          "1% sodium hypochlorite (bleach) solution for floors",
          "70% alcohol wipes for surfaces",
          "Clean then disinfect — cleaning first removes organic matter",
          "High-touch surfaces: handles, taps, switches — disinfect twice daily",
          "Dispose of wipes/gloves in sealed bag",
        ],
        materials: ["Bleach (Ujala/Robin)", "Gloves", "Mop"],
        apSpecific:
          "AP ASHA workers provide free sodium hypochlorite sachets during outbreak from PHC",
        urgency: "high",
      },
      {
        id: "pan5",
        title: "Food Safety During Pandemic",
        description: "Keep food safe when supply chains are disrupted.",
        steps: [
          "Store 2-week supply of dry goods: rice, dal, oil, salt",
          "Wash vegetables with salt water",
          "Cook fully — no raw meat/fish",
          "Water: boil or chlorinate",
          "Avoid buying street food during outbreak",
        ],
        materials: ["Dry food stock", "Storage containers"],
        apSpecific:
          "AP: rice, toor dal, cooking oil available in PDS shops; carry Aadhaar to ration shop",
        urgency: "medium",
      },
      {
        id: "pan6",
        title: "Mental Health During Lockdown",
        description: "Maintain mental well-being during isolation.",
        steps: [
          "Maintain routine: same wake/sleep time",
          "Daily exercise even in small space",
          "Limit news to twice daily",
          "Video call family and friends",
          "Seek help: iCall 9152987821 (psychosocial support)",
        ],
        materials: ["Mobile phone"],
        apSpecific:
          "AP DMHO runs mental health helpline: 1800-599-0019; Telugu counselors available",
        urgency: "medium",
      },
      {
        id: "pan7",
        title: "Burial and Death Protocols",
        description: "Safe handling of pandemic deaths.",
        steps: [
          "Inform PHC medical officer for death certificate",
          "Follow local health authority burial protocol",
          "Limited family attendance as per guidelines",
          "Caregiver: full PPE while handling body",
          "Body bag sealed before transport",
        ],
        materials: ["PPE", "Medical certificate"],
        apSpecific:
          "AP pandemic burial protocol: PHC MO issues certificate; GHMC/panchayat provides designated burial ground",
        urgency: "high",
      },
      {
        id: "pan8",
        title: "Vaccination During Outbreak",
        description: "Access and complete vaccination.",
        steps: [
          "Register on CoWIN or COWIN app",
          "Bring Aadhaar and mobile",
          "Nearest PHC has walk-in vaccination",
          "Both doses required for full protection",
          "Side effects normal: arm soreness, mild fever — Crocin 500mg",
        ],
        materials: ["Aadhaar card", "Mobile for certificate"],
        apSpecific:
          "AP PHCs: free vaccination; AP Immunization Tracking: VAHAN app tracks district-wise coverage",
        urgency: "high",
      },
      {
        id: "pan9",
        title: "Quarantine Supply Management",
        description: "Manage supplies when unable to leave home.",
        steps: [
          "Online delivery: Swiggy, Blinkit, JioMart — available in AP cities",
          "Neighbor/community volunteer: ask for help without shame",
          "Village sachivalayam: will organize doorstep supply",
          "Contact ASHA worker for medical needs",
          "AP Chief Minister's supply package: check eligibility",
        ],
        materials: ["Mobile for online orders"],
        apSpecific:
          "AP Village Secretariat (Sachivalayam) has a digital volunteer network — call your ward volunteer's number",
        urgency: "medium",
      },
      {
        id: "pan10",
        title: "Outbreak Rumor Control",
        description: "Identify and resist health misinformation.",
        steps: [
          "Trust only: WHO, MoHFW, AP Health Dept, 104 helpline",
          "Before sharing: check PIB Fact Check @PIBFactCheck on Twitter",
          "Homeopathy and miracle cures: consult doctor first",
          "Report misinformation to AP police cyber cell",
          "Share official information in local language",
        ],
        materials: ["Mobile with internet"],
        apSpecific:
          "AP I&PR Dept issues official Telugu health bulletins; AP Police cyber cell: cybercrime.ap.gov.in",
        urgency: "medium",
      },
    ],
  },
  food_emergency: {
    id: "food_emergency",
    title: "Food Emergency",
    icon: "🍳",
    description: "Food poisoning, allergies, and food safety emergencies",
    scenarios: [
      {
        id: "fe1",
        title: "Food Poisoning Treatment",
        description: "Manage acute food poisoning symptoms.",
        steps: [
          "Stop eating suspected food immediately",
          "Give ORS and rest; lie on left side to reduce nausea",
          "Do NOT give anti-diarrheal medicine unless doctor-advised",
          "Give sips of water every 5 min if vomiting",
          "Hospital if: blood in stool, severe vomiting, high fever, or confusion",
        ],
        materials: ["ORS", "Water"],
        apSpecific:
          "AP summer: rice, fish curry, coconut chutney go bad in 3-4 hours; avoid street food in heatwave",
        urgency: "high",
      },
      {
        id: "fe2",
        title: "Anaphylaxis Severe Allergy",
        description: "Manage life-threatening allergic reaction.",
        steps: [
          "Call 108 immediately",
          "Lay person flat, legs elevated (unless breathing difficulty then sit upright)",
          "Administer epinephrine auto-injector (EpiPen) if available: outer thigh",
          "Loosen all tight clothing",
          "CPR if person becomes unresponsive",
        ],
        materials: [
          "EpiPen if available",
          "Antihistamine Alerid or Cetirizine",
        ],
        apSpecific:
          "AP common triggers: peanuts, seafood (prawns), bee stings; Adrenaline injection at all 108 ambulances",
        urgency: "critical",
      },
      {
        id: "fe3",
        title: "Mushroom Poisoning",
        description: "Recognize and treat toxic mushroom ingestion.",
        steps: [
          "Do NOT induce vomiting",
          "Collect a sample of the mushroom in bag for hospital",
          "Note time of eating and symptom onset",
          "Call 1800-116-117 (Poison Control India)",
          "Hospital immediately; delayed liver failure is possible",
        ],
        materials: ["Sample in bag", "Mobile phone"],
        apSpecific:
          "AP Eastern Ghats: wild mushroom poisoning common post-monsoon; tribal communities recognize local edible species",
        urgency: "critical",
      },
      {
        id: "fe4",
        title: "Choking Emergency",
        description: "Dislodge object blocking airway.",
        steps: [
          "Ask: can you speak or cough? If yes: encourage coughing",
          "5 firm back blows between shoulder blades",
          "5 abdominal thrusts (Heimlich): above navel, below chest",
          "Alternate back blows and Heimlich until cleared or unconscious",
          "If unconscious: begin CPR",
        ],
        materials: ["Hands only"],
        apSpecific:
          "Children choking: most common on small objects, nuts, sweets; infant choking: face-down back blows only",
        urgency: "critical",
      },
      {
        id: "fe5",
        title: "Typhoid Prevention and Care",
        description: "Manage typhoid fever during water-borne outbreak.",
        steps: [
          "Boil all drinking water; wash hands before eating",
          "Fever lasting over 3 days with abdominal pain: suspect typhoid",
          "Hospital for blood test (Widal or blood culture)",
          "Antibiotics: Cefixime or Azithromycin prescribed by doctor",
          "Complete full antibiotic course; rest and hydration",
        ],
        materials: ["ORS", "Paracetamol (Crocin) for fever"],
        apSpecific:
          "AP post-flood: typhoid outbreaks in Vijayawada and delta districts; free treatment at PHC",
        urgency: "high",
      },
    ],
  },
  medical_chronic: {
    id: "medical_chronic",
    title: "Chronic Medical",
    icon: "💉",
    description: "Managing chronic diseases during disasters",
    scenarios: [
      {
        id: "mc1",
        title: "Diabetic Emergency Hypoglycemia",
        description: "Treat low blood sugar attack.",
        steps: [
          "Give 15 g fast sugar: 3 tsp sugar in water, 3 glucose biscuits, or 150 mL fruit juice",
          "Wait 15 minutes; check symptoms",
          "Repeat sugar if still symptomatic",
          "Once recovered: give proper meal with carbs and protein",
          "If unconscious: do NOT give by mouth; call 108",
        ],
        materials: ["Sugar or glucose tablets", "Fruit juice"],
        apSpecific:
          "AP: Glucon-D and sugar sachets in all 108 ambulances; diabetic patient should carry ID card in wallet",
        urgency: "critical",
      },
      {
        id: "mc2",
        title: "Asthma Attack First Response",
        description: "Manage acute asthma in disaster.",
        steps: [
          "Sit upright; loosen tight clothing",
          "Give Salbutamol inhaler (Asthalin): 2 puffs, wait 1 min, 2 more puffs",
          "Breathe slowly through mouth; stay calm",
          "If no inhaler: hot steam inhalation can give mild relief",
          "No improvement in 15 min: call 108 immediately",
        ],
        materials: ["Asthalin inhaler (Salbutamol)"],
        apSpecific:
          "AP: Asthalin 100 mcg inhaler available at all pharmacies Rs 60; free at PHC; Seretide for severe asthma",
        urgency: "critical",
      },
      {
        id: "mc3",
        title: "Hypertension Crisis",
        description: "Manage BP emergency without electricity.",
        steps: [
          "Keep patient calm and seated; no physical exertion",
          "Continue prescribed medication; do not skip",
          "Reduce salt in food immediately",
          "No smoking or alcohol",
          "If BP over 180/120 or severe headache or vision change: hospital immediately",
        ],
        materials: ["Regular BP medication", "BP monitor if available"],
        apSpecific:
          "AP: Amlodipine and Losartan available free at AP PHCs; Aarogyasri covers hypertension complications",
        urgency: "high",
      },
      {
        id: "mc4",
        title: "Heart Attack Recognition",
        description: "Identify and respond to a heart attack.",
        steps: [
          "Symptoms: crushing chest pain, left arm or jaw pain, sweating, shortness of breath",
          "Call 108 immediately",
          "Sit patient upright; loosen clothing",
          "Aspirin 325 mg (Ecosprin) if not allergic and no bleeding disorder",
          "CPR if pulse stops; 108 dispatcher will guide",
        ],
        materials: ["Ecosprin 325 mg", "Mobile phone"],
        apSpecific:
          "AP: AIIMS Mangalagiri, Apollo Vijayawada, Care Hospital Vizag have cardiac cath labs",
        urgency: "critical",
      },
      {
        id: "mc5",
        title: "Stroke FAST Protocol",
        description: "Act fast using FAST protocol.",
        steps: [
          "F: Face drooping; A: Arm weakness when raised; S: Speech slurred; T: Time",
          "Call 108 immediately and note time of symptom onset",
          "Do NOT give food or water (swallowing risk)",
          "Lay on side if vomiting; keep airway clear",
          "Thrombolysis window 4.5 hours: rush to hospital",
        ],
        materials: ["Mobile phone"],
        apSpecific:
          "AP stroke centres: Apollo Vijayawada, Medicover Vizag, KIMS Hyderabad; 108 has stroke protocol",
        urgency: "critical",
      },
      {
        id: "mc6",
        title: "Febrile Seizure in Children",
        description: "Manage seizure from fever in child.",
        steps: [
          "Lay child on side on soft surface",
          "Clear area of hard objects; do NOT restrain child",
          "Do NOT put anything in mouth",
          "Cool with wet sponge after seizure ends",
          "Hospital if seizure lasts over 5 min or recurs",
        ],
        materials: ["Soft surface", "Wet cloth"],
        apSpecific:
          "AP: Diazepam rectal gel available at district hospital ER; most common age 6 months to 5 years",
        urgency: "critical",
      },
    ],
  },
  water_emergency: {
    id: "water_emergency",
    title: "Water Hazards",
    icon: "🌊",
    description: "Rip currents, dam releases, and sudden water hazards",
    scenarios: [
      {
        id: "we1",
        title: "Rip Current Escape",
        description: "Survive getting caught in ocean rip current.",
        steps: [
          "Do NOT swim against the current",
          "Float or tread water; conserve energy",
          "Swim parallel to shore until out of current",
          "Then swim diagonally back toward beach",
          "Wave arm for lifeguard assistance",
        ],
        materials: ["Knowledge only"],
        apSpecific:
          "AP: Ramakrishna Beach Vizag, Suryalanka, Manginapudi rip currents claim lives; red flag means do not swim",
        urgency: "critical",
      },
      {
        id: "we2",
        title: "Sudden Dam Release",
        description: "React to sudden flood from dam opening.",
        steps: [
          "Listen for siren warnings from dam control room",
          "Move immediately to high ground above river bank",
          "Do not cross river bridge; bridges can wash out",
          "AP dam release warning via AIR Vijayawada FM 100.6",
          "Do not return to riverbank for 12 hours after release",
        ],
        materials: ["Battery radio"],
        apSpecific:
          "AP dams: Srisailam, Nagarjuna Sagar, Prakasam Barrage release notifications via AP Water Resources website",
        urgency: "critical",
      },
      {
        id: "we3",
        title: "Waterlogged Road Crossing",
        description: "Safely cross flooded roads and paths.",
        steps: [
          "Test depth with stick; never enter unknown flood water",
          "Maximum safe crossing depth: knee height 45 cm",
          "Link arms in chain of 2 or more people facing upstream",
          "Shuffle feet along bottom; do not lift feet",
          "If swept: float on back with feet downstream",
        ],
        materials: ["Long stick", "Rope"],
        apSpecific:
          "AP: Vijayawada underpasses flood within 15 min of heavy rain; police close these first",
        urgency: "high",
      },
      {
        id: "we4",
        title: "Quicksand and Swamp Survival",
        description: "Escape sinking into soft muddy ground.",
        steps: [
          "Do not panic or struggle; makes sinking faster",
          "Distribute weight: lay back slowly to float on surface",
          "Move limbs slowly in small circles to loosen grip",
          "Reach for solid object and pull yourself out",
          "Flat body position distributes weight across surface",
        ],
        materials: ["Long stick to reach solid ground"],
        apSpecific:
          "AP coastal mangroves: soft clay in Coringa Wildlife Sanctuary, Godavari estuary; never enter alone",
        urgency: "critical",
      },
    ],
  },
  pregnancy: {
    id: "pregnancy",
    title: "Pregnancy Emergency",
    icon: "🤰",
    description: "Obstetric emergencies including delivery and complications",
    scenarios: [
      {
        id: "prg1",
        title: "Emergency Childbirth",
        description: "Assist delivery when hospital is unreachable.",
        steps: [
          "Keep mother calm and lying down; wash hands thoroughly",
          "Support baby's head as it emerges — do not pull",
          "Let shoulders deliver naturally; support body with both hands",
          "Place baby skin-to-skin on mother's chest; wipe face clean",
          "Do NOT cut cord until it stops pulsating; call 108",
        ],
        materials: ["Clean cloth", "Warm blanket", "Gloves if available"],
        apSpecific:
          "AP: 108 ambulance has trained staff for delivery; Janani Express free for pregnant women",
        urgency: "critical",
      },
      {
        id: "prg2",
        title: "Postpartum Hemorrhage",
        description: "Manage life-threatening bleeding after delivery.",
        steps: [
          "Massage uterus firmly through abdomen in circular motion",
          "Put baby to breast — stimulates uterus to contract",
          "Keep woman lying flat, elevate legs 30 cm",
          "Apply clean pads; count soaked pads per hour",
          "Call 108 immediately — blood loss >500 mL is emergency",
        ],
        materials: ["Clean cloths", "Gloves"],
        apSpecific:
          "AP PHC: Misoprostol available for postpartum bleeding; all 108 ambulances carry oxytocin",
        urgency: "critical",
      },
      {
        id: "prg3",
        title: "Eclampsia Seizures in Pregnancy",
        description: "Manage seizures in late pregnancy.",
        steps: [
          "Lay woman on her left side to protect airway",
          "Do NOT put anything in mouth during seizure",
          "Protect from injury — remove hard objects nearby",
          "Time the seizure; call 108 immediately",
          "After seizure: check breathing, keep on left side",
        ],
        materials: ["Soft pillow", "Mobile phone"],
        apSpecific:
          "AP: Magnesium sulphate for eclampsia at all AP 108 ambulances and PHCs",
        urgency: "critical",
      },
      {
        id: "prg4",
        title: "Premature Labor Signs",
        description: "Manage labor before 37 weeks.",
        steps: [
          "Help woman to hospital immediately — do not wait",
          "Keep mother warm and calm; time contractions",
          "Do not give food or water in case surgery needed",
          "Note gestational age for hospital",
          "Call 108; mention preterm pregnancy explicitly",
        ],
        materials: ["Warm blanket", "Mobile phone"],
        apSpecific:
          "AP: NICU available at district hospitals; Vijayawada GGH, Vizag KGH have Level III NICU",
        urgency: "critical",
      },
      {
        id: "prg5",
        title: "Umbilical Cord Prolapse",
        description: "Emergency: cord comes out before baby.",
        steps: [
          "Call 108 immediately — this is a life-threatening emergency",
          "Help mother into knee-chest position (bottom up, head down)",
          "Do NOT push cord back in",
          "Keep cord moist with clean wet cloth",
          "Maintain position until ambulance arrives",
        ],
        materials: ["Moist clean cloth"],
        apSpecific:
          "AP 108 dispatcher trained for cord prolapse — stay on line and follow their guidance",
        urgency: "critical",
      },
      {
        id: "prg6",
        title: "Miscarriage Management",
        description: "First aid for pregnancy loss.",
        steps: [
          "Keep woman calm and lying down",
          "Apply pad to control bleeding; count pads used",
          "Do NOT give any medication without doctor advice",
          "Collect passed tissue in clean container for hospital",
          "Transport to hospital — D&C may be needed",
        ],
        materials: ["Clean pads", "Container"],
        apSpecific:
          "AP: Govt hospitals provide free gynaecology care; ESHS Aarogyasri covers obstetric emergencies",
        urgency: "high",
      },
      {
        id: "prg7",
        title: "Gestational Hypertension",
        description: "High BP in pregnancy — serious complication.",
        steps: [
          "Measure BP — above 140/90 is danger zone",
          "Keep woman calm and lying on left side",
          "Do NOT give hypertension medicines unless prescribed",
          "Watch for headache, blurred vision, upper abdominal pain",
          "Hospital immediately for BP monitoring and medication",
        ],
        materials: ["BP monitor"],
        apSpecific:
          "AP ANC cards track BP at every visit; village ASHA worker has BP cuff for home monitoring",
        urgency: "high",
      },
      {
        id: "prg8",
        title: "Pregnancy in Disaster Zone",
        description: "Care for pregnant woman in flood or cyclone.",
        steps: [
          "Identify pregnant women in evacuation group first",
          "Carry extra drinking water and ORS for her",
          "Avoid physical exertion — do not make her carry loads",
          "Register at relief camp for priority medical attention",
          "Inform camp medical officer of estimated delivery date",
        ],
        materials: ["ORS", "Clean cloths", "Aadhaar/MCP card"],
        apSpecific:
          "AP: Janani Suraksha Yojana (JSY) pays Rs 1400 for institutional delivery; valid even during disaster",
        urgency: "high",
      },
    ],
  },
  snakebite: {
    id: "snakebite",
    title: "Snakebite",
    icon: "🐍",
    description: "Venomous snakebite first aid for AP-specific species",
    scenarios: [
      {
        id: "sb1",
        title: "Russell's Viper Bite",
        description: "Most deadly snake in AP — immediate action.",
        steps: [
          "Immobilize bitten limb at heart level — do NOT elevate",
          "Remove rings, watches, tight clothing near bite",
          "Mark bite site and note time of bite on skin",
          "Transport to hospital immediately — do NOT run",
          "Do NOT cut, suck, apply tourniquet or ice",
        ],
        materials: ["Marker pen", "Clean bandage"],
        apSpecific:
          "Russell's viper common in AP farmlands (Guntur, Krishna); anti-venom at all district hospitals",
        urgency: "critical",
      },
      {
        id: "sb2",
        title: "Indian Cobra Bite",
        description: "Neurotoxic — acts slowly but fatally.",
        steps: [
          "Immobilize limb; apply pressure immobilization bandage (NOT tourniquet)",
          "Keep person calm and still — movement spreads venom",
          "Hospital within 30 minutes is ideal",
          "Watch for drooping eyelids — sign of spreading neurotoxin",
          "Assist breathing if stops before help arrives",
        ],
        materials: ["Crepe bandage", "Mobile phone"],
        apSpecific:
          "AP cobra habitat: sugarcane fields, coconut groves in Krishna and Guntur; 108 carries polyvalent anti-venom",
        urgency: "critical",
      },
      {
        id: "sb3",
        title: "Krait Bite — Night Danger",
        description: "Krait bites are painless and often missed.",
        steps: [
          "Often occurs while sleeping — check for fang marks if woken by pain",
          "Symptoms: abdominal pain, paralysis starting 1–6 hours later",
          "Hospital immediately even if currently asymptomatic",
          "Tell doctor explicitly — krait needs anti-venom",
          "Keep person awake and monitored continuously",
        ],
        materials: ["Torch"],
        apSpecific:
          "Common Indian krait in AP coastal plains; sleeping on floor without mat is a risk factor",
        urgency: "critical",
      },
      {
        id: "sb4",
        title: "Red Scorpion Sting",
        description: "Mesobuthus tamulus — deadliest scorpion in India.",
        steps: [
          "Immobilize and rest affected limb",
          "Apply cold compress (not ice directly) on sting area",
          "Hospital immediately — cardiac risk is high",
          "Monitor heart rate and blood pressure",
          "Do NOT apply tourniquet or cut sting area",
        ],
        materials: ["Cold water compress"],
        apSpecific:
          "Red scorpion common in AP rocky areas: Vizag, East Godavari, Srikakulam; Prazosin antidote at district hospitals",
        urgency: "critical",
      },
      {
        id: "sb5",
        title: "Non-Venomous Snake Identification",
        description: "Identify safe vs dangerous snakes in AP.",
        steps: [
          "Round pupil + slender body = usually non-venomous",
          "Hooded: cobra; heavy body + triangular head: viper",
          "Rat snakes and water snakes common in AP — usually harmless",
          "Treat all bites as venomous until confirmed otherwise",
          "Photograph snake from safe distance if possible for ID at hospital",
        ],
        materials: ["Knowledge only"],
        apSpecific:
          "AP Big 4: Russell's viper, Indian cobra, common krait, saw-scaled viper; all found in AP farmlands",
        urgency: "high",
      },
      {
        id: "sb6",
        title: "Dog/Animal Bite Rabies Risk",
        description: "Manage animal bites and rabies prevention.",
        steps: [
          "Wash wound vigorously with soap and running water for 15 minutes",
          "Apply Betadine or alcohol after washing",
          "Go to hospital within 24 hours for anti-rabies vaccine",
          "Report bite to local municipal office",
          "Complete all 5 doses of vaccine — do NOT skip",
        ],
        materials: ["Soap", "Running water", "Betadine"],
        apSpecific:
          "AP: free anti-rabies vaccine at all govt hospitals; GHMC Vijayawada/VMC Vizag runs dog control programs",
        urgency: "high",
      },
    ],
  },
  drowning: {
    id: "drowning",
    title: "Drowning",
    icon: "🏊",
    description: "Water rescue and resuscitation in AP rivers and sea",
    scenarios: [
      {
        id: "dw1",
        title: "Drowning Rescue",
        description: "Safely rescue a drowning person.",
        steps: [
          "Do NOT jump in unless trained — throw rope or flotation first",
          "Throw rope, branch, life ring, plastic jerry can",
          "Reach and pull from poolside or bank",
          "Once out: check breathing; begin CPR if not breathing",
          "Call 108 — secondary drowning can occur hours later",
        ],
        materials: ["Rope", "Any flotation device"],
        apSpecific:
          "AP: Krishna and Godavari rivers have strong currents; Vizag beach drowning: wave-washed swimmers rescued by lifeguards",
        urgency: "critical",
      },
      {
        id: "dw2",
        title: "Drowning Resuscitation",
        description: "Revive a person rescued from water.",
        steps: [
          "Place on firm surface; tilt head back, lift chin",
          "5 rescue breaths first for drowning victims",
          "Check for pulse; begin CPR 30:2 if no pulse",
          "Do NOT do abdominal thrusts to remove water",
          "Continue until ambulance arrives",
        ],
        materials: ["Firm surface"],
        apSpecific:
          "AP Vizag beach: lifeguards posted April–June; Krishna river bathing points marked safe/unsafe",
        urgency: "critical",
      },
      {
        id: "dw3",
        title: "Flood Swimming Survival",
        description: "Stay afloat when swept into floodwater.",
        steps: [
          "Float on back with feet downstream to absorb debris impact",
          "Swim diagonally to shore — do not fight current directly",
          "Grab fixed objects: trees, posts",
          "Avoid debris and submerged objects",
          "Signal rescuers with waving motion",
        ],
        materials: ["Any floating object"],
        apSpecific:
          "AP Krishna flood current: up to 3 m/s; even strong swimmers cannot fight it — go with current, angle to shore",
        urgency: "critical",
      },
      {
        id: "dw4",
        title: "Cold Shock After Water Entry",
        description: "Manage sudden immersion in cold water.",
        steps: [
          "Stay calm — do not gasp or thrash",
          "Hold breath for 1–2 minutes until gasp reflex passes",
          "Float in HELP position (Heat Escape Lessening Posture)",
          "Once out: remove wet clothes; wrap in dry blanket",
          "Give warm drinks slowly if conscious",
        ],
        materials: ["Dry blanket"],
        apSpecific:
          "AP rivers: cooler in Dec–Feb in upper reaches; Godavari tributaries in Araku can be 15°C in winter",
        urgency: "critical",
      },
    ],
  },
  electrocution: {
    id: "electrocution",
    title: "Electrocution",
    icon: "⚡",
    description: "Electric shock first aid and safety",
    scenarios: [
      {
        id: "el1",
        title: "Electric Shock First Aid",
        description: "Help a person electrocuted indoors.",
        steps: [
          "Do NOT touch victim while they are in contact with live source",
          "Switch off main breaker or unplug source",
          "Push victim away with dry non-conductive material (wooden stick, plastic chair)",
          "Once safe: check breathing; begin CPR if needed",
          "Call 108 — internal burns may not be visible",
        ],
        materials: ["Dry wood stick", "Rubber gloves"],
        apSpecific:
          "AP: APSPDCL emergency 1912; many electrocution deaths in AP from leaking household wiring during monsoon",
        urgency: "critical",
      },
      {
        id: "el2",
        title: "Downed Power Line Safety",
        description: "Survive contact with downed high-voltage line.",
        steps: [
          "If in car near downed line: stay inside until power confirmed off",
          "If you must exit: shuffle feet — do NOT lift feet (step potential)",
          "Keep 10 m distance from any downed wire",
          "Call APSPDCL 1912 immediately",
          "Warn others — yell and wave to keep people away",
        ],
        materials: ["Knowledge only"],
        apSpecific:
          "AP: APSPDCL covers south AP, APEPDCL north AP; emergency 1912 responds within 30 min in cities",
        urgency: "critical",
      },
      {
        id: "el3",
        title: "Lightning Strike Response",
        description: "Help a person struck by lightning.",
        steps: [
          "Safe to touch victim — lightning strike survivors are NOT charged",
          "Check pulse and breathing; begin CPR if needed",
          "Look for entry and exit burns",
          "Move to shelter from further lightning",
          "Call 108 — heart arrhythmia can develop later",
        ],
        materials: ["Flat open ground"],
        apSpecific:
          "AP: lightning deaths peak in pre-monsoon (May–June) in Andhra and Rayalaseema; highest in farming areas",
        urgency: "critical",
      },
      {
        id: "el4",
        title: "Electrical Fire from Wiring",
        description: "Handle fire caused by electrical fault.",
        steps: [
          "Switch off main breaker before any water use",
          "Use CO2 or dry powder extinguisher only",
          "Do NOT use water on electrical fire",
          "Evacuate if fire spreads to walls or ceiling",
          "Call 101 and APSPDCL 1912",
        ],
        materials: ["CO2 extinguisher"],
        apSpecific:
          "AP: summer power surges cause wiring fires; use MCB (miniature circuit breaker) for protection",
        urgency: "critical",
      },
    ],
  },
};

// General survival survival data
export interface SurvivalScenario {
  id: string;
  title: string;
  content: string;
  steps: string[];
  tips: string[];
  apContext: string;
}

export interface GeneralCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  scenarios: SurvivalScenario[];
}

export const GENERAL_SURVIVAL: Record<string, GeneralCategory> = {
  water: {
    id: "water",
    label: "Water",
    icon: "💧",
    color: "oklch(0.55 0.12 220)",
    scenarios: [
      {
        id: "w1",
        title: "Boiling Water",
        content:
          "Most reliable purification. Kills bacteria, viruses, and parasites.",
        steps: [
          "Collect water in metal container",
          "Boil for 5 minutes (10 min at altitude)",
          "Cool in closed container",
          "Drink within 24 hours",
        ],
        tips: [
          "Add pinch of salt to improve taste",
          "Let sediment settle before boiling",
        ],
        apContext: "AP rural: use wood or dung cake fuel when LPG unavailable",
      },
      {
        id: "w2",
        title: "SODIS (Solar Disinfection)",
        content: "Use sunlight to disinfect water in clear PET bottles.",
        steps: [
          "Fill clear 1.5L PET bottle with water",
          "Filter sediment first with cloth",
          "Place in direct sunlight on corrugated iron for 6 hours",
          "48 hours if cloudy",
        ],
        tips: [
          "Works best at AP summer temperatures (>35°C)",
          "Bottle must be clear PET, not green or opaque",
        ],
        apContext:
          "Free and effective in AP summer; Coke/Bisleri bottles work well",
      },
      {
        id: "w3",
        title: "Chlorine Tablet Purification",
        content: "Chemical disinfection using water purification tablets.",
        steps: [
          "1 Aquatab / WaterGuard tablet per litre",
          "Crush and dissolve completely",
          "Wait 30 minutes before drinking",
          "Effective against bacteria and viruses",
        ],
        tips: [
          "Less effective against Cryptosporidium — combine with filtration",
          "Tastes slightly of chlorine — normal",
        ],
        apContext:
          "AP PHCs distribute free chlorine tabs during floods and drought emergencies",
      },
      {
        id: "w4",
        title: "Sand & Charcoal Filter",
        content: "DIY bio-filter for turbid water using local materials.",
        steps: [
          "Layer in container (bottom to top): gravel, coarse sand, fine sand, charcoal, fine sand",
          "Allow water to pass through slowly",
          "Collect filtered water and still boil or chlorinate",
          "Replace charcoal layer after 2 weeks",
        ],
        tips: [
          "Filter removes sediment and improves taste; does NOT kill viruses alone",
          "Charcoal from wood fire works",
        ],
        apContext:
          "AP rivers carry high silt in monsoon; filter first before SODIS or boiling",
      },
      {
        id: "w5",
        title: "Collecting Rainwater",
        content: "Harvest rain during AP monsoon.",
        steps: [
          "Clean roof/plastic sheet before collection",
          "First 5 minutes of rain: discard (washes dust)",
          "Collect in clean containers with lids",
          "Use within 3 days or purify",
        ],
        tips: [
          "Avoid collection near chemical factories or after cyclone",
          "Store in dark cool place",
        ],
        apContext:
          "AP monsoon: June–September on coast; October–December in Rayalaseema and interior",
      },
      {
        id: "w6",
        title: "Dew Collection",
        content: "Collect moisture from air in dry conditions.",
        steps: [
          "Spread plastic sheet on ground in open area at sunset",
          "Dew forms overnight on sheet",
          "Collect with squeegee or tilt sheet into container",
          "May yield 100–500 mL per night",
        ],
        tips: [
          "Best in coastal areas with high humidity",
          "Dark colored cloth collects more",
        ],
        apContext:
          "AP coastal areas: high humidity 70–80% makes dew collection viable near Vizag, Kakinada",
      },
      {
        id: "w7",
        title: "Finding Underground Water",
        content: "Locate groundwater in dry terrain.",
        steps: [
          "Look at vegetation: dense green patches in dry area indicate water",
          "Follow dry stream bed to lowest point and dig",
          "Cactus and fig trees indicate groundwater nearby",
          "Dig V-shaped trench at outer bend of dry river curve",
        ],
        tips: [
          "Morning: walk and listen for frogs/insects — near water",
          "Rock crevices after rain hold trapped water",
        ],
        apContext:
          "AP Rayalaseema: shallow wells (5–8 m) often find water in alluvial patches along Tungabhadra tributaries",
      },
      {
        id: "w9",
        title: "ORS Emergency Rehydration",
        content: "Make oral rehydration solution from household ingredients.",
        steps: [
          "1 litre clean boiled water",
          "6 level teaspoons of sugar",
          "Half teaspoon of salt",
          "Mix thoroughly until dissolved",
          "Give 200 mL every 30 min for adult; 100 mL for child",
        ],
        tips: [
          "Taste should be no saltier than tears",
          "Coconut water can replace if available",
        ],
        apContext:
          "AP PHCs distribute free ORS sachets (JEEVAN JAL) during heatwave and flood seasons",
      },
      {
        id: "w10",
        title: "Iodine Water Purification",
        content: "Use iodine solution when tablets unavailable.",
        steps: [
          "2% tincture of iodine (common in first aid kits)",
          "5 drops per litre of clear water; 10 drops if cloudy",
          "Wait 30 minutes before drinking",
          "Effective against bacteria and viruses",
          "Poor taste: add vitamin C tablet to neutralize after waiting",
        ],
        tips: [
          "Do not use for pregnant women or thyroid patients",
          "Iodine darkens water — normal",
        ],
        apContext:
          "Available at all Indian pharmacies; standard first aid kit item in AP",
      },
      {
        id: "w11",
        title: "Transpiration Water Bag",
        content: "Extract water from plant leaves without cutting them.",
        steps: [
          "Tie clear plastic bag over leafy branch in sunlight",
          "Seal bag opening tightly with cloth strip",
          "Wait 3–6 hours — condensation collects in bag corner",
          "Collect 100–400 mL per bag per day",
          "Taste for bitterness before drinking",
        ],
        tips: [
          "Use healthy non-toxic plants only",
          "Non-toxic: mango, neem, tamarind, banana",
        ],
        apContext:
          "AP forests: mango and neem trees in Eastern Ghats yield good transpiration water",
      },
      {
        id: "w12",
        title: "Emergency Water from Plants",
        content: "Extract water from AP forest plants.",
        steps: [
          "Banana stem: cut at ground level and scoop the hollow; water pools in 30 min",
          "Bamboo: shake internodes; water collects inside fresh bamboo",
          "Vine water: cut vine high and low; drink from lower end",
          "Cactus water: only barrel cactus; peel outer layer, mash pulp for moisture",
          "Purify all plant water before drinking",
        ],
        tips: [
          "Not all vines yield safe water; avoid milky or colored sap",
          "Banana stem water is safest of all plant sources",
        ],
        apContext:
          "AP: banana plants abundant in delta and coastal areas; bamboo groves in Godavari forests",
      },
      {
        id: "w13",
        title: "Water Storage Without Container",
        content: "Improvise water storage in emergency.",
        steps: [
          "Banana leaf funnel: roll into cone shape; holds 2-3 litres",
          "Dig clay pit: line with plastic sheet; seal edges with stones",
          "Use clothing: soak at water source, carry to camp, wring out",
          "Plastic bag (any): fill and tie; can carry 5-10 litres",
          "Bamboo internode container: cut section between two nodes; natural cup",
        ],
        tips: [
          "Store water in shade; dark cloth cover reduces evaporation",
          "Multiple small containers are better than one large one",
        ],
        apContext:
          "AP tribal technique: wide bamboo sections used as water containers in Eastern Ghats forests",
      },
      {
        id: "w8",
        title: "Coconut Water Emergency Use",
        content: "Use coconut water as emergency oral rehydration.",
        steps: [
          "Green (tender) coconut: 200–400 mL natural electrolyte",
          "Natural sterile if unopened",
          "Add a pinch of salt if working hard or sweating heavily",
          "Coconut water is NOT a substitute for clean water in large amounts",
        ],
        tips: [
          "One coconut = ~15 min electrolyte replacement",
          "Available throughout AP coast and delta year-round",
        ],
        apContext:
          "AP: coconut trees in every coastal and delta village — emergency resource; price Rs 15–25/coconut",
      },
    ],
  },
  night_survival: {
    id: "night_survival",
    label: "Night Safety",
    icon: "🌙",
    color: "oklch(0.65 0.18 260)",
    scenarios: [
      {
        id: "ns1",
        title: "Surviving Night Outdoors in AP Summer",
        content: "Stay safe during hot AP nights without shelter.",
        steps: [
          "Dig shallow body-width trench 30 cm deep; cooler by 5-7 degrees",
          "Line with dry leaves for insulation from ground heat",
          "Wet cloth over face: cools breathing air",
          "Avoid sleeping under trees with night-active insects",
          "Pre-dawn is coldest and safest for movement",
        ],
        tips: [
          "AP May nights: still 30+ degrees in Rayalaseema",
          "Northeast monsoon season: cold nights in hills",
        ],
        apContext:
          "AP: Araku Valley winter nights reach 4-8 degrees; coastal nights humid 28 degrees even in summer",
      },
      {
        id: "ns2",
        title: "Night Navigation in AP",
        content: "Move safely at night when necessary.",
        steps: [
          "Use torch sparingly; saves battery",
          "Let eyes adjust: wait 10 min before moving in dark",
          "Move from landmark to landmark; avoid open ground",
          "Mark your pace count: 100 paces = approximately 80 m",
          "Dhruva Nakshatra (North Star) visible most AP nights for direction",
        ],
        tips: [
          "Red light preserves night vision",
          "AP: half-moon gives enough light on open ground",
        ],
        apContext:
          "AP forests: night movement in Eastern Ghats risky due to wildlife; move only if urgent",
      },
      {
        id: "ns3",
        title: "Insect and Wildlife Protection",
        content: "Protect against insects and animals at night.",
        steps: [
          "Smoke fire near sleeping area: deters mosquitoes",
          "Neem leaves on fire produce strong insect-repelling smoke",
          "Sleep raised off ground; check shoes before wearing",
          "Circle of ash around sleeping area: deters ants and some snakes",
          "Make noise when moving: warns snakes and animals",
        ],
        tips: [
          "Citronella or neem oil on skin as repellent",
          "AP forests: Russell's viper active at night",
        ],
        apContext:
          "AP: Odomos mosquito cream available at all pharmacies; malaria risk in Visakhapatnam Agency",
      },
      {
        id: "ns4",
        title: "Fire for Warmth and Protection at Night",
        content: "Maintain a safe warming fire through the night.",
        steps: [
          "Reflector fire: build stone wall on one side to direct heat toward sleeping area",
          "Use large dense wood for slow overnight burn",
          "Star fire: logs arranged in star, push inward as they burn",
          "Never sleep so close that sparks could ignite clothing",
          "Keep water nearby for fire control",
        ],
        tips: [
          "Hardwood (teak, neem) burns 4-6 hours; softwood 1-2 hours",
          "Fire circle of 3 small fires provides all-around warmth",
        ],
        apContext:
          "AP winter: Araku Valley, Lambasingi temperatures 5-10 degrees; fire essential for warmth",
      },
      {
        id: "ns5",
        title: "Watch Schedule for Group Safety",
        content: "Organize night watch rotation in a group.",
        steps: [
          "Divide night into equal shifts: 3 people = 2-3 hours each",
          "Watcher checks perimeter every 30 min",
          "3 alert signals: 1 short whistle = attention; 3 = emergency",
          "Log events with time in watch notebook",
          "Wake next watcher 5 min before shift change",
        ],
        tips: [
          "Alert but not anxious",
          "Rotate so no one has 2 AM-4 AM slot more than once",
        ],
        apContext:
          "AP tribal night watch: Kondh community's 'night walk' tradition involves perimeter check every 2 hrs",
      },
    ],
  },
  shelter: {
    id: "shelter",
    label: "Shelter",
    icon: "🏠",
    color: "oklch(0.82 0.15 85)",
    scenarios: [
      {
        id: "sh0",
        title: "Selecting a Safe Campsite",
        content: "Choose the best location for emergency shelter.",
        steps: [
          "High ground: avoid valleys and dry stream beds (flash flood risk)",
          "Windward edge of trees: shelter without overhanging dead branches",
          "South-facing slope in winter: more sunlight and warmth",
          "Away from ant hills, wasp nests, and dense undergrowth",
          "10 m from water source: mosquitoes and flooding risk",
        ],
        tips: [
          "Look up before setting up: check for dead branches",
          "Test ground for drainage",
        ],
        apContext:
          "AP hill camps: avoid flat valley floors in Eastern Ghats during Oct–Dec monsoon; ridgeline spots best",
      },
      {
        id: "sh1",
        title: "Emergency Tarpaulin Shelter",
        content: "Quick waterproof shelter from a tarpaulin.",
        steps: [
          "Tie rope between two trees at shoulder height",
          "Drape tarpaulin over rope",
          "Peg corners to ground with stakes",
          "Angle one side steeply to shed rain",
        ],
        tips: [
          "Align opening away from prevailing wind",
          "Dig drainage trench around perimeter",
        ],
        apContext:
          "AP post-cyclone: NDRF distributes 8x10 ft tarpaulins to affected families in coastal districts",
      },
      {
        id: "sh1b",
        title: "Polythene Sheet Poncho",
        content: "Improvise rain protection from plastic sheeting.",
        steps: [
          "Cut hole in center of large polythene sheet for head",
          "Wear as rain poncho over clothing",
          "Tie corners to belt or rope for wind stability",
          "Double layer for heavy AP monsoon rain",
          "Dry inside surface each morning to prevent skin rash",
        ],
        tips: [
          "Black polythene retains heat at night",
          "Avoid during lightning",
        ],
        apContext:
          "AP cyclone relief packs include 8x12 ft polythene sheets; stores in sachivalayam warehouse",
      },
      {
        id: "sh2",
        title: "Debris Hut",
        content: "Warm insulating shelter from natural materials.",
        steps: [
          "Place 3 m long pole in fork of low branch",
          "Lean sticks along both sides",
          "Pile leaves/dry grass thickly (arm's length depth)",
          "Make entrance just big enough to crawl through",
        ],
        tips: [
          "Leaf pile must be thick enough to stay dry inside",
          "Build on dry elevated ground",
        ],
        apContext:
          "AP Eastern Ghats: dry teak leaves and bamboo make excellent insulation material",
      },
      {
        id: "sh2b",
        title: "Raised Sleeping Platform",
        content: "Stay off ground to avoid insects, snakes, and dampness.",
        steps: [
          "4 corner posts driven into ground: 45 cm height",
          "Lay horizontal bamboo poles across",
          "Lash tightly with split bamboo strips or vine",
          "Cover with broad leaves or flattened cardboard",
          "Test by sitting before sleeping on it",
        ],
        tips: [
          "Smear ash on posts: deters ants and scorpions",
          "Gap between poles allows airflow",
        ],
        apContext:
          "AP flood zones: sleeping platform essential during inundation; bamboo available throughout AP river basins",
      },
      {
        id: "sh3",
        title: "Bamboo Emergency Shelter",
        content: "Build a quick shelter using available bamboo.",
        steps: [
          "4 corner posts: bamboo poles driven 30 cm into ground",
          "Horizontal cross beams tied with strips of bamboo",
          "Roof: overlap bamboo leaves or coconut fronds",
          "Walls: split bamboo woven in basket pattern",
        ],
        tips: [
          "Bamboo ties dry tighter — pre-soak if possible",
          "Floor: raise with bamboo platform 15 cm off ground",
        ],
        apContext:
          "AP tribal areas: Araku, Paderu, LB Nagar have abundant bamboo; Kondh and Koya communities are expert bamboo builders",
      },
      {
        id: "sh3b",
        title: "Termite-Proof Field Shelter",
        content: "Protect wood shelter from AP termite damage.",
        steps: [
          "Soak posts in used engine oil or kerosene before driving into ground",
          "Apply ash ring around base of each post",
          "Inspect daily for termite tunnels",
          "Use hardwood (teak, sal) for posts — more termite resistant",
          "Raise structure off ground where possible",
        ],
        tips: [
          "Neem oil spray deters most insects",
          "Red laterite soil has fewer termites",
        ],
        apContext:
          "AP Eastern Ghats: termite damage is severe in sandy soil areas of Krishna delta; treat posts before monsoon",
      },
      {
        id: "sh4",
        title: "Urban Shelter in Disaster",
        content: "Find safe shelter in urban AP after disaster.",
        steps: [
          "Government school/college: most common official shelter",
          "Look for NDRF orange flags on buildings",
          "Religious institutions: temples/churches often open for shelter",
          "Avoid: damaged buildings, underpasses, drainage channels",
          "Register at shelter for food and medical access",
        ],
        tips: ["Keep together as family", "Mark your name on entry register"],
        apContext:
          "AP District Collectors open govt schools as temporary shelters; Vijayawada: Indira Gandhi Municipal Stadium used in 2020 floods",
      },
      {
        id: "sh5",
        title: "Heat Management in Shelter",
        content: "Keep emergency shelter cool in AP heat.",
        steps: [
          "Orient shelter opening to prevailing breeze",
          "Use palmyra / coconut leaf thatch — natural insulator",
          "Hang wet jute sack in opening for evaporative cooling",
          "Sleep on ground (cooler air)",
          "Pre-cool with water spray before sleeping",
        ],
        tips: [
          "Khus (vetiver) mat in doorway reduces temperature 8°C",
          "White-painted surface reduces heat absorption 40%",
        ],
        apContext:
          "AP summer: even at night Kurnool and Nandyal may be 35°C+; shade cloth from APCO available at subsidized cost",
      },
    ],
  },
  tools: {
    id: "tools",
    label: "Tools",
    icon: "🔧",
    color: "oklch(0.60 0.12 60)",
    scenarios: [
      {
        id: "tl1",
        title: "Improvised Knife from Stone",
        content: "Make a cutting tool from flint or quartzite.",
        steps: [
          "Find flat quartzite or obsidian-like stone",
          "Knap (chip) edge using another hard stone as hammerstone",
          "Strike at 45-degree angle on edge to create flake",
          "Wrap base with cloth for grip",
          "Useful for cutting rope, food, and wood",
        ],
        tips: [
          "Work away from body",
          "Flint edges are razor sharp; handle carefully",
        ],
        apContext:
          "AP Eastern Ghats: white quartzite pebbles in Godavari and Tungabhadra river gravels; tribal use documented",
      },
      {
        id: "tl2",
        title: "Bamboo Multi-Tool",
        content: "Use bamboo for multiple survival tool needs.",
        steps: [
          "Knife: split bamboo along grain; one side razor sharp when dry",
          "Container: section between two nodes; natural sealed cup",
          "Pole: for shelter frame, carrying pole, weapon",
          "Fire piston: green bamboo telescoped section for fire lighting",
          "Cooking: stuff rice into green bamboo section and roast on fire",
        ],
        tips: [
          "Green bamboo is flexible; dry bamboo is brittle but sharper",
          "AP bamboo groves are free community resources",
        ],
        apContext:
          "AP: Godavari delta and Eastern Ghats have abundant bamboo; Kondapalli area known for bamboo craft",
      },
      {
        id: "tl3",
        title: "Rope Making from Natural Materials",
        content: "Make strong rope from AP plants.",
        steps: [
          "Banana fiber: pull long strands from banana stalk; twist 3 together",
          "Coconut husk fiber (coir): twist and braid 3 strands; very strong",
          "Grass rope: gather 20+ long grass stems; braid in 3-strand plait",
          "Test strength before use: a 1 cm banana fiber rope holds 50 kg",
          "Join sections with reef knot (right over left, left over right)",
        ],
        tips: [
          "Wet natural rope shrinks and tightens",
          "Coir is most durable; banana fiber most readily available in AP",
        ],
        apContext:
          "AP: coconut husk rope making traditional in coastal districts; commercial coir industry in Nellore",
      },
      {
        id: "tl4",
        title: "Improvised Carrying Tools",
        content: "Carry supplies without bags using local materials.",
        steps: [
          "Sari/dhoti as bundle: tie corners, carry on head AP-style",
          "Bamboo yoke: shoulder pole balances two loads",
          "Basket from palm leaves: weave in 30 min; holds 5-10 kg",
          "Sled drag: flat wood dragged behind over smooth ground",
          "Carry injured person: chair carry (2 people, interlocked hands)",
        ],
        tips: [
          "Head carry distributes weight through spine",
          "AP hill women carry 20 kg on head over long distances",
        ],
        apContext:
          "AP: head carry traditional for water pots; bamboo yoke for farm loads; well-suited for AP terrain",
      },
      {
        id: "tl5",
        title: "Digging Tools Without Metal",
        content: "Dig without a shovel using available materials.",
        steps: [
          "Sharpened hardwood stick: digging stick for soft soil",
          "Flat stone: scraping and scoop tool in sandy soil",
          "Coconut shell halves: effective scoop for loose material",
          "Improvised mattock: stone bound to stick with coir rope",
          "Bamboo segment with sharpened end: good for soft ground",
        ],
        tips: [
          "Dig in early morning; soil is cooler and easier",
          "Alternate diggers every 15 min to avoid fatigue",
        ],
        apContext:
          "AP: iron wood (Prosopis juliflora) and neem wood make durable digging sticks; very common",
      },
    ],
  },
  fire: {
    id: "fire",
    label: "Fire",
    icon: "🔥",
    color: "oklch(0.60 0.14 40)",
    scenarios: [
      {
        id: "fr0",
        title: "Tinder and Fuel Collection",
        content: "Gather the right materials before attempting fire.",
        steps: [
          "Tinder: dry grass, seed fluff, dead leaf powder, dried fungus",
          "Kindling: dry twigs pencil-thick; snap to test dryness",
          "Fuel: wrist-thick dry branches; dense wood for long burn",
          "Collect 3x more than you think needed",
          "Store under shelter if rain expected",
        ],
        tips: [
          "Dryness is 90% of fire success",
          "Inner bark of fallen trees stays drier than surface",
        ],
        apContext:
          "AP Eastern Ghats: dry teak leaves make excellent tinder; neem branches ignite quickly; mango burns long",
      },
      {
        id: "fr1",
        title: "Friction Fire — Bow Drill",
        content: "Make fire using friction when no matches available.",
        steps: [
          "Fireboard: dry flat softwood (teak, neem, bamboo)",
          "Spindle: straight dry stick 45 cm, pointed end",
          "Bow: curved branch with shoelace/string",
          "Rotate spindle fast until ember forms in notch",
          "Transfer ember to tinder bundle, blow gently",
        ],
        tips: [
          "Both pieces must be DRY — this is the most critical factor",
          "Downward pressure + speed together",
        ],
        apContext:
          "AP Eastern Ghats: dry neem and teak are ideal; tribal communities use this method in Araku and Paderu",
      },
      {
        id: "fr2",
        title: "Fire Starting with Flint/Quartz",
        content: "Strike sparks using rock in AP hill areas.",
        steps: [
          "Find white quartz or flint (common in AP hills)",
          "Strike at sharp angle against steel tool",
          "Direct sparks onto dry fungus or charcloth tinder",
          "Blow gently when tinder smolders",
          "Transfer to main tinder nest",
        ],
        tips: [
          "Quartz found in AP Eastern Ghats riverbeds",
          "Dried fungus from tree bark is ideal tinder",
        ],
        apContext:
          "AP tribal areas: Koya and Savara communities know local flint sources; white quartz in Godavari riverbed gravels",
      },
      {
        id: "fr3",
        title: "Emergency Cooking Fire",
        content: "Build an efficient fire for cooking with minimal fuel.",
        steps: [
          "Keyhole fire: 3 rocks in V-shape, narrow end for pot",
          "Feed sticks from wider end as needed",
          "Small flames more efficient than large bonfire",
          "Use dry dense wood: teak, neem, mango",
          "Windshield: arrange stones to block wind",
        ],
        tips: [
          "Bark burns longer than branches",
          "Pre-heat pot before putting food in",
        ],
        apContext:
          "AP: rice cooking needs about 30 min on small fire; one pot cooking (khichdi) is fuel efficient",
      },
      {
        id: "fr3b",
        title: "Fire Safety and Extinguishing",
        content: "Control and safely put out a survival fire.",
        steps: [
          "Always clear 1 m radius around fire of flammable material",
          "Never leave fire unattended",
          "Extinguish with water: pour slowly starting at edges",
          "Stir ashes and pour more water until no steam or smoke",
          "Check ashes with bare hand 15 cm above before leaving",
        ],
        tips: [
          "Sand smothers fire faster than water in dry conditions",
          "Never pour water on LPG fire",
        ],
        apContext:
          "AP forest fire rule: dead fire must be confirmed before leaving camp; Forest Dept 1926 to report",
      },
      {
        id: "fr4b",
        title: "Fire for Water Boiling",
        content: "Efficiently boil water over a small survival fire.",
        steps: [
          "Use a small focused fire — not a large bonfire",
          "Metal container directly on coals is most efficient",
          "Cover pot to boil faster and retain heat",
          "Rolling boil for 1 full minute kills all pathogens",
          "Cool in shade; store in sealed container",
        ],
        tips: [
          "Clay pots work but crack if heated too fast",
          "Aluminium vessels heat fastest",
        ],
        apContext:
          "AP villages: aluminum patela and steel tumbler standard in every household for emergency water boiling",
      },
      {
        id: "fr4",
        title: "Signal Fire",
        content: "Build a fire to signal for rescue.",
        steps: [
          "Build on high open ground — visible from air",
          "Daytime: add green leaves/rubber/plastic for black smoke",
          "Nighttime: bright flame — add dry wood",
          "3 fires in triangle = international distress signal",
          "SOS: 3 short, 3 long, 3 short fires",
        ],
        tips: [
          "Keep fire material pre-arranged for quick lighting",
          "Damp wood creates more smoke",
        ],
        apContext:
          "AP coastal: coast guard aircraft patrol; Eastern Ghats: forest dept helicopter patrols Feb–May",
      },
    ],
  },
  navigation: {
    id: "navigation",
    label: "Nav",
    icon: "🧭",
    color: "oklch(0.65 0.18 145)",
    scenarios: [
      {
        id: "nav0",
        title: "Lost in Forest — Initial Actions",
        content: "Immediate steps when you realize you are lost.",
        steps: [
          "STOP: Stop, Think, Observe, Plan",
          "Stay put if rescue is expected within 24 hours",
          "Mark your location: break branches, leave cloth strips",
          "Note last known landmark and time",
          "Three whistles or shouts = universal distress signal",
        ],
        tips: [
          "Panic burns energy and leads to further disorientation",
          "Rescuers look for people near where they were last seen",
        ],
        apContext:
          "AP Eastern Ghats: forest guards patrol Araku Valley and Paderu areas; blow whistle every 15 min",
      },
      {
        id: "nav1",
        title: "Sun Navigation",
        content: "Find direction using the sun in AP.",
        steps: [
          "Morning: sun rises roughly east",
          "Noon: sun due south in India (southern hemisphere sky)",
          "Afternoon: sun in west",
          "Analog watch method: point hour hand at sun; south is halfway between hour hand and 12",
        ],
        tips: [
          "AP: sun path shifts slightly with season but reliable within 20°",
          "Works even on partly cloudy days",
        ],
        apContext:
          "AP latitude 13–19°N: sun slightly south of overhead year-round; reliable compass",
      },
      {
        id: "nav2",
        title: "Star Navigation (Dhruva Nakshatra)",
        content: "Find north using Polaris (North Star) at night.",
        steps: [
          "Find Saptarshi (Big Dipper/Ursa Major) — visible in AP skies",
          "Two pointer stars: follow line 5x the gap length",
          "Polaris (Dhruva Nakshatra) is bright star at end",
          "Polaris = north; turn 90° left = west; right = east",
        ],
        tips: [
          "Polaris appears at ~15° altitude in AP (latitude)",
          "Visible year-round in AP; not obscured in monsoon (often cloudy)",
        ],
        apContext:
          "AP tribal navigation: Koya community uses star paths in Godavari forest areas",
      },
      {
        id: "nav3",
        title: "Natural Landmarks Navigation in AP",
        content: "Use AP-specific natural features for orientation.",
        steps: [
          "Rivers: Godavari flows east, Krishna flows southeast to coast",
          "Hills (Eastern Ghats): lie roughly NE-SW",
          "Coast: on your right when walking south",
          "Wind: AP east coast — northeast wind = winter, southwest = monsoon",
        ],
        tips: [
          "AP hill ranges visible from 50 km in clear weather",
          "Roads generally run parallel to rivers",
        ],
        apContext:
          "AP navigation: Godavari + Eastern Ghats are primary landmarks; NH 16 runs N-S along coast",
      },
      {
        id: "nav3b",
        title: "River Navigation Downstream",
        content: "Follow rivers to reach civilization.",
        steps: [
          "Rivers always lead to civilization eventually",
          "Walk river bank — do not wade in current",
          "Mark each bend with stone cairn to avoid looping",
          "Cross only at shallow wide points",
          "Downstream = toward sea / lower ground / villages",
        ],
        tips: [
          "Listen for waterfalls before approaching riverbank",
          "Morning: river level drops — safer for crossing",
        ],
        apContext:
          "AP: following Godavari or Krishna downstream leads to major towns; tributaries lead to tribal villages",
      },
      {
        id: "nav4b",
        title: "Emergency Trail Marking",
        content: "Mark your path to avoid getting more lost.",
        steps: [
          "Break branches at eye level on right side of path taken",
          "Stack 3 stones in cairn to mark decision points",
          "Scratch arrows on tree trunks",
          "Leave cloth strip tied high at camp location",
          "Note direction by sun at start",
        ],
        tips: [
          "Mark every 50 m in dense forest",
          "Triangular stone cairn = camp direction",
        ],
        apContext:
          "AP forest tribal practice: Koya community uses notched bamboo poles to mark forest paths",
      },
      {
        id: "nav4",
        title: "Mobile GPS Without Data",
        content: "Use phone GPS when there is no mobile internet.",
        steps: [
          "Download offline maps before emergency: OsmAnd, Maps.me",
          "GPS works without internet (satellite based)",
          "Enable location services, wait 2 min for satellite lock",
          "AP offline topo maps available on OsmAnd India server",
        ],
        tips: [
          "GPS uses battery fast — airplane mode for everything except GPS",
          "External GPS dongle extends range in forest valleys",
        ],
        apContext:
          "AP: OsmAnd Andhra Pradesh map pack covers all roads to village level, offline 120 MB",
      },
    ],
  },
  food: {
    id: "food",
    label: "Food",
    icon: "🍎",
    color: "oklch(0.70 0.14 110)",
    scenarios: [
      {
        id: "fd0",
        title: "Universal Edibility Test",
        content: "Test unknown plant before eating in emergency.",
        steps: [
          "Separate plant part: test only one part at a time",
          "Skin test: rub on inner wrist, wait 15 min for reaction",
          "Lip test: touch to lips, wait 3 min",
          "Tongue test: hold small piece on tongue 15 min; no burning = proceed",
          "Eat only a thumbnail-sized amount; wait 8 hours before eating more",
        ],
        tips: [
          "Never test mushrooms with this method",
          "Bitter/burning taste = stop immediately",
        ],
        apContext:
          "AP forest: avoid any milky sap or strongly bitter plants; most AP ferns are edible when cooked",
      },
      {
        id: "fd1",
        title: "Emergency Food Prioritization",
        content: "Decide what to eat when supplies are scarce.",
        steps: [
          "Caloric priority: rice > dal > oil > vegetables > fruits",
          "Average adult needs 1500–2000 kcal/day",
          "Protein minimum: 50g/day (100g dal)",
          "Fat essential: 1 tsp oil/day prevents essential fatty acid deficiency",
          "Infants and pregnant women get priority for protein foods",
        ],
        tips: [
          "Half rations can sustain for 2x longer in emergency",
          "Never skip salt — electrolyte loss causes weakness",
        ],
        apContext:
          "AP emergency food: rice from PDS, dal available everywhere; mirchi (chilli) provides vitamin C",
      },
      {
        id: "fd2",
        title: "Wild Edible Plants in AP",
        content: "Safe wild edible plants found in Andhra Pradesh.",
        steps: [
          "Gongura (sorrel): grows wild in AP — edible leaves, sour taste",
          "Drumstick leaves (Moringa): high protein and iron",
          "Purslane (Paruppu Keerai): succulent leaves, edible raw",
          "Tamarind pods and leaves: edible and common",
          "Neem flowers: bitter but edible in small amounts",
        ],
        tips: [
          "Rule: if it smells of almond/cyanide, do not eat",
          "Skin test: rub on wrist, wait 30 min before eating unfamiliar plant",
        ],
        apContext:
          "AP forest edibles: arrowroot tubers (Maranta) in Eastern Ghats; jackfruit, wood apple in coastal forests",
      },
      {
        id: "fd2b",
        title: "Insects as Emergency Protein",
        content: "Safe edible insects available in AP.",
        steps: [
          "Termites: collect from mounds; dry-fry or boil; nutty flavor",
          "Grasshoppers: remove wings and legs; roast on coal",
          "Ants: large black ants edible when roasted",
          "Grubs under dead bark: high fat protein; roast thoroughly",
          "Avoid brightly colored insects — warning coloration",
        ],
        tips: [
          "Always cook insects — never eat raw",
          "Remove wings, antennae, stingers first",
        ],
        apContext:
          "AP tribal food: termites (regidi) eaten in Visakhapatnam Agency; prawn-like taste; high protein",
      },
      {
        id: "fd3",
        title: "Emergency Food Storage",
        content: "Store food to last weeks without refrigeration.",
        steps: [
          "Rice: airtight container with bay leaves to repel insects",
          "Dal: mix with small amount of oil to prevent weevil",
          "Salt, sugar, jaggery: indefinite shelf life",
          "Pickles (avakaya, gongura): months without fridge",
          "Canned foods: check expiry; use oldest first",
        ],
        tips: [
          "AP traditional: buried clay pot (matka) storage keeps food cool and dry",
          "Turmeric as natural preservative in ground spices",
        ],
        apContext:
          "AP traditional storage: coconut oil-sealed containers, neem leaf layers in rice — no chemicals needed",
      },
      {
        id: "fd3b",
        title: "Foraging Roots and Tubers",
        content: "Find starchy emergency food underground.",
        steps: [
          "Arrowroot (Maranta): white tuber, boil thoroughly; AP Eastern Ghats",
          "Elephant foot yam (Suran/Kanda): peel and boil; do NOT eat raw",
          "Tapioca (cassava): peel and cook well; raw is toxic",
          "Lotus root: in AP ponds and lake margins; edible boiled",
          "Wild garlic: small bulbs near streams; strong smell",
        ],
        tips: [
          "All roots must be cooked — raw starchy roots cause digestive issues",
          "Wash soil completely before cooking",
        ],
        apContext:
          "AP: arrowroot grown commercially in Srikakulam, Vizag Agency; available wild in forest streams",
      },
      {
        id: "fd4",
        title: "One-Pot Khichdi Survival Meal",
        content: "Nutritionally complete meal using minimal fuel.",
        steps: [
          "Combine 1 cup rice + 1/2 cup dal in pot",
          "Add 4 cups water, salt, turmeric, cumin",
          "Cook on low fire 25 min with lid",
          "Optional: add dried chilli, onion, mustard seeds",
          "Serves 2 adults — 800 kcal, complete protein",
        ],
        tips: [
          "Pre-soaking rice and dal 30 min saves 40% fuel",
          "Use pressure cooker if available — 5 min on fire",
        ],
        apContext:
          'AP khichdi: staple disaster relief food at AP govt camps; also called "gojju annam" in coastal AP',
      },
      {
        id: "fd4b",
        title: "Fishing Without Equipment",
        content: "Catch fish in AP rivers without rods.",
        steps: [
          "Improvise hook: thorns, wire, bent pin with thread line",
          "Bait: earthworm, beetle, bread ball, cooked rice",
          "Weir trap: arrange stones in V-shape pointing downstream",
          "Hand gathering: shallow pools after flood; collect by hand",
          "Gill net: strip cloth into threads, tie across narrow stream",
        ],
        tips: [
          "Fish near edges at dawn and dusk",
          "After flood: fish trapped in pools easily caught",
        ],
        apContext:
          "AP rivers: small catfish (mural), tilapia common in Krishna and Godavari shallows; easy to hand catch in pools",
      },
      {
        id: "fd5b",
        title: "Dehydrating Food for Storage",
        content: "Preserve food without refrigeration using AP sun.",
        steps: [
          "Slice vegetables thin (3 mm) and spread on clean surface",
          "Place in direct sunlight; cover with mesh to keep flies off",
          "Turn twice daily; 2–3 days for full dehydration",
          "Store in airtight container with silica gel or salt layer",
          "Rehydrate with hot water before eating",
        ],
        tips: [
          "AP summer: 45°C sun dehydrates in 1 day",
          "Mango, papaya, tomato, brinjal dry well",
        ],
        apContext:
          "AP tradition: dried red chillies, tamarind, dried fish are common — all emergency-ready foods",
      },
      {
        id: "fd5",
        title: "Food Safety Testing",
        content: "Check if food is safe to eat in emergency.",
        steps: [
          "Visual: mold (any color) = discard",
          "Smell: rancid, sour, ammonia-like = discard",
          "Canned food: bulging lid or spurting when opened = botulism risk, discard",
          "Cooked rice left >4 hours at 35°C+ = discard (Bacillus cereus risk)",
          "Cook everything thoroughly when in doubt",
        ],
        tips: [
          "When in doubt, throw it out — food poisoning in disaster = compounded emergency",
          "Dry and salty foods: generally safe",
        ],
        apContext:
          "AP summer: coconut chutney, fish curry go bad in 3 hours; rice lasts 6 hours; dry snacks safe for days",
      },
    ],
  },
  medical_field: {
    id: "medical_field",
    label: "Field Medicine",
    icon: "🩹",
    color: "oklch(0.60 0.16 360)",
    scenarios: [
      {
        id: "mf1",
        title: "Eye Injury First Aid",
        content: "Treat foreign body or chemical in eye.",
        steps: [
          "Chemical: flush with clean running water 15-20 min; do not rub",
          "Foreign body: do NOT rub; blink several times to wash out",
          "Rinse with clean water from inner corner outward",
          "Cover with clean pad; do NOT press on eye",
          "Ophthalmologist immediately for chemicals or embedded objects",
        ],
        tips: [
          "Use saline if available",
          "Do not try to remove embedded objects yourself",
        ],
        apContext:
          "AP: RIMS Kadapa, BIRRD Tirupati, GEMS Vizag have 24hr ophthalmology emergency",
      },
      {
        id: "mf2",
        title: "Fracture Improvised Splinting",
        content: "Immobilize broken bones using available materials.",
        steps: [
          "Do NOT straighten the bone; splint in position found",
          "Pad splint material (rolled cloth) before applying",
          "Tie above and below fracture site, not at fracture",
          "Check pulse and sensation below fracture every 15 min",
          "Elevate limb where possible to reduce swelling",
        ],
        tips: [
          "Umbrella, bamboo stick, or folded newspaper work as splints",
          "Sling from shirt for arm fractures",
        ],
        apContext:
          "AP Good Samaritan Law protects helpers; ambulance 108 for bone injuries",
      },
      {
        id: "mf3",
        title: "Severe Bleeding Tourniquet Use",
        content: "Apply tourniquet for life-threatening limb bleeding.",
        steps: [
          "Apply 5 cm above wound on limb",
          "Use belt, torn cloth, or improvised material",
          "Tighten until bleeding stops completely",
          "Write time of application on skin with marker",
          "Do NOT loosen once applied until at hospital",
        ],
        tips: [
          "Tourniquet time limit 2 hours before tissue damage risk",
          "Pain is expected; effectiveness is priority",
        ],
        apContext:
          "AP 108 ambulances carry CAT tourniquets; police and military also carry them",
      },
      {
        id: "mf4",
        title: "Nosebleed Control",
        content: "Stop acute nasal bleeding.",
        steps: [
          "Sit upright; tilt head slightly forward not back",
          "Pinch soft part of nose firmly for 10-15 min",
          "Breathe through mouth; ice pack on bridge of nose",
          "Do not tilt head back; blood goes to throat causing vomiting",
          "Hospital if bleeding over 20 min or after head injury",
        ],
        tips: [
          "Avoid blowing nose for 1 hour after",
          "Nose bleed common in AP extreme heat",
        ],
        apContext:
          "AP summer: nosebleeds common from extreme heat and dry air in Rayalaseema at 45 degrees",
      },
      {
        id: "mf5",
        title: "Sprain RICE Method",
        content: "Treat soft tissue injuries at site.",
        steps: [
          "R: Rest; stop activity immediately",
          "I: Ice pack wrapped in cloth for 20 min every 2 hours",
          "C: Compression bandage (not too tight)",
          "E: Elevate above heart level",
          "Ibuprofen 400 mg for pain; Volini gel topically",
        ],
        tips: [
          "Never apply ice directly on skin",
          "Bandage should not cause tingling below",
        ],
        apContext:
          "AP: Volini gel widely available at all pharmacies; Moov and Iodex also effective",
      },
      {
        id: "mf6",
        title: "Head Injury Observation",
        content: "Monitor a person with head injury.",
        steps: [
          "Keep person awake and talking for 2 hours",
          "Warning: vomiting more than once, confusion, unequal pupils, fits",
          "Do NOT give painkillers that mask symptoms initially",
          "Keep lying with head slightly raised",
          "If unconscious: recovery position, clear airway, 108 immediately",
        ],
        tips: [
          "Check every 30 min: name, date, location",
          "Clear fluid from ear means severe injury",
        ],
        apContext:
          "AP: all major hospitals have CT scan; AIIMS Mangalagiri has neurosurgery unit",
      },
      {
        id: "mf7",
        title: "Heatstroke First Aid Steps",
        content: "Cool a person with life-threatening heat illness.",
        steps: [
          "Move to shade or cool indoors immediately",
          "Remove excess clothing and wet skin with water",
          "Fan vigorously to accelerate cooling",
          "Ice packs at neck, armpits, and groin",
          "Call 108; heatstroke is a medical emergency",
        ],
        tips: [
          "Do not give fluids if unconscious",
          "Temperature above 40 degrees C with confusion is heatstroke",
        ],
        apContext:
          "AP Rayalaseema: heatstroke deaths peak May-June; Ongole, Nandyal, Kurnool most affected",
      },
    ],
  },
  signaling: {
    id: "signaling",
    label: "Rescue Signals",
    icon: "💡",
    color: "oklch(0.82 0.15 85)",
    scenarios: [
      {
        id: "sig1",
        title: "Ground-to-Air Signals",
        content: "Signal search aircraft using ground markings.",
        steps: [
          "SOS: form large letters 10 m size using stones, logs, or cloth",
          "X means need medical help; arrow shows direction of travel; V means need help",
          "Use contrasting materials: dark on light sand, bright cloth on dark ground",
          "Mark in open clear area visible from above",
          "Add signal mirror (CD, tin lid, glass) to reflect sunlight",
        ],
        tips: [
          "Helicopter circles before landing; maintain signal visible",
          "Night: build fire near signal letters",
        ],
        apContext:
          "AP rescue aircraft: Coast Guard Vizag, NDRF Vijayawada; signal area at least 10x10 m",
      },
      {
        id: "sig2",
        title: "Mirror Signaling Technique",
        content: "Use reflected sunlight to signal rescuers.",
        steps: [
          "Hold mirror at chin height facing sun",
          "Tilt until light spot appears on your hand",
          "Aim reflected beam at aircraft or distant point",
          "Flash SOS: 3 short, 3 long, 3 short",
          "Visible up to 15 km in clear weather",
        ],
        tips: [
          "Any shiny surface works: phone screen, tin can lid, foil",
          "Mirror signal more reliable than fire in daytime",
        ],
        apContext:
          "AP summer clear skies: mirror signaling highly effective; signal toward fishing boats on coast",
      },
      {
        id: "sig3",
        title: "Whistle Protocol",
        content: "Use whistle for emergency signaling.",
        steps: [
          "Three blasts = universal distress signal",
          "Blast every minute; listen for response",
          "Two blasts in response means rescuer heard you",
          "Continue blasting to guide rescuers to your location",
          "Sound travels further downwind and at dawn and dusk",
        ],
        tips: [
          "Carry whistle on a lanyard",
          "Voice carries 100 m; whistle carries 1 km",
        ],
        apContext:
          "AP forest ITDA: all field workers carry whistle; 3 blasts is universal distress in AP forest",
      },
      {
        id: "sig4",
        title: "Mobile Phone Emergency Mode",
        content: "Maximize phone for rescue in disaster.",
        steps: [
          "Emergency calls work without SIM in India: dial 112",
          "SMS can send when voice calls fail; text 112 with location",
          "Turn off screen and data; use for calls only to extend battery",
          "Share live location via WhatsApp if internet available",
          "Keep phone at 10 percent minimum; charge from car socket while fuel lasts",
        ],
        tips: [
          "AP forests: BSNL has better coverage in tribal areas",
          "Emergency mode disables all non-essential apps",
        ],
        apContext:
          "AP 112: free emergency number; police, fire, ambulance all dispatched; accepts text from deaf users",
      },
    ],
  },
  mental_health: {
    id: "mental_health",
    label: "Mental Health",
    icon: "🧠",
    color: "oklch(0.65 0.18 280)",
    scenarios: [
      {
        id: "mh1",
        title: "Panic Attack First Aid",
        content: "Help a person having a panic attack in disaster.",
        steps: [
          "Move to safe quiet location",
          "Breathing: in 4 counts, hold 4, out 6; repeat 5 times",
          "5-4-3-2-1 grounding: name 5 things you see, 4 hear, 3 can touch",
          "Reassure: panic attack is not a heart attack; it will pass",
          "Stay with person until fully calm",
        ],
        tips: [
          "Do not say just calm down; use breathing exercise instead",
          "Paper bag breathing helps hyperventilation",
        ],
        apContext:
          "AP DMHO mental health helpline: 1800-599-0019; free counseling in Telugu available",
      },
      {
        id: "mh2",
        title: "Trauma Stress Response",
        content: "Support someone in acute stress after disaster.",
        steps: [
          "Ensure physical safety first",
          "Stay calm and speak slowly; do not crowd or rush",
          "Offer water and practical help (blanket, phone)",
          "Do NOT force them to talk about what happened",
          "iCall helpline: 9152987821 for psychological first aid",
        ],
        tips: [
          "Silence is okay; presence is support",
          "Avoid saying it could have been worse",
        ],
        apContext:
          "AP NIMHANS Kurnool and District Hospital counselors deployed after major disasters",
      },
      {
        id: "mh3",
        title: "Child Trauma Support",
        content: "Help a traumatized child after disaster.",
        steps: [
          "Keep child with familiar caregiver if possible",
          "Maintain routines: meals, sleep, familiar activities",
          "Allow child to express through drawing or play",
          "Answer questions honestly at age-appropriate level",
          "Watch for regression: bedwetting, clinging, nightmares",
        ],
        tips: [
          "Children mirror adult anxiety; stay calm yourself",
          "Limit news exposure for children under 12",
        ],
        apContext:
          "AP ICDS anganwadi workers trained in child psychological first aid during disasters",
      },
    ],
  },
  communication: {
    id: "communication",
    label: "Communication",
    icon: "📞",
    color: "oklch(0.55 0.12 220)",
    scenarios: [
      {
        id: "com1",
        title: "Emergency Radio Frequencies",
        content: "Operate emergency radio during disaster.",
        steps: [
          "AM frequencies for AP: AIR Vijayawada 531 kHz, Vizag 747 kHz",
          "FM: AIR Vijayawada 100.6 MHz, Radio Mirchi Vizag 98.3 MHz",
          "Battery radio or hand-crank required during power cut",
          "Update every 3 hours from official broadcasts",
          "NDMA App on phone for push alerts (requires data)",
        ],
        tips: [
          "AM radio penetrates building walls better than FM",
          "Keep antenna extended for best reception",
        ],
        apContext:
          "AP SDMA: official emergency information via Doordarshan Saptagiri and AIR Vijayawada",
      },
      {
        id: "com2",
        title: "Community Alert Call Chain",
        content: "Set up a phone call chain for disaster alerts.",
        steps: [
          "Each person calls 2 others; create tree from leader",
          "One clear message: what happened, what to do, when",
          "Confirm receipt: each caller gets confirmation from both contacts",
          "WhatsApp group for written backup confirmation",
          "Test call tree monthly in non-emergency period",
        ],
        tips: [
          "Keep tree list in phone contacts with alert prefix",
          "Paper copy of call tree in emergency kit",
        ],
        apContext:
          "AP Sachivalayam: ward volunteers maintain community contact lists; 20 families per volunteer",
      },
      {
        id: "com3",
        title: "Written Distress Messages",
        content: "Leave written messages when you must move from location.",
        steps: [
          "Leave note at your last known location: date, time, direction of travel",
          "Number of people in group and health status",
          "Destination or intended direction",
          "Mark trail with arrows and cairns every 100 m",
          "Wrap note in plastic bag; secure it prominently",
        ],
        tips: [
          "Use charcoal or chalk to write on rocks",
          "Arrow on paper under large rock: weatherproof",
        ],
        apContext:
          "AP forest trails: note left at forest checkpost or Range Office is logged by forest rangers",
      },
    ],
  },
};
