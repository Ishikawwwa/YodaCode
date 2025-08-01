// Simple test file to debug Yoda analysis

var name = "test";  // Should use const/let
function test(param) {
    if (param == true) {  // Should use ===
        console.log("Hello " + name);  // Should use template literals
    }
}

// Missing try/catch
function parseJSON(str) {
    return JSON.parse(str);
}

test("hello"); 