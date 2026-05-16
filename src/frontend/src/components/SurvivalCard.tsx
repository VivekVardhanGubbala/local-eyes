import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertTriangle,
  Apple,
  ChevronLeft,
  Compass,
  Droplets,
  Flame,
  Home,
  Loader2,
  Search,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { DISASTER_SCENARIOS, GENERAL_SURVIVAL } from "../data/survivalData";
import type { Scenario } from "../data/survivalData";
import { useSurvivalTopics } from "../hooks/useQueries";
import { useLanguage } from "../i18n/LanguageContext";
import type { SurvivalTopic } from "../types/localTypes";
import { SurvivalCategory } from "../types/localTypes";

type ViewMode = "general" | "disaster" | "disaster-detail" | "scenario";

const GENERAL_TABS = [
  {
    key: SurvivalCategory.water,
    label: "Water",
    icon: Droplets,
    color: "oklch(0.55 0.12 220)",
  },
  {
    key: SurvivalCategory.shelter,
    label: "Shelter",
    icon: Home,
    color: "oklch(0.82 0.15 85)",
  },
  {
    key: SurvivalCategory.fire,
    label: "Fire",
    icon: Flame,
    color: "oklch(0.60 0.14 40)",
  },
  {
    key: SurvivalCategory.navigation,
    label: "Nav",
    icon: Compass,
    color: "oklch(0.65 0.18 145)",
  },
  {
    key: SurvivalCategory.food,
    label: "Food",
    icon: Apple,
    color: "oklch(0.70 0.14 110)",
  },
];

const URGENCY_COLORS: Record<string, string> = {
  critical: "oklch(0.58 0.18 25)",
  high: "oklch(0.65 0.16 50)",
  medium: "oklch(0.70 0.14 90)",
  low: "oklch(0.60 0.12 160)",
};

