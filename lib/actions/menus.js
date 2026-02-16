"use server";

export async function getMenus(type = 'header') {
    // Mock data
    return [
        { id: '1', label: 'Home', path: '/', type: 'header', order: 0 },
        { id: '2', label: 'Tools', path: '/tools', type: 'header', order: 1 }
    ];
}

export async function createMenu(data) {
    return { success: false, error: "Menu creation disabled during migration." };
}

export async function updateMenu(id, data) {
    return { success: false, error: "Menu updates disabled during migration." };
}

export async function deleteMenu(id) {
    return { success: false, error: "Menu deletion disabled during migration." };
}

export async function reorderMenus(items) {
    return { success: false, error: "Menu reordering disabled during migration." };
}
