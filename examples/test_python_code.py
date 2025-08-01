# Test file for Yoda Code Mentor Extension - Python Focus
# This code has several issues that Yoda should catch

import os
import sys
from typing import List
import json

# Missing type hints and docstring
def calculate_total(items, tax_rate):
    sum = 0
    for item in items:
        sum = sum + item
    
    tax = sum * tax_rate
    total = sum + tax
    
    # Using print instead of logging
    print("Total calculated: " + str(total))
    
    return total

# Poor exception handling
def divide_numbers(a, b):
    try:
        return a / b
    except:
        return None

# Not using f-strings
def format_message(name, age):
    return "Hello %s, you are %d years old" % (name, age)

# Not using list comprehension
def get_even_numbers(numbers):
    result = []
    for num in numbers:
        if num % 2 == 0:
            result.append(num)
    return result

# Missing dataclass for data structure
class Person:
    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email

# Not using context manager
def read_file(filename):
    file = open(filename, 'r')
    content = file.read()
    file.close()
    return content

# Single letter variable names
def process_data(data):
    for i in data:
        for j in i:
            x = j * 2
            y = x + 1
            print(y)

# Long line (over 88 characters)
def long_function_name_with_many_parameters(parameter_one, parameter_two, parameter_three, parameter_four, parameter_five):
    return parameter_one + parameter_two + parameter_three + parameter_four + parameter_five

# Magic numbers
def calculate_discount(price):
    if price > 100:
        return price * 0.1
    elif price > 50:
        return price * 0.05
    return 0

# Using mutable default arguments
def add_item(item, items=[]):
    items.append(item)
    return items

# Test the functions
if __name__ == "__main__":
    items = [10, 20, 30]
    result = calculate_total(items, 0.1)
    print(result) 