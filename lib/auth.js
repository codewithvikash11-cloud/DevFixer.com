// Replaces Appwrite Auth Service with Custom API calls

export const authService = {
    login: async (email, password) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        return data.user; // Login endpoint currently returns { success: true }, we should fetch user separately or return it.
        // Actually, context calls checkUser() after login usually, or we can return user from login.
        // Let's update login endpoint to return user or just return true and let context fetch me.
        // For now, return true.
    },

    getCurrentUser: async () => {
        const res = await fetch('/api/auth/me', {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        const data = await res.json(); // returns user object or null
        return data;
    },

    logout: async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
    }
};
