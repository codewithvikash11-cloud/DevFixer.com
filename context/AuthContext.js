"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';
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
            // Optimization: Check for session in localStorage before making network request
            // This prevents 401 console errors for guest users
            if (typeof window !== 'undefined') {
                const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
                const sessionKey = `a_session_${projectId}`;
                const sessionLegacy = `a_session_${projectId}_legacy`;

                if (!localStorage.getItem(sessionKey) && !localStorage.getItem(sessionLegacy)) {
                    setUser(null);
                    setLoading(false);
                    return;
                }
            }

            const current = await account.get();
            setUser(current);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            // Create session
            await account.createEmailPasswordSession(email, password);
            // Verify & Get User
            const u = await account.get();
            setUser(u);
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, error: error.message };
        }
    };

    const signup = async (email, password, name) => {
        try {
            // Create account
            await account.create('unique()', email, password, name);
            // Auto login
            await login(email, password);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            router.push('/');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, checkUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
