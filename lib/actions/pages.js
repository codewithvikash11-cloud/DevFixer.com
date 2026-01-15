"use server";

import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'pages.json');

async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// P A G E S
export async function getAllPages() {
    return await readData();
}

export async function createPage(data) {
    try {
        const pages = await readData();
        const newPage = {
            id: Date.now().toString(),
            title: data.title,
            slug: data.slug,
            isPublished: false,
            seoTitle: data.title,
            seoDescription: '',
            updatedAt: new Date().toISOString()
        };
        pages.push(newPage);
        await writeData(pages);
        return { success: true, id: newPage.id };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

// S E C T I O N S (Stubbed for now)
export async function getPageSections(pageId) {
    return []; // Return empty sections for now
}

export const getPages = getAllPages;
export async function getPage(id) {
    const pages = await getAllPages();
    return pages.find(p => p.id === id);
}
export async function updatePage(id, data) {
    // Stub
    return { success: true };
}
export async function deletePage(id) {
    // Stub
    return { success: true };
}
