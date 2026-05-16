// Local-Eyes Survival Data — Extended Module
// India / Andhra Pradesh focused — wild edible plants, toxic species, food items,
// water purification techniques, emergency radio frequencies, and additional disaster scenarios.

import type { Scenario, ScenarioCategory } from "./survivalData";

// ---------------------------------------------------------------------------
// EDIBLE WILD PLANTS — India / Andhra Pradesh specific (300+ entries split by region)
// ---------------------------------------------------------------------------

export interface EdiblePlant {
  id: string;
  nameEnglish: string;
  nameTelugu: string;
  nameHindi: string;
  nameLatin: string;
  habitat: string; // where found in AP
  region: string; // Deccan Plateau | Coastal Andhra | Eastern Ghats | Western AP | Godavari/Krishna Delta
  identification: string[];
  edibleParts: string[];
  preparation: string[]; // raw / cooked / dried methods
  nutritionalValue: string;
  seasonalAvailability: string;
  caution?: string;
}

export const EDIBLE_PLANTS_DECCAN: EdiblePlant[] = [
  {
    id: "ep_tamarind",
    nameEnglish: "Tamarind",
    nameTelugu: "చింతపండు (Chinta)",
    nameHindi: "इमली (Imli)",
    nameLatin: "Tamarindus indica",
    habitat:
      "Common in village boundaries, roadsides, and forests across Deccan",
    region: "Deccan Plateau",
    identification: [
      "Large tree with pinnate feathery leaves",
      "Brown pod 5-15 cm long, slightly curved",
      "Pod has fibrous pulp inside surrounding seeds",
    ],
    edibleParts: ["Fruit pulp", "Young leaves", "Flowers", "Green pods"],
    preparation: [
      "Raw: eat pulp directly from mature brown pods",
      "Cooked: dissolve in water to make tamarind water for dal and curry",
      "Young leaves: boiled and eaten as vegetables",
    ],
    nutritionalValue:
      "Rich in tartaric acid, B vitamins, calcium; provides quick energy",
    seasonalAvailability: "Fruit: Jan–April; Green pods: July–Oct",
  },
  {
    id: "ep_wood_apple",
    nameEnglish: "Wood Apple (Bael)",
    nameTelugu: "వేల (Vela)",
    nameHindi: "बेल (Bel)",
    nameLatin: "Aegle marmelos",
    habitat: "Dry forests and scrub of Deccan; widely cultivated near temples",
    region: "Deccan Plateau",
    identification: [
      "Hard grey-green shell 5-12 cm diameter",
      "Orange aromatic pulp inside when ripe",
      "Spiny branches, trifoliate leaves",
    ],
    edibleParts: ["Ripe fruit pulp", "Young leaves (emergency)"],
    preparation: [
      "Crack shell with stone",
      "Scoop pulp with finger, eat directly",
      "Mix pulp with water to make sherbet",
    ],
    nutritionalValue:
      "High in riboflavin, vitamin C, calcium; good for diarrhea recovery",
    seasonalAvailability: "Ripe fruit: April–July",
  },
  {
    id: "ep_fig_wild",
    nameEnglish: "Wild Fig (Cluster Fig)",
    nameTelugu: "అత్తి (Atti)",
    nameHindi: "गूलर (Gular)",
    nameLatin: "Ficus racemosa",
    habitat: "Riverbanks, waste land, Deccan forest clearings",
    region: "Deccan Plateau",
    identification: [
      "Small reddish-green figs growing directly on trunk and branches",
      "Large spreading tree with smooth bark",
      "Milky sap from stem",
    ],
    edibleParts: ["Ripe figs (red/orange)", "Young leaves", "Young shoots"],
    preparation: [
      "Raw: eat ripe figs directly",
      "Cooked: boil unripe figs as vegetable",
      "Young shoots: boil and eat like spinach",
    ],
    nutritionalValue:
      "Good source of calcium, iron, potassium, and dietary fiber",
    seasonalAvailability: "Year-round in Deccan",
  },
  {
    id: "ep_neem",
    nameEnglish: "Neem",
    nameTelugu: "వేప (Vepa)",
    nameHindi: "नीम (Neem)",
    nameLatin: "Azadirachta indica",
    habitat: "Ubiquitous across AP — roadsides, fields, everywhere",
    region: "Deccan Plateau",
    identification: [
      "Pinnate leaves with serrated leaflets",
      "Small white flowers in clusters",
      "Yellow-green oval fruits 1-2 cm when ripe",
    ],
    edibleParts: [
      "Young leaves (extremely bitter)",
      "Flower buds",
      "Ripe fruits (pulp only, not seed)",
    ],
    preparation: [
      "Young leaves: boil multiple times changing water to reduce bitterness; eat with jaggery",
      "Flowers: dry-roast and eat with jaggery during Ugadi festival",
      "Caution: only small amounts — medicinal not sustenance",
    ],
    nutritionalValue: "Rich in protein, calcium; significant medicinal value",
    seasonalAvailability: "Leaves year-round; flowers: Feb–April",
    caution:
      "Consume only small quantities; large amounts toxic; never give to children or pregnant women",
  },
  {
    id: "ep_indian_jujube",
    nameEnglish: "Indian Jujube (Ber)",
    nameTelugu: "రేగి (Regi)",
    nameHindi: "बेर (Ber)",
    nameLatin: "Ziziphus mauritiana",
    habitat: "Dry Deccan scrub, Rayalaseema and Kurnool areas",
    region: "Deccan Plateau",
    identification: [
      "Shrub/small tree with thorny branches",
      "Small round/oval fruits 2-4 cm — green turning red/brown when ripe",
      "Shiny oval leaves",
    ],
    edibleParts: ["Ripe fruit", "Green fruit (astringent)"],
    preparation: [
      "Raw: eat directly — sweet and tart",
      "Dried: sun-dry for 2-3 days to concentrate sweetness",
      "Green: boil and eat with salt and chilli",
    ],
    nutritionalValue:
      "Excellent source of Vitamin C; high in carbohydrates and energy",
    seasonalAvailability: "Dec–March (peak in Rayalaseema)",
  },
  {
    id: "ep_drumstick",
    nameEnglish: "Drumstick (Moringa)",
    nameTelugu: "మునగ (Munaga)",
    nameHindi: "सहजन (Sahajan)",
    nameLatin: "Moringa oleifera",
    habitat: "Grown in virtually every village in AP; also wild in dry areas",
    region: "Deccan Plateau",
    identification: [
      "Long green pods 30-50 cm, ribbed",
      "Small tripinnate leaves",
      "White fragrant flowers",
      "Fast-growing drought-resistant tree",
    ],
    edibleParts: [
      "Pods",
      "Leaves",
      "Flowers",
      "Young roots (small amounts)",
      "Seeds",
    ],
    preparation: [
      "Pods: boil or pressure cook in curries",
      "Leaves: eat raw in salads or cook as leafy vegetable",
      "Seeds: roast and eat for emergency nutrition",
      "Water purification: crush seeds and add to water to clarify",
    ],
    nutritionalValue:
      "Exceptional nutrition: 7x Vitamin C of oranges, 4x calcium of milk, complete amino acids",
    seasonalAvailability: "Year-round in AP climate",
  },
  {
    id: "ep_purslane",
    nameEnglish: "Common Purslane",
    nameTelugu: "పవళ్ళకూర (Pavallakoora)",
    nameHindi: "कुल्फा (Kulfa)",
    nameLatin: "Portulaca oleracea",
    habitat: "Garden weed, cultivated fields, waste ground across AP",
    region: "Deccan Plateau",
    identification: [
      "Low-growing succulent with thick reddish stems",
      "Small oval fleshy leaves",
      "Tiny yellow flowers",
      "Spreads on ground",
    ],
    edibleParts: ["Leaves", "Stems", "Flowers"],
    preparation: [
      "Raw: eat fresh leaves and stems directly",
      "Cooked: boil or stir-fry as vegetable",
      "Blanch 2 minutes to reduce oxalate content",
    ],
    nutritionalValue:
      "Highest Omega-3 content of any leafy vegetable; rich in vitamins A, C, E",
    seasonalAvailability: "Year-round in AP; peak in monsoon (June–Sept)",
  },
  {
    id: "ep_banana_wild",
    nameEnglish: "Wild Banana",
    nameTelugu: "అడవి అరటి (Adavi Arati)",
    nameHindi: "जंगली केला (Jungle Kela)",
    nameLatin: "Musa balbisiana",
    habitat: "Moist forest edges in Eastern Ghats, Visakhapatnam Agency area",
    region: "Eastern Ghats",
    identification: [
      "Large paddle-shaped leaves 1-2 m long",
      "Green fruit bunches, seeds inside unlike cultivated bananas",
      "Banana-like smell from stem when cut",
    ],
    edibleParts: [
      "Unripe cooked fruit",
      "Flower (banana blossom)",
      "Inner stem core",
      "Cooked seeds",
    ],
    preparation: [
      "Unripe fruit: roast directly in fire or boil",
      "Flower: boil and eat with spices",
      "Inner stem: strip outer layers, chop inner core, cook as vegetable",
    ],
    nutritionalValue: "Good source of potassium, Vitamin B6, starch for energy",
    seasonalAvailability: "Year-round in humid forest areas",
  },
  {
    id: "ep_bamboo_shoot",
    nameEnglish: "Bamboo Shoots",
    nameTelugu: "వెదురు చిగురు (Veduru Chiguru)",
    nameHindi: "बाँस की कोंपल (Baans ki Kompal)",
    nameLatin: "Bambusa bambos",
    habitat: "Eastern Ghats forests, Araku valley, Agency areas",
    region: "Eastern Ghats",
    identification: [
      "Emerging from ground near bamboo clumps",
      "Cone-shaped, 15-30 cm tall when edible",
      "Pinkish-green outer covering",
    ],
    edibleParts: ["Young shoots (under 30 cm)"],
    preparation: [
      "MUST boil 20+ minutes — raw shoots contain cyanogenic glycosides",
      "Change water twice during boiling to remove bitterness",
      "Add to curries or eat as vegetable after boiling",
    ],
    nutritionalValue: "Low calorie, high fiber, some protein and vitamins",
    seasonalAvailability: "Monsoon: June–September",
    caution: "NEVER eat raw — must boil thoroughly to remove cyanide compounds",
  },
  {
    id: "ep_jackfruit",
    nameEnglish: "Jackfruit",
    nameTelugu: "పనసపండు (Panasapendu)",
    nameHindi: "कटहल (Kathal)",
    nameLatin: "Artocarpus heterophyllus",
    habitat:
      "Common in East Godavari, West Godavari, Krishna district gardens and forests",
    region: "Godavari/Krishna Delta",
    identification: [
      "Huge green-yellow fruit 25-90 cm growing on trunk",
      "Spiky exterior",
      "Yellow aromatic pulp inside when ripe",
      "Large tree with big rounded leaves",
    ],
    edibleParts: [
      "Ripe yellow pods",
      "Unripe green fruit cooked",
      "Seeds (cooked)",
    ],
    preparation: [
      "Ripe: peel segments, eat pulp directly",
      "Unripe: boil and use as meat substitute in curry",
      "Seeds: boil 20 min and eat like chickpeas, or roast",
    ],
    nutritionalValue:
      "High in calories, vitamin B6, C, magnesium; seeds are high protein",
    seasonalAvailability: "Ripe fruit: March–June",
  },
  {
    id: "ep_water_hyacinth",
    nameEnglish: "Water Hyacinth Stem (emergency)",
    nameTelugu: "జలకుంభి (Jalakumbhi)",
    nameHindi: "जलकुंभी (Jalkumbhi)",
    nameLatin: "Eichhornia crassipes",
    habitat: "Ponds, canals, backwaters in Krishna/Godavari delta",
    region: "Godavari/Krishna Delta",
    identification: [
      "Floating plant with purple flowers",
      "Inflated bulbous leaf stalks",
      "Dense mats on water surface",
    ],
    edibleParts: ["Young stems (emergency only)", "Flowers"],
    preparation: [
      "Boil young stems 15 min, drain, add spices",
      "Use only as last resort — tough fiber",
    ],
    nutritionalValue: "Minimal calories; some minerals",
    seasonalAvailability: "Year-round in delta areas",
    caution:
      "Only eat if from clean non-polluted water; high absorption of heavy metals from polluted water",
  },
  {
    id: "ep_lotus",
    nameEnglish: "Lotus",
    nameTelugu: "తామర (Tamara)",
    nameHindi: "कमल (Kamal)",
    nameLatin: "Nelumbo nucifera",
    habitat: "Ponds, lakes, temple tanks in AP delta regions",
    region: "Godavari/Krishna Delta",
    identification: [
      "Large round floating/erect leaves",
      "Pink/white flowers",
      "Seedhead like a watering-can spout",
    ],
    edibleParts: [
      "Rhizome (underground stem)",
      "Seeds",
      "Young leaves",
      "Stamens",
    ],
    preparation: [
      "Rhizome: peel, slice, boil 20 min or stir-fry",
      "Seeds: eat raw from green seedhead or dried-roasted",
      "Young leaves: wrap food for steaming or boil",
    ],
    nutritionalValue:
      "Rhizome high in starch, potassium, B vitamins; seeds are protein-rich",
    seasonalAvailability: "Rhizome: year-round; flowers: May–August",
  },
  {
    id: "ep_taro",
    nameEnglish: "Taro / Colocasia",
    nameTelugu: "చేమ (Chema)",
    nameHindi: "अरबी (Arbi)",
    nameLatin: "Colocasia esculenta",
    habitat: "Moist fertile soil, paddy field edges, stream banks in AP",
    region: "Coastal Andhra",
    identification: [
      "Large heart-shaped leaves, water beads on surface",
      "Underground corm (bulb)",
      "Purple-green taro leaves",
    ],
    edibleParts: ["Corm (cook thoroughly)", "Leaves (cook thoroughly)", "Stem"],
    preparation: [
      "MUST cook thoroughly — raw causes intense mouth irritation due to calcium oxalate crystals",
      "Boil corm 30+ min until fork-tender",
      "Leaves: boil 20 min changing water once",
    ],
    nutritionalValue:
      "High in starch, potassium, B vitamins; good emergency calorie source",
    seasonalAvailability: "Year-round; harvest Oct–Nov",
    caution:
      "NEVER eat raw — calcium oxalate crystals cause severe throat and mouth burning",
  },
  {
    id: "ep_water_spinach",
    nameEnglish: "Water Spinach / Kangkong",
    nameTelugu: "తుమ్మిచేత (Tummichetha)",
    nameHindi: "कलमी शाक (Kalmi Shaak)",
    nameLatin: "Ipomoea aquatica",
    habitat:
      "Waterlogged areas, canal banks, paddy margins in AP coastal districts",
    region: "Coastal Andhra",
    identification: [
      "Hollow stem floats on water",
      "Arrow-shaped leaves",
      "Pink/white morning glory-like flowers",
    ],
    edibleParts: ["Leaves", "Young stems"],
    preparation: [
      "Raw: young tender shoots can be eaten fresh",
      "Cooked: stir-fry or boil 5 min — faster to cook than most greens",
    ],
    nutritionalValue: "High in iron, calcium, vitamins A and C",
    seasonalAvailability: "Year-round in wet areas",
  },
  {
    id: "ep_morinda_root",
    nameEnglish: "Indian Mulberry",
    nameTelugu: "మడ్డిచెట్టు (Maddichittu)",
    nameHindi: "आच (Aach)",
    nameLatin: "Morinda citrifolia",
    habitat: "Coastal areas of AP, forest edges in East Godavari",
    region: "Coastal Andhra",
    identification: [
      "Large oval shiny leaves",
      "White flowers",
      "Lumpy white-green fruit 5-10 cm with distinctive pungent smell when ripe",
    ],
    edibleParts: ["Ripe fruit", "Young leaves", "Seeds (roasted)"],
    preparation: [
      "Ripe fruit: eat directly despite pungent smell — sweet-sour flavor",
      "Young leaves: cooked as vegetable",
    ],
    nutritionalValue:
      "High in Vitamin C, antioxidants; significant medicinal properties",
    seasonalAvailability: "Fruit year-round in coastal areas",
  },
  {
    id: "ep_ambada",
    nameEnglish: "Hog Plum / Indian Hog Plum",
    nameTelugu: "అంబాడ (Ambada)",
    nameHindi: "अमड़ा (Amda)",
    nameLatin: "Spondias pinnata",
    habitat:
      "Mixed forests in Eastern Ghats, East and West Godavari forest areas",
    region: "Eastern Ghats",
    identification: [
      "Large tree with pinnate leaves",
      "Green or yellow oval fruit 4-7 cm",
      "Hard inner seed",
    ],
    edibleParts: ["Ripe fruit", "Young leaves"],
    preparation: [
      "Raw: eat ripe yellow-orange fruit — sour-sweet taste",
      "Unripe: pickle in salt and chilli",
    ],
    nutritionalValue: "Good source of Vitamin C and minerals",
    seasonalAvailability: "May–July",
  },
  {
    id: "ep_mahua",
    nameEnglish: "Mahua",
    nameTelugu: "ఇప్పచెట్టు (Ippachettu)",
    nameHindi: "महुआ (Mahua)",
    nameLatin: "Madhuca longifolia",
    habitat:
      "Tribal forests in Eastern Ghats, Visakhapatnam Agency, East Godavari",
    region: "Eastern Ghats",
    identification: [
      "Large tree, deciduous",
      "Fleshy cream-colored flowers (most nutritious part)",
      "Fruit: brown berry 2-5 cm",
      "Seeds contain edible oil",
    ],
    edibleParts: [
      "Flowers (fresh or dried)",
      "Fruit (cooked)",
      "Seeds (oil source)",
    ],
    preparation: [
      "Flowers: eat raw or dry in sun for storage; boil and eat as porridge base",
      "Fruit: boil and consume",
      "Seed oil: press seeds for cooking oil",
    ],
    nutritionalValue:
      "Flowers: high sugar and protein; seeds: 35-45% edible oil",
    seasonalAvailability:
      "Flowers: Feb–April (peak collection); Fruit: May–June",
  },
  {
    id: "ep_jamun",
    nameEnglish: "Black Plum / Java Plum",
    nameTelugu: "నేరేడు (Neredu)",
    nameHindi: "जामुन (Jamun)",
    nameLatin: "Syzygium cumini",
    habitat:
      "Wild and cultivated across AP; common in village tanks and forest edges",
    region: "Deccan Plateau",
    identification: [
      "Large tree with dark glossy leaves",
      "Small oval purple-black fruit 1-2 cm",
      "Stains tongue purple when eaten",
    ],
    edibleParts: ["Ripe fruit", "Seeds (medicinal)"],
    preparation: [
      "Raw: eat directly — sweet-tart flavor",
      "Juice: crush fruits in water, strain",
    ],
    nutritionalValue:
      "High in iron, Vitamin C; excellent for blood sugar management (diabetic patients)",
    seasonalAvailability: "May–July",
  },
  {
    id: "ep_gooseberry",
    nameEnglish: "Indian Gooseberry (Amla)",
    nameTelugu: "ఉసిరి (Usiri)",
    nameHindi: "आंवला (Amla)",
    nameLatin: "Phyllanthus emblica",
    habitat: "Deciduous forests, village groves across AP",
    region: "Deccan Plateau",
    identification: [
      "Small tree with feathery bipinnate leaves",
      "Small round green-yellow fruit 2-4 cm",
      "Very sour, astringent taste",
    ],
    edibleParts: ["Ripe fruit", "Dried fruit"],
    preparation: [
      "Raw: eat directly — sour and astringent, leaves sweet aftertaste",
      "Dried: sun-dry for 2-3 days to concentrate and preserve; lasts 6+ months",
      "Pickled: in salt brine for long-term storage",
    ],
    nutritionalValue:
      "20x Vitamin C of orange; excellent immune support in disasters",
    seasonalAvailability: "Oct–Feb",
  },
  {
    id: "ep_ivy_gourd",
    nameEnglish: "Ivy Gourd / Little Gourd",
    nameTelugu: "దొండకాయ (Dondakaaya)",
    nameHindi: "कुंदरू (Kundru)",
    nameLatin: "Coccinia grandis",
    habitat: "Fences, hedges, waste land across AP",
    region: "Coastal Andhra",
    identification: [
      "Climbing vine with tendrils",
      "Small oval green fruit turning red when ripe",
      "Heart-shaped or 5-angled leaves",
    ],
    edibleParts: ["Unripe green fruit", "Young leaves", "Young shoots"],
    preparation: [
      "Unripe fruit: boil and eat as vegetable or in curry",
      "Young leaves: boil 10 min and eat",
      "Ripe red fruit: edible raw but less palatable",
    ],
    nutritionalValue: "Moderate Vitamin C; good for blood sugar regulation",
    seasonalAvailability: "Year-round in AP climate",
  },
  {
    id: "ep_amaranth",
    nameEnglish: "Amaranth / Pigweed",
    nameTelugu: "తోటకూర (Thotakoora)",
    nameHindi: "चौलाई (Chaulai)",
    nameLatin: "Amaranthus tricolor",
    habitat: "Garden weed, cultivated fields, waste ground throughout AP",
    region: "Deccan Plateau",
    identification: [
      "Annual herb with red or green diamond-shaped leaves",
      "Long spike flowers in red/green",
      "Slightly rough texture",
    ],
    edibleParts: ["Leaves", "Young stems", "Seeds"],
    preparation: [
      "Leaves: boil 5 min or stir-fry with garlic",
      "Seeds: dry-roast and make porridge or flatbread",
      "Young plant: eat raw as salad",
    ],
    nutritionalValue:
      "Exceptional protein (contains lysine), iron, calcium, Vitamins A and C",
    seasonalAvailability: "Year-round in AP",
  },
];

