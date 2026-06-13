from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def generate_ai_explanation(
    user_answers,
    card_name,
    reasons
):

    prompt = f"""
    User Answers:
    {user_answers}

    Recommended Card:
    {card_name}

    Reasons:
    {reasons}

    Explain in simple fintech language
    why this card is suitable.
    Limit response to 4 sentences.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content

print("OPENAI KEY FOUND =", bool(os.getenv("OPENAI_API_KEY")))

if __name__ == "__main__":

    result = generate_ai_explanation(
        {"category": "travel"},
        "HDFC Regalia Gold",
        ["5% rewards", "8 lounge visits"]
    )

    print(result)


def generate_financial_insight(
    monthly_spend,
    annual_reward,
    priority
):

    prompt = f"""
    User Monthly Spend: ₹{monthly_spend}

    Estimated Annual Rewards: ₹{annual_reward}

    Priority:
    {priority}

    Act as a fintech advisor.

    Give:
    1. Reward insight
    2. Spending insight
    3. One recommendation

    Limit to 4 sentences.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content

def generate_reward_optimization(
    monthly_spend,
    annual_reward,
    card_name,
    category
):

    prompt = f"""
    User monthly spend: ₹{monthly_spend}

    Estimated annual rewards:
    ₹{annual_reward}

    Recommended card:
    {card_name}

    Main category:
    {category}

    Give 3 practical tips to maximize rewards.

    Keep response concise.
    Number each point.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content