
import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import dbConnect from '@/lib/mongodb';
import Draft from '@/lib/models/Draft';
import { FileText, Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

async function getDrafts() {
    try {
        if (!process.env.MONGODB_URI) return [];
        await dbConnect();
        const drafts = await Draft.find({}).sort({ createdAt: -1 }).lean();
        return drafts.map(d => ({
            ...d,
            _id: d._id.toString(),
            createdAt: d.createdAt.toISOString()
        }));
    } catch (error) {
        console.error("Failed to fetch drafts:", error);
        return [];
    }
}

async function deleteDraft(id) {
    'use server';
    try {
        if (!process.env.MONGODB_URI) return;
        await dbConnect();
        await Draft.findByIdAndDelete(id);
        revalidatePath('/cms/drafts');
    } catch (error) {
        console.error("Failed to delete draft:", error);
    }
}

export default async function CMSDraftsPage() {
    const drafts = await getDrafts();

    return (
        <LayoutWrapper>
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <FileText className="text-accent-primary" />
                        AI Drafts
                    </h1>
                    <div className="text-sm text-text-secondary">
                        {drafts.length} items
                    </div>
                </div>

                {!process.env.MONGODB_URI && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl mb-6">
                        MONGODB_URI is missing. Drafts cannot be saved or loaded.
                    </div>
                )}

                {drafts.length === 0 ? (
                    <div className="text-center py-20 bg-surface rounded-xl border border-border border-dashed">
                        <p className="text-text-secondary">No drafts found.</p>
                    </div>
                ) : (
                    <div className="bg-surface rounded-xl border border-border overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-surface-hover border-b border-border">
                                <tr>
                                    <th className="p-4 font-bold text-text-secondary">Title</th>
                                    <th className="p-4 font-bold text-text-secondary">Status</th>
                                    <th className="p-4 font-bold text-text-secondary text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {drafts.map((draft) => (
                                    <tr key={draft._id} className="hover:bg-surface-hover/50 transition-colors">
                                        <td className="p-4 font-medium">{draft.title}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${draft.status === 'published'
                                                    ? 'bg-green-500/10 text-green-500'
                                                    : 'bg-yellow-500/10 text-yellow-500'
                                                }`}>
                                                {draft.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <form action={deleteDraft.bind(null, draft._id)}>
                                                <button className="p-2 hover:text-red-500 transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </LayoutWrapper>
    );
}
