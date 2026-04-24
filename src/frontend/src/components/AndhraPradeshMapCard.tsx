import { MapPin } from "lucide-react";

const cities = [
  { name: "Visakhapatnam", x: 330, y: 80, capital: false },
  { name: "Kakinada", x: 325, y: 162, capital: false },
  { name: "Rajahmundry", x: 308, y: 140, capital: false },
  { name: "Vijayawada", x: 288, y: 220, capital: true },
  { name: "Guntur", x: 268, y: 242, capital: false },
  { name: "Eluru", x: 298, y: 202, capital: false },
  { name: "Nellore", x: 278, y: 358, capital: false },
  { name: "Kurnool", x: 198, y: 290, capital: false },
  { name: "Kadapa", x: 238, y: 322, capital: false },
  { name: "Anantapur", x: 158, y: 312, capital: false },
  { name: "Tirupati", x: 238, y: 412, capital: false },
];

// AP state outline polygon (approximate)
const stateOutline =
  "M 140 120 L 175 90 L 210 70 L 255 55 L 295 58 L 330 75 L 345 110 L 340 145 L 330 165 L 315 190 L 305 220 L 310 255 L 300 285 L 290 320 L 285 360 L 275 395 L 265 430 L 245 460 L 220 450 L 195 430 L 175 400 L 158 370 L 148 340 L 138 310 L 130 280 L 128 250 L 132 215 L 138 185 L 135 155 L 140 120 Z";

// Coastal strip (eastern side - Bay of Bengal)
const coastalStrip =
  "M 295 58 L 330 75 L 345 110 L 340 145 L 330 165 L 315 190 L 305 220 L 310 255 L 300 285 L 290 320 L 285 360 L 275 395 L 265 430 L 245 460 L 250 460 L 270 435 L 290 400 L 300 365 L 310 325 L 320 290 L 325 255 L 322 220 L 330 195 L 342 168 L 355 142 L 355 108 L 340 78 L 310 62 L 295 58 Z";

// Krishna river (flows center area)
const krishnaRiver =
  "M 130 280 L 150 272 L 180 265 L 215 258 L 250 252 L 278 248 L 295 245 L 308 240 L 315 238";

// Godavari river (flows through north area)
const godavariRiver =
  "M 135 155 L 160 150 L 195 145 L 230 142 L 265 145 L 290 148 L 308 145 L 322 148 L 335 155";

