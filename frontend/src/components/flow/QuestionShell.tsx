import { motion } from "framer-motion";
import { ProgressDots } from "./ProgressDots";
import { useFlowStore } from "@/store/useFlowStore";

interface QuestionShellProps {
  eyebrow: string;
  question: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext?: () => void;
  canNext?: boolean;
  nextLabel?: string;
}

export function QuestionShell({
  eyebrow, question, subtitle, children, onNext, canNext = true, nextLabel = "Continue",
}: QuestionShellProps) {
  const back = useFlowStore((s) => s.back);
  return (
    <motion.div
      key={eyebrow}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      className="flex flex-col min-h-svh px-6 pt-6 pb-32"
    >
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={back}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <ProgressDots />
        <div className="w-10" />
      </div>

      <div className="mb-2">
        <span className="text-xs font-medium text-[var(--accent)] tracking-widest uppercase">{eyebrow}</span>
      </div>
      <h1 className="text-[28px] leading-tight font-semibold tracking-tight mb-2">{question}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>}
      {!subtitle && <div className="mb-6" />}

      <div className="flex-1 space-y-3">{children}</div>

      {onNext && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed inset-x-0 bottom-0 px-6 pb-6 pt-4 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={!canNext}
            onClick={onNext}
            className="w-full h-14 rounded-2xl bg-[var(--accent)] text-white font-semibold text-base disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            style={canNext ? { boxShadow: "0 10px 40px -10px rgba(124,92,255,0.6)" } : undefined}
          >
            {nextLabel} →
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
