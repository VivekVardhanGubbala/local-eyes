import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAddTriageRecord, useTriageRecords } from "../hooks/useQueries";
import { TriageStatus } from "../types/localTypes";

type TriageStep = {
  question: string;
  yes: string | TriageStatus;
  no: string | TriageStatus;
};

const STEPS: Record<string, TriageStep> = {
  start: {
    question: "Is the patient walking on their own?",
    yes: TriageStatus.minor,
    no: "breathing",
  },
  breathing: {
    question: "Is the patient breathing?",
    yes: "pulse",
    no: TriageStatus.deceased,
  },
  pulse: {
    question: "Is the pulse present and radial (wrist)?",
    yes: "bleeding",
    no: TriageStatus.immediate,
  },
  bleeding: {
    question: "Can major bleeding be controlled?",
    yes: TriageStatus.delayed,
    no: TriageStatus.immediate,
  },
};

const STATUS_CONFIG: Record<
  TriageStatus,
  { label: string; color: string; desc: string }
> = {
  [TriageStatus.immediate]: {
    label: "IMMEDIATE",
    color: "oklch(0.48 0.16 25)",
    desc: "Life-threatening. Act NOW.",
  },
  [TriageStatus.delayed]: {
    label: "DELAYED",
    color: "oklch(0.82 0.15 85)",
    desc: "Serious but stable. Treat soon.",
  },
  [TriageStatus.minor]: {
    label: "MINOR",
    color: "oklch(0.65 0.18 145)",
    desc: "Walking wounded. Non-critical.",
  },
  [TriageStatus.deceased]: {
    label: "DECEASED",
    color: "oklch(0.40 0.007 95)",
    desc: "No signs of life detected.",
  },
  [TriageStatus.minimal]: {
    label: "MINIMAL",
    color: "oklch(0.65 0.18 145)",
    desc: "Minor injuries only.",
  },
  [TriageStatus.expectant]: {
    label: "EXPECTANT",
    color: "oklch(0.40 0.007 95)",
    desc: "Unsurvivable injuries.",
  },
};

const STATUS_COLORS: Record<TriageStatus, string> = {
  [TriageStatus.immediate]: "oklch(0.48 0.16 25)",
  [TriageStatus.delayed]: "oklch(0.82 0.15 85)",
  [TriageStatus.minor]: "oklch(0.65 0.18 145)",
  [TriageStatus.deceased]: "oklch(0.40 0.007 95)",
  [TriageStatus.minimal]: "oklch(0.65 0.18 145)",
  [TriageStatus.expectant]: "oklch(0.40 0.007 95)",
};

