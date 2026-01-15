import { getPosts, getPostById, getPostBySlug, createPost, updatePost, deletePost } from './actions/posts';

export const posts = {
    getAll: async (status) => {
        let all = await getPosts(1000);
        if (status) {
            all = all.filter(p => p.status === status);
        }
        return all;
    },
    getById: getPostById,
    getPostBySlug: getPostBySlug,
    createPost: createPost,
    updatePost: updatePost,
    deletePost: deletePost,
    toggleVote: async () => ({ likes: 0, dislikes: 0 }),
    incrementView: async () => true
};

// Legacy exports
export const getPostsLegacy = posts.getAll; // Renamed to avoid conflict if I exported same name
export { getPostBySlug, createPost, updatePost, deletePost };
// Ensure default export or named match what consumers need.
// Original had named exports: getPosts, getPostBySlug...
// But wait, `getPosts` was exported.
const getPostsFn = posts.getAll;
export { getPostsFn as getPosts };

export const toggleVote = posts.toggleVote;

// Mock DATABASE_ID export to satisfy odd imports if any
export const DATABASE_ID = 'mock-db-id';
export const getCollection = () => ({ col: 'mock-col' });
