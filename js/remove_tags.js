const fs = require('fs');
const path = require('path');

const file = path.join('C:', 'Users', 'vinay', 'OneDrive', 'Desktop', 'Social Internship', 'kasaudhan-collection', 'index.html');
let html = fs.readFileSync(file, 'utf8');

// The hero tags:
html = html.replace(/\s*<!-- Decorative 3D Tags -->\s*<div class="tag-3d[^>]*>[^<]*<\/div>\s*<div class="tag-3d[^>]*>[^<]*<\/div>\s*<div class="tag-3d[^>]*>[^<]*<\/div>\s*/, '\n    ');

// The category tags:
html = html.replace(/\n\s*<div class="tag-3d tag-hot card-tag right"><\/div>/g, '');
html = html.replace(/\n\s*<div class="tag-3d tag-new card-tag">NEW<\/div>/g, '');

// The product tags:
html = html.replace(/\n\s*<div class="tag-3d tag-sale card-tag small">SALE<\/div>/g, '');
html = html.replace(/\n\s*<div class="tag-3d tag-percent card-tag small">%<\/div>/g, '');
html = html.replace(/\n\s*<div class="tag-3d tag-hot card-tag small right"><\/div>/g, '');

// Generic fallback just in case I missed any exact spacing:
const lines = html.split('\n');
const filteredLines = lines.filter(line => {
    // If it's a tag-3d line but NOT an offer tag, remove it.
    if (line.includes('class="tag-3d') && !line.includes('decor-offer')) {
        return false;
    }
    // Also remove the "Decorative 3D Tags" comment
    if (line.includes('<!-- Decorative 3D Tags -->')) {
        return false;
    }
    return true;
});

fs.writeFileSync(file, filteredLines.join('\n'));
console.log('Unwanted tags removed from index.html');
