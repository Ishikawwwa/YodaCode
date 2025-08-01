# SSL Test File for Yoda Code Mentor
# This file will test if the SSL certificate fix works

def bad_function():
    # Missing type hints - Yoda should catch this
    print("This uses print instead of logging")  # Should be flagged
    return "Hello World"  # Missing return type hint

# Old-style string formatting - should be flagged
message = "Hello %s" % "World"

# Test the connection - save this file to trigger analysis
print("If you see Yoda analysis results, the SSL fix worked!") 