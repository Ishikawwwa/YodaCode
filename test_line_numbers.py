import os
import sys

def bad_function(x,y):
    result=x+y
    print("Result: %s" % result)
    return result

class myClass:
    def __init__(self):
        self.value=10
    
    def get_value(self):
        return self.value

if __name__=="__main__":
    obj=myClass()
    print(bad_function(1,2))
    print(obj.get_value())