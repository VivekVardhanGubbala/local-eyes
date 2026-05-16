import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useState } from "react";
import { useHazardAlerts } from "../hooks/useQueries";
import {
  type HazardRecord,
  HazardSeverity,
  HazardType,
} from "../types/localTypes";

// ─── Severity config ─────────────────────────────────────────────────────────
const SEVERITY_COLOR: Record<string, string> = {
  [HazardSeverity.extreme]: "oklch(0.45 0.2 25)",
  [HazardSeverity.severe]: "oklch(0.55 0.18 40)",
  [HazardSeverity.moderate]: "oklch(0.65 0.15 80)",
  [HazardSeverity.low]: "oklch(0.7 0.12 145)",
};

const SEVERITY_LABEL: Record<string, string> = {
  [HazardSeverity.extreme]: "CRITICAL",
  [HazardSeverity.severe]: "HIGH",
  [HazardSeverity.moderate]: "MEDIUM",
  [HazardSeverity.low]: "LOW",
};

const TIME_TO_ACTION: Record<string, string> = {
  [HazardSeverity.extreme]: "Act immediately",
  [HazardSeverity.severe]: "Within 1 hour",
  [HazardSeverity.moderate]: "Within 6 hours",
  [HazardSeverity.low]: "Monitor",
};

// ─── Hazard type config ───────────────────────────────────────────────────────
const HAZARD_ICON: Record<string, string> = {
  [HazardType.flood]: "🌊",
  [HazardType.fire]: "🔥",
  [HazardType.earthquake]: "🏚️",
  [HazardType.chemical]: "☢️",
  [HazardType.cyclone]: "🌪️",
  [HazardType.heatwave]: "☀️",
  [HazardType.landslide]: "⛰️",
  [HazardType.drought]: "🏜️",
  [HazardType.tsunami]: "🌊",
  [HazardType.pandemic]: "😷",
  [HazardType.carAccident]: "🚗",
  [HazardType.chemicalSpill]: "⚗️",
};

const HAZARD_LABEL: Record<string, string> = {
  [HazardType.flood]: "Flood",
  [HazardType.fire]: "Fire",
  [HazardType.earthquake]: "Earthquake",
  [HazardType.chemical]: "Chemical",
  [HazardType.cyclone]: "Cyclone",
  [HazardType.heatwave]: "Heatwave",
  [HazardType.landslide]: "Landslide",
  [HazardType.drought]: "Drought",
  [HazardType.tsunami]: "Tsunami",
  [HazardType.pandemic]: "Pandemic",
  [HazardType.carAccident]: "Car Accident",
  [HazardType.chemicalSpill]: "Chemical Spill",
};

