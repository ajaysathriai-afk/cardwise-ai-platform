from retriever import search_docs

query = "What is Boarding Edge?"

results = search_docs(query)

for i, doc in enumerate(results):

    print("\n")
    print("=" * 80)
    print(f"RESULT {i+1}")
    print("=" * 80)

    print(doc.page_content[:1000])