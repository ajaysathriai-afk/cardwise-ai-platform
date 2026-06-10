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