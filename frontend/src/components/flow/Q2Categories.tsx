import { useFlowStore } from "@/store/useFlowStore";
import { QuestionShell } from "./QuestionShell";
import { Chip } from "@/components/ui/Chip";
import type { SpendCategory } from "@/data/cards";

const OPTIONS: { value: SpendCategory; label: string; icon: string }[] = [
  { value: "travel", label: "Travel & flights", icon: "✈️" },
  { value: "food", label: "Dining & ordering in", icon: "🍜" },
  { value: "shopping", label: "Online shopping", icon: "🛍️" },
  { value: "groceries", label: "Groceries", icon: "🥦" },
  { value: "bills", label: "Bills & recharges", icon: "⚡" },
  { value: "fuel", label: "Fuel", icon: "⛽" },
];

export function Q2Categories() {
  const cats = useFlowStore((s) => s.answers.categories);
  const update = useFlowStore((s) => s.update);
  const next = useFlowStore((s) => s.next);
  const toggle = (v: SpendCategory) =>
    update("categories", cats.includes(v) ? cats.filter((c) => c !== v) : [...cats, v]);
  return (
    <QuestionShell
      eyebrow="02 — Your spend"
      question="What do you spend the most on?"
      subtitle="Pick up to 3. We'll weight rewards in these categories highest."
      onNext={next}
      canNext={cats.length > 0}
    >
      {OPTIONS.map((o) => (
        <Chip key={o.value} selected={cats.includes(o.value)} onClick={() => toggle(o.value)} icon={o.icon}>
          {o.label}
        </Chip>
      ))}
    </QuestionShell>
  );
}