export function AndhraPradeshMapCard() {
  return (
    <div
      className="rounded-xl border border-border card-glow"
      style={{ background: "oklch(0.22 0.007 95)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <MapPin
            className="w-4 h-4"
            style={{ color: "oklch(0.82 0.15 85)" }}
          />
          <span className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            Andhra Pradesh — Offline Map
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.60 0.14 195 / 0.15)",
              color: "oklch(0.60 0.14 195)",
              border: "1px solid oklch(0.60 0.14 195 / 0.3)",
            }}
          >
            AP | India
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
          <svg
            viewBox="0 0 480 520"
            className="w-full"
            role="img"
            aria-label="Andhra Pradesh state map"
            style={{ maxHeight: "520px" }}
          >
            <title>Andhra Pradesh Offline Map</title>

            {/* Grid lines */}
            {[100, 150, 200, 250, 300, 350, 400, 450].map((x) => (
              <line
                key={`vg${x}`}
                x1={x}
                y1="40"
                x2={x}
                y2="480"
                stroke="oklch(0.26 0.007 95)"
                strokeWidth="0.5"
                strokeDasharray="4,6"
              />
            ))}
            {[60, 120, 180, 240, 300, 360, 420, 470].map((y) => (
              <line
                key={`hg${y}`}
                x1="80"
                y1={y}
                x2="430"
                y2={y}
                stroke="oklch(0.26 0.007 95)"
                strokeWidth="0.5"
                strokeDasharray="4,6"
              />
            ))}

            {/* Bay of Bengal label area */}
            <text
              x="370"
              y="280"
              fill="oklch(0.50 0.10 220)"
              fontSize="9"
              fontStyle="italic"
              opacity="0.7"
              transform="rotate(90 370 280)"
            >
              Bay of Bengal
            </text>

            {/* Coastal cyclone-prone strip */}
            <path
              d={coastalStrip}
              fill="oklch(0.40 0.12 220)"
              fillOpacity="0.18"
              stroke="none"
            />

            {/* State outline */}
            <path
              d={stateOutline}
              fill="oklch(0.28 0.015 120)"
              fillOpacity="0.5"
              stroke="oklch(0.65 0.18 145)"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Godavari River */}
            <path
              d={godavariRiver}
              fill="none"
              stroke="oklch(0.55 0.15 220)"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.8"
            />
            <text
              x="170"
              y="136"
              fill="oklch(0.60 0.14 220)"
              fontSize="7.5"
              fontStyle="italic"
            >
              Godavari
            </text>

            {/* Krishna River */}
            <path
              d={krishnaRiver}
              fill="none"
              stroke="oklch(0.50 0.12 220)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
            <text
              x="168"
              y="256"
              fill="oklch(0.60 0.14 220)"
              fontSize="7.5"
              fontStyle="italic"
            >
              Krishna
            </text>

            {/* City markers */}
            {cities.map((city) => {
              const labelRight = city.x < 260;
              const labelX = labelRight ? city.x + 8 : city.x - 8;
              const anchor = labelRight ? "start" : "end";
              return (
                <g key={city.name}>
                  {city.capital ? (
                    <>
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r="7"
                        fill="oklch(0.82 0.15 85 / 0.15)"
                        stroke="oklch(0.82 0.15 85)"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r="3.5"
                        fill="oklch(0.82 0.15 85)"
                      />
                      <polygon
                        points={`${city.x},${city.y - 12} ${city.x - 3},${city.y - 8} ${city.x + 3},${city.y - 8}`}
                        fill="oklch(0.82 0.15 85)"
                        opacity="0.8"
                      />
                    </>
                  ) : (
                    <>
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r="4.5"
                        fill="oklch(0.65 0.18 145 / 0.15)"
                        stroke="oklch(0.65 0.18 145)"
                        strokeWidth="1.2"
                      />
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r="2"
                        fill="oklch(0.65 0.18 145)"
                      />
                    </>
                  )}
                  <text
                    x={labelX}
                    y={city.y + 4}
                    fill={
                      city.capital
                        ? "oklch(0.82 0.15 85)"
                        : "oklch(0.88 0.01 95)"
                    }
                    fontSize={city.capital ? "9.5" : "8"}
                    fontWeight={city.capital ? "700" : "400"}
                    textAnchor={anchor}
                    stroke="oklch(0.13 0.007 95)"
                    strokeWidth="3"
                    paintOrder="stroke"
                  >
                    {city.name}
                    {city.capital ? " ★" : ""}
                  </text>
                </g>
              );
            })}

            {/* Compass Rose */}
            <g transform="translate(60, 455)">
              <circle
                cx="0"
                cy="0"
                r="18"
                fill="oklch(0.20 0.007 95)"
                stroke="oklch(0.35 0.007 95)"
                strokeWidth="1"
              />
              {/* N/S arms */}
              <polygon points="0,-14 -4,-4 4,-4" fill="oklch(0.65 0.2 25)" />
              <polygon points="0,14 -4,4 4,4" fill="oklch(0.45 0.007 95)" />
              {/* E/W arms */}
              <polygon points="14,0 4,-3 4,3" fill="oklch(0.45 0.007 95)" />
              <polygon points="-14,0 -4,-3 -4,3" fill="oklch(0.45 0.007 95)" />
              <circle cx="0" cy="0" r="2.5" fill="oklch(0.82 0.15 85)" />
              <text
                x="0"
                y="-17"
                textAnchor="middle"
                fill="oklch(0.82 0.15 85)"
                fontSize="8"
                fontWeight="700"
              >
                N
              </text>
              <text
                x="0"
                y="24"
                textAnchor="middle"
                fill="oklch(0.74 0.015 80)"
                fontSize="7"
              >
                S
              </text>
              <text
                x="19"
                y="3"
                textAnchor="start"
                fill="oklch(0.74 0.015 80)"
                fontSize="7"
              >
                E
              </text>
              <text
                x="-19"
                y="3"
                textAnchor="end"
                fill="oklch(0.74 0.015 80)"
                fontSize="7"
              >
                W
              </text>
            </g>

            {/* Legend */}
            <g transform="translate(120, 445)">
              <rect
                x="0"
                y="0"
                width="220"
                height="62"
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
              {/* Capital */}
              <circle
                cx="16"
                cy="24"
                r="4"
                fill="oklch(0.82 0.15 85 / 0.2)"
                stroke="oklch(0.82 0.15 85)"
                strokeWidth="1.2"
              />
              <circle cx="16" cy="24" r="2" fill="oklch(0.82 0.15 85)" />
              <text x="26" y="27" fill="oklch(0.88 0.01 95)" fontSize="7.5">
                State Capital (Vijayawada)
              </text>
              {/* City */}
              <circle
                cx="16"
                cy="37"
                r="3"
                fill="oklch(0.65 0.18 145 / 0.2)"
                stroke="oklch(0.65 0.18 145)"
                strokeWidth="1"
              />
              <circle cx="16" cy="37" r="1.5" fill="oklch(0.65 0.18 145)" />
              <text x="26" y="40" fill="oklch(0.88 0.01 95)" fontSize="7.5">
                Major City
              </text>
              {/* Rivers */}
              <line
                x1="8"
                y1="50"
                x2="24"
                y2="50"
                stroke="oklch(0.55 0.15 220)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text x="30" y="53" fill="oklch(0.88 0.01 95)" fontSize="7.5">
                Rivers (Krishna, Godavari)
              </text>
              {/* Coastal */}
              <rect
                x="110"
                y="20"
                width="12"
                height="8"
                fill="oklch(0.40 0.12 220)"
                fillOpacity="0.4"
                stroke="none"
              />
              <text x="128" y="28" fill="oklch(0.88 0.01 95)" fontSize="7.5">
                Cyclone-prone coast
              </text>
            </g>
          </svg>
        </div>

        {/* Info bar */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              background: "oklch(0.15 0.007 95)",
              color: "oklch(0.74 0.015 80)",
            }}
          >
            📍 11 cities mapped
          </span>
          <span
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              background: "oklch(0.15 0.007 95)",
              color: "oklch(0.60 0.14 220)",
            }}
          >
            🌊 2 rivers: Krishna & Godavari
          </span>
          <span
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              background: "oklch(0.40 0.12 220 / 0.15)",
              color: "oklch(0.60 0.14 220)",
            }}
          >
            ⚠ Eastern coast: cyclone-prone zone
          </span>
          <span
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              background: "oklch(0.15 0.007 95)",
              color: "oklch(0.55 0.01 95)",
            }}
          >
            🗺 Fully offline — no internet needed
          </span>
        </div>
      </div>
    </div>
  );
}
