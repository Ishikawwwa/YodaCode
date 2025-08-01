# Main application file with cross-file issues
from models import User, ProductClass
from user_service import create_user, process_product

def main():
    # Inconsistent User creation - different from user_service.py
    user1 = User(1, "John", "john@example.com")  # Uses positional args
    user2 = create_user("Jane", "jane@example.com", 25)  # Uses function
    
    # Uses ProductClass (now properly imported)
    product = ProductClass(1, "Laptop", 999.99)
    
    # Calls process_product with correct parameter naming
    result = process_product(product_id=1, product_name="Mouse", price=29.99)
    
    print(f"User 1: {user1}")
    print(f"User 2: {user2}")

# Duplicate function name from models.py - another naming conflict
def format_user_name(user):  # Same name as in models.py but different implementation
    return user.name.upper()  # Different formatting logic

if __name__ == "__main__":
    main() 