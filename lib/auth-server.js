"use server";

import { cookies } from 'next/headers';

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    if (session?.value === 'true') {
        return {
            $id: '1',
            name: 'Admin',
            email: 'admin@errorwiki.com',
            role: 'admin'
        };
    }
    return null;
}

export async function getCurrentUser() {
    return getSession();
}
