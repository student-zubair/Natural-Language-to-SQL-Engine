from sqlalchemy import text
from database import SessionLocal

FORBIDDEN = [
    "insert",
    "update",
    "delete",
    "drop",
    "alter",
    "truncate",
    "create"
]


def execute_query(sql: str):

    lower_sql = sql.lower().strip()

    if not lower_sql.startswith("select"):
        return {
            "success": False,
            "error": "Only SELECT queries are allowed."
        }

    for keyword in FORBIDDEN:
        if keyword in lower_sql:
            return {
                "success": False,
                "error": f"{keyword.upper()} statements are not allowed."
            }

    db = SessionLocal()

    try:

        result = db.execute(text(sql))

        columns = list(result.keys())

        rows = [list(row) for row in result.fetchall()]

        return {
            "success": True,
            "columns": columns,
            "rows": rows,
            "count": len(rows)
        }

    except Exception as e:

        message = str(e).lower()

        if "no such table" in message:

            message = "Table not found."

        elif "no such column" in message:

            message = "Column not found."

        elif "syntax error" in message:

            message = "Generated SQL contains a syntax error."

        else:

            message = "Unable to execute the SQL query."

        return {
            "success": False,
            "error": message
        }

    finally:
        db.close()