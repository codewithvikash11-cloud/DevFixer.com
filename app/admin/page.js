"use client";

import React, { useEffect, useState } from 'react';
import { getAdminStats } from '@/lib/actions/admin';
import {
    ShieldCheck,
    AlertTriangle,
    Users,
    Activity,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { adminService } from '@/lib/admin-service';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        level: 'SECURE',
        threats: 0,
        aiDetections: 0,
        avgTrust: 0
    });
    // Stats from DB
    const [dbStats, setDbStats] = useState({
        totalUsers: 0,
        totalPosts: 0,
        pendingReviews: 0,
        activeUsers: 0
    });
    const [recentLogs, setRecentLogs] = useState([]);

    useEffect(() => {
        // Load Real DB Stats
        const loadStats = async () => {
            const data = await getAdminStats();
            setDbStats(data);
        };
        loadStats();

        // Polling for live feeling
        const interval = setInterval(() => {
            // Refresh stats?
            loadStats();
            setRecentLogs(adminService.getSecurityLogs().slice(0, 5));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) return <div className="p-10 text-accent-primary animate-pulse">Loading secure dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-white mb-2">Security Overview</h1>
                <p className="text-gray-500 text-sm">Real-time platform monitoring and threat detection.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Users"
                    value={dbStats.totalUsers}
                    icon={Users}
                    color="text-blue-400"
                    sub="Registered Accounts"
                />
                <StatCard
                    title="Pending Reviews"
                    value={dbStats.pendingReviews}
                    icon={AlertTriangle}
                    color={dbStats.pendingReviews > 0 ? "text-accent-warning" : "text-green-500"}
                    sub="Action Needed"
                />
                <StatCard
                    title="Total Posts"
                    value={dbStats.totalPosts}
                    icon={Activity}
                    color="text-purple-400"
                    sub="Platform Content"
                />
                <StatCard
                    title="Avg Trust Score"
                    value="98%"
                    icon={ShieldCheck}
                    color="text-green-400"
                    sub="User Risk Level"
                />
            </div>

            {/* Charts / Lists Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Activity Feed */}
                <div className="lg:col-span-2 bg-[#0A0A0A] border border-[#222] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white text-lg">Live Security Feed</h3>
                        <span className="flex items-center gap-2 text-xs font-mono text-accent-primary animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
                            LIVE
                        </span>
                    </div>

                    <div className="space-y-4">
                        {recentLogs.length === 0 ? (
                            <div className="text-center py-10 text-gray-600 italic">No recent security events logged. System clean.</div>
                        ) : (
                            recentLogs.map(log => (
                                <LogItem key={log.id} log={log} />
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions / System Status */}
                <div className="space-y-6">
                    <div className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6">
                        <h3 className="font-bold text-white text-lg mb-4">System Status</h3>
                        <div className="space-y-4">
                            <StatusRow label="AI Detection Engine" status="Online" color="bg-accent-primary" />
                            <StatusRow label="Plagiarism Scanner" status="Online" color="bg-accent-primary" />
                            <StatusRow label="Behavior Tracker" status="Active" color="bg-accent-primary" />
                            <StatusRow label="Database Connection" status="Stable" color="bg-blue-500" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-accent-primary/10 to-transparent border border-accent-primary/20 rounded-2xl p-6">
                        <h3 className="font-bold text-accent-primary text-lg mb-2">Admin Action Required</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            {dbStats.pendingReviews > 0
                                ? `${dbStats.pendingReviews} items pending review in the secure queue.`
                                : "No pending items. You're all caught up!"}
                        </p>
                        <button className="w-full py-2 bg-accent-primary hover:bg-accent-hover text-black font-bold rounded-lg transition-colors text-sm">
                            Go to Review Queue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, sub }) {
    return (
        <div className="bg-[#0A0A0A] border border-[#222] p-5 rounded-2xl hover:border-accent-primary/20 transition-colors group">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
                    <div className={`text-2xl font-black ${color}`}>{value}</div>
                </div>
                <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${color}`}>
                    <Icon size={20} />
                </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
                <ArrowUpRight size={12} className="text-accent-primary" />
                <span>{sub}</span>
            </div>
        </div>
    );
}

function StatusRow({ label, status, color }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{label}</span>
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${color}`}></span>
                <span className="text-xs font-bold text-white">{status}</span>
            </div>
        </div>
    );
}

function LogItem({ log }) {
    const isRejected = log.status === 'REJECTED';
    return (
        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-[#333]">
            <div className={`mt-1 w-2 h-2 rounded-full ${isRejected ? 'bg-red-500' : 'bg-accent-primary'}`} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${isRejected ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                        {log.status}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                        {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                </div>
                <p className="text-sm text-gray-300 mb-1">
                    {log.rejectionReason || "Content approved automatically."}
                </p>
                <div className="flex gap-2 text-[10px] text-gray-500">
                    <span>AI: {log.ai?.score}%</span>
                    <span>•</span>
                    <span>Plagiarism: {log.plagiarism?.score}%</span>
                    <span>•</span>
                    <span>Trust Impact: {log.behavior?.trustScore < 100 ? 'NEGATIVE' : 'NEUTRAL'}</span>
                </div>
            </div>
        </div>
    );
}
