const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection';

// 1. Fix index.html
let indexHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    
    // Replace standard hrefs
    indexHtml = indexHtml.replace(/href="gallery\.html/g, 'href="pages/gallery.html');
    indexHtml = indexHtml.replace(/href="products\.html/g, 'href="pages/products.html');
    indexHtml = indexHtml.replace(/href="cart\.html/g, 'href="pages/cart.html');
    indexHtml = indexHtml.replace(/href="product-details\.html/g, 'href="pages/product-details.html');
    
    // Replace window.location.href inside js onclick if any (e.g. products.html)
    indexHtml = indexHtml.replace(/window\.location\.href\s*=\s*'products\.html/g, "window.location.href='pages/products.html");
    
    fs.writeFileSync(indexHtmlPath, indexHtml);
    console.log('Fixed index.html');
}

// 2. Fix pages/*.html
const pagesDir = path.join(rootDir, 'pages');
const pages = ['gallery.html', 'products.html', 'cart.html', 'product-details.html'];

pages.forEach(page => {
    let pagePath = path.join(pagesDir, page);
    if (fs.existsSync(pagePath)) {
        let html = fs.readFileSync(pagePath, 'utf8');
        
        // Asset paths
        html = html.replace(/href="css\//g, 'href="../css/');
        html = html.replace(/src="js\//g, 'src="../js/');
        html = html.replace(/src="images\//g, 'src="../images/');
        html = html.replace(/poster="images\//g, 'poster="../images/');
        html = html.replace(/src="videos\//g, 'src="../videos/');
        html = html.replace(/src="assets\//g, 'src="../assets/');
        html = html.replace(/href="assets\//g, 'href="../assets/');
        html = html.replace(/content="assets\//g, 'content="../assets/'); // og:image
        
        // Favicons
        html = html.replace(/href="favicon\.ico"/g, 'href="../favicon.ico"');
        html = html.replace(/href="favicon-32x32\.png"/g, 'href="../favicon-32x32.png"');
        html = html.replace(/href="favicon-16x16\.png"/g, 'href="../favicon-16x16.png"');
        html = html.replace(/href="apple-touch-icon\.png"/g, 'href="../apple-touch-icon.png"');
        html = html.replace(/href="favicon\.svg"/g, 'href="../favicon.svg"');
        
        // Navigation / HTML Links
        html = html.replace(/href="index\.html/g, 'href="../index.html');
        // If there's any absolute root slash like href="/", typically we don't have that here.
        // What about style="background-image: url('assets/...')" ?
        html = html.replace(/url\(['"]?assets\//g, "url('../assets/");
        html = html.replace(/url\(['"]?images\//g, "url('../images/");
        
        fs.writeFileSync(pagePath, html);
        console.log('Fixed ' + page);
    }
});

console.log('All paths fixed.');
