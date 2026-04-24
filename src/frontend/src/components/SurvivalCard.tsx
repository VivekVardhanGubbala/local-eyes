import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Apple,
  Compass,
  Droplets,
  Flame,
  Home,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import type { SurvivalTopic } from "../backend.d";
import { SurvivalCategory } from "../backend.d";
import { useSurvivalTopics } from "../hooks/useQueries";

const CATEGORIES = [
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

export function SurvivalCard() {
  const { data: topics = [], isLoading } = useSurvivalTopics();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<SurvivalTopic | null>(null);

  const filtered = topics.filter((t) => {
    const matchesQuery =
      !query ||
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.content.toLowerCase().includes(query.toLowerCase());
    const matchesCat =
      !activeCategory || (t.category as string) === activeCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div
      className="rounded-2xl border border-border flex flex-col overflow-hidden card-glow"
      style={{ background: "oklch(0.22 0.007 95)" }}
      id="survival"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          {selected && (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
              data-ocid="survival.close_button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span
            className="text-xs font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.55 0.12 220 / 0.2)",
              color: "oklch(0.70 0.12 220)",
            }}
          >
            Survival
          </span>
          <h3 className="font-display font-bold uppercase tracking-wide text-sm text-foreground">
            Knowledge Base
          </h3>
        </div>
        {isLoading && (
          <Loader2
            className="w-4 h-4 animate-spin text-muted-foreground"
            data-ocid="survival.loading_state"
          />
        )}
      </div>

      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search knowledge base..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground"
            data-ocid="survival.search_input"
          />
        </div>
      </div>

      {!selected && (
        <div className="grid grid-cols-5 gap-1 p-3 border-b border-border">
          {CATEGORIES.map(({ key, label, icon: Icon, color }) => (
            <button
              type="button"
              key={key}
              onClick={() =>
                setActiveCategory(activeCategory === key ? null : key)
              }
              className="flex flex-col items-center gap-1 p-2 rounded-xl border transition-all"
              style={{
                background:
                  activeCategory === key
                    ? `${color.slice(0, -1)} / 0.1)`
                    : "oklch(0.18 0.007 95)",
                borderColor:
                  activeCategory === key
                    ? `${color.slice(0, -1)} / 0.4)`
                    : "oklch(0.29 0.007 95)",
              }}
              data-ocid="survival.tab"
            >
              <Icon className="w-4 h-4" style={{ color }} />
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
        </div>
      )}

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-48">
          {selected ? (
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
          ) : (
            <div className="p-2">
              {filtered.length === 0 && !isLoading && (
                <div
                  className="flex flex-col items-center justify-center py-8 text-muted-foreground"
                  data-ocid="survival.empty_state"
                >
                  <p className="text-sm">No results found</p>
                </div>
              )}
              {filtered.map((topic, i) => (
                <button
                  type="button"
                  key={topic.title}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-accent transition-colors"
                  onClick={() => setSelected(topic)}
                  data-ocid={`survival.item.${i + 1}`}
                >
                  <p className="text-sm font-body font-medium text-foreground">
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
