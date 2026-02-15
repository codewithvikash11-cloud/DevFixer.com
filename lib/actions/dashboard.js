"use server";

import dbConnect from '@/lib/mongodb';
import ErrorPost from '@/lib/models/ErrorPost';
import UserQuery from '@/lib/models/UserQuery';
import AdminUser from '@/lib/models/AdminUser';

export async function getDashboardStats() {
    try {
        await dbConnect();

        const [postsCount, draftsCount, queriesCount, usersCount] = await Promise.all([
            ErrorPost.countDocuments({ status: 'published' }),
            ErrorPost.countDocuments({ status: 'draft' }),
            UserQuery.countDocuments(),
            AdminUser.countDocuments()
        ]);

        return {
            posts: postsCount,
            drafts: draftsCount,
            queries: queriesCount,
            users: usersCount
        };
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return {
            posts: 0,
            drafts: 0,
            queries: 0,
            users: 0
        };
    }
}
