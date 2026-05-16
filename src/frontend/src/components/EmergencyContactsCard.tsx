import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

type ContactCategory = "police" | "medical" | "disaster" | "women" | "utility";

interface Contact {
  number: string;
  name: string;
  purpose: string;
  category: ContactCategory;
}

const categoryColors: Record<
  ContactCategory,
  { border: string; badge: string; text: string }
> = {
  police: {
    border: "oklch(0.48 0.16 25)",
    badge: "oklch(0.48 0.16 25 / 0.15)",
    text: "oklch(0.70 0.14 30)",
  },
  medical: {
    border: "oklch(0.60 0.14 195)",
    badge: "oklch(0.60 0.14 195 / 0.15)",
    text: "oklch(0.72 0.12 200)",
  },
  disaster: {
    border: "oklch(0.65 0.18 145)",
    badge: "oklch(0.65 0.18 145 / 0.15)",
    text: "oklch(0.72 0.16 148)",
  },
  women: {
    border: "oklch(0.72 0.15 55)",
    badge: "oklch(0.72 0.15 55 / 0.15)",
    text: "oklch(0.80 0.14 58)",
  },
  utility: {
    border: "oklch(0.60 0.13 280)",
    badge: "oklch(0.60 0.13 280 / 0.15)",
    text: "oklch(0.72 0.11 282)",
  },
};

const _categoryLabels: Record<ContactCategory, string> = {
  police: "Police / Fire",
  medical: "Medical",
  disaster: "Disaster / Relief",
  women: "Women / Child",
  utility: "Utilities",
};

const contacts: Contact[] = [
  // National core
  {
    number: "112",
    name: "National Emergency",
    purpose: "Police + Fire + Ambulance combined — all emergencies",
    category: "police",
  },
  {
    number: "100",
    name: "Police",
    purpose: "Crime, law & order emergencies",
    category: "police",
  },
  {
    number: "101",
    name: "Fire Brigade",
    purpose: "Fire, gas leaks, building collapse",
    category: "police",
  },
  {
    number: "102",
    name: "Ambulance",
    purpose: "Medical emergencies",
    category: "medical",
  },
  {
    number: "108",
    name: "EMRI Ambulance",
    purpose: "Accidents & medical crises — free service",
    category: "medical",
  },
  {
    number: "104",
    name: "Health Helpline",
    purpose: "Medical advice & nearest hospital info (NHM)",
    category: "medical",
  },
  {
    number: "103",
    name: "Traffic Police",
    purpose: "Road accidents & traffic emergencies",
    category: "police",
  },
  {
    number: "1073",
    name: "Road Accident Helpline",
    purpose: "National road accident emergency",
    category: "police",
  },
  // Women / Child
  {
    number: "1098",
    name: "Childline",
    purpose: "Children in distress or danger",
    category: "women",
  },
  {
    number: "181",
    name: "Women Helpline",
    purpose: "Domestic violence, women in distress",
    category: "women",
  },
  {
    number: "1091",
    name: "Women Safety (Police)",
    purpose: "Sexual assault & harassment",
    category: "women",
  },
  // Disaster
  {
    number: "109",
    name: "Disaster Management",
    purpose: "Natural disasters — national coordination (NDMA)",
    category: "disaster",
  },
  {
    number: "1070",
    name: "National Disaster Control",
    purpose: "National disaster coordination room",
    category: "disaster",
  },
  {
    number: "1077",
    name: "AP Disaster Helpline",
    purpose: "Andhra Pradesh flood/cyclone relief",
    category: "disaster",
  },
  {
    number: "1800-425-0019",
    name: "APSDMA Helpline",
    purpose: "AP State Disaster Management Authority — 24×7",
    category: "disaster",
  },
  {
    number: "0866-2410839",
    name: "Vijayawada GHMC",
    purpose: "Local civic emergencies — Vijayawada control room",
    category: "disaster",
  },
  // Medical extended
  {
    number: "14410",
    name: "AYUSH Helpline",
    purpose: "Traditional medicine guidance",
    category: "medical",
  },
  {
    number: "011-23978046",
    name: "Mental Health (NIMHANS)",
    purpose: "Psychological first aid & trauma support",
    category: "medical",
  },
  {
    number: "1800-599-0019",
    name: "Vandrevala Foundation",
    purpose: "24×7 mental health crisis support",
    category: "medical",
  },
  // Utilities
  {
    number: "1800-425-1515",
    name: "APEPDCL (Power)",
    purpose: "Power outages & electrical hazards — AP",
    category: "utility",
  },
  {
    number: "1916",
    name: "Electricity Emergency",
    purpose: "Electrical emergency complaint",
    category: "utility",
  },
  {
    number: "1800-233-1230",
    name: "Gas Leak Helpline",
    purpose: "LPG gas leak emergency (Indane)",
    category: "utility",
  },
];

