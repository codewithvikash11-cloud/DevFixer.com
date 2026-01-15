"use server";

export async function getSettings() {
    return {
        siteName: "ErrorWiki",
        description: "Developer Platform"
    };
}

export async function updateSettings(data) {
    return { success: true };
}
