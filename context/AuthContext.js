"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const current = await authService.getCurrentUser();
            setUser(current);
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const user = await authService.login(email, password);
            setUser(user);
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, error: error.message };
        }
    };

    const signup = async (email, password, name) => {
        // Validation only - Admin creation is manual/static for this phase
        return { success: false, error: "Signups are disabled. Admin only." };
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
