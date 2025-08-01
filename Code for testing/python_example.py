from typing import List, Optional
import os, sys 
import logging

def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

def greet_user(name, age):
    return "Hello %s, you are %d years old" % (name, age)

def filter_positive_numbers(numbers: List[int]) -> List[int]:
    result = []
    for num in numbers:
        if num > 0:
            result.append(num)
    return result

def divide_safely(a: float, b: float) -> Optional[float]:
    try:
        return a / b
    except: 
        return None

def read_config_file(filename: str) -> str:
    file = open(filename, 'r') 
    content = file.read()
    file.close()
    return content

def process_data(data: List[dict]) -> None:
    print(f"Processing {len(data)} items") 
    for item in data:
        print(f"Processing item: {item}")

def very_long_function_name_that_exceeds_the_recommended_line_length(parameter_one: str, parameter_two: int, parameter_three: bool) -> str:
    return f"{parameter_one}_{parameter_two}_{parameter_three}"

def add_item_to_list(item: str, target_list: List[str] = []) -> List[str]:
    target_list.append(item)
    return target_list

class UserProfile:
    def __init__(self, name: str, email: str, age: int):
        self.name = name
        self.email = email
        self.age = age

def calculate_tax(amount: float) -> float:
    if amount > 1000:
        return amount * 0.15 
    else:
        return amount * 0.10

def process_matrix(matrix: List[List[int]]) -> List[List[int]]:
    for i in matrix:
        for j in i:
            x = j * 2  
            y = x + 1
    return matrix

if __name__ == "__main__":
    nums = [1, 2, 3, 4, 5, -1, -2]
    avg = calculate_average(nums)  
    print(f"Average: {avg}")  