from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schema import QuestionRequest, SQLRequest
from services.sql_executor import execute_query
from schema import QuestionRequest
from ai import generate_sql
from fastapi import HTTPException
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",

        "https://natural-language-to-sql-engine-gxck-567vyis2n.vercel.app",
        "https://natural-language-to-sql-engine-gnelgav5b.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Natural Language to SQL API is running!"}


@app.post("/generate")
def generate(request: QuestionRequest):

    sql = generate_sql(request.question)

    if sql == "__QUOTA_EXCEEDED__":
        raise HTTPException(
            status_code=429,
            detail="Gemini API quota exceeded. Please try again later or use another API key."
        )

    return {"sql": sql}

@app.post("/execute")
def execute(request: SQLRequest):

    return execute_query(request.sql)

@app.get("/schema")
def get_schema():

    return {

        "customers": [
            "customer_id",
            "name",
            "email",
            "city"
        ],

        "products": [
            "product_id",
            "name",
            "category",
            "price",
            "stock"
        ],

        "orders": [
            "order_id",
            "customer_id",
            "product_id",
            "quantity",
            "order_total",
            "order_date"
        ]

    }
from fastapi import HTTPException

@app.post("/generate")
def generate(request: QuestionRequest):

    try:
        sql = generate_sql(request.question)
        return {"sql": sql}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
