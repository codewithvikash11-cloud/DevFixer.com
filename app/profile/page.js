"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LayoutWrapper from '@/components/LayoutWrapper';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, Hash, ThumbsUp, Shield } from 'lucide-react';

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ posts: 0, likes: 0 });
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            fetchStats();
        }
    }, [user, loading, router]);

    const fetchStats = async () => {
        try {
            // Fetch user's posts to aggregate stats
            const res = await fetch(`/api/posts?userId=${user.$id}&limit=100`);
            const data = await res.json();
            if (Array.isArray(data)) {
                // Calculate total likes received
                const totalLikes = data.reduce((acc, post) => acc + (post.likes || 0), 0);
                setStats({ posts: data.length, likes: totalLikes });
            }
        } catch (error) {
            console.error("Failed to fetch stats", error);
        } finally {
            setFetching(false);
        }
    };

    if (loading || !user) return null;

    return (
        <LayoutWrapper>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-panel border-2 border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className="w-32 h-32 bg-accent-blue/10 rounded-full flex items-center justify-center border-4 border-panel shadow-xl">
                            <span className="text-4xl font-black text-accent-blue uppercase">
                                {user.name.charAt(0)}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left space-y-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">{user.name}</h1>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-text-secondary font-medium">
                                    <Mail size={16} />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-text-secondary/70 text-xs mt-2 uppercase tracking-widest font-bold">
                                    <Shield size={12} />
                                    <span>User ID: {user.$id}</span>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0">
                                <div className="p-4 bg-background/50 border border-border/50 rounded-2xl flex items-center gap-4">
                                    <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue">
                                        <Hash size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-2xl font-black leading-none">{fetching ? '-' : stats.posts}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Posts</div>
                                    </div>
                                </div>
                                <div className="p-4 bg-background/50 border border-border/50 rounded-2xl flex items-center gap-4">
                                    <div className="p-2 bg-accent-green/10 rounded-lg text-accent-green">
                                        <ThumbsUp size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-2xl font-black leading-none">{fetching ? '-' : stats.likes}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Reputation</div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs text-text-secondary">
                                    <Calendar size={14} />
                                    <span>Joined: {new Date(user.$createdAt).toLocaleDateString()}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
