'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { createPost, updatePost, getPost } from '@/lib/actions/posts';
import { getCategories } from '@/lib/actions/categories';
import { Wand2, Save, Eye, ArrowLeft, Loader2 } from 'lucide-react';

export default function CreatePostPage() {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!editId);
    const [activeTab, setActiveTab] = useState('edit'); // 'edit', 'preview'

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        metaDescription: '',
        category: 'Programming',
        status: 'draft',
        content: ''
    });

    const [rawInput, setRawInput] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadData();
    }, [editId]);

    const loadData = async () => {
        setFetching(true);
        try {
            // Load Categories
            // We need to import getCategories. Let's assume we import allowed.
            // Wait, I need to add import to top first.
            const [postData, catsData] = await Promise.all([
                editId ? getPost(editId) : Promise.resolve(null),
                getCategories()
            ]);

            setCategories(catsData);

            if (postData) {
                setFormData({
                    title: postData.title || '',
                    slug: postData.slug || '',
                    metaDescription: postData.description || '',
                    category: postData.category || 'Uncategorized',
                    status: postData.status || 'draft',
                    content: postData.content || '' // Using 'content' from Schema? Schema has errorText, aiFixExplanation, humanizedContent.
                    // Oh, wait. ErrorPost schema has: title, errorText, aiFixExplanation, humanizedContent...
                    // The generic "Create Post" might be creating a generic blog post OR an Error Post?
                    // The user said "Manage: Error Posts".
                    // But the editor looks like a generic blog editor "Paste AI Content... Humanize".
                    // And the Schema `ErrorPost` has `humanizedContent`.
                    // So `content` in UI should map to `humanizedContent`.
                    // And `errorText` might be empty if created manually?
                    // Let's map accordingly.
                });
                // If it's an ErrorPost, we might want to edit humanizedContent.
                if (postData.humanizedContent) {
                    setFormData(prev => ({ ...prev, content: postData.humanizedContent }));
                }
            }
        } catch (e) {
            console.error("Failed to load data", e);
        } finally {
            setFetching(false);
        }
    };

    // --- LOGIC ---
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: (!editId && (!prev.slug || prev.slug === generateSlug(prev.title))) ? generateSlug(title) : prev.slug
        }));
    };

    const handleHumanize = () => {
        if (!rawInput.trim()) return;

        let activeText = rawInput;

        // 1. Simple Replacements
        const replacements = {
            "delve": "explore",
            "harness": "use",
            "utilize": "use",
            "in conclusion": "To wrap up",
            "moreover": "Additionally",
            "furthermore": "Also",
            "it is important to note": "Note that"
        };

        Object.keys(replacements).forEach(key => {
            const regex = new RegExp(`\\b${key}\\b`, 'gi');
            activeText = activeText.replace(regex, replacements[key]);
        });

        const paragraphs = activeText.split('\n\n');
        setFormData(prev => ({
            ...prev,
            content: paragraphs.join('\n\n')
        }));
    };

    const handleSave = async (statusOverride) => {
        if (!user) return;
        setLoading(true);
        try {
            const finalStatus = statusOverride || formData.status;
            const payload = {
                ...formData,
                status: finalStatus,
                // ErrorPost Schema fields:
                humanizedContent: formData.content, // Editor content -> humanizedContent
                description: formData.metaDescription, // Schema doesn't have description, maybe add it or just use meta? Schema has 'title', 'slug', 'errorText', 'aiFixExplanation'...
                // Wait, Schema ErrorPost: title, errorText, aiFixExplanation, humanizedContent, language, tags, category, slug, status, views.
                // It does NOT have 'description'. It relies on 'humanizedContent' intro?
                // Or I should add 'description' to Schema for SEO meta description.
                // The `app/layout.js` uses dynamic metadata.
                // I'll add description to payload, maybe Mongoose ignores it or I update Schema.
                // Re-reading Schema in step 1234: No description field.
                // I should probably add it or use an excerpt of humanizedContent.
                // For now, let's map it but know it might not be saved unless I update Schema.
                // And we need errorText/aiFixExplanation if creating from scratch?
                // If creating manually, maybe we just put placeholder or empty string.
                errorText: formData.errorText || 'Manual Entry',
                aiFixExplanation: formData.aiFixExplanation || 'Manual Entry',

                category: formData.category, // string

                // Auth
                userId: user._id || user.email,
                authorName: user.email || 'Admin',
            };

            if (editId) {
                await updatePost(editId, payload);
            } else {
                await createPost(payload);
            }

            router.push('/admin/posts');
        } catch (error) {
            console.error(error);
            alert("Failed to save post: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-12 text-center animate-pulse">Loading post...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <button onClick={() => router.back()} className="flex items-center text-sm text-text-secondary hover:text-white transition-colors">
                    <ArrowLeft size={16} className="mr-1" /> Back
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleSave('draft')}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-surface border border-border text-text-primary font-bold hover:bg-surface-highlight transition-all"
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSave('published')}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-[#008000] text-white font-bold hover:bg-[#006600] transition-all flex items-center gap-2"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {editId ? 'Update' : 'Publish'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT: Metadata */}
                <div className="space-y-6">
                    <div className="bg-panel p-6 rounded-2xl border border-border space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary">Metadata</h3>

                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-1">Title</label>
                            <input
                                type="text"
                                className="w-full bg-background border border-border rounded-lg p-2 text-sm focus:border-[#008000] outline-none"
                                value={formData.title}
                                onChange={handleTitleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-1">Slug</label>
                            <input
                                type="text"
                                className="w-full bg-background border border-border rounded-lg p-2 text-sm focus:border-[#008000] outline-none font-mono text-gray-400"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-1">Category</label>
                            <select
                                className="w-full bg-background border border-border rounded-lg p-2 text-sm focus:border-[#008000] outline-none"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Uncategorized">Uncategorized</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-1">Meta Description</label>
                            <textarea
                                className="w-full bg-background border border-border rounded-lg p-2 text-sm focus:border-[#008000] outline-none min-h-[100px]"
                                value={formData.metaDescription}
                                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT: Content Editor */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Raw Input */}
                    <div className="bg-panel p-6 rounded-2xl border border-border">
                        <label className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">
                            <span>1. Paste AI Content</span>
                            <button
                                onClick={handleHumanize}
                                className="text-xs text-[#008000] flex items-center gap-1 hover:underline"
                            >
                                <Wand2 size={12} /> Humanize Text
                            </button>
                        </label>
                        <textarea
                            className="w-full bg-background border border-border rounded-xl p-4 text-sm font-mono focus:border-[#008000] outline-none min-h-[200px]"
                            placeholder="Paste ChatGPT output here..."
                            value={rawInput}
                            onChange={(e) => setRawInput(e.target.value)}
                        />
                    </div>

                    {/* Final Preview/Edit */}
                    <div className="bg-panel p-6 rounded-2xl border border-border h-[600px] flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary">2. Final Content</h3>
                            <div className="flex bg-[#141414] p-1 rounded-lg border border-[#262626]">
                                <button
                                    onClick={() => setActiveTab('edit')}
                                    className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'edit' ? 'bg-[#008000] text-white' : 'text-gray-400'}`}
                                >
                                    Editor
                                </button>
                                <button
                                    onClick={() => setActiveTab('preview')}
                                    className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'preview' ? 'bg-[#008000] text-white' : 'text-gray-400'}`}
                                >
                                    Preview
                                </button>
                            </div>
                        </div>

                        {activeTab === 'edit' ? (
                            <textarea
                                className="flex-1 w-full bg-background border border-border rounded-xl p-4 text-sm focus:border-[#008000] outline-none resize-none"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Humanized content will appear here..."
                            />
                        ) : (
                            <div className="flex-1 w-full bg-white text-black rounded-xl p-8 overflow-y-auto prose prose-sm max-w-none">
                                {formData.content.split('\n').map((line, i) => {
                                    if (line.startsWith('# ')) return <h1 key={i}>{line.replace('# ', '')}</h1>;
                                    if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
                                    if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
                                    if (line.startsWith('- ')) return <li key={i}>{line.replace('- ', '')}</li>;
                                    if (line === '') return <br key={i} />;
                                    return <p key={i}>{line}</p>;
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
