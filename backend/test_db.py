from database import SessionLocal
from models import Customer, Product, Order

db = SessionLocal()

print("Customers:", db.query(Customer).count())
print("Products :", db.query(Product).count())
print("Orders   :", db.query(Order).count())
