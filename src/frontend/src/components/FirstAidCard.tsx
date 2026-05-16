import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, ChevronLeft, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  BODY_ZONE_DATA,
  type BodyZone,
  type ZoneScenario,
} from "../data/bodyZoneData";
import { useFirstAidArticles } from "../hooks/useQueries";
import type { FirstAidArticle } from "../types/localTypes";

// 12+ anatomical zones with SVG coordinates on a human silhouette (200x230 viewBox)
const ZONES = [
  { id: "head", cx: 100, cy: 20, rx: 14, ry: 16, label: "Head" },
  { id: "eyes", cx: 100, cy: 28, rx: 8, ry: 4, label: "Eyes" },
  { id: "nose_throat", cx: 100, cy: 40, rx: 7, ry: 6, label: "Nose/Throat" },
  { id: "chest", cx: 100, cy: 66, rx: 17, ry: 16, label: "Chest" },
  { id: "abdomen", cx: 100, cy: 96, rx: 14, ry: 12, label: "Abdomen" },
  {
    id: "back_spine",
    cx: 100,
    cy: 82,
    rx: 6,
    ry: 22,
    label: "Back/Spine",
    isBack: true,
  },
  { id: "arm_left", cx: 64, cy: 82, rx: 9, ry: 20, label: "Left Arm" },
  { id: "arm_right", cx: 136, cy: 82, rx: 9, ry: 20, label: "Right Arm" },
];

// Multi-element zones (rendered as two shapes)
const DUAL_ZONES = [
  {
    id: "ears",
    label: "Ears",
    cx1: 83,
    cy1: 23,
    cx2: 117,
    cy2: 23,
    rx: 5,
    ry: 5,
  },
  {
    id: "hands",
    label: "Hands/Wrists",
    cx1: 67,
    cy1: 104,
    cx2: 133,
    cy2: 104,
    rx: 9,
    ry: 5,
  },
  {
    id: "leg_left",
    label: "Left Leg",
    cx1: 88,
    cy1: 163,
    cx2: 88,
    cy2: 163,
    rx: 9,
    ry: 28,
    single: true,
  },
  {
    id: "leg_right",
    label: "Right Leg",
    cx1: 112,
    cy1: 163,
    cx2: 112,
    cy2: 163,
    rx: 9,
    ry: 28,
    single: true,
  },
  {
    id: "feet",
    label: "Feet/Ankles",
    cx1: 89,
    cy1: 194,
    cx2: 111,
    cy2: 194,
    rx: 10,
    ry: 5,
  },
];

function severityColor(s: string) {
  if (s === "critical") return "oklch(0.48 0.16 25)";
  if (s === "high") return "oklch(0.60 0.14 40)";
  if (s === "moderate") return "oklch(0.82 0.15 85)";
  return "oklch(0.65 0.18 145)";
}

function severityLabel(s: string) {
  if (s === "critical") return "CRITICAL";
  if (s === "high") return "HIGH";
  if (s === "moderate") return "MODERATE";
  return "LOW";
}

type View =
  | { mode: "articles" }
  | { mode: "zone"; zone: BodyZone }
  | { mode: "scenario"; zone: BodyZone; scenario: ZoneScenario }
  | { mode: "article"; article: FirstAidArticle };

