import { useFlowStore } from "@/store/useFlowStore";
import { QuestionShell } from "./QuestionShell";
import { Chip } from "@/components/ui/Chip";

const OPTIONS = [
  { value: "new", label: "Get my first / next card", icon: "✨" },
  { value: "upgrade", label: "Upgrade to something premium", icon: "👑" },
  { value: "compare", label: "Just exploring options", icon: "🔍" },
] as const;

export function Q1Intent() {
  const intent = useFlowStore((s) => s.answers.intent);
  const update = useFlowStore((s) => s.update);
  const next = useFlowStore((s) => s.next);
  return (
    <QuestionShell
      eyebrow="01 — Quick intro"
      question="What brings you here?"
      subtitle="No wrong answer — this just helps us tune the tone."
      onNext={next}
      canNext={!!intent}
    >
      {OPTIONS.map((o) => (
        <Chip
          key={o.value}
          selected={intent === o.value}
          onClick={() => update("intent", o.value)}
          icon={o.icon}
        >
          {o.label}
        </Chip>
      ))}
    </QuestionShell>
  );
}
