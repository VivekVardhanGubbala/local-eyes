import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Backpack,
  CheckCircle2,
  FileText,
  Radio,
  Stethoscope,
  Wrench,
  Zap,
} from "lucide-react";

type KitItem = { item: string; note?: string };
type KitSection = {
  label: string;
  icon: React.ReactNode;
  color: string;
  items: KitItem[];
};

const sections: KitSection[] = [
  {
    label: "Basics",
    icon: <Backpack className="w-3 h-3" />,
    color: "oklch(0.82 0.15 85)",
    items: [
      { item: "Water", note: "3 litres per person per day minimum" },
      {
        item: "Non-perishable food",
        note: "Energy bars, dry fruits, canned goods",
      },
      {
        item: "Torch/flashlight + extra batteries",
        note: "Or solar/hand-crank torch",
      },
      { item: "Waterproof matches or lighter" },
      { item: "Emergency blanket", note: "Mylar/space blanket, lightweight" },
      { item: "Rain poncho" },
      {
        item: "Sturdy garbage bags",
        note: "Waterproofing and waste management",
      },
      {
        item: "Rope (10m paracord)",
        note: "Rescue, securing, shelter building",
      },
      { item: "Multi-tool or Swiss army knife" },
      { item: "Whistle", note: "Louder than shouting, no battery needed" },
    ],
  },
  {
    label: "Medical",
    icon: <Stethoscope className="w-3 h-3" />,
    color: "oklch(0.65 0.2 10)",
    items: [
      { item: "Paracetamol + Ibuprofen" },
      {
        item: "ORS sachets",
        note: "Oral rehydration salts — critical for diarrhea/dehydration",
      },
      {
        item: "Antiseptic solution",
        note: "Betadine or Dettol + antiseptic wipes",
      },
      { item: "Bandages (assorted) + gauze pads + medical tape" },
      { item: "Sterile gloves", note: "Minimum 4 pairs" },
      { item: "Tweezers, scissors, safety pins" },
      { item: "Water purification tablets", note: "Iodine or chlorine" },
      { item: "Personal prescription medicines", note: "7-day supply minimum" },
      {
        item: "Eye drops + antihistamine",
        note: "Allergies common in disaster debris",
      },
      { item: "Thermometer" },
    ],
  },
  {
    label: "Tools",
    icon: <Wrench className="w-3 h-3" />,
    color: "oklch(0.74 0.12 60)",
    items: [
      {
        item: "Portable solar panel or power bank",
        note: "20,000mAh+ recommended",
      },
      { item: "Hand-crank or solar AM/FM radio", note: "Emergency broadcasts" },
      { item: "Compass", note: "Works without battery, always reliable" },
      { item: "Local paper map", note: "AP district map + city map" },
      { item: "Small shovel or trowel" },
      {
        item: "Duct tape",
        note: "Universal repair — shelter, wounds, sealing",
      },
      { item: "Cable ties / zip ties", note: "Bundle, secure, improvise" },
      { item: "Safety goggles" },
      { item: "N95 or dust mask ×3", note: "Minimum 3 per person" },
      { item: "Work gloves", note: "Thick leather preferred" },
    ],
  },
  {
    label: "Comms",
    icon: <Radio className="w-3 h-3" />,
    color: "oklch(0.60 0.14 195)",
    items: [
      { item: "Handheld walkie-talkie / two-way radio" },
      { item: "Fully charged mobile phone in waterproof pouch" },
      { item: "Portable solar phone charger" },
      {
        item: "Written emergency contact list",
        note: "Physical paper backup — phones die",
      },
      {
        item: "Signal mirror",
        note: "Attracts rescuers from up to 10km away in sunlight",
      },
      { item: "Whistle", note: "Universal distress signal" },
      { item: "Notepad + waterproof pen", note: "Leave messages, record info" },
    ],
  },
  {
    label: "Docs",
    icon: <FileText className="w-3 h-3" />,
    color: "oklch(0.65 0.18 145)",
    items: [
      {
        item: "National ID / Aadhaar card",
        note: "Photocopy in waterproof pouch",
      },
      { item: "Medical records + prescription list" },
      { item: "Insurance documents" },
      { item: "Bank account details", note: "Encrypted note or memorized" },
      { item: "Emergency contact numbers", note: "Physical paper — always" },
      { item: "Property / address proof" },
    ],
  },
];

export function DisasterKitCard() {
  return (
    <div
      className="rounded-xl border border-border card-glow h-full"
      style={{ background: "oklch(0.22 0.007 95)" }}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Backpack
            className="w-4 h-4"
            style={{ color: "oklch(0.82 0.15 85)" }}
          />
          <span className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            Disaster Kit
          </span>
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.82 0.15 85 / 0.15)",
            color: "oklch(0.82 0.15 85)",
            border: "1px solid oklch(0.82 0.15 85 / 0.3)",
          }}
        >
          72-hr Rule
        </span>
      </div>

      <Tabs defaultValue="basics" className="px-4 pb-4">
        <TabsList
          className="w-full h-8 p-0.5 mb-3"
          style={{ background: "oklch(0.15 0.007 95)" }}
        >
          {sections.map((s) => (
            <TabsTrigger
              key={s.label}
              value={s.label.toLowerCase()}
              data-ocid={`kit.${s.label.toLowerCase()}.tab`}
              className="flex-1 text-xs h-7 flex items-center justify-center gap-1 data-[state=active]:text-[oklch(0.13_0.007_95)] rounded-full transition-all"
            >
              <span style={{ color: "inherit" }}>{s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((s) => (
          <TabsContent
            key={s.label}
            value={s.label.toLowerCase()}
            className="mt-0"
          >
            <ScrollArea className="h-52">
              <div className="space-y-1.5 pr-2">
                {s.items.map((it) => (
                  <div
                    key={it.item}
                    className="flex items-start gap-2 rounded-lg p-2"
                    style={{ background: "oklch(0.15 0.007 95)" }}
                  >
                    <CheckCircle2
                      className="w-3.5 h-3.5 shrink-0 mt-0.5"
                      style={{ color: s.color }}
                    />
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        {it.item}
                      </p>
                      {it.note && (
                        <p
                          className="text-xs"
                          style={{ color: "oklch(0.74 0.015 80)" }}
                        >
                          {it.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      {/* Tip banner */}
      <div
        className="mx-4 mb-4 rounded-lg px-3 py-2 flex items-start gap-2"
        style={{
          background: "oklch(0.82 0.15 85 / 0.1)",
          border: "1px solid oklch(0.82 0.15 85 / 0.25)",
        }}
      >
        <Zap
          className="w-3.5 h-3.5 shrink-0 mt-0.5"
          style={{ color: "oklch(0.82 0.15 85)" }}
        />
        <p className="text-xs" style={{ color: "oklch(0.82 0.15 85)" }}>
          Pack everything in a <strong>waterproof backpack or dry bag</strong>.
          Keep it near your exit, ready to grab in <strong>60 seconds</strong>.
        </p>
      </div>
    </div>
  );
}
