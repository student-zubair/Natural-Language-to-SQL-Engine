from pydantic import BaseModel


class QuestionRequest(BaseModel):
    question: str


class SQLRequest(BaseModel):
    sql: str