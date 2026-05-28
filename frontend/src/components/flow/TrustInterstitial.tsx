import { motion } from "framer-motion";
import { useFlowStore } from "@/store/useFlowStore";

export function TrustInterstitial() {
  const next = useFlowStore((s) => s.next);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-svh flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--accent)] to-[#2dd4a8] flex items-center justify-center mb-8 glow-violet"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-semibold tracking-tight mb-4 max-w-xs"
      >
        We don't sell your data.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="text-muted-foreground max-w-sm mb-10 leading-relaxed"
      >
        Your answers stay on your device until you choose to apply. We earn only if a card actually fits you — never on bad recommendations.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-3 mb-10 text-left w-full max-w-sm"
      >
        {[
          ["🔒", "RBI-aligned & encrypted end-to-end"],
          ["🧠", "AI explains every recommendation — no black box"],
          ["🚫", "No spam calls. Phone asked only after reveal."],
        ].map(([i, t]) => (
          <div key={t} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-lg">{i}</span>
            <span className="text-sm">{t}</span>
          </div>
        ))}
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        whileTap={{ scale: 0.97 }}
        onClick={next}
        className="w-full max-w-sm h-14 rounded-2xl bg-white text-black font-semibold"
      >
        Got it, continue →
      </motion.button>
    </motion.div>
  );
}