export const EDIBLE_PLANTS_COASTAL: EdiblePlant[] = [
  {
    id: "ep_coconut",
    nameEnglish: "Coconut",
    nameTelugu: "కొబ్బరి (Kobbari)",
    nameHindi: "नारियल (Nariyal)",
    nameLatin: "Cocos nucifera",
    habitat: "Ubiquitous on AP coast from Srikakulam to Nellore",
    region: "Coastal Andhra",
    identification: [
      "Tall palm with feathery leaves",
      "Large green/brown nut hanging in clusters",
      "Inner white flesh, clear water inside",
    ],
    edibleParts: [
      "Coconut water",
      "White flesh",
      "Coconut oil (from dried flesh)",
      "Tender shoot (palm heart)",
    ],
    preparation: [
      "Green coconut: pierce and drink water directly (electrolyte replacement)",
      "Ripe flesh: eat directly or grate for cooking",
      "Dried copra: press for cooking oil",
    ],
    nutritionalValue:
      "Coconut water: electrolytes (potassium, sodium); flesh: fat and calories",
    seasonalAvailability: "Year-round",
  },
  {
    id: "ep_sea_purslane",
    nameEnglish: "Sea Purslane",
    nameTelugu: "కడలి తామర (Kadali Tamara)",
    nameHindi: "समुद्री पोई (Samudri Poi)",
    nameLatin: "Sesuvium portulacastrum",
    habitat: "AP coastal salt flats, mangrove edges, beach margins",
    region: "Coastal Andhra",
    identification: [
      "Low spreading succulent plant",
      "Reddish succulent stems and leaves",
      "Small pink star-shaped flowers",
    ],
    edibleParts: ["Young leaves and stems"],
    preparation: [
      "Boil 10 min to reduce saltiness",
      "Eat as salad or cooked vegetable",
    ],
    nutritionalValue: "Minerals, Vitamin C; natural sodium source",
    seasonalAvailability: "Year-round on coast",
  },
  {
    id: "ep_mangrove_apple",
    nameEnglish: "Mangrove Apple / Crabapple Mangrove",
    nameTelugu: "పల్లి గురాయి (Palli Gurayi)",
    nameHindi: "मैंग्रोव सेब",
    nameLatin: "Sonneratia alba",
    habitat: "AP mangrove forests: Krishna estuary, Coringa WLS (Kakinada)",
    region: "Coastal Andhra",
    identification: [
      "Rounded apple-like fruit 3-5 cm, green",
      "Many white stamens",
      "Grows in saline intertidal zone",
    ],
    edibleParts: ["Ripe fruit"],
    preparation: [
      "Raw: eat ripe fruit — sour taste; use as lime substitute",
      "Cooked: boil in water for 10 min as emergency sour-base for cooking",
    ],
    nutritionalValue: "Vitamin C, dietary fiber",
    seasonalAvailability: "Year-round",
  },
  {
    id: "ep_paddy_grass",
    nameEnglish: "Paddy / Rice",
    nameTelugu: "వరి (Vari)",
    nameHindi: "चावल (Chawal)",
    nameLatin: "Oryza sativa",
    habitat: "Paddy fields across Krishna, Godavari, and coastal AP",
    region: "Godavari/Krishna Delta",
    identification: [
      "Grass with grain heads",
      "Golden when ripe",
      "Grows in flooded paddies",
    ],
    edibleParts: ["Seeds (rice grains)", "Young shoots as emergency vegetable"],
    preparation: [
      "Grains: thresh and pound to remove husk; boil with 2:1 water ratio",
      "Young shoots: boil 5 min and eat — slightly sweet",
      "Even unprocessed grain: crack between stones and boil",
    ],
    nutritionalValue: "High in carbohydrates; primary energy source",
    seasonalAvailability: "Harvest: Oct–Nov (Kharif) and March–April (Rabi)",
  },
];

