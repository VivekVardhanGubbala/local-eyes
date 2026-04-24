import { MapPin, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

const VIEWBOXES = ["0 0 600 500", "75 62 450 376", "150 125 300 250"];

const hospitals = [
  { name: "Govt. General Hospital", x: 288, y: 210 },
  { name: "Andhra Hospital", x: 310, y: 188 },
  { name: "Ramesh Hospital", x: 330, y: 222 },
];

const areas = [
  { name: "Benz Circle", x: 300, y: 235, industrial: false },
  { name: "Governorpet", x: 278, y: 252, industrial: false },
  { name: "Moghalrajpuram", x: 255, y: 218, industrial: false },
  { name: "Patamata", x: 268, y: 285, industrial: false },
  { name: "Labbipet", x: 318, y: 255, industrial: false },
  { name: "Suryaraopet", x: 290, y: 273, industrial: false },
  { name: "Seethammadhara", x: 338, y: 195, industrial: false },
  { name: "Auto Nagar", x: 370, y: 208, industrial: true },
  { name: "Gunadala", x: 260, y: 235, industrial: false },
  { name: "Vidyadharapuram", x: 242, y: 260, industrial: false },
];

const roads = [
  { d: "M 80 250 L 540 250", label: "NH 16", lx: 88, ly: 244, isNH: true },
  { d: "M 300 80 L 300 440", label: "NH 65", lx: 304, ly: 90, isNH: true },
  {
    d: "M 120 220 L 480 200",
    label: "Eluru Rd",
    lx: 125,
    ly: 214,
    isNH: false,
  },
  {
    d: "M 200 170 L 380 330",
    label: "Bandar Rd",
    lx: 204,
    ly: 166,
    isNH: false,
  },
  { d: "M 150 265 L 440 265", label: "MG Road", lx: 155, ly: 259, isNH: false },
];

const evacArrows = [
  { x1: 290, y1: 375, x2: 255, y2: 310 },
  { x1: 310, y1: 380, x2: 345, y2: 312 },
  { x1: 270, y1: 360, x2: 220, y2: 290 },
  { x1: 330, y1: 355, x2: 385, y2: 285 },
];

function HospitalIcon({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="8"
        fill="oklch(0.48 0.16 25 / 0.25)"
        stroke="oklch(0.65 0.2 25)"
        strokeWidth="1.3"
      />
      <line
        x1={x - 4}
        y1={y}
        x2={x + 4}
        y2={y}
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1={x}
        y1={y - 4}
        x2={x}
        y2={y + 4}
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </g>
  );
}

function EvacArrow({
  x1,
  y1,
  x2,
  y2,
}: { x1: number; y1: number; x2: number; y2: number }) {
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="oklch(0.65 0.18 145)"
        strokeWidth="2"
        strokeDasharray="6,3"
        strokeLinecap="round"
      />
      <polygon
        points="0,-3 6,0 0,3"
        fill="oklch(0.65 0.18 145)"
        transform={`translate(${x2},${y2}) rotate(${angle})`}
      />
    </g>
  );
}

