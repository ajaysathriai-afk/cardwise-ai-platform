import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFlowStore } from "@/store/useFlowStore";

export function ExitIntentModal() {
  const step = useFlowStore((s) => s.step);
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!["q1","q2","q3","q4","q5","q6","q7"].includes(step) || shown) return;
    function handler(e: MouseEvent) {
      if (e.clientY < 10) { setOpen(true); setShown(true); }
    }
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [step, shown]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-[70] max-w-sm mx-auto rounded-3xl bg-[var(--surface)] border border-white/10 p-6"
          >
            <div className="text-3xl mb-3">⏳</div>
            <h3 className="text-xl font-semibold mb-2">You're 60 seconds away.</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Your perfect card is just a few taps away. Don't leave the rewards on the table.
            </p>
            <div className="space-y-2">
              <button onClick={() => setOpen(false)} className="w-full h-12 rounded-xl bg-[var(--accent)] text-white font-medium">
                Continue where I left off
              </button>
              <button onClick={() => setOpen(false)} className="w-full h-12 rounded-xl text-muted-foreground text-sm">
                No thanks
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
