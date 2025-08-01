// TypeScript example with various issues for Yoda to catch

// Using 'any' type instead of specific types
function processData(data: any): any {
    return data.someProperty;
}

// Missing interface for object shape
function createUser(userData: any) {
    return {
        id: userData.id,
        name: userData.name,
        email: userData.email
    };
}

// Should use interface instead of inline object types
function updateUser(user: { id: number; name: string; email: string }, updates: { name?: string; email?: string }) {
    return { ...user, ...updates };
}

// Missing generic constraints
function getProperty<T>(obj: T, key: string) {  // Should constrain T
    return obj[key];
}

// Not using enums for related constants
const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator'
};

// Missing return type annotation
function calculateTotal(items: { price: number }[]) {  // Missing return type
    return items.reduce((sum, item) => sum + item.price, 0);
}

// Using function declaration instead of arrow function with explicit types
function validateEmail(email) {  // Missing parameter type
    return email.includes('@');
}

// Not using union types properly
function formatValue(value: any): string {  // Should use union types
    if (typeof value === 'string') {
        return value;
    } else if (typeof value === 'number') {
        return value.toString();
    }
    return 'unknown';
}

// Missing readonly for immutable properties
interface Config {
    apiUrl: string;        // Should be readonly
    timeout: number;       // Should be readonly
    retries: number;
}

// Not using utility types
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Should use Pick<User, 'id' | 'name' | 'email'> instead
interface PublicUser {
    id: number;
    name: string;
    email: string;
}

// Missing error handling with typed exceptions
async function fetchUser(id: number) {  // Should specify return type and error handling
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}

// Using implicit any in array
const items = [];  // Should specify type

// Not using discriminated unions for complex state
interface LoadingState {
    status: string;
    data?: any;
    error?: string;
} 