"use client";

// Simple Env-based Auth
// In a real app, use HTTP-only cookies or NextAuth.js
// For this request: "Use simple env-based login system"

const ADMIN_EMAIL = "admin@errorwiki.com"; // Hardcoded for simplicity as requested or use mocked check
const ADMIN_PASSWORD = "Admin@12345";

export const authService = {
    login: async (email, password) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const user = {
                $id: 'admin-user',
                name: 'Admin User',
                email: email,
                labels: ['admin'],
                roles: ['admin'] // Mock roles
            };

            if (typeof window !== 'undefined') {
                localStorage.setItem('ew_session', JSON.stringify(user));
            }
            return user;
        }

        throw new Error('Invalid credentials');
    },

    getCurrentUser: async () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('ew_session');
            if (stored) {
                return JSON.parse(stored);
            }
        }
        return null;
    },

    logout: async () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('ew_session');
        }
    }
};
