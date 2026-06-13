from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv
import os

load_dotenv()

print("OPENAI KEY =", bool(os.getenv("OPENAI_API_KEY")))

PDF_FOLDER = "data/card_pdfs"
DB_FOLDER = "vector_db"

all_docs = []

for file in os.listdir(PDF_FOLDER):

    if file.endswith(".pdf"):

        path = os.path.join(PDF_FOLDER, file)

        print(f"Loading {file}")

        loader = PyPDFLoader(path)

        docs = loader.load()

        for doc in docs:
            doc.metadata["source_file"] = file

        all_docs.extend(docs)

print("Documents Loaded:", len(all_docs))

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

chunks = splitter.split_documents(all_docs)

print("Chunks Created:", len(chunks))

embeddings = OpenAIEmbeddings(
    api_key=os.getenv("OPENAI_API_KEY")
)

vectordb = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory=DB_FOLDER
)

print("Vector DB Created Successfully")