
// --- EMERGENCY PRELOADER FALLBACK ---
setTimeout(function() {
  var preloader = document.getElementById('loader'); // Use 'loader' to match HTML
  if (preloader) {
    preloader.style.opacity = '0';
    preloader.style.display = 'none';
  }
}, 3000);
// ------------------------------------
/* ============================================
   KASAUDHAN COLLECTION – Premium Fashion Store
   script.js – All Interactions & Animations
   ============================================ */

'use strict';

// ===== GALLERY DATA (for lightbox) =====
const galleryImages = [
  { src: 'assets/images/store_front.jpg', caption: 'Kasaudhan Collection – Store Front' },
  { src: 'assets/images/store_interior.jpg', caption: 'Store Interior – Beautiful Collection Display' },
  { src: 'assets/images/jeans.jpg', caption: 'Premium Denim Jeans Collection' },
  { src: 'assets/images/shirts.jpg', caption: 'Casual & Formal Shirts Collection' },
  { src: 'assets/images/tshirts.jpg', caption: 'Graphic & Solid T-Shirts Collection' },
  { src: 'assets/images/kids.jpg', caption: 'Kids Fashion & Clothing' },
  { src: 'assets/images/accessories.jpg', caption: 'Belts, Slippers & Accessories' },
  { src: 'assets/images/lowers.jpg', caption: 'Track Pants & Lowers Collection' },
  { src: 'assets/images/winter.jpg', caption: 'Winter Wear – Jackets & Hoodies' },
  { src: 'assets/images/store_hero.jpg', caption: 'Complete Fashion Collection' }
];

// ===== PRODUCT DATA (for search & quickview) =====
const products = [
  { name: 'Premium Denim Jeans', cat: 'jeans', price: '₹799', img: 'assets/images/jeans.jpg', sizes: '30,32,34,36,38', desc: 'Slim fit cotton denim – durable, stylish, and comfortable.' },
  { name: 'Casual Cotton Shirt', cat: 'shirts', price: '₹549', img: 'assets/images/shirts.jpg', sizes: 'S,M,L,XL,XXL', desc: 'Premium cotton casual shirts for daily wear and outings.' },
  { name: 'Graphic Print T-Shirt', cat: 'tshirts', price: '₹349', img: 'assets/images/tshirts.jpg', sizes: 'S,M,L,XL,XXL', desc: 'Trendy graphic and solid color T-shirts for casual everyday style.' },
  { name: 'Kids Fashion Set', cat: 'kids', price: '₹299', img: 'assets/images/kids.jpg', sizes: '2Y,4Y,6Y,8Y,10Y', desc: 'Colorful & comfortable clothing sets for kids.' },
  { name: 'Casual Track Lower', cat: 'lowers', price: '₹449', img: 'assets/images/lowers.jpg', sizes: 'S,M,L,XL,XXL', desc: 'Comfortable cotton track pants and joggers.' },
  { name: 'Premium Leather Belt', cat: 'accessories', price: '₹249', img: 'assets/images/accessories.jpg', sizes: '28,30,32,34,36', desc: 'Genuine leather belts and fashionable slippers.' },
  { name: 'Premium Winter Jacket', cat: 'winter', price: '₹999', img: 'assets/images/winter.jpg', sizes: 'S,M,L,XL,XXL', desc: 'Warm and stylish jackets for winter.' },
  { name: 'Premium Formal Shirt', cat: 'shirts', price: '₹649', img: 'assets/images/shirts.jpg', sizes: 'S,M,L,XL', desc: 'Classic formal shirts for office and special occasions.' }
];

// ===== CART =====
let cart = JSON.parse(localStorage.getItem('kc_cart') || '[]');
let currentLightboxIndex = 0;

// ============================================
// LOADER
// ============================================
function initLoader() {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  if (!loader || !bar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initCounterAnimation();
        showFestivalPopup();
      }, 400);
    }
    bar.style.width = Math.min(progress, 100) + '%';
  }, 100);

  document.body.style.overflow = 'hidden';
}

