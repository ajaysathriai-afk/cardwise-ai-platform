from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
import os

DB_FOLDER = "vector_db"

import os

print("=" * 50)
print("CURRENT DIR =", os.getcwd())
print("DB_FOLDER =", DB_FOLDER)
print("ABS PATH =", os.path.abspath(DB_FOLDER))
print("DB EXISTS =", os.path.exists(DB_FOLDER))
print("=" * 50)


def get_vectordb():
    print("STEP 1")
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    print("STEP 2")
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