from database import supabase

result = supabase.table("cards").select("*").execute()

print("Count:", len(result.data))
print(result.data)
