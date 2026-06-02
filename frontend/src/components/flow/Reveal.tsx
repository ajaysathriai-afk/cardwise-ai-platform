import { fetchRecommendation } from "@/lib/api";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useFlowStore } from "@/store/useFlowStore";
import type { Recommendation } from "@/lib/recommend";
import { CardVisual } from "@/components/card/CardVisual";
import { ConfidencePill } from "@/components/card/ConfidencePill";
import { ReasonAccordion } from "@/components/card/ReasonAccordion";
import { CompareSheet } from "./CompareSheet";
import { CardDetailSheet } from "./CardDetailSheet";
import { OtpSheet } from "./OtpSheet";

export function Reveal() {
  const answers = useFlowStore((s) => s.answers);
  const save = useFlowStore((s) => s.save);
  const saved = useFlowStore((s) => s.saved);
  const [top, setTop] = useState<any>(null);
  const [alts, setAlts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [compareOpen, setCompareOpen] = useState(false);
  const [detail, setDetail] = useState<Recommendation | null>(null);
  const [otpOpen, setOtpOpen] = useState(false);
  useEffect(() => {
    async function loadRecommendation() {
      try {
        setLoading(true);
  
        const res = await fetchRecommendation(answers);
  
        setTop(res.top);
        setAlts(res.alts || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    loadRecommendation();
  }, [answers]);

  if (loading || !top) {
    return (
      <div className="flex items-center justify-center min-h-svh">
        Loading recommendations...
      </div>
    );
  }

  const isSaved = saved.includes(top.card.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-svh px-6 pt-8 pb-24 relative"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px] pointer-events-none" style={{ background: top.card.accent }} />

      <div className="relative">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-2">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Your perfect match</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-3xl font-semibold text-center tracking-tight mb-3 text-gradient"
        >
          {top.card.name}
        </motion.h1>
        <div className="flex justify-center mb-8">
          <ConfidencePill value={top.confidence} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.2 }}
          className="mb-8"
        >
          <CardVisual card={top.card} size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-2 mb-8"
        >
          {[
            ["Annual fee", `₹${top.card.annualFee.toLocaleString("en-IN")}`],
            ["Est. rewards", `₹${top.estAnnualReward.toLocaleString("en-IN")}/yr`],
            ["Lounge", top.card.loungeIntl >= 99 ? "Unlimited" : top.card.loungeDomestic >= 99 ? `Unlim. dom.` : `${top.card.loungeDomestic}/yr`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-[var(--surface)] border border-white/8 px-3 py-3 text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{k}</div>
              <div className="mono text-sm font-semibold">{v}</div>
            </div>
          ))}
        </motion.div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium tracking-wide">Why this card fits you</h3>
            <span className="text-[10px] text-[var(--accent)] uppercase tracking-widest">AI-generated</span>
          </div>
          <ReasonAccordion reasons={top.reasons} />
        </div>

        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          onClick={() => setCompareOpen(true)}
          className="w-full mb-3 h-12 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/8 transition-colors"
        >
          Compare with {alts.length} alternatives ↑
        </motion.button>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => {
              if (!isSaved) {
                save(top.card.id);
                toast.success("Saved to your dashboard", { description: top.card.name });
              }
            }}
            className="h-14 rounded-2xl border border-white/15 bg-white/5 font-semibold text-sm hover:bg-white/10 transition-colors"
          >
            {isSaved ? "✓ Saved" : "Save for later"}
          </button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setOtpOpen(true)}
            className="h-14 rounded-2xl bg-[var(--accent)] text-white font-semibold text-sm glow-violet"
          >
            Apply now →
          </motion.button>
        </div>

        <button onClick={() => setDetail(top)} className="w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline py-2">
          See full benefits & reward simulator
        </button>
      </div>

      <CompareSheet open={compareOpen} onClose={() => setCompareOpen(false)} top={top} alts={alts} />
      <CardDetailSheet rec={detail} onClose={() => setDetail(null)} onApply={() => { setDetail(null); setOtpOpen(true); }} />
      <OtpSheet open={otpOpen} onClose={() => setOtpOpen(false)} card={top.card} />
    </motion.div>
  );
}