// ============================================
// OFFER BANNER
// ============================================
function initOfferBanner() {
  const closeBtn = document.getElementById('closeBanner');
  const banner = document.getElementById('offerBanner');
  if (!closeBtn || !banner) return;

  closeBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
    sessionStorage.setItem('bannerClosed', '1');
  });

  if (sessionStorage.getItem('bannerClosed')) {
    banner.classList.add('hidden');
  }
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ============================================
// STICKY HEADER
// ============================================
function initHeader() {
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    if (backToTop) {
      backToTop.hidden = current < 400;
    }
    lastScroll = current;
  }, { passive: true });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('mobileClose');
  if (!btn || !nav || !overlay) return;

  function openMenu() {
    nav.hidden = false;
    overlay.hidden = false;
    // small delay to allow transition
    requestAnimationFrame(() => {
      nav.classList.add('open');
      overlay.classList.add('active');
    });
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    nav.classList.remove('open');
    overlay.classList.remove('active');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    
    setTimeout(() => {
      nav.hidden = true;
      overlay.hidden = true;
    }, 300);
    
    document.body.classList.remove('no-scroll');
  }

  btn.addEventListener('click', () => {
    if (nav.classList.contains('open')) closeMenu();
    else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  nav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  nav.querySelectorAll('.mobile-shop-btn, .mobile-cart-btn, .mobile-search-btn').forEach(btn => {
    btn.addEventListener('click', closeMenu);
  });

  // Attach the cart/search functions to the mobile drawer buttons
  const mobSearchBtn = nav.querySelector('.mobile-search-btn');
  if (mobSearchBtn) mobSearchBtn.addEventListener('click', () => document.getElementById('searchToggle')?.click());
  
  const mobCartBtn = nav.querySelector('.mobile-cart-btn');
  if (mobCartBtn) mobCartBtn.addEventListener('click', openCart);
  
  // Make closeMenu globally available for ESC handler
  window.closeMobileMenu = closeMenu;
}

// ============================================
// SEARCH
// ============================================
function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const bar = document.getElementById('searchBar');
  const input = document.getElementById('searchInput');
  const closeBtn = document.getElementById('searchClose');
  const results = document.getElementById('searchResults');
  if (!toggle || !bar) return;

  toggle.addEventListener('click', () => {
    bar.hidden = !bar.hidden;
    if (!bar.hidden) input?.focus();
  });

  closeBtn?.addEventListener('click', () => {
    bar.hidden = true;
    if (results) results.innerHTML = '';
  });

  input?.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }

    const matches = products.filter(p =>
      p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
    );

    results.innerHTML = matches.length
      ? matches.map(p => `
          <div class="search-result-item" onclick="scrollToProducts('${p.cat}')">
            <img src="${p.img}" alt="${p.name}" />
            <div>
              <strong>${p.name}</strong><br/>
              <small style="color:#888">${p.cat} · ${p.price}</small>
            </div>
          </div>`).join('')
      : '<div class="search-result-item"><div>No products found for "<strong>' + q + '</strong>"</div></div>';
  });
}

function scrollToProducts(cat) {
  const bar = document.getElementById('searchBar');
  if (bar) bar.hidden = true;
  filterProducts(cat);
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// ============================================
// PRODUCT FILTER
// ============================================
function initProductFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProducts();
    });
  });

  const searchInput = document.getElementById('featuredSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterProducts();
    });
  }
}

function filterProducts(filter) {
  if (filter) {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === filter);
    });
  }

  const activeBtn = document.querySelector('.filter-btn.active');
  const categoryFilter = activeBtn ? activeBtn.dataset.filter : 'all';
  
  const searchInput = document.getElementById('featuredSearchInput');
  const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
  
  const cards = document.querySelectorAll('.product-card');
  let visibleCount = 0;
  
  cards.forEach(card => {
    const categoryMatches = (categoryFilter === 'all' || card.dataset.cat === categoryFilter);
    
    let searchMatches = true;
    if (searchQuery !== '') {
      const productName = card.querySelector('.product-name').innerText.toLowerCase();
      const productCat = card.querySelector('.product-cat').innerText.toLowerCase();
      const productDesc = card.querySelector('.product-desc') ? card.querySelector('.product-desc').innerText.toLowerCase() : '';
      const badges = Array.from(card.querySelectorAll('.badge')).map(b => b.innerText.toLowerCase()).join(' ');
      
      searchMatches = productName.includes(searchQuery) || 
                      productCat.includes(searchQuery) || 
                      productDesc.includes(searchQuery) ||
                      badges.includes(searchQuery);
    }
    
    const show = categoryMatches && searchMatches;
    card.classList.toggle('hidden-product', !show);
    if (show) {
      visibleCount++;
      card.style.animation = 'fadeUp 0.4s ease both';
    }
  });
  
  const noProductsMsg = document.getElementById('noProductsMsg');
  if (noProductsMsg) {
    noProductsMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
  }
}

