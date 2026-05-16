import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  KNOWLEDGE_BASE,
  type KnowledgeEntry,
  OFFLINE_FALLBACK,
  findBestMatch,
} from "@/data/chatbotKnowledgeBase";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Bot,
  MessageCircle,
  Mic,
  MicOff,
  RefreshCw,
  Send,
  Trash2,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

// ─── Speech API types ─────────────────────────────────────────────────────────
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}
interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

const speechLangMap: Record<string, string> = {
  en: "en-IN",
  te: "te-IN",
  hi: "hi-IN",
};

const isSpeechSupported =
  typeof window !== "undefined" &&
  ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

// ─── Types ────────────────────────────────────────────────────────────────────
export type ChatMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: number;
  images?: string[];
  isMarkdown?: boolean;
  kbEntry?: KnowledgeEntry;
};

export type ChatSession = {
  id: string;
  startedAt: number;
  mode: "online" | "offline";
  messages: ChatMessage[];
};

const MAX_HISTORY_MESSAGES = 50;
const LS_CHAT_KEY = "localeyes_chat_history_v2";
const LS_SESSION_KEY = "localeyes_chat_session_v2";
const LS_GEMINI_KEY = "localeyes_gemini_key";

function loadHistory(): ChatSession[] {
  try {
    const raw = localStorage.getItem(LS_CHAT_KEY);
    return raw ? (JSON.parse(raw) as ChatSession[]) : [];
  } catch {
    return [];
  }
}
function saveHistory(sessions: ChatSession[]) {
  try {
    const trimmed = sessions.map((s) => ({
      ...s,
      messages: s.messages.slice(-MAX_HISTORY_MESSAGES),
    }));
    localStorage.setItem(LS_CHAT_KEY, JSON.stringify(trimmed.slice(-10)));
  } catch {
    // ignore quota
  }
}
function loadCurrentSession(): ChatSession | null {
  try {
    const raw = localStorage.getItem(LS_SESSION_KEY);
    return raw ? (JSON.parse(raw) as ChatSession) : null;
  } catch {
    return null;
  }
}
function saveCurrentSession(session: ChatSession) {
  try {
    localStorage.setItem(LS_SESSION_KEY, JSON.stringify(session));
  } catch {
    // ignore
  }
}

// ─── Gemini API ───────────────────────────────────────────────────────────────
const GEMINI_SYSTEM_INSTRUCTION = `You are an expert emergency response and survival assistant for India, specialized in disaster management, first aid, medical care, and survival techniques for Andhra Pradesh and all of India.

ALWAYS respond with:
1. Immediate action steps (numbered, clear, actionable)
2. Detailed explanations for each step
3. What medicines/supplies to use (Indian pharmacy names: Paracetamol=Crocin/Dolo, Ibuprofen=Brufen/Combiflam, Salbutamol=Asthalin, Cetirizine=Alerid, ORS=Electral/WHO formula)
4. When to call emergency services (108 for ambulance, 112 for all emergencies, 101 for fire, 1078 for NDMA)
5. Precautions and what NOT to do

Format responses with clear headers (##), numbered steps, bullet points for sub-items, ✅ for safe actions, ⚠️ for warnings.

For medical emergencies: provide full treatment protocols with dosages by age/weight (India-specific dosing).
For disasters (floods/cyclones/earthquakes): provide before/during/after protocols specific to AP geography.
For survival: practical step-by-step techniques for Indian climate and terrain.
For food/water: specific detection and purification methods.

Always mention emergency contacts when relevant: 108 (ambulance), 112 (police/fire/emergency), 1078 (NDMA), 104 (AP health helpline).

You can provide information in English, Telugu (తెలుగు), or Hindi (हिंदी). Respond in the SAME language the user writes in.`;

async function callGeminiAPI(
  message: string,
  history: ChatMessage[],
  apiKey: string,
): Promise<{ text: string; images?: string[]; sources?: string }> {
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const GEMINI_FALLBACK_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const contents = [
    ...history
      .filter((m) => m.role === "user" || m.role === "ai")
      .slice(-14)
      .map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
    { role: "user", parts: [{ text: message }] },
  ];

  const body = JSON.stringify({
    system_instruction: { parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }] },
    tools: [{ google_search: {} }],
    contents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 2048,
    },
  });

  const doFetch = async (url: string) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (res.status === 404) throw new Error("MODEL_NOT_FOUND");
    if (res.status === 403 || res.status === 400) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(`API_KEY_INVALID:${JSON.stringify(errBody)}`);
    }
    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (!res.ok) throw new Error(`HTTP_${res.status}`);
    return res.json();
  };

  let data: Record<string, unknown>;
  try {
    data = await doFetch(GEMINI_URL);
  } catch (e) {
    const err = e as Error;
    if (err.message === "MODEL_NOT_FOUND") {
      data = await doFetch(GEMINI_FALLBACK_URL);
    } else if (
      err.message.startsWith("HTTP_") ||
      err.message === "Failed to fetch" ||
      err.message === "NetworkError"
    ) {
      await new Promise((r) => setTimeout(r, 1200));
      data = await doFetch(GEMINI_URL);
    } else {
      throw err;
    }
  }

  const candidate = (
    data as {
      candidates?: Array<{
        content: { parts: Array<{ text?: string }> };
        groundingMetadata?: { webSearchQueries?: string[] };
      }>;
    }
  )?.candidates?.[0];
  const text =
    candidate?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";

  if (!text) throw new Error("EMPTY_RESPONSE");

  let sources: string | undefined;
  const queries = candidate?.groundingMetadata?.webSearchQueries;
  if (queries && queries.length > 0) {
    sources = `\n\n🔍 *Web searched: ${queries.join(" • ")}*`;
  }

  return { text, sources };
}

