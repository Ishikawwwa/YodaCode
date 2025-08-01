// Test file for Yoda Code Mentor Extension
// This code has several issues that Yoda should catch

function calculateTotal(a, b, c) {
    var sum = a + b + c;
    var tax = sum * 0.1;
    var total = sum + tax;
    
    if (total > 100) {
        console.log("High total: " + total);
    } else {
        console.log("Low total: " + total);
    }
    
    return total;
}

var result = calculateTotal(10, 20, 30);
console.log(result);

// This function has no error handling
function divide(x, y) {
    return x / y;
}

// Poor variable naming
var a = [1, 2, 3, 4, 5];
for (var i = 0; i < a.length; i++) {
    console.log(a[i]);
} 