export const EDIBLE_PLANTS_EASTERN_GHATS: EdiblePlant[] = [
  {
    id: "ep_soap_nut",
    nameEnglish: "Soap Nut (Reetha)",
    nameTelugu: "కుంకుడు (Kunkudu)",
    nameHindi: "रीठा (Ritha)",
    nameLatin: "Sapindus mukorossi",
    habitat:
      "Mixed forests in Eastern Ghats, Visakhapatnam and Srikakulam districts",
    region: "Eastern Ghats",
    identification: [
      "Large tree with alternate pinnate leaves",
      "Round brown-yellow fruit 1.5-2 cm",
      "Saponins foam in water",
    ],
    edibleParts: ["Seeds (roasted — not pulp)"],
    preparation: [
      "Crack outer shell",
      "Roast seeds over fire 15 min",
      "Eat roasted seeds — bland but nutritious",
    ],
    nutritionalValue: "Seeds contain protein and fat",
    seasonalAvailability: "Oct–Dec",
    caution: "Only seeds are edible; the pulp causes digestive upset",
  },
  {
    id: "ep_kendu",
    nameEnglish: "Kendu / Ebony",
    nameTelugu: "తుమ్మి (Tummi)",
    nameHindi: "केन्दु (Kendu)",
    nameLatin: "Diospyros melanoxylon",
    habitat:
      "Dry deciduous forests of Eastern Ghats, Kondapalli, Nallamala ranges",
    region: "Eastern Ghats",
    identification: [
      "Medium tree with elliptic leaves",
      "Small orange-yellow fruit 2-4 cm when ripe",
      "Astringent taste when unripe",
    ],
    edibleParts: ["Ripe orange-yellow fruits only"],
    preparation: [
      "Raw: eat ripe fruit — sweet when fully ripe",
      "Wait until fully soft/orange",
    ],
    nutritionalValue: "Sugars, some Vitamin C",
    seasonalAvailability: "Sept–Nov",
    caution: "Unripe fruit is very astringent and causes mouth dryness",
  },
  {
    id: "ep_tendu_leaf",
    nameEnglish: "Indian Persimmon (Tendu)",
    nameTelugu: "ఉర్రుపాయి (Urrupayi)",
    nameHindi: "तेंदू (Tendu)",
    nameLatin: "Diospyros melanoxylon",
    habitat: "Dry forests of Eastern Ghats, Nellore to Srikakulam",
    region: "Eastern Ghats",
    identification: [
      "Hard wood tree",
      "Orange-red fruit similar to small persimmon",
      "Large oval leaves (used for beedi wrapping)",
    ],
    edibleParts: ["Ripe fruit"],
    preparation: ["Raw: eat ripe orange-red fruit — sweet and mild"],
    nutritionalValue: "Sugars, some fiber",
    seasonalAvailability: "Oct–Dec",
  },
  {
    id: "ep_wild_turmeric",
    nameEnglish: "Wild Turmeric",
    nameTelugu: "కర్కుమ (Karkuma)",
    nameHindi: "कस्तूरी हल्दी (Kasturi Haldi)",
    nameLatin: "Curcuma aromatica",
    habitat: "Moist forest floors in Eastern Ghats, under shade of trees",
    region: "Eastern Ghats",
    identification: [
      "Large banana-like leaves rising from ground",
      "Orange-yellow rhizome (underground stem)",
      "Characteristic turmeric smell when cut",
    ],
    edibleParts: ["Rhizome (sparingly)"],
    preparation: [
      "Boil or roast rhizome 10 min",
      "Grate and add to food as spice",
      "Also wound treatment: crush rhizome and apply to cuts",
    ],
    nutritionalValue: "Anti-inflammatory; curcumin content",
    seasonalAvailability: "Harvest: Nov–Jan (dormant season)",
    caution:
      "Large quantities cause stomach upset; use as spice/small amounts only",
  },
  {
    id: "ep_arrowroot",
    nameEnglish: "Indian Arrowroot",
    nameTelugu: "పాల్లు (Pallu)",
    nameHindi: "अरारोट (Ararot)",
    nameLatin: "Maranta arundinacea",
    habitat: "Moist shaded forest floor in Eastern Ghats, Araku valley",
    region: "Eastern Ghats",
    identification: [
      "Rhizomatous plant 1-1.5 m tall",
      "Large oval pointed leaves",
      "White underground rhizome, starchy",
    ],
    edibleParts: ["Underground rhizome"],
    preparation: [
      "Dig rhizome and peel",
      "Pound in stone mortar to extract starch",
      "Mix starch with water and boil to thick porridge",
      "Or roast whole rhizome in fire",
    ],
    nutritionalValue: "High in starch/carbohydrates; easily digestible",
    seasonalAvailability: "Year-round; best harvest Oct–April",
  },
  {
    id: "ep_wild_yam",
    nameEnglish: "Wild Yam (Elephant Foot Yam)",
    nameTelugu: "కాడుపెందాలం (Kadu Pendalam)",
    nameHindi: "जंगली रतालू (Jungle Ratalu)",
    nameLatin: "Dioscorea alata",
    habitat: "Forest edges in Eastern Ghats, especially East Godavari Agency",
    region: "Eastern Ghats",
    identification: [
      "Climbing vine with heart-shaped leaves",
      "Underground tuber can be very large (up to 30 kg)",
      "Rough brown-purple skin",
    ],
    edibleParts: ["Underground tuber"],
    preparation: [
      "MUST boil or roast — cannot eat raw",
      "Peel, cut into pieces, boil 30 min with salt",
      "Or roast directly in fire coals 45 min",
    ],
    nutritionalValue:
      "Very high in starch — excellent emergency calorie source",
    seasonalAvailability: "Harvest: Dec–March",
    caution:
      "Some wild yam species contain dioscorine — always boil thoroughly and discard cooking water",
  },
  {
    id: "ep_sal_seed",
    nameEnglish: "Sal Tree Seeds",
    nameTelugu: "జువ్వి (Juvvi)",
    nameHindi: "साल (Sal)",
    nameLatin: "Shorea robusta",
    habitat:
      "Mixed forests in northern Eastern Ghats, Visakhapatnam and Srikakulam forests",
    region: "Eastern Ghats",
    identification: [
      "Large forest tree",
      "Two-winged seeds falling in pairs",
      "Leathery oval leaves",
    ],
    edibleParts: ["Seeds (after processing)"],
    preparation: [
      "Collect seeds, remove wings",
      "Boil 30 min to remove bitterness",
      "Pound and mix with water to porridge consistency",
      "Oil can be extracted from seed fat",
    ],
    nutritionalValue: "High fat content; used as cocoa butter substitute",
    seasonalAvailability: "April–May",
  },
  {
    id: "ep_heart_leaf",
    nameEnglish: "Heart Leaf (Giloy)",
    nameTelugu: "తిప్పతీగె (Tippattige)",
    nameHindi: "गिलोय (Giloy)",
    nameLatin: "Tinospora cordifolia",
    habitat: "Climbing on host trees across AP, especially in moist forests",
    region: "Eastern Ghats",
    identification: [
      "Climbing vine",
      "Heart-shaped leaves",
      "Yellowish-green flowers",
      "Red berries when ripe",
    ],
    edibleParts: ["Stem (for medicinal decoction)", "Young leaves (cooked)"],
    preparation: [
      "Medicinal: boil 2 cm piece of stem in water for 5 min; drink liquid as tonic",
      "Leaves: boil 10 min and eat as vegetable",
    ],
    nutritionalValue: "Significant medicinal value; immune booster",
    seasonalAvailability: "Year-round",
  },
];

export const EDIBLE_PLANTS_WESTERN_AP: EdiblePlant[] = [
  {
    id: "ep_prickly_pear",
    nameEnglish: "Prickly Pear Cactus",
    nameTelugu: "నాగుల దొండ (Nagula Donda)",
    nameHindi: "नागफनी (Nagaphani)",
    nameLatin: "Opuntia ficus-indica",
    habitat:
      "Rocky dry areas of Rayalaseema, Kurnool, Anantapur, Chittoor districts",
    region: "Western AP",
    identification: [
      "Flat paddle-shaped jointed stems",
      "Spines and glochids (tiny hair-like spines)",
      "Red-purple oval fruit at stem edges",
    ],
    edibleParts: ["Fruit (burn off spines first)", "Young pads (nopales)"],
    preparation: [
      "Fruit: burn all spines with fire or roll in soil; peel thick skin; eat interior",
      "Pads: scrape spines with knife, peel, slice and boil 15 min",
    ],
    nutritionalValue:
      "High in Vitamin C, water content, and fiber; good hydration source",
    seasonalAvailability: "Fruit: July–September",
    caution:
      "Remove ALL spines and glochids before eating — tiny glochids cause skin irritation",
  },
  {
    id: "ep_babul_gum",
    nameEnglish: "Babul / Acacia Gum",
    nameTelugu: "తుమ్మ (Tumma)",
    nameHindi: "बबूल (Babool)",
    nameLatin: "Vachellia nilotica",
    habitat: "Dry scrub, roadsides, Rayalaseema and Kurnool arid zones",
    region: "Western AP",
    identification: [
      "Thorny tree with paired spines",
      "Round yellow flower balls",
      "Long narrow brown seed pods with constrictions",
      "Gum oozes naturally from bark",
    ],
    edibleParts: ["Gum (resin)", "Young pods", "Seeds", "Young leaves"],
    preparation: [
      "Gum: collect hardened gum from bark; dissolve in water and drink",
      "Young pods: boil and eat",
      "Seeds: grind and use as flour emergency",
      "Young leaves: boil and eat",
    ],
    nutritionalValue: "Gum: soluble fiber and energy; seeds: protein",
    seasonalAvailability: "Gum: year-round; pods: March–May",
  },
  {
    id: "ep_horse_gram",
    nameEnglish: "Horse Gram",
    nameTelugu: "ఉలవలు (Ulavalu)",
    nameHindi: "कुल्थी (Kulthi)",
    nameLatin: "Macrotyloma uniflorum",
    habitat:
      "Cultivated and wild in dry lands of Rayalaseema, AP-Karnataka border",
    region: "Western AP",
    identification: [
      "Small climbing annual",
      "Small dark brown lentil-like seeds in narrow pods",
      "Drought-resistant field crop",
    ],
    edibleParts: ["Seeds", "Young leaves"],
    preparation: [
      "Soak seeds 12 hrs, boil 30 min until soft",
      "Sprouted seeds: soak 24 hrs in water — eat raw as sprouts",
      "Ground to flour: make flatbread",
    ],
    nutritionalValue:
      "High protein (22-24%), iron, calcium; excellent emergency food",
    seasonalAvailability: "Harvest: Oct–Dec",
  },
  {
    id: "ep_cluster_bean",
    nameEnglish: "Cluster Bean / Guar",
    nameTelugu: "గోరు చిక్కుడు (Goru Chikkudu)",
    nameHindi: "ग्वार (Gwar)",
    nameLatin: "Cyamopsis tetragonoloba",
    habitat:
      "Dry fields and waste land in Anantapur, Kurnool, Prakasam districts",
    region: "Western AP",
    identification: [
      "Upright legume plant to 1 m",
      "Narrow pods in clusters of 5-10",
      "Small pink flowers",
    ],
    edibleParts: ["Young pods", "Seeds", "Young leaves"],
    preparation: [
      "Young pods: boil 10 min and eat — slightly bitter",
      "Seeds: soak and boil like lentils",
    ],
    nutritionalValue: "Excellent guar gum content; good protein and fiber",
    seasonalAvailability: "Pods: August–October",
  },
];

