# User service with cross-file issues
from models import User, ProductClass, calculate_discount
# Missing import: format_user_name - used below but not imported

def create_user(name, email, age=None):  # Should use User dataclass
    # Creates User inconsistently with different parameter order
    return User(email=email, name=name, id=1, age=age)

def get_user_display(user):
    # Uses format_user_name but didn't import it - cross-file dependency issue
    return format_user_name(user)  # This will cause NameError

def process_product(product_id, product_name, price):
    # Should use ProductClass but creates it inconsistently
    product = ProductClass(product_id, product_name, price)
    
    # Uses calculate_discount with wrong parameter order
    discounted_price = calculate_discount(0.1, price)  # Parameters swapped!
    
    return product, discounted_price

# Function with same name as in other file - naming conflict
def calculate_discount(amount, percent):  # Duplicates function from models.py
    return amount - (amount * percent / 100)  # Different implementation! 