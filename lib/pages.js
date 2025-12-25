import fs from 'fs';
import path from 'path';

const pagesDirectory = path.join(process.cwd(), 'data');
const pagesFilePath = path.join(pagesDirectory, 'pages.json');

export function getPages() {
    if (!fs.existsSync(pagesFilePath)) {
        return [];
    }
    const fileContents = fs.readFileSync(pagesFilePath, 'utf8');
    return JSON.parse(fileContents);
}

export function savePages(pages) {
    if (!fs.existsSync(pagesDirectory)) {
        fs.mkdirSync(pagesDirectory, { recursive: true });
    }
    fs.writeFileSync(pagesFilePath, JSON.stringify(pages, null, 4));
}

export function getPageBySlug(slug) {
    const pages = getPages();
    return pages.find(page => page.slug === slug);
}

export function deletePage(slug) {
    const pages = getPages();
    const newPages = pages.filter(page => page.slug !== slug);
    savePages(newPages);
}