export function TriageCard() {
  const { data: records = [], isLoading } = useTriageRecords();
  const { mutate: addRecord, isPending } = useAddTriageRecord();
  const [mode, setMode] = useState<"idle" | "triage" | "log">("idle");
  const [step, setStep] = useState<string>("start");
  const [result, setResult] = useState<TriageStatus | null>(null);
  const [patientId, setPatientId] = useState(String(Date.now()));

  function answer(choice: "yes" | "no") {
    const current = STEPS[step];
    const next = current[choice];
    if (Object.values(TriageStatus).includes(next as TriageStatus)) {
      setResult(next as TriageStatus);
    } else {
      setStep(next as string);
    }
  }

  function saveAndReset() {
    if (!result) return;
    addRecord({
      patientId,
      status: result,
      notes: "START triage via Local-Eyes",
      timestamp: BigInt(Date.now()),
      symptoms: [],
    });
    setMode("idle");
    setStep("start");
    setResult(null);
    setPatientId(String(Date.now()));
  }

  function resetTriage() {
    setMode("idle");
    setStep("start");
    setResult(null);
  }

  return (
    <div
      className="rounded-2xl border border-border flex flex-col overflow-hidden card-glow"
      style={{ background: "oklch(0.22 0.007 95)" }}
      id="triage"
      aria-labelledby="triage-heading"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-display font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.65 0.18 145 / 0.15)",
              color: "oklch(0.65 0.18 145)",
            }}
            aria-hidden="true"
          >
            Medical
          </span>
          <h2
            id="triage-heading"
            className="font-display font-bold uppercase tracking-wide text-sm text-foreground"
          >
            Triage
          </h2>
        </div>
        {(isLoading || isPending) && (
          <Loader2
            className="w-4 h-4 animate-spin text-muted-foreground"
            data-ocid="triage.loading_state"
            role="status"
            aria-label="Loading triage data..."
          />
        )}
      </div>

      <div className="flex-1 p-4">
        <AnimatePresence mode="wait">
          {mode === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Use the START protocol to rapidly classify casualties. Answer 4
                questions to determine priority.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(STATUS_CONFIG).map(([status, cfg]) => (
                  <div
                    key={status}
                    className="flex items-center gap-2 p-2 rounded-lg border border-border"
                    style={{ background: "oklch(0.18 0.007 95)" }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: cfg.color }}
                    />
                    <span
                      className="text-xs font-display font-bold"
                      style={{ color: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-auto">
                <Button
                  className="flex-1 font-display font-bold uppercase tracking-wider rounded-xl"
                  style={{
                    background: "oklch(0.82 0.15 85)",
                    color: "oklch(0.13 0.007 95)",
                  }}
                  onClick={() => {
                    setMode("triage");
                    setStep("start");
                    setResult(null);
                  }}
                  data-ocid="triage.primary_button"
                >
                  Start Triage
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 font-display font-bold uppercase tracking-wider rounded-xl border-border text-foreground hover:bg-accent"
                  onClick={() => setMode("log")}
                  data-ocid="triage.secondary_button"
                >
                  Triage Log
                </Button>
              </div>
            </motion.div>
          )}

          {mode === "triage" && !result && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">
                  START Protocol
                </span>
                <button
                  type="button"
                  onClick={resetTriage}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-accent"
                  data-ocid="triage.close_button"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div
                  className="p-4 rounded-xl border border-border mb-6"
                  style={{ background: "oklch(0.18 0.007 95)" }}
                >
                  <p className="text-base font-body font-medium text-foreground">
                    {STEPS[step]?.question}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    className="rounded-xl font-display font-bold uppercase"
                    style={{
                      background: "oklch(0.65 0.18 145)",
                      color: "oklch(0.13 0.007 95)",
                    }}
                    onClick={() => answer("yes")}
                    data-ocid="triage.confirm_button"
                    aria-label="Answer Yes"
                  >
                    YES
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl font-display font-bold uppercase border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => answer("no")}
                    data-ocid="triage.cancel_button"
                    aria-label="Answer No"
                  >
                    NO
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {mode === "triage" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center"
              aria-live="assertive"
              aria-label="Triage result"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 font-display font-extrabold text-lg"
                style={{
                  background: `${STATUS_COLORS[result].slice(0, -1)} / 0.15)`,
                  border: `2px solid ${STATUS_COLORS[result]}`,
                  color: STATUS_COLORS[result],
                }}
              >
                {STATUS_CONFIG[result].label.slice(0, 2)}
              </div>
              <h4
                className="font-display font-extrabold uppercase tracking-wider text-xl mb-1"
                style={{ color: STATUS_COLORS[result] }}
              >
                {STATUS_CONFIG[result].label}
              </h4>
              <p className="text-sm text-muted-foreground mb-6">
                {STATUS_CONFIG[result].desc}
              </p>
              <div className="flex gap-3 w-full">
                <Button
                  className="flex-1 rounded-xl font-display font-bold uppercase"
                  style={{
                    background: "oklch(0.82 0.15 85)",
                    color: "oklch(0.13 0.007 95)",
                  }}
                  onClick={saveAndReset}
                  disabled={isPending}
                  data-ocid="triage.save_button"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Save & Next"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl border-border"
                  onClick={resetTriage}
                  data-ocid="triage.close_button"
                >
                  Discard
                </Button>
              </div>
            </motion.div>
          )}

          {mode === "log" && (
            <motion.div
              key="log"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-display font-bold uppercase tracking-wider text-foreground">
                  Triage Records
                </span>
                <button
                  type="button"
                  onClick={() => setMode("idle")}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-accent"
                  data-ocid="triage.close_button"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <ScrollArea className="flex-1 h-48">
                {records.length === 0 && (
                  <div
                    className="flex items-center justify-center py-8 text-muted-foreground"
                    data-ocid="triage.empty_state"
                  >
                    <p className="text-sm">No triage records yet</p>
                  </div>
                )}
                {records.map((r, i) => (
                  <div
                    key={`${r.patientId}-${i}`}
                    className="flex items-center gap-3 p-2.5 rounded-xl mb-1 border border-border"
                    style={{ background: "oklch(0.18 0.007 95)" }}
                    data-ocid={`triage.item.${i + 1}`}
                  >
                    <Badge
                      className="text-xs border-0"
                      style={{
                        background: `${STATUS_COLORS[r.status].slice(0, -1)} / 0.15)`,
                        color: STATUS_COLORS[r.status],
                      }}
                    >
                      {r.status as string}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-body text-foreground truncate">
                        ID: {r.patientId}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(Number(r.timestamp)).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