const HAZARD_STEPS: Record<string, string[]> = {
  [HazardType.flood]: [
    "Move immediately to higher ground — avoid valley floors and riverbanks.",
    "Turn off electricity at the main switch before water enters your home.",
    "Do NOT walk through flowing water deeper than ankle height.",
    "Avoid roads where floodwater is moving — cars can be swept away.",
    "Signal rescuers from rooftop using bright cloth or a mirror.",
  ],
  [HazardType.fire]: [
    "Alert everyone and activate the nearest fire alarm immediately.",
    "Crawl low under smoke — stay below the 60 cm clean air zone.",
    "Close all doors behind you to slow fire spread; do NOT use lifts.",
    "Evacuate to the designated muster point at least 100 m from building.",
    "Call 101 once safe — do NOT re-enter the building for any reason.",
  ],
  [HazardType.earthquake]: [
    "DROP to hands and knees immediately to avoid being knocked over.",
    "Take COVER under a sturdy table; if none, protect head with arms.",
    "HOLD ON until shaking stops — move with the table if it shifts.",
    "After shaking stops, check for injuries; do NOT use open flames.",
    "Evacuate if building is structurally damaged; expect aftershocks.",
  ],
  [HazardType.cyclone]: [
    "Secure loose objects outdoors or bring indoors immediately.",
    "Move to the strongest part of the building — interior ground-floor room.",
    "Stay away from windows; close and barricade all exterior doors.",
    "Fill bathtubs and containers with clean water before supply cuts.",
    "Listen to All India Radio 100.1 FM for official government updates.",
  ],
  [HazardType.heatwave]: [
    "Move to a cool, shaded, or air-conditioned location immediately.",
    "Drink 1 litre of ORS (Oral Rehydration Salt) water per hour.",
    "Loosen tight clothing; apply cool wet cloth to neck, armpits, groin.",
    "NEVER leave children or elderly persons alone in parked vehicles.",
    "Call 108 if the person shows confusion, stops sweating, or faints.",
  ],
  [HazardType.landslide]: [
    "Evacuate laterally away from the slide path — never run downhill.",
    "Watch for sudden changes in streams — muddy water signals upstream slide.",
    "Stay away from slide area; secondary collapses can occur within hours.",
    "Listen for unusual sounds: cracking trees, boulders knocking together.",
    "Call SDRF Andhra Pradesh: 1070 after reaching safety.",
  ],
  [HazardType.drought]: [
    "Reduce non-essential water use — limit bathing to 5 minutes.",
    "Store water in clean containers with lids to prevent contamination.",
    "Report broken pipes or leaks to municipality immediately.",
    "Prioritise water for drinking and cooking over agriculture.",
    "Contact District Collector office for government tanker supply schedule.",
  ],
  [HazardType.tsunami]: [
    "If you feel a strong coastal earthquake — GO INLAND immediately.",
    "Do NOT wait for an official warning — every second matters.",
    "Move at least 2 km inland or to ground 30 m above sea level.",
    "Do NOT return to the coast until authorities declare the all-clear.",
    "First wave is NOT the biggest — multiple waves arrive 10–30 min apart.",
  ],
  [HazardType.pandemic]: [
    "Wear a triple-layer mask (N95 or surgical) when outside your home.",
    "Wash hands with soap for 20 seconds; use 70% alcohol sanitiser.",
    "Isolate immediately if symptomatic — call 104 helpline for guidance.",
    "Avoid crowded areas, public transport; maintain 1.5 m physical distance.",
    "Register for vaccination at nearest PHC; carry Aadhar for verification.",
  ],
  [HazardType.carAccident]: [
    "Ensure your own safety first — turn on hazard lights, apply handbrake.",
    "Call 108 (ambulance) and 100 (police) immediately.",
    "Do NOT move an injured person unless fire risk is present — spinal injury risk.",
    "Control severe bleeding with firm direct pressure using clean cloth.",
    "Keep the injured person warm and conscious until paramedics arrive.",
  ],
  [HazardType.chemicalSpill]: [
    "Evacuate upwind immediately — chemicals travel in wind direction.",
    "Cover nose and mouth with a wet cloth if you cannot evacuate fast enough.",
    "Remove contaminated clothing; flush skin with large amounts of water.",
    "Do NOT eat, drink, or touch your face until you have washed thoroughly.",
    "Call 101 (fire dept) and 108 (ambulance); report the chemical name if known.",
  ],
  [HazardType.chemical]: [
    "Evacuate upwind immediately — chemicals travel in wind direction.",
    "Cover nose and mouth with a wet cloth if you cannot evacuate fast enough.",
    "Remove contaminated clothing; flush skin with large amounts of water.",
    "Do NOT eat, drink, or touch your face until you have washed thoroughly.",
    "Call 101 (fire dept) and 108 (ambulance); report the chemical name if known.",
  ],
};

