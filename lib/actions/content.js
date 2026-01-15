"use server";

import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'content.json');

async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}

async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function getContent(section) {
    const data = await readData();
    if (!section) return data;

    // Filter by section (the mock data allows exact key match or section property)
    // The current structure is Map<Key, Object>.
    const filtered = {};
    for (const [key, item] of Object.entries(data)) {
        if (item.section === section) {
            filtered[key] = item;
        }
    }
    return filtered;
}

export async function updateContent(docId, value) { // docId is actually the KEY in this simple mock
    const data = await readData();
    // find key by docId or assuming docId IS the key or the ID
    let foundKey = Object.keys(data).find(k => data[k].id === docId || k === docId); // Hybrid lookup

    if (foundKey) {
        data[foundKey].value = value;
        await writeData(data);
        return { success: true };
    }
    return { success: false, error: "Not Found" };
}

export async function seedInitialContent() {
    return { success: true };
}