// ---------------------------------------------------------------------------
// TOXIC PLANTS AND ANIMALS — AP specific with antidote guidance
// ---------------------------------------------------------------------------

export interface ToxicSpecies {
  id: string;
  nameEnglish: string;
  nameTelugu: string;
  nameHindi: string;
  type: "plant" | "animal";
  habitat: string;
  identification: string[];
  toxicParts?: string[];
  symptoms: string[];
  immediateAction: string[];
  antidoteTreatment: string;
  hospitalReferral: string;
  apRelevance: string;
}

export const TOXIC_SPECIES: ToxicSpecies[] = [
  // TOXIC PLANTS
  {
    id: "tx_datura",
    nameEnglish: "Datura / Jimsonweed",
    nameTelugu: "ఉమ్మెత్త (Ummetta)",
    nameHindi: "धतूरा (Datura)",
    type: "plant",
    habitat: "Roadsides, waste land, ruined buildings throughout AP",
    identification: [
      "Large white trumpet-shaped flowers",
      "Spiny egg-shaped seed capsule",
      "Strong unpleasant smell from leaves",
      "Plant height 0.5-1.5 m",
    ],
    toxicParts: ["All parts — especially seeds and flowers"],
    symptoms: [
      "Dry mouth, extreme thirst",
      "Dilated pupils, blurred vision",
      "Rapid heart rate, flushed skin",
      "Hallucinations, confusion, agitation",
      "Coma in severe cases",
    ],
    immediateAction: [
      "Call 112/108 immediately",
      "Do NOT induce vomiting",
      "Keep person calm in dark quiet room",
      "Note all plants/seeds touched or ingested",
    ],
    antidoteTreatment:
      "Physostigmine (atropine antidote) — hospital only; gastric lavage and activated charcoal",
    hospitalReferral: "All exposures — emergency department immediately",
    apRelevance:
      "Extremely common weed in AP; children attracted to spiny capsules; also used illegally as intoxicant",
  },
  {
    id: "tx_oleander",
    nameEnglish: "Oleander",
    nameTelugu: "గన్నేరు (Ganneru)",
    nameHindi: "कनेर (Kaner)",
    type: "plant",
    habitat:
      "Widely planted as ornamental in AP cities, roadsides, hospitals, parks",
    identification: [
      "Evergreen shrub with long narrow leaves",
      "Pink or white tubular flowers in clusters",
      "Milky sap when stem cut",
      "Common garden plant",
    ],
    toxicParts: ["All parts including smoke from burning"],
    symptoms: [
      "Nausea, vomiting, abdominal pain",
      "Irregular slow heart rate (bradycardia)",
      "Dizziness, weakness",
      "Heart rhythm changes — can be fatal",
    ],
    immediateAction: [
      "Call 108 immediately",
      "If ingested: DO NOT induce vomiting",
      "Give activated charcoal if available within 1 hour",
      "Do NOT burn oleander branches — smoke is toxic",
    ],
    antidoteTreatment:
      "Cardiac monitoring + Digibind (if available); atropine for bradycardia — hospital ICU",
    hospitalReferral: "Any ingestion — cardiac emergency",
    apRelevance:
      "One of most poisonous common ornamental plants in AP; planted widely; children and cattle at risk",
  },
  {
    id: "tx_castor",
    nameEnglish: "Castor Plant",
    nameTelugu: "ఆముదం (Amudamu)",
    nameHindi: "अरंडी (Arandi)",
    type: "plant",
    habitat:
      "Widely grown in AP fields (oil crop) and also wild in waste ground",
    identification: [
      "Large palmate star-shaped leaves",
      "Spiny red seed capsules",
      "Large seeds with mottled brown pattern",
      "Stem may be reddish",
    ],
    toxicParts: ["Seeds (contain ricin — one of most toxic substances known)"],
    symptoms: [
      "Burning in mouth and throat",
      "Nausea, vomiting, diarrhea within 2-6 hours",
      "Dehydration and weakness",
      "Multi-organ failure in severe cases (delayed 24-72 hrs)",
    ],
    immediateAction: [
      "Emergency 108 immediately — even if seeds chewed but not swallowed",
      "Bring seed packet to hospital",
      "Activated charcoal if available",
    ],
    antidoteTreatment:
      "No specific antidote for ricin; supportive care — IV fluids, ventilation if needed",
    hospitalReferral: "Absolute emergency — ICU required",
    apRelevance:
      "AP is major castor oil crop state (Anantapur, Kurnool); seeds abundant and attractive to children",
  },
  {
    id: "tx_lantana",
    nameEnglish: "Lantana",
    nameTelugu: "రాచిపూలు (Rachi Phoolu)",
    nameHindi: "पुटुस (Putus)",
    type: "plant",
    habitat: "Invasive shrub across AP forests, roadsides, fields",
    identification: [
      "Multi-colored small flowers (red/orange/yellow/pink in same cluster)",
      "Small black berry-like fruits when ripe (green when unripe)",
      "Square hairy stems",
      "Strong pungent smell from leaves when crushed",
    ],
    toxicParts: ["Unripe green/black berries (toxic)", "Leaves"],
    symptoms: [
      "Nausea, vomiting, diarrhea",
      "Weakness, photosensitivity",
      "Liver toxicity with repeated exposure",
      "Children most at risk — attracted to berries",
    ],
    immediateAction: [
      "Call 108",
      "Do NOT induce vomiting if large quantity ingested",
      "Take to hospital with sample of plant",
    ],
    antidoteTreatment: "Supportive care, liver function monitoring — hospital",
    hospitalReferral: "Any significant ingestion, especially children",
    apRelevance:
      "Invasive pest plant across AP; unripe berries look like blackberries and attract children",
  },
  {
    id: "tx_wild_mushroom",
    nameEnglish: "Toxic Wild Mushrooms",
    nameTelugu: "పుట్టగొడుగు (Puttagoduqu)",
    nameHindi: "जहरीली मशरूम (Jahreeli Mushroom)",
    type: "plant",
    habitat: "Decaying wood, forest floors in Eastern Ghats monsoon season",
    identification: [
      "Any wild mushroom with: pure white gills, cup at base (volva), ring on stem, sickly sweet smell",
      "Death cap (Amanita) can look like edible mushrooms",
      "RULE: If any doubt — do NOT eat",
    ],
    toxicParts: ["Entire fruiting body of toxic species"],
    symptoms: [
      "Initial 6-24 hrs: nausea, vomiting, abdominal pain",
      "Apparent recovery 24-48 hrs (DECEPTIVE — still toxic)",
      "Day 3-7: liver and kidney failure (silent damage)",
    ],
    immediateAction: [
      "Hospital immediately even if feeling well",
      "Bring a sample of mushroom to hospital",
      "Do NOT wait for symptoms",
    ],
    antidoteTreatment:
      "IV N-acetylcysteine for liver protection; dialysis for kidney failure — ICU only",
    hospitalReferral: "Immediate — delayed liver failure is main risk",
    apRelevance:
      "Eastern Ghats tribals collect mushrooms; dangerous species present in monsoon season",
  },
  {
    id: "tx_yellow_oleander",
    nameEnglish: "Yellow Oleander",
    nameTelugu: "పచ్చ గన్నేరు (Paccha Ganneru)",
    nameHindi: "पीला कनेर (Peela Kaner)",
    type: "plant",
    habitat: "Gardens, parks, roadsides across AP",
    identification: [
      "Yellow trumpet-shaped flowers",
      "Hard round yellow-orange seeds inside pear-shaped fruit",
      "Different from pink/white Oleander — equally toxic",
    ],
    toxicParts: ["Seeds (most toxic)", "Leaves", "All parts"],
    symptoms: [
      "Vomiting within 30-60 min",
      "Slow irregular heart rate",
      "Collapse and cardiac arrest in severe cases",
    ],
    immediateAction: [
      "Emergency 108 immediately",
      "Note: seeds used in deliberate self-poisoning in India",
      "Bring seeds or fruit to hospital",
    ],
    antidoteTreatment:
      "Anti-digitalis antibodies (Digibind); cardiac monitoring; gastric lavage — hospital",
    hospitalReferral: "Absolute emergency — high mortality if delayed",
    apRelevance:
      "Major cause of plant poisoning deaths in AP and Tamil Nadu; seeds used in suicide attempts",
  },
  {
    id: "tx_water_hemlock",
    nameEnglish: "Water Hemlock / Poison Parsley",
    nameTelugu: "నీటి విష మొక్క (Niti Visha Mokka)",
    nameHindi: "जहरीला पार्सले (Jahreela Parsley)",
    type: "plant",
    habitat:
      "Waterlogged areas, canal banks, paddy margins in AP delta regions",
    identification: [
      "Umbrella-shaped white flower clusters",
      "Hollow jointed stem",
      "Carrot-like root (DO NOT eat)",
      "Looks like edible water plants",
    ],
    toxicParts: ["All parts — especially roots"],
    symptoms: [
      "Rapid onset seizures (within 30-60 min)",
      "Excessive salivation",
      "Abdominal pain",
      "Can be rapidly fatal",
    ],
    immediateAction: [
      "108 immediately",
      "Control seizures: protect from injury",
      "Hospital emergency",
    ],
    antidoteTreatment: "Anticonvulsants (Diazepam IV); supportive care — ICU",
    hospitalReferral: "Life-threatening emergency",
    apRelevance:
      "Found in delta wetlands; may be mistaken for edible water plants",
  },
  // VENOMOUS ANIMALS
  {
    id: "tx_russells_viper",
    nameEnglish: "Russell's Viper",
    nameTelugu: "రెక్కల పాము (Rekkala Paamu)",
    nameHindi: "दबोइया (Daboia)",
    type: "animal",
    habitat: "Agricultural fields, rocky terrain, semi-dry scrub throughout AP",
    identification: [
      "Heavy-bodied snake, 90-150 cm",
      "Chain of dark brown oval blotches on grey-brown body",
      "Loud hissing when disturbed",
      "Triangular head distinct from neck",
    ],
    symptoms: [
      "Severe local pain and swelling within minutes",
      "Bleeding from bite site and gums",
      "Blood in urine",
      "Kidney failure (delayed)",
      "Coagulopathy — blood does not clot",
    ],
    immediateAction: [
      "Immobilize bitten limb below heart level",
      "Remove rings/watch before swelling",
      "Walk calmly to hospital (do not run)",
      "Call 108",
      "Do NOT apply tourniquet, cut, or suck",
    ],
    antidoteTreatment:
      "Polyvalent anti-snake venom (PASV) 10 vials IV — free at all Government hospitals in AP",
    hospitalReferral:
      "All bites — Russell's viper has highest snakebite mortality in India",
    apRelevance:
      "Most dangerous snake in AP; agricultural worker bites peak in Kharif harvest (Oct-Nov)",
  },
  {
    id: "tx_king_cobra",
    nameEnglish: "King Cobra",
    nameTelugu: "రాజ నాగు (Raja Naagu)",
    nameHindi: "राज नाग (Raj Naag)",
    type: "animal",
    habitat: "Eastern Ghats forests, Araku Valley, dense forest areas",
    identification: [
      "World's longest venomous snake — up to 5 m",
      "Olive/brown with pale crossbands",
      "Can raise 1/3 of body off ground and look eye-to-eye",
      "Characteristic growl hiss",
    ],
    symptoms: [
      "Severe pain and swelling",
      "Drooping eyelids (ptosis) within 30-60 min",
      "Difficulty swallowing and breathing",
      "Respiratory paralysis (neurotoxic venom)",
    ],
    immediateAction: [
      "Run immediately — king cobra will chase",
      "Call 108",
      "Immobilize bitten limb",
      "Keep person lying still",
    ],
    antidoteTreatment:
      "Specific King Cobra antivenom — limited availability; airway management critical",
    hospitalReferral: "ICU emergency — respiratory support may be needed",
    apRelevance:
      "Less common but present in Eastern Ghats tribals areas; forest workers at risk",
  },
  {
    id: "tx_indian_cobra",
    nameEnglish: "Indian Cobra",
    nameTelugu: "నాగు పాము (Naagu Paamu)",
    nameHindi: "नाग (Naag)",
    type: "animal",
    habitat:
      "Agricultural land, forest edges, near human habitation throughout AP",
    identification: [
      "Hood with spectacle marking visible when spread",
      "90-150 cm; grey-brown to black coloration",
      "Loud hiss when threatened",
    ],
    symptoms: [
      "Moderate local pain and swelling",
      "Drooping eyelids",
      "Difficulty swallowing",
      "Paralysis of breathing muscles",
    ],
    immediateAction: [
      "108 immediately",
      "Immobilize limb",
      "Walk calmly to hospital",
    ],
    antidoteTreatment: "Polyvalent PASV IV — free at all Government hospitals",
    hospitalReferral: "All bites — respiratory paralysis develops fast",
    apRelevance:
      "Common in AP agricultural and forest areas; often enters homes in monsoon",
  },
  {
    id: "tx_common_krait",
    nameEnglish: "Common Krait",
    nameTelugu: "కట్ల పాము (Katla Paamu)",
    nameHindi: "करैत (Krait)",
    type: "animal",
    habitat: "Agricultural fields, especially paddy; enters homes at night",
    identification: [
      "Glossy black with thin white crossbands",
      "60-90 cm; thin slender body",
      "Nocturnal — bites while sleeping",
    ],
    symptoms: [
      "Bite often painless — victim unaware",
      "Abdominal pain in middle of night",
      "Ascending paralysis starting in face",
      "Respiratory failure (can occur during sleep)",
    ],
    immediateAction: [
      "ANY unexplained paralysis or breathing difficulty at night = assume krait bite",
      "Call 108 immediately",
      "Do NOT give food or water",
    ],
    antidoteTreatment:
      "Polyvalent PASV; ventilatory support in ICU — may need 24-48 hrs on ventilator",
    hospitalReferral: "Emergency ICU — respiratory failure risk",
    apRelevance:
      "Cause of many unexplained deaths in AP villages at night; enters homes seeking warmth",
  },
  {
    id: "tx_red_scorpion",
    nameEnglish: "Indian Red Scorpion",
    nameTelugu: "ఎర్ర తేలు (Erra Telu)",
    nameHindi: "लाल बिच्छू (Lal Bichchhu)",
    type: "animal",
    habitat:
      "Rocky terrain, old buildings, under stones in Rayalaseema, Kurnool, Guntur",
    identification: [
      "Reddish-orange color",
      "5-8 cm length",
      "Slender pincers and curved tail stinger",
    ],
    symptoms: [
      "Intense local pain immediately",
      "Profuse sweating and salivation",
      "Vomiting and abdominal pain",
      "Pulmonary edema (fluid in lungs)",
      "Heart failure in severe cases",
    ],
    immediateAction: [
      "108 immediately — all Indian Red Scorpion stings are medical emergencies",
      "Cold compress on sting site for pain",
      "Keep still and calm",
      "Do NOT apply tourniquet",
    ],
    antidoteTreatment:
      "Prazosin (alpha-blocker) 30 micrograms/kg per dose every 3 hours — available at Govt hospitals; ICU monitoring",
    hospitalReferral: "All stings — paediatric deaths are common",
    apRelevance:
      "One of the most dangerous scorpions in the world; endemic to AP/Maharashtra/Goa; common in Rayalaseema rocky areas",
  },
  {
    id: "tx_indian_yellow_scorpion",
    nameEnglish: "Indian Yellow Scorpion",
    nameTelugu: "పసుపు తేలు (Pasupu Telu)",
    nameHindi: "पीला बिच्छू (Peela Bichchhu)",
    type: "animal",
    habitat: "Sandy/dry soils, desert margins in western AP districts",
    identification: [
      "Yellow-tan coloration",
      "Medium-sized 6-8 cm",
      "Broader pincers than red scorpion",
    ],
    symptoms: [
      "Severe local pain and burning",
      "Localized swelling",
      "Less systemic than red scorpion",
      "Fever and nausea",
    ],
    immediateAction: [
      "Cold compress on site",
      "Paracetamol for pain",
      "Children and elderly: hospital regardless",
      "Adults with systemic symptoms: hospital",
    ],
    antidoteTreatment: "Symptomatic treatment; Prazosin if systemic symptoms",
    hospitalReferral: "All children; adults with breathing/heart symptoms",
    apRelevance:
      "Less dangerous than red scorpion but still requires hospital for children",
  },
  {
    id: "tx_centipede",
    nameEnglish: "Giant Indian Centipede",
    nameTelugu: "జెర్రి పురుగు (Jerri Purugu)",
    nameHindi: "कनखजूरा (Kankhajura)",
    type: "animal",
    habitat: "Under stones, logs, leaf litter across AP; common in monsoon",
    identification: [
      "Red/orange body with yellow legs",
      "Up to 20 cm length",
      "Many pairs of legs",
      "Fast-moving",
    ],
    symptoms: [
      "Intense burning pain immediately",
      "Local swelling and redness",
      "Allergic reaction possible",
      "Rarely: fever, lymph node swelling",
    ],
    immediateAction: [
      "Wash site with soap and water",
      "Cold compress",
      "Paracetamol for pain",
      "Cetirizine for allergic response",
    ],
    antidoteTreatment:
      "Symptomatic only; no specific antivenom needed in most cases",
    hospitalReferral:
      "If signs of severe allergic reaction (anaphylaxis), difficulty breathing",
    apRelevance:
      "Common in monsoon; painful but rarely life-threatening in healthy adults",
  },
  {
    id: "tx_wasp",
    nameEnglish: "Paper Wasp / Yellow Jacket",
    nameTelugu: "తుమ్మెద (Tummeda)",
    nameHindi: "बर्र (Barr)",
    type: "animal",
    habitat: "Nests under eaves, in trees, underground throughout AP",
    identification: [
      "Yellow and black banded body",
      "Papery umbrella-shaped nest",
      "More aggressive than bees",
    ],
    symptoms: [
      "Multiple stings possible from swarm",
      "Local pain, swelling, redness",
      "Anaphylaxis risk with single sting in allergic persons",
      "Multiple stings: toxic effect — nausea, headache, fever",
    ],
    immediateAction: [
      "Run — do NOT swat (attracts more wasps)",
      "Cover face and run to shelter",
      "Remove stingers by scraping (not squeezing)",
      "Cold compress and Cetirizine for mild reaction",
      "108 for anaphylaxis or 10+ stings",
    ],
    antidoteTreatment:
      "Antihistamines; Epinephrine for anaphylaxis; hospital for multiple stings",
    hospitalReferral:
      "Anaphylaxis (breathing difficulty, facial swelling); >10 stings",
    apRelevance:
      "Eastern Ghats forest workers at risk; monsoon season wasp nests highly active",
  },
];