const HAZARD_IMMEDIATE: Record<string, string[]> = {
  [HazardType.flood]: [
    "Move to higher ground",
    "Turn off electricity",
    "Avoid floodwater",
  ],
  [HazardType.fire]: ["Evacuate building", "Crawl low under smoke", "Call 101"],
  [HazardType.earthquake]: [
    "Drop, Cover, Hold On",
    "Protect head & neck",
    "Expect aftershocks",
  ],
  [HazardType.cyclone]: [
    "Secure loose objects",
    "Go to interior room",
    "Listen to AIR 100.1 FM",
  ],
  [HazardType.heatwave]: [
    "Find cool shelter",
    "Drink ORS water",
    "Cool neck & armpits",
  ],
  [HazardType.landslide]: [
    "Evacuate sideways",
    "Avoid slide path",
    "Call SDRF 1070",
  ],
  [HazardType.drought]: [
    "Conserve water",
    "Store clean water",
    "Contact municipality",
  ],
  [HazardType.tsunami]: [
    "Go inland now",
    "Reach 30 m elevation",
    "Do not return until all-clear",
  ],
  [HazardType.pandemic]: [
    "Wear N95 mask",
    "Wash hands 20 sec",
    "Call 104 helpline",
  ],
  [HazardType.carAccident]: [
    "Call 108 + 100",
    "Do not move injured",
    "Control bleeding",
  ],
  [HazardType.chemicalSpill]: [
    "Evacuate upwind",
    "Cover nose & mouth",
    "Flush skin with water",
  ],
  [HazardType.chemical]: [
    "Evacuate upwind",
    "Cover nose & mouth",
    "Flush skin with water",
  ],
};

// ─── Offline template alerts ──────────────────────────────────────────────────
const OFFLINE_TEMPLATES: HazardRecord[] = [
  {
    id: "tmpl-cyclone-1",
    hazardType: HazardType.cyclone,
    severity: HazardSeverity.severe,
    location: "Coastal AP — Srikakulam, Vizianagaram, Visakhapatnam",
    description:
      "Bay of Bengal cyclone season (Oct–Dec). Depression tracking NW at 18 km/h. Landfall risk within 48 hrs.",
    timestamp: BigInt(0),
    active: true,
  },
  {
    id: "tmpl-flood-1",
    hazardType: HazardType.flood,
    severity: HazardSeverity.severe,
    location:
      "Krishna & Godavari river basins — Krishna, Eluru, Rajamahendravaram",
    description:
      "Monsoon flooding risk (Jun–Sep). Krishna river at 85% warning level. Low-lying areas at risk.",
    timestamp: BigInt(0),
    active: true,
  },
  {
    id: "tmpl-heatwave-1",
    hazardType: HazardType.heatwave,
    severity: HazardSeverity.extreme,
    location: "Andhra Pradesh — Kurnool, Nandyal, Prakasam districts",
    description:
      "Summer heatwave (Apr–Jun). Temperatures forecast 45°C+. NDMA heat alert issued. Avoid outdoor activity 11 AM–4 PM.",
    timestamp: BigInt(0),
    active: true,
  },
  {
    id: "tmpl-drought-1",
    hazardType: HazardType.drought,
    severity: HazardSeverity.moderate,
    location: "Rayalaseema — Anantapur, Kurnool, YSR Kadapa districts",
    description:
      "Drought warning (Mar–May). Rainfall 42% below normal. Groundwater critically low. Borewells failing.",
    timestamp: BigInt(0),
    active: true,
  },
  {
    id: "tmpl-earthquake-1",
    hazardType: HazardType.earthquake,
    severity: HazardSeverity.low,
    location: "AP Seismic Zone II/III — Visakhapatnam, Kakinada coast",
    description:
      "Minor seismic activity recorded. Magnitude 3.2 tremor felt. Inspect structures for cracks; be prepared.",
    timestamp: BigInt(0),
    active: true,
  },
  {
    id: "tmpl-tsunami-1",
    hazardType: HazardType.tsunami,
    severity: HazardSeverity.moderate,
    location: "Bay of Bengal coastline — Vizag, Kakinada, Nellore coast",
    description:
      "Tsunami watch issued following Bay of Bengal seismic event. Coastal communities advised to prepare evacuation.",
    timestamp: BigInt(0),
    active: true,
  },
];

