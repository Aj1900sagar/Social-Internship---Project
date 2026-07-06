const fs = require('fs');

const path = require('path');
const file = path.join('C:', 'Users', 'vinay', 'OneDrive', 'Desktop', 'Social Internship', 'kasaudhan-collection', 'gallery.html');
let html = fs.readFileSync(file, 'utf8');

const mapping = {
  'Thunder Deals': 'deals',
  'Shirts': 'shirts',
  'Lowers': 'lowers',
  'Accessories': 'accessories',
  'New Arrivals': 'new-arrivals',
  'Formal Wear': 'formal-wear',
  'Footwear': 'footwear',
  'Watches': 'watches',
  'Jeans': 'jeans',
  'T-Shirts': 'tshirts',
  'Kids Wear': 'kids-wear',
  'Winter Collect': 'winter',
  'Casual Wear': 'casual-wear',
  'Ethnic Wear': 'ethnic-wear',
  'Bags': 'bags',
  'Trending Now': 'trending'
};

const regex = /<div class="bubble-item">\s*<div class="bubble-square[^>]*>[\s\S]*?<\/div>\s*<span class="bubble-label">([^<]+)<\/span>\s*<\/div>/g;

html = html.replace(regex, (match, label) => {
  const cleanLabel = label.trim();
  const catParam = mapping[cleanLabel];
  if (!catParam) {
    console.log('No mapping found for', cleanLabel);
    return match; // return original if no mapping
  }
  return `<a href="products.html?category=${catParam}" style="text-decoration:none; color:inherit; display:block; cursor:pointer;">
${match}
</a>`;
});

// Also, the user requested adding a hover effect "slight scale(1.05)" if not present.
// Since we're not allowed to touch style.css, we can add it inline or in a small internal <style> block just for this in gallery.html.
if (!html.includes('.bubble-item-link')) {
    html = html.replace(/<div class="category-bubbles-wrapper">/, 
    `<style>
    .category-bubbles-scroll > a { transition: transform 0.3s ease; }
    .category-bubbles-scroll > a:hover { transform: scale(1.05); }
    </style>
    <div class="category-bubbles-wrapper">`);
}

fs.writeFileSync(file, html);
console.log('Bubbles wrapped in gallery.html');
