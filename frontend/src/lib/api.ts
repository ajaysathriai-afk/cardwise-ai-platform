const API_BASE_URL = "http://127.0.0.1:8000";
export async function fetchRecommendation(data: any) {
  console.log("ANSWERS:", data);

  const start = performance.now();

  const response = await fetch(
    "http://127.0.0.1:8000/recommend",
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

  const result = await response.json();

  console.log(
    "TOTAL API TIME =",
    ((performance.now() - start) / 1000).toFixed(2),
    "seconds"
  );

  console.log("RESULT:", result);

  return result;
}

export async function askCardQuestion(question: string) {
  const response = await fetch(
    "http://127.0.0.1:8000/ask-card-question",
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