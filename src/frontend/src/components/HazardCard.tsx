import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Loader2 } from "lucide-react";
import { HazardSeverity, HazardType } from "../backend.d";
import { useHazardAlerts } from "../hooks/useQueries";

const SEVERITY_COLORS: Record<string, string> = {
  [HazardSeverity.extreme]: "oklch(0.48 0.16 25)",
  [HazardSeverity.severe]: "oklch(0.60 0.14 40)",
  [HazardSeverity.moderate]: "oklch(0.82 0.15 85)",
  [HazardSeverity.low]: "oklch(0.65 0.18 145)",
};

const HAZARD_ICONS: Record<string, string> = {
  [HazardType.flood]: "💧",
  [HazardType.earthquake]: "🌍",
  [HazardType.fire]: "🔥",
  [HazardType.chemical]: "☣️",
};

const MAP_PINS = [
  { x: 30, y: 40, color: "oklch(0.48 0.16 25)" },
  { x: 65, y: 25, color: "oklch(0.60 0.14 40)" },
  { x: 75, y: 60, color: "oklch(0.82 0.15 85)" },
  { x: 45, y: 70, color: "oklch(0.65 0.18 145)" },
];

export function HazardCard() {
  const { data: hazards = [], isLoading } = useHazardAlerts();

  return (
    <div
      className="rounded-2xl border border-border flex flex-col overflow-hidden card-glow"
      style={{ background: "oklch(0.22 0.007 95)" }}
      id="hazards"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.82 0.15 85 / 0.15)",
              color: "oklch(0.82 0.15 85)",
            }}
          >
            Hazards
          </span>
          <h3 className="font-display font-bold uppercase tracking-wide text-sm text-foreground">
            Detection & Alerts
          </h3>
        </div>
        {isLoading && (
          <Loader2
            className="w-4 h-4 animate-spin text-muted-foreground"
            data-ocid="hazard.loading_state"
          />
        )}
      </div>

      <div className="p-4 border-b border-border">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "oklch(0.165 0.007 95)",
            border: "1px solid oklch(0.29 0.007 95)",
          }}
        >
          <svg
            viewBox="0 0 100 80"
            className="w-full h-24"
            role="img"
            aria-label="Hazard map with alert markers"
          >
            <title>Hazard alert map</title>
            {[20, 40, 60, 80].map((x) => (
              <line
                key={`v${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="80"
                stroke="oklch(0.29 0.007 95)"
                strokeWidth="0.5"
              />
            ))}
            {[20, 40, 60].map((y) => (
              <line
                key={`h${y}`}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="oklch(0.29 0.007 95)"
                strokeWidth="0.5"
              />
            ))}
            <ellipse
              cx="35"
              cy="35"
              rx="25"
              ry="18"
              fill="none"
              stroke="oklch(0.25 0.007 95)"
              strokeWidth="0.8"
            />
            <ellipse
              cx="70"
              cy="55"
              rx="20"
              ry="15"
              fill="none"
              stroke="oklch(0.25 0.007 95)"
              strokeWidth="0.8"
            />
            {MAP_PINS.map((pin) => (
              <g key={`${pin.x}-${pin.y}`}>
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="5"
                  fill={`${pin.color.slice(0, -1)} / 0.2)`}
                  stroke={pin.color}
                  strokeWidth="1.5"
                />
                <circle cx={pin.x} cy={pin.y} r="2" fill={pin.color} />
              </g>
            ))}
          </svg>
          <div className="absolute top-2 right-2 text-xs font-body text-muted-foreground bg-card px-1.5 py-0.5 rounded border border-border">
            Sector 7-G
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 h-44">
        <div className="p-2">
          {hazards.length === 0 && !isLoading && (
            <div
              className="flex flex-col items-center justify-center py-8 text-muted-foreground"
              data-ocid="hazard.empty_state"
            >
              <AlertTriangle className="w-8 h-8 mb-2 opacity-40" />
              <p className="text-sm">No active hazards</p>
            </div>
          )}
          {hazards.map((h, i) => (
            <div
              key={`${h.hazardType as string}-${h.location}-${i}`}
              className="flex items-start gap-3 p-2.5 rounded-xl mb-1 border border-border hover:bg-accent transition-colors"
              style={{ background: "oklch(0.18 0.007 95)" }}
              data-ocid={`hazard.item.${i + 1}`}
            >
              <span className="text-lg leading-none mt-0.5">
                {HAZARD_ICONS[h.hazardType as string] ?? "⚠️"}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-body font-medium text-foreground capitalize">
                    {h.hazardType as string}
                  </span>
                  <Badge
                    className="text-xs px-1.5 py-0 border-0"
                    style={{
                      background: `${(SEVERITY_COLORS[h.severity as string] ?? "oklch(0.65 0.18 145)").slice(0, -1)} / 0.15)`,
                      color:
                        SEVERITY_COLORS[h.severity as string] ??
                        "oklch(0.65 0.18 145)",
                    }}
                  >
                    {h.severity as string}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {h.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
