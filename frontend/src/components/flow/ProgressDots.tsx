import { motion } from "framer-motion";
import { Q_STEPS, useFlowStore, type Step } from "@/store/useFlowStore";

export function ProgressDots() {
  const step = useFlowStore((s) => s.step);
  const idx = Q_STEPS.indexOf(step as Step);
  if (idx < 0) return null;
  return (
    <div className="flex items-center gap-1.5 justify-center">
      {Q_STEPS.map((_, i) => (
        <motion.span
          key={i}
          animate={{
            width: i === idx ? 24 : 6,
            backgroundColor: i <= idx ? "#7c5cff" : "rgba(255,255,255,0.15)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="h-1.5 rounded-full block"
        />
      ))}
    </div>
  );
}
