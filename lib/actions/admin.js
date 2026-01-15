"use server";

import { getPosts } from './posts';
import { getAllPages } from './pages';

// --- Dashboard Stats ---
export async function getAdminStats() {
    // Mock Data based on other mock sources or static
    const posts = await getPosts(1000);
    const pages = await getAllPages();

    return {
        totalUsers: 5, // Mock
        activeUsers: 2,
        totalPosts: posts.length,
        pendingReviews: 0,
        systemHealth: 'Excellent',
        pages: pages.length
    };
}

// --- User Management ---
// Mock Users List
const MOCK_USERS = [
    { id: '1', name: 'Admin', email: 'admin@errorwiki.com', role: 'admin', trustScore: 100, status: 'active', joinedAt: new Date().toISOString() },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user', trustScore: 10, status: 'active', joinedAt: "2023-05-12T00:00:00.000Z" }
];

export async function getAdminUsers(limit = 20, offset = 0) {
    return MOCK_USERS;
}

export async function updateUserStatus(userId, action) {
    // No-op for mock
    return { success: true };
}