export function SurvivalCard() {
  const { data: topics = [], isLoading } = useSurvivalTopics();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<SurvivalTopic | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("general");
  const [activeDisaster, setActiveDisaster] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null,
  );

  // Search across general topics + disaster scenarios
  const lq = query.toLowerCase();
  const filteredTopics = topics.filter((tp) => {
    const matchesQ =
      !query ||
      tp.title.toLowerCase().includes(lq) ||
      tp.content.toLowerCase().includes(lq);
    const matchesCat =
      !activeCategory || (tp.category as string) === activeCategory;
    return matchesQ && matchesCat;
  });

  const disasterSearchResults = query
    ? Object.values(DISASTER_SCENARIOS).flatMap((cat) =>
        cat.scenarios
          .filter(
            (s) =>
              s.title.toLowerCase().includes(lq) ||
              s.description.toLowerCase().includes(lq),
          )
          .map((s) => ({
            ...s,
            disasterTitle: cat.title,
            disasterIcon: cat.icon,
          })),
      )
    : [];

  function goBack() {
    if (selectedScenario) {
      setSelectedScenario(null);
      return;
    }
    if (viewMode === "disaster-detail") {
      setActiveDisaster(null);
      setViewMode("disaster");
      return;
    }
    if (viewMode === "disaster") {
      setViewMode("general");
      return;
    }
    setSelected(null);
  }

  const canGoBack =
    selected ||
    viewMode === "disaster" ||
    viewMode === "disaster-detail" ||
    selectedScenario;

  return (
    <div
      className="rounded-2xl border border-border flex flex-col overflow-hidden card-glow"
      style={{ background: "oklch(0.22 0.007 95)" }}
      id="survival"
      aria-labelledby="survival-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          {canGoBack && (
            <button
              type="button"
              onClick={goBack}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              data-ocid="survival.close_button"
              aria-label="Go back"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          <span
            className="text-xs font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.55 0.12 220 / 0.2)",
              color: "oklch(0.70 0.12 220)",
            }}
          >
            {t("survival.badge")}
          </span>
          <h2
            id="survival-heading"
            className="font-display font-bold uppercase tracking-wide text-sm text-foreground"
          >
            {viewMode === "disaster" || viewMode === "disaster-detail"
              ? activeDisaster
                ? DISASTER_SCENARIOS[activeDisaster]?.title
                : "Disasters"
              : t("survival.title")}
          </h2>
        </div>
        {isLoading && (
          <Loader2
            className="w-4 h-4 animate-spin text-muted-foreground"
            data-ocid="survival.loading_state"
            role="status"
            aria-label="Loading survival topics..."
          />
        )}
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("survival.search_placeholder")}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
              setSelectedScenario(null);
            }}
            className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground text-xs"
            data-ocid="survival.search_input"
          />
        </div>
      </div>

      {/* Mode tabs */}
      {!selected && !selectedScenario && !query && (
        <div
          className="grid grid-cols-2 gap-1 p-2 border-b border-border"
          role="tablist"
          aria-label="Survival guide mode"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "general"}
            onClick={() => {
              setViewMode("general");
              setActiveDisaster(null);
            }}
            className="flex items-center justify-center gap-1.5 py-1.5 min-h-[40px] rounded-lg border transition-all text-xs font-medium focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            style={{
              background:
                viewMode === "general"
                  ? "oklch(0.55 0.12 220 / 0.15)"
                  : "oklch(0.18 0.007 95)",
              borderColor:
                viewMode === "general"
                  ? "oklch(0.55 0.12 220 / 0.5)"
                  : "oklch(0.29 0.007 95)",
              color:
                viewMode === "general"
                  ? "oklch(0.70 0.12 220)"
                  : "oklch(0.74 0.015 80)",
            }}
            data-ocid="survival.tab"
          >
            <Shield className="w-3 h-3" aria-hidden="true" /> General Survival
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={
              viewMode === "disaster" || viewMode === "disaster-detail"
            }
            onClick={() => {
              setViewMode("disaster");
              setSelected(null);
            }}
            className="flex items-center justify-center gap-1.5 py-1.5 min-h-[40px] rounded-lg border transition-all text-xs font-medium focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            style={{
              background:
                viewMode === "disaster" || viewMode === "disaster-detail"
                  ? "oklch(0.58 0.18 25 / 0.15)"
                  : "oklch(0.18 0.007 95)",
              borderColor:
                viewMode === "disaster" || viewMode === "disaster-detail"
                  ? "oklch(0.58 0.18 25 / 0.5)"
                  : "oklch(0.29 0.007 95)",
              color:
                viewMode === "disaster" || viewMode === "disaster-detail"
                  ? "oklch(0.75 0.14 35)"
                  : "oklch(0.74 0.015 80)",
            }}
            data-ocid="survival.tab"
          >
            <AlertTriangle className="w-3 h-3" aria-hidden="true" /> Disaster
            Types
          </button>
        </div>
      )}

      {/* General category tabs */}
      {viewMode === "general" && !selected && !query && (
        <nav
          aria-label="Filter by survival category"
          className="grid grid-cols-5 gap-1 p-2 border-b border-border"
        >
          {GENERAL_TABS.map(({ key, label, icon: Icon, color }) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === key}
              key={key}
              onClick={() =>
                setActiveCategory(activeCategory === key ? null : key)
              }
              className="flex flex-col items-center gap-1 p-2 min-h-[48px] rounded-xl border transition-all focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              style={{
                background:
                  activeCategory === key
                    ? `${color.replace(")", " / 0.12)")}`
                    : "oklch(0.18 0.007 95)",
                borderColor:
                  activeCategory === key
                    ? `${color.replace(")", " / 0.45)")}`
                    : "oklch(0.29 0.007 95)",
              }}
              data-ocid="survival.tab"
            >
              <Icon className="w-4 h-4" style={{ color }} aria-hidden="true" />
              <span
                className="text-xs font-body"
                style={{
                  color:
                    activeCategory === key ? color : "oklch(0.74 0.015 80)",
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </nav>
      )}

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-52">
          {/* Search results across both modes */}
          {query && !selected && !selectedScenario && (
            <div className="p-2 space-y-1">
              {filteredTopics.map((topic, i) => (
                <button
                  type="button"
                  key={topic.id}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-accent transition-colors"
                  onClick={() => {
                    setSelected(topic);
                    setViewMode("general");
                  }}
                  data-ocid={`survival.item.${i + 1}`}
                >
                  <p className="text-sm font-medium text-foreground">
                    {topic.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {topic.content}
                  </p>
                </button>
              ))}
              {disasterSearchResults.map((s, i) => (
                <button
                  type="button"
                  key={s.id}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-accent transition-colors"
                  onClick={() => {
                    setSelectedScenario(s);
                    setViewMode("disaster-detail");
                  }}
                  data-ocid={`survival.item.${filteredTopics.length + i + 1}`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs">{s.disasterIcon}</span>
                    <span className="text-xs text-muted-foreground">
                      {s.disasterTitle}
                    </span>
                    <span
                      className="ml-auto text-xs px-1.5 py-0 rounded-full"
                      style={{
                        background:
                          `${URGENCY_COLORS[s.urgency] ?? URGENCY_COLORS.low} / 0.15)`.replace(
                            "/ 0.15)",
                            "/ 0.15)",
                          ),
                        color: URGENCY_COLORS[s.urgency],
                      }}
                    >
                      {s.urgency}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {s.description}
                  </p>
                </button>
              ))}
              {filteredTopics.length === 0 &&
                disasterSearchResults.length === 0 && (
                  <div
                    className="flex flex-col items-center justify-center py-8 text-muted-foreground"
                    data-ocid="survival.empty_state"
                  >
                    <p className="text-sm">{t("survival.no_results")}</p>
                  </div>
                )}
            </div>
          )}

          {/* General survival detail */}
          {selected && (
            <div className="p-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-wide text-foreground mb-2">
                {selected.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {selected.content}
              </p>
              <div className="flex flex-wrap gap-1">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Disaster scenario detail */}
          {selectedScenario && (
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: `oklch(from ${URGENCY_COLORS[selectedScenario.urgency]} l c h / 0.15)`,
                    color: URGENCY_COLORS[selectedScenario.urgency],
                  }}
                >
                  {selectedScenario.urgency.toUpperCase()}
                </span>
              </div>
              <h4 className="font-display font-bold text-sm uppercase tracking-wide text-foreground">
                {selectedScenario.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {selectedScenario.description}
              </p>
              <div>
                <p className="text-xs font-bold text-foreground mb-1 uppercase tracking-wider">
                  Steps
                </p>
                <ol className="space-y-1">
                  {selectedScenario.steps.map((step, i) => (
                    <li
                      key={step}
                      className="flex gap-2 text-xs text-muted-foreground"
                    >
                      <span
                        className="shrink-0 font-bold"
                        style={{ color: "oklch(0.70 0.12 220)" }}
                      >
                        {i + 1}.
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              {selectedScenario.materials.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-foreground mb-1 uppercase tracking-wider">
                    Materials
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedScenario.materials.map((m) => (
                      <Badge key={m} variant="outline" className="text-xs">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div
                className="rounded-lg p-2 border border-border"
                style={{ background: "oklch(0.18 0.007 95)" }}
              >
                <p
                  className="text-xs font-bold mb-0.5 uppercase tracking-wider"
                  style={{ color: "oklch(0.65 0.18 145)" }}
                >
                  AP Specific
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedScenario.apSpecific}
                </p>
              </div>
            </div>
          )}

          {/* Disaster type grid */}
          {(viewMode === "disaster" || viewMode === "disaster-detail") &&
            !selectedScenario &&
            !activeDisaster && (
              <div className="p-2 grid grid-cols-3 gap-1.5">
                {Object.values(DISASTER_SCENARIOS).map((cat, i) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => {
                      setActiveDisaster(cat.id);
                      setViewMode("disaster-detail");
                    }}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border hover:bg-accent transition-all text-center"
                    style={{ background: "oklch(0.18 0.007 95)" }}
                    data-ocid={`survival.item.${i + 1}`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-xs font-medium text-foreground leading-tight">
                      {cat.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {cat.scenarios.length} guides
                    </span>
                  </button>
                ))}
              </div>
            )}

          {/* Disaster scenarios list */}
          {viewMode === "disaster-detail" &&
            activeDisaster &&
            !selectedScenario && (
              <div className="p-2 space-y-1">
                <p className="text-xs text-muted-foreground px-2 pb-1">
                  {DISASTER_SCENARIOS[activeDisaster]?.description}
                </p>
                {DISASTER_SCENARIOS[activeDisaster]?.scenarios.map((s, i) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSelectedScenario(s)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-accent transition-colors"
                    data-ocid={`survival.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-xs px-1.5 py-0 rounded-full"
                        style={{
                          background: `${URGENCY_COLORS[s.urgency]}33`,
                          color: URGENCY_COLORS[s.urgency],
                        }}
                      >
                        {s.urgency}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {s.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {s.description}
                    </p>
                  </button>
                ))}
              </div>
            )}

          {/* General survival list */}
          {viewMode === "general" && !selected && !query && (
            <div className="p-2">
              {filteredTopics.length === 0 && !isLoading && (
                <div
                  className="flex flex-col items-center justify-center py-8 text-muted-foreground"
                  data-ocid="survival.empty_state"
                >
                  <p className="text-sm">{t("survival.no_results")}</p>
                </div>
              )}
              {/* Show GENERAL_SURVIVAL data for selected category */}
              {activeCategory && GENERAL_SURVIVAL[activeCategory]
                ? GENERAL_SURVIVAL[activeCategory].scenarios.map((s, i) => (
                    <button
                      type="button"
                      key={s.id}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-accent transition-colors"
                      onClick={() =>
                        setSelectedScenario(s as unknown as Scenario)
                      }
                      data-ocid={`survival.item.${i + 1}`}
                    >
                      <p className="text-sm font-medium text-foreground">
                        {s.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {s.content}
                      </p>
                    </button>
                  ))
                : filteredTopics.map((topic, i) => (
                    <button
                      type="button"
                      key={topic.id}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-accent transition-colors"
                      onClick={() => setSelected(topic)}
                      data-ocid={`survival.item.${i + 1}`}
                    >
                      <p className="text-sm font-medium text-foreground">
                        {topic.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {topic.content}
                      </p>
                    </button>
                  ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
