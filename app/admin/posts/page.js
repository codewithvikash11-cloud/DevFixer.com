"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts, deletePost } from '@/lib/posts';
import { Plus, Search, Edit2, Trash2, Eye, Filter, CheckCircle, Clock, XCircle, FileText, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function AdminPostsPage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // all, published, draft, pending, rejected, scheduled, mine

    useEffect(() => {
        if (user) {
            fetchPosts();
        }
    }, [user]);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            // Admin sees all, others see only theirs? 
            // Requirement says: Admin & Editor view all. Author view only theirs.
            const isAdminOrEditor = user?.role === 'admin' || user?.role === 'editor';
            const userIdToFilter = isAdminOrEditor ? null : user?.$id;

            const data = await getPosts(100, null, userIdToFilter);
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (slug) => {
        if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;

        try {
            await deletePost(slug);
            setPosts(posts.filter(p => p.slug !== slug));
            alert("Post deleted successfully.");
        } catch (error) {
            alert("Failed to delete post: " + error.message);
        }
    };

    // --- Filtering Logic ---
    const filteredPosts = posts.filter(post => {
        // 1. Search
        const matchesSearch =
            (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.slug || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.authorName || '').toLowerCase().includes(searchQuery.toLowerCase());

        // 2. Tab Filter
        let matchesTab = true;
        if (activeTab === 'mine') {
            matchesTab = post.authorId === user?.$id || post.userId === user?.$id;
        } else if (activeTab !== 'all') {
            matchesTab = post.status === activeTab;
        }

        return matchesSearch && matchesTab;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'draft': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'pending': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'scheduled': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    const tabs = [
        { id: 'all', label: 'All Posts' },
        { id: 'published', label: 'Published' },
        { id: 'draft', label: 'Drafts' },
        { id: 'pending', label: 'Pending' },
        { id: 'rejected', label: 'Rejected' },
        { id: 'mine', label: 'My Posts' }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Posts Manager</h1>
                    <p className="text-text-secondary">Create, edit, and moderate content.</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform uppercase tracking-wider text-xs"
                >
                    <Plus size={16} />
                    New Post
                </Link>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Search */}
                <div className="lg:col-span-4 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
                    <input
                        type="text"
                        placeholder="Search title, slug, or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-panel border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                    />
                </div>

                {/* Tabs */}
                <div className="lg:col-span-8 flex flex-wrap gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border",
                                activeTab === tab.id
                                    ? "bg-accent-primary text-white border-accent-primary shadow-md"
                                    : "bg-panel border-border text-text-secondary hover:bg-surface hover:text-white"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-panel border border-border rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface border-b border-border text-[10px] uppercase tracking-[0.2em] text-text-secondary font-black">
                                <th className="p-4 pl-6">Title</th>
                                <th className="p-4">Author</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center text-text-tertiary animate-pulse">
                                        Loading posts...
                                    </td>
                                </tr>
                            ) : filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-2 text-text-secondary">
                                            <FileText size={32} className="opacity-20" />
                                            <p className="font-bold">No posts found</p>
                                            <p className="text-xs">Try adjusting filters or create a new one.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-surface/50 group transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="font-bold text-text-primary truncate max-w-sm">{post.title}</div>
                                            <div className="text-[10px] text-text-tertiary font-mono mt-0.5 opacity-70">/{post.slug}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center text-[10px] font-black border border-accent-primary/20">
                                                    {(post.authorName?.[0] || 'A').toUpperCase()}
                                                </div>
                                                <span className="text-xs font-bold text-text-secondary">{post.authorName}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                                                getStatusColor(post.status)
                                            )}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-xs font-mono text-text-secondary bg-surface px-2 py-1 rounded border border-border">
                                                {post.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-text-secondary">
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="text-[10px] text-text-tertiary">
                                                    {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/${post.slug}`} target="_blank" className="p-2 text-text-tertiary hover:text-accent-primary hover:bg-accent-primary/10 rounded-lg transition-colors" title="View Live">
                                                    <Eye size={16} />
                                                </Link>
                                                <Link href={`/admin/posts/edit/${post.slug}`} className="p-2 text-text-tertiary hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors" title="Edit">
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.slug)}
                                                    className="p-2 text-text-tertiary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-center text-[10px] text-text-tertiary uppercase tracking-widest font-bold opacity-50">
                Showing {filteredPosts.length} of {posts.length} posts
            </div>
        </div>
    );
}
