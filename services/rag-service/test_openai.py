from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "user",
            "content": """
            Context:
            HDFC Regalia Gold provides 3 domestic lounge visits per calendar quarter.

            Question:
            What lounge access benefits does HDFC Regalia Gold provide?
            """
        }
    ]
)

print(response.choices[0].message.content)
