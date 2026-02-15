/**
 * Admin Authentication Logic
 * 
 * Verifies if a user is an admin based on their role object or email/allowlist.
 */

const ADMIN_EMAILS = [
    'rahul@roviotech.com',
    'admin@devfixer.com',
    'codewithvikash@gmail.com'
];

/**
 * Checks if the given user or email belongs to an admin.
 * @param {string|object} userOrEmail - User object with role OR email string
 * @returns {boolean}
 */
export function isAdmin(userOrEmail) {
    if (!userOrEmail) return false;

    // Check object role (New Mongo Auth)
    if (typeof userOrEmail === 'object') {
        return userOrEmail.role === 'admin' || userOrEmail.role === 'editor';
    }

    // Check email string (Legacy / Fallback)
    const envAdmins = process.env.NEXT_PUBLIC_ADMIN_EMAILS
        ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map(e => e.trim())
        : [];

    const allAdmins = [...new Set([...ADMIN_EMAILS, ...envAdmins])];

    return allAdmins.includes(userOrEmail);
}

export function verifyAdminAccess(user) {
    return isAdmin(user);
}
