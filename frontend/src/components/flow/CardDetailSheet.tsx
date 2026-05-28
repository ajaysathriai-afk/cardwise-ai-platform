import { BottomSheet } from "@/components/ui/BottomSheet";
import { CardVisual } from "@/components/card/CardVisual";
import { RewardSimulator } from "@/components/card/RewardSimulator";
import type { Recommendation } from "@/lib/recommend";

interface Props { rec: Recommendation | null; onClose: () => void; onApply: () => void; }

export function CardDetailSheet({ rec, onClose, onApply }: Props) {
  return (
    <BottomSheet open={!!rec} onClose={onClose} title={rec?.card.name}>
      {rec && (
        <div className="space-y-6">
          <div className="px-4"><CardVisual card={rec.card} size="md" interactive={false} /></div>
          <div>
            <h4 className="text-sm font-medium mb-3">Top perks</h4>
            <div className="space-y-2">
              {rec.card.topPerks.map((p) => (
                <div key={p} className="flex gap-3 px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-white/5 text-sm">
                  <span className="text-[var(--success)]">✓</span><span>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <RewardSimulator card={rec.card} />
          <div>
            <h4 className="text-sm font-medium mb-3">Fees & eligibility</h4>
            <div className="rounded-2xl bg-[var(--surface-2)] border border-white/8 divide-y divide-white/5">
              {[
                ["Joining fee", `₹${rec.card.joiningFee.toLocaleString("en-IN")}`],
                ["Annual fee", `₹${rec.card.annualFee.toLocaleString("en-IN")}`],
                ["Fee waiver", rec.card.feeWaiverSpend ? `Spend ₹${(rec.card.feeWaiverSpend/100000).toFixed(1)}L/yr` : "—"],
                ["Min income", `₹${(rec.card.minIncome/100000).toFixed(1)}L per year`],
                ["Forex markup", `${rec.card.forexMarkup}%`],
              ].map(([k,v]) => (
                <div key={k} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-muted-foreground">{k}</span><span className="mono">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={onApply} className="w-full h-14 rounded-2xl bg-[var(--accent)] text-white font-semibold glow-violet">
            Apply now →
          </button>
        </div>
      )}
    </BottomSheet>
  );
}
