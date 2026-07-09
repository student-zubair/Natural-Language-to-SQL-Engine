# 🚀 Natural Language to SQL Engine

An AI-powered web application that converts natural language questions into SQL queries, executes them on a live SQLite database, and displays the results in an interactive dashboard.

This project was developed as part of the **AI Engineer Intern Technical Assessment**.

---

# 🌐 Live Demo

**Frontend (Vercel):**  
https://natural-language-to-sql-engine.vercel.app/

**Backend (Render):**  
https://natural-language-to-sql-engine-1.onrender.com

---

# 📌 Features

## Core Features

- Convert Natural Language into SQL using Google Gemini AI
- Display generated SQL before execution
- Editable SQL query before execution
- Execute SQL against a live SQLite database
- Dynamic results table
- Pagination/Scrollable results
- Row count indicator
- Query History
- Reload previous queries
- Schema Explorer

---

## Security Features

- Blocks INSERT statements
- Blocks UPDATE statements
- Blocks DELETE statements
- Blocks DROP statements
- Blocks ALTER statements
- Blocks CREATE statements
- Friendly error handling
- Read-only SQL execution

---

## UI Features

- Material UI Dashboard
- Dark / Light Theme
- Loading Indicators
- Toast Notifications
- CSV Export
- Responsive Layout

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Material UI
- Axios
- React Toastify
- MUI DataGrid

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Google Gemini API
- Python

---

# 📂 Project Structure

```
Natural-Language-to-SQL-Engine
│
├── backend
│   ├── app.py
│   ├── ai.py
│   ├── config.py
│   ├── database.py
│   ├── models.py
│   ├── schema.py
│   ├── seed_db.py
│   ├── ecommerce.db
│   ├── services
│   └── requirements.txt
│
├── frontend
│   └── frontend
│       ├── src
│       ├── public
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

---

# 🗄 Database Schema

## Customers

| Column |
|---------|
| customer_id |
| name |
| email |
| city |

---

## Products

| Column |
|---------|
| product_id |
| name |
| category |
| price |
| stock |

---

## Orders

| Column |
|---------|
| order_id |
| customer_id |
| product_id |
| quantity |
| order_total |
| order_date |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/student-zubair/Natural-Language-to-SQL-Engine.git

cd Natural-Language-to-SQL-Engine
```

---

# Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file:

```
GEMINI_API_KEY=YOUR_API_KEY
```

Seed the database:

```bash
python seed_db.py
```

Run FastAPI:

```bash
uvicorn app:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

# Frontend Setup

```bash
cd frontend/frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# API Endpoints

## Generate SQL

```
POST /generate
```

Example

```json
{
    "question":"Show top 5 customers by total spend"
}
```

---

## Execute SQL

```
POST /execute
```

Example

```json
{
    "sql":"SELECT * FROM customers;"
}
```

---

## Database Schema

```
GET /schema
```

---

# Example Queries

- List all users
- Show top 5 customers by total spend
- Show all products
- How many products are out of stock?
- List all customers from Bangalore
- Show all orders placed in the last 30 days

---

# Screenshots

Create a folder called

```
screenshots/
```

and add:

```
home.png

generated_sql.png

results.png

history.png

dark_mode.png
```


# Assumptions

- SQLite is used as the database.
- Only SELECT statements are permitted.
- Database is pre-seeded with realistic sample data.
- Gemini API is used to generate SQL from natural language.
- Generated SQL can be edited before execution.

---

# Future Improvements

- PostgreSQL/MySQL support
- User authentication
- Query optimization
- SQL syntax highlighting
- Role-based access
- Multi-database support
- AI-powered query explanations

---

# Caching Strategy (Bonus)

To improve performance for repeated natural language queries, generated SQL can be cached using the normalized natural language prompt as the cache key. Before invoking the language model, the backend checks whether an identical request has already been processed. If a cached SQL query exists, it is returned immediately, reducing API calls and improving response time. Similarly, query results can be cached for identical SQL statements when the underlying database has not changed. This approach reduces latency, lowers API costs, and improves user experience. The trade-off is that cached results may become stale when the database is updated, so cache invalidation or expiration policies should be implemented.

---

# Technologies Used

- Python
- FastAPI
- SQLite
- SQLAlchemy
- Google Gemini AI
- React
- Material UI
- Axios
- Vite

---

# Author

**Mohammed Zubair**

Computer Science Engineer

GitHub: https://github.com/student-zubair

---

# License

This project was developed for educational and technical assessment purposes.
