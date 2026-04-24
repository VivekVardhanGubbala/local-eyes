import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Apple,
  CheckCircle2,
  Package,
  ShieldCheck,
  Skull,
} from "lucide-react";

const kitItems = [
  {
    group: "Protein Sources",
    color: "oklch(0.65 0.18 145)",
    items: [
      "Canned tuna / sardines",
      "Canned beans (kidney, chickpeas)",
      "Peanut butter",
      "Powdered milk",
      "Nuts (almonds, cashews)",
    ],
  },
  {
    group: "Carbohydrates & Grains",
    color: "oklch(0.82 0.15 85)",
    items: [
      "Dried rice & lentils",
      "Oats (instant)",
      "Crackers / hardtack",
      "Energy / granola bars",
    ],
  },
  {
    group: "Snacks & Extras",
    color: "oklch(0.74 0.12 60)",
    items: [
      "Dried fruits (raisins, dates)",
      "Honey (natural preservative)",
      "Canned vegetables",
      "Salt & sugar (essential minerals)",
    ],
  },
];

const edibleItems = [
  {
    name: "Purslane (Portulaca)",
    part: "Leaves — raw or cooked",
    note: "Succulent, high in omega-3",
  },
  {
    name: "Amaranth (Rajgira)",
    part: "Leaves & seeds — cooked",
    note: "Highly nutritious grain",
  },
  {
    name: "Moringa (Drumstick)",
    part: "Leaves & pods — cooked",
    note: "Extremely nutrient-dense",
  },
  {
    name: "Banana plant",
    part: "Flower & stem — cooked",
    note: "Good starch source",
  },
  {
    name: "Tamarind",
    part: "Young leaves — raw",
    note: "Sour taste, vitamin C",
  },
  {
    name: "Wild fig (Anjeer)",
    part: "Ripe fruit — raw",
    note: "Safe when fully ripe",
  },
  {
    name: "Neem leaves",
    part: "Leaves — small amounts",
    note: "Bitter; medicinal value",
  },
  {
    name: "Grasshoppers / Crickets",
    part: "Whole — always cook first",
    note: "High protein survival food",
  },
  {
    name: "Termites",
    part: "Whole — raw or cooked",
    note: "High protein, cook preferred",
  },
];

const dangerItems = [
  { name: "Oleander (Kaner)", reason: "Cardiac glycosides — all parts fatal" },
  {
    name: "Datura (Dhatura)",
    reason: "All parts toxic — hallucinations, death",
  },
  {
    name: "Lantana berries (green)",
    reason: "Liver failure — only ripe red are less toxic",
  },
  {
    name: "Castor seeds (Arandi)",
    reason: "Ricin poison — deadly in tiny amounts",
  },
  { name: "Yellow Oleander (Pili Kaner)", reason: "Fatal cardiac glycosides" },
  {
    name: "Unknown wild mushrooms",
    reason: "Never eat unless 100% identified",
  },
  { name: "Rhubarb leaves", reason: "Oxalic acid — kidney failure" },
  { name: "Brightly colored frogs", reason: "Poison dart secretions on skin" },
  { name: "Unknown fish / puffer fish", reason: "Tetrodotoxin — no antidote" },
  {
    name: "Flood-zone shellfish",
    reason: "Heavily contaminated with pathogens",
  },
  {
    name: "Plants with milky/colored sap",
    reason: "Usually indicate toxic alkaloids",
  },
  {
    name: "Umbrella-shaped flower plants",
    reason: "May be hemlock — extremely toxic",
  },
];

const storageTips = [
  {
    num: 1,
    tip: "Store all food in airtight containers, elevated off the ground.",
  },
  {
    num: 2,
    tip: "Discard cans with bulging lids, rust, or foul smell immediately.",
  },
  {
    num: 3,
    tip: "Never eat food that touched floodwater unless in sealed waterproof packaging.",
  },
  {
    num: 4,
    tip: "Cook all meat thoroughly — especially pork and wild game (parasites).",
  },
  {
    num: 5,
    tip: "Always boil or purify water before cooking (1 min vigorous boil).",
  },
  {
    num: 6,
    tip: "Without refrigeration, consume cooked food within 24 hours.",
  },
  { num: 7, tip: "Eat perishables first; save canned/dry goods for later." },
  { num: 8, tip: "Label containers with date opened using a marker." },
  {
    num: 9,
    tip: "Keep food away from dead animals, chemicals, and stagnant water.",
  },
  {
    num: 10,
    tip: "Taste-test wild plants: rub on lip → wait 15 min → touch tongue → wait 15 min → small bite → wait 8 hours.",
  },
  {
    num: 11,
    tip: "When in doubt, throw it out — dehydration is safer than food poisoning.",
  },
];

