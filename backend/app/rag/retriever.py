from dotenv import load_dotenv
load_dotenv()

from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
import os

DB_FOLDER = "vector_db"


def get_vectordb():
    embeddings = OpenAIEmbeddings(
        api_key=os.getenv("OPENAI_API_KEY")
    )

    vectordb = Chroma(
        persist_directory=DB_FOLDER,
        embedding_function=embeddings
    )

    return vectordb


def search_docs(query):
    vectordb = get_vectordb()

    results = vectordb.similarity_search(
        query,
        k=3
    )

    return results