const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection';

// Fix index.html
let indexHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    indexHtml = indexHtml.replace(/href="style\.css"/g, 'href="css/style.css"');
    fs.writeFileSync(indexHtmlPath, indexHtml);
    console.log('Fixed style.css path in index.html');
}

// Fix pages/*.html
const pagesDir = path.join(rootDir, 'pages');
const pages = ['gallery.html', 'products.html', 'cart.html', 'product-details.html'];

pages.forEach(page => {
    let pagePath = path.join(pagesDir, page);
    if (fs.existsSync(pagePath)) {
        let html = fs.readFileSync(pagePath, 'utf8');
        html = html.replace(/href="style\.css"/g, 'href="../css/style.css"');
        fs.writeFileSync(pagePath, html);
        console.log('Fixed style.css path in ' + page);
    }
});
