import { useFlowStore } from "@/store/useFlowStore";
import { QuestionShell } from "./QuestionShell";
import { Chip } from "@/components/ui/Chip";
import type { Lifestyle } from "@/data/cards";

const OPTIONS: { v: Lifestyle; l: string; i: string }[] = [
  { v: "cashback", l: "Maximum cashback", i: "💸" },
  { v: "miles", l: "Air miles & travel rewards", i: "🛫" },
  { v: "lounge", l: "Airport lounge access", i: "🛋️" },
  { v: "lowfee", l: "Low or zero annual fee", i: "🪶" },
  { v: "status", l: "Premium status & perks", i: "👑" },
];

export function Q4Priority() {
  const v = useFlowStore((s) => s.answers.priority);
  const update = useFlowStore((s) => s.update);
  const next = useFlowStore((s) => s.next);
  return (
    <QuestionShell eyebrow="04 — What matters most" question="If you had to pick just one…" onNext={next} canNext={!!v}>
      {OPTIONS.map((o) => (
        <Chip key={o.v} selected={v === o.v} onClick={() => update("priority", o.v)} icon={o.i}>{o.l}</Chip>
      ))}
    </QuestionShell>
  );
}
