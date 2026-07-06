const fs = require('fs');
const path = require('path');

const file = path.join('C:', 'Users', 'vinay', 'OneDrive', 'Desktop', 'Social Internship', 'kasaudhan-collection', 'index.html');
let html = fs.readFileSync(file, 'utf8');

// 1. Inject tags.css link
if (!html.includes('css/tags.css')) {
  html = html.replace('</head>', '  <link rel="stylesheet" href="css/tags.css">\n</head>');
}

// 2. Inject Hero Tags
const heroTags = `
    <!-- Decorative 3D Tags -->
    <div class="tag-3d tag-percent decor-tag decor-hero-1 stagger-1">%</div>
    <div class="tag-3d tag-sale decor-tag decor-hero-2 stagger-2">SALE</div>
    <div class="tag-3d tag-hot decor-tag decor-hero-3 stagger-3"></div>
`;
if (!html.includes('decor-hero-1')) {
  html = html.replace('<div class="hero-bg">', heroTags + '\n    <div class="hero-bg">');
}

// 3. Inject Categories Tags
if (!html.includes('tag-hot card-tag right')) {
  html = html.replace(
    '<div class="cat-card reveal" data-category="jeans">',
    '<div class="cat-card reveal" data-category="jeans">\n          <div class="tag-3d tag-hot card-tag right"></div>'
  );
}
if (!html.includes('tag-new card-tag"')) {
  html = html.replace(
    '<div class="cat-card reveal" data-category="shirts">',
    '<div class="cat-card reveal" data-category="shirts">\n          <div class="tag-3d tag-new card-tag">NEW</div>'
  );
}

// 4. Inject Offers Tags
const offerTags = `
      <div class="tag-3d tag-new decor-tag decor-offer-1 stagger-1">NEW</div>
      <div class="tag-3d tag-sale decor-tag decor-offer-2 stagger-4">SALE</div>
`;
if (!html.includes('decor-offer-1')) {
  html = html.replace(
    '<section class="offer-section">\n    <div class="container">',
    '<section class="offer-section" style="position:relative;">\n    <div class="container">' + offerTags
  );
}

// 5. Inject Products Tags
if (!html.includes('tag-sale card-tag small')) {
  html = html.replace(
    '<div class="product-card reveal" data-cat="jeans">',
    '<div class="product-card reveal" data-cat="jeans">\n          <div class="tag-3d tag-sale card-tag small">SALE</div>'
  );
}
if (!html.includes('tag-percent card-tag small')) {
  html = html.replace(
    '<div class="product-card reveal" data-cat="shirts">',
    '<div class="product-card reveal" data-cat="shirts">\n          <div class="tag-3d tag-percent card-tag small">%</div>'
  );
}
if (!html.includes('tag-hot card-tag small')) {
  // Let's also add one HOT tag to tshirts for variation
  html = html.replace(
    '<div class="product-card reveal" data-cat="tshirts">',
    '<div class="product-card reveal" data-cat="tshirts">\n          <div class="tag-3d tag-hot card-tag small right"></div>'
  );
}

fs.writeFileSync(file, html);
console.log('Tags successfully injected into index.html');
