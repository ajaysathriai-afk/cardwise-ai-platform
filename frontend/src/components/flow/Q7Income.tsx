import { useFlowStore, type Answers } from "@/store/useFlowStore";
import { QuestionShell } from "./QuestionShell";
import { Chip } from "@/components/ui/Chip";

const OPTIONS: { v: Answers["income"]; l: string }[] = [
  { v: "lt6", l: "Under ₹6L" },
  { v: "6to12", l: "₹6L – ₹12L" },
  { v: "12to25", l: "₹12L – ₹25L" },
  { v: "gt25", l: "₹25L+" },
];

export function Q7Income() {
  const v = useFlowStore((s) => s.answers.income);
  const update = useFlowStore((s) => s.update);
  const next = useFlowStore((s) => s.next);
  return (
    <QuestionShell
      eyebrow="07 — Last one"
      question="Your annual income bracket?"
      subtitle="Used only to filter cards you're likely to be approved for."
      onNext={next}
      canNext={!!v}
      nextLabel="Find my card →"
    >
      {OPTIONS.map((o) => (
        <Chip key={o.v} selected={v === o.v} onClick={() => update("income", o.v)}>{o.l}</Chip>
      ))}
    </QuestionShell>
  );
}