// ============================================
// NEW ARRIVALS SLIDER
// ============================================
let sliderOffset = 0;
function slideArrivals(direction) {
  const slider = document.getElementById('arrivalsSlider');
  if (!slider) return;
  const cardWidth = 240;
  sliderOffset += direction * cardWidth;
  const maxOffset = slider.scrollWidth - slider.clientWidth;
  sliderOffset = Math.max(0, Math.min(sliderOffset, maxOffset));
  slider.scrollTo({ left: sliderOffset, behavior: 'smooth' });
}

function initArrivalsAutoScroll() {
  const slider = document.getElementById('arrivalsSlider');
  if (!slider) return;
  let dir = 1;
  setInterval(() => {
    const maxOffset = slider.scrollWidth - slider.clientWidth;
    sliderOffset += 220 * dir;
    if (sliderOffset >= maxOffset) dir = -1;
    if (sliderOffset <= 0) dir = 1;
    sliderOffset = Math.max(0, Math.min(sliderOffset, maxOffset));
    slider.scrollTo({ left: sliderOffset, behavior: 'smooth' });
  }, 3000);
}

// ============================================
// GALLERY FILTER & LIGHTBOX
// ============================================
function initGalleryFilter() {
  const btns = document.querySelectorAll('.gal-filter');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.gfilter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        const show = filter === 'all' || item.dataset.gtag === filter;
        item.classList.toggle('gallery-hidden', !show);
      });
    });
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  const caption = document.getElementById('lbCaption');
  if (!lb || !img) return;

  img.src = galleryImages[index].src;
  img.alt = galleryImages[index].caption;
  if (caption) caption.textContent = galleryImages[index].caption;
  
  lb.hidden = false;
  lb.style.display = 'flex';
  lb.style.opacity = '1';
  lb.style.visibility = 'visible';
  lb.style.pointerEvents = 'auto';
  
  lb.onclick = function(e) {
    if (e.target === lb) closeLightbox();
  };

  document.body.classList.add('no-scroll');

  // Keyboard support
  document.addEventListener('keydown', lightboxKeyHandler);
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.style.opacity = '0';
    lb.style.transition = 'opacity 0.25s ease';
    setTimeout(() => {
      lb.hidden = true;
      lb.style.display = 'none';
      lb.style.visibility = 'hidden';
      lb.style.pointerEvents = 'none';
      lb.style.transition = '';
      lb.style.opacity = '';
    }, 250);
  }
  document.body.classList.remove('no-scroll');
  document.body.style.overflow = 'auto';
  document.body.style.pointerEvents = 'auto';
  document.removeEventListener('keydown', lightboxKeyHandler);
}

function lightboxNav(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
  openLightbox(currentLightboxIndex);
}

function lightboxKeyHandler(e) {
  if (e.key === 'ArrowLeft') lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'Escape') closeLightbox();
}

