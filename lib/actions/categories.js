"use server";

import dbConnect from '@/lib/mongodb';
import Category from '@/lib/models/Category';
import { revalidatePath } from 'next/cache';

function serialize(doc) {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    obj._id = obj._id.toString();
    return obj;
}

export async function getCategories() {
    try {
        const conn = await dbConnect();
        if (!conn) return [];
        const categories = await Category.find({}).sort({ name: 1 }).lean();
        return categories.map(c => ({
            ...c,
            id: c._id.toString(),
            _id: c._id.toString()
        }));
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export async function createCategory(data) {
    try {
        await dbConnect();
        if (!data.slug) {
            data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
        const newCat = await Category.create(data);
        revalidatePath('/errors');
        return { success: true, category: serialize(newCat) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function deleteCategory(id) {
    try {
        await dbConnect();
        await Category.findByIdAndDelete(id);
        revalidatePath('/errors');
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
