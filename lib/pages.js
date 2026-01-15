import { getAllPages, createPage } from './actions/pages';

// Map mock/JSON page to same structure if needed, or pass through
const mapPage = (p) => ({ ...p, updatedAt: new Date().toISOString() });

export const pagesService = {
    getPages: async () => {
        const pages = await getAllPages();
        return pages.map(mapPage);
    },

    getPageBySlug: async (slug) => {
        const pages = await getAllPages();
        const page = pages.find(p => p.slug === slug);
        return page ? mapPage(page) : null;
    },

    createPage: async (data) => {
        return await createPage(data);
    },

    updatePage: async (slug, data) => {
        // Stub - would use updatePage action
        return { ...data, slug };
    },

    deletePage: async (slug) => {
        // Stub
    }
};