// ─── Offline response engine ──────────────────────────────────────────────────
function getOfflineResponse(
  query: string,
  history: ChatMessage[],
): {
  text: string;
  images?: string[];
  kbEntry?: KnowledgeEntry;
} {
  const match = findBestMatch(
    query,
    history.map((m) => ({ role: m.role, text: m.text })),
  );

  if (!match) return { text: OFFLINE_FALLBACK };

  const entry = match.entry;
  const images = entry.referenceImages?.map((r) => r.url);
  return { text: entry.response, images, kbEntry: entry };
}

// ─── Quick suggestions ────────────────────────────────────────────────────────
const QUICK_CHIPS = [
  "Snake bite first aid",
  "Flood evacuation steps",
  "CPR instructions",
  "Water purification methods",
  "Cyclone safety",
  "How to treat burns",
  "Dengue fever treatment",
  "Child fever dosage",
  "Pregnancy emergency delivery",
  "Heatstroke AP protocol",
  "Fracture first aid",
  "72-hour emergency kit",
];

// ─── Session helpers ──────────────────────────────────────────────────────────
function newSession(mode: "online" | "offline"): ChatSession {
  return {
    id: `session-${Date.now()}`,
    startedAt: Date.now(),
    mode,
    messages: [
      {
        id: "init",
        role: "ai",
        timestamp: Date.now(),
        text: `**WELCOME TO LOCAL-EYES AI ASSISTANT**\n\nYour offline disaster guide with ${KNOWLEDGE_BASE.length}+ scenarios covering all of India and Andhra Pradesh.\n\n✅ First Aid — CPR, burns, wounds, fractures, drowning, choking\n✅ India Medical — snakebite, dengue, malaria, heatstroke, scorpion\n✅ Pregnancy — emergency delivery, eclampsia, postpartum\n✅ Pediatric — child dosages, infant CPR, dehydration\n✅ Disasters — flood, cyclone, earthquake, tsunami, fire, landslide\n✅ Survival — water purification, shelter, food safety, navigation\n\n💡 Tap a quick topic below or type your question.\n🌐 Toggle 'Online' for live Gemini AI with internet access (API key required).`,
      },
    ],
  };
}

