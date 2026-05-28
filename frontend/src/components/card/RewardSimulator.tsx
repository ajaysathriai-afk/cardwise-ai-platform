import { useState } from "react";
import type { Card } from "@/data/cards";
import { motion } from "framer-motion";

export function RewardSimulator({ card }: { card: Card }) {
  const [spend, setSpend] = useState(50000);
  const avg =
    (Object.values(card.rewardsRate).reduce((a, b) => a + b, 0)) /
    Math.max(1, Object.values(card.rewardsRate).length);
  const yearly = Math.round(spend * 12 * (avg / 100));
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-white/8 p-5">
      <div className="text-xs text-muted-foreground tracking-widest uppercase mb-3">Reward simulator</div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm text-muted-foreground">If you spend</span>
        <span className="mono font-semibold">₹{(spend / 1000).toFixed(0)}k / mo</span>
      </div>
      <input
        type="range" min={5000} max={300000} step={5000}
        value={spend} onChange={(e) => setSpend(Number(e.target.value))}
        className="w-full" style={{ accentColor: "#7c5cff" }}
      />
      <motion.div
        key={yearly}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 pt-4 border-t border-white/5 flex items-baseline justify-between"
      >
        <span className="text-sm text-muted-foreground">You'd earn</span>
        <span className="mono text-2xl font-semibold text-[var(--success)]">
          ₹{yearly.toLocaleString("en-IN")}<span className="text-xs text-muted-foreground ml-1">/ yr</span>
        </span>
      </motion.div>
    </div>
  );
}