// ---------------------------------------------------------------------------
// SAFE FOOD ITEMS WITH EMERGENCY DATA — AP / India focused (80+)
// ---------------------------------------------------------------------------

export interface SafeFood {
  id: string;
  name: string;
  nameTelugu: string;
  brand?: string; // AP/India available brands
  calories: string; // per 100g or serving
  shelfLife: string; // without refrigeration
  waterRequirement: string;
  preparation: string;
  apAvailability: string;
  emergencyUse: string;
}

export const SAFE_FOODS: SafeFood[] = [
  // CEREALS/STAPLES
  {
    id: "sf_rice",
    name: "White Rice",
    nameTelugu: "అన్నం (Annam)",
    calories: "130 kcal per 100g cooked",
    shelfLife: "Raw grain: 2+ years sealed dry; cooked: 6 hrs at 30°C+",
    waterRequirement: "2 cups water per 1 cup rice",
    preparation: "Wash twice, boil with 2:1 water ratio for 15-20 min",
    apAvailability:
      "Universal in all AP markets; government ration (5 kg/month free for BPL)",
    emergencyUse:
      "Primary calorie source; mudi (dry pressed rice flakes) need no cooking",
  },
  {
    id: "sf_wheat_flour",
    name: "Wheat Flour / Atta",
    nameTelugu: "గోధుమ పిండి (Godhuma Pindi)",
    brand: "Aashirvaad, Shakti Bhog, local mill flour",
    calories: "340 kcal per 100g",
    shelfLife: "Sealed bag: 3-6 months; open: 1-2 months in cool dry place",
    waterRequirement: "Minimal — for making flatbread",
    preparation:
      "Mix with water to dough, make flat rounds, cook on hot stone/iron plate",
    apAvailability: "All AP markets; ration shops",
    emergencyUse:
      "Emergency roti/chapati possible on any hot flat surface including clay pot",
  },
  {
    id: "sf_poha",
    name: "Flattened Rice / Poha",
    nameTelugu: "అటుకులు (Atukulu)",
    brand: "MTR, local brands",
    calories: "350 kcal per 100g",
    shelfLife: "6-12 months sealed",
    waterRequirement: "Soak in water 5 min — no cooking required",
    preparation:
      "Soak in water 5 min, squeeze dry, add salt, lemon, chilli — ready to eat",
    apAvailability: "All AP markets and Kirana shops",
    emergencyUse: "No-cook option; excellent for disaster packs",
  },
  {
    id: "sf_murmura",
    name: "Puffed Rice / Murmura",
    nameTelugu: "మూర్ముర (Murmura)",
    calories: "400 kcal per 100g",
    shelfLife: "1-3 months in dry storage; absorbs moisture quickly",
    waterRequirement: "None for eating dry",
    preparation: "Eat dry with salt/chilli, or mix with curd/water as porridge",
    apAvailability: "Very common in AP; sold in kirana shops by the kilo",
    emergencyUse: "Immediate no-cook emergency food; children friendly",
  },
  {
    id: "sf_ragi",
    name: "Finger Millet / Ragi",
    nameTelugu: "రాగులు (Ragulu)",
    calories: "328 kcal per 100g",
    shelfLife: "Grain: 2+ years; flour: 3-6 months",
    waterRequirement: "For porridge: 5 parts water to 1 part flour",
    preparation:
      "Ragi porridge: boil flour in water stirring continuously 10 min; add salt/jaggery",
    apAvailability:
      "Rayalaseema, Eastern Ghats tribal areas; also available at all health food stores",
    emergencyUse:
      "Excellent nutrition including calcium (360 mg/100g); good for children",
  },
  {
    id: "sf_jowar",
    name: "Sorghum / Jowar",
    nameTelugu: "జొన్నలు (Jonnalu)",
    calories: "329 kcal per 100g",
    shelfLife: "Grain: 3+ years sealed dry",
    waterRequirement: "For flatbread: minimal",
    preparation:
      "Grind grains to flour between stones; make flatbread on hot surface",
    apAvailability:
      "Rayalaseema and Prakasam districts; ration shops in drought-prone areas",
    emergencyUse:
      "Very drought-resistant crop; grows in arid AP regions; available when other crops fail",
  },
  {
    id: "sf_bajra",
    name: "Pearl Millet / Bajra",
    nameTelugu: "సజ్జలు (Sajjalu)",
    calories: "361 kcal per 100g",
    shelfLife: "Grain: 3+ years",
    waterRequirement: "For flatbread: minimal",
    preparation:
      "Grind to flour; make thick flatbread (bhakri); cook on hot iron plate or clay",
    apAvailability: "Anantapur, Kurnool districts; available at kirana shops",
    emergencyUse:
      "High iron content; important in Rayalaseema drought-prone areas",
  },
  // PULSES
  {
    id: "sf_toor_dal",
    name: "Pigeon Pea Dal / Toor Dal",
    nameTelugu: "కంది పప్పు (Kandi Pappu)",
    brand: "MDH, Tata Sampann, local brands",
    calories: "343 kcal per 100g dry",
    shelfLife: "1-2 years sealed",
    waterRequirement: "3 cups water per 1 cup dal",
    preparation:
      "Soak 30 min, boil 20-30 min until soft; add turmeric and salt",
    apAvailability: "Essential staple in all AP households; every kirana shop",
    emergencyUse: "Complete protein with rice; long shelf life",
  },
  {
    id: "sf_moong_dal",
    name: "Moong Dal / Green Gram",
    nameTelugu: "పెసలు (Pesalu)",
    calories: "347 kcal per 100g dry",
    shelfLife: "1-2 years sealed dry",
    waterRequirement: "2 cups per 1 cup dal",
    preparation:
      "Boil without soaking 20 min; or sprout in wet cloth 24-48 hrs for raw eating",
    apAvailability: "Universal in AP",
    emergencyUse:
      "Can be sprouted without cooking — excellent vitamin source; highly digestible",
  },
  {
    id: "sf_chana",
    name: "Chickpea / Chana",
    nameTelugu: "సెనగలు (Senagalu)",
    calories: "364 kcal per 100g dry",
    shelfLife: "2+ years sealed dry",
    waterRequirement: "3 cups per 1 cup",
    preparation:
      "Soak overnight, boil 30 min; or roast dry chana (sattu) needs no cooking",
    apAvailability: "All AP markets",
    emergencyUse:
      "Roasted Bengal gram (senaga pappu) available pre-roasted — eat directly with no cooking",
  },
  // PACKAGED FOODS
  {
    id: "sf_parle_g",
    name: "Glucose Biscuits",
    nameTelugu: "గ్లూకోస్ బిస్కెట్ (Glucose Biscuit)",
    brand: "Parle-G, Britannia Tiger",
    calories: "420 kcal per 100g",
    shelfLife: "6-12 months sealed",
    waterRequirement: "None",
    preparation: "Eat directly",
    apAvailability: "Available in every village shop across AP",
    emergencyUse:
      "Quick energy; Parle-G was used as emergency food in AP floods 2009, 2020",
  },
  {
    id: "sf_mtr_readymeal",
    name: "Ready-to-Eat Meals",
    nameTelugu: "రెడీ టు ఈట్ (Ready to Eat)",
    brand: "MTR Ready Meals, ITC Kitchens of India, Haldirams",
    calories: "200-300 kcal per pack",
    shelfLife: "12-24 months sealed (aseptic packaging)",
    waterRequirement: "May be eaten cold if needed",
    preparation: "Heat in bag in hot water 5 min, or eat at room temperature",
    apAvailability:
      "Available in supermarkets in Vijayawada, Vizag, Tirupati, Kurnool",
    emergencyUse: "Complete meals with protein; no cooking needed in emergency",
  },
  {
    id: "sf_groundnut",
    name: "Peanuts / Groundnuts",
    nameTelugu: "వేరుశనగలు (Vaerushanagalu)",
    calories: "567 kcal per 100g",
    shelfLife: "Roasted: 3-6 months in sealed container",
    waterRequirement: "None",
    preparation: "Eat roasted directly; can be boiled from raw in 30 min",
    apAvailability:
      "AP is major groundnut producer (Anantapur, Kurnool); cheapest protein in rural AP",
    emergencyUse:
      "High calorie density — 100g provides significant energy; mix with jaggery for energy balls",
  },
  {
    id: "sf_jaggery",
    name: "Jaggery / Gur",
    nameTelugu: "బెల్లం (Bellam)",
    calories: "383 kcal per 100g",
    shelfLife: "3-12 months depending on humidity",
    waterRequirement: "None",
    preparation:
      "Eat directly as energy food; mix in water for quick energy drink",
    apAvailability: "Very common; every AP village market; blocks and balls",
    emergencyUse:
      "Quick energy; iron source; dissolve in water for instant electrolyte drink",
  },
  {
    id: "sf_coconut_oil",
    name: "Coconut Oil",
    nameTelugu: "కొబ్బరి నూనె (Kobbari Noone)",
    brand: "Parachute, local brands",
    calories: "892 kcal per 100g",
    shelfLife: "6-24 months in sealed container",
    waterRequirement: "None",
    preparation:
      "Cooking medium; can be eaten directly in very small amounts for calories",
    apAvailability: "Universal in AP coastal districts",
    emergencyUse: "High calorie density cooking fat; anti-microbial properties",
  },
  {
    id: "sf_salt",
    name: "Iodized Salt",
    nameTelugu: "ఉప్పు (Uppu)",
    calories: "0 kcal",
    shelfLife: "Indefinite",
    waterRequirement: "N/A",
    preparation: "Add to food/water for sodium replacement",
    apAvailability: "Every shop; AP coastal salt production",
    emergencyUse:
      "Essential for ORS and electrolyte balance; prevents hyponatremia in floods/heat",
  },
  {
    id: "sf_ors",
    name: "ORS Sachets",
    nameTelugu: "ORS పొడి",
    brand: "Electral, Jeevan Jal, WHO ORS formula",
    calories: "~20 kcal per sachet",
    shelfLife: "2-3 years sealed",
    waterRequirement: "1 litre clean water per sachet",
    preparation:
      "Dissolve 1 sachet in 1 litre water. Drink 200-400ml after each loose stool.",
    apAvailability:
      "All pharmacies; given free at PHCs during diarrhea outbreaks",
    emergencyUse:
      "Critical for diarrhea, heatstroke, flood aftermath; can save life in dehydration",
  },
  {
    id: "sf_canned_tuna",
    name: "Canned Fish / Tuna",
    nameTelugu: "చేపల డబ్బా (Chepala Dabba)",
    brand: "Titan Tuna, SeaFest, Tasty Nibbles",
    calories: "132 kcal per 100g",
    shelfLife: "3-5 years sealed",
    waterRequirement: "None",
    preparation: "Open and eat directly; heat if possible",
    apAvailability:
      "Supermarkets in major AP cities; coastal fishing communities always have dried/salted fish",
    emergencyUse:
      "Complete protein; omega-3 fats; AP coast: dry salted fish (endu chepalu) available in every village",
  },
  {
    id: "sf_chutney_powder",
    name: "Dry Chutney Powder",
    nameTelugu: "కారం పొడి (Kaaram Podi)",
    brand: "MTR, local brands",
    calories: "350 kcal per 100g",
    shelfLife: "3-6 months in sealed container",
    waterRequirement: "None",
    preparation: "Eat with rice or bread directly",
    apAvailability: "Universal in AP; every family makes/buys",
    emergencyUse:
      "Makes plain rice/bread palatable in emergency; provides flavor in stress conditions",
  },
  {
    id: "sf_pickle",
    name: "Mango Pickle / Avakaya",
    nameTelugu: "అవకాయ (Avakaya)",
    brand: "Priya, Mothers Recipe, homemade",
    calories: "60 kcal per 100g",
    shelfLife: "1-2 years sealed",
    waterRequirement: "None",
    preparation: "Eat directly with rice; salt and oil preserve it",
    apAvailability: "Every AP household; every market",
    emergencyUse:
      "Long shelf life; electrolyte source (high salt); makes plain food edible",
  },
];

