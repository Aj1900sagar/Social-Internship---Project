/* ============================================
   KASAUDHAN COLLECTION
   gallery.js - Gallery Module Logic
   ============================================ */
'use strict';

const galleryItems = [
  {
    id: 1,
    title: "Jeans Collection 1",
    category: "Jeans",
    type: "image",
    src: "images/gallery/jeans/jeans01.webp",
    thumbnail: "images/gallery/thumbs/jeans01.webp"
  },
  {
    id: 2,
    title: "Jeans Collection 2",
    category: "Jeans",
    type: "image",
    src: "images/gallery/jeans/jeans02.webp",
    thumbnail: "images/gallery/thumbs/jeans02.webp"
  },
  {
    id: 3,
    title: "Jeans Collection 3",
    category: "Jeans",
    type: "image",
    src: "images/gallery/jeans/jeans03.webp",
    thumbnail: "images/gallery/thumbs/jeans03.webp"
  },
  {
    id: 4,
    title: "Jeans Collection 4",
    category: "Jeans",
    type: "image",
    src: "images/gallery/jeans/jeans04.webp",
    thumbnail: "images/gallery/thumbs/jeans04.webp"
  },
  {
    id: 5,
    title: "Jeans Collection 5",
    category: "Jeans",
    type: "image",
    src: "images/gallery/jeans/jeans05.webp",
    thumbnail: "images/gallery/thumbs/jeans05.webp"
  },
  {
    id: 6,
    title: "Shirts Collection 1",
    category: "Shirts",
    type: "image",
    src: "images/gallery/shirts/shirts01.webp",
    thumbnail: "images/gallery/thumbs/shirts01.webp"
  },
  {
    id: 7,
    title: "Shirts Collection 2",
    category: "Shirts",
    type: "image",
    src: "images/gallery/shirts/shirts02.webp",
    thumbnail: "images/gallery/thumbs/shirts02.webp"
  },
  {
    id: 8,
    title: "Shirts Collection 3",
    category: "Shirts",
    type: "image",
    src: "images/gallery/shirts/shirts03.webp",
    thumbnail: "images/gallery/thumbs/shirts03.webp"
  },
  {
    id: 9,
    title: "Shirts Collection 4",
    category: "Shirts",
    type: "image",
    src: "images/gallery/shirts/shirts04.webp",
    thumbnail: "images/gallery/thumbs/shirts04.webp"
  },
  {
    id: 10,
    title: "Shirts Collection 5",
    category: "Shirts",
    type: "image",
    src: "images/gallery/shirts/shirts05.webp",
    thumbnail: "images/gallery/thumbs/shirts05.webp"
  },
  {
    id: 11,
    title: "T-Shirts Collection 1",
    category: "T-Shirts",
    type: "image",
    src: "images/gallery/tshirts/tshirts01.webp",
    thumbnail: "images/gallery/thumbs/tshirts01.webp"
  },
  {
    id: 12,
    title: "T-Shirts Collection 2",
    category: "T-Shirts",
    type: "image",
    src: "images/gallery/tshirts/tshirts02.webp",
    thumbnail: "images/gallery/thumbs/tshirts02.webp"
  },
  {
    id: 13,
    title: "T-Shirts Collection 3",
    category: "T-Shirts",
    type: "image",
    src: "images/gallery/tshirts/tshirts03.webp",
    thumbnail: "images/gallery/thumbs/tshirts03.webp"
  },
  {
    id: 14,
    title: "T-Shirts Collection 4",
    category: "T-Shirts",
    type: "image",
    src: "images/gallery/tshirts/tshirts04.webp",
    thumbnail: "images/gallery/thumbs/tshirts04.webp"
  },
  {
    id: 15,
    title: "T-Shirts Collection 5",
    category: "T-Shirts",
    type: "image",
    src: "images/gallery/tshirts/tshirts05.webp",
    thumbnail: "images/gallery/thumbs/tshirts05.webp"
  },
  {
    id: 16,
    title: "Lowers Collection 1",
    category: "Lowers",
    type: "image",
    src: "images/gallery/lowers/lowers01.webp",
    thumbnail: "images/gallery/thumbs/lowers01.webp"
  },
  {
    id: 17,
    title: "Lowers Collection 2",
    category: "Lowers",
    type: "image",
    src: "images/gallery/lowers/lowers02.webp",
    thumbnail: "images/gallery/thumbs/lowers02.webp"
  },
  {
    id: 18,
    title: "Lowers Collection 3",
    category: "Lowers",
    type: "image",
    src: "images/gallery/lowers/lowers03.webp",
    thumbnail: "images/gallery/thumbs/lowers03.webp"
  },
  {
    id: 19,
    title: "Lowers Collection 4",
    category: "Lowers",
    type: "image",
    src: "images/gallery/lowers/lowers04.webp",
    thumbnail: "images/gallery/thumbs/lowers04.webp"
  },
  {
    id: 20,
    title: "Lowers Collection 5",
    category: "Lowers",
    type: "image",
    src: "images/gallery/lowers/lowers05.webp",
    thumbnail: "images/gallery/thumbs/lowers05.webp"
  },
  {
    id: 21,
    title: "Kids Wear Collection 1",
    category: "Kids Wear",
    type: "image",
    src: "images/gallery/kids/kids01.webp",
    thumbnail: "images/gallery/thumbs/kids01.webp"
  },
  {
    id: 22,
    title: "Kids Wear Collection 2",
    category: "Kids Wear",
    type: "image",
    src: "images/gallery/kids/kids02.webp",
    thumbnail: "images/gallery/thumbs/kids02.webp"
  },
  {
    id: 23,
    title: "Kids Wear Collection 3",
    category: "Kids Wear",
    type: "image",
    src: "images/gallery/kids/kids03.webp",
    thumbnail: "images/gallery/thumbs/kids03.webp"
  },
  {
    id: 24,
    title: "Kids Wear Collection 4",
    category: "Kids Wear",
    type: "image",
    src: "images/gallery/kids/kids04.webp",
    thumbnail: "images/gallery/thumbs/kids04.webp"
  },
  {
    id: 25,
    title: "Kids Wear Collection 5",
    category: "Kids Wear",
    type: "image",
    src: "images/gallery/kids/kids05.webp",
    thumbnail: "images/gallery/thumbs/kids05.webp"
  },
  {
    id: 26,
    title: "Accessories Collection 1",
    category: "Accessories",
    type: "image",
    src: "images/gallery/accessories/accessories01.webp",
    thumbnail: "images/gallery/thumbs/accessories01.webp"
  },
  {
    id: 27,
    title: "Accessories Collection 2",
    category: "Accessories",
    type: "image",
    src: "images/gallery/accessories/accessories02.webp",
    thumbnail: "images/gallery/thumbs/accessories02.webp"
  },
  {
    id: 28,
    title: "Accessories Collection 3",
    category: "Accessories",
    type: "image",
    src: "images/gallery/accessories/accessories03.webp",
    thumbnail: "images/gallery/thumbs/accessories03.webp"
  },
  {
    id: 29,
    title: "Accessories Collection 4",
    category: "Accessories",
    type: "image",
    src: "images/gallery/accessories/accessories04.webp",
    thumbnail: "images/gallery/thumbs/accessories04.webp"
  },
  {
    id: 30,
    title: "Accessories Collection 5",
    category: "Accessories",
    type: "image",
    src: "images/gallery/accessories/accessories05.webp",
    thumbnail: "images/gallery/thumbs/accessories05.webp"
  },
  {
    id: 31,
    title: "Winter Collection Collection 1",
    category: "Winter Collection",
    type: "image",
    src: "images/gallery/winter/winter01.webp",
    thumbnail: "images/gallery/thumbs/winter01.webp"
  },
  {
    id: 32,
    title: "Winter Collection Collection 2",
    category: "Winter Collection",
    type: "image",
    src: "images/gallery/winter/winter02.webp",
    thumbnail: "images/gallery/thumbs/winter02.webp"
  },
  {
    id: 33,
    title: "Winter Collection Collection 3",
    category: "Winter Collection",
    type: "image",
    src: "images/gallery/winter/winter03.webp",
    thumbnail: "images/gallery/thumbs/winter03.webp"
  },
  {
    id: 34,
    title: "Winter Collection Collection 4",
    category: "Winter Collection",
    type: "image",
    src: "images/gallery/winter/winter04.webp",
    thumbnail: "images/gallery/thumbs/winter04.webp"
  },
  {
    id: 35,
    title: "Winter Collection Collection 5",
    category: "Winter Collection",
    type: "image",
    src: "images/gallery/winter/winter05.webp",
    thumbnail: "images/gallery/thumbs/winter05.webp"
  },
  {
    id: 36,
    title: "Store Interior Front",
    category: "Shop",
    type: "image",
    src: "images/gallery/shop/shop-bg.webp",
    thumbnail: "images/gallery/shop/shop-bg.webp"
  },
  {
    id: 37,
    title: "Store Exterior",
    category: "Shop",
    type: "image",
    src: "images/gallery/shop/store.webp",
    thumbnail: "images/gallery/shop/store.webp"
  },
  {
    id: 38,
    title: "Virtual Shop Tour",
    category: "Shop",
    type: "video",
    src: "videos/gallery/shop-tour.mp4",
    thumbnail: "images/gallery/shop/store.webp",
    duration: "1:45"
  },
  {
    id: 39,
    title: "Winter Collection Highlights",
    category: "Winter Collection",
    type: "video",
    src: "videos/gallery/collection-01.mp4",
    thumbnail: "images/gallery/thumbs/winter01.webp",
    duration: "0:50"
  },
  {
    id: 40,
    title: "New Arrivals Showcase",
    category: "New Arrivals",
    type: "video",
    src: "videos/gallery/collection-02.mp4",
    thumbnail: "images/gallery/thumbs/shirts01.webp",
    duration: "1:20"
  }
];

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

    el.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'" />
      <div class="gallery-overlay">
        <div class="gallery-overlay-icon">
          ${item.type === 'video' ? '▶' : '🔍'}
        </div>
        <span class="gallery-cat-badge">${item.category}</span>
      </div>
    `;
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
  lbCounter.textContent = `${lightboxIndex + 1} / ${filteredItems.length}`;
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
