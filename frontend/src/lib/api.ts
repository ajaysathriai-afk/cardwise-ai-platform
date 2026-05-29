export async function fetchRecommendation(data: any) {
  const response = await fetch("https://cardwise-backend-y4wv.onrender.com/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categories: data.categories,
      monthly_spend: data.monthlySpend,
      priority: data.priority,
      fee_tolerance: data.feeTolerance,
      income: data.income,
    }),
  });

  return response.json();
}
