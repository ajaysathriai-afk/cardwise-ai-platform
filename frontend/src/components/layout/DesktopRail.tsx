import { motion } from "framer-motion";

const LEFT_HIGHLIGHTS = [
  { k: "Explainable AI", v: "Every recommendation comes with transparent scoring across 5 weighted factors." },
  { k: "Reward Simulator", v: "Project your annual cashback or miles based on real spending patterns." },
  { k: "Side-by-side Compare", v: "Benchmark your top 3 cards on fees, lounges, and category rewards." },
];

const RIGHT_HIGHLIGHTS = [
  { k: "47", v: "Curated cards" },
  { k: "5-factor", v: "Scoring engine" },
  { k: "<90s", v: "End-to-end flow" },
  { k: "100%", v: "Client-side, private" },
];

export function DesktopRail({ side }: { side: "left" | "right" }) {
  return (
    <aside className="sticky top-0 h-svh px-10 py-16 flex flex-col justify-between">
      {side === "left" ? (
        <>
          <div>
            <div className="flex items-center gap-2 mb-12">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#2dd4a8] flex items-center justify-center font-bold">C</div>
              <div>
                <div className="font-semibold tracking-tight">CardWise AI</div>
                <div className="text-[10px] text-muted-foreground tracking-widest uppercase">Credit card intelligence</div>
              </div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-semibold tracking-tight text-gradient mb-3 leading-tight"
            >
              The smartest way to pick your next card.
            </motion.h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-xs">
              An explainable AI engine that turns your spend, lifestyle, and priorities into a card match you can trust.
            </p>
            <div className="space-y-5">
              {LEFT_HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.k}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="border-l-2 border-[var(--accent)]/40 pl-4"
                >
                  <div className="text-xs tracking-widest uppercase text-[var(--accent)] mb-1">{h.k}</div>
                  <div className="text-sm text-foreground/85 leading-relaxed">{h.v}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">
            v1.0 · Portfolio build
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="text-xs tracking-widest uppercase text-muted-foreground mb-6">Why CardWise</div>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {RIGHT_HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.k}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="rounded-2xl bg-[var(--surface)] border border-white/8 p-4"
                >
                  <div className="mono text-xl font-semibold text-gradient">{h.k}</div>
                  <div className="text-[11px] text-muted-foreground tracking-wide mt-1">{h.v}</div>
                </motion.div>
              ))}
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[var(--accent)]/15 to-transparent border border-[var(--accent)]/20 p-5">
              <div className="text-[10px] text-[var(--accent)] tracking-widest uppercase mb-2">Built for fintech UX</div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                A conversational, mobile-first flow extended into a premium desktop experience — no forms, no friction.
              </p>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">
            Private by design · No data sold
          </div>
        </>
      )}
    </aside>
  );
}
