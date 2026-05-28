import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function ReasonAccordion({ reasons }: { reasons: string[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-2">
      {reasons.map((r, i) => (
        <motion.button
          key={i}
          onClick={() => setOpen(open === i ? -1 : i)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="w-full text-left px-5 py-4 rounded-2xl bg-[var(--surface)] border border-white/8 hover:border-white/15 transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div className="flex-1">
              <AnimatePresence initial={false}>
                {open === i ? (
                  <motion.p
                    key="full"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-sm leading-relaxed text-foreground/90 overflow-hidden"
                  >
                    {r}
                  </motion.p>
                ) : (
                  <motion.p
                    key="short"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-foreground/80 line-clamp-1"
                  >
                    {r}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
