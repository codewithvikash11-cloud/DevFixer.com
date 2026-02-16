const fs = require('fs');
const path = require('path');

function traverse(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (item.startsWith('[') && item.endsWith(']')) {
                console.log(`Found dynamic route: ${item} at ${relativePath}/${item}`);
            }
            traverse(fullPath, path.join(relativePath, item));
        }
    }
}

traverse(path.join(__dirname, '../app'), 'app');
