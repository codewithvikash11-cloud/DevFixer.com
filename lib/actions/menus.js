"use server";

export async function getMenus() {
    return [];
}

export async function createMenu(data) {
    return { success: true, id: Date.now().toString() };
}

export async function updateMenu(id, data) {
    return { success: true };
}

export async function deleteMenu(id) {
    return { success: true };
}

export async function reorderMenus(items) {
    return { success: true };
}
