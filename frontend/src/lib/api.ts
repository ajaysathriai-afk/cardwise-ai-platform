export async function fetchRecommendation(data: any) {
  const response = await fetch("http://127.0.0.1:8000/recommend", {
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
