"use client";

import React, { useEffect, useState } from 'react';
import { getAdminUsers, updateUserStatus } from '@/lib/actions/admin';
import { Users, Ban, CheckCircle, Shield, Search, RefreshCw, AlertTriangle } from 'lucide-react';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        const data = await getAdminUsers(50); // Get last 50
        setUsers(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleBan = async (userId) => {
        if (!confirm('Are you sure you want to BAN this user?')) return;
        const res = await updateUserStatus(userId, 'ban');
        if (res.success) fetchUsers();
        else alert('Failed to ban: ' + res.error);
    };

    const handleUnban = async (userId) => {
        if (!confirm('Restore access for this user?')) return;
        const res = await updateUserStatus(userId, 'unban');
        if (res.success) fetchUsers();
        else alert('Failed to unban.');
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.id.includes(search)
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">User Management</h1>
                    <p className="text-gray-500 text-sm">Control access, view trust scores, and manage bans.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-[#222] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:border-accent-primary outline-none"
                        />
                    </div>
                    <button onClick={fetchUsers} className="p-2.5 bg-[#0A0A0A] border border-[#222] rounded-xl hover:text-white text-gray-400 transition-colors">
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading && users.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">Loading users...</div>
                ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No users found.</div>
                ) : (
                    filteredUsers.map(user => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onBan={() => handleBan(user.id)}
                            onUnban={() => handleUnban(user.id)}
                        />
                    ))
                )}
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-blue-300 flex items-center gap-2">
                <Shield size={14} />
                <span className="font-bold">Trust Score System:</span>
                <span>Users start at 10. AI usage or bad behavior drops the score. Below 0 = Suspicious.</span>
            </div>
        </div>
    );
}

function UserCard({ user, onBan, onUnban }) {
    const isBanned = user.status === 'banned';

    return (
        <div className="bg-[#0A0A0A] border border-[#222] hover:border-[#333] p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-white/5">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg uppercase ${isBanned ? 'bg-red-500/10 text-red-500' : 'bg-gray-800 text-gray-400'
                    }`}>
                    {user.name.charAt(0)}
                </div>
                <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                        {user.name}
                        {user.role === 'admin' && <Shield size={14} className="text-accent-primary" fill="currentColor" />}
                    </h3>
                    <div className="text-xs text-gray-500 font-mono">{user.email} • {new Date(user.joinedAt).toLocaleDateString()}</div>
                </div>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto mt-4 md:mt-0">
                {/* Trust Score */}
                <div className="flex flex-col gap-1 w-full md:w-32">
                    <span className="text-[10px] font-bold uppercase text-gray-500">Trust Score</span>
                    <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${user.trustScore > 8 ? 'bg-accent-primary' :
                                    user.trustScore > 0 ? 'bg-orange-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${Math.min(100, Math.max(0, user.trustScore * 10))}%` }}
                        />
                    </div>
                    <span className="text-xs font-mono text-gray-400 text-right">{user.trustScore} pts</span>
                </div>

                {/* Status Badge */}
                <div className="min-w-[80px] text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${user.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            isBanned ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        }`}>
                        {user.status.toUpperCase()}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {isBanned ? (
                        <button
                            onClick={onUnban}
                            className="p-2 hover:bg-green-500/10 text-green-500 rounded-lg transition-colors text-sm font-bold flex items-center gap-2"
                        >
                            <CheckCircle size={16} /> Unban
                        </button>
                    ) : (
                        <button
                            onClick={onBan}
                            className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors text-sm font-bold flex items-center gap-2"
                            disabled={user.role === 'admin'}
                        >
                            <Ban size={16} /> Ban
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
