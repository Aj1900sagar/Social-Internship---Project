const fs = require('fs');
const path = require('path');

const galleryHtmlPath = path.join('C:', 'Users', 'vinay', 'OneDrive', 'Desktop', 'Social Internship', 'kasaudhan-collection', 'gallery.html');
let html = fs.readFileSync(galleryHtmlPath, 'utf8');

const regex = /<div class="gallery-search-wrap">[\s\S]*?<div class="load-more-wrap">[\s\S]*?<\/div>/;

let gridHtml = '<!-- STATIC GRID -->\n    <div class="gallery-grid-static">\n';
for (let i = 1; i <= 8; i++) {
  gridHtml += `      <div class="gallery-item" onclick="openLightbox(${i-1})">
        <img src="images/gallery/shop/shop0${i}.webp" alt="Shop ${i}" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'">
        <div class="gallery-overlay">
          <div class="gallery-overlay-icon">🔍</div>
          <span class="gallery-cat-badge">Shop</span>
        </div>
      </div>\n`;
}
gridHtml += `    </div>\n
    <!-- VIDEO CAROUSEL -->
    <div class="video-carousel-wrapper">
      <div class="video-carousel-track">
`;

// Add 3 sets of videos for infinite loop
for (let i = 0; i < 3; i++) {
  gridHtml += `        <div class="circle-video-item">
          <video src="videos/gallery/shop-tour.mp4" autoplay loop muted playsinline></video>
          <span class="video-label">Shop Tour</span>
        </div>
        <div class="circle-video-item">
          <video src="videos/gallery/collection-01.mp4" autoplay loop muted playsinline></video>
          <span class="video-label">Collection 01</span>
        </div>
        <div class="circle-video-item">
          <video src="videos/gallery/collection-02.mp4" autoplay loop muted playsinline></video>
          <span class="video-label">Collection 02</span>
        </div>\n`;
}

gridHtml += `      </div>
    </div>`;

html = html.replace(regex, gridHtml);

fs.writeFileSync(galleryHtmlPath, html);
console.log('gallery.html updated.');