// ============================================
// QUICK VIEW MODAL
// ============================================
function openQuickView(cat) {
  const product = products.find(p => p.cat === cat);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('qvBackdrop');
  const content = document.getElementById('qvContent');
  if (!modal || !content) return;
  
  let selectedSize = null;

  content.innerHTML = `
    <div>
      <img src="${product.img}" alt="${product.name}" class="qv-img" />
    </div>
    <div>
      <span class="product-cat">${product.cat.toUpperCase()}</span>
      <h3 class="product-name" style="font-size:1.3rem;margin:8px 0">${product.name}</h3>
      <p style="color:#666;font-size:0.9rem;margin-bottom:16px;">${product.desc}</p>
      <div class="product-sizes" style="margin-bottom:8px">
        <span class="size-label">Sizes:</span>
        <div style="display:inline-flex; gap:8px; flex-wrap:wrap;">
          ${product.sizes.split(',').map(s => `<span class="size-tag" data-size="${s.trim()}" style="cursor:pointer;">${s.trim()}</span>`).join('')}
        </div>
      </div>
      <div id="qvSizeError" style="color:var(--error, #e53e3e); font-size:0.85rem; margin-bottom:16px; display:none;">Please select a size.</div>
      <div class="product-price-row" style="margin-bottom:20px">
        <span class="product-price">${product.price}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <button id="qvAddToCartBtn" class="btn btn-primary">🛒 Add to Cart</button>
        <button id="qvWhatsAppBtn" class="btn btn-whatsapp">💬 WhatsApp Order</button>
      </div>
    </div>
  `;
  
  // Size selection logic
  const sizeTags = content.querySelectorAll('.size-tag');
  const errorMsg = document.getElementById('qvSizeError');
  
  sizeTags.forEach(tag => {
    tag.addEventListener('click', function() {
      sizeTags.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      selectedSize = this.getAttribute('data-size');
      errorMsg.style.display = 'none';
    });
  });
  
  // Add to cart click
  document.getElementById('qvAddToCartBtn').addEventListener('click', () => {
    if (!selectedSize && sizeTags.length > 0) {
      errorMsg.style.display = 'block';
      return;
    }
    addToCart(product.name, product.price, product.img.split('/').pop(), selectedSize);
  });
  
  // WhatsApp Order click
  const waBtn = document.getElementById('qvWhatsAppBtn');
  waBtn.addEventListener('click', () => {
    if (!selectedSize && sizeTags.length > 0) {
      errorMsg.style.display = 'block';
      return;
    }
    const msg = `Hello,\n\nI want to order the following product.\n\n🛍 Product:\n${product.name}\n\n📏 Size:\n${selectedSize || 'N/A'}\n\n💰 Price:\n${product.price}\n\n📦 Quantity:\n1`;
    sendWhatsAppOrder(msg, waBtn);
  });

  modal.hidden = false;
  if (backdrop) backdrop.hidden = false;
  
  modal.style.display = 'flex';
  modal.style.opacity = '1';
  modal.style.visibility = 'visible';
  modal.style.pointerEvents = 'auto';
  
  if (backdrop) {
    backdrop.style.display = 'block';
    backdrop.style.opacity = '1';
    backdrop.style.visibility = 'visible';
    backdrop.style.pointerEvents = 'auto';
  }

  modal.onclick = function(e) {
    if (e.target === modal) closeQuickView();
  };

  document.body.classList.add('no-scroll');
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('qvBackdrop');
  
  if (modal) {
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.25s ease';
  }
  if (backdrop) {
    backdrop.style.opacity = '0';
    backdrop.style.transition = 'opacity 0.25s ease';
  }
  
  setTimeout(() => {
    if (modal) {
      modal.hidden = true;
      modal.style.display = 'none';
      modal.style.visibility = 'hidden';
      modal.style.pointerEvents = 'none';
      modal.style.transition = '';
      modal.style.opacity = '';
    }
    if (backdrop) {
      backdrop.hidden = true;
      backdrop.style.display = 'none';
      backdrop.style.visibility = 'hidden';
      backdrop.style.pointerEvents = 'none';
      backdrop.style.transition = '';
      backdrop.style.opacity = '';
    }
  }, 250);
  
  document.body.classList.remove('no-scroll');
  document.body.style.overflow = 'auto';
  document.body.style.pointerEvents = 'auto';
}

// ============================================
// CART SYSTEM
// ============================================
function addToCart(name, price, imgFile, size = null) {
  const existing = cart.find(item => item.name === name && item.size === size);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ name, price, img: 'assets/images/' + imgFile, qty: 1, size: size });
  }
  saveCart();
  updateCartUI();
  showToast('✅ ' + name + (size ? ` (Size: ${size})` : '') + ' added to cart!', 'success');
  openCart();
}

function removeFromCart(index) {
  if (index < 0 || index >= cart.length) return;
  
  const cartBody = document.getElementById('cartBody');
  const itemEl = cartBody ? cartBody.children[index] : null;
  
  // Prevent rapid clicks during animation
  if (cartBody) cartBody.style.pointerEvents = 'none';
  
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
  
  // Instant total update
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) {
    const total = cart.reduce((sum, item) => {
      const price = parseInt((item.price || '0').replace(/[^0-9]/g, ''));
      return sum + (price * (item.qty || 1));
    }, 0);
    totalEl.innerHTML = '₹' + total.toLocaleString('en-IN');
  }
  
  if (cart.length === 0) {
    const footer = document.getElementById('cartFooter');
    if (footer) footer.hidden = true;
  }

  if (itemEl) {
    itemEl.style.transition = 'all 0.25s ease';
    itemEl.style.opacity = '0';
    itemEl.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      renderCartItems();
      if (cartBody) cartBody.style.pointerEvents = 'auto';
    }, 250);
  } else {
    renderCartItems();
    if (cartBody) cartBody.style.pointerEvents = 'auto';
  }
}

