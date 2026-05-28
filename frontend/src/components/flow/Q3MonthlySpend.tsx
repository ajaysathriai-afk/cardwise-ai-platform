import { useFlowStore } from "@/store/useFlowStore";
import { QuestionShell } from "./QuestionShell";
import { motion } from "framer-motion";

const ANCHORS = [10000, 25000, 50000, 100000, 200000];

export function Q3MonthlySpend() {
  const spend = useFlowStore((s) => s.answers.monthlySpend);
  const update = useFlowStore((s) => s.update);
  const next = useFlowStore((s) => s.next);
  const fmt = (n: number) => `₹${(n / 1000).toFixed(0)}k${n >= 100000 ? "+" : ""}`;
  return (
    <QuestionShell
      eyebrow="03 — Spend volume"
      question="Roughly, your monthly card spend?"
      subtitle="Approximate — we'll use this to estimate your yearly rewards."
      onNext={next}
    >
      <div className="rounded-3xl bg-[var(--surface)] border border-white/8 p-8 text-center">
        <motion.div
          key={spend}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="mono text-5xl font-semibold mb-2"
        >
          {fmt(spend)}
        </motion.div>
        <div className="text-xs text-muted-foreground mb-8 tracking-widest uppercase">per month</div>
        <input
          type="range"
          min={5000}
          max={300000}
          step={5000}
          value={spend}
          onChange={(e) => update("monthlySpend", Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
          style={{ accentColor: "#7c5cff" }}
        />
        <div className="flex justify-between mt-3 text-[10px] text-muted-foreground mono">
          <span>₹5k</span><span>₹3L</span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 mt-4">
        {ANCHORS.map((a) => (
          <button
            key={a}
            onClick={() => update("monthlySpend", a)}
            className={`py-2 rounded-xl text-xs mono border transition-colors ${spend === a ? "border-[var(--accent)] bg-[var(--accent)]/10 text-white" : "border-white/8 bg-[var(--surface)] text-muted-foreground"}`}
          >
            {fmt(a)}
          </button>
        ))}
      </div>
    </QuestionShell>
  );
}
