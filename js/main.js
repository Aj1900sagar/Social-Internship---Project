'use strict';

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
      document.body.classList.remove('no-scroll');
    }, 300);
  }

  btn.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
  });
}

// ============================================
// SEARCH BAR
// ============================================
function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const close = document.getElementById('searchClose');
  const bar = document.getElementById('searchBar');
  const input = document.getElementById('searchInput');
  const mobToggle = document.querySelector('.mobile-search-btn');

  function openSearch() {
    bar.hidden = false;
    requestAnimationFrame(() => {
      bar.classList.add('active');
      input?.focus();
    });
  }

  function closeSearch() {
    bar.classList.remove('active');
    setTimeout(() => { bar.hidden = true; }, 300);
  }

  if (toggle) toggle.addEventListener('click', openSearch);
  if (mobToggle) mobToggle.addEventListener('click', () => {
    document.getElementById('mobileClose')?.click();
    setTimeout(openSearch, 300);
  });
  if (close) close.addEventListener('click', closeSearch);
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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  initOfferBanner();
  initHeader();
  initMobileMenu();
  initSearch();
});
