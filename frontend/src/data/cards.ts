export type SpendCategory = "travel" | "food" | "shopping" | "fuel" | "bills" | "groceries";
export type Lifestyle = "cashback" | "miles" | "lounge" | "lowfee" | "status";

export interface Card {
  id: string;
  name: string;
  tier: string;
  gradient: string;
  accent: string;
  annualFee: number;
  joiningFee: number;
  feeWaiverSpend?: number;
  minIncome: number;
  rewardsRate: Partial<Record<SpendCategory, number>>; // % return
  lifestyle: Lifestyle[];
  loungeDomestic: number; // per year, 0 = none, 99 = unlimited
  loungeIntl: number;
  forexMarkup: number;
  rewardCurrency: string;
  topPerks: string[];
  badge?: string;
}

export const CARDS: Card[] = [
  {
    id: "magnus-burgundy",
    name: "Sapphire Reserve Black",
    tier: "Super Premium",
    gradient: "linear-gradient(135deg, #2a1a4a 0%, #0a0a14 60%, #7c5cff 140%)",
    accent: "#7c5cff",
    annualFee: 12500,
    joiningFee: 12500,
    feeWaiverSpend: 2500000,
    minIncome: 3000000,
    rewardsRate: { travel: 9, shopping: 4, food: 4, bills: 2, fuel: 2, groceries: 4 },
    lifestyle: ["miles", "lounge", "status"],
    loungeDomestic: 99,
    loungeIntl: 99,
    forexMarkup: 2,
    rewardCurrency: "Sapphire Miles",
    topPerks: [
      "Unlimited domestic & international lounge access",
      "1:5 transfer to 20+ airline partners",
      "Dedicated private banker",
    ],
    badge: "Invitation only",
  },
  {
    id: "magnus",
    name: "Sapphire Voyager",
    tier: "Premium Travel",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #7c5cff 140%)",
    accent: "#7c5cff",
    annualFee: 12500,
    joiningFee: 12500,
    feeWaiverSpend: 2500000,
    minIncome: 1800000,
    rewardsRate: { travel: 7, shopping: 3.5, food: 3.5, bills: 1, fuel: 1, groceries: 3.5 },
    lifestyle: ["miles", "lounge", "status"],
    loungeDomestic: 99,
    loungeIntl: 8,
    forexMarkup: 2,
    rewardCurrency: "Voyager Miles",
    topPerks: [
      "12 miles per ₹200 on travel portal",
      "Welcome vouchers worth ₹10,000",
      "Unlimited domestic lounge access",
    ],
    badge: "Editor's pick",
  },
  {
    id: "atlas",
    name: "Atlas Explorer",
    tier: "Travel-First",
    gradient: "linear-gradient(135deg, #0f3d3e 0%, #102b2c 60%, #2dd4a8 140%)",
    accent: "#2dd4a8",
    annualFee: 5000,
    joiningFee: 5000,
    feeWaiverSpend: 1500000,
    minIncome: 900000,
    rewardsRate: { travel: 5, shopping: 1, food: 1, bills: 1, fuel: 0, groceries: 1 },
    lifestyle: ["miles", "lounge"],
    loungeDomestic: 8,
    loungeIntl: 4,
    forexMarkup: 3.5,
    rewardCurrency: "Atlas Miles",
    topPerks: [
      "5 miles per ₹100 on travel spends",
      "1:1 transfer to airline & hotel partners",
      "Welcome bonus of 2,500 miles",
    ],
  },
  {
    id: "reserve",
    name: "Obsidian Reserve",
    tier: "Ultra Luxe",
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #2d1816 60%, #c9a84c 140%)",
    accent: "#c9a84c",
    annualFee: 50000,
    joiningFee: 50000,
    minIncome: 6000000,
    rewardsRate: { travel: 6, shopping: 3, food: 4, bills: 1, fuel: 1, groceries: 2 },
    lifestyle: ["miles", "lounge", "status"],
    loungeDomestic: 99,
    loungeIntl: 99,
    forexMarkup: 1.5,
    rewardCurrency: "Reserve Points",
    topPerks: [
      "Priority Pass with unlimited guest visits",
      "Personal lifestyle concierge",
      "Premium welcome gift",
    ],
    badge: "Top 1%",
  },
  {
    id: "flipkart",
    name: "Marketplace Rewards",
    tier: "Online Shopping",
    gradient: "linear-gradient(135deg, #1a237e 0%, #0d1442 60%, #ffb300 140%)",
    accent: "#ffb300",
    annualFee: 500,
    joiningFee: 500,
    feeWaiverSpend: 350000,
    minIncome: 300000,
    rewardsRate: { travel: 1.5, shopping: 5, food: 4, bills: 1.5, fuel: 0, groceries: 1.5 },
    lifestyle: ["cashback", "lowfee"],
    loungeDomestic: 4,
    loungeIntl: 0,
    forexMarkup: 3.5,
    rewardCurrency: "Cashback",
    topPerks: [
      "5% cashback on top marketplaces",
      "4% on preferred merchants — food, mobility, entertainment",
      "1.5% on everything else, no cap",
    ],
    badge: "Best value",
  },
  {
    id: "airtel",
    name: "Connect Plus",
    tier: "Bills & Recharge",
    gradient: "linear-gradient(135deg, #b71c1c 0%, #4a0e0e 60%, #ff5252 140%)",
    accent: "#ff5252",
    annualFee: 500,
    joiningFee: 500,
    feeWaiverSpend: 200000,
    minIncome: 300000,
    rewardsRate: { travel: 1, shopping: 1, food: 2.5, bills: 10, fuel: 1, groceries: 5 },
    lifestyle: ["cashback", "lowfee"],
    loungeDomestic: 4,
    loungeIntl: 0,
    forexMarkup: 3.5,
    rewardCurrency: "Cashback",
    topPerks: [
      "25% cashback on mobile, DTH, broadband",
      "10% cashback on utility bills",
      "5% cashback on food delivery & grocery",
    ],
  },
  {
    id: "ace",
    name: "Ace Cashback",
    tier: "Universal Cashback",
    gradient: "linear-gradient(135deg, #006064 0%, #00363a 60%, #4dd0e1 140%)",
    accent: "#4dd0e1",
    annualFee: 499,
    joiningFee: 499,
    feeWaiverSpend: 200000,
    minIncome: 300000,
    rewardsRate: { travel: 2, shopping: 2, food: 4, bills: 5, fuel: 1, groceries: 2 },
    lifestyle: ["cashback", "lowfee"],
    loungeDomestic: 4,
    loungeIntl: 0,
    forexMarkup: 3.5,
    rewardCurrency: "Cashback",
    topPerks: [
      "5% cashback on UPI bill payments",
      "4% on food delivery & mobility",
      "2% flat on everything else",
    ],
  },
  {
    id: "privilege",
    name: "Privilege Lifestyle",
    tier: "Lifestyle",
    gradient: "linear-gradient(135deg, #2c1810 0%, #1a0e08 60%, #d4a574 140%)",
    accent: "#d4a574",
    annualFee: 1500,
    joiningFee: 1500,
    feeWaiverSpend: 250000,
    minIncome: 600000,
    rewardsRate: { travel: 3, shopping: 2.5, food: 2.5, bills: 1, fuel: 1, groceries: 2 },
    lifestyle: ["lounge", "status"],
    loungeDomestic: 8,
    loungeIntl: 2,
    forexMarkup: 3.5,
    rewardCurrency: "Lifestyle Points",
    topPerks: [
      "12,500 welcome points",
      "Buy-1-Get-1 on movie tickets",
      "8 complimentary domestic lounge visits",
    ],
  },
];