function scrollToBottom(ref: React.RefObject<HTMLDivElement | null>) {
  const el = ref.current?.querySelector("[data-radix-scroll-area-viewport]");
  if (el) el.scrollTop = el.scrollHeight;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Message Renderer ─────────────────────────────────────────────────────────
function renderLine(line: string, lineKey: string) {
  if (!line.trim()) return <div key={lineKey} className="h-1" />;

  if (line.trim().startsWith("## ")) {
    return (
      <p
        key={lineKey}
        className="font-bold text-sm mt-3 mb-1 uppercase tracking-wide"
        style={{ color: "oklch(0.82 0.15 85)" }}
      >
        {line.trim().slice(3)}
      </p>
    );
  }
  if (/^\*\*[^*]+\*\*$/.test(line.trim())) {
    return (
      <p
        key={lineKey}
        className="font-bold uppercase tracking-wide text-xs mt-2"
        style={{ color: "oklch(0.82 0.15 85)" }}
      >
        {line.replace(/\*\*/g, "")}
      </p>
    );
  }
  if (line.startsWith("⚠️") || line.startsWith("⚠")) {
    return (
      <p
        key={lineKey}
        className="flex gap-1.5"
        style={{ color: "oklch(0.75 0.16 45)" }}
      >
        <span className="shrink-0">⚠️</span>
        <span>{parseBold(line.replace(/^⚠️?\s*/, ""))}</span>
      </p>
    );
  }
  if (line.startsWith("✅")) {
    return (
      <p
        key={lineKey}
        className="flex gap-1.5"
        style={{ color: "oklch(0.75 0.18 145)" }}
      >
        <span className="shrink-0">✅</span>
        <span>{parseBold(line.replace(/^✅\s*/, ""))}</span>
      </p>
    );
  }
  if (line.startsWith("📞") || line.startsWith("💡") || line.startsWith("🌐")) {
    return (
      <p
        key={lineKey}
        className="flex gap-1.5"
        style={{ color: "oklch(0.80 0.14 225)" }}
      >
        <span className="shrink-0">{line.charAt(0)}</span>
        <span>{parseBold(line.slice(2).trim())}</span>
      </p>
    );
  }
  if (/^\d+\.\s/.test(line)) {
    return (
      <p
        key={lineKey}
        className="flex gap-2"
        style={{ color: "oklch(0.88 0.01 95)" }}
      >
        <span
          className="shrink-0 font-bold"
          style={{ color: "oklch(0.82 0.15 85)" }}
        >
          {line.match(/^\d+/)![0]}.
        </span>
        <span>{parseBold(line.replace(/^\d+\.\s*/, ""))}</span>
      </p>
    );
  }
  if (line.startsWith("- ") || line.startsWith("• ")) {
    return (
      <p
        key={lineKey}
        className="flex gap-2 ml-2"
        style={{ color: "oklch(0.84 0.01 95)" }}
      >
        <span className="shrink-0" style={{ color: "oklch(0.55 0.01 95)" }}>
          •
        </span>
        <span>{parseBold(line.replace(/^[-•]\s*/, ""))}</span>
      </p>
    );
  }
  return (
    <p key={lineKey} style={{ color: "oklch(0.88 0.01 95)" }}>
      {parseBold(line)}
    </p>
  );
}

function parseBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, j) =>
        part.startsWith("**") && part.endsWith("**") ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: static inline spans
          <strong key={j} style={{ color: "oklch(0.95 0.01 95)" }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="text-sm leading-relaxed space-y-1">
      {lines.map((line, i) => renderLine(line, `line-${i}`))}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div
      className="flex justify-start"
      data-ocid="chat.loading_state"
      aria-label="AI is thinking"
      aria-live="polite"
    >
      <div
        className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center mr-2"
        aria-hidden="true"
        style={{
          background: "oklch(0.82 0.15 85 / 0.12)",
          border: "1px solid oklch(0.82 0.15 85 / 0.25)",
        }}
      >
        <Bot className="w-4 h-4" style={{ color: "oklch(0.82 0.15 85)" }} />
      </div>
      <div
        className="px-4 py-3 rounded-2xl flex gap-1.5 items-center min-h-[48px]"
        style={{
          background: "oklch(0.19 0.007 95)",
          border: "1px solid oklch(0.29 0.007 95)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: "oklch(0.82 0.15 85)" }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
        <span className="ml-2 text-xs" style={{ color: "oklch(0.65 0.01 95)" }}>
          Thinking...
        </span>
      </div>
    </div>
  );
}

function MessageImages({
  images,
  context,
}: {
  images: string[];
  context: string;
}) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const visible = images.filter((u) => !failedImages.has(u));
  if (!visible.length) return null;
  return (
    <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
      {visible.map((url, idx) => (
        <img
          key={url}
          src={url}
          alt={`Step ${idx + 1}: ${context}`}
          className="rounded-xl flex-shrink-0 object-cover border"
          style={{
            height: "160px",
            maxWidth: "240px",
            borderColor: "oklch(0.35 0.007 95)",
          }}
          onError={() => setFailedImages((prev) => new Set([...prev, url]))}
        />
      ))}
    </div>
  );
}

