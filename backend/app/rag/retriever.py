from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

DB_FOLDER = "../../vector_db"

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectordb = Chroma(
    persist_directory=DB_FOLDER,
    embedding_function=embeddings
)


def search_docs(query):

    print("SEARCHING:", query)

    results = vectordb.similarity_search(
        query,
        k=3
    )

    print("RESULTS FOUND:", len(results))

    return results