export function FirstAidCard() {
  const { data: articles = [], isLoading } = useFirstAidArticles();
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);
  const [view, setView] = useState<View>({ mode: "articles" });

  function handleZoneClick(zoneId: string) {
    const zone = BODY_ZONE_DATA[zoneId];
    if (!zone) {
      setActiveZoneId(null);
      setView({ mode: "articles" });
      return;
    }
    if (activeZoneId === zoneId) {
      setActiveZoneId(null);
      setView({ mode: "articles" });
    } else {
      setActiveZoneId(zoneId);
      setView({ mode: "zone", zone });
    }
  }

  function handleBack() {
    if (view.mode === "scenario") {
      setView({ mode: "zone", zone: view.zone });
    } else if (view.mode === "zone") {
      setActiveZoneId(null);
      setView({ mode: "articles" });
    } else if (view.mode === "article") {
      setView({ mode: "articles" });
    }
  }

  const getZoneColor = (zoneId: string) =>
    BODY_ZONE_DATA[zoneId]?.color ?? "oklch(0.48 0.16 25)";

  const headingText = () => {
    if (view.mode === "articles") return "Guidance";
    if (view.mode === "zone") return view.zone.label;
    if (view.mode === "scenario") return view.scenario.title;
    if (view.mode === "article") return view.article.title;
    return "Guidance";
  };

  const activeLabel = activeZoneId
    ? (
        ZONES.find((z) => z.id === activeZoneId) ??
        DUAL_ZONES.find((z) => z.id === activeZoneId)
      )?.label
    : null;

  return (
    <section
      className="rounded-2xl border border-border h-full flex flex-col overflow-hidden card-glow"
      style={{ background: "oklch(0.22 0.007 95)" }}
      id="firstaid"
      aria-labelledby="firstaid-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2 min-w-0">
          {view.mode !== "articles" && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
              data-ocid="firstaid.close_button"
              aria-label="Go back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <span
            className="flex-shrink-0 text-xs font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.48 0.16 25 / 0.2)",
              color: "oklch(0.70 0.14 30)",
            }}
          >
            First-Aid
          </span>
          <h2
            id="firstaid-heading"
            className="font-display font-bold uppercase tracking-wide text-sm text-foreground truncate"
          >
            {headingText()}
          </h2>
        </div>
        {isLoading && (
          <Loader2
            className="w-4 h-4 animate-spin text-muted-foreground flex-shrink-0"
            data-ocid="firstaid.loading_state"
            role="status"
            aria-label="Loading first aid articles..."
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* SVG Body Map */}
        <div className="flex-shrink-0 flex flex-col items-center justify-start pt-3 pb-2 px-3 border-b md:border-b-0 md:border-r border-border">
          <svg
            viewBox="0 0 200 210"
            width="108"
            height="113"
            className="overflow-visible"
            aria-label="Body zone selector — use arrow keys to navigate, Enter to select"
          >
            <title>
              Interactive body zone diagram — tap a zone to see treatments
            </title>
            {/* --- Silhouette shapes --- */}
            <ellipse
              cx="100"
              cy="20"
              rx="13"
              ry="15"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="95"
              y="34"
              width="10"
              height="9"
              rx="3"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="80"
              y="43"
              width="40"
              height="58"
              rx="8"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="56"
              y="46"
              width="22"
              height="52"
              rx="8"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="122"
              y="46"
              width="22"
              height="52"
              rx="8"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <ellipse
              cx="67"
              cy="103"
              rx="10"
              ry="6"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <ellipse
              cx="133"
              cy="103"
              rx="10"
              ry="6"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="82"
              y="101"
              width="36"
              height="22"
              rx="5"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="80"
              y="123"
              width="18"
              height="58"
              rx="7"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="102"
              y="123"
              width="18"
              height="58"
              rx="7"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <ellipse
              cx="89"
              cy="188"
              rx="11"
              ry="6"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />
            <ellipse
              cx="111"
              cy="188"
              rx="11"
              ry="6"
              fill="oklch(0.27 0.007 95)"
              stroke="oklch(0.33 0.007 95)"
              strokeWidth="1"
            />

            {/* --- Zone overlays (single ellipse) --- */}
            {ZONES.map((z) => {
              const isActive = activeZoneId === z.id;
              const color = getZoneColor(z.id);
              return (
                <ellipse
                  key={z.id}
                  cx={z.cx}
                  cy={z.cy}
                  rx={z.rx}
                  ry={z.ry}
                  fill={isActive ? `${color}55` : `${color}25`}
                  stroke={color}
                  strokeWidth={isActive ? "2" : "1"}
                  className="cursor-pointer transition-all"
                  onClick={() => handleZoneClick(z.id)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    handleZoneClick(z.id)
                  }
                  tabIndex={0}
                  role="button"
                  aria-label={z.label}
                  aria-pressed={isActive}
                />
              );
            })}

            {/* --- Dual-element zone overlays --- */}
            {DUAL_ZONES.map((z) => {
              const isActive = activeZoneId === z.id;
              const color = getZoneColor(z.id);
              if (z.single) {
                return (
                  <ellipse
                    key={z.id}
                    cx={z.cx1}
                    cy={z.cy1}
                    rx={z.rx}
                    ry={z.ry}
                    fill={isActive ? `${color}55` : `${color}25`}
                    stroke={color}
                    strokeWidth={isActive ? "2" : "1"}
                    className="cursor-pointer transition-all"
                    onClick={() => handleZoneClick(z.id)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      handleZoneClick(z.id)
                    }
                    tabIndex={0}
                    role="button"
                    aria-label={z.label}
                    aria-pressed={isActive}
                  />
                );
              }
              return (
                <g key={z.id}>
                  <ellipse
                    cx={z.cx1}
                    cy={z.cy1}
                    rx={z.rx}
                    ry={z.ry}
                    fill={isActive ? `${color}55` : `${color}25`}
                    stroke={color}
                    strokeWidth={isActive ? "2" : "1"}
                    className="cursor-pointer transition-all"
                    onClick={() => handleZoneClick(z.id)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      handleZoneClick(z.id)
                    }
                    tabIndex={0}
                    role="button"
                    aria-label={z.label}
                    aria-pressed={isActive}
                  />
                  <ellipse
                    cx={z.cx2}
                    cy={z.cy2}
                    rx={z.rx}
                    ry={z.ry}
                    fill={isActive ? `${color}55` : `${color}25`}
                    stroke={color}
                    strokeWidth={isActive ? "2" : "1"}
                    className="cursor-pointer transition-all"
                    onClick={() => handleZoneClick(z.id)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      handleZoneClick(z.id)
                    }
                    tabIndex={0}
                    role="button"
                    aria-label={z.label}
                    aria-pressed={isActive}
                  />
                </g>
              );
            })}
          </svg>

          <div className="mt-1 text-center">
            {activeLabel ? (
              <span
                className="text-xs font-display font-bold"
                style={{ color: getZoneColor(activeZoneId ?? "") }}
              >
                {activeLabel}
              </span>
            ) : (
              <p className="text-xs text-muted-foreground leading-tight">
                Tap a zone
              </p>
            )}
          </div>
          {/* Screen-reader accessible zone list */}
          <ul className="sr-only" aria-label="Available body zones">
            {[...ZONES, ...DUAL_ZONES].map((z) => (
              <li key={z.id}>{z.label}</li>
            ))}
          </ul>
        </div>

        {/* Right Panel */}
        <div className="flex-1 min-h-0 min-w-0">
          <ScrollArea className="h-full max-h-80 md:max-h-none">
            <AnimatePresence mode="wait">
              {view.mode === "scenario" && (
                <ScenarioDetail key="scenario" scenario={view.scenario} />
              )}
              {view.mode === "article" && (
                <ArticleDetail key="article" article={view.article} />
              )}
              {view.mode === "zone" && (
                <ZoneScenarioList
                  key={`zone-${view.zone.id}`}
                  zone={view.zone}
                  onSelect={(s) =>
                    setView({ mode: "scenario", zone: view.zone, scenario: s })
                  }
                />
              )}
              {view.mode === "articles" && (
                <ArticleList
                  key="articles"
                  articles={articles}
                  isLoading={isLoading}
                  onSelect={(a) => setView({ mode: "article", article: a })}
                />
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}

function ZoneScenarioList({
  zone,
  onSelect,
}: { zone: BodyZone; onSelect: (s: ZoneScenario) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="p-2"
      aria-label={`${zone.label} treatment scenarios`}
    >
      <div className="px-2 py-1.5 mb-2 flex items-center gap-2">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: zone.color }}
          aria-hidden="true"
        />
        <h3 className="text-xs text-muted-foreground font-display uppercase tracking-wider">
          {zone.scenarios.length} scenario
          {zone.scenarios.length !== 1 ? "s" : ""}
        </h3>
      </div>
      <ul className="space-y-0">
        {zone.scenarios.map((scenario, i) => (
          <li key={scenario.id}>
            <button
              type="button"
              className="w-full text-left flex items-center gap-3 p-2.5 min-h-[48px] rounded-xl hover:bg-accent transition-colors focus:ring-2 focus:ring-cyan-400 focus:outline-none group"
              onClick={() => onSelect(scenario)}
              data-ocid={`firstaid.item.${i + 1}`}
              aria-label={`${scenario.title} — ${severityLabel(scenario.severity)} severity, ${scenario.steps.length} steps`}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: severityColor(scenario.severity) }}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground truncate">
                  {scenario.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-xs font-display uppercase tracking-wider"
                    style={{ color: severityColor(scenario.severity) }}
                  >
                    {severityLabel(scenario.severity)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {scenario.steps.length} steps
                  </span>
                </div>
              </div>
              <ChevronLeft
                className="w-4 h-4 text-muted-foreground rotate-180 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                aria-hidden="true"
              />
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ScenarioDetail({ scenario }: { scenario: ZoneScenario }) {
  const [activeTab, setActiveTab] = useState<
    "steps" | "medicines" | "warnings"
  >("steps");
  const hasMeds = scenario.medicines.length > 0;
  const hasWarnings = scenario.warnings.length + scenario.doNot.length > 0;
  const tabs = (
    [
      "steps",
      hasMeds ? "medicines" : null,
      hasWarnings ? "warnings" : null,
    ] as const
  ).filter((t): t is "steps" | "medicines" | "warnings" => t !== null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Badge
          style={{
            background: `${severityColor(scenario.severity)}22`,
            color: severityColor(scenario.severity),
            border: `1px solid ${severityColor(scenario.severity)}44`,
          }}
        >
          {severityLabel(scenario.severity)}
        </Badge>
      </div>

      <div
        role="tablist"
        aria-label="Treatment information tabs"
        className="flex gap-1 mb-3 border-b border-border pb-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className="text-xs font-display uppercase tracking-wider px-2 py-1 min-h-[32px] rounded-lg transition-colors focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            style={{
              background:
                activeTab === tab
                  ? "oklch(0.48 0.16 25 / 0.15)"
                  : "transparent",
              color:
                activeTab === tab
                  ? "oklch(0.70 0.14 30)"
                  : "oklch(0.60 0.02 95)",
            }}
            data-ocid={`firstaid.${tab}_tab`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "steps" && (
          <motion.ol
            key="steps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
            aria-label="Treatment steps"
          >
            {scenario.steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-display"
                  style={{
                    background: "oklch(0.48 0.16 25 / 0.2)",
                    color: "oklch(0.70 0.14 30)",
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-foreground leading-relaxed">{step}</span>
              </li>
            ))}
          </motion.ol>
        )}
        {activeTab === "medicines" && (
          <motion.div
            key="medicines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {scenario.medicines.map((med) => (
              <div
                key={`${med.name}-${med.ageGroup}`}
                className="p-3 rounded-xl border border-border"
                style={{ background: "oklch(0.25 0.007 95)" }}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-body font-semibold text-foreground">
                    {med.name}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: "oklch(0.65 0.15 220 / 0.2)",
                      color: "oklch(0.72 0.12 220)",
                    }}
                  >
                    {med.ageGroup}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                  <span>
                    Dose: <span className="text-foreground">{med.dosage}</span>
                  </span>
                  <span>
                    Freq:{" "}
                    <span className="text-foreground">{med.frequency}</span>
                  </span>
                </div>
                {med.notes && (
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    {med.notes}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        )}
        {activeTab === "warnings" && (
          <motion.div
            key="warnings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {scenario.warnings.length > 0 && (
              <div>
                <h4
                  className="text-xs font-display uppercase tracking-wider mb-2"
                  style={{ color: "oklch(0.60 0.14 40)" }}
                >
                  <span aria-hidden="true">⚠</span> Warnings
                </h4>
                <ul className="space-y-1.5">
                  {scenario.warnings.map((w) => (
                    <li key={w} className="flex gap-2 text-sm">
                      <AlertCircle
                        className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        style={{ color: "oklch(0.60 0.14 40)" }}
                        aria-hidden="true"
                      />
                      <span className="text-foreground leading-relaxed">
                        {w}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {scenario.doNot.length > 0 && (
              <div>
                <h4
                  className="text-xs font-display uppercase tracking-wider mb-2"
                  style={{ color: "oklch(0.48 0.16 25)" }}
                >
                  <span aria-hidden="true">✕</span> Do NOT
                </h4>
                <ul className="space-y-1.5">
                  {scenario.doNot.map((d) => (
                    <li key={d} className="flex gap-2 text-sm">
                      <span
                        className="flex-shrink-0 text-xs mt-0.5"
                        style={{ color: "oklch(0.48 0.16 25)" }}
                      >
                        ✕
                      </span>
                      <span className="text-foreground leading-relaxed">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ArticleList({
  articles,
  isLoading,
  onSelect,
}: {
  articles: FirstAidArticle[];
  isLoading: boolean;
  onSelect: (a: FirstAidArticle) => void;
}) {
  return (
    <motion.div
      key="list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-2"
    >
      <div className="px-2 py-1 mb-2 flex items-center gap-2">
        <AlertCircle
          className="w-3.5 h-3.5"
          style={{ color: "oklch(0.82 0.15 85)" }}
          aria-hidden="true"
        />
        <span className="text-xs text-muted-foreground">
          Tap a body zone for treatment
        </span>
      </div>
      {articles.length === 0 && !isLoading && (
        <div
          className="flex flex-col items-center justify-center py-8 text-muted-foreground"
          data-ocid="firstaid.empty_state"
        >
          <AlertCircle className="w-8 h-8 mb-2 opacity-40" />
          <p className="text-sm">No articles found</p>
        </div>
      )}
      {articles.map((article, i) => (
        <button
          type="button"
          key={article.title}
          className="w-full text-left flex items-center gap-3 p-2.5 min-h-[48px] rounded-xl hover:bg-accent transition-colors focus:ring-2 focus:ring-cyan-400 focus:outline-none group"
          onClick={() => onSelect(article)}
          data-ocid={`firstaid.item.${i + 1}`}
          aria-label={`${article.title} — ${article.severity as string} severity`}
        >
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: severityColor(article.severity as string) }}
            aria-hidden="true"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-body font-medium text-foreground truncate">
              {article.title}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {article.category as string}
            </p>
          </div>
          <ChevronLeft
            className="w-4 h-4 text-muted-foreground rotate-180 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
            aria-hidden="true"
          />
        </button>
      ))}
    </motion.div>
  );
}

function ArticleDetail({ article }: { article: FirstAidArticle }) {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Badge
          style={{
            background: `${severityColor(article.severity as string)}22`,
            color: severityColor(article.severity as string),
            border: `1px solid ${severityColor(article.severity as string)}44`,
          }}
        >
          {article.severity as string}
        </Badge>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {article.category as string}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        {article.content}
      </p>
      <ol className="space-y-2" aria-label="Treatment steps">
        {article.steps.map((step, i) => (
          <li key={step} className="flex gap-3 text-sm">
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-display"
              style={{
                background: "oklch(0.48 0.16 25 / 0.2)",
                color: "oklch(0.70 0.14 30)",
              }}
            >
              {i + 1}
            </span>
            <span className="text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}
