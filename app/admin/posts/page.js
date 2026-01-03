"use client";

import React, { useEffect, useState } from 'react';
import { getAllPosts, deleteAdminPost } from '@/lib/actions/posts';
import { Plus, Edit, Trash2, Eye, FileText, Search, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PostsManager() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchPosts = async () => {
        setLoading(true);
        const data = await getAllPosts(100);
        setPosts(data.posts);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return;
        const res = await deleteAdminPost(id);
        if (res.success) fetchPosts();
        else alert('Failed to delete post.');
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Blog Posts Manager</h1>
                    <p className="text-gray-500 text-sm">Create, edit, and manage all articles on the platform.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchPosts} className="p-3 bg-[#0A0A0A] border border-[#222] rounded-xl text-gray-400 hover:text-white transition-all">
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                    </button>
                    <Link
                        href="/admin/posts/new"
                        className="flex items-center gap-2 bg-accent-primary hover:bg-accent-hover text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/20"
                    >
                        <Plus size={18} /> Create New Post
                    </Link>
                </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#222] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#222] bg-[#111]">
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Title</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Author</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading posts...</td></tr>
                            ) : posts.length === 0 ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No posts found. Create one!</td></tr>
                            ) : (
                                posts.map(post => (
                                    <tr key={post.id} className="border-b border-[#222] hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <div className="font-bold text-white mb-1 line-clamp-1">{post.title}</div>
                                            <div className="text-xs text-gray-500 font-mono">/{post.slug}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${post.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    post.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                        'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                                }`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-400">
                                            {post.authorId === 'admin' ? <span className="text-accent-primary font-bold">Admin</span> : post.authorId}
                                        </td>
                                        <td className="p-4 text-xs text-gray-500 font-mono">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/${post.slug}`} target="_blank" className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg">
                                                    <Eye size={16} />
                                                </Link>
                                                <Link href={`/admin/posts/${post.id}`} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg">
                                                    <Edit size={16} />
                                                </Link>
                                                <button onClick={() => handleDelete(post.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
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
        </div>
    );
}
