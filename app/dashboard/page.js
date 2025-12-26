"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '@/components/LayoutWrapper';
import {
    Save,
    Type,
    Hash,
    Settings,
    PenLine,
    Plus,
    CheckCircle,
    Trash2,
    Search,
    Filter,
    ArrowLeft,
    ArrowRight,
    LayoutDashboard,
    LogOut,
    Eye
} from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import { cn } from '@/lib/utils';
import { LANGUAGES } from '@/lib/languages';
import { getPosts, createPost, updatePost, deletePost } from '@/lib/posts';


export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    const [view, setView] = useState('dashboard'); // 'dashboard' | 'list' | 'editor'
    const [posts, setPosts] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [status, setStatus] = useState(null);

    // List View State
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Editor View State
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        language: 'javascript',
        description: '',
        content: '',
        code: '',
        status: 'published',
        seoTitle: '',
        seoDescription: ''
    });
    const [isPreview, setIsPreview] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            fetchUserPosts();
        }
    }, [user, loading, router]);

    const fetchUserPosts = async () => {
        setIsFetching(true);
        try {
            // Use Client SDK directly
            const data = await getPosts(100, null, user.$id);
            if (Array.isArray(data)) {
                // Client-side sort just in case (though API does it too)
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(data);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setIsFetching(false);
        }
    };

    const handleCreateNew = () => {
        setFormData({
            title: '',
            slug: '',
            language: 'javascript',
            description: '',
            content: '',
            code: '',
            status: 'published',
            seoTitle: '',
            seoDescription: ''
        });
        setIsPreview(false);
        setIsEditing(false);
        setView('editor');
    };

    const handleEdit = (post) => {
        setFormData({
            title: post.title || '',
            slug: post.slug || '',
            language: post.language || 'javascript',
            description: post.description || '',
            content: post.content || '',
            code: post.code || '',
            status: post.status || 'published',
            seoTitle: post.seoTitle || '',
            seoDescription: post.seoDescription || ''
        });
        setIsPreview(false);
        setIsEditing(true);
        setView('editor');
    };

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await deletePost(slug);
            fetchUserPosts();
            if (view === 'editor') setView('list');
        } catch (error) {
            console.error("Delete failed:", error);
            alert('Failed to delete post: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content) {
            alert("Title and Content are required.");
            return;
        }

        setStatus('saving');

        try {
            const payload = {
                ...formData,
                authorId: user.$id, // Explicitly send authorId
                userId: user.$id,   // Legacy support
                authorName: user.name
            };

            if (isEditing) {
                await updatePost(formData.slug, payload);
                // Note: updatePost in lib might throw if not owner, which is good.
            } else {
                await createPost(payload);
            }

            setStatus('success');
            fetchUserPosts();
            setTimeout(() => {
                setStatus(null);
                setView('list');
            }, 1000);

        } catch (error) {
            setStatus('error');
            console.error("Save failed:", error);
            if (error.message && error.message.includes('slug')) {
                alert("Error: Slug exists or is invalid.");
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'title' && !isEditing && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))) {
                newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            }
            return newData;
        });
    };

    // Filtered posts for list view
    const filteredPosts = (posts || []).filter(post => {
        const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.slug || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Counts
    const stats = {
        total: posts.length,
        published: posts.filter(p => p.status === 'published').length,
        drafts: posts.filter(p => p.status === 'draft').length
    };

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <LayoutWrapper>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center space-x-2 text-accent-blue mb-2 font-mono text-[10px] font-black tracking-[0.3em] uppercase">
                            <Settings size={14} />
                            <span>Contributor Dashboard</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Welcome, {user.name.split(' ')[0]}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {view !== 'dashboard' && (
                            <button
                                onClick={() => setView('dashboard')}
                                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-panel border border-border hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest text-text-secondary"
                            >
                                <LayoutDashboard size={16} />
                                <span>Overview</span>
                            </button>
                        )}
                        <button
                            onClick={logout}
                            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-all text-xs font-bold uppercase tracking-widest"
                        >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </header>

                {/* VIEW: DASHBOARD */}
                {view === 'dashboard' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div onClick={() => setView('list')} className="p-6 bg-panel border-2 border-border/60 rounded-3xl cursor-pointer hover:border-accent-blue/50 transition-all group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-accent-blue/10 rounded-2xl text-accent-blue">
                                        <Hash size={24} />
                                    </div>
                                    <ArrowRight size={20} className="text-text-secondary group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-4xl font-black mb-1">{stats.total}</h3>
                                <p className="text-xs uppercase tracking-widest text-text-secondary font-bold">My Contributions</p>
                            </div>

                            <div className="p-6 bg-panel border-2 border-border/60 rounded-3xl">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-accent-green/10 rounded-2xl text-accent-green">
                                        <CheckCircle size={24} />
                                    </div>
                                </div>
                                <h3 className="text-4xl font-black mb-1">{stats.published}</h3>
                                <p className="text-xs uppercase tracking-widest text-text-secondary font-bold">Published</p>
                            </div>

                            <div className="p-6 bg-panel border-2 border-border/60 rounded-3xl">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-accent-yellow/10 rounded-2xl text-accent-yellow">
                                        <PenLine size={24} />
                                    </div>
                                </div>
                                <h3 className="text-4xl font-black mb-1">{stats.drafts}</h3>
                                <p className="text-xs uppercase tracking-widest text-text-secondary font-bold">Drafts</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setView('list')}
                                className="flex-1 py-4 bg-panel border-2 border-border rounded-2xl font-black text-sm hover:bg-white/5 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <Hash size={18} />
                                Manage My Posts
                            </button>
                            <button
                                onClick={handleCreateNew}
                                className="flex-1 py-4 bg-accent-blue text-white rounded-2xl font-black text-sm shadow-xl shadow-accent-blue/20 hover:scale-[1.01] transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <Plus size={18} />
                                Create New Post
                            </button>
                        </div>
                    </div>
                )}

                {/* VIEW: LIST */}
                {view === 'list' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Filter Bar */}
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search your posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-panel border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent-blue transition-all"
                                />
                            </div>
                            <div className="flex gap-2">
                                {['all', 'published', 'draft'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setFilterStatus(s)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all",
                                            filterStatus === s ? "bg-accent-blue text-white border-accent-blue" : "bg-panel border-border text-text-secondary hover:bg-white/5"
                                        )}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* List Table */}
                        <div className="bg-panel border border-border rounded-[2rem] overflow-hidden shadow-2xl">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border/50 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-black bg-white/5">
                                            <th className="py-4 pl-6">Title</th>
                                            <th className="py-4">Status</th>
                                            <th className="py-4">Date</th>
                                            <th className="py-4 pr-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPosts.map((post) => (
                                            <tr key={post.slug} className="border-b border-border/30 hover:bg-white/5 transition-colors">
                                                <td className="py-4 pl-6">
                                                    <div className="font-bold max-w-[300px] truncate">{post.title}</div>
                                                    <div className="text-xs text-text-secondary font-mono mt-1 opacity-70">{post.slug}</div>
                                                </td>
                                                <td className="py-4">
                                                    <span className={cn(
                                                        "px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border",
                                                        post.status === 'published' ? "bg-accent-green/10 text-accent-green border-accent-green/20" : "bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20"
                                                    )}>
                                                        {post.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-xs text-text-secondary font-mono">
                                                    {new Date(post.createdAt || Date.now()).toLocaleDateString()}
                                                </td>
                                                <td className="py-4 pr-6 text-right space-x-2">
                                                    <button onClick={() => handleEdit(post)} className="p-2 bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white rounded-lg transition-all">
                                                        <PenLine size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(post.slug)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredPosts.length === 0 && (
                                <div className="py-20 text-center text-text-secondary">No posts found.</div>
                            )}
                        </div>
                    </div>
                )}

                {/* VIEW: EDITOR */}
                {view === 'editor' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => setView('list')}
                                className="flex items-center space-x-2 text-text-secondary hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                            >
                                <ArrowLeft size={16} />
                                <span>Back to List</span>
                            </button>
                            <div className="flex items-center bg-panel border border-border rounded-xl p-1">
                                <button onClick={() => setIsPreview(false)} className={cn("px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", !isPreview ? "bg-accent-blue text-white" : "text-text-secondary hover:text-white")}>Editor</button>
                                <button onClick={() => setIsPreview(true)} className={cn("px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", isPreview ? "bg-accent-blue text-white" : "text-text-secondary hover:text-white")}>Preview</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className={cn("lg:col-span-12 transition-all", isPreview ? "hidden" : "block")}>
                                <form onSubmit={handleSubmit} className="bg-panel border border-border rounded-[2rem] p-8 shadow-2xl space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Title</label>
                                            <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Slug</label>
                                            <input name="slug" value={formData.slug} onChange={handleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors font-mono text-sm" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Language</label>
                                            <select name="language" value={formData.language} onChange={handleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors appearance-none cursor-pointer">
                                                {LANGUAGES.map(lang => <option key={lang.id} value={lang.slug}>{lang.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Status</label>
                                            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors appearance-none cursor-pointer">
                                                <option value="published">Published</option>
                                                <option value="draft">Draft</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Description</label>
                                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors min-h-[100px]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Content (Markdown)</label>
                                        <textarea name="content" value={formData.content} onChange={handleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors min-h-[200px] font-mono text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Solution Code</label>
                                        <textarea name="code" value={formData.code} onChange={handleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors min-h-[200px] font-mono text-sm" />
                                    </div>

                                    <div className="pt-4">
                                        <button type="submit" disabled={status === 'saving'} className="w-full bg-accent-blue text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-accent-blue/20 flex items-center justify-center gap-2">
                                            {status === 'saving' ? 'Saving...' : <><Save size={20} /> Save Changes</>}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Preview */}
                            <div className={cn("lg:col-span-12", isPreview ? "block" : "hidden")}>
                                <div className="bg-panel border border-border rounded-[2rem] p-8 shadow-2xl min-h-[600px]">
                                    <h1 className="text-4xl font-black mb-4">{formData.title}</h1>
                                    <div className="prose prose-invert max-w-none mb-8">{formData.content ? formData.content.split('\n').map((p, i) => <p key={i}>{p}</p>) : null}</div>
                                    <CodeBlock code={formData.code || '// No code'} language={formData.language} fileName="preview" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LayoutWrapper>
    );
}
