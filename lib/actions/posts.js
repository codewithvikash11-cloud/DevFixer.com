"use server";

import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json');

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

export async function getPosts(limit = 100) {
    const posts = await readData();
    return posts.slice(0, limit);
}

export async function getPostById(id) {
    const posts = await readData();
    return posts.find(p => p.id === id) || null;
}
export const getPost = getPostById;


export const getPostBySlug = async (slug) => {
    const posts = await readData();
    return posts.find(p => p.slug === slug) || null;
};

export async function createPost(data) {
    const posts = await readData();
    const newPost = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: data.status || 'draft',
        viewCount: 0
    };

    // Slug generation
    if (!newPost.slug) {
        newPost.slug = newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    posts.unshift(newPost);
    await writeData(posts);
    return { success: true, id: newPost.id };
}

export async function updatePost(id, data) {
    const posts = await readData();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return { success: false, error: 'Not found' };

    posts[index] = { ...posts[index], ...data, updatedAt: new Date().toISOString() };
    await writeData(posts);
    return { success: true };
}

export async function deletePost(id) {
    let posts = await readData();
    posts = posts.filter(p => p.id !== id);
    await writeData(posts);
    return { success: true };
}

// Aliases for Admin requirements
export const createAdminPost = createPost;
export const updateAdminPost = updatePost;
export const deleteAdminPost = deletePost;

