import { BottomSheet } from "@/components/ui/BottomSheet";
import { CardVisual } from "@/components/card/CardVisual";
import type { Recommendation } from "@/lib/recommend";

interface Props {
  open: boolean;
  onClose: () => void;
  top: Recommendation;
  alts: Recommendation[];
}

export function CompareSheet({ open, onClose, top, alts }: Props) {
  const all = [top, ...alts];
  const rows: [string, (r: Recommendation) => string][] = [
    ["Match", (r) => `${r.confidence}%`],
    ["Annual fee", (r) => `₹${r.card.annualFee.toLocaleString("en-IN")}`],
    ["Est. rewards / yr", (r) => `₹${r.estAnnualReward.toLocaleString("en-IN")}`],
    ["Lounge (dom.)", (r) => (r.card.loungeDomestic >= 99 ? "Unlimited" : `${r.card.loungeDomestic}`)],
    ["Lounge (intl.)", (r) => (r.card.loungeIntl >= 99 ? "Unlimited" : `${r.card.loungeIntl}`)],
    ["Forex markup", (r) => `${r.card.forexMarkup}%`],
    ["Reward type", (r) => r.card.rewardCurrency],
  ];
  return (
    <BottomSheet open={open} onClose={onClose} title="Compare top picks">
      <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: `repeat(${all.length}, minmax(0,1fr))` }}>
        {all.map((r, i) => (
          <div key={r.card.id} className="space-y-2 text-center">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
              {i === 0 ? "Top pick" : `Alt ${i}`}
            </div>
            <div className="flex justify-center"><CardVisual card={r.card} size="sm" interactive={false} /></div>
            <div className="text-xs font-medium leading-tight">{r.card.name}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-[var(--surface-2)] border border-white/8 overflow-hidden">
        {rows.map(([label, fn], idx) => (
          <div key={label} className={`grid gap-2 px-3 py-3 text-xs ${idx % 2 ? "bg-white/[0.02]" : ""}`} style={{ gridTemplateColumns: `90px repeat(${all.length}, minmax(0,1fr))` }}>
            <div className="text-muted-foreground">{label}</div>
            {all.map((r, i) => (
              <div key={r.card.id} className={`mono text-center ${i === 0 ? "text-[var(--accent)] font-semibold" : "text-foreground/90"}`}>{fn(r)}</div>
            ))}
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