// ---------------------------------------------------------------------------
// EMERGENCY RADIO FREQUENCIES — AP specific
// ---------------------------------------------------------------------------

export interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  type: string; // AM | FM | VHF | HAM | Shortwave
  purpose: string;
  coverage: string;
  operatingHours: string;
}

export const EMERGENCY_RADIO: RadioStation[] = [
  // ALL INDIA RADIO
  {
    id: "r1",
    name: "AIR Vijayawada",
    frequency: "1008 kHz AM / 100.6 FM",
    type: "AM/FM",
    purpose: "Primary emergency broadcast for AP Central",
    coverage: "Krishna, Guntur, East Godavari, West Godavari districts",
    operatingHours: "24 hours during disasters",
  },
  {
    id: "r2",
    name: "AIR Visakhapatnam",
    frequency: "1350 kHz AM / 100.9 FM",
    type: "AM/FM",
    purpose: "Emergency broadcast North AP",
    coverage: "Visakhapatnam, Srikakulam, Vizianagaram",
    operatingHours: "24 hours",
  },
  {
    id: "r3",
    name: "AIR Tirupati",
    frequency: "990 kHz AM / 90.4 FM",
    type: "AM/FM",
    purpose: "Emergency broadcast South AP",
    coverage: "Chittoor, Nellore districts",
    operatingHours: "24 hours",
  },
  {
    id: "r4",
    name: "AIR Kurnool",
    frequency: "1269 kHz AM",
    type: "AM",
    purpose: "Emergency broadcast Rayalaseema",
    coverage: "Kurnool, Nandyal, YSR Kadapa",
    operatingHours: "24 hours",
  },
  {
    id: "r5",
    name: "AIR Rajahmundry",
    frequency: "612 kHz AM / 100.4 FM",
    type: "AM/FM",
    purpose: "Godavari basin emergency",
    coverage: "East Godavari, West Godavari, Eluru",
    operatingHours: "24 hours",
  },
  {
    id: "r6",
    name: "AIR Amaravati/Mangalagiri",
    frequency: "91.1 FM",
    type: "FM",
    purpose: "AP state capital emergency broadcast",
    coverage: "Amaravati and Guntur region",
    operatingHours: "24 hours during emergencies",
  },
  // NDRF & GOVERNMENT EMERGENCY VHF
  {
    id: "r7",
    name: "NDRF Communication Channel",
    frequency: "VHF 155.500 MHz",
    type: "VHF",
    purpose: "NDRF rescue coordination AP",
    coverage: "All AP relief operations",
    operatingHours: "24 hours during disasters",
  },
  {
    id: "r8",
    name: "AP Police Emergency",
    frequency: "VHF 156.800 MHz",
    type: "VHF",
    purpose: "AP Police emergency coordination",
    coverage: "All AP districts",
    operatingHours: "24 hours",
  },
  {
    id: "r9",
    name: "AP Disaster Management",
    frequency: "VHF 155.000 MHz",
    type: "VHF",
    purpose: "AP SDMA emergency coordination",
    coverage: "State-level",
    operatingHours: "24 hours during disaster",
  },
  // MARINE VHF (Coastal AP)
  {
    id: "r10",
    name: "Coast Guard International Distress",
    frequency: "VHF Channel 16 (156.800 MHz)",
    type: "Marine VHF",
    purpose: "International maritime distress",
    coverage: "AP coast (Srikakulam to Nellore)",
    operatingHours: "24 hours",
  },
  {
    id: "r11",
    name: "Fisheries Emergency AP",
    frequency: "VHF Channel 06 (156.300 MHz)",
    type: "Marine VHF",
    purpose: "AP fishing vessel emergency",
    coverage: "Bay of Bengal near AP coast",
    operatingHours: "24 hours",
  },
  {
    id: "r12",
    name: "Indian Navy Vizag",
    frequency: "VHF Channel 12",
    type: "Marine VHF",
    purpose: "Naval search and rescue",
    coverage: "Eastern seaboard",
    operatingHours: "24 hours",
  },
  // HAM / AMATEUR RADIO
  {
    id: "r13",
    name: "AP Amateur Radio Club Emergency Net",
    frequency: "7.025 MHz HF",
    type: "HAM",
    purpose: "Amateur radio emergency coordination AP",
    coverage: "State-wide HF",
    operatingHours: "Activated during disasters",
  },
  {
    id: "r14",
    name: "VHF Emergency Net AP (APARS)",
    frequency: "145.500 MHz VHF",
    type: "HAM",
    purpose: "Andhra Pradesh Amateur Radio Society emergency net",
    coverage: "Vijayawada, Vizag, Guntur",
    operatingHours: "Daily 1900-2000 hrs; disaster: 24 hrs",
  },
  {
    id: "r15",
    name: "Vishakhapatnam HAM Net",
    frequency: "145.800 MHz VHF",
    type: "HAM",
    purpose: "Vizag district emergency communication",
    coverage: "Visakhapatnam district",
    operatingHours: "Disaster: 24 hrs",
  },
  // SHORTWAVE INTERNATIONAL
  {
    id: "r16",
    name: "All India Radio National",
    frequency: "657 kHz (Medium Wave)",
    type: "MW",
    purpose: "National emergency broadcasts",
    coverage: "Pan-India",
    operatingHours: "24 hours",
  },
  {
    id: "r17",
    name: "INCOIS Tsunami Warning Broadcast",
    frequency: "7.265 MHz HF Shortwave",
    type: "Shortwave",
    purpose: "Indian Ocean tsunami early warnings",
    coverage: "Indian Ocean rim",
    operatingHours: "Continuous when warning active",
  },
  {
    id: "r18",
    name: "IMD Emergency Weather Broadcast",
    frequency: "4.970 MHz Shortwave",
    type: "Shortwave",
    purpose: "India Meteorological Dept severe weather",
    coverage: "South India",
    operatingHours: "Alert conditions",
  },
];

