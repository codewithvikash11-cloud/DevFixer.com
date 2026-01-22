/**
 * WordPress API Helper
 * Base URL: https://savemedevcom.wordpress.com/wp-json/wp/v2
 */

const WP_API_BASE = 'https://savemedevcom.wordpress.com/wp-json/wp/v2';

/**
 * Fetch all posts with pagination and optional category filter
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Posts per page (default: 10)
 * @param {number} categoryId - Optional category ID to filter by
 * @returns {Promise<{posts: Array, total: number, totalPages: number}>}
 */
export async function getPosts(page = 1, perPage = 10, categoryId = null) {
    console.log('Using mock posts (API unavailable)');
    return { posts: [], total: 0, totalPages: 0 };
}

/**
 * Fetch a single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} Post object or null if not found
 */
export async function getPostBySlug(slug) {
    console.log(`Using mock post for slug: ${slug}`);
    return null;
}

/**
 * Fetch all categories
 * @returns {Promise<Array>} List of categories
 */
export async function getCategories() {
    console.log('Using mock categories');
    return [];
}

/**
 * Get category by ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export async function getCategoryById(id) {
    return null;
}
