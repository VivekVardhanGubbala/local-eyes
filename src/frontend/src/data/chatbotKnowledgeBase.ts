// Local-Eyes AI Chatbot Knowledge Base
// Comprehensive offline knowledge base with 200+ entries
// Categories: Disasters, First Aid, Medical (India-specific), Survival, Food/Water Safety

import { MEDICAL_KB_ENTRIES } from "./medicalData";
import { EXTENDED_MEDICAL_KB_ENTRIES } from "./medicalData.extended";

export interface ImageRef {
  url: string;
  caption: string;
}

export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  title: string;
  response: string;
  category:
    | "disaster"
    | "firstaid"
    | "medical"
    | "pregnancy"
    | "pediatric"
    | "elderly"
    | "survival"
    | "food"
    | "mental"
    | "hazmat"
    | "india";
  referenceImages?: ImageRef[];
}

// ─── Core Knowledge Entries ──────────────────────────────────────────────────

const CORE_ENTRIES: KnowledgeEntry[] = [
  // ─── FIRST AID ──────────────────────────────────────────────────────────────
  {
    id: "cpr_adult",
    keywords: [
      "cpr",
      "cardiac",
      "heart attack",
      "chest compress",
      "resuscitat",
      "not breathing",
      "unconscious",
      "stopped breathing",
      "no pulse",
      "heart stop",
      "rescue breath",
    ],
    title: "CPR — Cardiopulmonary Resuscitation",
    category: "firstaid",
    referenceImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/CPR_training_-_adult_chest_compressions.jpg/320px-CPR_training_-_adult_chest_compressions.jpg",
        caption: "Chest compression technique",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Recovery_position.svg/320px-Recovery_position.svg.png",
        caption: "Recovery position",
      },
    ],
    response: `**CPR — CARDIOPULMONARY RESUSCITATION**

📞 CALL 108 (Ambulance) IMMEDIATELY before starting CPR.

**Adult CPR (>12 years)**
1. Check safety — tap shoulders firmly: "Are you OK?"
2. If no response: call 108 or send someone to call.
3. Tilt head back, lift chin — check breathing for 10 seconds.
4. No breathing: Place heel of hand on CENTER of chest (lower half of breastbone).
5. Interlock fingers — arms straight.
6. Compress 5–6 cm deep at 100–120 beats/min (to the beat of "Stayin Alive").
7. After 30 compressions: tilt head, lift chin, give 2 rescue breaths (1 second each).
8. Continue 30:2 ratio until ambulance arrives or person recovers.

**Child CPR (1–12 years)**
1. Give 5 rescue breaths FIRST before compressions.
2. Use 1 or 2 hands (one if small child). Compress 5cm deep.
3. 30 compressions : 2 breaths ratio same as adult.

**Infant CPR (under 1 year)**
1. Cover infant's mouth AND nose with your mouth.
2. Use 2 fingers below nipple line — compress 4cm deep.
3. Give 5 initial rescue breaths first.
4. Continue 30:2 ratio.

✅ Do NOT stop CPR unless: person shows clear signs of recovery, professional takes over, or you are physically exhausted.
⚠️ NEVER give Aspirin to children under 16 — use Paracetamol only.`,
  },
  {
    id: "bleeding_wound",
    keywords: [
      "wound",
      "cut",
      "bleed",
      "bleeding",
      "severe bleed",
      "blood",
      "bandage",
      "lacerat",
      "injury",
      "pressure",
      "slash",
      "gash",
    ],
    title: "Wound Care & Bleeding Control",
    category: "firstaid",
    response: `**WOUND CARE & BLEEDING CONTROL**

**Minor Wounds (cuts, scrapes)**
1. Wash hands thoroughly first.
2. Apply firm direct pressure with clean cloth for 10 minutes. Do NOT peek.
3. If cloth soaks through — add MORE cloth on top, do NOT remove.
4. Rinse wound with clean running water for 5 minutes.
5. Apply antiseptic: Betadine 5% (Povidone-Iodine) or Savlon (diluted 1:30).
6. Apply thin layer of Neosporin/Soframycin ointment.
7. Cover with sterile gauze + Micropore/Leucoplast tape. Change daily.

**Severe / Deep Bleeding**
1. Apply HEAVY direct pressure — use whole hand.
2. Do NOT remove pressure — hold minimum 15 minutes.
3. Elevate limb above heart level if possible.
4. If limb bleeding uncontrollable: tourniquet 5–8 cm above wound. Note time applied.
5. Call 108 — do NOT remove tourniquet.

**Signs of Infection (seek medical help)**
⚠️ Increasing redness spreading outward
⚠️ Swelling, warmth, pus discharge
⚠️ Red streaks spreading from wound
⚠️ Fever above 38°C
⚠️ Wound does not close within 5 days

✅ Tetanus shot (TT injection) needed for dirty/rust wounds — free at AP PHC.`,
  },
  {
    id: "burns_treatment",
    keywords: [
      "burn",
      "scald",
      "hot water",
      "fire burn",
      "degree burn",
      "chemical burn",
      "skin burn",
      "blister",
    ],
    title: "Burn Treatment",
    category: "firstaid",
    referenceImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Burn_degree_diagram.svg/320px-Burn_degree_diagram.svg.png",
        caption: "Burn degree classification",
      },
    ],
    response: `**BURN TREATMENT GUIDE**

**Immediate First Steps (ALL burns)**
1. Remove from heat/flame/chemical source immediately.
2. Cool burn under COOL (not ice cold) running water for 10–20 minutes.
3. Remove jewelry and tight clothing BEFORE swelling begins.
4. Cover loosely with clean non-fluffy material (cling film, clean plastic bag, or clean damp cloth).

⚠️ NEVER use: ice, butter, toothpaste, flour, egg white, or any home remedy.

**Burn Severity Guide**
✅ **1st Degree (Superficial)** — Red, dry, painful (like sunburn). Cool water + Aloe vera gel. Heals in 3–5 days.
⚠️ **2nd Degree (Partial Thickness)** — Blistered, wet, very painful. Keep blisters INTACT. Go to doctor within 24 hrs.
⚠️ **3rd Degree (Full Thickness)** — White, black, or charred. May be PAINLESS (nerve damage). EMERGENCY — call 108.

**CALL 108 IMMEDIATELY if:**
⚠️ Burn covers hands, face, feet, genitals, or major joints
⚠️ Child or infant with any burn larger than palm
⚠️ Breathing difficulty (inhalation injury)
⚠️ Electrical burn or chemical burn
⚠️ Circumferential burn (wraps around limb)

**Pain Relief (adults)**
✅ Paracetamol 500–1000mg every 6 hours (Crocin/Dolo).
⚠️ Ibuprofen: avoid for pregnant women and children under 3 months.`,
  },
  {
    id: "choking",
    keywords: [
      "choking",
      "choke",
      "airway block",
      "cannot breathe",
      "heimlich",
      "stuck throat",
      "food stuck",
      "obstructed airway",
    ],
    title: "Choking / Airway Obstruction",
    category: "firstaid",
    referenceImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Heimlich_Maneuver.png/320px-Heimlich_Maneuver.png",
        caption: "Heimlich maneuver technique",
      },
    ],
    response: `**CHOKING — AIRWAY OBSTRUCTION**

**Adult/Child (over 1 year) — Heimlich Maneuver**
1. Ask: "Are you choking?" If cannot speak/cough: act immediately.
2. Stand behind them. One foot between their legs for support.
3. Lean them slightly forward.
4. Give 5 firm BACK BLOWS between shoulder blades with heel of hand.
5. If no relief: 5 ABDOMINAL THRUSTS:
   - Make fist: place thumb side against belly, just above navel, well below breastbone.
   - Grasp fist with other hand.
   - Give 5 quick inward-upward thrusts.
6. Alternate 5 back blows and 5 abdominal thrusts until object dislodged.
7. If unconscious: start CPR. Each time you open airway — look for object before giving breath.

**Infant Choking (under 1 year)**
1. Hold face-down on forearm, head lower than chest.
2. Give 5 firm back blows between shoulder blades.
3. Turn face-up on forearm. Give 5 chest thrusts (2 fingers on sternum).
4. Repeat until object out.
⚠️ NEVER do abdominal thrusts on infants.

**Pregnant / Obese Person**
✅ Replace abdominal thrusts with CHEST thrusts: hands higher on sternum.

⚠️ After successful removal — ALWAYS go to hospital.`,
  },
  {
    id: "drowning",
    keywords: [
      "drowning",
      "drown",
      "water rescue",
      "near drowning",
      "flood rescue",
      "pulled from water",
      "underwater",
    ],
    title: "Drowning Resuscitation",
    category: "firstaid",
    response: `**DROWNING RESUSCITATION**

**Rescue Safety FIRST**
⚠️ Do NOT jump into fast-moving floodwater yourself — use a rope, pole, or thrown object.
⚠️ Throw: life ring, plastic bottle, rope, plank, empty jerrycan.
✅ Once safe to approach: reach from the bank, tow to safety.

**On Land — Immediate Steps**
1. Place person on firm flat surface on their back.
2. Check responsiveness — tap, shout.
3. If NOT breathing: start CPR IMMEDIATELY (don't waste time removing water).
4. Give 5 rescue breaths FIRST (airway is priority in drowning).
5. Begin 30:2 CPR cycle after rescue breaths.
6. Call 108 even if person seems recovered — secondary drowning risk.

⚠️ Do NOT hold upside down or shake to remove water — wastes critical time.
⚠️ Suspected spinal injury (diving accident): minimize neck movement.

**After Resuscitation**
✅ Place in recovery position if breathing.
✅ Keep warm — hypothermia risk even in India (especially children).
✅ ALL near-drowning cases MUST go to hospital — lung complications can appear hours later.`,
  },
  {
    id: "head_injury",
    keywords: [
      "head injury",
      "head trauma",
      "concussion",
      "skull fracture",
      "brain injury",
      "knocked out",
      "head bleed",
      "head wound",
    ],
    title: "Head Injury",
    category: "firstaid",
    response: `**HEAD INJURY — ASSESSMENT & FIRST AID**

**Mild Head Injury (no loss of consciousness)**
✅ Rest in quiet room.
✅ Ice pack wrapped in cloth on swollen area — 20 min on, 20 min off.
✅ Paracetamol for headache — NO Ibuprofen or Aspirin (increases bleeding risk).
✅ Monitor for 24 hours by another person.

**Call 108 IMMEDIATELY for any of these:**
⚠️ Loss of consciousness (even brief)
⚠️ Severe headache that worsens
⚠️ Repeated vomiting (2+ times)
⚠️ Seizure after head injury
⚠️ Confusion, drowsiness, unusual behavior
⚠️ Weakness/numbness in arms or legs
⚠️ Vision changes or unequal pupils
⚠️ Blood or clear fluid from ears or nose
⚠️ Child under 2 years with any head injury

**Scalp Wounds**
✅ Scalp bleeds heavily — apply firm pressure.
✅ Do NOT remove deeply embedded objects.
✅ Clean surface wounds with Betadine after bleeding controlled.

**Suspected Spinal Injury (with head injury)**
⚠️ Do NOT move person — stabilize head in neutral position.
⚠️ Keep head, neck, spine aligned at all times.
⚠️ Call 108 — wait for professional.`,
  },
  {
    id: "fracture_sprain",
    keywords: [
      "fracture",
      "broken bone",
      "break",
      "dislocation",
      "sprain",
      "broken arm",
      "broken leg",
      "splint",
      "bone snap",
    ],
    title: "Fractures & Sprains",
    category: "firstaid",
    response: `**FRACTURES & SPRAINS — FIRST AID**

**Fracture First Aid (DO NOT try to realign bone)**
1. Immobilize limb in the POSITION FOUND — do not straighten.
2. Splint with rigid material: stick, rolled magazine, umbrella, wood plank.
3. Pad between splint and limb with cloth for comfort.
4. Secure with bandage strips above AND below fracture (not over it).
5. Check circulation every 15 min: color, warmth, pulse beyond injury point.
6. Ice pack wrapped in cloth — 20 min on, 20 min off.
7. Transport to hospital.

**Open Fracture (bone visible through skin)**
⚠️ Cover bone with clean damp cloth — do NOT push bone back.
⚠️ Call 108 — risk of severe infection and blood loss.

**Spine Fracture Suspected (neck/back injury)**
⚠️ Do NOT move the person — only if immediate life-threatening danger.
⚠️ Keep head, neck, and body aligned — use rolled towels at neck if available.
✅ Call 108 and wait.

**Sprains (PRICE Method)**
✅ Protect — support with bandage.
✅ Rest — no weight bearing for 24–48 hours.
✅ Ice — 20 min every 2 hours for first 48 hours.
✅ Compress — crepe bandage (not too tight).
✅ Elevate — raise limb above heart.
✅ Volini gel / Diclofenac gel for adults. Ibuprofen 400mg (Brufen) with food.`,
  },
  {
    id: "anaphylaxis",
    keywords: [
      "anaphylaxis",
      "allergic reaction",
      "allergy severe",
      "bee sting allergy",
      "epipen",
      "swollen throat",
      "hives breathing",
      "peanut allergy",
    ],
    title: "Severe Allergic Reaction / Anaphylaxis",
    category: "firstaid",
    response: `**ANAPHYLAXIS — SEVERE ALLERGIC REACTION**

⚠️ LIFE-THREATENING EMERGENCY — Call 108 immediately.

**Signs of Anaphylaxis**
⚠️ Throat swelling, difficulty swallowing
⚠️ Difficulty breathing, wheezing
⚠️ Rapid heartbeat, pale or flushed skin
⚠️ Hives (raised red welts) + swollen face/lips/tongue
⚠️ Dizziness, loss of consciousness

**Immediate Actions**
1. Call 108 immediately — this is an emergency.
2. Lay person down — legs elevated UNLESS breathing difficulty (then sitting up).
3. Epinephrine (Adrenaline) injection: inject into outer mid-thigh. Hold 10 seconds.
   - If EpiPen available: use immediately, without hesitation.
   - At hospital: adrenaline 0.5ml (0.5mg) of 1:1000 intramuscular.
4. Salbutamol inhaler (Asthalin) 4–6 puffs if wheezing.
5. Cetirizine 10mg (Alerid): antihistamine — secondary treatment only, NOT substitute for adrenaline.

**Common India Triggers**
⚠️ Bee/wasp stings, peanuts, seafood, penicillin, latex

⚠️ Biphasic reaction can occur 4–8 hours later — hospital observation is mandatory even if initial symptoms resolve.`,
  },
  {
    id: "electric_shock",
    keywords: [
      "electrocution",
      "electric shock",
      "electricity accident",
      "current shock",
      "lightning",
      "power line",
      "shocked",
    ],
    title: "Electrocution Response",
    category: "firstaid",
    response: `**ELECTROCUTION RESPONSE**

⚠️ DO NOT TOUCH VICTIM UNTIL POWER IS CONFIRMED OFF — you will be shocked too.

**Step 1 — Cut the Power**
1. Switch off at main circuit breaker immediately.
2. If inaccessible: use a DRY non-conductive object (dry wood, plastic, rubber) to push wire away.
3. Do NOT use bare hands, wet objects, or metal objects.
4. Call 108.

**Step 2 — Assess and Treat**
1. Once power confirmed off: check pulse and breathing.
2. No pulse: begin CPR immediately.
3. Burns: look for ENTRY burn (point of contact) AND EXIT burn (usually foot). Cover both loosely.
4. Keep person lying down even if they feel okay.

**High Voltage Lines**
⚠️ Stay at least 8 meters away — do NOT approach.
⚠️ Call APEPDCL (1912) to disconnect power AND call 108.
⚠️ The ground can be electrified around a downed power line.

**Lightning Strike**
✅ Same treatment as above + CPR if no pulse.
✅ Lightning victims are safe to touch — they do NOT carry charge.
⚠️ Heart arrhythmia can appear hours after — hospital observation mandatory.`,
  },
  {
    id: "eye_injury",
    keywords: [
      "eye injury",
      "eye chemical",
      "something in eye",
      "eye foreign body",
      "eye trauma",
      "eye flush",
      "chemical eye",
    ],
    title: "Eye Injury",
    category: "firstaid",
    response: `**EYE INJURY — FIRST AID**

**Chemical in Eye (MOST URGENT)**
1. Flush eye with LARGE amounts of clean water immediately — 15–20 minutes continuous.
2. Hold eyelids open with fingers.
3. Do NOT rub eye.
4. Remove contact lenses before or during flushing.
5. Go to hospital immediately — mention exact chemical.
⚠️ Alkaline chemicals (lime, cement, cleaning agents) are more dangerous than acid.

**Foreign Object in Eye**
1. Do NOT rub eye — can scratch cornea.
2. Pull upper eyelid over lower to dislodge object.
3. Blink gently to stimulate tears.
4. Flush with clean water using a clean cup or bottle.
5. If object won't come out or is embedded: cover eye with clean cloth, go to hospital.
⚠️ Do NOT attempt to remove embedded objects.

**Blunt Eye Trauma**
✅ Cold compress (cloth wrapped ice) on CLOSED eye — 20 min on, 20 min off.
⚠️ Vision changes, double vision, or pain: hospital urgently.

**Penetrating Eye Injury**
⚠️ Cover with clean paper cup — do NOT press.
⚠️ DO NOT remove any object from the eye.
⚠️ Hospital IMMEDIATELY — call 108.`,
  },

  // ─── DISASTERS ──────────────────────────────────────────────────────────────
  {
    id: "flood",
    keywords: [
      "flood",
      "flooding",
      "flash flood",
      "floodwater",
      "inundation",
      "water rising",
      "submerged",
      "river overflow",
    ],
    title: "Flood — Safety & Survival",
    category: "disaster",
    response: `**FLOOD — BEFORE, DURING & AFTER**

**BEFORE (when warning issued)**
1. Move documents, valuables, medicines to highest floor in waterproof bags.
2. Turn off electricity at main breaker — water + electricity = death.
3. Fill all containers with clean water NOW (taps may fail).
4. Move to higher ground before water reaches — do NOT wait.
5. Inform neighbors, help elderly and disabled.

**DURING**
✅ Stay above water level — upper floors, rooftop, trees if necessary.
⚠️ NEVER walk through floodwater — 15 cm (ankle deep) can knock you over.
⚠️ 30 cm of moving water can sweep away a car — TURN BACK if driving.
⚠️ Do NOT touch any electrical equipment that is wet or submerged.
⚠️ Do NOT shelter under bridges — debris and water surge.
✅ Signal for help from roof: bright cloth, mirror flash, shout.

**AFTER**
1. Wait for official all-clear before returning home.
2. Document home damage with photos before cleaning.
3. Check for structural damage — do NOT enter unstable building.
4. Discard ALL food and water touched by floodwater.
5. Check for and report gas leaks (rotten egg smell).
6. Boil all drinking water for at least 7 days after flooding.

⚠️ AP Context: Vijayawada, Eluru, and Krishna river delta areas face recurrent flooding. Evacuation shelters at government schools and community halls.`,
  },
  {
    id: "cyclone",
    keywords: [
      "cyclone",
      "typhoon",
      "hurricane",
      "storm",
      "gale",
      "tropical storm",
      "cyclone warning",
    ],
    title: "Cyclone — Safety Protocol",
    category: "disaster",
    response: `**CYCLONE — BEFORE, DURING & AFTER**

**BEFORE (when alert issued)**
1. Tune to AIR Vijayawada (531 kHz AM / 100.6 MHz FM) every 30 minutes.
2. Secure or bring inside loose objects: vehicles, furniture, pots, tools.
3. Reinforce windows with tape (X pattern) or boards.
4. Fill bathtubs and containers with clean water.
5. Prepare 3-day emergency kit: water, dry food, torches, medicines, documents.
6. Move to cyclone shelter if in vulnerable area (coastal/low-lying).

**DURING**
✅ Stay INDOORS throughout the storm.
✅ Shelter in the INTERIOR room — bathroom or hallway (strongest parts of building).
✅ Stay away from all windows and glass doors.
✅ Lie under strong table if roof at risk.
⚠️ Do NOT go outside when wind calms — you may be in the "eye." Storm WILL resume.
⚠️ Do NOT shelter under trees or in temporary structures (jhuggi/tent).

**AFTER**
1. Wait for official all-clear.
2. Check for structural damage before entering rooms.
3. Report downed power lines to APEPDCL (1912).
4. Avoid coastal areas — risk of tsunami after offshore cyclone.

⚠️ AP Cyclone Season: October–December (post-monsoon) and April–June (pre-monsoon). Bay of Bengal cyclones primarily affect East Godavari, West Godavari, Krishna, Guntur, Nellore districts.`,
  },
  {
    id: "earthquake",
    keywords: [
      "earthquake",
      "tremor",
      "seismic",
      "quake",
      "aftershock",
      "building collapse",
    ],
    title: "Earthquake — Drop Cover Hold",
    category: "disaster",
    response: `**EARTHQUAKE — DROP, COVER, HOLD ON**

**DURING Shaking**
1. DROP to hands and knees immediately.
2. COVER under a sturdy table or desk — hold on. If no table: cover head/neck with arms.
3. HOLD ON to your shelter — move with it.
4. Stay away from windows, exterior walls, and heavy furniture.
5. If OUTDOORS: move to open area away from buildings, trees, power lines.
6. If IN A VEHICLE: pull over safely, stay inside with windows up.

⚠️ Do NOT run outside while shaking — falling glass and debris are the biggest killers.
⚠️ Do NOT stand in doorways — modern buildings do not have stronger doorframes.

**AFTER Shaking Stops**
1. Check yourself and others for injuries — treat wounds first.
2. Smell for gas — rotten egg smell. If present: open windows and evacuate immediately.
3. Check for fires and extinguish small ones.
4. Expect aftershocks — continue Drop-Cover-Hold for each one.
5. Exit building carefully — check floors before putting full weight.
6. Do NOT use elevators.
7. Stay away from damaged buildings, bridges, and roads.

⚠️ AP Context: Cuddapah/YSR, Kurnool, and Guntur districts have moderate seismic risk (Zone II-III). NDRF team at Vijayawada responds within 4 hours.`,
  },
  {
    id: "tsunami",
    keywords: [
      "tsunami",
      "tidal wave",
      "ocean wave",
      "sea wave",
      "tsunami warning",
    ],
    title: "Tsunami Warning Response",
    category: "disaster",
    response: `**TSUNAMI — WARNING & RESPONSE**

**Natural Warning Signs**
⚠️ Strong or long earthquake near coast — GO INLAND immediately.
⚠️ Ocean suddenly recedes far back (exposing seabed) — RUN inland — you have 5–10 minutes.
⚠️ Loud roaring sound from ocean direction.

**Immediate Actions**
1. Move INLAND and to HIGH GROUND — minimum 30m elevation or 3km inland.
2. Move on FOOT if traffic is blocked — time is critical.
3. Go to tsunami evacuation shelter (marked with blue waves symbol in AP coastal areas).
4. Do NOT return to coast for any reason until ALL-CLEAR from NDMA.
5. Call 1078 (NDMA) or listen to AIR for updates.

**AFTER First Wave**
⚠️ Do NOT return to shore — subsequent waves can be larger and more dangerous.
⚠️ Wait for official all-clear — usually 24–48 hours after last wave.
✅ Check for injuries; treat with available first aid.

⚠️ AP Context: Entire coastline (Srikakulam to Nellore) is at risk from Bay of Bengal tsunamis. Most tsunami shelters are along NH16. Cyclone shelters double as tsunami shelters.`,
  },
  {
    id: "fire",
    keywords: [
      "fire",
      "house fire",
      "building fire",
      "escape fire",
      "fire evacuation",
      "smoke",
      "trapped fire",
    ],
    title: "Fire — Escape & Safety",
    category: "disaster",
    response: `**FIRE — ESCAPE & SAFETY**

**If Fire Breaks Out**
1. Shout "FIRE!" loudly to alert everyone.
2. Call 101 (Fire Brigade) immediately.
3. Feel door with back of hand before opening — if HOT, do NOT open (fire is behind).
4. If door is cool: open slowly, stay low, move to exit.
5. Crawl below smoke — clean air is near floor.

**If Trapped**
1. Block gaps under doors with clothes/towels.
2. Open window for air — signal for help (wave bright cloth).
3. Do NOT jump from height unless fire is directly threatening.
4. Stay near window so rescue can find you.

**Clothes on Fire**
✅ STOP, DROP, ROLL:
1. Stop immediately — do NOT run (fans flames).
2. Drop to ground.
3. Roll over and over to smother flames.
4. Cool with water after flames out.

**Fire Extinguisher (PASS)**
1. Pull the pin.
2. Aim at base of fire.
3. Squeeze handle.
4. Sweep side to side.

⚠️ Do NOT use water on electrical or cooking oil fires.
⚠️ If fire fills a room and you cannot escape: close all doors and signal from window.`,
  },
  {
    id: "heatwave",
    keywords: [
      "heatwave",
      "heat wave",
      "extreme heat",
      "summer heat",
      "vijayawada heat",
      "hot day",
      "temperature 45",
      "thermal emergency",
    ],
    title: "Heat Wave Survival",
    category: "disaster",
    response: `**HEAT WAVE SURVIVAL — AP/VIJAYAWADA PROTOCOL**

⚠️ Vijayawada summer temperatures exceed 45°C. AP heat waves kill dozens annually.

**Prevention (when heat alert issued)**
✅ Stay indoors 11am–4pm — most dangerous hours.
✅ Drink water every 30 minutes even if not thirsty — 3–4 litres daily.
✅ Wear light, loose, white/light-colored cotton clothing.
✅ Use wet cloth on neck and wrists to stay cool.
✅ Close curtains/shutters on sun-facing windows.
⚠️ Avoid alcohol, tea, coffee — causes dehydration.
⚠️ Never leave children or elderly in parked cars.

**Heat Exhaustion (manage at home)**
Signs: Heavy sweating, pale cool moist skin, weakness, nausea, dizziness.
1. Move to cool/shaded area immediately.
2. Remove excess clothing.
3. Give ORS (Oral Rehydration Solution): 1 litre water + 6 tsp sugar + ½ tsp salt.
4. Cool with wet cloth on neck, armpits, forehead.
5. Fan continuously.

**Heatstroke (EMERGENCY — call 108)**
Signs: Temperature >40°C, NO sweating, hot DRY skin, confusion, slurred speech.
1. Move to cool area — AC, shade.
2. Remove all excess clothing.
3. Wet ENTIRE body with cool water sponge.
4. Ice packs to neck, armpits, and GROIN simultaneously.
5. Fan constantly while cooling.
6. Do NOT give fluids to unconscious person.
7. Call 108 — heatstroke kills within hours without treatment.`,
  },
  {
    id: "landslide",
    keywords: [
      "landslide",
      "mudslide",
      "slope",
      "hill collapse",
      "land slip",
      "debris flow",
    ],
    title: "Landslide Safety",
    category: "disaster",
    response: `**LANDSLIDE — WARNING SIGNS & RESPONSE**

**Warning Signs (Evacuate Now)**
⚠️ Cracks appearing in hillside soil or road surface
⚠️ Tilting trees, fence posts, utility poles
⚠️ Sudden change in stream water color (becomes muddy/brown)
⚠️ Rumbling sounds from hillside
⚠️ Unusual sounds: cracking trees, boulders colliding
⚠️ Heavy/continuous rainfall on steep slopes for 3+ hours

**During a Landslide**
1. Move QUICKLY to the SIDE of the slide path — NOT uphill or downhill.
2. Run to high ground if slide from above — move at right angles.
3. If caught: curl into ball, protect head with arms.
4. Get away from rivers and stream channels — debris flows into valleys.

**After**
1. Stay away from slide area — secondary slides are common.
2. Check for trapped people — shout and listen.
3. Report to NDRF/SDRF: 1078.
4. Do NOT drive over slide debris — roads may be undermined.

⚠️ AP Context: Eastern Ghats districts (Visakhapatnam Agency, East Godavari Agency, Alluri Sitharama Raju district) have high landslide risk during monsoon (July–September).`,
  },
  {
    id: "drought",
    keywords: [
      "drought",
      "no water",
      "water shortage",
      "dry season",
      "water scarcity",
    ],
    title: "Drought — Water Conservation",
    category: "disaster",
    response: `**DROUGHT — WATER CONSERVATION & SURVIVAL**

**Water Priority (when severely limited)**
1. Drinking and cooking: 3–5 litres per person per day minimum.
2. Medical/sanitation: wash hands only with 0.5 litre per wash.
3. NO bathing, laundry, or car washing until supply secured.

**Finding Water Sources**
✅ Morning dew: collect from leaves and grass with clean cloth — squeeze into container.
✅ Tree roots: dig near base of large trees — soil moisture often present.
✅ Low-lying areas and dry riverbeds: dig 0.5–1m down for subsurface water.
✅ Cacti (in Rayalaseema): cut and squeeze pulp for moisture.
⚠️ All found water MUST be purified before drinking.

**AP Drought Assistance**
✅ Contact Panchayat Secretary or Sachivalayam for tanker water schedule.
✅ AP government tanker supply: contact 1800-599-0014 (water helpline).
✅ MGNREGA drought relief employment: District Collector's office.`,
  },
  {
    id: "chemical_spill",
    keywords: [
      "chemical spill",
      "gas leak",
      "toxic gas",
      "chemical accident",
      "industrial accident",
      "hazmat",
      "leak smell",
    ],
    title: "Chemical / Gas Emergency",
    category: "hazmat",
    response: `**CHEMICAL / GAS EMERGENCY — RESPONSE**

**Gas Leak (home)**
1. Do NOT switch on/off any electrical switch (spark risk).
2. Open all windows and doors — ventilate immediately.
3. Do NOT use any open flame or cigarette.
4. Turn off gas cylinder valve if safely reachable.
5. Evacuate everyone — stay upwind.
6. Call fire brigade (101) and gas helpline from outside the building.

**Industrial Chemical Spill / Release**
1. Move UPWIND and UPHILL immediately (chemicals spread downwind and downhill).
2. Cover mouth and nose with wet cloth — partial protection.
3. Seal home: close doors, windows, seal gaps with tape — shelter-in-place if outdoors is dangerous.
4. Call NDMA 1078 and local fire brigade 101.
5. Decontamination: remove contaminated clothing, flush skin with large amounts of water.

**Chemical on Skin**
1. Remove contaminated clothing immediately (wear gloves if possible).
2. Flush with large amounts of running water for 20 minutes.
3. Do NOT scrub — rinse only.
4. Hospital immediately — take the chemical container/label.

**Chemical in Eyes**
✅ Flush with clean water for 15–20 minutes continuously.
⚠️ Alkaline chemicals are more dangerous — rinse even longer.

⚠️ AP Industrial Hazard: Kakinada port, Visakhapatnam Port Trust, HPCL, ONGC refineries — HAZMAT team available 24/7.`,
  },
  {
    id: "pandemic",
    keywords: [
      "pandemic",
      "epidemic",
      "covid",
      "coronavirus",
      "infectious disease",
      "quarantine",
      "isolation",
    ],
    title: "Epidemic / Pandemic Response",
    category: "disaster",
    response: `**EPIDEMIC / PANDEMIC RESPONSE**

**Immediate Protection (any infectious disease outbreak)**
✅ Frequent handwashing: 20 seconds with soap.
✅ Avoid touching face (eyes, nose, mouth).
✅ Wear surgical/N95 mask if outside home.
✅ Maintain 1.5 meter distance from symptomatic people.
✅ Ventilate rooms — open windows.
⚠️ Boil drinking water — waterborne diseases spike during disease outbreaks.

**If Someone at Home is Sick**
1. Isolate in a separate room with own utensils.
2. Caregiver wears mask and washes hands after contact.
3. Disinfect common surfaces: door handles, taps, phones — Dettol diluted in water.
4. Report to ASHA worker or call 104 (health helpline) for guidance.

**AP Disease Reporting**
✅ Call 104 (AP Health Helpline) for any unusual cluster of illness.
✅ COVID-19 specific: COVID helpline 1075 (national) or 0866-2410-978 (AP).
✅ Dengue/malaria/cholera cluster: report to PHC immediately for district response.`,
  },

  // ─── INDIA-SPECIFIC MEDICAL ──────────────────────────────────────────────────
  {
    id: "snakebite",
    keywords: [
      "snake",
      "snakebite",
      "snake bite",
      "viper",
      "cobra",
      "krait",
      "serpent",
      "bitten snake",
      "venom",
    ],
    title: "Snakebite First Aid — India Protocol",
    category: "india",
    referenceImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Snake_bite_first_aid.jpg/320px-Snake_bite_first_aid.jpg",
        caption: "Snakebite first aid",
      },
    ],
    response: `**SNAKEBITE — INDIA/AP PROTOCOL (MOH Guidelines)**

📞 CALL 108 IMMEDIATELY — antivenom is only available at hospital.

**Immediately Do:**
1. Keep victim STILL and CALM — movement spreads venom faster.
2. Immobilize bitten limb — keep it BELOW heart level.
3. Remove rings, bangles, watches, tight clothing before swelling begins.
4. Mark swelling edge with pen every 15 minutes to track progression.
5. Keep the person lying down. Support immobilized limb.

**India's Big 4 Snakes (All need antivenom)**
⚠️ Indian Cobra (Nag) — hood, neurotoxic: drooping eyelids, difficulty breathing
⚠️ Common Krait — often painless bite at night, abdominal cramps, ascending paralysis
⚠️ Russell's Viper — severe pain and swelling, bleeding disorders, kidney failure
⚠️ Saw-Scaled Viper — immediate pain, site oozing blood, bleeding from gums/nose

✅ POLYVALENT ANTIVENOM — available FREE at all AP/Telangana Government Hospitals.

**ABSOLUTE DO NOTs:**
⚠️ Do NOT apply tourniquet — worsens outcome, causes tissue death
⚠️ Do NOT cut and suck — ineffective, causes infection
⚠️ Do NOT apply ice
⚠️ Do NOT apply electric shock — dangerous myth
⚠️ Do NOT give herbal medicines, alcohol, or local treatments
⚠️ Do NOT try to catch or kill the snake — take a photo from safety

⚠️ AP Context: Russell's Viper is most common AP snakebite emergency. Rain season (June–September) = highest snake activity.`,
  },
  {
    id: "scorpion_sting",
    keywords: [
      "scorpion",
      "scorpion sting",
      "red scorpion",
      "stung by scorpion",
      "scorpion bite",
    ],
    title: "Scorpion Sting",
    category: "india",
    response: `**SCORPION STING — INDIA/AP**

**Immediate Steps**
1. Wash sting site with soap and clean water.
2. Cold compress wrapped in cloth — 10–15 minutes. Reduces pain.
3. Paracetamol 500mg for adults for pain (Crocin/Dolo).
4. Keep limb at heart level or slightly elevated.

**Monitor for Danger Signs (hospital immediately if any)**
⚠️ Muscle spasms or convulsions
⚠️ Excessive drooling, sweating, or tearing
⚠️ Breathing difficulty or wheezing
⚠️ High blood pressure symptoms (severe headache, visual changes)
⚠️ Loss of bladder/bowel control

**Indian Red Scorpion (Mesobuthus tamulus — AP, Maharashtra, Tamil Nadu)**
⚠️ One of the world's most dangerous scorpions.
⚠️ Venom causes hypertensive crisis and pulmonary edema — hospital immediately.
⚠️ Antidote (Prazosin) only available at hospitals — free at government hospitals.

**When to Go to Hospital IMMEDIATELY**
⚠️ ANY child stung by ANY scorpion = hospital immediately, no exceptions.
⚠️ Adults with systemic symptoms (not just local pain) = hospital.
✅ Most adult stings cause pain only and resolve within hours.`,
  },
  {
    id: "heatstroke_india",
    keywords: [
      "heatstroke",
      "heat stroke",
      "heat exhaustion",
      "sunstroke",
      "overheating",
      "sun stroke",
      "hyperthermia",
    ],
    title: "Heatstroke & Heat Exhaustion",
    category: "india",
    response: `**HEATSTROKE & HEAT EXHAUSTION — AP PROTOCOL**

⚠️ Vijayawada temperatures exceed 45°C (May 2023 hit 45.9°C). Most dangerous 11am–4pm.

**Heat Exhaustion (less severe — treat immediately)**
Signs: Heavy sweating, pale moist skin, weakness, nausea, dizziness, normal or slightly raised temperature.

1. Move to coolest available place — shade, fan, or AC.
2. Remove excess clothing.
3. Give ORS: 1 litre water + 6 tsp sugar + ½ tsp salt. Drink every 15 minutes.
4. Sponge body with cool water. Fan continuously.
5. Rest for at least 1 hour. If no improvement: hospital.

**Heatstroke (MEDICAL EMERGENCY — call 108)**
Signs: Temperature >40°C, NO sweating (hot DRY skin), confusion, slurred speech, loss of consciousness.

1. Move to cool area immediately — AC or coolest shade.
2. Remove ALL excess clothing.
3. Wet ENTIRE body with cold water sponge.
4. Apply ice packs simultaneously to: neck, armpits, and GROIN.
5. Fan vigorously — evaporative cooling.
6. Do NOT give fluids to unconscious person (aspiration risk).
7. Call 108 — heatstroke is fatal within hours without hospital treatment.

**Prevention (AP summer)**
✅ Drink water before feeling thirsty.
✅ Carry ORS sachets when outdoors.
✅ Take shelter breaks every 30 minutes.`,
  },
  {
    id: "dengue",
    keywords: [
      "dengue",
      "dengue fever",
      "dengue symptoms",
      "platelet count",
      "breakbone fever",
      "dengue treatment",
    ],
    title: "Dengue Fever",
    category: "india",
    response: `**DENGUE FEVER — AP PROTOCOL**

**Identify Dengue**
Symptoms (appear 4–10 days after mosquito bite):
✅ Sudden high fever >39°C
✅ Severe headache (behind eyes — "breakbone" headache)
✅ Severe joint and muscle pain
✅ Skin rash (appears day 3–5, spares palms/soles)
✅ Mild bleeding: bleeding gums, nosebleed, easy bruising

**Treatment at Home**
1. PARACETAMOL ONLY — 500mg every 6 hours for fever. Max 4g/day.
   ⚠️ NEVER give Ibuprofen, Aspirin, or Diclofenac — increases bleeding risk.
2. Drink 3+ litres daily: water, ORS, coconut water, diluted fruit juice.
3. Complete bed rest — physical activity reduces platelet count.
4. Monitor platelet count from Day 3 (free test at AP PHC or ~₹200 private).

**Go to Hospital Immediately if:**
⚠️ Severe abdominal pain or tenderness
⚠️ Persistent vomiting (3+ times/day)
⚠️ Bleeding from any site
⚠️ Rapid breathing or difficulty breathing
⚠️ Sudden fever break with weakness or restlessness
⚠️ Platelet count below 50,000/mm³

✅ AP Context: Dengue cases peak August–October. Free Dengue NS1 test and CBC available at government hospitals.`,
  },
  {
    id: "malaria",
    keywords: [
      "malaria",
      "malaria fever",
      "chills fever",
      "rigors",
      "shaking chills",
      "falciparum",
      "vivax",
    ],
    title: "Malaria",
    category: "india",
    response: `**MALARIA — AP PROTOCOL**

**Identify Malaria**
Classic symptoms appear 10–15 days after infected mosquito bite:
✅ Sudden chills and shivering (rigors) — last 15–60 minutes
✅ Followed by rising fever 39–41°C — last 2–6 hours
✅ Profuse sweating as fever breaks
✅ Cycle repeats every 48 hours (P.vivax/P.ovale) or 72 hours (P.malariae)
✅ Headache, muscle pain, fatigue, nausea, vomiting

**Immediate Action**
1. Seek blood test (Rapid Diagnostic Test — RDT) at AP PHC — FREE.
2. Do NOT self-treat with Chloroquine (significant resistance in India).
3. AP government hospitals: Artemisinin-based Combination Therapy (ACT) — FREE.
4. Paracetamol for fever and headache — 500mg every 6 hours.

**Severe/Cerebral Malaria — EMERGENCY**
⚠️ Confusion, fits, very high fever, yellow skin, dark urine, coma = hospital immediately (108).
⚠️ AP tribal areas: always suspect P.falciparum — can be fatal within 24 hours.

✅ Prevention: permethrin-treated mosquito nets, DEET repellent, prophylaxis if traveling to high-risk areas.`,
  },
  {
    id: "cholera_diarrhea",
    keywords: [
      "cholera",
      "diarrhea",
      "watery stool",
      "loose motion",
      "gastroenteritis",
      "vomiting diarrhea",
      "dehydration",
      "ORS",
    ],
    title: "Cholera / Severe Diarrhea & Dehydration",
    category: "india",
    response: `**CHOLERA & SEVERE DIARRHEA — INDIA**

**Immediate ORS Treatment (start within minutes)**
✅ ORS is the FIRST and MOST IMPORTANT treatment.
✅ Give 200–400ml ORS after EACH loose stool or vomiting episode.

**Homemade ORS (if sachets unavailable)**
1. 1 litre boiled/purified water.
2. Add 6 level teaspoons of sugar.
3. Add ½ level teaspoon of salt.
4. Mix until dissolved. Give in small sips.

**Dosage**
- Adults: 250ml per hour until diarrhea stops.
- Children: 100ml per kg body weight over 4 hours.
- After each stool: add extra 50–100ml (child) or 200–400ml (adult).

**Children: Zinc Supplement**
✅ Zinc 20mg once daily for 14 days (Zincovit/Zinconia).
✅ Continue breastfeeding.

**Go to Hospital if:**
⚠️ Unable to drink (persistent vomiting)
⚠️ Extreme weakness or unconsciousness
⚠️ Signs of severe dehydration: sunken eyes, no tears, dry mouth, skin doesn't spring back when pinched
⚠️ Blood in stool

✅ FREE ORS sachets available at all AP PHC and Anganwadi centres.`,
  },

  // ─── PREGNANCY & OBSTETRIC ──────────────────────────────────────────────────
  {
    id: "emergency_delivery",
    keywords: [
      "pregnancy",
      "labour",
      "delivery",
      "pregnant",
      "contraction",
      "birth",
      "giving birth",
      "emergency delivery",
      "baby coming",
    ],
    title: "Emergency Childbirth",
    category: "pregnancy",
    response: `**EMERGENCY CHILDBIRTH — WHEN HOSPITAL NOT REACHABLE**

📞 CALL 108 IMMEDIATELY — continue call throughout delivery if possible.

**Signs Birth is Imminent (act now)**
⚠️ Contractions every 2–3 minutes lasting 60–90 seconds
⚠️ Urge to push — like a bowel movement
⚠️ Baby's head visible at opening

**Prepare the Area**
1. Clean flat surface: lay clean sheets/plastic sheet then cloth on top.
2. Wash hands thoroughly with soap — scrub for 2 minutes.
3. Gather: clean cloths (at least 4), string or shoelace, scissors (boil them), clean blanket for baby.

**Assisting Delivery**
1. Help mother lie on back, knees bent, feet flat — or on all fours.
2. As head emerges: support gently with open hands — do NOT pull.
3. If sac intact over baby's face: gently pinch and tear.
4. If cord around neck: gently slip loop over head.
5. Baby usually turns to one side — support shoulders as they emerge.
6. Support baby's body as rest of body delivers.
7. Note exact time of birth.

**Immediately After Birth**
1. Keep baby at MOTHER'S LEVEL — do NOT lift above her until cord cut.
2. Dry baby VIGOROUSLY with clean cloth — stimulates breathing.
3. Clear mouth/nose if needed — wipe gently with clean cloth.
4. Wrap baby warmly and place on mother's chest (skin-to-skin).
5. Do NOT cut cord without sterile scissors — wait for medical help.

⚠️ If cord must be cut: tie TIGHTLY in two places 3–4 cm apart; cut between. Use sterilized scissors.
⚠️ Postpartum bleeding >500ml (soaking more than 2 pads in 15 minutes) = life-threatening emergency.`,
  },
  {
    id: "preeclampsia_eclampsia",
    keywords: [
      "preeclampsia",
      "eclampsia",
      "pregnancy seizure",
      "high bp pregnancy",
      "pregnancy headache",
      "pregnancy vision",
    ],
    title: "Preeclampsia & Eclampsia",
    category: "pregnancy",
    response: `**PREECLAMPSIA & ECLAMPSIA — OBSTETRIC EMERGENCY**

⚠️ LIFE-THREATENING — Call 108 immediately.

**Preeclampsia Warning Signs (after 20 weeks)**
⚠️ Severe headache that doesn't respond to Paracetamol
⚠️ Visual disturbances: flashing lights, blurred vision, temporary blindness
⚠️ Upper abdominal pain (under ribs on right side)
⚠️ Sudden rapid swelling of face, hands, or feet
⚠️ High blood pressure: >140/90 mmHg

**Eclampsia (Seizure During Pregnancy)**
Actions:
1. Call 108 immediately.
2. Place on LEFT side (recovery position) — prevents aspiration.
3. Protect from injury — clear surrounding area, do NOT restrain.
4. Do NOT put anything in mouth.
5. Time the seizure.
6. After seizure: keep on left side, check breathing.

**MgSO4 (Magnesium Sulfate) — First Line Treatment**
✅ Available at all AP government hospitals — ask for it.
✅ NEVER delay transport — every minute matters.

⚠️ Aspirin (75–150mg daily) from 12 weeks reduces preeclampsia risk in high-risk women — doctor prescription needed.`,
  },
  {
    id: "postpartum_hemorrhage",
    keywords: [
      "postpartum",
      "bleeding after birth",
      "after delivery bleed",
      "hemorrhage delivery",
      "placenta not delivered",
    ],
    title: "Postpartum Hemorrhage",
    category: "pregnancy",
    response: `**POSTPARTUM HEMORRHAGE (PPH)**

⚠️ LEADING CAUSE OF MATERNAL DEATH IN INDIA — act within minutes.

**Signs of PPH**
⚠️ Bleeding >500ml after vaginal delivery (soaking 2+ pads in 15 minutes)
⚠️ Bleeding >1000ml after C-section
⚠️ Pale, rapid pulse, dizziness, fainting
⚠️ Uterus feels soft/boggy when felt through abdomen

**Immediate Actions**
1. Call 108 immediately.
2. UTERINE MASSAGE: Place hand flat on lower abdomen over uterus. Massage with firm circular motion to make uterus contract (firm up).
3. Help mother BREASTFEED immediately — stimulates oxytocin release, contracts uterus.
4. Keep mother warm — shock prevention.
5. Raise legs 30 degrees if available.

**Oxytocin (if available)**
✅ Oxytocin 10 IU intramuscular injection — given by ANM/nurse after delivery.
✅ Misoprostol tablet (600mcg) under tongue if oxytocin unavailable — free at AP PHC.

⚠️ Do NOT leave mother alone — hemorrhage can progress to fatal shock in 20 minutes.`,
  },

  // ─── PEDIATRIC ──────────────────────────────────────────────────────────────
  {
    id: "child_fever",
    keywords: [
      "child fever",
      "baby fever",
      "infant fever",
      "fever child",
      "paracetamol child",
      "medicine child",
      "febrile",
    ],
    title: "Child Fever & Medicine Dosage",
    category: "pediatric",
    response: `**CHILD FEVER & MEDICINE DOSAGE — INDIA**

**Paracetamol (Crocin/Dolo/Calpol) — Weight-based dosing**
✅ Standard dose: 10–15mg per kg of body weight per dose.

- **Under 3 months**: Do NOT give — consult doctor only.
- **3–6 months** (5–7 kg): 60–120mg every 6 hours.
- **6–24 months** (7–13 kg): 120–180mg every 6 hours.
- **2–5 years** (13–19 kg): 180–250mg every 6 hours.
- **6–12 years** (19–40 kg): 250–500mg every 6 hours.

⚠️ NEVER give Aspirin to children under 16 — risk of Reye's syndrome.
⚠️ NEVER give Ibuprofen to infants under 3 months.
⚠️ Max 4 doses per day. Space doses at LEAST 4 hours apart.

**When to Worry (go to hospital)**
⚠️ Infant under 3 months with ANY fever
⚠️ Fever above 40°C (104°F)
⚠️ Fever lasting more than 3 days
⚠️ Fever with rash, stiff neck, unusual irritability
⚠️ Fever with difficulty breathing

**Febrile Seizure (child has a fit due to fever)**
1. Place child on side on soft surface.
2. Clear area — protect from injury.
3. Do NOT restrain or put anything in mouth.
4. Time the seizure.
5. Go to hospital — first febrile seizure always needs evaluation.`,
  },
  {
    id: "infant_cpr",
    keywords: [
      "baby not breathing",
      "infant not breathing",
      "baby unconscious",
      "newborn not breathing",
      "infant cpr",
      "baby stopped breathing",
    ],
    title: "Infant CPR & Newborn Emergencies",
    category: "pediatric",
    response: `**INFANT CPR & NEWBORN EMERGENCIES**

📞 CALL 108 IMMEDIATELY while starting CPR.

**Infant CPR (under 1 year)**
1. Tap foot gently to check responsiveness.
2. If no response: lay on firm flat surface.
3. Tilt head SLIGHTLY back (not as far as adult) — open airway.
4. Cover BOTH mouth and nose with your mouth.
5. Give 5 initial rescue breaths: small gentle puffs (just enough to see chest rise).
6. 2 fingers on sternum (center chest) — JUST BELOW nipple line.
7. Compress 4cm deep at 100–120/min.
8. 30 compressions : 2 breaths — continue until help arrives.

**Newborn Not Breathing at Birth**
1. Dry vigorously with clean cloth — this alone often starts breathing.
2. Position: on back, neck slightly extended (sniffing position).
3. Clear airway: wipe mouth and nose with clean cloth.
4. Stimulate: rub back and flick sole of foot.
5. If still no breath after 60 seconds: start resuscitation (mouth-to-mouth+nose, gentle puffs).
6. Call 108.

**Child Choking (under 1 year)**
✅ Face-down back blows (5) + face-up chest thrusts (5) — see Choking entry.
⚠️ NEVER do abdominal thrusts (Heimlich) on infants.`,
  },
  {
    id: "child_dehydration",
    keywords: [
      "child dehydration",
      "baby dehydration",
      "infant vomiting",
      "child vomiting diarrhea",
      "sunken eyes child",
      "ORS baby",
    ],
    title: "Dehydration in Children",
    category: "pediatric",
    response: `**DEHYDRATION IN CHILDREN — SIGNS & TREATMENT**

**Signs of Dehydration by Severity**

✅ **Mild**: Slightly dry mouth, thirsty.
⚠️ **Moderate**: Sunken eyes, dry mouth, crying without tears, decreased urine, no wet diaper in 6 hours, irritable.
⚠️ **Severe**: Very sunken eyes, skin doesn't spring back when pinched, unconscious/very lethargic. EMERGENCY — call 108.

**ORS Treatment**
✅ Standard ORS sachet (WHO formula) — dissolve 1 sachet in 1 litre boiled water. Free at AP PHC.

**Dosage by weight:**
- Under 5 kg: 200–400ml ORS over first 4 hours.
- 5–10 kg: 400–700ml over first 4 hours.
- Over 10 kg: 700–1000ml over first 4 hours.
✅ Give slowly: small sips every 5 minutes to avoid vomiting.

**Breastfeeding infants**
✅ Continue breastfeeding throughout — breast milk provides fluids AND nutrients.
✅ Add ORS between feeds.

**Zinc (for diarrhea)**
✅ Zinc sulfate 10mg once daily for under 6 months.
✅ Zinc 20mg once daily for over 6 months (Zinctrac/Zinkid syrup).
✅ Continue for 14 days even after diarrhea stops.`,
  },

  // ─── ELDERLY ──────────────────────────────────────────────────────────────
  {
    id: "elderly_care",
    keywords: [
      "elderly",
      "old person",
      "fall elderly",
      "senior care",
      "aged",
      "old age",
      "hip fracture elderly",
    ],
    title: "Elderly Care in Disasters",
    category: "elderly",
    response: `**ELDERLY CARE IN DISASTERS**

**Key Vulnerabilities**
⚠️ Dehydration — elderly feel thirst less; encourage fluids every hour.
⚠️ Heat — reduced ability to regulate body temperature; highest heatstroke risk.
⚠️ Falls — most common injury; hip fracture is life-threatening at this age.
⚠️ Medications — ensure 7-day supply in disaster kit.
⚠️ Confusion — sudden confusion in elderly during disaster = heatstroke, dehydration, or stroke until proven otherwise.

**Fall Assessment**
1. Do NOT immediately pull up — assess for hip/spine injury first.
2. Signs of hip fracture: severe hip/groin pain, foot rotated outward, cannot lift leg.
3. If suspected: Do NOT move. Keep warm. Call 108.
4. If no injury: help roll to side, then to hands/knees, then to chair.

**Medicine Continuity in Emergencies**
⚠️ Metformin (Glycomet): maintain — interruption causes hyperglycemia.
⚠️ Atenolol/Metoprolol: do NOT stop suddenly — rebound hypertension/angina.
⚠️ Amlodipine/Telmisartan: missing doses = stroke/heart attack risk.
⚠️ Anti-epileptics (Phenytoin/Levetiracetam): NEVER miss — seizure risk.
✅ 7-day supply of ALL regular medications must be in disaster emergency kit.

**FAST Stroke Recognition**
F = Face drooping to one side
A = Arm weakness — one arm drifts down
S = Speech slurred or strange
T = Time to call 112 immediately`,
  },

  // ─── SURVIVAL ──────────────────────────────────────────────────────────────
  {
    id: "water_purification",
    keywords: [
      "water",
      "purif",
      "clean water",
      "drink",
      "boil",
      "contaminated water",
      "sodis",
      "filter water",
      "safe water",
      "water treatment",
    ],
    title: "Water Purification — 6 Methods",
    category: "survival",
    response: `**WATER PURIFICATION METHODS**

**Method 1 — Boiling (Most Reliable)**
1. Collect water in a clean metal container.
2. Heat until a ROLLING boil (large vigorous bubbles).
3. Boil for 1 minute (3 minutes if above 2000m altitude).
4. Let cool naturally in same container — do NOT add ice.
5. Store in a sealed clean container.
✅ Kills bacteria, viruses, and parasites. 100% effective.

**Method 2 — SODIS (Solar Disinfection — Free)**
1. Fill clear PET plastic bottle (not coloured glass).
2. Shake vigorously to add oxygen.
3. Place on reflective surface (tin roof, aluminium foil) in direct sunlight.
4. Leave for 6 hours (2 days if cloudy or overcast).
✅ Free, no chemicals needed. Effective against bacteria and viruses.

**Method 3 — Chlorine Tablets (Emergency Use)**
1. Sodium hypochlorite (bleach): 8 drops per litre of clear water.
2. Stir and let stand 30 minutes before drinking.
3. Water should have faint chlorine smell — if not, add 8 more drops and wait 15 min.
✅ Available as Aquatabs — 1 tablet per litre. Effective against bacteria and viruses.

**Method 4 — Iodine Tablets**
1. 2 tablets per litre of clear water (4 if cloudy).
2. Dissolve, wait 30 minutes before drinking.
⚠️ Not for pregnant women, thyroid patients, or long-term use (>3 weeks).

**Method 5 — DIY Biosand Filter**
1. Layer from bottom to top in container with drain hole:
   Gravel (5cm) → Coarse sand (5cm) → Fine sand (10cm) → Fine cloth on top.
2. Pour water slowly through top.
3. ALWAYS boil or add chlorine AFTER filtering — filter alone doesn't kill viruses.

**Method 6 — Ceramic Water Filter (Canteen-Style)**
✅ Pre-treated ceramic elements — pour in top, filtered water at bottom.
✅ Lasts 2–3 years. Clean weekly with mild bleach solution.

⚠️ All surface water (river, pond, floodwater) MUST be purified before drinking.`,
  },
  {
    id: "emergency_shelter",
    keywords: [
      "shelter",
      "hide out",
      "hideout",
      "where to shelter",
      "safe place",
      "makeshift shelter",
      "build shelter",
      "emergency shelter",
    ],
    title: "Emergency Shelter & Hideout Guide",
    category: "survival",
    response: `**EMERGENCY SHELTER GUIDE — INDIA/AP**

**Best Shelter Locations by Disaster**

**Flood**
✅ Upper floors of permanent buildings (pucca construction).
✅ Rooftop — signal with bright cloth.
✅ Government cyclone/flood shelters (schools, community halls — look for disaster shelter signs).
⚠️ Do NOT shelter under bridges — water surges.
⚠️ Do NOT shelter in low-lying areas, near rivers.

**Cyclone**
✅ Innermost room of permanent building (bathroom or interior hallway).
✅ Government cyclone shelter.
⚠️ Away from windows, glass doors, exterior walls.
⚠️ NOT in temporary structures (tin sheds, jhuggi, tents).

**Earthquake**
✅ Move to open ground away from buildings after shaking stops.
⚠️ Do NOT shelter near buildings, trees, power lines.

**Building Makeshift Shelter (if needed)**
1. Site selection: elevated ground, not in ravine, not under dead trees.
2. Materials: plastic sheeting, tarpaulin, bamboo, banana leaves.
3. Construction: A-frame — two poles angled, ridge pole, cover with sheeting.
4. Secure sheeting with rocks or tie-downs — AP winds can be very strong.
5. Dig drainage ditch around shelter to divert rainwater.`,
  },
  {
    id: "food_safety",
    keywords: [
      "food",
      "clean food",
      "wash vegetable",
      "spoil food",
      "food safety",
      "food poison",
      "safe cook",
      "contaminated food",
    ],
    title: "Food Safety & Storage",
    category: "food",
    response: `**FOOD SAFETY & STORAGE DURING EMERGENCIES**

**Washing Vegetables**
1. Use purified water only — never tap water during floods/contamination.
2. Scrub firm vegetables with clean brush under running water.
3. Soak in salt water (1 tsp per litre) for 5 minutes.
4. Rinse with purified water. Cook thoroughly.

**Detecting Spoiled Food**
✅ Safe: Normal colour, firm texture, no unusual smell.
⚠️ DISCARD: Foul smell, slimy texture, visible mould, discolouration.
⚠️ DISCARD: Bulging, dented, or leaking cans.
⚠️ GOLDEN RULE: When in doubt, throw it out.

**Flood-Contaminated Food**
⚠️ ANY food item that touched floodwater MUST be discarded immediately.
⚠️ This includes sealed cans with labels removed — label the metal immediately.
⚠️ Sealed commercially processed cans (not home-canned): clean can lid with diluted bleach before opening.

**Safe Foods Without Refrigeration**
✅ Dry dal, rice, wheat flour — 6–12 months in sealed containers.
✅ Dry biscuits (Parle-G, Marie) — 3–4 months.
✅ Honey — indefinite shelf life if lid sealed.
✅ Dry chillies, turmeric, salt — indefinite.
✅ Ghee in sealed container — 6 months.

**Food Poisoning Treatment**
1. Stop eating suspected food immediately.
2. ORS every 30 minutes for adults (250ml per episode).
3. Paracetamol for fever if present.
4. Hospital if: blood in stool, high fever, persistent vomiting, confusion.`,
  },
  {
    id: "fire_starting",
    keywords: [
      "start fire",
      "make fire",
      "fire without lighter",
      "fire starting",
      "campfire",
      "kindle fire",
      "cooking fire",
    ],
    title: "Fire Starting — Survival",
    category: "survival",
    response: `**FIRE STARTING — SURVIVAL TECHNIQUES**

**Priority — Find Easier Sources First**
✅ Check for: matches, lighter, car cigarette lighter, magnifying glass, reading glasses.

**Method 1 — Magnifying Glass / Spectacle Lens**
1. Focus sunlight beam on dry tinder (brown grass, dry leaf, inner bark).
2. Hold lens steady — beam must be as small as possible.
3. Wait for smoke, then gently blow.
4. Works: 10am–3pm on sunny days only.

**Method 2 — Friction — Bow Drill**
1. Dry softwood baseboard (mango, banyan, babool — NOT teak).
2. Cut V-notch. Place leaf under notch to catch coal.
3. Spindle: dry hardwood 30cm. Bow: green stick + shoelace.
4. Drill until glowing coal appears. Tip into tinder bundle.
5. Hold bundle to lips — blow steadily until flame.

**Tinder for AP (dry materials)**
✅ Dry coconut fiber (coir), dry banana leaf, jute fiber, dried grass.
✅ Inner bark of coconut tree — excellent tinder.

**Fire Safety**
✅ Build fire in cleared area — 1m clear radius.
✅ Never leave fire unattended.
✅ Keep water or sand nearby to extinguish.`,
  },
  {
    id: "navigation",
    keywords: [
      "navigation",
      "lost",
      "find direction",
      "north south",
      "without gps",
      "navigate",
      "find way",
    ],
    title: "Navigation Without GPS",
    category: "survival",
    response: `**NAVIGATION WITHOUT GPS — INDIA**

**Finding North — 3 Methods**

**Method 1 — Sun**
- Morning: Sun rises in EAST — face sun, left = North.
- Evening: Sun sets in WEST — face sun, right = North.
- Noon: Shadow points NORTH (in India, north of Tropic of Cancer: shadow points north; south of: slightly south).

**Method 2 — Star (Night)**
- Find Saptarshi (Big Dipper / Ursa Major) — visible all year from India.
- Two outer stars of the "cup" point toward Dhruva Tara (Pole Star).
- Pole Star = TRUE NORTH.

**Method 3 — Watch Method**
- Point hour hand at the sun.
- Midpoint between hour hand and 12 = South.
- Opposite = North.

**AP-Specific Navigation**
✅ Rivers flow EAST in AP to Bay of Bengal — follow river downstream to reach coast.
✅ AIR Vijayawada transmitter tower (100m+ tall) visible from eastern Krishna district.
✅ Highway NH16 runs north-south along AP coast — aim east for coastal highway.
✅ Mobile signals exist within 10km of most towns — move to high ground first.`,
  },
  {
    id: "emergency_signals",
    keywords: [
      "signal",
      "rescue signal",
      "help signal",
      "emergency signal",
      "sos",
      "morse code",
      "attract rescue",
    ],
    title: "Emergency Signaling",
    category: "survival",
    response: `**EMERGENCY SIGNALING — HOW TO ATTRACT RESCUE**

**SOS Signal — 3 Groups of 3**
✅ International distress: 3 short + 3 long + 3 short (Morse Code).
✅ Sound: 3 short blasts, 3 long blasts, 3 short blasts. Pause 1 minute. Repeat.
✅ Light: 3 short flashes, 3 long flashes, 3 short flashes.

**Ground-to-Air Signals (for rescue aircraft)**
✅ V = Need help
✅ X = Need medical help
✅ → = Proceeding in this direction
✅ Make symbols at least 8m long — use rocks, cloth, branches.
✅ Make symbols in open clearing visible from above.

**Mirror / Reflective Signaling**
1. Hold mirror in sun — aim flash at aircraft or distant observer.
2. Visible up to 50km in clear conditions.
✅ Alternatives: CD disc, metal tin lid, metallic wrapper, phone screen.

**AP Emergency Radio**
✅ AIR Vijayawada: 531 kHz AM / 100.6 MHz FM.
✅ AIR Visakhapatnam: 747 kHz AM.
✅ NDMA: 1078 — National Disaster Management.

**Mobile Signal (if weak)**
1. Move to highest available point.
2. Turn phone to airplane mode for 30 seconds, then back — forces tower rescan.
3. Keep SMS short (SMS works on weaker signal than voice calls).`,
  },
  {
    id: "emergency_kit",
    keywords: [
      "emergency kit",
      "disaster kit",
      "go bag",
      "survival kit",
      "72 hour",
      "emergency bag",
      "what to pack",
    ],
    title: "72-Hour Emergency Kit",
    category: "survival",
    response: `**72-HOUR EMERGENCY KIT — INDIA**

**Water** (Most Critical)
✅ 4 litres per person per day = 12 litres for 72 hours.
✅ Include: water purification tablets (Aquatabs) OR portable filter.

**Food**
✅ Ready-to-eat: dry chivda, peanuts, dry biscuits, energy bars.
✅ Easy-cook: dry rice, dal, rolled oats, dry bread.
✅ Special needs: infant formula, diabetic snacks, senior soft foods.

**Medical & First Aid**
✅ Paracetamol 500mg (Crocin/Dolo) — 20 tablets.
✅ ORS sachets — 10 packets.
✅ Betadine antiseptic — 1 bottle.
✅ Sterile gauze pads (10x10cm) — 10 packs.
✅ Crepe bandage and adhesive bandages.
✅ Gloves — 5 pairs.
✅ Scissors + tweezers + thermometer.
✅ Personal medications — 7-day supply.
✅ Oral contraceptives (if applicable).

**Documents (waterproof pouch)**
✅ Aadhaar card, voter ID, passport copies.
✅ Health insurance card, bank account details.
✅ Land/property documents copies.
✅ Emergency contact list on paper.

**Tools & Communication**
✅ LED torch + extra batteries OR hand-crank dynamo torch.
✅ Battery/hand-crank radio (AIR reception).
✅ Whistle for signaling.
✅ Waterproof matches + lighter.
✅ Mobile phone + 10,000mAh power bank (charged).

**Clothing & Blankets**
✅ 1 change of clothes per person.
✅ Warm blanket or space blanket.
✅ Sturdy closed-toe shoes.
✅ Rain poncho.`,
  },

  // ─── MENTAL HEALTH ──────────────────────────────────────────────────────────
  {
    id: "panic_attack",
    keywords: [
      "panic attack",
      "panic",
      "anxiety attack",
      "can't breathe anxiety",
      "heart racing anxiety",
      "overwhelmed disaster",
      "shock mental",
    ],
    title: "Panic Attack & Disaster Trauma",
    category: "mental",
    response: `**PANIC ATTACK & DISASTER TRAUMA — FIRST AID**

**Signs of Panic Attack**
Rapid heartbeat, shortness of breath, chest tightness, dizziness, sweating, intense fear ("I'm dying").

**Helping Someone Having a Panic Attack**
1. Stay calm — your calmness directly reduces their panic.
2. Speak slowly: "You are safe. This will pass. I'm here with you."
3. 5-4-3-2-1 Grounding: "Name 5 things you can see. 4 you can touch. 3 you can hear."
4. Guide their breathing: breathe in for 4 counts, hold 1 count, out for 6 counts.
5. Gentle touch on shoulder if appropriate.
6. Stay with them for 10–15 minutes.

**Panic Attack vs Heart Attack (distinguishing)**
⚠️ If in doubt — treat as heart attack and call 108.
✅ Panic attack: usually triggered by stress, improves with calming in 10–20 min.
⚠️ Heart attack: pain radiates to arm/jaw, cold sweat, doesn't improve with calm.

**Disaster Trauma Response**
✅ Acknowledge what they experienced — do NOT minimize.
✅ Practical help first (food, water, shelter) before talking about feelings.
✅ Restore routine and predictability as quickly as possible.
✅ Watch for: inability to sleep, flashbacks, numbness, extreme irritability — these need professional support.
✅ AP iCall: 9152987821 (free counseling helpline).`,
  },

  // ─── GENERAL MEDICAL ────────────────────────────────────────────────────────
  {
    id: "asthma",
    keywords: [
      "asthma",
      "breathing difficulty",
      "inhaler",
      "wheeze",
      "asthalin",
      "shortness breath",
      "breathe hard",
    ],
    title: "Asthma Attack",
    category: "medical",
    response: `**ASTHMA ATTACK — STEP BY STEP**

**Mild to Moderate Attack**
1. Sit upright — do NOT lie down.
2. Salbutamol inhaler (Asthalin): 2–4 puffs via spacer.
3. Breathe slowly and steadily.
4. Wait 20 minutes. Repeat if needed (up to 3 times).
5. If improved: monitor closely for 1 hour.

**Severe Attack (cannot speak in full sentences)**
1. Give 10 puffs Salbutamol via spacer immediately.
2. Call 108.
3. Stay calm — panic worsens attack.

**Children Dosage**
- Under 5 years: 2 puffs Asthalin + spacer every 20 minutes.
- 5–12 years: 4–6 puffs via spacer.
- Over 12: same as adult.

**Spacer Alternative (if no spacer)**
✅ Make improvised spacer: cut bottom off 500ml plastic bottle, put inhaler in one end.

**Hospital IMMEDIATELY if:**
⚠️ Blue or pale lips or fingernails (cyanosis) = severe hypoxia.
⚠️ Cannot speak more than 1–2 words between breaths.
⚠️ No improvement after 10 puffs Salbutamol.

⚠️ AP Context: Air pollution during crop burning season (Oct–Nov) triggers asthma. Monitor AQI (CPCB app).`,
  },
  {
    id: "diabetes",
    keywords: [
      "diabetic",
      "diabetes",
      "blood sugar",
      "insulin",
      "glucose",
      "hypoglycemia",
      "low sugar",
      "high sugar",
    ],
    title: "Diabetic Emergency",
    category: "medical",
    response: `**DIABETIC EMERGENCY — INDIA GUIDE**

**Low Blood Sugar / Hypoglycemia (most common emergency)**

Signs: Sudden shaking, cold sweating, confusion, pale, rapid heartbeat, hunger.

If CONSCIOUS:
1. Give 15g fast-acting sugar immediately:
   ✅ 3 tsp sugar dissolved in water, OR
   ✅ 200ml fruit juice (no diet), OR
   ✅ 3–4 glucose biscuits (Parle-G), OR
   ✅ Glucon-D (1 tsp in water).
2. Wait 15 minutes. Check if improved.
3. If improved: follow with proper meal (roti + dal, or rice + vegetable).
4. If no improvement in 15 minutes: repeat once and go to hospital.

If UNCONSCIOUS:
⚠️ Do NOT give food or drink — choking risk.
✅ Rub honey or glucose gel on inside of cheeks.
✅ Call 108 immediately.

**High Blood Sugar / Hyperglycemia**
Signs: Excessive thirst, frequent urination, fruity breath, weakness.
✅ Drink water (not juice). Call doctor for insulin guidance.
⚠️ Diabetic Ketoacidosis (DKA): fruity breath + vomiting + rapid breathing = hospital emergency.

**Medicines in AP**
✅ Metformin (Glycomet 500/1000mg) — most common oral medication.
✅ Glipizide/Glimepiride — sulfonylureas, risk of hypoglycemia.
✅ Insulin (Humulin/Actrapid): keep refrigerated; works 2 hours at room temp.`,
  },
  {
    id: "fever_medicine",
    keywords: [
      "fever",
      "temperature",
      "paracetamol",
      "medicine fever",
      "high temperature",
      "crocin",
      "dolo",
      "reduce fever",
    ],
    title: "Fever Treatment & Dosage",
    category: "medical",
    response: `**FEVER — TREATMENT & MEDICINE DOSAGE**

**Paracetamol (Crocin/Dolo 650/Calpol) — India Standard**

**Adults (18–60 years)**
✅ 500–1000mg every 4–6 hours. Maximum 4g (4000mg) per day.
✅ Always take after food.

**Elderly (60+ years)**
✅ 500mg every 6–8 hours. Maximum 2g (2000mg) per day.
⚠️ Reduce further if kidney or liver disease present.

**Pregnant Women**
✅ 500mg every 6 hours ONLY (avoid 1000mg doses).
⚠️ NO Ibuprofen or Diclofenac during pregnancy.

**Children** (see Child Fever entry for detailed weight-based dosing)

**Non-Medication Measures**
✅ Wet cloth on forehead and neck — helps reduce temperature.
✅ Lukewarm sponge bath — NOT cold water.
✅ Increase fluid intake: water, ORS, coconut water.
✅ Light cotton clothing — do NOT cover heavily.
⚠️ NEVER give Aspirin to children under 16.

**When to Go to Hospital**
⚠️ Fever >40°C (104°F) in adults, >39°C in infants.
⚠️ Fever lasting more than 3 days.
⚠️ Fever with stiff neck, rash, breathing difficulty, confusion.
⚠️ Febrile convulsion (seizure due to fever).`,
  },
];

