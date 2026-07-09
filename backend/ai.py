import google.generativeai as genai
from config import GEMINI_API_KEY

print("Using API Key:", GEMINI_API_KEY[:10] + "...")
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

FALLBACKS = {

    "list all users":
        "SELECT * FROM customers;",

    "show top 5 customers by total spend":
        """
SELECT c.name,
       SUM(o.order_total) AS total_spend
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
ORDER BY total_spend DESC
LIMIT 5;
""",

    "how many products are out of stock":
        """
SELECT COUNT(*)
FROM products
WHERE stock = 0;
"""
}

def generate_sql(question: str):
    prompt = f"""
You are an expert SQLite SQL generator.

Database Schema:

customers(
    customer_id,
    name,
    email,
    city
)

products(
    product_id,
    name,
    category,
    price,
    stock
)

orders(
    order_id,
    customer_id,
    product_id,
    quantity,
    order_total,
    order_date
)

Rules:
1. Generate ONLY valid SQLite SELECT statements.
2. Never generate INSERT, UPDATE, DELETE, DROP, ALTER, CREATE, TRUNCATE.
3. Do not include markdown.
4. Return only SQL.

Question:
{question}
"""
    
    try:

        response = model.generate_content(prompt)

        sql = response.text.strip()

        sql = sql.replace("```sql", "")
        sql = sql.replace("```", "")

        return sql.strip()

    except Exception:

        key = question.lower().strip()

        if key in FALLBACKS:

            return FALLBACKS[key]

        return """
        -- Gemini API quota exceeded.
        -- Please try one of the supported demo questions:
        -- 1. List all users
        -- 2. Show top 5 customers by total spend
        -- 3. How many products are out of stock?
        """
