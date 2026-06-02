import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Card } from "@/data/cards";
import { useRef } from "react";

interface Props { card: Card; size?: "lg" | "md" | "sm"; interactive?: boolean; }

export function CardVisual({ card, size = "lg", interactive = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [-50, 50], [10, -10]);
  const rotateY = useTransform(sx, [-50, 50], [-10, 10]);

  const dims = size === "lg" ? "w-full aspect-[1.586/1]" : size === "md" ? "w-56 aspect-[1.586/1]" : "w-36 aspect-[1.586/1]";

  function handleMove(e: React.PointerEvent) {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  }
  function handleLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        background: `linear-gradient(135deg, ${card.accent}44 0%, #0a0a14 100%)`,
      }}
      className={`${dims} rounded-2xl relative overflow-hidden border border-white/10 shadow-2xl`}
    >
      {/* Highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.22), transparent 55%)" }}
      />
      {/* Sheen */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)" }}
      />
      {/* Chip */}
      <div className="absolute top-5 left-5 w-10 h-7 rounded-md bg-gradient-to-br from-yellow-200/80 to-yellow-600/60 border border-yellow-100/30" />
      {/* Logo */}
      <div className="absolute top-5 right-5 text-white/90 font-semibold text-xs tracking-widest">
        {card.name.split(" ")[0].toUpperCase()}
      </div>
      {/* Name */}
      <div className="absolute bottom-5 left-5 right-5">
      <div className="text-[10px] text-white/60 tracking-[0.2em] uppercase mb-1">
        {card.rewardCurrency || "PREMIUM"}
      </div>
      <div className="text-white font-semibold text-lg leading-tight">{card.name}</div>
      </div>
      {/* Network */}
      <div className="absolute bottom-5 right-5 flex gap-1">
        <div className="w-4 h-4 rounded-full bg-red-500/80" />
        <div className="w-4 h-4 rounded-full bg-yellow-400/80 -ml-2" />
      </div>
    </motion.div>
  );
}
