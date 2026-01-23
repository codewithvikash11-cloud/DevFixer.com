"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Mail, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { userId } = await authService.loginWithEmail(email);
            setUserId(userId);
            setStep(2);
        } catch (err) {
            console.error(err);
            setError("Failed to send OTP. Please check your email and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await authService.verifyOTP(userId, otp);
            router.push('/errors');
        } catch (err) {
            console.error(err);
            setError("Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LayoutWrapper>
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-panel border-2 border-border p-8 rounded-[2.5rem] shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-accent-primary/10 border border-accent-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            {step === 1 ? <Mail size={32} className="text-accent-primary" /> : <KeyRound size={32} className="text-accent-primary" />}
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
                            {step === 1 ? 'Welcome Back' : 'Enter Code'}
                        </h1>
                        <p className="text-text-secondary">
                            {step === 1 ? 'Sign in with your email (Passwordless)' : `We sent a code to ${email}`}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold text-center">
                            {error}
                        </div>
                    )}

                    {step === 1 ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-primary transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent-primary transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent-primary text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <><span>Get Code</span> <ArrowRight size={18} /></>}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">OTP Code</label>
                                <div className="relative group">
                                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-primary transition-colors" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent-primary transition-all font-mono text-center tracking-widest text-lg"
                                        placeholder="123456"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent-primary text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <><span>Verify & Login</span> <ArrowRight size={18} /></>}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-center text-sm text-text-secondary hover:text-accent-primary transition-colors"
                            >
                                Use a different email
                            </button>
                        </form>
                    )}

                    <div className="mt-8 text-center text-sm text-text-secondary">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-accent-primary font-bold hover:underline">
                            Join Now
                        </Link>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
