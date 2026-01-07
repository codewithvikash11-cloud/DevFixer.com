"use client";

import React, { useState } from 'react';
import {
    Users,
    Search,
    MoreVertical,
    Shield,
    UserX,
    Mail,
    CheckCircle
} from 'lucide-react';

export default function UserManager() {
    const [searchQuery, setSearchQuery] = useState('');

    // MOCK DATA: In a real Appwrite app, listing users requires Server SDK (Node.js).
    // The Client SDK cannot list all users for security reasons.
    // This UI demonstrates the capability assuming a "Profiles" collection or Backend Proxy exists.
    const [users, setUsers] = useState([
        { id: 'u1', name: 'Rahul Sharma', email: 'rahul@roviotech.com', role: 'Admin', status: 'Active', joined: '2023-11-01' },
        { id: 'u2', name: 'Demo User', email: 'demo@roviotech.com', role: 'Moderator', status: 'Active', joined: '2023-12-15' },
        { id: 'u3', name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joined: '2024-01-10' },
        { id: 'u4', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Banned', joined: '2024-01-12' },
        { id: 'u5', name: 'Alex Code', email: 'alex@dev.io', role: 'User', status: 'Active', joined: '2024-02-01' },
    ]);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBan = (id) => {
        if (confirm("Are you sure you want to ban this user?")) {
            setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'Banned' } : u));
        }
    };

    const handlePromote = (id) => {
        if (confirm("Promote user to Admin?")) {
            setUsers(prev => prev.map(u => u.id === id ? { ...u, role: 'Admin' } : u));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight">User Management</h1>
                    <p className="text-text-secondary">View users, manage roles, and handle bans.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold rounded-lg max-w-md">
                    <span>⚠️</span>
                    <span>Note: Client SDK cannot list users. This is a demo view.</span>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-panel border border-border rounded-2xl p-4">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-accent-primary transition-colors"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-panel border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface border-b border-border text-xs uppercase tracking-wider text-text-tertiary font-bold">
                                <th className="p-4 pl-6">User</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-surface/50 transition-colors">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-info text-white flex items-center justify-center font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-text-primary">{user.name}</div>
                                                <div className="text-xs text-text-secondary flex items-center gap-1">
                                                    <Mail size={10} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {user.role === 'Admin' ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-accent-primary/10 text-accent-primary text-[10px] font-black uppercase tracking-wider border border-accent-primary/20">
                                                <Shield size={10} /> Admin
                                            </span>
                                        ) : (
                                            <span className="text-xs font-medium text-text-secondary bg-surface px-2 py-1 rounded border border-border">
                                                User
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {user.status === 'Active' ? (
                                            <span className="inline-flex items-center gap-1 text-green-500 font-bold text-xs">
                                                <CheckCircle size={12} /> Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-red-500 font-bold text-xs">
                                                <UserX size={12} /> Banned
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-xs text-text-secondary">
                                        {user.joined}
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handlePromote(user.id)}
                                                className="p-2 hover:bg-surface rounded-lg text-text-secondary hover:text-accent-primary transition-colors"
                                                title="Promote to Admin"
                                                disabled={user.role === 'Admin'}
                                            >
                                                <Shield size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleBan(user.id)}
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-text-secondary hover:text-red-500 transition-colors"
                                                title="Ban User"
                                            >
                                                <UserX size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
