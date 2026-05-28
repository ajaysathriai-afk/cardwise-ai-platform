import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useFlowStore } from "@/store/useFlowStore";
import type { Card } from "@/data/cards";

export function OtpSheet({ open, onClose, card }: { open: boolean; onClose: () => void; card: Card }) {
  const apply = useFlowStore((s) => s.apply);
  const setStep = useFlowStore((s) => s.setStep);
  const update = useFlowStore((s) => s.update);
  const [phase, setPhase] = useState<"phone" | "otp" | "done">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  function close() {
    setPhase("phone"); setPhone(""); setOtp(""); onClose();
  }

  return (
    <BottomSheet open={open} onClose={close} title={phase === "done" ? "You're in 🎉" : "Almost there"}>
      {phase === "phone" && (
        <div>
          <p className="text-sm text-muted-foreground mb-6">
            We need your phone to pre-fill your application. No spam. Promise.
          </p>
          <div className="flex items-center gap-2 mb-6 px-4 h-14 rounded-2xl bg-[var(--surface-2)] border border-white/10 focus-within:border-[var(--accent)]">
            <span className="mono text-sm text-muted-foreground">+91</span>
            <input
              autoFocus
              inputMode="numeric"
              maxLength={10}
              placeholder="98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="flex-1 bg-transparent outline-none mono text-base"
            />
          </div>
          <button
            disabled={phone.length !== 10}
            onClick={() => { update("phone", phone); setPhase("otp"); }}
            className="w-full h-14 rounded-2xl bg-[var(--accent)] text-white font-semibold disabled:opacity-30"
          >
            Send OTP
          </button>
        </div>
      )}
      {phase === "otp" && (
        <div>
          <p className="text-sm text-muted-foreground mb-6">
            OTP sent to +91 {phone}. Enter any 4 digits to continue (demo).
          </p>
          <input
            autoFocus
            inputMode="numeric"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full h-16 text-center mono text-3xl tracking-[0.5em] bg-[var(--surface-2)] border border-white/10 rounded-2xl outline-none focus:border-[var(--accent)] mb-6"
          />
          <button
            disabled={otp.length !== 4}
            onClick={() => {
              apply(card.id);
              toast.success("Application submitted", { description: `${card.name} · review within 24h` });
              setPhase("done");
            }}
            className="w-full h-14 rounded-2xl bg-[var(--accent)] text-white font-semibold disabled:opacity-30"
          >
            Verify & apply
          </button>
        </div>
      )}
      {phase === "done" && (
        <div className="text-center py-4">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 mx-auto rounded-full bg-[var(--success)]/20 flex items-center justify-center mb-6"
          >
            <span className="text-4xl">✓</span>
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">Application started</h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">
            We've pre-filled your {card.name} application. An issuer representative will reach you within 24 hours.
          </p>
          <button
            onClick={() => { close(); setStep("dashboard"); }}
            className="w-full h-14 rounded-2xl bg-white text-black font-semibold"
          >
            Go to dashboard →
          </button>
        </div>
      )}
    </BottomSheet>
  );
}
