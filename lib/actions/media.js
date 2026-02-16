"use server";

export async function getFiles() {
    return [];
}

export async function uploadFile(formData) {
    return { success: false, error: "Media upload disabled during migration." };
}

export async function deleteFile(fileId) {
    return { success: false, error: "Media deletion disabled during migration." };
}
