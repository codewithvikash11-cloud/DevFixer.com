"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PenTool, FileText, BarChart3, Users, Zap, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getDashboardStats } from '@/lib/actions/dashboard';
import PageHeader from '@/components/admin/PageHeader';
import StatsCard from '@/components/admin/StatsCard';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ posts: 0, drafts: 0, published: 0, queries: 0, users: 0, loading: true });

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getDashboardStats();
            setStats({
                posts: data.posts,
                drafts: data.drafts,
                published: data.posts - data.drafts, // Approximate if posts is total
                // Actually getDashboardStats returns: posts (published count), drafts (draft count). Total is sum.
                // Let's re-read getDashboardStats:
                // posts: count({status: 'published'})
                // drafts: count({status: 'draft'})
                // So total = posts + drafts
                published: data.posts,
                total: data.posts + data.drafts,
                queries: data.queries,
                users: data.users,
                loading: false
            });
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <PageHeader
                title={`Welcome back, ${user?.name?.split(' ')[0] || 'Admin'}`}
                description="Here's what's happening with your content today."
                actions={
                    <Link
                        href="/admin/create-post"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                    >
                        <PenTool size={18} />
                        <span>Create Post</span>
                    </Link>
                }
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Posts"
                    value={stats.loading ? '...' : stats.total}
                    icon={FileText}
                    color="blue"
                />
                <StatsCard
                    title="Published"
                    value={stats.loading ? '...' : stats.published}
                    icon={CheckCircle2}
                    color="green"
                    trend="up"
                />
                <StatsCard
                    title="Drafts"
                    value={stats.loading ? '...' : stats.drafts}
                    icon={Zap}
                    color="yellow"
                />
                <StatsCard
                    title="AI Queries"
                    value={stats.loading ? '...' : stats.queries}
                    icon={BarChart3}
                    color="purple"
                    trend="up"
                />
            </div>

            {/* Recent Activity / Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b]">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link href="/admin/posts" className="flex items-center justify-between p-4 rounded-xl bg-[#1e293b]/50 hover:bg-[#1e293b] border border-[#334155]/50 transition-all group">
                            <div className="flex items-center gap-3">
                                <FileText className="text-blue-500" size={20} />
                                <span className="font-medium text-slate-200">Manage Content</span>
                            </div>
                            <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                        </Link>
                        <Link href="/admin/media" className="flex items-center justify-between p-4 rounded-xl bg-[#1e293b]/50 hover:bg-[#1e293b] border border-[#334155]/50 transition-all group">
                            <div className="flex items-center gap-3">
                                <Zap className="text-yellow-500" size={20} />
                                <span className="font-medium text-slate-200">Upload Media</span>
                            </div>
                            <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                        </Link>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] opacity-75">
                    <h3 className="text-lg font-bold text-white mb-4">Recent System Logs</h3>
                    <div className="text-sm text-slate-500 text-center py-8">
                        No recent errors or warnings.
                    </div>
                </div>
            </div>
        </div>
    );
}
