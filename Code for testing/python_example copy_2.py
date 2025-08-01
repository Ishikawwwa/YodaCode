"""
Python code examples for Yoda Code Mentor
This file demonstrates various Python issues that Yoda will detect and suggest improvements for.
"""

from typing import List, Optional
import os, sys  # Bad import organization
import logging

# Missing type hints and docstring
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

# Old-style string formatting instead of f-strings
def greet_user(name, age):
    return "Hello %s, you are %d years old" % (name, age)

# Not using list comprehensions
def filter_positive_numbers(numbers: List[int]) -> List[int]:
    result = []
    for num in numbers:
        if num > 0:
            result.append(num)
    return result

# Poor exception handling - catching all exceptions
def divide_safely(a: float, b: float) -> Optional[float]:
    try:
        return a / b
    except:  # Should catch specific exception types
        return None

# Not using context managers for file operations
def read_config_file(filename: str) -> str:
    file = open(filename, 'r')  # Should use 'with' statement
    content = file.read()
    file.close()
    return content

# Using print instead of logging
def process_data(data: List[dict]) -> None:
    print(f"Processing {len(data)} items")  # Should use logging
    for item in data:
        print(f"Processing item: {item}")

# Long line exceeding 88 characters (Black formatter standard)
def very_long_function_name_that_exceeds_the_recommended_line_length(parameter_one: str, parameter_two: int, parameter_three: bool) -> str:
    return f"{parameter_one}_{parameter_two}_{parameter_three}"

# Using mutable default arguments (dangerous!)
def add_item_to_list(item: str, target_list: List[str] = []) -> List[str]:
    target_list.append(item)
    return target_list

# Should use dataclass instead of regular class
class UserProfile:
    def __init__(self, name: str, email: str, age: int):
        self.name = name
        self.email = email
        self.age = age

# Magic numbers should be constants
def calculate_tax(amount: float) -> float:
    if amount > 1000:
        return amount * 0.15  # Should be TAX_RATE_HIGH = 0.15
    else:
        return amount * 0.10  # Should be TAX_RATE_LOW = 0.10

# Single-letter variable names (bad practice)
def process_matrix(matrix: List[List[int]]) -> List[List[int]]:
    for i in matrix:
        for j in i:
            x = j * 2  # Should have meaningful names
            y = x + 1
    return matrix

if __name__ == "__main__":
    # Test the functions
    nums = [1, 2, 3, 4, 5, -1, -2]
    avg = calculate_average(nums)  # Missing type hints will be flagged
    print(f"Average: {avg}")  # Print usage will be flagged 