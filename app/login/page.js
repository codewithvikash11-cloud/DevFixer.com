"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LayoutWrapper from '@/components/LayoutWrapper';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const res = await login(formData.email.trim(), formData.password);
        if (res.success) {
            router.push('/dashboard');
        } else {
            setError(res.error || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <LayoutWrapper>
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-panel border-2 border-border p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-500">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-accent-blue/10 border border-accent-blue/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <LogIn size={32} className="text-accent-blue" />
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-text-secondary">Sign in to your DevFixer account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent-blue transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent-blue transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent-blue text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-blue/20 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Signing in...' : <><span>Sign In</span> <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-text-secondary">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-accent-blue font-bold hover:underline">
                            Create one now
                        </Link>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
