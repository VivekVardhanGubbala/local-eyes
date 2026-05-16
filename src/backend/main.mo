import Text "mo:core/Text";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";



actor {
  // DATA TYPES
  // First-Aid
  type FirstAidCategory = {
    #bleeding;
    #fractures;
    #CPR;
    #burns;
    #shock;
  };

  type FirstAidSeverity = {
    #low;
    #moderate;
    #high;
    #critical;
  };

  type FirstAidArticle = {
    title : Text;
    category : FirstAidCategory;
    content : Text;
    severity : FirstAidSeverity;
    steps : [Text];
  };

  // Survival
  type SurvivalCategory = {
    #water;
    #shelter;
    #fire;
    #navigation;
    #food;
    #cyclone;
    #flood_disaster;
    #fire_disaster;
    #earthquake;
    #heatwave;
    #carAccident;
    #chemicalSpill;
    #landslide;
    #drought;
    #tsunami;
    #pandemic;
    #generalSurvival;
  };

  type SurvivalTopic = {
    title : Text;
    category : SurvivalCategory;
    content : Text;
    tags : [Text];
  };

  // Hazard
  type HazardType = {
    #flood;
    #fire;
    #earthquake;
    #chemical;
    #cyclone;
    #heatwave;
    #landslide;
    #drought;
    #tsunami;
    #pandemic;
    #carAccident;
    #chemicalSpill;
  };

  type HazardSeverity = {
    #low;
    #moderate;
    #severe;
    #extreme;
  };

  type HazardRecord = {
    hazardType : HazardType;
    location : Text;
    severity : HazardSeverity;
    timestamp : Time.Time;
  };

  // Triage
  type TriageStatus = {
    #immediate;
    #delayed;
    #minor;
    #deceased;
  };

  type TriageRecord = {
    patientId : Text;
    status : TriageStatus;
    symptoms : [Text];
    notes : Text;
    timestamp : Time.Time;
  };

  // MODULE FOR TriageRecord
  module TriageRecord {
    public func compare(t1 : TriageRecord, t2 : TriageRecord) : Order.Order {
      Text.compare(t1.patientId, t2.patientId);
    };
  };

  // STORAGE
  let firstAidMap = Map.empty<Text, FirstAidArticle>();
  let survivalMap = Map.empty<Text, SurvivalTopic>();
  let hazardMap = Map.empty<Text, HazardRecord>();
  let triageMap = Map.empty<Text, TriageRecord>();
  // Situation Analysis
  type SituationAnalysis = {
    id : Nat;
    imageDescription : Text;
    detectedSituations : [(Text, Nat)];
    topSituation : Text;
    actionSteps : [Text];
    timestamp : Int;
  };

  let situationMap = Map.empty<Nat, SituationAnalysis>();
  var nextSituationId : Nat = 0;

  // FIRST AID FUNCTIONS
  public shared ({ caller }) func addFirstAidArticle(article : FirstAidArticle) : async () {
    firstAidMap.add(article.title, article);
  };

  public query ({ caller }) func getFirstAidArticle(title : Text) : async FirstAidArticle {
    switch (firstAidMap.get(title)) {
      case (null) { Runtime.trap("First aid article not found") };
      case (?article) { article };
    };
  };

  public query ({ caller }) func getAllFirstAidArticles() : async [FirstAidArticle] {
    firstAidMap.values().toArray();
  };

  // SURVIVAL FUNCTIONS
  public shared ({ caller }) func addSurvivalTopic(topic : SurvivalTopic) : async () {
    survivalMap.add(topic.title, topic);
  };

  public query ({ caller }) func getAllSurvivalTopics() : async [SurvivalTopic] {
    survivalMap.values().toArray();
  };

  // HAZARD FUNCTIONS
  public shared ({ caller }) func addHazardRecord(record : HazardRecord) : async () {
    hazardMap.add(record.location, record);
  };

  public query ({ caller }) func getAllHazardRecords() : async [HazardRecord] {
    hazardMap.values().toArray();
  };

  // TRIAGE FUNCTIONS
  public shared ({ caller }) func addTriageRecord(record : TriageRecord) : async () {
    triageMap.add(record.patientId, record);
  };

  public query ({ caller }) func getAllTriageRecords() : async [TriageRecord] {
    triageMap.values().toArray().sort();
  };

  // SITUATION ANALYSIS FUNCTIONS
  public shared ({ caller }) func addSituationAnalysis(analysis : SituationAnalysis) : async Nat {
    let id = nextSituationId;
    nextSituationId += 1;
    let record = { analysis with id };
    situationMap.add(id, record);
    id;
  };

  public query ({ caller }) func getAllSituationAnalyses() : async [SituationAnalysis] {
    situationMap.values().toArray();
  };

  // AI QUERY HANDLER
  public query ({ caller }) func searchArticles(searchTerm : Text) : async { firstAid : [FirstAidArticle]; survival : [SurvivalTopic] } {
    let firstAidResults = List.empty<FirstAidArticle>();
    let survivalResults = List.empty<SurvivalTopic>();

    for (article in firstAidMap.values()) {
      if (article.title.contains(#text searchTerm) or article.content.contains(#text searchTerm)) {
        firstAidResults.add(article);
      };
    };

    for (topic in survivalMap.values()) {
      if (topic.title.contains(#text searchTerm) or topic.content.contains(#text searchTerm)) {
        survivalResults.add(topic);
      };
    };

    {
      firstAid = firstAidResults.toArray();
      survival = survivalResults.toArray();
    };
  };

  // SURVIVAL DATA STORE — 50+ scenarios (structure-based; rich content populated from frontend)
  public shared ({ caller }) func storeSurvivalData() : async () {
    let scenarios : [SurvivalTopic] = [
      // WATER
      { title = "Boiling Water for Purification"; category = #water; content = "Boil water vigorously for 10 minutes to kill pathogens. Allow to cool before drinking."; tags = ["water", "purification", "boiling"] },
      { title = "Solar Disinfection (SODIS)"; category = #water; content = "Fill clear plastic bottles with water and leave in direct sunlight for 6-8 hours (2 days if cloudy)."; tags = ["water", "solar", "SODIS"] },
      { title = "Sand Filtration"; category = #water; content = "Layer gravel, sand, and charcoal in a container to filter sediment and impurities from water."; tags = ["water", "filter", "sand"] },
      { title = "Chemical Purification with Chlorine Tablets"; category = #water; content = "Use 1 Halazone or Aquatabs tablet per litre. Wait 30 minutes before drinking."; tags = ["water", "chlorine", "tablets"] },
      { title = "Collecting Rainwater"; category = #water; content = "Use clean containers or plastic sheets to collect rainwater. Avoid first 10 minutes of rain (washes pollutants)."; tags = ["water", "rain", "collection"] },
      { title = "Finding Water in Dry Riverbeds"; category = #water; content = "Dig 30–60 cm below dry riverbed surface at outer bends where water table is highest."; tags = ["water", "digging", "dry season"] },
      { title = "Dew Collection"; category = #water; content = "Tie absorbent cloth around ankles before sunrise and walk through vegetation. Wring out collected dew."; tags = ["water", "dew", "morning"] },
      { title = "Improvised Clay Pot Water Filter"; category = #water; content = "Use a porous clay pot to filter water by gravity. Common method in rural Andhra Pradesh."; tags = ["water", "clay", "rural"] },
      // SHELTER
      { title = "Lean-To Shelter"; category = #shelter; content = "Prop a long branch against a tree fork at 45 degrees. Layer leaves and branches from bottom up."; tags = ["shelter", "jungle", "quick"] },
      { title = "Debris Hut"; category = #shelter; content = "Build a cocoon of leaves, grass, and branches over a frame. Excellent insulation from heat and cold."; tags = ["shelter", "insulation", "debris"] },
      { title = "Flood-Safe Elevated Platform"; category = #shelter; content = "Use available lumber or furniture to raise sleeping area at least 1 metre above expected flood level."; tags = ["shelter", "flood", "elevated"] },
      { title = "Tarpaulin Rain Shelter"; category = #shelter; content = "Suspend a tarpaulin at an angle using rope tied to trees. Angle must face away from wind."; tags = ["shelter", "tarpaulin", "rain"] },
      { title = "Urban Rubble Shelter"; category = #shelter; content = "In earthquake aftermath, find a triangular void near heavy furniture. Avoid doorframes — they are not safe."; tags = ["shelter", "earthquake", "urban"] },
      { title = "Cyclone Safe Room"; category = #shelter; content = "Move to the innermost room on lowest floor. Use mattresses as shields. Avoid windows entirely."; tags = ["shelter", "cyclone", "safe room"] },
      // FIRE
      { title = "Starting Fire with Friction"; category = #fire; content = "Use a bow drill: soft spindle on hard baseboard. Tinder bundle of dry grass or bark."; tags = ["fire", "friction", "bow drill"] },
      { title = "Fire Starting with Flint"; category = #fire; content = "Strike flint against steel at a 30-degree angle over tinder. Char cloth is ideal tinder."; tags = ["fire", "flint", "steel"] },
      { title = "Cooking Fire Safety"; category = #fire; content = "Build fire on flat ground. Clear 1-metre radius. Never cook inside a shelter."; tags = ["fire", "cooking", "safety"] },
      { title = "Signal Fire"; category = #fire; content = "Place green vegetation on top of flames to create white smoke (day). Dry wood creates dark smoke at night."; tags = ["fire", "signal", "rescue"] },
      { title = "Fire Suppression without Extinguisher"; category = #fire; content = "Smother small fires with wet cloth or sand. Never use water on electrical or oil fires."; tags = ["fire", "suppress", "extinguish"] },
      // NAVIGATION
      { title = "Sun Navigation"; category = #navigation; content = "In India, the sun rises roughly east and sets west. Shadow tip method: mark shadow tip, wait 15 min, line indicates E–W."; tags = ["navigation", "sun", "direction"] },
      { title = "Star Navigation"; category = #navigation; content = "Locate Dhruva Tara (Pole Star) by following the outer edge of Saptarishi (Ursa Major). It points north."; tags = ["navigation", "stars", "night"] },
      { title = "Moss and Vegetation Indicators"; category = #navigation; content = "In India, moss grows more densely on north-facing sides of trees due to less direct sunlight."; tags = ["navigation", "moss", "nature"] },
      { title = "River Navigation in AP"; category = #navigation; content = "Krishna and Godavari rivers flow east towards Bay of Bengal. Follow downstream to reach populated areas."; tags = ["navigation", "river", "Andhra Pradesh"] },
      { title = "Urban Navigation After Disaster"; category = #navigation; content = "Identify landmarks (temples, water towers, highway signs). Move perpendicular to disaster zone."; tags = ["navigation", "urban", "disaster"] },
      // FOOD
      { title = "Edible Wild Plants of AP Coastal Region"; category = #food; content = "Purslane (Parupukeerai), Wood sorrel (Changeri), and Drumstick leaves are widely edible in Andhra Pradesh."; tags = ["food", "wild plants", "Andhra Pradesh"] },
      { title = "Identifying Poisonous Plants"; category = #food; content = "Avoid plants with milky sap, umbrella-shaped flowers, or strong bitter taste. Never eat unknown red berries."; tags = ["food", "poisonous", "identification"] },
      { title = "Fishing Without Equipment"; category = #food; content = "Use clothing as a net in shallow water. Or fashion a hook from a pin or thorn and tie to a string."; tags = ["food", "fishing", "improvised"] },
      { title = "Caloric Emergency Foods"; category = #food; content = "Peanuts (567 kcal/100g), dried rice (365 kcal/100g), jaggery (383 kcal/100g), coconut meat (354 kcal/100g)."; tags = ["food", "calories", "emergency"] },
      { title = "Food Safety After Flood"; category = #food; content = "Discard any food touched by floodwater. Canned food is safe if undamaged — open from the bottom after cleaning."; tags = ["food", "safety", "flood"] },
      { title = "Fasting and Rationing"; category = #food; content = "Humans can survive 3 weeks without food. Prioritise water. Ration food at 1200 kcal/day minimum."; tags = ["food", "rationing", "fasting"] },
      // CYCLONE
      { title = "Cyclone Early Warning Signs"; category = #cyclone; content = "Rapidly falling barometric pressure, unusually calm sea, unusual cloud formations, and wind shifts from N to NE indicate cyclone approach in Bay of Bengal region."; tags = ["cyclone", "warning", "Bay of Bengal"] },
      { title = "Cyclone Evacuation AP"; category = #cyclone; content = "Follow APSDMA designated cyclone routes. Cyclone shelters (pucca buildings) are marked on every coastal AP village."; tags = ["cyclone", "evacuation", "APSDMA"] },
      { title = "During Cyclone Eye Passage"; category = #cyclone; content = "Calm period during eye is deceptive — do NOT go outside. The back wall brings equally strong winds in opposite direction."; tags = ["cyclone", "eye", "danger"] },
      { title = "Post-Cyclone Safety"; category = #cyclone; content = "Check for structural damage before entering buildings. Report downed power lines to APEPDCL (1912). Boil all water."; tags = ["cyclone", "post-disaster", "safety"] },
      // FLOOD
      { title = "Flood Rising Water Escape"; category = #flood_disaster; content = "Move to upper floors. Never attempt to cross flowing water above knee height — 15 cm fast current can knock down an adult."; tags = ["flood", "escape", "water level"] },
      { title = "Improvised Flood Flotation"; category = #flood_disaster; content = "Sealed empty plastic bottles (2L) tied together provide significant buoyancy. Attach to chest."; tags = ["flood", "flotation", "improvised"] },
      { title = "Flood Rescue Rope Technique"; category = #flood_disaster; content = "Throw rope upstream of victim; current swings them to shore. Secure your footing before throwing."; tags = ["flood", "rescue", "rope"] },
      // EARTHQUAKE
      { title = "Drop Cover Hold Earthquake"; category = #earthquake; content = "Drop to hands and knees immediately. Take cover under sturdy table. Hold on until shaking stops."; tags = ["earthquake", "drop cover hold", "during"] },
      { title = "Post-Earthquake Search and Rescue"; category = #earthquake; content = "Listen for tapping sounds from rubble. Call out systematically. Do not move spinal injury victims."; tags = ["earthquake", "rescue", "rubble"] },
      { title = "Aftershock Preparedness"; category = #earthquake; content = "Aftershocks occur minutes to weeks after main quake. Stay away from buildings. Keep shoes on to protect from glass."; tags = ["earthquake", "aftershock", "preparedness"] },
      // HEATWAVE
      { title = "Heatwave Cooling Andhra Pradesh"; category = #heatwave; content = "During Andhra heatwaves (April–June, up to 47°C), stay indoors 11am–4pm. Drink ORS (1 litre water + 6 tsp sugar + 0.5 tsp salt)."; tags = ["heatwave", "cooling", "Andhra Pradesh"] },
      { title = "Heat Stroke Recognition and Treatment"; category = #heatwave; content = "High body temp (>40°C), confusion, no sweating = heat stroke. Move to shade, pour cold water, fan vigorously, call 108."; tags = ["heatwave", "heat stroke", "treatment"] },
      { title = "Protecting Elderly in Heatwave"; category = #heatwave; content = "Elderly dehydrate faster. Check every 2 hours. Wet cloth on neck and wrists. Do not give alcohol or caffeine."; tags = ["heatwave", "elderly", "vulnerable"] },
      // CAR ACCIDENT
      { title = "Car Accident First Response"; category = #carAccident; content = "Ensure scene is safe. Turn off ignition. Call 108 for ambulance, 100 for police. Do not move injured unless fire risk."; tags = ["car accident", "first response", "India"] },
      { title = "Extracting Trapped Accident Victim"; category = #carAccident; content = "Only move if immediate fire/flood risk. Support head and neck. Slide out as a unit."; tags = ["car accident", "extraction", "rescue"] },
      { title = "Controlling Bleeding After Accident"; category = #carAccident; content = "Apply firm continuous pressure for 10 minutes. Use tourniquet above wound for limb bleeding. Mark tourniquet time."; tags = ["car accident", "bleeding", "tourniquet"] },
      // CHEMICAL SPILL
      { title = "Chemical Spill Evacuation"; category = #chemicalSpill; content = "Move crosswind (perpendicular to wind direction). Do not run into cloud. Cover nose with wet cloth."; tags = ["chemical", "spill", "evacuation"] },
      { title = "Chemical Eye Exposure"; category = #chemicalSpill; content = "Flush eye continuously with clean water for 15 minutes. Remove contact lenses immediately. Seek medical help."; tags = ["chemical", "eye", "first aid"] },
      { title = "Chemical Skin Decontamination"; category = #chemicalSpill; content = "Remove contaminated clothing. Flush skin with large amounts of water for 20 minutes. Do not scrub."; tags = ["chemical", "skin", "decontamination"] },
      // LANDSLIDE
      { title = "Landslide Warning Signs AP Ghats"; category = #landslide; content = "Cracks in hillside, tilting trees, unusual sounds from slope, sudden muddy streams — evacuate immediately in AP Eastern Ghats."; tags = ["landslide", "warning", "Eastern Ghats"] },
      { title = "Post-Landslide Survival"; category = #landslide; content = "If buried, cover face, create air pocket. Tap on pipes or walls. Conserve energy. Do not light matches (gas pockets)."; tags = ["landslide", "buried", "survival"] },
      // TSUNAMI
      { title = "Tsunami Natural Warnings AP Coast"; category = #tsunami; content = "Strong earthquake felt at sea, unusual sea retreat (ocean pulls back far), loud roar — run inland immediately. Do not wait for official warning."; tags = ["tsunami", "warning", "AP coast"] },
      { title = "Tsunami Inland Evacuation Route"; category = #tsunami; content = "Move at least 3 km inland or 30 m elevation. Coastal AP marked with blue tsunami evacuation signs."; tags = ["tsunami", "evacuation", "route"] },
      // PANDEMIC
      { title = "Infection Control Without Medical Supplies"; category = #pandemic; content = "Improvise mask from tightly woven cotton cloth (3 layers). Boil reusable masks for 10 min. Maintain 2m distance."; tags = ["pandemic", "mask", "infection control"] },
      { title = "Isolation Setup in Home"; category = #pandemic; content = "Designate one room with separate bathroom for isolation. Use separate utensils. Improve ventilation (open windows)."; tags = ["pandemic", "isolation", "home"] },
      // GENERAL SURVIVAL
      { title = "Universal Distress Signal"; category = #generalSurvival; content = "Three of anything signals distress internationally: 3 whistle blasts, 3 fires in triangle, 3 shots, 3 mirror flashes."; tags = ["survival", "signal", "distress"] },
      { title = "Priorities Order of Survival"; category = #generalSurvival; content = "PLAN: Protection (shelter/clothing), Location (signal), Acquisition (water), Nutrition (food). Address in this order."; tags = ["survival", "priorities", "PLAN"] },
    ];

    for (topic in scenarios.values()) {
      survivalMap.add(topic.title, topic);
    };
  };

  // INITIAL SAMPLE DATA
  let sampleFirstAid : [FirstAidArticle] = [
    {
      title = "Treating Bleeding Wounds";
      category = #bleeding;
      content = "Apply pressure to stop bleeding, clean the wound, and cover with a sterile bandage.";
      severity = #moderate;
      steps = ["Apply pressure", "Clean wound", "Bandage"];
    },
    {
      title = "CPR Procedure";
      category = #CPR;
      content = "Perform chest compressions and rescue breaths for cardiac arrest.";
      severity = #critical;
      steps = ["Check responsiveness", "Call for help", "Start compressions", "Give rescue breaths"];
    },
  ];

  let sampleSurvival : [SurvivalTopic] = [
    {
      title = "Finding Clean Water";
      category = #water;
      content = "Look for natural water sources, purify using filters or boiling.";
      tags = ["water", "purification", "survival"];
    },
    {
      title = "Building a Shelter";
      category = #shelter;
      content = "Use branches, leaves, and natural materials to create a shelter.";
      tags = ["shelter", "building", "protection"];
    },
  ];

  let sampleHazards : [HazardRecord] = [
    {
      hazardType = #flood;
      location = "Riverdale";
      severity = #severe;
      timestamp = 1718419154;
    },
    {
      hazardType = #earthquake;
      location = "Seismic City";
      severity = #extreme;
      timestamp = 1718419155;
    },
  ];

  let sampleTriage : [TriageRecord] = [
    {
      patientId = "P123";
      status = #immediate;
      symptoms = ["Severe bleeding", "Unconscious"];
      notes = "Needs urgent care";
      timestamp = 1718419156;
    },
    {
      patientId = "P124";
      status = #minor;
      symptoms = ["Scratches", "Bruises"];
      notes = "Stable condition";
      timestamp = 1718419157;
    },
  ];

  public shared ({ caller }) func initializeData() : async () {
    let firstAidEntries = sampleFirstAid.map(func(article) { (article.title, article) });
    let survivalEntries = sampleSurvival.map(func(topic) { (topic.title, topic) });
    let hazardEntries = sampleHazards.map(func(record) { (record.location, record) });
    let triageEntries = sampleTriage.map(func(record) { (record.patientId, record) });

    // Add all entries explicitly using for loop
    for ((key, value) in firstAidEntries.values()) {
      firstAidMap.add(key, value);
    };
    for ((key, value) in survivalEntries.values()) {
      survivalMap.add(key, value);
    };
    for ((key, value) in hazardEntries.values()) {
      hazardMap.add(key, value);
    };
    for ((key, value) in triageEntries.values()) {
      triageMap.add(key, value);
    };

    // Initialize situation analysis counter
    nextSituationId := 0;
  };
};
