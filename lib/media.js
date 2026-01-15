"use server";

export async function uploadFile(file) {
    // Stub upload
    return {
        $id: 'mock-file-id',
        url: 'https://placehold.co/600x400',
        size: 1024,
        name: 'mock-image.png'
    };
}

export async function getFileView(fileId) {
    return 'https://placehold.co/600x400';
}

export async function deleteFile(fileId) {
    return true;
}

export const mediaService = {
    uploadFile,
    getFileView,
    deleteFile
};
