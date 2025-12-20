"use client";

import React, { useState } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import {
    Plus,
    Save,
    Eye,
    Code,
    FileText,
    Type,
    Hash,
    Layers,
    CheckCircle,
    AlertCircle,
    Settings,
    Monitor,
    Edit,
    ArrowRight
} from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function AdminPanel() {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        language: 'javascript',
        difficulty: 'beginner',
        description: '',
        content: '',
        code: ''
    });
    const [isPreview, setIsPreview] = useState(false);
    const [status, setStatus] = useState(null); // 'saving', 'success', 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('saving');
        // Simulate save
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => setStatus(null), 3000);
        }, 1500);
    };

    return (
        <LayoutWrapper>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center space-x-2 text-accent-blue font-mono text-xs mb-2">
                        <Settings size={14} />
                        <span className="uppercase tracking-widest">Control Panel</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">System CMS</h1>
                    <p className="text-text-secondary font-mono text-sm mt-2 flex items-center space-x-2">
                        <span className="opacity-50">path:</span>
                        <span className="text-accent-blue">/admin/entries/new</span>
                    </p>
                </div>

                <div className="flex items-center space-x-3 bg-panel p-2 rounded-2xl border border-border">
                    <button
                        onClick={() => setIsPreview(!isPreview)}
                        className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all text-sm font-bold ${!isPreview ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20" : "text-text-secondary hover:bg-white/5"
                            }`}
                    >
                        <Edit size={18} />
                        <span>Editor</span>
                    </button>
                    <button
                        onClick={() => setIsPreview(!isPreview)}
                        className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all text-sm font-bold ${isPreview ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20" : "text-text-secondary hover:bg-white/5"
                            }`}
                    >
                        <Monitor size={18} />
                        <span>Preview</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Form */}
                <div className={`${isPreview ? "hidden" : "lg:col-span-8"} space-y-6 animate-in fade-in slide-in-from-left-4 duration-500`}>
                    <form id="admin-form" onSubmit={handleSubmit} className="space-y-8 bg-panel/50 border border-border rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.2em] mb-3 block px-1">Entry Title</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors">
                                        <Type size={20} />
                                    </div>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Uncaught SyntaxError: Unexpected token"
                                        className="w-full bg-background border border-border group-hover:border-border/80 focus:border-accent-blue rounded-2xl py-4 pl-12 pr-6 focus:outline-none transition-all text-base font-medium placeholder:opacity-30"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.2em] mb-3 block px-1">System Slug</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors">
                                        <Hash size={18} />
                                    </div>
                                    <input
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        placeholder="javascript-syntax-error"
                                        className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-blue transition-all font-mono text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.2em] mb-3 block px-1">Target Engine</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors">
                                        <Code size={18} />
                                    </div>
                                    <select
                                        name="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-blue transition-all appearance-none cursor-pointer font-bold"
                                    >
                                        <option value="javascript">JavaScript v8</option>
                                        <option value="python">Python 3.12</option>
                                        <option value="html">HTML5 Semantic</option>
                                        <option value="css">CSS4 Canvas</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.2em] mb-3 block px-1">Diagnostic Summary</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full bg-background border border-border rounded-2xl p-6 focus:outline-none focus:border-accent-blue transition-all resize-none font-medium leading-relaxed"
                                placeholder="A high-level summary for indexed cards..."
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.2em] mb-3 block px-1">Documentation Content (Markdown)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="10"
                                className="w-full bg-background border border-border rounded-2xl p-6 font-mono text-sm focus:outline-none focus:border-accent-blue transition-all leading-relaxed"
                                placeholder="# Detailed breakdown..."
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.2em] mb-3 block px-1">Solution Buffer</label>
                            <textarea
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                rows="8"
                                className="w-full bg-background border border-border rounded-2xl p-6 font-mono text-sm focus:outline-none focus:border-accent-blue transition-all"
                                placeholder="// Code implementation..."
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={status === 'saving'}
                                className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white rounded-2xl py-5 font-black text-lg transition-all shadow-2xl shadow-accent-blue/20 flex items-center justify-center space-x-3 active:scale-[0.98] disabled:opacity-50"
                            >
                                {status === 'saving' ? (
                                    <>
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Deploying to Node...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={24} />
                                        <span>Publish to Production</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Preview Mode */}
                <div className={`${isPreview ? "lg:col-span-12" : "hidden lg:block lg:col-span-4"} animate-in fade-in slide-in-from-right-4 duration-500`}>
                    <div className="sticky top-24">
                        <div className="flex items-center space-x-2 text-text-secondary font-mono text-[10px] uppercase tracking-widest mb-4 px-2">
                            <Monitor size={12} />
                            <span>Live Rendering Node</span>
                        </div>

                        <div className="bg-panel border-2 border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-3xl shadow-black/40 space-y-8 min-h-[400px]">
                            {formData.title ? (
                                <div className="space-y-10 animate-in fade-in zoom-in-95 duration-300">
                                    <div className="space-y-4">
                                        <div className="flex items-center flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-accent-blue/10 text-accent-blue text-[10px] font-black rounded-full border border-accent-blue/20 uppercase tracking-widest">
                                                {formData.language}
                                            </span>
                                            <span className="px-3 py-1 bg-white/5 text-text-secondary text-[10px] font-bold rounded-full border border-border uppercase tracking-widest">
                                                Draft Mode
                                            </span>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">{formData.title}</h3>
                                    </div>

                                    <div className="p-6 bg-background rounded-3xl border border-border border-l-4 border-l-accent-blue italic shadow-inner">
                                        <p className="text-lg text-text-secondary leading-relaxed">"{formData.description || 'Entry description placeholder...'}"</p>
                                    </div>

                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-text-primary whitespace-pre-wrap leading-loose">{formData.content || 'Content visualization starting here...'}</p>
                                    </div>

                                    {formData.code && (
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2 text-accent-green font-mono text-[10px] uppercase tracking-widest font-bold">
                                                <CheckCircle size={12} />
                                                <span>Validated implementation</span>
                                            </div>
                                            <CodeBlock
                                                code={formData.code}
                                                language={formData.language}
                                                fileName={`solution.${formData.language === 'python' ? 'py' : 'js'}`}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-[400px] flex flex-col items-center justify-center text-center opacity-20">
                                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-8">
                                        <FileText size={48} />
                                    </div>
                                    <p className="text-sm font-mono tracking-[0.3em] uppercase font-bold">I/O Stream Empty</p>
                                    <p className="text-xs mt-4 max-w-[200px] mx-auto opacity-50">Populate the editor fields to initialize live documentation preview.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex items-center justify-center space-x-4 opacity-50">
                            <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                                <span className="text-[10px] font-mono">AUTOSAVE: ON</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                                <span className="text-[10px] font-mono">SYNC: ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Notification */}
            {status === 'success' && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:right-12 md:translate-x-0 bg-accent-green text-white p-6 rounded-3xl shadow-3xl flex items-center space-x-4 animate-in slide-in-from-bottom-12 duration-500 z-[100] border-4 border-white/20 backdrop-blur-xl">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                        <CheckCircle size={32} />
                    </div>
                    <div>
                        <p className="font-black text-xl leading-tight tracking-tight">Deployment Successful</p>
                        <p className="text-sm opacity-90 font-medium">New solution is now live on global CDN.</p>
                    </div>
                </div>
            )}
        </LayoutWrapper>
    );
}
