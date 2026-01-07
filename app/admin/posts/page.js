"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FileText,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    CheckCircle,
    XCircle,
    AlertTriangle
} from 'lucide-react';
import { getPosts, deletePost } from '@/lib/posts';
import { useAuth } from '@/context/AuthContext';

export default function PostsManager() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, published, draft

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            // Get all posts (limit 100 for now, pagination to be added if needed)
            const data = await getPosts(100);
            setPosts(data || []);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug) => {
        if (!confirm(`Are you sure you want to delete this post? This cannot be undone.`)) return;
        try {
            await deletePost(slug);
            // Optimistic update
            setPosts(posts.filter(p => p.slug !== slug));
        } catch (error) {
            alert("Failed to delete post: " + error.message);
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.slug || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight">Posts Manager</h1>
                    <p className="text-text-secondary">Manage blog posts, error solutions, and documentation.</p>
                </div>
                <Link
                    href="/dashboard?mode=new" // Reusing main dashboard editor for now, or create new admin route
                    // Better: Link to /admin/posts/new if we build it, or redirect to editor.
                    // For now, let's link to the existing user editor but maybe we should build a better one.
                    // Let's keep it simple: Link to the main editor but simpler to clone/create.
                    className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-xl font-bold shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform"
                >
                    <Plus size={18} />
                    New Post
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-panel border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-accent-primary transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['all', 'published', 'draft'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`
                                px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap
                                ${filterStatus === status
                                    ? 'bg-accent-primary text-white border-accent-primary'
                                    : 'bg-surface border-border text-text-secondary hover:bg-surface-highlight'
                                }
                            `}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-panel border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface border-b border-border text-xs uppercase tracking-wider text-text-tertiary font-bold">
                                <th className="p-4 pl-6">Title</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Stats</th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="p-4 pl-6"><div className="h-4 bg-surface rounded w-3/4"></div></td>
                                        <td className="p-4"><div className="h-4 bg-surface rounded w-16"></div></td>
                                        <td className="p-4"><div className="h-4 bg-surface rounded w-12"></div></td>
                                        <td className="p-4"><div className="h-4 bg-surface rounded w-20"></div></td>
                                        <td className="p-4"><div className="h-4 bg-surface rounded w-8 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-text-secondary">
                                        No posts found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map(post => {
                                    const isError = post.slug.includes('error') || post.title.toLowerCase().includes('error'); // Basic heuristic if type missing
                                    // Better: check post content or metadata if available. 
                                    // Assuming 'language' field might be 'error' based on previous context.
                                    const type = post.language === 'error' ? 'Error Solution' : 'Blog Post';

                                    return (
                                        <tr key={post.id} className="hover:bg-surface/50 transition-colors group">
                                            <td className="p-4 pl-6">
                                                <div className="font-bold text-text-primary line-clamp-1">{post.title}</div>
                                                <div className="text-xs text-text-tertiary font-mono mt-0.5">{post.slug}</div>
                                            </td>
                                            <td className="p-4">
                                                {post.status === 'published' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-wider border border-green-500/20">
                                                        <CheckCircle size={10} /> Published
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-wider border border-yellow-500/20">
                                                        <AlertTriangle size={10} /> Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <span className="text-xs font-medium text-text-secondary bg-surface px-2 py-1 rounded border border-border">
                                                    {type}
                                                </span>
                                            </td>
                                            <td className="p-4 text-xs text-text-secondary">
                                                <div className="flex flex-col gap-1">
                                                    <span>👁 {post.views || 0}</span>
                                                    <span>❤️ {post.likes || 0}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 pr-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={`/${type === 'Error Solution' ? 'errors' : 'blog'}/${post.slug}`}
                                                        target="_blank"
                                                        className="p-2 hover:bg-surface rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                                                        title="View Live"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link
                                                        href={`/dashboard?edit=${post.slug}`} // Or admin specific editor
                                                        className="p-2 hover:bg-blue-500/10 rounded-lg text-text-secondary hover:text-blue-500 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.slug)}
                                                        className="p-2 hover:bg-red-500/10 rounded-lg text-text-secondary hover:text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
