import { create } from "zustand";
import type { Lifestyle, SpendCategory } from "@/data/cards";

export type Step =
  | "hero"
  | "q1"
  | "q2"
  | "q3"
  | "trust"
  | "q4"
  | "q5"
  | "q6"
  | "q7"
  | "thinking"
  | "reveal"
  | "dashboard";

export const Q_STEPS: Step[] = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];

export interface Answers {
  intent?: "new" | "upgrade" | "compare";
  categories: SpendCategory[];
  monthlySpend: number;
  priority?: Lifestyle;
  feeTolerance?: "free" | "under5k" | "worthit";
  existingCards: string[];
  income?: "lt6" | "6to12" | "12to25" | "gt25";
  phone?: string;
}

interface FlowState {
  recommendedCard: any;
  setRecommendedCard: (card: any) => void;
  step: Step;
  answers: Answers;
  saved: string[];
  applied?: string;
  setStep: (s: Step) => void;
  next: () => void;
  back: () => void;
  update: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
  reset: () => void;
  save: (id: string) => void;
  apply: (id: string) => void;
  
}

const ORDER: Step[] = [
  "hero", "q1", "q2", "q3", "trust", "q4", "q5", "q6", "q7", "thinking", "reveal", "dashboard",
];

const initialAnswers: Answers = {
  categories: [],
  monthlySpend: 50000,
  existingCards: [],
};

export const useFlowStore = create<FlowState>((set, get) => ({
  step: "hero",
  answers: initialAnswers,
  saved: [],
  recommendedCard: null,
  setStep: (s) => set({ step: s }),
  next: () => {
    const i = ORDER.indexOf(get().step);
    if (i >= 0 && i < ORDER.length - 1) set({ step: ORDER[i + 1] });
  },
  back: () => {
    const i = ORDER.indexOf(get().step);
    if (i > 0) set({ step: ORDER[i - 1] });
  },
  update: (k, v) => set((s) => ({ answers: { ...s.answers, [k]: v } })),
  reset: () => set({ step: "hero", answers: initialAnswers }),
  save: (id) => set((s) => ({ saved: s.saved.includes(id) ? s.saved : [...s.saved, id] })),
  apply: (id) => set({ applied: id }),
  setRecommendedCard: (card) => set({ recommendedCard: card }),
}));