// ─── API Key Modal ────────────────────────────────────────────────────────────
function ApiKeyModal({
  apiKeyInput,
  onKeyChange,
  onSave,
  onClose,
  triggerId,
}: {
  apiKeyInput: string;
  onKeyChange: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
  triggerId: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLInputElement>(null);

  // Focus trap + return focus on close
  useEffect(() => {
    firstFocusRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        document.getElementById(triggerId)?.focus();
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, triggerId]);

  return (
    <div
      aria-modal="true"
      aria-label="Enter Gemini API key"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.7)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyUp={(e) => {
        if (e.key === "Escape") onClose();
      }}
      // biome-ignore lint/a11y/useSemanticElements: overlay backdrop needs div not dialog to avoid native dialog styles
      role="dialog"
    >
      <div
        ref={modalRef}
        className="rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 relative"
        style={{
          background: "oklch(0.17 0.007 95)",
          border: "1px solid oklch(0.82 0.15 85 / 0.35)",
        }}
      >
        <button
          type="button"
          onClick={() => {
            onClose();
            document.getElementById(triggerId)?.focus();
          }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5"
          aria-label="Close dialog"
          data-ocid="chat.close_button"
          style={{ color: "oklch(0.55 0.01 95)" }}
        >
          <X className="w-4 h-4" />
        </button>
        <div>
          <h3
            className="font-display font-bold text-base"
            style={{ color: "oklch(0.92 0.01 95)" }}
          >
            Enable Online Mode
          </h3>
          <p className="text-xs mt-1" style={{ color: "oklch(0.60 0.01 95)" }}>
            Enter your free Google Gemini API key to unlock live internet
            access. Keys start with <code>AIza...</code> and are available at{" "}
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noreferrer"
              className="underline"
              style={{ color: "oklch(0.82 0.15 85)" }}
            >
              aistudio.google.com
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="gemini-api-key"
            className="text-xs font-semibold"
            style={{ color: "oklch(0.70 0.01 95)" }}
          >
            API Key
          </label>
          <Input
            id="gemini-api-key"
            ref={firstFocusRef}
            placeholder="AIza..."
            value={apiKeyInput}
            onChange={(e) => onKeyChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSave()}
            type="password"
            className="text-sm"
            style={{
              background: "oklch(0.21 0.007 95)",
              borderColor: "oklch(0.82 0.15 85 / 0.4)",
              color: "oklch(0.92 0.01 95)",
              height: "48px",
            }}
            aria-label="Gemini API key input"
            data-ocid="chat.input"
          />
        </div>
        <div className="flex gap-2 mt-1">
          <Button
            type="button"
            className="flex-1 h-12 text-sm font-semibold"
            style={{
              background: "oklch(0.82 0.15 85)",
              color: "oklch(0.13 0.007 95)",
            }}
            onClick={onSave}
            data-ocid="chat.confirm_button"
          >
            Save &amp; Enable Online
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 text-sm"
            onClick={() => {
              onClose();
              document.getElementById(triggerId)?.focus();
            }}
            data-ocid="chat.cancel_button"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Confirm Clear Modal ──────────────────────────────────────────────────────
function ConfirmClearModal({
  onConfirm,
  onCancel,
  triggerId,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  triggerId: string;
}) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
        document.getElementById(triggerId)?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel, triggerId]);

  return (
    <div
      aria-modal="true"
      aria-label="Confirm clear chat history"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.7)" }}
      // biome-ignore lint/a11y/useSemanticElements: overlay backdrop needs div not dialog to avoid native dialog styles
      role="dialog"
    >
      <div
        className="rounded-2xl p-6 w-full max-w-xs flex flex-col gap-4"
        style={{
          background: "oklch(0.17 0.007 95)",
          border: "1px solid oklch(0.65 0.16 27 / 0.4)",
        }}
      >
        <div>
          <h3
            className="font-display font-bold text-base"
            style={{ color: "oklch(0.92 0.01 95)" }}
          >
            🗑️ Clear All History?
          </h3>
          <p className="text-sm mt-1" style={{ color: "oklch(0.60 0.01 95)" }}>
            This will delete all your saved chats. You cannot undo this!
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            ref={confirmRef}
            type="button"
            className="flex-1 h-12 text-sm font-semibold"
            style={{
              background: "oklch(0.55 0.18 27)",
              color: "oklch(0.97 0.01 95)",
            }}
            onClick={onConfirm}
            data-ocid="chat.confirm_button"
          >
            Yes, Clear All
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12 text-sm"
            onClick={() => {
              onCancel();
              document.getElementById(triggerId)?.focus();
            }}
            data-ocid="chat.cancel_button"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── ChatSection ──────────────────────────────────────────────────────────────
export function ChatSection() {
  const { lang: appLang } = useLanguage();
  const { isOnline: networkOnline, wasOffline } = useNetworkStatus();
  const statusBadgeId = useId();

  const [internetMode, setInternetMode] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState<string>(
    () => localStorage.getItem(LS_GEMINI_KEY) ?? "",
  );
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [session, setSession] = useState<ChatSession>(
    () => loadCurrentSession() ?? newSession("offline"),
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ─── Auto online/offline detection ───────────────────────────────────────
  // When network drops: switch to offline mode automatically
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — only react to networkOnline changes
  useEffect(() => {
    if (!networkOnline && internetMode) {
      setInternetMode(false);
      setSession((prev) => ({ ...prev, mode: "offline" }));
      appendMessage({
        id: `auto-offline-${Date.now()}`,
        role: "ai",
        timestamp: Date.now(),
        text: "📴 **No internet — switched to offline mode automatically.**\n\nI'm still here with 1000+ saved emergency guides! Ask me anything. I'll reconnect automatically when your internet comes back. 💪",
      });
    }
  }, [networkOnline]);

  // When network recovers: auto-switch back if API key present
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — only react to network recovery
  useEffect(() => {
    if (wasOffline && networkOnline && geminiApiKey && !internetMode) {
      setInternetMode(true);
      setSession((prev) => ({ ...prev, mode: "online" }));
      appendMessage({
        id: `auto-online-${Date.now()}`,
        role: "ai",
        timestamp: Date.now(),
        text: "✅ **Internet is back — switched to Online Mode!** 🌐\n\nFull Gemini 2.0 with live web search is active again.",
      });
    }
  }, [wasOffline, networkOnline]);

  useEffect(() => {
    saveCurrentSession(session);
  }, [session]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional trigger
  useEffect(() => {
    requestAnimationFrame(() => scrollToBottom(scrollAreaRef));
  }, [session.messages, loading]);

  const appendMessage = useCallback((msg: ChatMessage) => {
    setSession((prev) => ({ ...prev, messages: [...prev.messages, msg] }));
  }, []);

  function handleInternetModeToggle(checked: boolean) {
    if (!checked) {
      setInternetMode(false);
      setShowApiKeyModal(false);
      setSession((prev) => ({ ...prev, mode: "offline" }));
      return;
    }
    if (!networkOnline) {
      appendMessage({
        id: `a-${Date.now()}`,
        role: "ai",
        timestamp: Date.now(),
        text: "📴 **No internet found.** Please connect to the internet first, then try Online Mode again.",
      });
      return;
    }
    if (!geminiApiKey) {
      setShowApiKeyModal(true);
      return;
    }
    setInternetMode(true);
    setSession((prev) => ({ ...prev, mode: "online" }));
    appendMessage({
      id: `a-${Date.now()}`,
      role: "ai",
      timestamp: Date.now(),
      text: "🌐 **Online Mode activated!** I now have full internet access via Google Gemini 2.0 with live web search. Ask me anything — current disaster alerts, weather, emergency guidance, or any question!",
    });
  }

  function saveApiKey() {
    const key = apiKeyInput.trim();
    if (!key.startsWith("AIza")) {
      appendMessage({
        id: `a-${Date.now()}`,
        role: "ai",
        timestamp: Date.now(),
        text: "⚠️ That doesn't look right. Gemini API keys start with 'AIza...'. Get a free key at aistudio.google.com.",
      });
      return;
    }
    localStorage.setItem(LS_GEMINI_KEY, key);
    setGeminiApiKey(key);
    setApiKeyInput("");
    setShowApiKeyModal(false);
    setInternetMode(true);
    setSession((prev) => ({ ...prev, mode: "online" }));
    appendMessage({
      id: `a-${Date.now()}`,
      role: "ai",
      timestamp: Date.now(),
      text: "✅ **API key saved! Online Mode is active.** Gemini 2.0 + live web search is ready. Ask me anything!",
    });
  }

  async function send(text?: string) {
    const txt = (text ?? input).trim();
    if (!txt || loading) return;
    setInput("");
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: txt,
      timestamp: Date.now(),
    };
    appendMessage(userMsg);
    setLoading(true);

    const isOnlineActive = internetMode && !!geminiApiKey && networkOnline;

    if (isOnlineActive) {
      try {
        const history = [...session.messages, userMsg];
        const result = await callGeminiAPI(txt, history, geminiApiKey);
        let finalText = result.text;
        if (result.sources) finalText += result.sources;
        appendMessage({
          id: `a-${Date.now()}`,
          role: "ai",
          text: finalText,
          timestamp: Date.now(),
          images: result.images,
          isMarkdown: true,
        });
        setLoading(false);
        archiveSession();
        return;
      } catch (e) {
        const err = e as Error;
        let fallbackPrefix =
          "⚠️ Oops! Something went wrong connecting online. Showing offline guide instead:\n\n";
        if (err.message.startsWith("API_KEY_INVALID")) {
          fallbackPrefix =
            "⚠️ **API key problem.** Please check your key at aistudio.google.com.\n\nOffline guide:\n\n";
        } else if (err.message === "RATE_LIMIT") {
          fallbackPrefix =
            "⚠️ **Too many requests!** Please wait a moment and try again.\n\nOffline guide:\n\n";
        }
        const offline = getOfflineResponse(txt, session.messages);
        appendMessage({
          id: `a-${Date.now()}`,
          role: "ai",
          text: `${fallbackPrefix}${offline.text}`,
          timestamp: Date.now(),
          images: offline.images,
          kbEntry: offline.kbEntry,
        });
        setLoading(false);
        return;
      }
    }

    // Offline mode
    setTimeout(
      () => {
        const offline = getOfflineResponse(txt, session.messages);
        appendMessage({
          id: `a-${Date.now()}`,
          role: "ai",
          text: offline.text,
          timestamp: Date.now(),
          images: offline.images,
          kbEntry: offline.kbEntry,
        });
        setLoading(false);
        archiveSession();
      },
      400 + Math.random() * 300,
    );
  }

  function archiveSession() {
    const history = loadHistory();
    const idx = history.findIndex((s) => s.id === session.id);
    if (idx >= 0) history[idx] = session;
    else if (session.messages.length > 1) history.push(session);
    saveHistory(history);
  }

  function startNewSession() {
    archiveSession();
    const mode: "online" | "offline" =
      internetMode && !!geminiApiKey ? "online" : "offline";
    setSession(newSession(mode));
    setInput("");
    setLoading(false);
    stopListening();
    setMicError(null);
  }

  function doClearHistory() {
    try {
      localStorage.removeItem(LS_CHAT_KEY);
      localStorage.removeItem(LS_SESSION_KEY);
    } catch {
      // ignore
    }
    const mode: "online" | "offline" =
      internetMode && !!geminiApiKey ? "online" : "offline";
    setSession(newSession(mode));
    setInput("");
    setLoading(false);
    setShowClearConfirm(false);
  }

  useEffect(
    () => () => {
      recognitionRef.current?.abort();
    },
    [],
  );

  function stopListening() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  }

  function handleMicClick() {
    setMicError(null);
    if (isListening) {
      stopListening();
      return;
    }
    if (!isSpeechSupported) return;
    const SpeechRecognitionCtor =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = speechLangMap[appLang] ?? "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      if (transcript)
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
      recognitionRef.current = null;
      inputRef.current?.focus();
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      recognitionRef.current = null;
      if (
        event.error === "not-allowed" ||
        event.error === "permission-denied"
      ) {
        setMicError(
          "🎤 Microphone blocked! Please allow microphone access in your browser settings and try again.",
        );
      } else if (event.error === "no-speech") {
        setMicError(
          "😕 Couldn't hear anything. Please speak clearly and try again!",
        );
      } else {
        setMicError("Oops! Microphone had a problem. Please try again.");
      }
    };
    recognition.onend = () => {
      setIsListening(false);
      if (recognitionRef.current === recognition) recognitionRef.current = null;
    };
    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setIsListening(false);
      recognitionRef.current = null;
      setMicError("Could not start microphone. Please try again.");
    }
  }

  const isOnlineActive = internetMode && !!geminiApiKey && networkOnline;
  const showQuickChips = session.messages.length <= 2 && !loading;

  return (
    <section
      id="chat"
      className="py-16 px-4"
      aria-label="AI Assistant chat"
      style={{ background: "oklch(0.13 0.007 95)" }}
    >
      {/* Modals */}
      <AnimatePresence>
        {showApiKeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ApiKeyModal
              apiKeyInput={apiKeyInput}
              onKeyChange={setApiKeyInput}
              onSave={saveApiKey}
              onClose={() => setShowApiKeyModal(false)}
              triggerId="online-toggle"
            />
          </motion.div>
        )}
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ConfirmClearModal
              onConfirm={doClearHistory}
              onCancel={() => setShowClearConfirm(false)}
              triggerId="clear-history-btn"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-border text-muted-foreground">
            AI Assistant
          </span>
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-foreground mt-4 tracking-tight">
            Local-Eyes{" "}
            <span style={{ color: "oklch(0.82 0.15 85)" }}>AI Chat</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl">
            Offline knowledge base with {KNOWLEDGE_BASE.length}+ scenarios.
            Enable Online Mode for full Gemini 2.0 internet access with web
            search.
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "oklch(0.17 0.007 95)",
            border: "1px solid oklch(0.27 0.007 95)",
            height: "min(76vh, 720px)",
          }}
          data-ocid="chat.panel"
        >
          {/* Chat Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0 gap-2 flex-wrap"
            style={{ borderBottom: "1px solid oklch(0.27 0.007 95)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
                style={{
                  background: "oklch(0.82 0.15 85 / 0.15)",
                  border: "1px solid oklch(0.82 0.15 85 / 0.35)",
                }}
              >
                <Bot
                  className="w-5 h-5"
                  style={{ color: "oklch(0.82 0.15 85)" }}
                />
              </div>
              <div>
                <p
                  className="font-display font-bold text-sm uppercase tracking-wider"
                  style={{ color: "oklch(0.92 0.01 95)" }}
                >
                  Local-Eyes AI
                </p>
                {/* Network + mode status badge */}
                <div
                  id={statusBadgeId}
                  className="flex items-center gap-1.5"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {isOnlineActive ? (
                    <>
                      <Wifi
                        className="w-3 h-3"
                        aria-hidden="true"
                        style={{ color: "oklch(0.68 0.18 145)" }}
                      />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "oklch(0.68 0.18 145)" }}
                      >
                        Connected — live mode
                      </span>
                    </>
                  ) : internetMode && !networkOnline ? (
                    <>
                      <WifiOff
                        className="w-3 h-3"
                        aria-hidden="true"
                        style={{ color: "oklch(0.65 0.16 45)" }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.65 0.16 45)" }}
                      >
                        📴 No internet — saved knowledge active
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                        aria-hidden="true"
                        style={{ background: "oklch(0.60 0.14 145)" }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.60 0.14 145)" }}
                      >
                        📚 Using saved knowledge · {KNOWLEDGE_BASE.length}+
                        scenarios
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {/* Online toggle */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                style={{ background: "oklch(0.21 0.007 95)" }}
              >
                {networkOnline ? (
                  <Wifi
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    style={{
                      color: internetMode
                        ? "oklch(0.82 0.15 85)"
                        : "oklch(0.50 0.01 95)",
                    }}
                  />
                ) : (
                  <WifiOff
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    style={{ color: "oklch(0.50 0.01 95)" }}
                  />
                )}
                <span
                  className="text-xs font-medium"
                  style={{
                    color: internetMode
                      ? "oklch(0.82 0.15 85)"
                      : "oklch(0.55 0.01 95)",
                  }}
                >
                  Online
                </span>
                <Switch
                  id="online-toggle"
                  checked={internetMode}
                  onCheckedChange={handleInternetModeToggle}
                  data-ocid="chat.toggle"
                  aria-label={`Online mode is ${internetMode ? "on" : "off"}. Press to ${internetMode ? "switch to offline" : "enable online mode"}`}
                  aria-pressed={internetMode}
                  aria-describedby={statusBadgeId}
                  className="scale-75 origin-right"
                />
              </div>

              <button
                type="button"
                onClick={startNewSession}
                className="p-2.5 rounded-lg transition-colors hover:bg-white/5 min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="New conversation"
                data-ocid="chat.secondary_button"
                style={{ color: "oklch(0.60 0.01 95)" }}
                aria-label="Start new conversation"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                id="clear-history-btn"
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="p-2.5 rounded-lg transition-colors hover:bg-red-500/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Clear all history"
                data-ocid="chat.delete_button"
                style={{ color: "oklch(0.65 0.15 25)" }}
                aria-label="Clear all chat history"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Online Mode info bar */}
          <AnimatePresence>
            {isOnlineActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden flex-shrink-0"
                aria-live="polite"
              >
                <div
                  className="px-5 py-2 flex items-center gap-2 text-xs font-medium"
                  style={{
                    background: "oklch(0.68 0.18 145 / 0.08)",
                    borderBottom: "1px solid oklch(0.68 0.18 145 / 0.2)",
                    color: "oklch(0.68 0.18 145)",
                  }}
                >
                  <Wifi
                    className="w-3.5 h-3.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  ✅ Connected — Gemini 2.0 + live web search active
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div
              className="p-4 space-y-4"
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
              aria-relevant="additions"
            >
              {session.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  data-ocid="chat.row"
                >
                  {msg.role === "ai" && (
                    <div
                      className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5"
                      aria-hidden="true"
                      style={{
                        background: "oklch(0.82 0.15 85 / 0.12)",
                        border: "1px solid oklch(0.82 0.15 85 / 0.25)",
                      }}
                    >
                      <Bot
                        className="w-4 h-4"
                        style={{ color: "oklch(0.82 0.15 85)" }}
                      />
                    </div>
                  )}
                  <div
                    className="flex flex-col gap-0.5"
                    style={{ maxWidth: "85%" }}
                  >
                    <div
                      className="px-4 py-3 rounded-2xl"
                      style={
                        msg.role === "user"
                          ? {
                              background: "oklch(0.82 0.15 85 / 0.18)",
                              border: "1px solid oklch(0.82 0.15 85 / 0.3)",
                              borderBottomRightRadius: "4px",
                            }
                          : {
                              background: "oklch(0.19 0.007 95)",
                              border: "1px solid oklch(0.29 0.007 95)",
                              borderTopLeftRadius: "4px",
                            }
                      }
                    >
                      {msg.role === "user" ? (
                        <p
                          className="text-sm"
                          style={{ color: "oklch(0.92 0.018 82)" }}
                        >
                          {msg.text}
                        </p>
                      ) : (
                        <FormattedMessage text={msg.text} />
                      )}
                      {msg.images && msg.images.length > 0 && (
                        <MessageImages
                          images={msg.images}
                          context={msg.kbEntry?.title ?? msg.text.slice(0, 60)}
                        />
                      )}
                      {msg.kbEntry && (
                        <div
                          className="mt-2 text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1"
                          style={{
                            background: "oklch(0.82 0.15 85 / 0.1)",
                            color: "oklch(0.65 0.12 85)",
                            border: "1px solid oklch(0.82 0.15 85 / 0.2)",
                          }}
                        >
                          <span aria-hidden="true">📚</span>
                          <span>{msg.kbEntry.title}</span>
                        </div>
                      )}
                    </div>
                    <span
                      className="text-xs px-1"
                      style={{
                        color: "oklch(0.45 0.007 95)",
                        textAlign: msg.role === "user" ? "right" : "left",
                      }}
                    >
                      <time dateTime={new Date(msg.timestamp).toISOString()}>
                        {formatTime(msg.timestamp)}
                      </time>
                    </span>
                  </div>
                  {msg.role === "user" && (
                    <div
                      className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ml-2 mt-0.5"
                      aria-hidden="true"
                      style={{
                        background: "oklch(0.82 0.15 85 / 0.12)",
                        border: "1px solid oklch(0.82 0.15 85 / 0.25)",
                      }}
                    >
                      <MessageCircle
                        className="w-4 h-4"
                        style={{ color: "oklch(0.82 0.15 85)" }}
                      />
                    </div>
                  )}
                </div>
              ))}
              {loading && <TypingIndicator />}
            </div>
          </ScrollArea>

          {/* Quick Chips */}
          <AnimatePresence>
            {showQuickChips && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-4 py-3 flex-shrink-0 overflow-x-auto"
                style={{ borderTop: "1px solid oklch(0.24 0.007 95)" }}
                data-ocid="chat.list"
              >
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "oklch(0.55 0.01 95)" }}
                  id="quick-topics-label"
                >
                  Quick topics
                </p>
                <fieldset
                  className="flex flex-wrap gap-2 border-none p-0 m-0"
                  aria-labelledby="quick-topics-label"
                >
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => send(chip)}
                      className="text-xs px-3 py-2.5 rounded-full transition-colors min-h-[44px] hover:opacity-80"
                      style={{
                        background: "oklch(0.23 0.007 95)",
                        border: "1px solid oklch(0.33 0.007 95)",
                        color: "oklch(0.80 0.01 95)",
                      }}
                      data-ocid="chat.tab"
                      aria-label={`Ask about: ${chip}`}
                    >
                      {chip}
                    </button>
                  ))}
                </fieldset>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <div
            className="flex flex-col gap-2 p-4 flex-shrink-0"
            style={{ borderTop: "1px solid oklch(0.27 0.007 95)" }}
          >
            {/* Mic error */}
            {micError && (
              <div
                className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl"
                role="alert"
                style={{
                  background: "oklch(0.65 0.16 27 / 0.12)",
                  border: "1px solid oklch(0.65 0.16 27 / 0.3)",
                  color: "oklch(0.75 0.16 45)",
                }}
                data-ocid="chat.error_state"
              >
                <span className="flex-1">{micError}</span>
                <button
                  type="button"
                  onClick={() => setMicError(null)}
                  className="flex-shrink-0 p-1 rounded"
                  aria-label="Dismiss microphone error"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}

            {/* Listening indicator */}
            {isListening && (
              <motion.div
                className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                aria-live="assertive"
                style={{
                  background: "oklch(0.65 0.16 27 / 0.1)",
                  border: "1px solid oklch(0.65 0.16 27 / 0.25)",
                  color: "oklch(0.75 0.16 27)",
                }}
                data-ocid="chat.loading_state"
              >
                <motion.span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: "oklch(0.65 0.2 27)" }}
                  animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                  transition={{
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
                🎤 Listening... Speak now!
              </motion.div>
            )}

            {/* Input row */}
            <div className="flex gap-2 items-center">
              <Input
                ref={inputRef}
                id="chat-input"
                placeholder={
                  isOnlineActive
                    ? "Ask Gemini anything with internet access..."
                    : "Ask anything — snakebite, CPR, flood, dengue..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="flex-1 text-sm"
                style={{
                  background: "oklch(0.21 0.007 95)",
                  borderColor: isListening
                    ? "oklch(0.65 0.2 27 / 0.6)"
                    : "oklch(0.31 0.007 95)",
                  color: "oklch(0.92 0.01 95)",
                  height: "48px",
                }}
                aria-label="Type your message"
                aria-describedby={statusBadgeId}
                data-ocid="chat.input"
              />

              {isSpeechSupported && (
                <motion.button
                  type="button"
                  onClick={handleMicClick}
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center relative"
                  style={{
                    background: isListening
                      ? "oklch(0.65 0.2 27 / 0.22)"
                      : "oklch(0.24 0.007 95)",
                    border: isListening
                      ? "2px solid oklch(0.65 0.2 27 / 0.6)"
                      : "1px solid oklch(0.34 0.007 95)",
                    color: isListening
                      ? "oklch(0.75 0.2 27)"
                      : "oklch(0.65 0.01 95)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  title={isListening ? "Stop recording" : "Tap to speak"}
                  aria-label={
                    isListening
                      ? "Stop recording"
                      : "Start voice input — tap to speak"
                  }
                  aria-pressed={isListening}
                  data-ocid="chat.toggle"
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Mic className="w-5 h-5" aria-hidden="true" />
                  )}
                  {isListening && (
                    <motion.span
                      className="absolute inset-0 rounded-xl"
                      style={{ border: "2px solid oklch(0.65 0.2 27 / 0.6)" }}
                      animate={{ opacity: [0.8, 0, 0.8], scale: [1, 1.3, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </motion.button>
              )}

              <Button
                type="button"
                className="flex-shrink-0 rounded-xl h-12 px-4 gap-1.5 min-w-[48px] font-semibold transition-all duration-200"
                style={{
                  background:
                    loading || !input.trim()
                      ? "oklch(0.30 0.007 95)"
                      : "oklch(0.82 0.15 85)",
                  color:
                    loading || !input.trim()
                      ? "oklch(0.50 0.01 95)"
                      : "oklch(0.13 0.007 95)",
                }}
                onClick={() => send()}
                disabled={loading || !input.trim()}
                data-ocid="chat.submit_button"
                aria-label="Send message"
                aria-disabled={loading || !input.trim()}
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline text-sm">Send</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