// ─── Map pins ─────────────────────────────────────────────────────────────────
const MAP_PINS = [
  { x: 30, y: 40, color: "oklch(0.45 0.2 25)" },
  { x: 65, y: 25, color: "oklch(0.55 0.18 40)" },
  { x: 75, y: 60, color: "oklch(0.65 0.15 80)" },
  { x: 45, y: 70, color: "oklch(0.7 0.12 145)" },
  { x: 20, y: 62, color: "oklch(0.55 0.18 40)" },
  { x: 55, y: 45, color: "oklch(0.45 0.2 25)" },
];

const _ALL_HAZARD_TYPES = Object.values(HazardType) as string[];

// ─── Sub-components ───────────────────────────────────────────────────────────
function SeverityBadge({ severity }: { severity: string }) {
  const color = SEVERITY_COLOR[severity] ?? "oklch(0.7 0.12 145)";
  const label = SEVERITY_LABEL[severity] ?? severity.toUpperCase();
  return (
    <Badge
      className="text-[10px] font-bold px-1.5 py-0 border-0 tracking-wide"
      style={{
        background: `color-mix(in oklch, ${color} 20%, transparent)`,
        color,
      }}
    >
      {label}
    </Badge>
  );
}

function AlertItem({ alert, index }: { alert: HazardRecord; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const icon = HAZARD_ICON[alert.hazardType as string] ?? "⚠️";
  const label =
    HAZARD_LABEL[alert.hazardType as string] ?? (alert.hazardType as string);
  const timeAction = TIME_TO_ACTION[alert.severity as string] ?? "Monitor";
  const immediate = HAZARD_IMMEDIATE[alert.hazardType as string] ?? [];
  const steps = HAZARD_STEPS[alert.hazardType as string] ?? [];
  const severityColor =
    SEVERITY_COLOR[alert.severity as string] ?? "oklch(0.7 0.12 145)";

  return (
    <div
      className="rounded-xl mb-2 border overflow-hidden transition-all duration-200"
      style={{
        background: "oklch(0.18 0.007 95)",
        borderColor: expanded
          ? `color-mix(in oklch, ${severityColor} 35%, transparent)`
          : "oklch(0.29 0.007 95)",
      }}
      data-ocid={`hazard.item.${index + 1}`}
    >
      {/* Header row */}
      <button
        type="button"
        className="w-full flex items-start gap-3 p-3 text-left hover:bg-accent transition-colors focus:ring-2 focus:ring-cyan-400 focus:outline-none"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={`hazard-detail-${alert.id}`}
        data-ocid={`hazard.toggle.${index + 1}`}
      >
        <span className="text-xl leading-none mt-0.5 flex-shrink-0">
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-body font-semibold text-foreground">
              {label}
            </span>
            <SeverityBadge severity={alert.severity as string} />
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-mono"
              style={{
                background: `color-mix(in oklch, ${severityColor} 12%, transparent)`,
                color: severityColor,
              }}
            >
              {timeAction}
            </span>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {alert.location}
          </p>
          {/* Immediate actions */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {immediate.map((action) => (
              <span
                key={action}
                className="text-[10px] px-1.5 py-0.5 rounded border text-muted-foreground"
                style={{ borderColor: "oklch(0.32 0.007 95)" }}
              >
                • {action}
              </span>
            ))}
          </div>
        </div>
        <span className="flex-shrink-0 text-muted-foreground mt-1">
          {expanded ? (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          )}
        </span>
      </button>

      {/* Expanded section */}
      {expanded && (
        <div
          id={`hazard-detail-${alert.id}`}
          className="px-3 pb-3 border-t"
          style={{ borderColor: "oklch(0.29 0.007 95)" }}
          aria-label={`${label} emergency steps`}
        >
          <p className="text-xs text-muted-foreground mt-2.5 mb-3 leading-relaxed">
            {alert.description}
          </p>
          <h4
            className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{ color: severityColor }}
          >
            What to do — 5 steps
          </h4>
          <ol className="space-y-1.5 mb-3">
            {steps.map((step, si) => (
              <li
                key={step.slice(0, 20)}
                className="flex gap-2 text-xs text-foreground leading-relaxed"
              >
                <span
                  className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5"
                  style={{
                    background: `color-mix(in oklch, ${severityColor} 20%, transparent)`,
                    color: severityColor,
                  }}
                >
                  {si + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {/* Quick-nav links */}
          <div
            className="flex gap-3 pt-2 border-t"
            style={{ borderColor: "oklch(0.29 0.007 95)" }}
          >
            <button
              type="button"
              className="text-xs font-medium hover:underline transition-colors cursor-pointer"
              style={{ color: severityColor }}
              onClick={() => {
                document
                  .getElementById("firstaid")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid={`hazard.firstaid_link.${index + 1}`}
            >
              First Aid →
            </button>
            <button
              type="button"
              className="text-xs font-medium hover:underline transition-colors cursor-pointer"
              style={{ color: severityColor }}
              onClick={() => {
                document
                  .getElementById("survival")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid={`hazard.survival_link.${index + 1}`}
            >
              Survival Guide →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function HazardCard() {
  const { data: liveHazards = [], isLoading } = useHazardAlerts();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const alerts: HazardRecord[] =
    liveHazards.length > 0 ? liveHazards : OFFLINE_TEMPLATES;
  const isOffline = liveHazards.length === 0 && !isLoading;

  const filtered = activeFilter
    ? alerts.filter((a) => (a.hazardType as string) === activeFilter)
    : alerts;

  // Only show filter buttons for types present in current alerts
  const presentTypes = Array.from(
    new Set(alerts.map((a) => a.hazardType as string)),
  );

  return (
    <div
      className="rounded-2xl border border-border flex flex-col overflow-hidden card-glow"
      style={{ background: "oklch(0.22 0.007 95)" }}
      id="hazards"
      aria-labelledby="hazards-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.45 0.2 25 / 0.15)",
              color: "oklch(0.75 0.15 25)",
            }}
            aria-hidden="true"
          >
            Hazards
          </span>
          <h2
            id="hazards-heading"
            className="font-display font-bold uppercase tracking-wide text-sm text-foreground"
          >
            Detection &amp; Alerts
          </h2>
          {isOffline && (
            <span
              className="text-[9px] px-1.5 py-0.5 rounded-full font-mono"
              style={{
                background: "oklch(0.3 0.007 95)",
                color: "oklch(0.6 0.012 80)",
              }}
            >
              OFFLINE TEMPLATES
            </span>
          )}
        </div>
        {isLoading && (
          <Loader2
            className="w-4 h-4 animate-spin text-muted-foreground"
            data-ocid="hazard.loading_state"
            role="status"
            aria-label="Loading hazard alerts..."
          />
        )}
      </div>

      {/* SVG Map */}
      <div className="p-3 border-b border-border">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "oklch(0.165 0.007 95)",
            border: "1px solid oklch(0.29 0.007 95)",
          }}
        >
          <svg
            viewBox="0 0 100 70"
            className="w-full h-20"
            role="img"
            aria-label="Andhra Pradesh hazard map with alert markers"
          >
            <title>AP Hazard alert map</title>
            {[20, 40, 60, 80].map((x) => (
              <line
                key={`v${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="70"
                stroke="oklch(0.29 0.007 95)"
                strokeWidth="0.5"
              />
            ))}
            {[17, 35, 52].map((y) => (
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
            {/* AP outline approximation */}
            <ellipse
              cx="35"
              cy="35"
              rx="28"
              ry="20"
              fill="none"
              stroke="oklch(0.25 0.007 95)"
              strokeWidth="0.8"
            />
            <ellipse
              cx="72"
              cy="50"
              rx="22"
              ry="14"
              fill="none"
              stroke="oklch(0.25 0.007 95)"
              strokeWidth="0.8"
            />
            <line
              x1="20"
              y1="10"
              x2="80"
              y2="65"
              stroke="oklch(0.22 0.007 95)"
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
            {/* Bay of Bengal marker */}
            <text
              x="78"
              y="18"
              fontSize="3.5"
              fill="oklch(0.5 0.12 220)"
              fontFamily="monospace"
            >
              BoB
            </text>
            {MAP_PINS.map((pin) => (
              <g key={`${pin.x}-${pin.y}`}>
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="5"
                  fill="none"
                  stroke={pin.color}
                  strokeWidth="1"
                  opacity="0.4"
                />
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="2.5"
                  fill={pin.color}
                  opacity="0.8"
                />
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="1.2"
                  fill="oklch(0.95 0.01 80)"
                />
              </g>
            ))}
          </svg>
          <div className="absolute top-2 right-2 text-[9px] font-mono text-muted-foreground bg-card px-1.5 py-0.5 rounded border border-border">
            Andhra Pradesh
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-3 py-2 border-b border-border">
        <ScrollArea className="w-full">
          <nav
            aria-label="Filter hazards by type"
            className="flex gap-1.5 pb-1"
          >
            <button
              type="button"
              className="flex-shrink-0 text-[10px] px-2.5 py-1 min-h-[36px] rounded-full border transition-colors font-medium focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              style={{
                borderColor:
                  activeFilter === null
                    ? "oklch(0.82 0.15 85)"
                    : "oklch(0.32 0.007 95)",
                color:
                  activeFilter === null
                    ? "oklch(0.82 0.15 85)"
                    : "oklch(0.6 0.012 80)",
                background:
                  activeFilter === null
                    ? "oklch(0.82 0.15 85 / 0.1)"
                    : "transparent",
              }}
              aria-pressed={activeFilter === null}
              onClick={() => setActiveFilter(null)}
              data-ocid="hazard.filter.all"
            >
              All ({alerts.length})
            </button>
            {presentTypes.map((type) => (
              <button
                key={type}
                type="button"
                className="flex-shrink-0 flex items-center gap-1 text-[10px] px-2.5 py-1 min-h-[36px] rounded-full border transition-colors font-medium focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                style={{
                  borderColor:
                    activeFilter === type
                      ? "oklch(0.65 0.15 80)"
                      : "oklch(0.32 0.007 95)",
                  color:
                    activeFilter === type
                      ? "oklch(0.65 0.15 80)"
                      : "oklch(0.6 0.012 80)",
                  background:
                    activeFilter === type
                      ? "oklch(0.65 0.15 80 / 0.1)"
                      : "transparent",
                }}
                aria-pressed={activeFilter === type}
                onClick={() =>
                  setActiveFilter(activeFilter === type ? null : type)
                }
                data-ocid={`hazard.filter.${type}`}
              >
                <span aria-hidden="true">{HAZARD_ICON[type] ?? "⚠️"}</span>
                <span>{HAZARD_LABEL[type] ?? type}</span>
              </button>
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Alert list */}
      <ScrollArea className="flex-1" style={{ maxHeight: "28rem" }}>
        <ul className="p-3 list-none" aria-label="Active hazard alerts">
          {filtered.length === 0 && !isLoading && (
            <div
              className="flex flex-col items-center justify-center py-10 text-muted-foreground"
              data-ocid="hazard.empty_state"
            >
              <AlertTriangle
                className="w-8 h-8 mb-2 opacity-40"
                aria-hidden="true"
              />
              <p className="text-sm">No alerts for this hazard type</p>
              <button
                type="button"
                className="text-xs mt-2 underline"
                onClick={() => setActiveFilter(null)}
                data-ocid="hazard.clear_filter_button"
              >
                Show all alerts
              </button>
            </div>
          )}
          {filtered.map((alert, i) => (
            <AlertItem key={alert.id} alert={alert} index={i} />
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
