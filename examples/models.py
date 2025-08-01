# Data models for the application
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class User:
    id: int
    name: str
    email: str
    age: Optional[int] = None

class ProductClass:  # Should be dataclass but isn't
    def __init__(self, id, name, price):  # Missing type hints
        self.id = id
        self.name = name
        self.price = price

# Utility functions
def calculate_discount(price, discount_rate):  # Missing type hints
    return price * (1 - discount_rate)

def format_user_name(user):  # Should specify User type
    return f"{user.name} ({user.email})" 