
# FreechargeBiz AI Card Recommender — Prototype Build Plan

A mobile-first, dark-luxe (electric violet accent) interactive prototype with all 10 screens, conversational Q-flow, AI thinking animation, and recommendation reveal. Mocked Axis catalog, no backend in v1.

---

## Stack & Setup

- Scaffold via `web_app:freecharge-card-ai` (TanStack Start template).
- Tailwind tokens for dark-luxe palette (bg `#0A0A0F`, surface `#13131A`, accent `#7C5CFF` electric violet, text `#EDEDF2`, muted `#8A8A99`, success `#A3F7BF`).
- Fonts: Geist / Inter for UI, JetBrains Mono for numerics.
- Animation: Framer Motion (springs, `AnimatePresence` for screen transitions, layoutId for shared card hero).
- State: single Zustand store `useFlowStore` (answers, currentStep, recommendation).
- Routing: single-page flow driven by step state + `AnimatePresence` page transitions; no real routes needed for prototype except `/` and `/dashboard`.

---

## Mocked Data

`src/data/cards.ts` — 8 Axis cards with structured fields (name, tier, image gradient, annual fee, joining fee, top rewards by category, lounge, forex, eligibility income, key perks, color theme). Examples: Magnus, Magnus Burgundy, Atlas, Reserve, Flipkart Axis, Airtel Axis, Privilege, ACE.

`src/lib/recommend.ts` — deterministic scoring (spend categories 40, lifestyle 25, fee tolerance 15, redemption 10, eligibility 10), returns top 1 + 2 alternates with confidence + 3 mocked reasoning bullets templated from answers (no LLM in prototype; structure ready to swap in later).

---

## Screens (10)

```text
1  Landing / Hero          single CTA "Find my card", trust ribbon
2  Intent                  Q1 — new / upgrade / compare
3  Spend categories        Q2 — multi-select chips
4  Monthly spend           Q3 — slider with anchors
5  What matters most       Q4 — single-select chips
6  Fee tolerance           Q5 — 3 chips
7  Existing cards          Q6 — chip multi-select
8  Income                  Q7 — bracketed chips
   (Trust interstitial appears between Q3 and Q4 as mid-flow card)
9  AI thinking             3.5s animated "Analyzing 47 cards…"
10 Recommendation reveal   hero card + 96% confidence pill + 3 reasons + compare drawer + card detail bottom sheet + apply (phone OTP modal) + save
+  Dashboard (light V1.5)  saved card, application status mock
```

Global: persistent trust ribbon at base, exit-intent retention modal ("60 seconds away from your perfect card"), bottom-sheet pattern for detail/compare/OTP.

---

## Key UX Details

- One question per screen, chip answers only (no typing).
- Progress: 7 animated dots at top, accent fills as user advances.
- Back arrow always present except on Hero and Reveal.
- Spring transitions between Q screens (x-axis slide + fade).
- Card-as-hero on reveal: 3D tilt on pointer move (Framer Motion `useMotionValue` + perspective), subtle violet glow.
- Confidence pill with animated count-up to 96%.
- "Why this card" — 3 expandable rows with friend-tone copy generated from user's answers.
- Compare drawer: swipe up bottom-sheet showing top 1 vs alt 1 vs alt 2 with category-by-category badges.
- Reward simulator inside card detail: spend sliders animate ₹ earned per year.
- Apply CTA → bottom sheet phone OTP (mocked, any 4 digits accepted) → success → dashboard.

---

## File Structure

```text
src/
  routes/
    index.tsx              flow controller + AnimatePresence
    dashboard.tsx          V1.5 saved card view
  components/
    flow/
      Hero.tsx
      ProgressDots.tsx
      QuestionShell.tsx
      Q1Intent.tsx … Q7Income.tsx
      TrustInterstitial.tsx
      Thinking.tsx
      Reveal.tsx
      CompareSheet.tsx
      CardDetailSheet.tsx
      OtpSheet.tsx
      ExitIntentModal.tsx
      TrustRibbon.tsx
    card/
      CardVisual.tsx       3D tilt card render
      ConfidencePill.tsx
      ReasonAccordion.tsx
      RewardSimulator.tsx
    ui/
      Chip.tsx
      BottomSheet.tsx
  store/useFlowStore.ts
  data/cards.ts
  lib/recommend.ts
  styles/tokens.css         dark-luxe palette + font setup
```

---

## Out of Scope (prototype)

- Real LLM call, real backend, real OTP, real CIBIL, UPI/SMS spend analysis, SMB persona screens, real issuer deep-links (use placeholder `#`).

---

Approve to switch to build mode and I'll generate everything in one pass.
