"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LayoutWrapper from '@/components/LayoutWrapper';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function SignupPage() {
    const { signup } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const res = await signup(formData.email.trim(), formData.password, formData.name);
        if (res.success) {
            router.push('/dashboard');
        } else {
            setError(res.error || 'Signup failed');
            setLoading(false);
        }
    };

    return (
        <LayoutWrapper>
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-panel border-2 border-border p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-500">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-accent-primary/10 border border-accent-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <UserPlus size={32} className="text-accent-primary" />
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Join ErrorWiki</h1>
                        <p className="text-text-secondary">Create an account to start contributing</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-primary transition-colors" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent-primary transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent-primary transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-primary transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent-primary transition-all"
                                    placeholder="••••••••"
                                    minLength={8}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent-primary text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Creating Account...' : <><span>create Account</span> <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-text-secondary">
                        Already have an account?{' '}
                        <Link href="/login" className="text-accent-primary font-bold hover:underline">
                            Sign in instead
                        </Link>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
