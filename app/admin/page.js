"use client";

import React, { useState } from 'react';
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
    Trash2
} from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import { cn } from '@/lib/utils';
import { LANGUAGES } from '@/lib/languages';

export default function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [view, setView] = useState('list'); // 'list' | 'editor'
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        language: 'javascript',
        description: '',
        content: '',
        code: ''
    });
    const [isPreview, setIsPreview] = useState(false);
    const [status, setStatus] = useState(null);

    // Fetch posts when authenticated
    React.useEffect(() => {
        if (isAuthenticated && view === 'list') {
            fetchPosts();
        }
    }, [isAuthenticated, view]);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/posts');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (accessCode === '@Vikash22') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid Access Code');
        }
    };

    const handleCreateNew = () => {
        setFormData({
            title: '',
            slug: '',
            language: 'javascript',
            description: '',
            content: '',
            code: ''
        });
        setView('editor');
    };

    const handleEdit = (post) => {
        setFormData({
            title: post.title || '',
            slug: post.slug || '',
            language: post.language || 'javascript',
            description: post.description || '',
            content: post.content || '',
            code: post.code || ''
        });
        setView('editor');
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
                setTimeout(() => {
                    setStatus(null);
                    setView('list'); // Return to list after save
                }, 1500);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
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
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
                <header className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center space-x-2 text-accent-blue mb-2 font-mono text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase">
                            <Settings size={14} />
                            <span>Control Panel</span>
                        </div>
                        <h1 className="text-3xl md:text-6xl font-black tracking-tighter uppercase md:normal-case">System CMS</h1>
                        <p className="text-text-secondary font-mono text-[10px] md:text-sm opacity-50">path: <span className="text-accent-blue">/admin/{view}</span></p>
                    </div>

                    <div className="flex items-center gap-4">
                        {view === 'editor' && (
                            <button
                                onClick={() => setView('list')}
                                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-panel border-2 border-border font-black text-xs hover:bg-white/5 transition-all uppercase tracking-widest text-text-secondary"
                            >
                                <Lock size={16} />
                                <span>Cancel</span>
                            </button>
                        )}

                        {view === 'list' && (
                            <button
                                onClick={handleCreateNew}
                                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-accent-blue text-white font-black text-xs hover:scale-105 transition-all uppercase tracking-widest shadow-lg shadow-accent-blue/20"
                            >
                                <PenLine size={16} />
                                <span>New Entry</span>
                            </button>
                        )}

                        {view === 'editor' && (
                            <div className="flex items-center p-1 bg-panel border-2 border-border rounded-xl md:rounded-2xl shadow-xl w-fit">
                                <button
                                    onClick={() => setIsPreview(false)}
                                    className={cn(
                                        "flex items-center space-x-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-black text-[10px] md:text-sm transition-all uppercase tracking-widest",
                                        !isPreview ? "bg-accent-blue text-white shadow-lg" : "text-text-secondary hover:text-text-primary"
                                    )}
                                >
                                    <PenLine size={16} className="md:w-[18px] md:h-[18px]" />
                                    <span>EDITOR</span>
                                </button>
                                <button
                                    onClick={() => setIsPreview(true)}
                                    className={cn(
                                        "flex items-center space-x-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-black text-[10px] md:text-sm transition-all uppercase tracking-widest",
                                        isPreview ? "bg-accent-blue text-white shadow-lg" : "text-text-secondary hover:text-text-primary"
                                    )}
                                >
                                    <Monitor size={16} className="md:w-[18px] md:h-[18px]" />
                                    <span>PREVIEW</span>
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {view === 'list' ? (
                    <div className="bg-panel border-2 border-border rounded-[2rem] p-6 md:p-8 shadow-3xl">
                        <h2 className="text-xl font-black mb-6 uppercase tracking-widest flex items-center gap-3">
                            <Hash size={20} className="text-accent-blue" />
                            All Entries ({posts.length})
                        </h2>

                        {isLoading ? (
                            <div className="py-20 text-center text-text-secondary animate-pulse">Loading database...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border/50 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-black">
                                            <th className="py-4 pl-4">Title</th>
                                            <th className="py-4">Slug</th>
                                            <th className="py-4">Lang</th>
                                            <th className="py-4 pr-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map((post) => (
                                            <tr key={post.slug} className="border-b border-border/30 hover:bg-white/5 transition-colors group">
                                                <td className="py-4 pl-4 font-bold max-w-[200px] truncate">{post.title}</td>
                                                <td className="py-4 font-mono text-xs text-text-secondary">{post.slug}</td>
                                                <td className="py-4">
                                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-black uppercase tracking-widest border border-white/10">{post.language}</span>
                                                </td>
                                                <td className="py-4 pr-4 text-right">
                                                    <button
                                                        onClick={() => handleEdit(post)}
                                                        className="px-4 py-2 bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {posts.length === 0 && (
                                    <div className="py-12 text-center text-text-secondary text-sm">No entries found. Create one!</div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Form Area */}
                        <div className={cn(
                            "lg:col-span-12",
                            isPreview ? "hidden lg:block lg:col-span-7" : "block lg:col-span-12"
                        )}>
                            <form onSubmit={handleSubmit} className="bg-panel border-2 border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-3xl">
                                <div className="space-y-6 md:space-y-8">
                                    {/* Entry Title */}
                                    <div>
                                        <label className="block text-[9px] md:text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-2 md:mb-3 ml-1">Entry Title</label>
                                        <div className="relative group">
                                            <Type className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors md:w-5 md:h-5" size={18} />
                                            <input
                                                name="title"
                                                type="text"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="SyntaxError: Unexpected token"
                                                className="w-full bg-background/50 border-2 border-border px-12 md:px-14 py-4 md:py-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-accent-blue/50 transition-all font-black text-base md:text-lg"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <div>
                                            <label className="block text-[9px] md:text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-2 md:mb-3 ml-1">System Slug</label>
                                            <div className="relative group">
                                                <Hash className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors md:w-5 md:h-5" size={18} />
                                                <input
                                                    name="slug"
                                                    type="text"
                                                    value={formData.slug}
                                                    onChange={handleChange}
                                                    placeholder="js-syntax-error"
                                                    className="w-full bg-background/50 border-2 border-border px-12 md:px-14 py-4 md:py-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-accent-blue/50 transition-all font-mono text-xs md:text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[9px] md:text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-2 md:mb-3 ml-1">Target Engine</label>
                                            <div className="relative group">
                                                <Code2 className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors md:w-5 md:h-5" size={18} />
                                                <select
                                                    name="language"
                                                    value={formData.language}
                                                    onChange={handleChange}
                                                    className="w-full bg-background/50 border-2 border-border px-12 md:px-14 py-4 md:py-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-accent-blue/50 transition-all font-black appearance-none cursor-pointer text-xs md:text-sm uppercase tracking-widest"
                                                >
                                                    {LANGUAGES.map(lang => (
                                                        <option key={lang.id} value={lang.slug}>{lang.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[9px] md:text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-2 md:mb-3 ml-1">Diagnostic Summary</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Brief summary for indexed cards..."
                                            className="w-full bg-background/50 border-2 border-border p-5 md:p-6 rounded-xl md:rounded-2xl focus:outline-none focus:border-accent-blue/50 transition-all min-h-[100px] md:min-h-[120px] font-bold text-xs md:text-sm leading-relaxed resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[9px] md:text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-2 md:mb-3 ml-1">Documentation Content</label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            placeholder="# Detailed breakdown..."
                                            className="w-full bg-background/50 border-2 border-border p-5 md:p-6 rounded-xl md:rounded-2xl focus:outline-none focus:border-accent-blue/50 transition-all min-h-[150px] md:min-h-[200px] font-mono text-[10px] md:text-xs resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[9px] md:text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-2 md:mb-3 ml-1">Solution (Code)</label>
                                        <textarea
                                            name="code"
                                            value={formData.code}
                                            onChange={handleChange}
                                            placeholder="// Solution code here..."
                                            className="w-full bg-background/50 border-2 border-border p-5 md:p-6 rounded-xl md:rounded-2xl focus:outline-none focus:border-accent-blue/50 transition-all min-h-[150px] md:min-h-[200px] font-mono text-[10px] md:text-xs resize-none"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={status === 'saving'}
                                            className="w-full bg-accent-blue active-scale text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-xs md:text-lg transition-all shadow-2xl shadow-accent-blue/20 flex items-center justify-center space-x-3 disabled:opacity-50 uppercase tracking-[0.2em]"
                                        >
                                            {status === 'saving' ? (
                                                <>
                                                    <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                                    <span>DEPLOYING...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={20} className="md:w-6 md:h-6" />
                                                    <span>PUBLISH TO PRODUCTION</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Preview Mode */}
                        <div className={cn(
                            "lg:col-span-12",
                            !isPreview && "hidden lg:block lg:col-span-5"
                        )}>
                            <div className="sticky top-24">
                                <div className="flex items-center space-x-2 text-text-secondary font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-4 px-2">
                                    <Monitor size={12} />
                                    <span>Live Rendering Node</span>
                                </div>

                                <div className="bg-panel border-2 border-border/50 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-3xl space-y-6 md:space-y-8 min-h-[400px] md:min-h-[500px]">
                                    {formData.title ? (
                                        <div className="space-y-6 md:space-y-8 animate-in fade-in transition-all duration-300">
                                            <div className="space-y-3 md:space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-accent-blue/10 text-accent-blue text-[9px] md:text-[10px] font-black rounded-full border border-accent-blue/20 uppercase tracking-widest">
                                                        {formData.language.toUpperCase()}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl md:text-3xl font-black leading-tight tracking-tight uppercase md:normal-case">{formData.title}</h3>
                                            </div>

                                            <p className="text-sm md:text-base text-text-secondary leading-relaxed border-l-2 border-accent-blue pl-4 italic opacity-80">
                                                {formData.description || 'Buffer empty. Awaiting input stream...'}
                                            </p>

                                            {formData.code && (
                                                <div className="scale-95 origin-top-left -ml-2 w-[105%] md:scale-100 md:ml-0 md:w-full">
                                                    <CodeBlock
                                                        code={formData.code}
                                                        language={formData.language}
                                                        fileName={`fix.${formData.language === 'python' ? 'py' : 'js'}`}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="h-[300px] md:h-[400px] flex flex-col items-center justify-center text-center opacity-10">
                                            <FileText size={48} className="md:w-16 md:h-16 mb-4 md:mb-6" />
                                            <p className="text-[9px] md:text-xs font-black font-mono tracking-[0.3em] uppercase">I/O Stream Empty</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
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
