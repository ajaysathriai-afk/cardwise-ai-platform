import { motion } from "framer-motion";
import { useFlowStore } from "@/store/useFlowStore";
import { CARDS, type Card, type SpendCategory } from "@/data/cards";
import { CardVisual } from "@/components/card/CardVisual";

function projectAnnualReward(
  card: any,
  monthlySpend: number
) {
  return Math.round(monthlySpend * 12 * 0.03);
}


export function Dashboard() {
  const saved = useFlowStore((s) => s.saved);
  const applied = useFlowStore((s) => s.applied);
  const recommendedCard = useFlowStore(
    (s) => s.recommendedCard
  );

  const answers = useFlowStore((s) => s.answers);
  const reset = useFlowStore((s) => s.reset);
  const appliedCard = recommendedCard;
  console.log("SAVED IDS =", saved);
  console.log("APPLIED =", applied);
  console.log("RECOMMENDED =", recommendedCard);

const savedCards = [];
  const portfolio = [appliedCard, ...savedCards].filter(Boolean) as Card[];

  const totalProjected = portfolio.reduce(
    (sum, c) => sum + projectAnnualReward(
      c,
      answers.monthlySpend
    ),
    0
  );
  const totalFees = portfolio.reduce((s, c) => s + c.annualFee, 0);
  const netValue = totalProjected - totalFees;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-svh px-6 lg:px-10 pt-10 pb-20"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs text-muted-foreground tracking-widest uppercase">CardWise · your wallet</div>
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        <button onClick={reset} className="text-xs px-4 py-2 rounded-full border border-white/15 hover:bg-white/5 transition-colors">
          New search
        </button>
      </div>

      {portfolio.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-2 mb-8"
        >
          {[
            ["Projected rewards", `₹${(totalProjected / 1000).toFixed(0)}k/yr`, "var(--success)"],
            ["Annual fees", `₹${(totalFees / 1000).toFixed(1)}k/yr`, "var(--muted-foreground)"],
            ["Net value", `${netValue >= 0 ? "+" : ""}₹${Math.round(netValue / 1000)}k`, "var(--accent)"],
          ].map(([k, v, color]) => (
            <div key={k} className="rounded-2xl bg-[var(--surface)] border border-white/8 px-3 py-4 text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{k}</div>
              <div className="mono text-sm font-semibold" style={{ color }}>{v}</div>
            </div>
          ))}
        </motion.div>
      )}

      {appliedCard && (
        <div className="mb-8">
          <div className="text-xs text-muted-foreground tracking-widest uppercase mb-3">Application in progress</div>
          <div className="rounded-3xl bg-[var(--surface)] border border-white/8 p-5">
            <div className="mb-4"><CardVisual card={appliedCard} size="md" interactive={false} /></div>
            <div className="font-semibold">{appliedCard.name}</div>
            <div className="text-xs text-muted-foreground mb-4">{appliedCard.tier}</div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
              <span className="text-sm">Application submitted</span>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground pl-5">
              <div>✓ Pre-filled with your details</div>
              <div>● Issuer review (typically &lt;24h)</div>
              <div className="opacity-50">○ Card dispatched</div>
            </div>
          </div>
        </div>
      )}
      
      {savedCards.length > 0 && (
        <div className="mb-8">
          <div className="text-xs text-muted-foreground tracking-widest uppercase mb-3">Saved · projected returns</div>
          <div className="space-y-3">
            {savedCards.map((c) => {
              const reward = projectAnnualReward(
                c,
                answers.monthlySpend
              );
              return (
                <div key={c.id} className="flex items-center gap-4 p-3 rounded-2xl bg-[var(--surface)] border border-white/8 hover:border-white/15 transition-colors">
                  <CardVisual card={c} size="sm" interactive={false} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.tier}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="mono text-sm font-semibold text-[var(--success)]">₹{(reward / 1000).toFixed(0)}k</div>
                    <div className="text-[10px] text-muted-foreground tracking-wide">/ year</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-gradient-to-br from-[var(--accent)]/15 to-transparent border border-[var(--accent)]/20 p-5">
        <div className="text-xs text-[var(--accent)] tracking-widest uppercase mb-2">Coming next</div>
        <div className="font-medium mb-1">Quarterly re-ranking</div>
        <p className="text-sm text-muted-foreground">
          CardWise AI will re-analyze your spend every 90 days and nudge you if a better card opens up.
        </p>
      </div>

      {!appliedCard && savedCards.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No saved cards yet.
        </div>
      )}
    </motion.div>
  );
}
