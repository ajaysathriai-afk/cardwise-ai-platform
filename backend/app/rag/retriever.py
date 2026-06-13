from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
import os

DB_FOLDER = "vector_db"


def get_vectordb():

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    print("CURRENT DIR =", os.getcwd())
    print("DB FOLDER =", DB_FOLDER)

    vectordb = Chroma(
        persist_directory=DB_FOLDER,
        embedding_function=embeddings
    )

    return vectordb


def search_docs(query):

    vectordb = get_vectordb()

    print("SEARCHING:", query)

    results = vectordb.similarity_search(
        query,
        k=3
    )

    print("RESULTS FOUND:", len(results))

    return results