function saveCart() {
  localStorage.setItem('kc_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = document.getElementById('cartCount');
  const mobileCount = document.getElementById('mobileCartCount');
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  if (count) count.textContent = totalItems;
  if (mobileCount) mobileCount.textContent = totalItems;
}

function renderCartItems() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = '<div class="cart-empty"><p>🛒</p><p>Your cart is empty</p><p style="font-size:0.82rem;color:#aaa">Add items from the products section!</p></div>';
    if (footer) footer.hidden = true;
    return;
  }

  body.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" loading="lazy" />
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        ${item.size ? `<span style="display:block; font-size:0.8rem; color:var(--text-light, #666);">Size: ${item.size}</span>` : ''}
        <span>${item.price} × ${item.qty || 1}</span>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" title="Remove">✕</button>
    </div>
  `).join('');

  // Calculate total
  const total = cart.reduce((sum, item) => {
    const price = parseInt((item.price || '0').replace(/[^0-9]/g, ''));
    return sum + (price * (item.qty || 1));
  }, 0);

  if (footer) footer.hidden = false;
  if (totalEl) totalEl.innerHTML = '₹' + total.toLocaleString('en-IN');
}

function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (!drawer) return;
  
  drawer.hidden = false;
  if (backdrop) backdrop.hidden = false;
  
  drawer.style.display = 'flex';
  drawer.style.opacity = '1';
  drawer.style.visibility = 'visible';
  drawer.style.pointerEvents = 'auto';
  drawer.style.transform = ''; // Ensure no off-screen transform is stuck
  
  if (backdrop) {
    backdrop.style.display = 'block';
    backdrop.style.opacity = '1';
    backdrop.style.visibility = 'visible';
    backdrop.style.pointerEvents = 'auto';
  }

  document.body.classList.add('no-scroll');
  renderCartItems();
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  
  if (drawer) {
    drawer.style.transform = 'translateX(100%)';
    drawer.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
    drawer.style.opacity = '0';
  }
  if (backdrop) {
    backdrop.style.opacity = '0';
    backdrop.style.transition = 'opacity 0.25s ease';
  }
  
  setTimeout(() => {
    if (drawer) {
      drawer.hidden = true;
      drawer.style.display = 'none';
      drawer.style.visibility = 'hidden';
      drawer.style.pointerEvents = 'none';
      drawer.style.transition = '';
      drawer.style.transform = '';
      drawer.style.opacity = '';
    }
    if (backdrop) {
      backdrop.hidden = true;
      backdrop.style.display = 'none';
      backdrop.style.visibility = 'hidden';
      backdrop.style.pointerEvents = 'none';
      backdrop.style.transition = '';
      backdrop.style.opacity = '';
    }
  }, 250);
  
  document.body.classList.remove('no-scroll');
  document.body.style.overflow = 'auto';
  document.body.style.pointerEvents = 'auto';
}

function sendWhatsAppOrder(baseMsg, btnElement) {
  const originalText = btnElement ? btnElement.innerHTML : '';
  if (btnElement) {
    btnElement.innerHTML = '⏳ Getting Location...';
    btnElement.style.pointerEvents = 'none';
  }

  function finish(locationStr) {
    if (btnElement) {
      btnElement.innerHTML = originalText;
      btnElement.style.pointerEvents = 'auto';
    }
    const finalMsg = `${baseMsg}\n\n${locationStr}\n\nPlease contact me regarding my order.\n\nThank you.`;
    window.open('https://wa.me/919696824331?text=' + encodeURIComponent(finalMsg), '_blank');
  }

  if (!navigator.geolocation) {
    finish('📍 Pickup Location:\nLocation not shared by customer.');
    return;
  }

  let locationResolved = false;

  const timeoutId = setTimeout(() => {
    if (!locationResolved) {
      locationResolved = true;
      finish('📍 Pickup Location:\nLocation not shared by customer.');
    }
  }, 5000);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (locationResolved) return;
      locationResolved = true;
      clearTimeout(timeoutId);
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      finish(`📍 My Current Pickup Location:\nLatitude: ${lat}\nLongitude: ${lng}\n\nGoogle Maps:\nhttps://www.google.com/maps?q=${lat},${lng}`);
    },
    (error) => {
      if (locationResolved) return;
      locationResolved = true;
      clearTimeout(timeoutId);
      finish('📍 Pickup Location:\nLocation not shared by customer.');
    },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
}

function checkoutViaWhatsApp() {
  if (cart.length === 0) return;
  const items = cart.map(i => `🛍 Product:\n${i.name}\n\n📏 Size:\n${i.size || 'N/A'}\n\n💰 Price:\n${i.price}\n\n📦 Quantity:\n${i.qty || 1}`).join('\n\n------------------------------------\n\n');
  const total = cart.reduce((sum, item) => {
    const price = parseInt((item.price || '0').replace(/[^0-9]/g, ''));
    return sum + (price * (item.qty || 1));
  }, 0);
  const msg = `Hello,\n\nI want to order the following products:\n\n${items}\n\n------------------------------------\n\nTotal: ₹${total.toLocaleString('en-IN')}`;
  
  const btn = document.querySelector('.cart-footer .btn-whatsapp');
  sendWhatsAppOrder(msg, btn);
}

