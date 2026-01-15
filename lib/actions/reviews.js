import { getPosts, updatePost } from './posts';

export async function getPendingPosts() {
    try {
        const allPosts = await getPosts(1000); // Fetch enough
        const pending = allPosts.filter(p => p.status === 'pending');

        return pending.map(doc => ({
            id: doc.id,
            title: doc.title,
            slug: doc.slug,
            authorId: doc.authorId,
            aiScore: doc.aiScore || 0,
            plagiarismScore: doc.plagiarismScore || 0,
            submittedAt: doc.createdAt, // Using createdAt from local mock
            preview: (doc.description || doc.content || "").substring(0, 150) + "..."
        }));
    } catch (e) {
        console.error("Get Pending Failed:", e);
        return [];
    }
}

export async function reviewPost(postId, action, reason) {
    try {
        const status = action === 'approve' ? 'approved' : 'rejected';

        await updatePost(postId, { status });

        // Log stub
        console.log(`[MockLog] Post ${postId} ${status} by admin. Reason: ${reason}`);

        return { success: true };
    } catch (e) {
        console.error("Review Action Failed:", e);
        return { success: false, error: e.message };
    }
}
