import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, ChevronLeft, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { FirstAidArticle } from "../backend.d";
import { useFirstAidArticles } from "../hooks/useQueries";

const HOTSPOTS = [
  {
    id: "head",
    cx: 100,
    cy: 32,
    r: 18,
    label: "Head Injury",
    categories: ["CPR"],
  },
  {
    id: "chest",
    cx: 100,
    cy: 80,
    r: 16,
    label: "Chest / CPR",
    categories: ["CPR", "shock"],
  },
  {
    id: "arm-left",
    cx: 65,
    cy: 90,
    r: 13,
    label: "Arm Wound",
    categories: ["bleeding", "fractures"],
  },
  {
    id: "arm-right",
    cx: 135,
    cy: 90,
    r: 13,
    label: "Arm Wound",
    categories: ["bleeding", "fractures"],
  },
  {
    id: "abdomen",
    cx: 100,
    cy: 120,
    r: 15,
    label: "Abdomen",
    categories: ["shock"],
  },
  {
    id: "leg",
    cx: 100,
    cy: 175,
    r: 14,
    label: "Leg Wound",
    categories: ["bleeding", "fractures"],
  },
];

function severityColor(s: string) {
  if (s === "critical") return "oklch(0.48 0.16 25)";
  if (s === "high") return "oklch(0.60 0.14 40)";
  if (s === "moderate") return "oklch(0.82 0.15 85)";
  return "oklch(0.65 0.18 145)";
}

export function FirstAidCard() {
  const { data: articles = [], isLoading } = useFirstAidArticles();
  const [selected, setSelected] = useState<FirstAidArticle | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const filteredByHotspot = activeHotspot
    ? articles.filter((a) => {
        const spot = HOTSPOTS.find((h) => h.id === activeHotspot);
        return spot?.categories.includes(a.category as string);
      })
    : articles;

  function toggleHotspot(id: string) {
    setActiveHotspot((prev) => (prev === id ? null : id));
  }

  return (
    <div
      className="rounded-2xl border border-border h-full flex flex-col overflow-hidden card-glow"
      style={{ background: "oklch(0.22 0.007 95)" }}
      id="dashboard"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          {selected && (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
              data-ocid="firstaid.close_button"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <span
            className="text-xs font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.48 0.16 25 / 0.2)",
              color: "oklch(0.70 0.14 30)",
            }}
          >
            First-Aid
          </span>
          <h3 className="font-display font-bold uppercase tracking-wide text-sm text-foreground">
            {selected ? selected.title : "Guidance"}
          </h3>
        </div>
        {isLoading && (
          <Loader2
            className="w-4 h-4 animate-spin text-muted-foreground"
            data-ocid="firstaid.loading_state"
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* SVG Body */}
        <div className="flex-shrink-0 flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-border">
          <svg
            viewBox="0 0 200 220"
            width="120"
            height="132"
            className="overflow-visible"
            role="img"
            aria-label="Human body diagram with clickable injury hotspots"
          >
            <title>Body hotspot diagram</title>
            <ellipse
              cx="100"
              cy="32"
              rx="18"
              ry="20"
              fill="oklch(0.29 0.007 95)"
              stroke="oklch(0.35 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="80"
              y="52"
              width="40"
              height="55"
              rx="8"
              fill="oklch(0.29 0.007 95)"
              stroke="oklch(0.35 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="55"
              y="55"
              width="22"
              height="50"
              rx="8"
              fill="oklch(0.29 0.007 95)"
              stroke="oklch(0.35 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="123"
              y="55"
              width="22"
              height="50"
              rx="8"
              fill="oklch(0.29 0.007 95)"
              stroke="oklch(0.35 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="83"
              y="107"
              width="34"
              height="50"
              rx="6"
              fill="oklch(0.29 0.007 95)"
              stroke="oklch(0.35 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="83"
              y="155"
              width="15"
              height="45"
              rx="6"
              fill="oklch(0.29 0.007 95)"
              stroke="oklch(0.35 0.007 95)"
              strokeWidth="1"
            />
            <rect
              x="102"
              y="155"
              width="15"
              height="45"
              rx="6"
              fill="oklch(0.29 0.007 95)"
              stroke="oklch(0.35 0.007 95)"
              strokeWidth="1"
            />

            {HOTSPOTS.map((h) => (
              <circle
                key={h.id}
                cx={h.cx}
                cy={h.cy}
                r={h.r}
                fill={
                  activeHotspot === h.id
                    ? "oklch(0.48 0.16 25 / 0.5)"
                    : "oklch(0.48 0.16 25 / 0.2)"
                }
                stroke="oklch(0.48 0.16 25)"
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => toggleHotspot(h.id)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && toggleHotspot(h.id)
                }
                tabIndex={0}
                role="button"
                aria-label={h.label}
                aria-pressed={activeHotspot === h.id}
              />
            ))}
          </svg>
        </div>

        {/* Articles List / Detail */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full max-h-72 md:max-h-none">
            <AnimatePresence mode="wait">
              {selected ? (
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
                        background: `${severityColor(selected.severity as string)}22`,
                        color: severityColor(selected.severity as string),
                        border: `1px solid ${severityColor(selected.severity as string)}44`,
                      }}
                    >
                      {selected.severity as string}
                    </Badge>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {selected.category as string}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {selected.content}
                  </p>
                  <ol className="space-y-2">
                    {selected.steps.map((step, i) => (
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
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-2"
                >
                  {activeHotspot && (
                    <div className="px-2 py-1 mb-2 flex items-center gap-2">
                      <AlertCircle
                        className="w-3.5 h-3.5"
                        style={{ color: "oklch(0.82 0.15 85)" }}
                      />
                      <span className="text-xs text-muted-foreground">
                        Filtered by body region
                      </span>
                    </div>
                  )}
                  {filteredByHotspot.length === 0 && !isLoading && (
                    <div
                      className="flex flex-col items-center justify-center py-8 text-muted-foreground"
                      data-ocid="firstaid.empty_state"
                    >
                      <AlertCircle className="w-8 h-8 mb-2 opacity-40" />
                      <p className="text-sm">No articles found</p>
                    </div>
                  )}
                  {filteredByHotspot.map((article, i) => (
                    <button
                      type="button"
                      key={article.title}
                      className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent transition-colors group"
                      onClick={() => setSelected(article)}
                      data-ocid={`firstaid.item.${i + 1}`}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          background: severityColor(article.severity as string),
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-body font-medium text-foreground truncate">
                          {article.title}
                        </p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          {article.category as string}
                        </p>
                      </div>
                      <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
