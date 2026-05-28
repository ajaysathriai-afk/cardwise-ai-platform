import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxHeight?: string;
}

export function BottomSheet({ open, onClose, children, title, maxHeight = "85vh" }: BottomSheetProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => { if (info.offset.y > 120) onClose(); }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-[var(--surface)] border-t border-white/10"
            style={{ maxHeight }}
          >
            <div className="flex justify-center pt-3">
              <div className="w-10 h-1.5 rounded-full bg-white/15" />
            </div>
            {title && (
              <div className="px-6 pt-4 pb-2">
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
            )}
            <div className="overflow-y-auto px-6 pb-8" style={{ maxHeight: `calc(${maxHeight} - 60px)` }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
