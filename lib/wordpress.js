const BASE_URL = "https://public-api.wordpress.com/wp/v2/sites/savemedevcom.wordpress.com";

/**
 * Fetch posts with pagination
 * @param {number} page
 * @returns {Promise<Array>}
 */
export async function getPosts(page = 1) {
    try {
        const res = await fetch(`${BASE_URL}/posts?page=${page}&per_page=10&_embed`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            // API might return 400 for page out of range, handle gracefully
            if (res.status === 400) return [];
            throw new Error("Failed to fetch posts");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

/**
 * Fetch a single post by slug
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getPostBySlug(slug) {
    try {
        const res = await fetch(`${BASE_URL}/posts?slug=${slug}&_embed`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch post");
        }

        const posts = await res.json();
        return posts.length > 0 ? posts[0] : null;
    } catch (error) {
        console.error(`Error fetching post with slug ${slug}:`, error);
        return null;
    }
}

/**
 * Fetch all categories
 * @returns {Promise<Array>}
 */
export async function getCategories() {
    try {
        const res = await fetch(`${BASE_URL}/categories`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch categories");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

/**
 * Helper to fetch all posts for static generation (optional use)
 * Gets first 100 posts to generate static paths
 */
export async function getAllPosts() {
    try {
        const res = await fetch(`${BASE_URL}/posts?per_page=100&_embed`);
        if (!res.ok) throw new Error("Failed to fetch all posts");
        return await res.json();
    } catch (error) {
        console.error("Error fetching all posts:", error);
        return [];
    }
}
