import useNetworkStatus from "@/hooks/useNetworkStatus";
import { useLanguage } from "@/i18n/LanguageContext";
import { Wifi, WifiOff, X } from "lucide-react";
import { useEffect, useState } from "react";

// Translated banner messages per language
const MESSAGES = {
  offline: {
    en: "No internet connection — using offline mode",
    te: "ఇంటర్నెట్ కనెక్షన్ లేదు — ఆఫ్‌లైన్ మోడ్ ఉపయోగిస్తోంది",
    hi: "इंटरनेट कनेक्शन नहीं है — ऑफ़लाइन मोड उपयोग हो रहा है",
  },
  restored: {
    en: "Connection restored — online mode active",
    te: "కనెక్షన్ పునరుద్ధరించబడింది — ఆన్‌లైన్ మోడ్ యాక్టివ్",
    hi: "कनेक्शन बहाल हुआ — ऑनलाइन मोड सक्रिय है",
  },
  dismiss: {
    en: "Dismiss",
    te: "మూసివేయి",
    hi: "बंद करें",
  },
} as const;

type BannerState = "offline" | "restored" | "hidden";

/**
 * Fixed-position banner that reacts to real network changes.
 * - Offline: persistent red/orange banner at top.
 * - Restored: brief green banner that auto-dismisses after 3 s.
 * - Online (steady): nothing shown.
 */
export default function NetworkStatusBanner() {
  const { isOnline, wasOffline } = useNetworkStatus();
  const { lang } = useLanguage();
  const [bannerState, setBannerState] = useState<BannerState>("hidden");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setBannerState("offline");
      setVisible(true);
    } else if (wasOffline) {
      setBannerState("restored");
      setVisible(true);
    } else {
      // Steady online — hide after a short fade
      const id = setTimeout(() => {
        setBannerState("hidden");
        setVisible(false);
      }, 400);
      return () => clearTimeout(id);
    }
  }, [isOnline, wasOffline]);

  if (bannerState === "hidden" && !visible) return null;

  const isOfflineBanner = bannerState === "offline";
  const msg = isOfflineBanner
    ? MESSAGES.offline[lang]
    : MESSAGES.restored[lang];
  const dismissLabel = MESSAGES.dismiss[lang];

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      data-ocid="network.banner"
      className={[
        "fixed top-0 left-0 right-0 z-[200]",
        "flex items-center justify-between gap-3",
        "px-4 py-3 min-h-[48px]",
        "transition-all duration-300 ease-in-out",
        isOfflineBanner
          ? "border-b border-[oklch(0.55_0.22_25/0.6)]"
          : "border-b border-[oklch(0.60_0.18_145/0.6)]",
      ].join(" ")}
      style={{
        background: isOfflineBanner
          ? "oklch(0.25 0.08 25 / 0.97)"
          : "oklch(0.20 0.07 145 / 0.97)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Icon + message */}
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full"
          style={{
            background: isOfflineBanner
              ? "oklch(0.55 0.22 25 / 0.25)"
              : "oklch(0.60 0.18 145 / 0.25)",
          }}
          aria-hidden="true"
        >
          {isOfflineBanner ? (
            <WifiOff
              className="w-5 h-5"
              style={{ color: "oklch(0.80 0.18 25)" }}
            />
          ) : (
            <Wifi
              className="w-5 h-5"
              style={{ color: "oklch(0.75 0.18 145)" }}
            />
          )}
        </span>

        <p
          className="text-sm font-body font-semibold leading-tight break-words"
          style={{
            color: isOfflineBanner
              ? "oklch(0.92 0.06 25)"
              : "oklch(0.90 0.06 145)",
          }}
        >
          {msg}
        </p>
      </div>

      {/* Dismiss button — only when offline */}
      {isOfflineBanner && (
        <button
          type="button"
          aria-label={dismissLabel}
          data-ocid="network.close_button"
          className={[
            "shrink-0 flex items-center justify-center",
            "w-10 h-10 rounded-full",
            "transition-colors duration-200",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          ].join(" ")}
          style={{
            color: "oklch(0.80 0.12 25)",
          }}
          onClick={() => {
            setVisible(false);
            setBannerState("hidden");
          }}
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
