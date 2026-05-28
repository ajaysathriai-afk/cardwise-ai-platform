import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export function ConfidencePill({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  useEffect(() => { const c = animate(count, value, { duration: 1.2, ease: "easeOut" }); return c.stop; }, [value, count]);
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.4 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/40"
      style={{ boxShadow: "0 0 30px -5px rgba(124,92,255,0.5)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
      <span className="text-xs font-medium text-[var(--accent)] tracking-wide">
        <motion.span className="mono">{rounded}</motion.span>% match
      </span>
    </motion.div>
  );
}
