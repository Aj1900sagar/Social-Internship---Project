const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection';

// 1. Fix index.html JS paths
let indexHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
    let html = fs.readFileSync(indexHtmlPath, 'utf8');
    
    // Check if script.js is missing the js/ folder prefix
    html = html.replace(/<script src="script\.js"><\/script>/g, '<script src="js/script.js"></script>');
    html = html.replace(/<script src="cart\.js"><\/script>/g, '<script src="js/cart.js"></script>');
    html = html.replace(/<script src="main\.js"><\/script>/g, '<script src="js/main.js"></script>');
    
    fs.writeFileSync(indexHtmlPath, html);
    console.log('Fixed index.html script tags');
}

// 2. Fix pages/*.html
const pagesDir = path.join(rootDir, 'pages');
const pages = ['gallery.html', 'products.html', 'cart.html', 'product-details.html'];

pages.forEach(page => {
    let pagePath = path.join(pagesDir, page);
    if (fs.existsSync(pagePath)) {
        let html = fs.readFileSync(pagePath, 'utf8');
        
        // If they had src="script.js", fix it to src="../js/script.js"
        html = html.replace(/src="script\.js"/g, 'src="../js/script.js"');
        html = html.replace(/src="cart\.js"/g, 'src="../js/cart.js"');
        html = html.replace(/src="main\.js"/g, 'src="../js/main.js"');
        html = html.replace(/src="products\.js"/g, 'src="../js/products.js"');
        html = html.replace(/src="category-filter\.js"/g, 'src="../js/category-filter.js"');
        
        // Ensure style.css is ../css/style.css
        html = html.replace(/href="style\.css"/g, 'href="../css/style.css"');
        
        fs.writeFileSync(pagePath, html);
        console.log('Fixed scripts in ' + page);
    }
});

// 3. Fix js/script.js fallback
const scriptJsPath = path.join(rootDir, 'js', 'script.js');
if (fs.existsSync(scriptJsPath)) {
    let scriptJs = fs.readFileSync(scriptJsPath, 'utf8');
    
    // Inject the fallback at the top if not present
    if (!scriptJs.includes('preloader.style.opacity = \'0\'')) {
        const fallback = `
// --- EMERGENCY PRELOADER FALLBACK ---
setTimeout(function() {
  var preloader = document.getElementById('loader'); // Use 'loader' to match HTML
  if (preloader) {
    preloader.style.opacity = '0';
    preloader.style.display = 'none';
  }
}, 3000);
// ------------------------------------
`;
        fs.writeFileSync(scriptJsPath, fallback + scriptJs);
        console.log('Injected preloader fallback into js/script.js');
    }
}
