"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Save,
    ArrowLeft,
    AlertCircle,
    RotateCcw
} from 'lucide-react';
import { createPage, updatePage } from '@/lib/actions/pages';
import CodeBlock from '@/components/CodeBlock';

const PAGE_TEMPLATES = {
    default: {
        title: "Page Title",
        content: "<p>New page content</p>"
    }
};

export default function PageEditor({ initialData }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        content: initialData?.content || '',
        seoDescription: initialData?.seoDescription || ''
    });
    const [error, setError] = useState(null);

    const isNew = !initialData?._id;

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);

        try {
            if (isNew) {
                await createPage(formData);
            } else {
                await updatePage(initialData._id, formData);
            }
            router.push('/admin/pages');
            router.refresh();
        } catch (e) {
            console.error("Save failed:", e);
            setError("Failed to save: " + e.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-surface rounded-lg">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-text-primary">
                            {isNew ? 'Create Page' : 'Edit Page'}
                        </h1>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-white rounded-xl font-bold shadow-lg"
                >
                    {isSaving ? 'Saving...' : <><Save size={18} /> Save</>}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 flex items-center gap-3">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-panel border border-border rounded-xl p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-surface border border-border rounded-lg p-3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full bg-surface border border-border rounded-lg p-3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">SEO Description</label>
                        <textarea
                            value={formData.seoDescription}
                            onChange={e => setFormData({ ...formData, seoDescription: e.target.value })}
                            className="w-full bg-surface border border-border rounded-lg p-3 h-20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Content (HTML/Markdown)</label>
                        <textarea
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            className="w-full bg-surface border border-border rounded-lg p-3 h-96 font-mono"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
