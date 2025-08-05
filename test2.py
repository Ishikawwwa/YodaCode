import os
import sys

def calculate_sum(a,b):
    return a+b

class UserManager:
    def __init__(self):
        self.users = []
    
    def add_user(self, user):
        self.users.append(user)
    
    def get_user(self, id):
        for user in self.users:
            if user.id == id:
                return user
        return None

def main():
    x = 5
    y = 10
    result = calculate_sum(x,y)
    print("Result:", result)
    
    manager = UserManager()
    user = {"id": 1, "name": "John"}
    manager.add_user(user)

if __name__ == "__main__":
    main() 