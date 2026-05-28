import { motion } from "framer-motion";
import { useFlowStore } from "@/store/useFlowStore";
import { TrustRibbon } from "./TrustRibbon";

export function Hero() {
  const next = useFlowStore((s) => s.next);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-svh flex flex-col px-6 pt-16 pb-10 overflow-hidden"
    >
      <TrustRibbon />
      {/* Violet glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#2dd4a8] opacity-10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-auto pt-8"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[#2dd4a8] flex items-center justify-center font-bold text-sm">C</div>
        <span className="text-sm font-semibold tracking-wide">CardWise AI</span>
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">· credit card intelligence</span>
      </motion.div>

      <div className="relative z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span className="text-xs text-muted-foreground">AI-powered, just for you</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[44px] leading-[1.05] font-semibold tracking-tight text-gradient mb-5"
        >
          Find the <em className="not-italic font-serif italic" style={{ color: "#b9a8ff" }}>one</em><br/>credit card that<br/>actually fits your life.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[15px] text-muted-foreground leading-relaxed mb-10 max-w-sm"
        >
          A 90-second conversation. No forms, no signup. Our AI matches you to the perfect card from 47 curated options.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.97 }}
          onClick={next}
          className="w-full h-16 rounded-2xl bg-[var(--accent)] text-white font-semibold text-base glow-violet mb-4"
        >
          Find my card →
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <span>⏱ ~90 seconds</span>
          <span>·</span>
          <span>No signup needed</span>
          <span>·</span>
          <span>Free</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative z-10 mt-12 pt-6 border-t border-white/5"
      >
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>
            <div className="mono text-foreground text-base">2.4M+</div>
            <div>matched users</div>
          </div>
          <div>
            <div className="mono text-foreground text-base">94%</div>
            <div>approval rate</div>
          </div>
          <div>
            <div className="mono text-foreground text-base">4.8 ★</div>
            <div>rated by users</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
