import { useFlowStore, type Answers } from "@/store/useFlowStore";
import { QuestionShell } from "./QuestionShell";
import { Chip } from "@/components/ui/Chip";

const OPTIONS: { v: Answers["feeTolerance"]; l: string; sub: string }[] = [
  { v: "free", l: "Free only", sub: "Under ₹750 a year" },
  { v: "under5k", l: "Up to ₹5,000", sub: "If the rewards make sense" },
  { v: "worthit", l: "No cap", sub: "Worth it if it pays back in perks" },
];

export function Q5Fee() {
  const v = useFlowStore((s) => s.answers.feeTolerance);
  const update = useFlowStore((s) => s.update);
  const next = useFlowStore((s) => s.next);
  return (
    <QuestionShell eyebrow="05 — Fee comfort" question="Annual fee — what's your limit?" onNext={next} canNext={!!v}>
      {OPTIONS.map((o) => (
        <Chip key={o.v} selected={v === o.v} onClick={() => update("feeTolerance", o.v)}>
          <div>
            <div className="font-medium">{o.l}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{o.sub}</div>
          </div>
        </Chip>
      ))}
    </QuestionShell>
  );
}
