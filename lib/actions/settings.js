"use server";

export async function getSettings() {
    return {
        siteTitle: 'DevFixer',
        siteDescription: 'Developer Tools & Solutions',
        keywords: 'dev, tools, fix',
        ogImage: '/og-image.jpg'
    };
}

export async function updateSettings(data) {
    return { success: false, error: "Settings updates disabled during migration." };
}
