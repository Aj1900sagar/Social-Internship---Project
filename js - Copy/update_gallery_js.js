const fs = require('fs');

const jsContent = `/* ============================================
   KASAUDHAN COLLECTION
   gallery.js - Lightbox Logic Only
   ============================================ */
'use strict';

const galleryItems = [
  { id: 1, title: "Shop View 1", type: "image", src: "images/gallery/shop/shop01.webp" },
  { id: 2, title: "Shop View 2", type: "image", src: "images/gallery/shop/shop02.webp" },
  { id: 3, title: "Shop View 3", type: "image", src: "images/gallery/shop/shop03.webp" },
  { id: 4, title: "Shop View 4", type: "image", src: "images/gallery/shop/shop04.webp" },
  { id: 5, title: "Shop View 5", type: "image", src: "images/gallery/shop/shop05.webp" },
  { id: 6, title: "Shop View 6", type: "image", src: "images/gallery/shop/shop06.webp" },
  { id: 7, title: "Shop View 7", type: "image", src: "images/gallery/shop/shop07.webp" },
  { id: 8, title: "Shop View 8", type: "image", src: "images/gallery/shop/shop08.webp" }
];

let lightboxIndex = 0;

// DOM Elements
const lightbox = document.getElementById('galleryLightbox');
const lbMediaContainer = document.getElementById('glbMediaContainer');
const lbCaption = document.getElementById('glbCaption');
const lbCounter = document.getElementById('glbCounter');
const lbClose = document.getElementById('glbClose');
const lbPrev = document.getElementById('glbPrev');
const lbNext = document.getElementById('glbNext');
const lbBackdrop = document.getElementById('glbBackdrop');

function setupEventListeners() {
  if(!lightbox) return;
  // Lightbox Navigation
  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => navigateLightbox(-1));
  lbNext.addEventListener('click', () => navigateLightbox(1));
  
  document.addEventListener('keydown', (e) => {
    if (!lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    }
  });

  // Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  lightbox.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) navigateLightbox(1);
    if (touchEndX > touchStartX + 50) navigateLightbox(-1);
  }
}

// Lightbox Logic
window.openLightbox = function(index) {
  lightboxIndex = index;
  updateLightboxContent();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  lbMediaContainer.innerHTML = '';
}

function navigateLightbox(dir) {
  lightboxIndex += dir;
  if (lightboxIndex < 0) lightboxIndex = galleryItems.length - 1;
  if (lightboxIndex >= galleryItems.length) lightboxIndex = 0;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = galleryItems[lightboxIndex];
  lbCounter.textContent = \`\${lightboxIndex + 1} / \${galleryItems.length}\`;
  lbCaption.textContent = item.title;
  
  lbMediaContainer.innerHTML = '';
  
  if (item.type === 'image') {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.title;
    let zoomed = false;
    img.style.transition = 'transform 0.3s ease';
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      zoomed = !zoomed;
      img.style.transform = zoomed ? 'scale(1.5)' : 'scale(1)';
      img.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
    });
    // Fallback if image is missing
    img.onerror = function() { this.src = 'images/gallery/shop/store.webp'; };
    lbMediaContainer.appendChild(img);
  }
}

document.addEventListener('DOMContentLoaded', setupEventListeners);
`;

fs.writeFileSync('C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection\\js\\gallery.js', jsContent);
console.log('gallery.js updated to static mode.');
