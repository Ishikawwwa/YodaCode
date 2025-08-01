"use strict";
// TypeScript example with various issues for Yoda to catch
// Using 'any' type instead of specific types
function processData(data) {
    return data.someProperty;
}
// Missing interface for object shape
function createUser(userData) {
    return {
        id: userData.id,
        name: userData.name,
        email: userData.email
    };
}
// Should use interface instead of inline object types
function updateUser(user, updates) {
    return { ...user, ...updates };
}
// Missing generic constraints
function getProperty(obj, key) {
    return obj[key];
}
// Not using enums for related constants
const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator'
};
// Missing return type annotation
function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}
// Using function declaration instead of arrow function with explicit types
function validateEmail(email) {
    return email.includes('@');
}
// Not using union types properly
function formatValue(value) {
    if (typeof value === 'string') {
        return value;
    }
    else if (typeof value === 'number') {
        return value.toString();
    }
    return 'unknown';
}
// Missing error handling with typed exceptions
async function fetchUser(id) {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}
// Using implicit any in array
const items = []; // Should specify type
//# sourceMappingURL=example.js.map