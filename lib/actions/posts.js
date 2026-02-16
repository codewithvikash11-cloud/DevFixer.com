"use server";

import dbConnect from '@/lib/mongodb';
import ErrorPost from '@/lib/models/ErrorPost';
import { revalidatePath } from 'next/cache';

function serialize(doc) {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    obj._id = obj._id.toString();
    obj.createdAt = obj.createdAt.toISOString();
    obj.updatedAt = obj.updatedAt.toISOString();
    return obj;
}

export async function getPosts(limit = 100, status = 'all', category = null) {
    try {
        const conn = await dbConnect();
        if (!conn) return [];
        const query = {};
        if (status && status !== 'all') {
            query.status = status;
        }
        if (category) {
            query.category = category; // Assumes exact string match for now
        }

        const posts = await ErrorPost.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        return posts.map(post => ({
            ...post,
            id: post._id.toString(),
            _id: post._id.toString(),
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
        }));
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
}

export async function getPostById(id) {
    try {
        const conn = await dbConnect();
        if (!conn) return null;
        const post = await ErrorPost.findById(id).lean();
        if (!post) return null;

        return {
            ...post,
            id: post._id.toString(),
            _id: post._id.toString(),
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
        };
    } catch (error) {
        console.error("Failed to fetch post by ID:", error);
        return null;
    }
}

export async function getPostBySlug(slug) {
    try {
        const conn = await dbConnect();
        if (!conn) return null;
        const post = await ErrorPost.findOne({ slug }).lean();
        if (!post) return null;

        return {
            ...post,
            id: post._id.toString(),
            _id: post._id.toString(),
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
        };
    } catch (error) {
        console.error("Failed to fetch post by slug:", error);
        return null;
    }
}

// CRUD Operations

export async function createPost(data) {
    try {
        await dbConnect();
        // Generate Slug if not provided
        if (!data.slug) {
            data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '') + '-' + Date.now();
        }

        const newPost = await ErrorPost.create(data);
        revalidatePath('/admin/posts');
        revalidatePath('/errors');
        return { success: true, post: serialize(newPost) };
    } catch (error) {
        console.error("Create post error:", error);
        return { success: false, error: error.message };
    }
}

export async function updatePost(id, data) {
    try {
        await dbConnect();
        const updatedPost = await ErrorPost.findByIdAndUpdate(id, data, { new: true }).lean();
        revalidatePath('/admin/posts');
        revalidatePath(`/errors/${updatedPost.slug}`);
        return { success: true, post: serialize(updatedPost) };
    } catch (error) {
        console.error("Update post error:", error);
        return { success: false, error: error.message };
    }
}

export async function deletePost(id) {
    try {
        await dbConnect();
        await ErrorPost.findByIdAndDelete(id);
        revalidatePath('/admin/posts');
        return { success: true };
    } catch (error) {
        console.error("Delete post error:", error);
        return { success: false, error: error.message };
    }
}
