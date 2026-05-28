import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChipProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function Chip({ selected, onClick, children, className, icon }: ChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "relative w-full text-left px-5 py-4 rounded-2xl border transition-colors",
        "flex items-center gap-3",
        selected
          ? "border-[var(--accent)] bg-[var(--accent)]/10 text-foreground"
          : "border-white/8 bg-[var(--surface)] hover:bg-[var(--surface-2)] text-foreground/90",
        className,
      )}
      style={selected ? { boxShadow: "0 0 0 1px rgba(124,92,255,0.4), 0 0 30px -10px rgba(124,92,255,0.5)" } : undefined}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span className="flex-1 font-medium">{children}</span>
      <span
        className={cn(
          "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
          selected ? "bg-[var(--accent)] border-[var(--accent)]" : "border-white/20",
        )}
      >
        {selected && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}
      </span>
    </motion.button>
  );
}
