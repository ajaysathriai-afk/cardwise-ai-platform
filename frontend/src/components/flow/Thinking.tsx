import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFlowStore } from "@/store/useFlowStore";

const LINES = [
  "Scanning 47 cards across our network…",
  "Matching reward rates to your spend…",
  "Checking eligibility & fee waivers…",
  "Ranking by your stated priority…",
  "Composing your personal reasoning…",
];

export function Thinking() {
  const next = useFlowStore((s) => s.next);
  const [line, setLine] = useState(0);
  useEffect(() => {
    const t1 = setInterval(() => setLine((l) => Math.min(l + 1, LINES.length - 1)), 700);
    const t2 = setTimeout(next, 12000);
    return () => { clearInterval(t1); clearTimeout(t2); };
  }, [next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-svh flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[var(--accent)] opacity-20 blur-[120px] animate-pulse" />
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-2 border-white/5 border-t-[var(--accent)]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 rounded-full border-2 border-white/5 border-b-[#2dd4a8]"
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">✨</div>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold mt-10 mb-8"
      >
        Analyzing for you…
      </motion.h2>
      <div className="space-y-2 w-full max-w-xs">
        {LINES.map((l, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: i <= line ? 1 : 0.25, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <span className={i < line ? "text-[var(--success)]" : i === line ? "text-[var(--accent)]" : "text-white/20"}>
              {i < line ? "✓" : i === line ? "●" : "○"}
            </span>
            <span className={i <= line ? "text-foreground/90" : ""}>{l}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
