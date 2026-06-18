const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Case insensitive replacements
    // 1. Thapa eComStore -> CartNest
    content = content.replace(/thapa ecomstore/gi, 'CartNest');
    
    // 2. Thapa Store -> CartNest
    content = content.replace(/thapa store/gi, 'CartNest');

    // 3. thapa technical -> Vedant Store
    content = content.replace(/thapa technical/gi, 'Vedant Store');

    // 4. thapatechnical -> vedantstore
    content = content.replace(/thapatechnical/gi, 'vedantstore');

    // 5. Thapa -> Vedant Store
    content = content.replace(/thapa/gi, 'Vedant Store');

    fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
                walkDir(fullPath);
            }
        } else {
            if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
                // don't edit replace.js itself
                if (file !== 'replace.js') {
                    replaceInFile(fullPath);
                }
            }
        }
    }
}

walkDir(directoryPath);
console.log('Replacement complete.');