export function VijayawadaMapCard() {
  const [zoom, setZoom] = useState(0);

  return (
    <div
      className="rounded-xl border border-border card-glow"
      style={{ background: "oklch(0.22 0.007 95)" }}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <MapPin
            className="w-4 h-4"
            style={{ color: "oklch(0.82 0.15 85)" }}
          />
          <span className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            Vijayawada — City Map
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.48 0.16 25 / 0.15)",
              color: "oklch(0.65 0.2 25)",
              border: "1px solid oklch(0.48 0.16 25 / 0.3)",
            }}
          >
            Flood Zones
          </span>
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
      </div>

      <div className="px-4 pb-4">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "oklch(0.165 0.007 95)",
            border: "1px solid oklch(0.29 0.007 95)",
          }}
        >
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            <button
              type="button"
              onClick={() =>
                setZoom((z) => Math.min(z + 1, VIEWBOXES.length - 1))
              }
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{
                background: "oklch(0.25 0.007 95)",
                border: "1px solid oklch(0.35 0.007 95)",
                color: "oklch(0.82 0.01 95)",
              }}
              title="Zoom in"
              data-ocid="map.primary_button"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(z - 1, 0))}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{
                background: "oklch(0.25 0.007 95)",
                border: "1px solid oklch(0.35 0.007 95)",
                color: "oklch(0.82 0.01 95)",
              }}
              title="Zoom out"
              data-ocid="map.secondary_button"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          <svg
            viewBox={VIEWBOXES[zoom]}
            className="w-full"
            role="img"
            aria-label="Vijayawada city map"
            style={{ maxHeight: "520px" }}
          >
            <title>Vijayawada City Offline Map</title>

            {[80, 140, 200, 260, 320, 380, 440, 500].map((x) => (
              <line
                key={`vg${x}`}
                x1={x}
                y1="40"
                x2={x}
                y2="480"
                stroke="oklch(0.23 0.007 95)"
                strokeWidth="0.5"
                strokeDasharray="3,6"
              />
            ))}
            {[60, 120, 180, 240, 300, 360, 420, 475].map((y) => (
              <line
                key={`hg${y}`}
                x1="60"
                y1={y}
                x2="570"
                y2={y}
                stroke="oklch(0.23 0.007 95)"
                strokeWidth="0.5"
                strokeDasharray="3,6"
              />
            ))}

            {/* Krishna River */}
            <path
              d="M 40 390 Q 120 380 200 385 Q 280 390 350 378 Q 420 366 500 370 Q 545 372 570 368 L 570 440 Q 545 436 500 440 Q 420 444 350 450 Q 280 456 200 450 Q 120 444 40 450 Z"
              fill="oklch(0.40 0.12 220)"
              fillOpacity="0.55"
              stroke="oklch(0.50 0.14 220)"
              strokeWidth="1.5"
            />
            <text
              x="170"
              y="418"
              fill="oklch(0.65 0.14 220)"
              fontSize="11"
              fontStyle="italic"
              fontWeight="600"
            >
              Krishna River
            </text>

            {/* Prakasam Barrage */}
            <rect
              x="205"
              y="375"
              width="90"
              height="8"
              rx="2"
              fill="oklch(0.55 0.007 95)"
              stroke="oklch(0.72 0.007 95)"
              strokeWidth="1"
            />
            <text
              x="210"
              y="370"
              fill="oklch(0.74 0.01 95)"
              fontSize="7.5"
              fontWeight="600"
            >
              Prakasam Barrage
            </text>

            {/* Indrakeeladri Hill */}
            <g transform="translate(250, 358)">
              <polygon
                points="0,-18 -12,0 12,0"
                fill="oklch(0.45 0.08 75)"
                stroke="oklch(0.60 0.10 75)"
                strokeWidth="1"
              />
              <polygon points="0,-11 -6,0 6,0" fill="oklch(0.55 0.10 75)" />
              <text
                x="14"
                y="4"
                fill="oklch(0.74 0.01 95)"
                fontSize="7"
                fontWeight="600"
              >
                Indrakeeladri
              </text>
              <text x="14" y="12" fill="oklch(0.74 0.01 95)" fontSize="6">
                Kanaka Durga Temple
              </text>
            </g>

            {/* Flood prone zones */}
            <path
              d="M 140 350 Q 200 340 270 345 Q 340 350 420 342 L 420 380 Q 340 372 270 377 Q 200 382 140 376 Z"
              fill="oklch(0.55 0.18 45)"
              fillOpacity="0.22"
              stroke="oklch(0.60 0.18 45)"
              strokeWidth="0.8"
              strokeDasharray="4,3"
            />
            <text
              x="145"
              y="364"
              fill="oklch(0.72 0.18 45)"
              fontSize="7.5"
              fontStyle="italic"
            >
              Flood-Prone Zone
            </text>

            {/* Undavalli Caves */}
            <g transform="translate(480, 428)">
              <ellipse
                cx="0"
                cy="0"
                rx="10"
                ry="5"
                fill="oklch(0.35 0.007 95)"
                stroke="oklch(0.55 0.007 95)"
                strokeWidth="1"
              />
              <text x="-8" y="-7" fill="oklch(0.70 0.01 95)" fontSize="7">
                Undavalli Caves
              </text>
            </g>

            {/* Roads */}
            {roads.map((road) => (
              <g key={road.label}>
                <path
                  d={road.d}
                  fill="none"
                  stroke={
                    road.isNH ? "oklch(0.82 0.15 85)" : "oklch(0.60 0.01 95)"
                  }
                  strokeWidth={road.isNH ? 2.5 : 1.5}
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <text
                  x={road.lx}
                  y={road.ly}
                  fill={
                    road.isNH ? "oklch(0.82 0.15 85)" : "oklch(0.68 0.01 95)"
                  }
                  fontSize="7.5"
                  fontWeight={road.isNH ? "700" : "400"}
                  stroke="oklch(0.13 0.007 95)"
                  strokeWidth="2.5"
                  paintOrder="stroke"
                >
                  {road.label}
                </text>
              </g>
            ))}

            {/* Evacuation arrows */}
            {evacArrows.map((arr, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static SVG arrow list
              <EvacArrow key={i} {...arr} />
            ))}

            {/* Area markers */}
            {areas.map((area) => (
              <g key={area.name}>
                <circle
                  cx={area.x}
                  cy={area.y}
                  r="5"
                  fill={
                    area.industrial
                      ? "oklch(0.60 0.14 195 / 0.2)"
                      : "oklch(0.82 0.15 85 / 0.12)"
                  }
                  stroke={
                    area.industrial
                      ? "oklch(0.60 0.14 195)"
                      : "oklch(0.82 0.15 85 / 0.6)"
                  }
                  strokeWidth="1"
                />
                <circle
                  cx={area.x}
                  cy={area.y}
                  r="2"
                  fill={
                    area.industrial
                      ? "oklch(0.60 0.14 195)"
                      : "oklch(0.82 0.15 85 / 0.8)"
                  }
                />
                <text
                  x={area.x + 7}
                  y={area.y + 3}
                  fill="oklch(0.86 0.01 95)"
                  fontSize="7.5"
                  stroke="oklch(0.13 0.007 95)"
                  strokeWidth="2.5"
                  paintOrder="stroke"
                >
                  {area.name}
                </text>
              </g>
            ))}

            {/* Hospital markers */}
            {hospitals.map((h) => (
              <g key={h.name}>
                <HospitalIcon x={h.x} y={h.y} />
                <text
                  x={h.x + 11}
                  y={h.y + 4}
                  fill="oklch(0.72 0.16 25)"
                  fontSize="7"
                  stroke="oklch(0.13 0.007 95)"
                  strokeWidth="2.5"
                  paintOrder="stroke"
                >
                  {h.name}
                </text>
              </g>
            ))}

            {/* Compass Rose */}
            <g transform="translate(548, 100)">
              <circle
                cx="0"
                cy="0"
                r="20"
                fill="oklch(0.20 0.007 95)"
                stroke="oklch(0.35 0.007 95)"
                strokeWidth="1"
              />
              <polygon points="0,-15 -4,-5 4,-5" fill="oklch(0.65 0.2 25)" />
              <polygon points="0,15 -4,5 4,5" fill="oklch(0.40 0.007 95)" />
              <polygon points="15,0 5,-3 5,3" fill="oklch(0.40 0.007 95)" />
              <polygon points="-15,0 -5,-3 -5,3" fill="oklch(0.40 0.007 95)" />
              <circle cx="0" cy="0" r="3" fill="oklch(0.82 0.15 85)" />
              <text
                x="0"
                y="-18"
                textAnchor="middle"
                fill="oklch(0.82 0.15 85)"
                fontSize="9"
                fontWeight="700"
              >
                N
              </text>
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fill="oklch(0.70 0.01 95)"
                fontSize="7.5"
              >
                S
              </text>
              <text
                x="22"
                y="4"
                textAnchor="start"
                fill="oklch(0.70 0.01 95)"
                fontSize="7.5"
              >
                E
              </text>
              <text
                x="-22"
                y="4"
                textAnchor="end"
                fill="oklch(0.70 0.01 95)"
                fontSize="7.5"
              >
                W
              </text>
            </g>

            {/* Legend */}
            <g transform="translate(52, 440)">
              <rect
                x="0"
                y="0"
                width="270"
                height="50"
                rx="6"
                fill="oklch(0.18 0.007 95)"
                stroke="oklch(0.30 0.007 95)"
                strokeWidth="0.8"
              />
              <text
                x="8"
                y="12"
                fill="oklch(0.74 0.015 80)"
                fontSize="7"
                fontWeight="700"
              >
                LEGEND
              </text>
              <rect
                x="8"
                y="17"
                width="14"
                height="6"
                rx="2"
                fill="oklch(0.40 0.12 220)"
                fillOpacity="0.7"
              />
              <text x="26" y="23" fill="oklch(0.88 0.01 95)" fontSize="7">
                River (Krishna)
              </text>
              <rect
                x="8"
                y="27"
                width="14"
                height="6"
                rx="2"
                fill="oklch(0.55 0.18 45)"
                fillOpacity="0.4"
                stroke="oklch(0.60 0.18 45)"
                strokeWidth="0.6"
                strokeDasharray="2,2"
              />
              <text x="26" y="33" fill="oklch(0.88 0.01 95)" fontSize="7">
                Flood-Prone Zone
              </text>
              <circle
                cx="15"
                cy="43"
                r="5"
                fill="oklch(0.48 0.16 25 / 0.25)"
                stroke="oklch(0.65 0.2 25)"
                strokeWidth="1"
              />
              <line
                x1="11"
                y1="43"
                x2="19"
                y2="43"
                stroke="white"
                strokeWidth="1.5"
              />
              <line
                x1="15"
                y1="39"
                x2="15"
                y2="47"
                stroke="white"
                strokeWidth="1.5"
              />
              <text x="26" y="46" fill="oklch(0.88 0.01 95)" fontSize="7">
                Hospital
              </text>
              <line
                x1="108"
                y1="21"
                x2="126"
                y2="21"
                stroke="oklch(0.65 0.18 145)"
                strokeWidth="2"
                strokeDasharray="4,2"
              />
              <polygon
                points="0,-2 4,0 0,2"
                fill="oklch(0.65 0.18 145)"
                transform="translate(126,21)"
              />
              <text x="132" y="24" fill="oklch(0.88 0.01 95)" fontSize="7">
                Evacuation Route
              </text>
              <circle
                cx="113"
                cy="34"
                r="4"
                fill="oklch(0.82 0.15 85 / 0.15)"
                stroke="oklch(0.82 0.15 85 / 0.6)"
                strokeWidth="1"
              />
              <circle cx="113" cy="34" r="2" fill="oklch(0.82 0.15 85 / 0.7)" />
              <text x="122" y="37" fill="oklch(0.88 0.01 95)" fontSize="7">
                Area / Locality
              </text>
              <circle
                cx="113"
                cy="46"
                r="4"
                fill="oklch(0.60 0.14 195 / 0.2)"
                stroke="oklch(0.60 0.14 195)"
                strokeWidth="1"
              />
              <circle cx="113" cy="46" r="2" fill="oklch(0.60 0.14 195)" />
              <text x="122" y="49" fill="oklch(0.88 0.01 95)" fontSize="7">
                Industrial Area
              </text>
            </g>
          </svg>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              background: "oklch(0.15 0.007 95)",
              color: "oklch(0.74 0.015 80)",
            }}
          >
            📍 10 localities mapped
          </span>
          <span
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              background: "oklch(0.15 0.007 95)",
              color: "oklch(0.60 0.14 220)",
            }}
          >
            🌊 Krishna River + Prakasam Barrage
          </span>
          <span
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              background: "oklch(0.48 0.16 25 / 0.15)",
              color: "oklch(0.65 0.2 25)",
            }}
          >
            🏥 3 hospitals marked
          </span>
          <span
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              background: "oklch(0.65 0.18 145 / 0.12)",
              color: "oklch(0.65 0.18 145)",
            }}
          >
            🟢 4 evacuation routes
          </span>
          <span
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              background: "oklch(0.15 0.007 95)",
              color: "oklch(0.55 0.01 95)",
            }}
          >
            🗺 Andhra Pradesh, India — Fully Offline
          </span>
        </div>
      </div>
    </div>
  );
}
