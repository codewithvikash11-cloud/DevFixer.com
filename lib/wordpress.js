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
    try {
        let url = `${WP_API_BASE}/posts?_embed&page=${page}&per_page=${perPage}`;
        if (categoryId) {
            url += `&categories=${categoryId}`;
        }

        const res = await fetch(url, {
            next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
        });

        if (!res.ok) {
            if (res.status === 400 && page > 1) { // Handle case where page is out of bounds
                return { posts: [], total: 0, totalPages: 0 };
            }
            throw new Error(`Failed to fetch posts: ${res.statusText}`);
        }

        const posts = await res.json();
        const total = parseInt(res.headers.get('x-wp-total') || '0', 10);
        const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '0', 10);

        return { posts, total, totalPages };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { posts: [], total: 0, totalPages: 0 };
    }
}

/**
 * Fetch a single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} Post object or null if not found
 */
export async function getPostBySlug(slug) {
    try {
        const url = `${WP_API_BASE}/posts?_embed&slug=${slug}`;
        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) throw new Error('Failed to fetch post');

        const posts = await res.json();
        return posts.length > 0 ? posts[0] : null;
    } catch (error) {
        console.error(`Error fetching post by slug "${slug}":`, error);
        return null;
    }
}

/**
 * Fetch all categories
 * @returns {Promise<Array>} List of categories
 */
export async function getCategories() {
    try {
        const url = `${WP_API_BASE}/categories?per_page=100`; // Fetch up to 100 categories
        const res = await fetch(url, {
            next: { revalidate: 3600 }, // Cache categories for 1 hour
        });

        if (!res.ok) throw new Error('Failed to fetch categories');

        return await res.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

/**
 * Get category by ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export async function getCategoryById(id) {
    try {
        const url = `${WP_API_BASE}/categories/${id}`;
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        return null;
    }
}
