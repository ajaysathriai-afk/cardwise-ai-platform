import { useFlowStore } from "@/store/useFlowStore";
import { QuestionShell } from "./QuestionShell";
import { Chip } from "@/components/ui/Chip";
import { CARDS } from "@/data/cards";

export function Q6Existing() {
  const v = useFlowStore((s) => s.answers.existingCards);
  const update = useFlowStore((s) => s.update);
  const next = useFlowStore((s) => s.next);
  const toggle = (id: string) =>
    update("existingCards", v.includes(id) ? v.filter((x) => x !== id) : [...v, id]);
  return (
    <QuestionShell
      eyebrow="06 — Already have"
      question="Any of these in your wallet?"
      subtitle="We'll skip these so we don't recommend duplicates."
      onNext={next}
      nextLabel={v.length === 0 ? "Skip, none" : "Continue"}
    >
      {CARDS.slice(0, 6).map((c) => (
        <Chip key={c.id} selected={v.includes(c.id)} onClick={() => toggle(c.id)}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-6 rounded-md border border-white/10"
              style={{ background: c.gradient }}
            />
            <div>
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-[11px] text-muted-foreground">{c.tier}</div>
            </div>
          </div>
        </Chip>
      ))}
    </QuestionShell>
  );
}