const groupedContacts: Record<ContactCategory, Contact[]> = {
  police: contacts.filter((c) => c.category === "police"),
  medical: contacts.filter((c) => c.category === "medical"),
  disaster: contacts.filter((c) => c.category === "disaster"),
  women: contacts.filter((c) => c.category === "women"),
  utility: contacts.filter((c) => c.category === "utility"),
};

function ContactTile({ contact, index }: { contact: Contact; index: number }) {
  const colors = categoryColors[contact.category];
  return (
    <article
      className="rounded-xl p-3 flex flex-col gap-1.5 relative overflow-hidden"
      style={{
        background: "oklch(0.19 0.007 95)",
        border: "1px solid oklch(0.29 0.007 95)",
        borderLeft: `3px solid ${colors.border}`,
      }}
      data-ocid={`emergency.item.${index + 1}`}
      aria-label={`${contact.name}: ${contact.purpose}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="font-display font-extrabold text-xl leading-none tracking-tight"
          style={{ color: "oklch(0.82 0.15 85)" }}
          aria-hidden="true"
        >
          {contact.number}
        </span>
        <a
          href={`tel:${contact.number.replace(/[^0-9+]/g, "")}`}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-opacity hover:opacity-80 active:scale-95 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          style={{ background: colors.badge }}
          aria-label={`Call ${contact.name} at ${contact.number}`}
          data-ocid={`emergency.button.${index + 1}`}
        >
          <Phone
            className="w-3.5 h-3.5"
            style={{ color: colors.text }}
            aria-hidden="true"
          />
        </a>
      </div>
      <p className="text-sm font-bold text-foreground leading-snug">
        {contact.name}
      </p>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "oklch(0.60 0.006 95)" }}
      >
        {contact.purpose}
      </p>
    </article>
  );
}

export function EmergencyContactsCard() {
  const { t } = useLanguage();
  const categoryLabels: Record<ContactCategory, string> = {
    police: t("emergency.cat_police"),
    medical: t("emergency.cat_medical"),
    disaster: t("emergency.cat_disaster"),
    women: t("emergency.cat_women"),
    utility: t("emergency.cat_utility"),
  };
  let globalIndex = 0;

  return (
    <section
      className="rounded-2xl border border-border flex flex-col overflow-hidden"
      style={{ background: "oklch(0.22 0.007 95)" }}
      aria-labelledby="emergency-contacts-heading"
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 p-4 border-b border-border"
        style={{ background: "oklch(0.48 0.16 25 / 0.08)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.48 0.16 25 / 0.2)" }}
        >
          <Phone
            className="w-4.5 h-4.5"
            style={{ color: "oklch(0.70 0.14 30)" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2
            id="emergency-contacts-heading"
            className="font-display font-extrabold uppercase tracking-tight text-base text-foreground"
          >
            {t("emergency.title")}
          </h2>
          <p className="text-xs" style={{ color: "oklch(0.60 0.006 95)" }}>
            {t("emergency.subtitle")}
          </p>
        </div>
        <span
          className="text-xs font-display font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
          style={{
            background: "oklch(0.48 0.16 25 / 0.15)",
            borderColor: "oklch(0.48 0.16 25 / 0.4)",
            color: "oklch(0.70 0.14 30)",
          }}
        >
          {contacts.length} {t("emergency.numbers")}
        </span>
      </div>

      {/* Category legend */}
      <ul
        className="flex flex-wrap gap-2 px-4 py-3 border-b border-border list-none m-0 p-0"
        style={{ padding: "12px 16px" }}
        aria-label="Contact categories"
      >
        {(Object.keys(categoryColors) as ContactCategory[]).map((cat) => (
          <li key={cat} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: categoryColors[cat].border }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-medium"
              style={{ color: "oklch(0.65 0.006 95)" }}
            >
              {categoryLabels[cat]}
            </span>
          </li>
        ))}
      </ul>

      {/* Contacts */}
      <ScrollArea className="flex-1 max-h-[600px]">
        <div className="p-4 space-y-6">
          {(Object.keys(groupedContacts) as ContactCategory[]).map((cat) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ background: categoryColors[cat].border }}
                  aria-hidden="true"
                />
                <span
                  className="text-xs font-display font-bold uppercase tracking-widest"
                  style={{ color: categoryColors[cat].text }}
                >
                  {categoryLabels[cat]}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "oklch(0.25 0.007 95)" }}
                />
              </div>
              <ul
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none m-0 p-0"
                aria-label={`${categoryLabels[cat]} contacts`}
              >
                {groupedContacts[cat].map((contact) => {
                  const idx = globalIndex++;
                  return (
                    <ContactTile
                      key={contact.number}
                      contact={contact}
                      index={idx}
                    />
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