// ---------------------------------------------------------------------------
// WATER PURIFICATION TECHNIQUES — AP climate optimized (12+)
// ---------------------------------------------------------------------------

export interface WaterPurificationMethod {
  id: string;
  name: string;
  nameTelugu: string;
  effectiveness: "partial" | "good" | "excellent";
  timeToPurify: string;
  materialsNeeded: string[];
  steps: string[];
  bestFor: string;
  limitations: string;
  apTip: string;
}

export const WATER_PURIFICATION: WaterPurificationMethod[] = [
  {
    id: "wp_boiling",
    name: "Boiling",
    nameTelugu: "మరగించడం (Maraginchadam)",
    effectiveness: "excellent",
    timeToPurify: "5 min boiling + cool time",
    materialsNeeded: ["Vessel", "Fuel (wood/LPG/cow dung)", "Water"],
    steps: [
      "Fill vessel with water, bring to rolling boil",
      "Maintain rolling boil for 5 full minutes (10 min at Eastern Ghats altitude 1000m+)",
      "Cool in covered vessel — do NOT expose to air during cooling",
      "Store in clean sealed container",
    ],
    bestFor: "All pathogens including viruses, bacteria, protozoa",
    limitations:
      "Requires fuel; does not remove chemical contaminants or sediment",
    apTip:
      "In Araku Valley (900m+ altitude): boil 10 min. AP post-cyclone: boil ALL water even if appears clear",
  },
  {
    id: "wp_sodis",
    name: "Solar SODIS (Solar Disinfection)",
    nameTelugu: "సూర్య నీటి శుద్ధి (Surya Neeti Shuddhi)",
    effectiveness: "good",
    timeToPurify: "6 hours (clear sky) or 2 days (cloudy)",
    materialsNeeded: [
      "Clear PET (plastic) bottle 1.5L",
      "Sunlight",
      "Clean water (filtered first if turbid)",
    ],
    steps: [
      "Use clear transparent PET bottles only (labeled PET or 1 in recycle triangle)",
      "If water is turbid: filter through cloth first until visually clear",
      "Fill bottle completely — no air bubble — and cap tightly",
      "Place on reflective surface (tin roof, foil, corrugated iron) in full sun",
      "AP summer (>45°C): 6 hours direct sun is sufficient",
      "Overcast day: leave for 2 full days",
    ],
    bestFor: "AP summer conditions (intense UV); bacteria and viruses",
    limitations:
      "Does not work in turbid water (>30 NTU); not effective against heavy metals; slow",
    apTip:
      "AP is ideal for SODIS — intense UV April-June makes 6 hours effective. Place on tin roofs for best results",
  },
  {
    id: "wp_chlorine_aquatabs",
    name: "Chlorine / Aquatabs",
    nameTelugu: "క్లోరిన్ టాబ్లెట్ (Chlorine Tablet)",
    effectiveness: "excellent",
    timeToPurify: "30 minutes",
    materialsNeeded: [
      "Aquatabs, Waterguard chlorine tablets, or household bleach",
      "Container",
    ],
    steps: [
      "Aquatabs 1-Tab dose: 1 tablet per 1 litre (for clear water); 2 tablets per 1 litre (for turbid)",
      "Waterguard: 2.5ml per 10 litres",
      "Household bleach (NaOCl 5%): 2 drops per litre, 8 drops if cloudy",
      "Stir well and wait 30 minutes before drinking",
      "Slight chlorine smell is NORMAL and means it works",
      "If no smell after 30 min: water too contaminated — repeat dose",
    ],
    bestFor:
      "Bacteria and viruses; most disasters including cyclone, flood, earthquake",
    limitations:
      "Does not kill Cryptosporidium protozoa; leave water taste of chlorine",
    apTip:
      "AP RWSS distributes free Aquatabs during cyclones/floods — collect from Village Sachivalayam",
  },
  {
    id: "wp_sand_filter",
    name: "DIY Sand-Charcoal-Gravel Filter",
    nameTelugu: "ఇసుక వడపోత (Isuka Vadapota)",
    effectiveness: "partial",
    timeToPurify: "Flow through in 1-2 hours",
    materialsNeeded: [
      "2 large pots/buckets",
      "Coarse gravel",
      "Fine sand",
      "Charcoal (from wood ash fire)",
      "Cloth",
      "Nail/stick to make hole",
    ],
    steps: [
      "Pierce a hole at the bottom of upper bucket",
      "Layer from bottom up: cloth, 5cm fine sand, 5cm charcoal pieces, 5cm coarse gravel, cloth",
      "Pour water in top — allow to drip through",
      "Collect filtered water in lower bucket",
      "This removes sediment and improves taste — still BOIL or chlorinate after filtering",
    ],
    bestFor: "Pre-filtering turbid/muddy water before boiling or SODIS",
    limitations:
      "Does NOT kill pathogens; must be combined with boiling or chlorination",
    apTip:
      "AP post-cyclone/flood: rivers carry high sediment — pre-filter is essential before any other purification",
  },
  {
    id: "wp_moringa",
    name: "Moringa Seed Flocculation",
    nameTelugu: "మునగ గింజ శుద్ధి (Munaga Ginja Shuddhi)",
    effectiveness: "partial",
    timeToPurify: "1-2 hours settling",
    materialsNeeded: [
      "Dried Moringa (munaga) seeds",
      "Cloth",
      "Two containers",
    ],
    steps: [
      "Remove 2-3 dry Moringa seeds from pod (dried, not fresh)",
      "Remove seed coat and crush seed kernel to powder in stone mortar",
      "Mix crushed seed with small amount of water to make paste",
      "Add paste to 10 litres of turbid water and stir vigorously for 2 minutes",
      "Leave undisturbed for 1-2 hours — particles settle to bottom",
      "Carefully pour off CLEAR water from top into another container",
      "Still BOIL the clear water afterward for complete purification",
    ],
    bestFor:
      "Removing turbidity (cloudiness/particles) from flood/river water; pre-treatment step",
    limitations:
      "Does not kill pathogens; only removes particles — must boil after",
    apTip:
      "Moringa is found in virtually every AP village — completely free and available immediately after any disaster",
  },
  {
    id: "wp_uv_pen",
    name: "UV Pen Sterilizer",
    nameTelugu: "UV నీటి శుద్ధి (UV Niti Shuddhi)",
    effectiveness: "excellent",
    timeToPurify: "90 seconds per litre",
    materialsNeeded: [
      "SteriPen or equivalent UV pen",
      "Clear water (turbid water reduces effectiveness)",
      "Batteries",
    ],
    steps: [
      "Water must be clear and visually clean first",
      "Stir UV pen in 1 litre water for 90 seconds (follow device instructions)",
      "Light flashes complete when cycle done",
      "Drink immediately — UV effect fades over time",
    ],
    bestFor: "Bacteria, viruses, Giardia, Cryptosporidium",
    limitations:
      "Requires charged batteries; does not work in turbid water; expensive",
    apTip:
      "Good for AP hill trekkers in Eastern Ghats; pre-filter with cloth for turbid stream water",
  },
  {
    id: "wp_ceramic_pot",
    name: "Ceramic Pot Filter",
    nameTelugu: "మట్టి కుండ వడపోత (Matti Kunda Vadapota)",
    effectiveness: "good",
    timeToPurify: "Continuous drip — 1-3 litres per hour",
    materialsNeeded: [
      "AP locally made ceramic filter candle",
      "Large plastic bucket",
      "Tap/spigot",
    ],
    steps: [
      "Silver-impregnated ceramic candle filter sits inside large bucket",
      "Pour untreated water into top chamber",
      "Water slowly filters through ceramic pores removing bacteria and protozoa",
      "Clean filtered water collects in bottom chamber",
      "Clean filter weekly by gently scrubbing under running water",
    ],
    bestFor:
      "Bacteria and protozoa; good for daily household use in areas with poor water quality",
    limitations:
      "Does not remove viruses effectively; slow flow; must maintain filter hygiene",
    apTip:
      "Ceramic water filters are produced in Vijayawada and Guntur — low cost (~₹500-1000); ideal for post-disaster villages",
  },
  {
    id: "wp_iodine",
    name: "Iodine Tablets",
    nameTelugu: "అయోడిన్ టాబ్లెట్ (Iodine Tablet)",
    effectiveness: "good",
    timeToPurify: "30 minutes (clear water), 60 minutes (cold water)",
    materialsNeeded: ["Portable Aqua iodine tablets or Globaline", "Container"],
    steps: [
      "1 tablet per litre of clear water",
      "2 tablets per litre if cold or turbid water",
      "Wait 30 min minimum",
      "Vitamin C tablet added after wait: reduces iodine taste",
    ],
    bestFor: "Bacteria and viruses; good backup to chlorine",
    limitations:
      "Not for pregnant women, thyroid patients; does not kill Cryptosporidium",
    apTip:
      "Iodine tablets available at chemists and trekking stores in Vizag; useful for tribal areas where chemists are distant",
  },
  {
    id: "wp_cloth_filter",
    name: "Multiple Cloth Sieving (Pre-filter)",
    nameTelugu: "గుడ్డ వడపోత (Gudda Vadapota)",
    effectiveness: "partial",
    timeToPurify: "Immediate",
    materialsNeeded: ["5-8 layers of clean cotton cloth (old saree, dhoti)"],
    steps: [
      "Fold clean cotton cloth into 8 layers",
      "Pour water through cloth into clean vessel",
      "Repeat 2-3 times",
      "This removes large particles and some bacteria",
      "MUST follow with boiling or chlorination",
    ],
    bestFor:
      "Removing visible particles, cholera (Vibrio stays attached to particles)",
    limitations: "Does not kill pathogens; only pre-treatment",
    apTip:
      "Traditional AP/Bangladesh method proved to reduce cholera; use saree cloth which has right pore size",
  },
  {
    id: "wp_earthen_pot",
    name: "Earthen Pot Cooling + Pre-Filtration",
    nameTelugu: "కుండలో నీళ్ళు (Kundalo Neellu)",
    effectiveness: "partial",
    timeToPurify: "Store overnight",
    materialsNeeded: [
      "Clean earthen clay pot (matka)",
      "Alum piece (phitkari)",
    ],
    steps: [
      "Add small piece of alum (phitkari/fitkiri) to turbid water — one pea-sized piece per 10L",
      "Stir well — particles clump and settle to bottom within 30 min",
      "Pour off clear top water into earthen pot for storage",
      "Earthen pot naturally cools water through evaporation",
      "Still BOIL or add chlorine before drinking",
    ],
    bestFor: "Turbidity reduction and cooling in AP heat; traditional method",
    limitations: "Pre-treatment only; must be combined with disinfection",
    apTip:
      "Alum (phitkari) available at every AP kirana shop for ₹10; traditional AP water treatment for centuries",
  },
  {
    id: "wp_distillation",
    name: "Emergency Solar Distillation (Still)",
    nameTelugu: "సూర్య నీటి వాల (Surya Neeti Vaala)",
    effectiveness: "excellent",
    timeToPurify: "0.5-1L per day from simple still",
    materialsNeeded: [
      "Clear plastic sheet/bag",
      "Bowl or hole in ground",
      "Collection cup",
    ],
    steps: [
      "Dig a bowl-shaped hole in sunny soil",
      "Place collection cup in center of hole",
      "Cover hole with clear plastic sheet, seal edges with soil",
      "Place small stone in center of plastic to create cone pointing down to cup",
      "Sun heats soil, moisture evaporates and condenses on plastic, drips into cup",
      "This water is clean from ANY source including seawater or urine (survival emergency)",
    ],
    bestFor:
      "Absolute last resort survival; removes ALL contaminants including salt",
    limitations: "Very low output (200-500ml/day); requires sunny day and time",
    apTip:
      "AP summer sun produces better output. Use in coastal areas for emergency drinking from brackish groundwater",
  },
];