// ─── Build Unified Knowledge Base ───────────────────────────────────────────
// Merge MEDICAL_KB_ENTRIES and EXTENDED_MEDICAL_KB_ENTRIES with category tags

const MEDICAL_ENTRIES_WRAPPED: KnowledgeEntry[] = MEDICAL_KB_ENTRIES.map(
  (e, i) => ({
    id: `medical_${i}`,
    keywords: e.keywords,
    title: e.title,
    response: e.response,
    category: "medical" as const,
  }),
);

const EXTENDED_ENTRIES_WRAPPED: KnowledgeEntry[] =
  EXTENDED_MEDICAL_KB_ENTRIES.map((e, i) => ({
    id: `extended_${i}`,
    keywords: e.keywords,
    title: e.title,
    response: e.response,
    category: "india" as const,
  }));

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  ...CORE_ENTRIES,
  ...MEDICAL_ENTRIES_WRAPPED,
  ...EXTENDED_ENTRIES_WRAPPED,
];

// ─── Smart Matching Engine ───────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function stemSimple(word: string): string {
  // Very basic stemming: remove common suffixes
  if (word.endsWith("ing")) return word.slice(0, -3);
  if (word.endsWith("tion")) return word.slice(0, -4);
  if (word.endsWith("ed")) return word.slice(0, -2);
  if (word.endsWith("ness")) return word.slice(0, -4);
  if (word.endsWith("ly")) return word.slice(0, -2);
  if (word.endsWith("s") && word.length > 4) return word.slice(0, -1);
  return word;
}