export function FoodGuideCard() {
  return (
    <div
      className="rounded-xl border border-border card-glow h-full"
      style={{ background: "oklch(0.22 0.007 95)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Apple className="w-4 h-4" style={{ color: "oklch(0.82 0.15 85)" }} />
          <span className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            Food Guide
          </span>
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.82 0.15 85 / 0.15)",
            color: "oklch(0.82 0.15 85)",
            border: "1px solid oklch(0.82 0.15 85 / 0.3)",
          }}
        >
          Offline
        </span>
      </div>

      <Tabs defaultValue="kit" className="px-4 pb-4">
        <TabsList
          className="w-full h-8 p-0.5 mb-3"
          style={{ background: "oklch(0.15 0.007 95)" }}
        >
          {[
            {
              value: "kit",
              label: "Disaster Kit",
              icon: <Package className="w-3 h-3" />,
            },
            {
              value: "edible",
              label: "Edible",
              icon: <ShieldCheck className="w-3 h-3" />,
            },
            {
              value: "danger",
              label: "Non-Edible",
              icon: <Skull className="w-3 h-3" />,
            },
            {
              value: "storage",
              label: "Storage",
              icon: <CheckCircle2 className="w-3 h-3" />,
            },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              data-ocid={`food.${tab.value}.tab`}
              className="flex-1 text-xs h-7 flex items-center gap-1 data-[state=active]:text-[oklch(0.13_0.007_95)] rounded-full transition-all"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Disaster Kit Tab */}
        <TabsContent value="kit" className="mt-0">
          <ScrollArea className="h-48">
            <div className="space-y-3 pr-2">
              <p className="text-xs" style={{ color: "oklch(0.74 0.015 80)" }}>
                <span
                  style={{ color: "oklch(0.82 0.15 85)" }}
                  className="font-bold"
                >
                  2,000 kcal/person/day
                </span>{" "}
                target. Pack enough for{" "}
                <span className="font-semibold text-foreground">
                  72 hours minimum
                </span>
                .
              </p>
              {kitItems.map((group) => (
                <div key={group.group}>
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: group.color }}
                  >
                    {group.group}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-foreground"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: "oklch(0.65 0.18 145)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Edible Tab */}
        <TabsContent value="edible" className="mt-0">
          <ScrollArea className="h-48">
            <div className="space-y-2 pr-2">
              <p
                className="text-xs mb-2"
                style={{ color: "oklch(0.74 0.015 80)" }}
              >
                Wild edible plants & protein sources found in Indian disaster
                zones.
              </p>
              {edibleItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start gap-2 rounded-lg p-2"
                  style={{ background: "oklch(0.15 0.007 95)" }}
                >
                  <span
                    className="text-xs font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5"
                    style={{
                      background: "oklch(0.65 0.18 145 / 0.2)",
                      color: "oklch(0.65 0.18 145)",
                      border: "1px solid oklch(0.65 0.18 145 / 0.3)",
                    }}
                  >
                    SAFE
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.18 145)" }}
                    >
                      {item.part}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.74 0.015 80)" }}
                    >
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Non-Edible / Danger Tab */}
        <TabsContent value="danger" className="mt-0">
          <ScrollArea className="h-48">
            <div className="space-y-2 pr-2">
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2 mb-2"
                style={{
                  background: "oklch(0.48 0.16 25 / 0.2)",
                  border: "1px solid oklch(0.48 0.16 25 / 0.4)",
                }}
              >
                <AlertTriangle
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.65 0.2 25)" }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "oklch(0.65 0.2 25)" }}
                >
                  ⚠ NEVER EAT THESE
                </span>
              </div>
              {dangerItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start gap-2 rounded-lg p-2"
                  style={{ background: "oklch(0.15 0.007 95)" }}
                >
                  <span
                    className="text-xs font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5"
                    style={{
                      background: "oklch(0.48 0.16 25 / 0.25)",
                      color: "oklch(0.65 0.2 25)",
                      border: "1px solid oklch(0.48 0.16 25 / 0.4)",
                    }}
                  >
                    DANGER
                  </span>
                  <div>
                    <p
                      className="text-xs font-bold"
                      style={{ color: "oklch(0.65 0.2 25)" }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.74 0.015 80)" }}
                    >
                      {item.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Storage Tips Tab */}
        <TabsContent value="storage" className="mt-0">
          <ScrollArea className="h-48">
            <div className="space-y-2 pr-2">
              <p
                className="text-xs mb-2"
                style={{ color: "oklch(0.74 0.015 80)" }}
              >
                Food safety rules for disaster zones — no refrigeration assumed.
              </p>
              {storageTips.map(({ num, tip }) => (
                <div
                  key={num}
                  className="flex items-start gap-2 text-xs text-foreground py-1 border-b"
                  style={{ borderColor: "oklch(0.29 0.007 95)" }}
                >
                  <span
                    className="font-bold shrink-0 w-4 text-right"
                    style={{ color: "oklch(0.82 0.15 85)" }}
                  >
                    {num}.
                  </span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
