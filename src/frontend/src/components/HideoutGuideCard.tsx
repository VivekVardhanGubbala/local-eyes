import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Home, XCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

type HideoutData = {
  emoji: string;
  label: string;
  locations: string[];
  avoidActs: string[];
  avoidCarry: string[];
};

const disasters: HideoutData[] = [
  {
    emoji: "💧",
    label: "Floods",
    locations: [
      "Multi-story buildings — stay on 2nd floor or higher",
      "Hilltops and elevated ground away from rivers",
      "Strong reinforced concrete structures",
      "Bridges only if well above water line and structurally sound",
      "Community relief centers and schools on high ground",
    ],
    avoidActs: [
      "Walking or wading through moving floodwater (hidden currents)",
      "Driving through flooded roads — water depth is deceptive",
      "Touching electrical equipment near water",
      "Returning home before official all-clear signal",
      "Drinking or cooking with floodwater",
    ],
    avoidCarry: [
      "Heavy luggage — slows evacuation speed significantly",
      "Electronics without waterproof casing/bags",
      "Open food containers (contamination risk)",
      "Documents without waterproof folder protection",
    ],
  },
  {
    emoji: "🌍",
    label: "Earthquake",
    locations: [
      "Open ground away from all buildings and trees",
      "Under a sturdy table or desk indoors (Drop–Cover–Hold)",
      "Against interior walls — away from windows and exterior walls",
      "Doorframes (only in older brick buildings)",
      "After shaking stops: move to open ground immediately",
    ],
    avoidActs: [
      "Running outside DURING shaking — falling debris is fatal",
      "Using elevators during or after an earthquake",
      "Lighting matches, candles, or lighters (gas leak risk)",
      "Re-entering damaged buildings — aftershocks are common",
      "Standing near coastal areas after quake (tsunami risk)",
    ],
    avoidCarry: [
      "Glass containers — shatter and cause cuts",
      "Heavy items overhead in backpack",
      "Candles or open-flame light sources",
    ],
  },
  {
    emoji: "🌀",
    label: "Cyclone",
    locations: [
      "Reinforced concrete buildings — stay away from windows",
      "Official community cyclone shelters (government-designated)",
      "Inner rooms on ground floor — no exterior walls or windows",
      "Under a staircase — strong structural support",
      "Avoid upper floors — roof damage is most common",
    ],
    avoidActs: [
      "Going outdoors during the eye of the storm — winds resume suddenly",
      "Standing near windows or glass doors",
      "Sheltering under trees — branches and roots fail",
      "Using mobile phones near lightning (stay off during storms)",
      "Leaving shelter before official all-clear",
    ],
    avoidCarry: [
      "Umbrellas — become dangerous projectiles in strong wind",
      "Loose items that can become wind-launched missiles",
      "Tents (not adequate shelter against cyclone winds)",
    ],
  },
  {
    emoji: "⛰️",
    label: "Landslide",
    locations: [
      "High ground PERPENDICULAR to the slide path — move sideways",
      "Upper floors of a solid concrete or stone building",
      "Rocky outcrops clearly above the known slide zone",
      "Far from riverbanks, cliff bases, and steep slopes",
      "Move to high ground immediately on hearing rumbling",
    ],
    avoidActs: [
      "Sheltering in valleys or ravines — debris channels there",
      "Moving along or across a slope during rainfall",
      "Ignoring warning signs: rumbling sounds, tilting trees, cracks in ground",
      "Following a road that runs along or below a slope",
    ],
    avoidCarry: [
      "Heavy backpacks — move fast and light, survival first",
      "Items that slow your movement speed",
      "Non-essential belongings when evacuation is urgent",
    ],
  },
];

export function HideoutGuideCard() {
  const { t } = useLanguage();
  return (
    <section
      className="rounded-xl border border-border card-glow h-full"
      style={{ background: "oklch(0.22 0.007 95)" }}
      aria-labelledby="hideout-heading"
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Home
            className="w-4 h-4"
            style={{ color: "oklch(0.65 0.18 145)" }}
            aria-hidden="true"
          />
          <h2
            id="hideout-heading"
            className="font-display font-bold text-sm uppercase tracking-widest text-foreground"
          >
            {t("hideout.title")}
          </h2>
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.65 0.18 145 / 0.15)",
            color: "oklch(0.65 0.18 145)",
            border: "1px solid oklch(0.65 0.18 145 / 0.3)",
          }}
        >
          {t("hideout.badge")}
        </span>
      </div>

      <Tabs defaultValue="floods" className="px-4 pb-4">
        <TabsList
          className="w-full h-8 p-0.5 mb-3"
          style={{ background: "oklch(0.15 0.007 95)" }}
        >
          {disasters.map((d) => (
            <TabsTrigger
              key={d.label}
              value={d.label.toLowerCase()}
              data-ocid={`hideout.${d.label.toLowerCase()}.tab`}
              className="flex-1 text-xs h-7 data-[state=active]:text-[oklch(0.13_0.007_95)] rounded-full transition-all"
            >
              <span>{d.emoji}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {disasters.map((d) => (
          <TabsContent
            key={d.label}
            value={d.label.toLowerCase()}
            className="mt-0"
          >
            <p
              className="text-sm font-bold mb-2 flex items-center gap-2"
              style={{ color: "oklch(0.82 0.15 85)" }}
            >
              {d.emoji} {d.label}
            </p>
            <ScrollArea className="h-52">
              <div className="space-y-3 pr-2">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wide mb-1.5"
                    style={{ color: "oklch(0.65 0.18 145)" }}
                  >
                    {t("hideout.safe")}
                  </p>
                  <ul className="space-y-1">
                    {d.locations.map((loc) => (
                      <li key={loc} className="flex items-start gap-2 text-xs">
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: "oklch(0.65 0.18 145)" }}
                          aria-hidden="true"
                        />
                        <span style={{ color: "oklch(0.74 0.015 80)" }}>
                          {loc}
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
                    {t("hideout.avoid_acts")}
                  </p>
                  <ul className="space-y-1">
                    {d.avoidActs.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-xs">
                        <XCircle
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: "oklch(0.65 0.2 25)" }}
                          aria-hidden="true"
                        />
                        <span style={{ color: "oklch(0.74 0.015 80)" }}>
                          {a}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wide mb-1.5"
                    style={{ color: "oklch(0.60 0.14 40)" }}
                  >
                    {t("hideout.avoid_carry")}
                  </p>
                  <ul className="space-y-1">
                    {d.avoidCarry.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-xs">
                        <XCircle
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: "oklch(0.60 0.14 40)" }}
                          aria-hidden="true"
                        />
                        <span style={{ color: "oklch(0.74 0.015 80)" }}>
                          {c}
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
