from app.rag.rag_service import ask_rag

question = "What is Boarding Edge?"

answer = ask_rag(question)

print("\n")
print(answer)