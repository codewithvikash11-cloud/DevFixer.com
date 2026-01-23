const BASE_URL = "https://savemedevcom.wordpress.com";
const SITE_DOMAIN = "savemedevcom.wordpress.com";

const endpoints = [
    `${BASE_URL}/wp-json/wp/v2/posts?per_page=1`,
    `${BASE_URL}/index.php?rest_route=/wp/v2/posts&per_page=1`,
    `https://public-api.wordpress.com/wp/v2/sites/${SITE_DOMAIN}/posts?per_page=1`,
    `${BASE_URL}/?rest_route=/wp/v2/posts&per_page=1` // Retrying original just in case
];

async function testUrl(url) {
    console.log(`\nTesting: ${url}`);
    try {
        const res = await fetch(url);
        const contentType = res.headers.get("content-type");
        console.log(`Status: ${res.status}`);
        console.log(`Type: ${contentType}`);

        if (contentType && contentType.includes("application/json")) {
            console.log("SUCCESS: JSON received");
            const json = await res.json();
            console.log(`Posts found: ${json.length}`);
        } else {
            console.log("FAIL: Not JSON");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function run() {
    for (const url of endpoints) {
        await testUrl(url);
    }
}

run();
