import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useFlowStore } from "@/store/useFlowStore";
import { Hero } from "@/components/flow/Hero";
import { Q1Intent } from "@/components/flow/Q1Intent";
import { Q2Categories } from "@/components/flow/Q2Categories";
import { Q3MonthlySpend } from "@/components/flow/Q3MonthlySpend";
import { Q4Priority } from "@/components/flow/Q4Priority";
import { Q5Fee } from "@/components/flow/Q5Fee";
import { Q6Existing } from "@/components/flow/Q6Existing";
import { Q7Income } from "@/components/flow/Q7Income";
import { TrustInterstitial } from "@/components/flow/TrustInterstitial";
import { Thinking } from "@/components/flow/Thinking";
import { Reveal } from "@/components/flow/Reveal";
import { Dashboard } from "@/components/flow/Dashboard";
import { ExitIntentModal } from "@/components/flow/ExitIntentModal";
import { DesktopRail } from "@/components/layout/DesktopRail";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    links: [{ rel: "canonical", href: "https://cardwiz-plan-pro.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "CardWise AI",
              url: "https://cardwiz-plan-pro.lovable.app",
              description:
                "CardWise AI is an AI-powered credit card intelligence platform that recommends, simulates rewards, and compares cards with transparent scoring.",
            },
            {
              "@type": "WebSite",
              name: "CardWise AI",
              url: "https://cardwiz-plan-pro.lovable.app",
              description:
                "AI-powered credit card recommendations with explainable scoring, interactive reward simulator, and side-by-side card comparison.",
            },
          ],
        }),
      },
    ],
  }),
});

const MAP = {
  hero: Hero,
  q1: Q1Intent,
  q2: Q2Categories,
  q3: Q3MonthlySpend,
  trust: TrustInterstitial,
  q4: Q4Priority,
  q5: Q5Fee,
  q6: Q6Existing,
  q7: Q7Income,
  thinking: Thinking,
  reveal: Reveal,
  dashboard: Dashboard,
} as const;

function Index() {
  const step = useFlowStore((s) => s.step);
  const Component = MAP[step];
  return (
    <div className="grain dark min-h-svh bg-background flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto lg:grid lg:grid-cols-[1fr_minmax(420px,460px)_1fr] lg:gap-0">
        <div className="hidden lg:block">
          <DesktopRail side="left" />
        </div>
        <main className="relative w-full max-w-md mx-auto lg:max-w-none lg:border-x lg:border-white/8">
          <AnimatePresence mode="wait">
            <Component key={step} />
          </AnimatePresence>
          <ExitIntentModal />
        </main>
        <div className="hidden lg:block">
          <DesktopRail side="right" />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
