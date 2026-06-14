const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://cardwise-backend.onrender.com";

console.log("API URL =", API_BASE_URL);  

export async function fetchRecommendation(data: any) {
  const response = await fetch(
    `${API_BASE_URL}/recommend`,
    {
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
    }
  );

  if (!response.ok) {
    throw new Error("Recommendation failed");
  }

  return response.json();
}

export async function askCardQuestion(question: string) {
  const response = await fetch(
    `${API_BASE_URL}/ask-card-question`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get answer");
  }

  return response.json();
}