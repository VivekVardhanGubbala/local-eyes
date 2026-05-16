import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Package, XCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

type ClothingSection = {
  label: string;
  emoji: string;
  wear: string[];
  avoid: string[];
};

const generalWear = [
  "Sturdy closed-toe shoes / boots — protects from debris, broken glass, sharp objects",
  "Long-sleeved cotton shirt — protects skin from abrasions and sun",
  "Long trousers/pants — protection from cuts, insects, thorns",
  "Light jacket or windbreaker — warmth and wind protection",
  "Wide-brim hat or cap — sun protection",
  "Work gloves — handling debris and sharp objects",
  "Bright-colored or reflective vest — easier to spot by rescuers",
  "Cotton socks + moisture-wicking inner layer",
];

const generalAvoid = [
  "Flip-flops or sandals — no foot protection whatsoever",
  "Tight synthetic clothing — traps heat, melts near fire",
  "Heavy woolen clothing in tropical heat",
  "Jewelry — snagging hazard, valuable item theft risk",
  "White clothing — makes you less visible in rubble or water",
];

const tabs: ClothingSection[] = [
  {
    label: "General",
    emoji: "👕",
    wear: generalWear,
    avoid: generalAvoid,
  },
  {
    label: "Floods",
    emoji: "💧",
    wear: [
      "Waterproof knee-high boots — prevents waterborne infections",
      "Waterproof jacket or rain poncho",
      "Quick-dry trousers — nylon or synthetic (NOT jeans)",
      "Life jacket if crossing water or on boats",
      "Light layered clothing — easy to remove if pulled into water",
      "Bright or reflective clothing for visibility in murky conditions",
    ],
    avoid: [
      "Jeans — absorb water, become extremely heavy, slow swimming",
      "Leather shoes — waterlogged and hazardous",
      "Cotton socks without waterproof boots (trench foot risk)",
      "Heavy coats that restrict movement in floodwater",
    ],
  },
  {
    label: "Earthquake",
    emoji: "🌍",
    wear: [
      "Helmet or hard hat — falling debris is the primary killer",
      "Thick-soled shoes — glass and metal debris everywhere",
      "N95 dust mask — crushed concrete creates fine silica dust",
      "Safety goggles — eye protection from dust and small debris",
      "Sturdy gloves — moving rubble to find survivors",
      "Long sleeves and pants — protects from abrasions in rubble",
    ],
    avoid: [
      "High heels — impossible to move quickly over rubble",
      "Loose hanging clothing — snags on sharp debris",
      "Open footwear of any kind",
      "No mask in dusty environment — serious lung damage risk",
    ],
  },
  {
    label: "Cyclone",
    emoji: "🌀",
    wear: [
      "Windproof jacket — gusts exceed 120 km/h in severe cyclones",
      "Hood or balaclava — protects face from flying debris",
      "Safety goggles — windborne particles cause eye injury",
      "Waterproof boots — storm surge and flooding accompanies cyclones",
      "Thick work gloves — gripping surfaces in strong wind",
      "Layered clothing — temperature drops significantly during cyclone",
    ],
    avoid: [
      "Loose scarves or ties — become wind hazards, cause strangulation",
      "Umbrella — becomes uncontrollable projectile in high wind",
      "Metal accessories during lightning storms accompanying cyclones",
      "Flip-flops — useless in storm surge water and flying debris",
    ],
  },
];

export function ClothingGuideCard() {
  const { t } = useLanguage();
  return (
    <section
      className="rounded-xl border border-border card-glow h-full"
      style={{ background: "oklch(0.22 0.007 95)" }}
      aria-labelledby="clothing-heading"
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Package
            className="w-4 h-4"
            style={{ color: "oklch(0.74 0.12 60)" }}
            aria-hidden="true"
          />
          <h2
            id="clothing-heading"
            className="font-display font-bold text-sm uppercase tracking-widest text-foreground"
          >
            {t("clothing.title")}
          </h2>
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.74 0.12 60 / 0.15)",
            color: "oklch(0.74 0.12 60)",
            border: "1px solid oklch(0.74 0.12 60 / 0.3)",
          }}
        >
          {t("clothing.badge")}
        </span>
      </div>

      <Tabs defaultValue="general" className="px-4 pb-4">
        <TabsList
          className="w-full h-8 p-0.5 mb-3"
          style={{ background: "oklch(0.15 0.007 95)" }}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.label}
              value={tab.label.toLowerCase()}
              data-ocid={`clothing.${tab.label.toLowerCase()}.tab`}
              className="flex-1 text-xs h-7 data-[state=active]:text-[oklch(0.13_0.007_95)] rounded-full transition-all"
            >
              <span>{tab.emoji}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.label}
            value={tab.label.toLowerCase()}
            className="mt-0"
          >
            <p
              className="text-sm font-bold mb-2"
              style={{ color: "oklch(0.82 0.15 85)" }}
            >
              {tab.emoji} {tab.label}
            </p>
            <ScrollArea className="h-52">
              <div className="space-y-3 pr-2">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wide mb-1.5"
                    style={{ color: "oklch(0.65 0.18 145)" }}
                  >
                    {t("clothing.wear")}
                  </p>
                  <ul className="space-y-1">
                    {tab.wear.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs">
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: "oklch(0.65 0.18 145)" }}
                          aria-hidden="true"
                        />
                        <span style={{ color: "oklch(0.74 0.015 80)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wide mb-1.5"
                    style={{ color: "oklch(0.65 0.2 25)" }}
                  >
                    {t("clothing.avoid")}
                  </p>
                  <ul className="space-y-1">
                    {tab.avoid.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs">
                        <XCircle
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: "oklch(0.65 0.2 25)" }}
                          aria-hidden="true"
                        />
                        <span style={{ color: "oklch(0.74 0.015 80)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
