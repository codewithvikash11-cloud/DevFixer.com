'use server';

import { databases, Query, DATABASE_ID, getCollection } from '@/lib/server-appwrite';
import { cache } from 'react';

const { col: COLLECTION_ID } = getCollection('menus');

const transformMenu = (doc) => ({
    id: doc.$id,
    label: doc.label,
    path: doc.path,
    type: doc.type, // 'header', 'footer', 'both'
    order: doc.order || 0,
    parentId: doc.parentId || null,
    isExternal: doc.isExternal || false,
    isOpenNewTab: doc.isOpenNewTab || false,
});

export const getMenus = cache(async (type = 'header') => {
    try {
        // Fetch all menus to maximize cache hit rate and simplify filtering
        const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(100),
            Query.orderAsc('order')
        ]);

        const allMenus = documents.map(transformMenu);

        if (type === 'all') return allMenus;

        return allMenus.filter(m => m.type === type || m.type === 'both');
    } catch (error) {
        console.error('getMenus error:', error);
        return [];
    }
});
