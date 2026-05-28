import { CARDS, type Card, type SpendCategory } from "@/data/cards";
import type { Answers } from "@/store/useFlowStore";

export interface Recommendation {
  card: Card;
  score: number;
  confidence: number;
  reasons: string[];
  estAnnualReward: number;
}

const INCOME_MAP: Record<string, number> = {
  lt6: 500000,
  "6to12": 900000,
  "12to25": 1800000,
  gt25: 3000000,
};

const CATEGORY_LABEL: Record<SpendCategory, string> = {
  travel: "travel",
  food: "dining",
  shopping: "online shopping",
  fuel: "fuel",
  bills: "utility bills",
  groceries: "groceries",
};

function scoreCard(card: Card, a: Answers) {
  const income = a.income ? INCOME_MAP[a.income] : 600000;
  // Hard eligibility (soft penalty rather than exclude — prototype)
  const eligible = income >= card.minIncome * 0.7;
  const overQualified = income >= card.minIncome * 2.5;

  // Category fit (40) — weighted by stated monthly spend distribution
  const cats = a.categories.length ? a.categories : (["shopping", "food"] as SpendCategory[]);
  const catScore =
    (cats.reduce((sum, c) => sum + (card.rewardsRate[c] ?? 0), 0) / (cats.length * 10)) * 40;

  // Lifestyle (25)
  const lifeScore = a.priority && card.lifestyle.includes(a.priority) ? 25 : 6;

  // Fee tolerance (15) — sharper differentiation
  let feeScore = 0;
  if (a.feeTolerance === "free") feeScore = card.annualFee <= 750 ? 15 : card.annualFee <= 2000 ? 6 : 0;
  else if (a.feeTolerance === "under5k") feeScore = card.annualFee <= 5000 ? 15 : card.annualFee <= 12500 ? 7 : 2;
  else feeScore = card.annualFee >= 5000 ? 15 : 10; // worth it — favors premium

  // Redemption fit (10)
  const redeem =
    a.priority === "cashback"
      ? card.rewardCurrency === "Cashback" ? 10 : 2
      : a.priority === "miles"
      ? card.rewardCurrency.toLowerCase().includes("miles") ? 10 : 3
      : 7;

  // Eligibility (10) — penalize over-qualification mildly to avoid recommending entry cards to HNI
  const elig = eligible ? (overQualified && card.annualFee < 1000 ? 4 : 10) : 1;

  const total = catScore + lifeScore + feeScore + redeem + elig;
  return { total, eligible };
}

function buildReasons(card: Card, a: Answers): string[] {
  const out: string[] = [];
  const topCat = a.categories
    .map((c) => ({ c, r: card.rewardsRate[c] ?? 0 }))
    .sort((x, y) => y.r - x.r)[0];
  if (topCat && topCat.r > 0) {
    out.push(
      `You spend big on ${CATEGORY_LABEL[topCat.c]} — this card returns ${topCat.r}% there, the highest among the cards we matched.`,
    );
  } else {
    out.push(`Strong all-round rewards on the categories you spend on most.`);
  }
  if (a.priority === "lounge" || a.priority === "status" || a.priority === "miles") {
    if (card.loungeIntl >= 4 || card.loungeIntl >= 99) {
      out.push(`Unlimited domestic + ${card.loungeIntl >= 99 ? "unlimited" : card.loungeIntl} international lounge visits — matches your travel-first vibe.`);
    } else if (card.loungeDomestic > 0) {
      out.push(`${card.loungeDomestic >= 99 ? "Unlimited" : card.loungeDomestic} domestic lounge visits a year.`);
    }
  }
  if (a.feeTolerance === "free" && card.annualFee <= 750) {
    out.push(`₹${card.annualFee} annual fee — within your "fee-light" preference.`);
  } else if (card.feeWaiverSpend) {
    out.push(`The ₹${card.annualFee.toLocaleString("en-IN")} fee is waived on ₹${(card.feeWaiverSpend / 100000).toFixed(1)}L annual spend — easily clearable at your level.`);
  } else {
    out.push(`Welcome benefits typically recover the joining fee within your first 2 months.`);
  }
  return out.slice(0, 3);
}

function estimateAnnualReward(card: Card, a: Answers) {
  const monthly = a.monthlySpend;
  const cats = a.categories.length ? a.categories : (["shopping", "food"] as SpendCategory[]);
  const avgRate = cats.reduce((s, c) => s + (card.rewardsRate[c] ?? 0), 0) / cats.length;
  return Math.round(monthly * 12 * (avgRate / 100));
}

export function recommend(a: Answers): { top: Recommendation; alts: Recommendation[] } {
  const ranked = CARDS.filter((c) => !a.existingCards.includes(c.id))
    .map((card) => {
      const { total, eligible } = scoreCard(card, a);
      return {
        card,
        score: total,
        confidence: Math.min(98, Math.round(total + (eligible ? 6 : 0))),
        reasons: buildReasons(card, a),
        estAnnualReward: estimateAnnualReward(card, a),
      };
    })
    .sort((a, b) => b.score - a.score);

  return { top: ranked[0], alts: ranked.slice(1, 3) };
}
