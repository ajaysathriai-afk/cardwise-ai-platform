from openai import OpenAI
from retriever import search_docs
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def ask_rag(question):

    docs = search_docs(question)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
    Answer ONLY using the context below.

    Context:
    {context}

    Question:
    {question}

    If answer is not found,
    say:
    Information not found in documents.
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