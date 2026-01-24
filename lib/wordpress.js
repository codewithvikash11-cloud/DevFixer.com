const BASE_URL = "https://public-api.wordpress.com/wp/v2/sites/savemedevcom.wordpress.com";

/**
 * Fetch posts with pagination
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<Array>}
 */
/**
 * Fetch posts with advanced filtering
 * @param {Object} options
 * @returns {Promise<Array>}
 */
export async function getPosts(page = 1, perPage = 10, categoryId = null) {
    try {
        let url = `${BASE_URL}/posts?page=${page}&per_page=${perPage}&_embed`;
        if (categoryId) {
            url += `&categories=${categoryId}`;
        }

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
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
 * Fetch category details by slug
 */
async function getCategoryBySlug(slug) {
    try {
        const categories = await getCategories();
        return categories.find(c => c.slug === slug) || null;
    } catch (e) {
        console.error("Error finding category:", e);
        return null;
    }
}

/**
 * Fetch posts belonging to a specific category slug
 */
export async function getPostsByCategory(slug, page = 1, perPage = 10) {
    const category = await getCategoryBySlug(slug);
    if (!category) {
        console.warn(`Category ${slug} not found, returning empty`);
        return [];
    }
    return await getPosts(page, perPage, category.id);
}

/**
 * Search posts
 */
export async function searchPosts(query) {
    try {
        const res = await fetch(`${BASE_URL}/posts?search=${encodeURIComponent(query)}&_embed&per_page=20`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Search failed:", error);
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
 * Fetch a single page by slug
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getPageBySlug(slug) {
    try {
        const res = await fetch(`${BASE_URL}/pages?slug=${slug}&_embed`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch page");
        }

        const pages = await res.json();
        return pages.length > 0 ? pages[0] : null;
    } catch (error) {
        console.error(`Error fetching page with slug ${slug}:`, error);
        return null;
    }
}

/**
 * Fetch all categories
 * @returns {Promise<Array>}
 */
export async function getCategories() {
    try {
        // Switching to BASE_URL (public-api) which is more reliable for WP.com sites
        const res = await fetch(`${BASE_URL}/categories?per_page=100`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            console.error("getCategories failed with status", res.status);
            return [];
        }

        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("getCategories failed to parse JSON. Might be HTML. Response snippet:", text.substring(0, 150));
            return [];
        }
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

/**
 * Fetch posts for the Errors section (Alias for getPosts)
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<Array>}
 */
export async function getErrorsPosts(page = 1, perPage = 10) {
    return await getPosts(page, perPage);
}

/**
 * Fetch a single error post by slug (Alias for getPostBySlug)
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getErrorBySlug(slug) {
    return await getPostBySlug(slug);
}


