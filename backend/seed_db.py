from faker import Faker
from random import randint, choice
from datetime import date, timedelta

from database import SessionLocal
from models import Customer, Product, Order

fake = Faker()

db = SessionLocal()

# -----------------------------
# Clear existing data
# -----------------------------

db.query(Order).delete()
db.query(Product).delete()
db.query(Customer).delete()
db.commit()

# -----------------------------
# Categories
# -----------------------------

categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Sports",
    "Home",
    "Beauty"
]

# -----------------------------
# Customers
# -----------------------------

customers = []

for _ in range(100):
    customer = Customer(
        name=fake.name(),
        email=fake.email(),
        city=fake.city()
    )
    customers.append(customer)

db.add_all(customers)
db.commit()

# -----------------------------
# Products
# -----------------------------

products = []

for _ in range(60):
    product = Product(
        name=fake.word().capitalize(),
        category=choice(categories),
        price=round(randint(100, 5000), 2),
        stock=randint(0, 100)
    )
    products.append(product)

db.add_all(products)
db.commit()

# -----------------------------
# Orders
# -----------------------------

customers = db.query(Customer).all()
products = db.query(Product).all()

orders = []

for _ in range(500):

    customer = choice(customers)
    product = choice(products)

    quantity = randint(1, 5)

    total = quantity * product.price

    order = Order(
        customer_id=customer.customer_id,
        product_id=product.product_id,
        quantity=quantity,
        order_total=total,
        order_date=date.today() - timedelta(days=randint(0, 365))
    )

    orders.append(order)

db.add_all(orders)
db.commit()

print("Database seeded successfully!")

print(f"Customers : {len(customers)}")
print(f"Products  : {len(products)}")
print(f"Orders    : {len(orders)}")

db.close()