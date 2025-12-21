import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');
const postsFilePath = path.join(dataDirectory, 'posts.json');

export function getPosts() {
    if (!fs.existsSync(postsFilePath)) {
        return [];
    }
    const fileContent = fs.readFileSync(postsFilePath, 'utf8');
    try {
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
}

export function savePosts(posts) {
    if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory, { recursive: true });
    }
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
}

export function getPostBySlug(slug) {
    const posts = getPosts();
    return posts.find(post => post.slug === slug);
}
