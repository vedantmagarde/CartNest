const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);

function fixImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // regex to find relative imports that lack .js extension (excluding .json imports)
    // matches `import ... from "./someFile"`
    content = content.replace(/from\s+["'](\.[^"']+)["']/g, (match, p1) => {
        if (!p1.endsWith('.js') && !p1.endsWith('.json') && !p1.endsWith('.css')) {
            return `from "${p1}.js"`;
        }
        return match;
    });

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
            if (fullPath.endsWith('.js')) {
                // don't edit fixImports.cjs itself
                if (file !== 'fixImports.cjs' && file !== 'replace.cjs') {
                    fixImports(fullPath);
                }
            }
        }
    }
}

walkDir(directoryPath);
console.log('Imports fixed.');