function initCart() {
  const cartToggle = document.getElementById('cartToggle');
  if (cartToggle) {
    cartToggle.addEventListener('click', openCart);
  }
  updateCartUI();
}

// ============================================
// WISHLIST
// ============================================
function toggleWishlist(btn) {
  btn.classList.toggle('active');
  const name = btn.dataset.name || 'Item';
  if (btn.classList.contains('active')) {
    btn.innerHTML = '♥';
    showToast('❤️ ' + name + ' added to wishlist!', 'success');
  } else {
    btn.innerHTML = '♡';
    showToast('Removed from wishlist', '');
  }
}

// ============================================
// SHARE PRODUCT
// ============================================
function shareProduct(name) {
  const text = `Check out "${name}" at Kasaudhan Collection, Gadakul, Shohratgarh! Call 9696824331 or WhatsApp to order.`;
  if (navigator.share) {
    navigator.share({ title: 'Kasaudhan Collection', text, url: window.location.href })
      .catch(() => copyToClipboard(text));
  } else {
    copyToClipboard(text);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 Product link copied!', 'success');
  }).catch(() => {
    showToast('Share: ' + text.substring(0, 40) + '...', '');
  });
}

// ============================================
// WHATSAPP ORDER FORM
// ============================================
function submitOrder(e) {
  e.preventDefault();
  const form = e.target;
  const name = document.getElementById('fname')?.value.trim();
  const phone = document.getElementById('fphone')?.value.trim();
  const category = document.getElementById('fcategory')?.value;
  const product = document.getElementById('fproduct')?.value.trim();
  const size = document.getElementById('fsize')?.value.trim();
  const color = document.getElementById('fcolor')?.value.trim();
  const qty = document.getElementById('fqty')?.value || '1';
  const address = document.getElementById('faddress')?.value.trim();
  const message = document.getElementById('fmessage')?.value.trim();

  if (!name || !phone || !category || !product) {
    showToast('⚠️ Please fill in all required fields', 'error');
    return;
  }

  const msg = `🛍 *New Order – Kasaudhan Collection*\n\n`
    + `👤 *Name:* ${name}\n`
    + `📞 *Phone:* ${phone}\n`
    + `📂 *Category:* ${category}\n`
    + `👕 *Product:* ${product}\n`
    + (size ? `📐 *Size:* ${size}\n` : '')
    + (color ? `🎨 *Color:* ${color}\n` : '')
    + `🔢 *Quantity:* ${qty}\n`
    + (address ? `📍 *Address:* ${address}\n` : '')
    + (message ? `💬 *Message:* ${message}\n` : '')
    + `\n_Ordered via Kasaudhan Collection Website_`;

  window.open('https://wa.me/919696824331?text=' + encodeURIComponent(msg), '_blank');
  form.reset();
  showToast('✅ Order sent via WhatsApp!', 'success');
}

// ============================================
// INQUIRY FORM
// ============================================
function submitInquiry(e) {
  e.preventDefault();
  const name = document.getElementById('iname')?.value.trim();
  const phone = document.getElementById('iphone')?.value.trim();
  const msg = document.getElementById('imsg')?.value.trim();

  if (!name || !phone || !msg) {
    showToast('⚠️ Please fill in all fields', 'error');
    return;
  }

  const waMsg = `📩 *Inquiry – Kasaudhan Collection*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n💬 *Message:* ${msg}\n\n_Sent via Website Inquiry Form_`;
  window.open('https://wa.me/919696824331?text=' + encodeURIComponent(waMsg), '_blank');
  e.target.reset();
  showToast('✅ Inquiry sent via WhatsApp!', 'success');
}

// ============================================
// FAQ ACCORDION
// ============================================
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) item.classList.add('open');
}

