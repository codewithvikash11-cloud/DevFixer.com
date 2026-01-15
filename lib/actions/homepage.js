"use server";

export async function getHomepageData() {
    return {
        hero: { title: "Hero Title", subtitle: "Hero Subtitle" },
        features: []
    };
}

export async function updateHomepageData(data) {
    return { success: true };
}
