"use server";

import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'comments.json');

async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function getComments(status = 'pending', limit = 50) {
    let comments = await readData();
    if (status !== 'all') {
        comments = comments.filter(c => c.status === status);
    }
    return comments.slice(0, limit);
}

export async function updateCommentStatus(commentId, status) {
    const comments = await readData();
    const index = comments.findIndex(c => c.id === commentId);
    if (index !== -1) {
        comments[index].status = status;
        await writeData(comments);
        return true;
    }
    return false;
}

export async function deleteComment(commentId) {
    let comments = await readData();
    const newComments = comments.filter(c => c.id !== commentId);
    await writeData(newComments);
    return true;
}

// Service shim to match old structure
export const commentsService = {
    getComments,
    updateStatus: updateCommentStatus,
    deleteComment
};