// ============================================
// LEAFLET MAP
// ============================================
function initMap() {
  if (typeof L === 'undefined') {
    console.warn('Leaflet not loaded');
    return;
  }

  const lat = 27.1267;
  const lng = 82.8732;

  const map = L.map('map', {
    center: [lat, lng],
    zoom: 14,
    zoomControl: true,
    scrollWheelZoom: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  const goldIcon = L.divIcon({
    className: '',
    html: `<div style="
      width:44px;height:44px;
      background:#D4AF37;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:3px solid white;
      box-shadow:0 4px 12px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;
    "><div style="transform:rotate(45deg);font-size:18px;">🏪</div></div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -44]
  });

  const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);
  marker.bindPopup(`
    <div style="font-family:Poppins,sans-serif;padding:8px;text-align:center;">
      <strong style="font-size:1rem;color:#111;">Kasaudhan Collection</strong><br/>
      <span style="color:#666;font-size:0.85rem;">Gadakul, Shohratgarh<br/>Siddharthnagar, UP</span><br/><br/>
      <a href="tel:9696824331" style="color:#D4AF37;font-weight:600;">📞 9696824331</a>
    </div>
  `).openPopup();
}

// ============================================
// FESTIVAL POPUP  — Complete rewrite
// ============================================
(function () {
  // ---- Constants ----
  const LS_KEY    = 'festivalPopupSeen';
  const LS_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in ms
  const DELAY_MS  = 5000;                 // show after 5 s
  const AUTO_CLOSE_MS = 8000;             // auto-close after 8 s

  let autoCloseTimer = null;
  let isOpen = false;

  // ---- Helpers ----
  function getPopupEl()   { return document.getElementById('festivalPopup'); }
  function getBackdropEl() { return document.getElementById('fpBackdrop'); }

  function shouldShow() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return true;
      const { ts } = JSON.parse(raw);
      return (Date.now() - ts) > LS_EXPIRY;
    } catch (_) {
      return true;
    }
  }

  function markSeen() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ ts: Date.now() }));
    } catch (_) {}
  }

  // ---- Open ----
  function openPopup() {
    if (!shouldShow()) return;
    const popup   = getPopupEl();
    const backdrop = getBackdropEl();
    if (!popup || !backdrop) return;

    // Reveal
    popup.classList.add('fp-visible');
    backdrop.classList.add('fp-visible');
    isOpen = true;

    // Lock scroll
    document.body.classList.add('no-scroll');
    document.body.style.overflow = 'hidden';

    // Mark seen
    markSeen();

    // Restart the CSS timer bar animation
    const fill = document.getElementById('fpTimerFill');
    if (fill) {
      fill.style.animation = 'none';
      void fill.offsetWidth; // reflow
      fill.style.animation = `fp-timer ${AUTO_CLOSE_MS / 1000}s linear forwards`;
    }

    // Auto-close after AUTO_CLOSE_MS
    clearTimeout(autoCloseTimer);
    autoCloseTimer = setTimeout(closePopup, AUTO_CLOSE_MS);
  }

  // ---- Close ----
  function closePopup() {
    if (!isOpen) return;
    isOpen = false;

    clearTimeout(autoCloseTimer);

    const popup    = getPopupEl();
    const backdrop = getBackdropEl();

    // Fade out
    if (popup)    popup.classList.remove('fp-visible');
    if (backdrop) backdrop.classList.remove('fp-visible');

    // Restore scroll after transition ends (matches CSS 0.35s)
    setTimeout(() => {
      document.body.classList.remove('no-scroll');
      document.body.style.overflow = '';

      // Remove elements from DOM so they can never block interaction
      popup?.remove();
      backdrop?.remove();
    }, 380);
  }

  // ---- Attach events (once) ----
  function attachEvents() {
    // X button
    const closeBtn = document.getElementById('fpClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closePopup();
      }, { once: true });
    }

    // Click backdrop → close
    const backdrop = getBackdropEl();
    if (backdrop) {
      backdrop.addEventListener('click', closePopup, { once: true });
    }

    // Click outside inner card → close
    const popup = getPopupEl();
    if (popup) {
      popup.addEventListener('click', (e) => {
        if (!document.getElementById('fpInner')?.contains(e.target)) {
          closePopup();
        }
      });
    }

    // Shop Now button → close + navigate
    const shopBtn = document.getElementById('fpShopBtn');
    if (shopBtn) {
      shopBtn.addEventListener('click', () => {
        closePopup();
      });
    }

    // WhatsApp button → just close (link opens in new tab by itself)
    const waBtn = document.getElementById('fpWaBtn');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        closePopup();
      });
    }

    // ESC key — handled globally in initKeyboardSupport, but also here as fallback
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape' && isOpen) {
        closePopup();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  // ---- Public API ----
  window.showFestivalPopup = function () {
    if (!shouldShow()) return;
    setTimeout(() => {
      attachEvents();
      openPopup();
    }, DELAY_MS);
  };

  window.closePopup = closePopup;
}());


// ============================================
// NEWSLETTER
// ============================================
function subscribeNewsletter() {
  const input = document.getElementById('nlPhone');
  if (!input) return;
  const phone = input.value.trim();
  if (!phone || phone.length < 10) {
    showToast('⚠️ Please enter a valid WhatsApp number', 'error');
    return;
  }
  const msg = `Hello! I want to subscribe to Kasaudhan Collection updates on WhatsApp. My number is ${phone}.`;
  window.open('https://wa.me/919696824331?text=' + encodeURIComponent(msg), '_blank');
  input.value = '';
  showToast('✅ Subscribed! Check your WhatsApp.', 'success');
}

// ============================================
// SCROLL TO TOP
// ============================================
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// ACTIVE NAV LINK (Scroll Spy)
// ============================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mbnItems = document.querySelectorAll('.mbn-item[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
        // Mobile bottom nav
        mbnItems.forEach(item => {
          item.classList.toggle('active', item.id === 'mbn-' + id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

// ============================================
// TOAST NOTIFICATION
// ============================================
let toastTimer;
function showToast(message, type = '') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = 'toast' + (type ? ' ' + type : '');
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById('header')?.offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// CATEGORY CARD CLICK → FILTER PRODUCTS
// ============================================
function initCategoryCards() {
  document.querySelectorAll('.cat-card[data-category]').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      filterProducts(cat);
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ============================================
// LAZY LOAD ENHANCEMENT
// ============================================
function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) return; // Native support

  const images = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  images.forEach(img => observer.observe(img));
}

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
function initKeyboardSupport() {
  document.addEventListener('keydown', (e) => {
    // ESC closes modals
    if (e.key === 'Escape') {
      if (typeof closeCart === 'function') closeCart();
      if (typeof closeQuickView === 'function') closeQuickView();
      if (typeof closeLightbox === 'function') closeLightbox();
      if (typeof closePopup === 'function') closePopup();
      if (typeof closeMobileMenu === 'function') closeMobileMenu();
    }
  });
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position:absolute;width:${size}px;height:${size}px;
        left:${x}px;top:${y}px;
        background:rgba(255,255,255,0.3);
        border-radius:50%;
        transform:scale(0);
        animation:rippleAnim 0.6s ease-out forwards;
        pointer-events:none;
      `;

      if (!document.querySelector('#rippleStyle')) {
        const style = document.createElement('style');
        style.id = 'rippleStyle';
        style.textContent = '@keyframes rippleAnim{to{transform:scale(2.5);opacity:0}}';
        document.head.appendChild(style);
      }

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initOfferBanner();
  initScrollProgress();
  initHeader();
  initMobileMenu();
  initSearch();
  initReveal();
  initProductFilter();
  initGalleryFilter();
  initScrollSpy();
  initSmoothScroll();
  initCategoryCards();
  initLazyLoad();
  initKeyboardSupport();
  initRipple();
  initCart();
  initArrivalsAutoScroll();
  initGalleryLazyVideo();

  // Init map after Leaflet loads
  if (typeof L !== 'undefined') {
    initMap();
  } else {
    window.addEventListener('load', initMap);
  }

  // Counter starts after loader hides (called in initLoader callback)
  // But also observe on scroll in case user scrolls fast
  window.addEventListener('load', () => {
    initCounterAnimation();
  });
});

// Re-init reveal on dynamic content changes
window.addEventListener('load', () => {
  initReveal();
});

// Category-based navigation helper for Special Offers
window.navigateToCategory = function(category, event) {
  if (event) event.preventDefault();
  
  // 1. Clear search input if present
  const searchInput = document.getElementById('featuredSearchInput');
  if (searchInput) {
    searchInput.value = '';
  }
  
  // 2. Select category chip and trigger filtering
  const targetBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
  if (targetBtn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    targetBtn.classList.add('active');
  }
  
  // 3. Trigger filter update
  filterProducts();
  
  // 4. Smooth scroll to the Featured Products section
  const productsSection = document.getElementById('products');
  if (productsSection) {
    const headerH = document.getElementById('header')?.offsetHeight || 70;
    const top = productsSection.getBoundingClientRect().top + window.scrollY - headerH - 10;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

function initGalleryLazyVideo() {
  const videoCard = document.querySelector('.gallery-item-video-card');
  if (!videoCard) return;
  
  const video = videoCard.querySelector('.gallery-lazy-video');
  const skeleton = videoCard.querySelector('.video-loader-skeleton');
  if (!video) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!video.src && video.dataset.src) {
          video.src = video.dataset.src;
          video.load();
          video.addEventListener('loadeddata', () => {
            video.classList.add('loaded');
            if (skeleton) skeleton.style.display = 'none';
          });
        }
        video.play().catch(err => console.log('Autoplay prevented or not ready:', err));
      } else {
        if (video.src) {
          video.pause();
        }
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(videoCard);
}