function scoreEntry(entry: KnowledgeEntry, queryTokens: string[]): number {
  let score = 0;
  const queryStr = queryTokens.join(" ");

  for (const kw of entry.keywords) {
    const kwLower = kw.toLowerCase();
    // Exact phrase match: highest score
    if (queryStr.includes(kwLower)) {
      score += (kw.split(/\s+/).length + 1) * 3;
      continue;
    }
    // Token-level matching
    const kwTokens = tokenize(kw);
    for (const kwToken of kwTokens) {
      for (const qToken of queryTokens) {
        // Exact token match
        if (qToken === kwToken) {
          score += 2;
        }
        // Stem match
        else if (
          stemSimple(qToken) === stemSimple(kwToken) &&
          qToken.length > 3
        ) {
          score += 1.5;
        }
        // Prefix match (one contains the other)
        else if (
          qToken.length > 4 &&
          kwToken.length > 4 &&
          (qToken.startsWith(kwToken.slice(0, 4)) ||
            kwToken.startsWith(qToken.slice(0, 4)))
        ) {
          score += 1;
        }
      }
    }
  }
  return score;
}

export interface MatchResult {
  entry: KnowledgeEntry;
  score: number;
}

export function findBestMatch(
  query: string,
  conversationHistory: Array<{ role: string; text: string }>,
): MatchResult | null {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return null;

  // Handle follow-up questions
  const followUpPatterns = [
    /more detail|explain more|tell me more|elaborate|what else|anything else/i,
    /what if (i|we) don.?t have/i,
    /for (a )?child|for (a )?baby|for (an )?infant|pediatric dosage/i,
    /for (a )?(pregnant|pregnancy)|expectant mother/i,
    /for (an? )?elder(ly)?|old person|senior/i,
    /step (\d+)|next step|then what/i,
    /how much|dosage|dose|quantity/i,
  ];

  const isFollowUp = followUpPatterns.some((p) => p.test(query));

  // Get recent AI messages to find last topic
  const recentAIMessages = conversationHistory
    .filter((m) => m.role === "ai")
    .slice(-3);

  let boostedEntryId: string | null = null;

  if (isFollowUp && recentAIMessages.length > 0) {
    // Try to find what the last topic was by scoring against recent AI text
    const lastAiText = recentAIMessages[recentAIMessages.length - 1].text;
    let topScore = 0;
    for (const entry of KNOWLEDGE_BASE) {
      const s = scoreEntry(entry, tokenize(lastAiText));
      if (s > topScore) {
        topScore = s;
        boostedEntryId = entry.id;
      }
    }
  }

  let best: MatchResult | null = null;

  for (const entry of KNOWLEDGE_BASE) {
    let score = scoreEntry(entry, queryTokens);

    // Boost score if this entry was the last topic (follow-up continuity)
    if (boostedEntryId === entry.id) {
      score += 5;
    }

    // Boost based on mentions in recent conversation history
    for (const msg of conversationHistory.slice(-6)) {
      const histTokens = tokenize(msg.text);
      const histScore = scoreEntry(entry, histTokens);
      if (histScore > 2) {
        score += Math.min(histScore * 0.3, 3);
      }
    }

    if (score > 0.5 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best;
}

// ─── Fallback Response ───────────────────────────────────────────────────────
export const OFFLINE_FALLBACK = `I don't have specific info on that. Here's what I can help with:

✅ **Disasters**: flood, cyclone, earthquake, tsunami, fire, landslide, heatwave, chemical spill
✅ **First Aid**: CPR, bleeding, burns, choking, drowning, fractures, head injury, eye injury, anaphylaxis
✅ **India Medical**: snakebite, scorpion sting, dengue, malaria, cholera, heatstroke, typhoid, leptospirosis
✅ **Pregnancy**: emergency delivery, eclampsia, postpartum bleeding
✅ **Pediatric**: child fever/dosage, infant CPR, child dehydration
✅ **Elderly**: falls, medication continuity, stroke recognition
✅ **Survival**: water purification, shelter, food safety, fire starting, navigation, signaling
✅ **Mental Health**: panic attack, disaster trauma

Try asking: "CPR steps", "snake bite treatment", "flood safety", "dengue fever treatment"
⚠️ For life-threatening emergencies: call 112 (India) or 108 (Ambulance) immediately.`;
