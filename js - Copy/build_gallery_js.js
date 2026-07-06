const fs = require('fs');

const categories = ['Jeans', 'Shirts', 'T-Shirts', 'Lowers', 'Kids Wear', 'Accessories', 'Winter Collection'];
const catFolders = ['jeans', 'shirts', 'tshirts', 'lowers', 'kids', 'accessories', 'winter'];

let itemsJs = '';
let idCounter = 1;

for(let i=0; i<categories.length; i++) {
  for(let j=1; j<=5; j++) {
    itemsJs += `
  {
    id: ${idCounter++},
    title: "${categories[i]} Collection ${j}",
    category: "${categories[i]}",
    type: "image",
    src: "images/gallery/${catFolders[i]}/${catFolders[i]}0${j}.webp",
    thumbnail: "images/gallery/thumbs/${catFolders[i]}0${j}.webp"
  },`;
  }
}

itemsJs += `
  {
    id: ${idCounter++},
    title: "Store Interior Front",
    category: "Shop",
    type: "image",
    src: "images/gallery/shop/shop-bg.webp",
    thumbnail: "images/gallery/shop/shop-bg.webp"
  },
  {
    id: ${idCounter++},
    title: "Store Exterior",
    category: "Shop",
    type: "image",
    src: "images/gallery/shop/store.webp",
    thumbnail: "images/gallery/shop/store.webp"
  },
  {
    id: ${idCounter++},
    title: "Virtual Shop Tour",
    category: "Shop",
    type: "video",
    src: "videos/gallery/shop-tour.mp4",
    thumbnail: "images/gallery/shop/store.webp",
    duration: "1:45"
  },
  {
    id: ${idCounter++},
    title: "Winter Collection Highlights",
    category: "Winter Collection",
    type: "video",
    src: "videos/gallery/collection-01.mp4",
    thumbnail: "images/gallery/thumbs/winter01.webp",
    duration: "0:50"
  },
  {
    id: ${idCounter++},
    title: "New Arrivals Showcase",
    category: "New Arrivals",
    type: "video",
    src: "videos/gallery/collection-02.mp4",
    thumbnail: "images/gallery/thumbs/shirts01.webp",
    duration: "1:20"
  }
`;

const jsContent = `/* ============================================
   KASAUDHAN COLLECTION
   gallery.js - Gallery Module Logic
   ============================================ */
'use strict';

const galleryItems = [${itemsJs}];

// State
let currentFilter = 'All';
let searchQuery = '';
let itemsToShow = 12;
let filteredItems = [];
let lightboxIndex = 0;

// DOM Elements
const grid = document.getElementById('galleryGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('gallerySearch');

const lightbox = document.getElementById('galleryLightbox');
const lbMediaContainer = document.getElementById('glbMediaContainer');
const lbCaption = document.getElementById('glbCaption');
const lbCounter = document.getElementById('glbCounter');
const lbClose = document.getElementById('glbClose');
const lbPrev = document.getElementById('glbPrev');
const lbNext = document.getElementById('glbNext');
const lbBackdrop = document.getElementById('glbBackdrop');

// Initialization
function initGallery() {
  applyFilters();
  setupEventListeners();
}

// Render Gallery
function renderGallery() {
  if (!grid) return;
  grid.innerHTML = '';
  
  const itemsToRender = filteredItems.slice(0, itemsToShow);
  
  itemsToRender.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'gallery-item' + (item.type === 'video' ? ' video-item' : '');
    el.setAttribute('data-index', index);
    
    // Add click handler mapping to the filteredItems array
    el.addEventListener('click', () => openLightbox(index));

    el.innerHTML = \`
      <img src="\${item.thumbnail}" alt="\${item.title}" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'" />
      <div class="gallery-overlay">
        <div class="gallery-overlay-icon">
          \${item.type === 'video' ? '▶' : '🔍'}
        </div>
        <span class="gallery-cat-badge">\${item.category}</span>
      </div>
    \`;
    grid.appendChild(el);
  });

  if (itemsToShow >= filteredItems.length) {
    loadMoreBtn.parentElement.classList.add('hidden');
  } else {
    loadMoreBtn.parentElement.classList.remove('hidden');
  }
}

// Filter Logic
function applyFilters() {
  filteredItems = galleryItems.filter(item => {
    const matchCategory = currentFilter === 'All' || item.category === currentFilter;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });
  
  // Reset pagination on filter change
  itemsToShow = 12;
  renderGallery();
}

// Event Listeners
function setupEventListeners() {
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      itemsToShow += 12;
      renderGallery();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      applyFilters();
    });
  }

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
function openLightbox(index) {
  lightboxIndex = index;
  updateLightboxContent();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  // Stop video if playing
  lbMediaContainer.innerHTML = '';
}

function navigateLightbox(dir) {
  lightboxIndex += dir;
  if (lightboxIndex < 0) lightboxIndex = filteredItems.length - 1;
  if (lightboxIndex >= filteredItems.length) lightboxIndex = 0;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = filteredItems[lightboxIndex];
  lbCounter.textContent = \`\${lightboxIndex + 1} / \${filteredItems.length}\`;
  lbCaption.textContent = item.title;
  
  lbMediaContainer.innerHTML = '';
  
  if (item.type === 'image') {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.title;
    // Basic zoom feature on click
    let zoomed = false;
    img.style.transition = 'transform 0.3s ease';
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      zoomed = !zoomed;
      img.style.transform = zoomed ? 'scale(1.5)' : 'scale(1)';
      img.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
    });
    lbMediaContainer.appendChild(img);
  } else if (item.type === 'video') {
    const vid = document.createElement('video');
    vid.src = item.src;
    vid.controls = true;
    vid.autoplay = true;
    vid.style.maxHeight = '80vh';
    lbMediaContainer.appendChild(vid);
  }
}

document.addEventListener('DOMContentLoaded', initGallery);
`;

fs.writeFileSync('C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection\\js\\gallery.js', jsContent);
console.log('gallery.js generated successfully.');
