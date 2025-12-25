"use client";

import React, { useState, useEffect } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import {
    Save,
    Type,
    Hash,
    Settings,
    Monitor,
    PenLine,
    Lock,
    Key,
    Code2,
    CheckCircle,
    FileText,
    Trash2,
    Search,
    Filter,
    ArrowLeft,
    ArrowRight,
    TrendingUp,
    LayoutDashboard,
    LogOut,
    Eye,
    StickyNote,
    Globe
} from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import { cn } from '@/lib/utils';
import { LANGUAGES } from '@/lib/languages';

const LOGIN_KEY = 'devfixer_admin_auth';

export default function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [view, setView] = useState('dashboard'); // 'dashboard' | 'list' | 'editor' | 'pages-list' | 'pages-editor'
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);

    // List View State
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'published' | 'draft'

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

    // Page Editor State
    const [pageFormData, setPageFormData] = useState({
        slug: '',
        title: '',
        content: '',
        isSystem: false,
        sections: {}
    });

    // Initial Auth Check
    useEffect(() => {
        const storedAuth = localStorage.getItem(LOGIN_KEY);
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
            fetchPosts();
            fetchPages();
        }
    }, []);

    // Fetch posts
    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts');
            const data = await res.json();
            if (Array.isArray(data)) {
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(data);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error('Failed to fetch posts', error);
            setPosts([]);
        }
    };

    // Fetch pages
    const fetchPages = async () => {
        try {
            const res = await fetch('/api/pages');
            const data = await res.json();
            if (Array.isArray(data)) {
                setPages(data);
            } else {
                setPages([]);
            }
        } catch (error) {
            console.error('Failed to fetch pages', error);
            setPages([]);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (accessCode === '@Vikash22') {
            setIsAuthenticated(true);
            localStorage.setItem(LOGIN_KEY, 'true');
            fetchPosts();
        } else {
            alert('Invalid Access Code');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(LOGIN_KEY);
        setAccessCode('');
        setView('dashboard');
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
        setView('editor');
    };

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;

        try {
            const res = await fetch(`/api/posts?slug=${slug}`, { method: 'DELETE' });
            if (res.ok) {
                fetchPosts();
                if (view === 'editor') setView('list');
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    // Page Handlers
    const handleCreatePage = () => {
        setPageFormData({
            slug: '',
            title: '',
            content: '',
            isSystem: false,
            sections: {}
        });
        setIsPreview(false);
        setView('pages-editor');
    };

    const handleEditPage = (page) => {
        setPageFormData({
            slug: page.slug,
            title: page.title,
            content: page.content || '',
            isSystem: page.isSystem || false,
            sections: page.sections || {}
        });
        setIsPreview(false);
        setView('pages-editor');
    };

    const handleSavePage = async (e) => {
        e.preventDefault();
        setStatus('saving');

        try {
            const res = await fetch('/api/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pageFormData)
            });

            if (res.ok) {
                setStatus('success');
                fetchPages();
                setTimeout(() => {
                    setStatus(null);
                    setView('pages-list');
                }, 1000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Auto-generate slug from title if slug is empty or matches previous title slug
            if (name === 'title' && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))) {
                newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('saving');

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                fetchPosts();
                setTimeout(() => {
                    setStatus(null);
                    setView('list');
                }, 1000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    // Filtered posts for list view
    const filteredPosts = (posts || []).filter(post => {
        const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.slug || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Counts for dashboard
    const stats = {
        total: posts?.length || 0,
        published: (posts || []).filter(p => p.status === 'published').length,
        drafts: (posts || []).filter(p => p.status === 'draft').length
    };

    if (!isAuthenticated) {
        return (
            <LayoutWrapper>
                <div className="min-h-[80vh] flex items-center justify-center px-4">
                    <div className="w-full max-w-md bg-panel border-2 border-border p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-accent-blue/10 border border-accent-blue/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Lock size={32} className="text-accent-blue" />
                        </div>
                        <h1 className="text-2xl font-black text-center mb-2 uppercase tracking-tight">System Access</h1>
                        <p className="text-text-secondary text-center mb-8 text-sm">Please enter the administrative access code to continue.</p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative group">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors" size={18} />
                                <input
                                    type="password"
                                    value={accessCode}
                                    onChange={(e) => setAccessCode(e.target.value)}
                                    placeholder="Enter Access Code"
                                    className="w-full bg-background border-2 border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent-blue transition-all font-mono"
                                />
                            </div>
                            <button type="submit" className="w-full bg-accent-blue text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-blue/20">
                                Verify Access
                            </button>
                        </form>
                    </div>
                </div>
            </LayoutWrapper>
        );
    }

    return (
        <LayoutWrapper>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Admin Header */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center space-x-2 text-accent-blue mb-2 font-mono text-[10px] font-black tracking-[0.3em] uppercase">
                            <Settings size={14} />
                            <span>Administrator Control</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">CMS Dashboard</h1>
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
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-all text-xs font-bold uppercase tracking-widest"
                        >
                            <LogOut size={16} />
                            <span>Exit</span>
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
                                <p className="text-xs uppercase tracking-widest text-text-secondary font-bold">Total Posts</p>
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

                            <div onClick={() => setView('pages-list')} className="p-6 bg-panel border-2 border-border/60 rounded-3xl cursor-pointer hover:border-accent-blue/50 transition-all group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
                                        <StickyNote size={24} />
                                    </div>
                                    <ArrowRight size={20} className="text-text-secondary group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-4xl font-black mb-1">{pages.length}</h3>
                                <p className="text-xs uppercase tracking-widest text-text-secondary font-bold">Static Pages</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setView('list')}
                                className="flex-1 py-4 bg-panel border-2 border-border rounded-2xl font-black text-sm hover:bg-white/5 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <Hash size={18} />
                                Manage All Posts
                            </button>
                            <button
                                onClick={() => setView('pages-list')}
                                className="flex-1 py-4 bg-panel border-2 border-border rounded-2xl font-black text-sm hover:bg-white/5 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <Globe size={18} />
                                Manage Pages
                            </button>
                            <button
                                onClick={handleCreateNew}
                                className="flex-1 py-4 bg-accent-blue text-white rounded-2xl font-black text-sm shadow-xl shadow-accent-blue/20 hover:scale-[1.01] transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <PenLine size={18} />
                                Create New Post
                            </button>
                        </div>
                    </div>
                )}

                {/* VIEW: LIST */}
                {view === 'list' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-panel border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent-blue transition-all"
                                />
                            </div>
                            <div className="flex gap-2">
                                {/* Simple filter buttons */}
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
                            <button
                                onClick={handleCreateNew}
                                className="px-6 py-2 bg-accent-blue text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent-blue/20"
                            >
                                New +
                            </button>
                        </div>

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
                                            <tr key={post.slug} className="border-b border-border/30 hover:bg-white/5 transition-colors group">
                                                <td className="py-4 pl-6">
                                                    <div className="font-bold max-w-[300px] truncate">{post.title}</div>
                                                    <div className="text-xs text-text-secondary font-mono mt-1 opacity-70">{post.slug}</div>
                                                </td>
                                                <td className="py-4">
                                                    <span className={cn(
                                                        "px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border",
                                                        post.status === 'published' ? "bg-accent-green/10 text-accent-green border-accent-green/20" : "bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20"
                                                    )}>
                                                        {post.status || 'published'}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-xs text-text-secondary font-mono">
                                                    {new Date(post.createdAt || Date.now()).toLocaleDateString()}
                                                </td>
                                                <td className="py-4 pr-6 text-right space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(post)}
                                                        className="p-2 bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <PenLine size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(post.slug)}
                                                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredPosts.length === 0 && (
                                <div className="py-20 text-center text-text-secondary">No posts found matching your filters.</div>
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
                                <button
                                    onClick={() => setIsPreview(false)}
                                    className={cn("px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", !isPreview ? "bg-accent-blue text-white" : "text-text-secondary hover:text-white")}
                                >
                                    Editor
                                </button>
                                <button
                                    onClick={() => setIsPreview(true)}
                                    className={cn("px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", isPreview ? "bg-accent-blue text-white" : "text-text-secondary hover:text-white")}
                                >
                                    Preview
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className={cn("lg:col-span-12 transition-all", isPreview ? "hidden" : "block")}>
                                <form onSubmit={handleSubmit} className="bg-panel border border-border rounded-[2rem] p-8 shadow-2xl space-y-8">
                                    {/* Main Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Title</label>
                                            <input
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors"
                                                placeholder="Post Title"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Slug</label>
                                            <input
                                                name="slug"
                                                value={formData.slug}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors font-mono text-sm"
                                                placeholder="post-slug"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Meta & Status */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Language</label>
                                            <select
                                                name="language"
                                                value={formData.language}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors appearance-none cursor-pointer"
                                            >
                                                {LANGUAGES.map(lang => (
                                                    <option key={lang.id} value={lang.slug}>{lang.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Status</label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors appearance-none cursor-pointer"
                                            >
                                                <option value="published">Published</option>
                                                <option value="draft">Draft</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Description (Summary)</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors min-h-[100px]"
                                            placeholder="Short summary..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Analysis Content (Markdown)</label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors min-h-[200px] font-mono text-sm"
                                            placeholder="Detailed content..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Solution Code</label>
                                        <textarea
                                            name="code"
                                            value={formData.code}
                                            onChange={handleChange}
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors min-h-[200px] font-mono text-sm"
                                            placeholder="// Code here..."
                                        />
                                    </div>

                                    {/* SEO */}
                                    <div className="p-6 bg-background/50 border border-border rounded-xl space-y-6">
                                        <h3 className="font-bold flex items-center gap-2"><Search size={16} /> SEO Settings</h3>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">SEO Title (Optional)</label>
                                            <input
                                                name="seoTitle"
                                                value={formData.seoTitle}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors"
                                                placeholder="Custom Meta Title"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">SEO Description (Optional)</label>
                                            <input
                                                name="seoDescription"
                                                value={formData.seoDescription}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors"
                                                placeholder="Custom Meta Description"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={status === 'saving'}
                                            className="w-full bg-accent-blue text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-accent-blue/20 flex items-center justify-center gap-2"
                                        >
                                            {status === 'saving' ? 'Saving...' : <><Save size={20} /> Save Changes</>}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Preview */}
                            <div className={cn("lg:col-span-12", isPreview ? "block" : "hidden")}>
                                <div className="bg-panel border border-border rounded-[2rem] p-8 shadow-2xl min-h-[600px]">
                                    <h1 className="text-4xl font-black mb-4">{formData.title || 'Untitled Post'}</h1>
                                    <p className="text-xl text-text-secondary mb-8 border-l-4 border-accent-blue pl-4">{formData.description || 'No description'}</p>
                                    <div className="prose prose-invert max-w-none mb-8">
                                        {formData.content ? formData.content.split('\n').map((p, i) => <p key={i}>{p}</p>) : <p className="italic opacity-50">No content</p>}
                                    </div>
                                    <CodeBlock
                                        code={formData.code || '// No code'}
                                        language={formData.language}
                                        fileName="preview"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: PAGES LIST */}
                {view === 'pages-list' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                <Globe size={20} className="text-accent-blue" />
                                Site Pages ({pages.length})
                            </h2>
                            <button
                                onClick={handleCreatePage}
                                className="px-6 py-2 bg-accent-blue text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent-blue/20"
                            >
                                New Page +
                            </button>
                        </div>

                        <div className="bg-panel border-2 border-border rounded-[2rem] p-6 shadow-3xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-border/50 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-black bg-white/5">
                                        <th className="py-4 pl-6">Title</th>
                                        <th className="py-4">Slug</th>
                                        <th className="py-4">Type</th>
                                        <th className="py-4 pr-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.map((page) => (
                                        <tr key={page.slug} className="border-b border-border/30 hover:bg-white/5 transition-colors group">
                                            <td className="py-4 pl-6 font-bold">{page.title}</td>
                                            <td className="py-4 font-mono text-xs text-text-secondary">{page.slug}</td>
                                            <td className="py-4">
                                                <span className={cn(
                                                    "px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border",
                                                    page.isSystem ? "bg-purple-500/10 text-purple-500 border-purple-500/20" : "bg-white/5 text-text-secondary border-white/10"
                                                )}>
                                                    {page.isSystem ? 'System' : 'Custom'}
                                                </span>
                                            </td>
                                            <td className="py-4 pr-6 text-right">
                                                <button
                                                    onClick={() => handleEditPage(page)}
                                                    className="px-4 py-2 bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* VIEW: PAGES EDITOR */}
                {view === 'pages-editor' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center space-x-2 text-text-secondary hover:text-white transition-colors mb-6 cursor-pointer w-fit" onClick={() => setView('pages-list')}>
                            <ArrowLeft size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Back to Pages</span>
                        </div>

                        <form onSubmit={handleSavePage} className="bg-panel border border-border rounded-[2rem] p-8 shadow-2xl space-y-8">
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
                                Editing: {pageFormData.title || 'New Page'}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Page Title</label>
                                    <input
                                        value={pageFormData.title}
                                        onChange={(e) => setPageFormData({ ...pageFormData, title: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">URL Slug</label>
                                    <input
                                        value={pageFormData.slug}
                                        onChange={(e) => setPageFormData({ ...pageFormData, slug: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors font-mono text-sm"
                                        disabled={pageFormData.isSystem}
                                        required
                                    />
                                    {pageFormData.isSystem && <p className="text-[10px] text-accent-yellow mt-1">System page slugs cannot be changed.</p>}
                                </div>
                            </div>

                            {pageFormData.isSystem ? (
                                <div className="space-y-6 border-t border-border pt-6">
                                    <h3 className="font-bold flex items-center gap-2"><Settings size={16} /> Structured Content</h3>
                                    {Object.entries(pageFormData.sections).map(([key, value]) => (
                                        <div key={key} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                            <textarea
                                                value={value}
                                                onChange={(e) => setPageFormData({
                                                    ...pageFormData,
                                                    sections: { ...pageFormData.sections, [key]: e.target.value }
                                                })}
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors min-h-[80px]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-2 border-t border-border pt-6">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Page Content (Markdown)</label>
                                    <textarea
                                        value={pageFormData.content}
                                        onChange={(e) => setPageFormData({ ...pageFormData, content: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none transition-colors min-h-[400px] font-mono text-sm"
                                        placeholder="# Hello World"
                                    />
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'saving'}
                                    className="w-full bg-accent-blue text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-accent-blue/20 flex items-center justify-center gap-2"
                                >
                                    {status === 'saving' ? 'Saving...' : <><Save size={20} /> Save Page</>}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Success Notification */}
                {status === 'success' && (
                    <div className="fixed bottom-12 right-12 bg-accent-green text-white p-6 rounded-3xl shadow-3xl flex items-center space-x-4 animate-in slide-in-from-bottom-12 duration-500 z-[100] border-4 border-white/20">
                        <CheckCircle size={32} />
                        <div>
                            <p className="font-black text-xl tracking-tight leading-tight">Published Successfully</p>
                            <p className="text-sm opacity-90 font-medium">Database updated.</p>
                        </div>
                    </div>
                )}
            </div>
        </LayoutWrapper>
    );
}
