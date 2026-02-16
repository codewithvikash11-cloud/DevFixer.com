"use server";

import dbConnect from '@/lib/mongodb';
import Page from '@/lib/models/Page';
import { revalidatePath } from 'next/cache';

function serialize(doc) {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    obj._id = obj._id.toString();
    obj.createdAt = obj.createdAt.toISOString();
    return obj;
}

export async function getPages() {
    await dbConnect();
    const pages = await Page.find({}).sort({ title: 1 }).lean();
    return pages.map(serialize);
}

export async function getPageBySlug(slug) {
    await dbConnect();
    const page = await Page.findOne({ slug, status: 'published' }).lean();
    return serialize(page);
}

export async function createPage(data) {
    await dbConnect();
    const newPage = await Page.create(data);
    revalidatePath('/admin/pages');
    return serialize(newPage);
}

// Add update/delete as needed for Admin

export async function getPage(id) {
    await dbConnect();
    const page = await Page.findById(id).lean();
    return serialize(page);
}

export async function updatePage(id, data) {
    await dbConnect();
    const page = await Page.findByIdAndUpdate(id, data, { new: true }).lean();
    revalidatePath('/admin/pages');
    revalidatePath(`/${page.slug}`);
    return serialize(page);
}

export async function deletePage(id) {
    await dbConnect();
    await Page.findByIdAndDelete(id);
    revalidatePath('/admin/pages');
    return { success: true };
}

export const getAllPages = getPages;