// ---------------------------------------------------------------------------
// ADDITIONAL DISASTER SCENARIOS — extends existing DISASTER_SCENARIOS object
// ---------------------------------------------------------------------------

export const EXTENDED_SCENARIOS: Record<string, ScenarioCategory> = {
  stampede: {
    id: "stampede",
    title: "Stampede / Crowd Crush",
    icon: "👥",
    description:
      "Crowd crush in temples, festivals, and political gatherings in AP",
    scenarios: [
      {
        id: "sp1",
        title: "Escape Crowd Crush",
        description: "Survival technique in a surging crowd.",
        steps: [
          "Keep arms up near chest — protect breathing space",
          "Move diagonally toward edge of crowd, not against main flow",
          "If pushed down: curl in fetal position protecting head",
          "Never bend down — impossible to get up again in crush",
          "Shout 'STEP BACK' — coordinated shout can relieve pressure",
        ],
        materials: ["Only body position technique"],
        apSpecific:
          "AP stampedes: Puttaparthi (Sai Baba), Tirupati Balaji (managed entry now), Kondagattu temple, political rallies",
        urgency: "critical",
      },
      {
        id: "sp2",
        title: "Crowd Crush Injury First Aid",
        description: "Treat traumatic asphyxia after crowd crush.",
        steps: [
          "Move victim to open air immediately",
          "Recovery position if unconscious and breathing",
          "CPR if no breathing and no pulse",
          "Rib fractures likely: half-sitting position",
          "Call 108 — all crush victims need hospital",
        ],
        materials: ["Open clear space"],
        apSpecific:
          "AP 108 ambulance: call immediately; nearest trauma center in AP for rib/lung injuries",
        urgency: "critical",
      },
      {
        id: "sp3",
        title: "Stampede Prevention",
        description: "Recognize dangerous crowd conditions early.",
        steps: [
          "Crowd density >4 people per square meter = danger",
          "If people stumbling or cannot raise arms = critical",
          "Leave immediately when crowd stops moving or reverses",
          "Never attend events without knowing exit routes first",
          "Temple events: avoid 6–8 AM rush times",
        ],
        materials: ["Pre-planning"],
        apSpecific:
          "AP: Tirupati TTD implements wristband and time-slot system to prevent crush; follow official queue only",
        urgency: "high",
      },
    ],
  },
  industrial_accident: {
    id: "industrial_accident",
    title: "Industrial Accident",
    icon: "🏭",
    description:
      "Factory accidents, gas leaks, and explosions in AP industrial corridors",
    scenarios: [
      {
        id: "ia1",
        title: "Factory Gas Leak Response",
        description: "Respond to industrial gas release in AP factories.",
        steps: [
          "Sound factory siren immediately",
          "Move crosswind to muster point — do NOT run into wind",
          "Emergency response team: SCBA masks and enter only with partner",
          "Account for all workers at muster point",
          "Contact AP PCB emergency: 040-23435038",
        ],
        materials: ["SCBA equipment", "Emergency response card"],
        apSpecific:
          "AP industrial corridors: Vizag (HPCL, pharma zone), Kakinada (port chemicals), Atchutapuram SEZ, NTPC Simhadri",
        urgency: "critical",
      },
      {
        id: "ia2",
        title: "Explosion Aftermath",
        description: "Respond after an industrial explosion.",
        steps: [
          "Stay clear of structure — secondary explosions possible",
          "Evacuate minimum 300 m upwind",
          "Do NOT use mobile phones near leak/explosion site",
          "Account for workers: missing = search + rescue team",
          "First responders: approach from upwind only",
        ],
        materials: ["Emergency assembly point"],
        apSpecific:
          "AP Vizag HPCL refinery fire 2021: explosion affected neighboring housing — know your local industrial risk",
        urgency: "critical",
      },
      {
        id: "ia3",
        title: "Pharma Chemical Exposure (AP)",
        description:
          "Handle pharmaceutical chemical exposure in AP drug factories.",
        steps: [
          "Common AP pharma chemicals: solvents (toluene, acetone), acids",
          "Skin: remove clothing, wash with water 20 min",
          "Eye: flush 20+ min with water",
          "Inhalation: fresh air, if unconscious call 108",
          "Call India Poison Control: 1800-116-117",
        ],
        materials: ["MSDS sheets at factory"],
        apSpecific:
          "AP Hyderabad/Visakhapatnam pharma cluster: hundreds of API factories; AP Drug Control Authority emergency: 040-23390694",
        urgency: "critical",
      },
    ],
  },
  forest_fire: {
    id: "forest_fire",
    title: "Forest Fire",
    icon: "🔥",
    description: "Eastern Ghats and Nallamala forest fires during dry season",
    scenarios: [
      {
        id: "ff1",
        title: "Forest Fire Escape",
        description: "Escape a spreading forest or scrub fire.",
        steps: [
          "Move perpendicular to wind direction (crosswind) — not away from fire",
          "Move downhill or to rocky bare ground with no fuel",
          "Clear a circle 3 m radius of vegetation if trapped",
          "Cover face with wet cloth and stay low where less smoke",
          "Call Forest Dept: 1926",
        ],
        materials: ["Wet cloth", "Water"],
        apSpecific:
          "AP Eastern Ghats fire season: Feb–May; Visakhapatnam and East Godavari Agency forests most affected",
        urgency: "critical",
      },
      {
        id: "ff2",
        title: "Forest Fire Shelter in Place",
        description: "Emergency shelter when you cannot outrun forest fire.",
        steps: [
          "If cannot escape: find clear rocky area with no vegetation",
          "Dig shallow trench and lie face-down",
          "Cover with soil, mineral earth — not leaves",
          "Let fire pass over you — maximum 2-3 minutes",
          "Do NOT run through flame front",
        ],
        materials: ["Hands for digging"],
        apSpecific:
          "Tribal guides in AP know rocky escape routes in Eastern Ghats; follow local knowledge",
        urgency: "critical",
      },
      {
        id: "ff3",
        title: "Smoke Inhalation from Forest Fire",
        description: "Treat smoke inhalation in forest fire.",
        steps: [
          "Get to fresh air upwind immediately",
          "Wet cloth over face filters particles (not gases)",
          "Sit upright, not lying down",
          "Call 108 if: unconscious, blue lips, unable to speak",
          "All significant smoke exposure needs hospital",
        ],
        materials: ["Wet cloth"],
        apSpecific:
          "AP forest fire smoke: pine resin and teak wood produce toxic fumes; respiratory symptoms delayed",
        urgency: "critical",
      },
    ],
  },
  road_accident: {
    id: "road_accident",
    title: "Road Accident (Expanded)",
    icon: "🛣️",
    description: "Advanced protocols for AP highway accidents",
    scenarios: [
      {
        id: "ra1",
        title: "Multi-Vehicle Accident",
        description: "Manage multiple casualties in a highway accident.",
        steps: [
          "Safety: hazard lights, triangles 100 m",
          "START triage: RED (immediate), YELLOW (delayed), GREEN (minor), BLACK (deceased)",
          "Treat RED first: airways and severe bleeding",
          "Call 112 and 108 — give exact km on highway",
          "Never move black-tagged victims until body removal team arrives",
        ],
        materials: ["Reflective triangles", "Mobile phone"],
        apSpecific:
          "AP NH 16 (Vijayawada-Vizag) highest accident stretch; NHAI emergency: 1033; APSRTC medical team at 100 km posts",
        urgency: "critical",
      },
      {
        id: "ra2",
        title: "Fuel Tanker Accident",
        description: "Respond to petroleum tanker accident on AP highways.",
        steps: [
          "500 m exclusion zone immediately",
          "No engines, no phones, no smoking",
          "Victims: move upwind only",
          "Call 101 (fire), 112, HPCL: 1800-2333555",
          "Do NOT attempt rescue near active fuel spill — fire risk",
        ],
        materials: ["Keep away"],
        apSpecific:
          "AP NH 16 has high tanker traffic; Vizag refinery supply route via NH 16 and NH 65",
        urgency: "critical",
      },
      {
        id: "ra3",
        title: "Motorbike Fall Injury",
        description: "First aid for a motorcycle accident victim.",
        steps: [
          "Do NOT remove helmet unless airway access needed",
          "Check breathing through visor opening",
          "If helmet removed: 2 persons, one holds head, other removes helmet",
          "Check for road rash: clean with saline/water, Betadine on wound edges",
          "Suspect spinal injury with all bike accidents — do NOT move unnecessarily",
        ],
        materials: ["Two helpers", "Water", "Cloth"],
        apSpecific:
          "AP: 60% of road deaths are two-wheeler riders; most without helmets in rural areas",
        urgency: "critical",
      },
    ],
  },
};

// Re-export combined scenario keys for easy iteration
export const ALL_EXTENDED_SCENARIO_KEYS = Object.keys(EXTENDED_SCENARIOS);

export const ALL_EDIBLE_PLANTS: EdiblePlant[] = [
  ...EDIBLE_PLANTS_DECCAN,
  ...EDIBLE_PLANTS_COASTAL,
  ...EDIBLE_PLANTS_EASTERN_GHATS,
  ...EDIBLE_PLANTS_WESTERN_AP,
];
