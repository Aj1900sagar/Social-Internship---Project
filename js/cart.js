'use strict';

let cart = JSON.parse(localStorage.getItem('kc_cart') || '[]');

function saveCart() {
  localStorage.setItem('kc_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const desktopBadge = document.getElementById('cartCount');
  const mobileBadge = document.getElementById('mobileCartCount');
  
  if (desktopBadge) {
    desktopBadge.textContent = count;
    desktopBadge.classList.add('pop');
    setTimeout(() => desktopBadge.classList.remove('pop'), 300);
  }
  if (mobileBadge) {
    mobileBadge.textContent = count;
    mobileBadge.classList.add('pop');
    setTimeout(() => mobileBadge.classList.remove('pop'), 300);
  }
}

function addToCart(product) {
  // Expected product structure: { id, name, price, img, size }
  const existing = cart.find(i => i.id === product.id && i.size === product.size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  
  // Try to use showToast from main.js if available
  if (typeof showToast === 'function') {
    showToast(`Added ${product.name} to cart!`);
  } else {
    alert(`Added ${product.name} to cart!`);
  }
}

function removeFromCart(index) {
  if (index < 0 || index >= cart.length) return;
  
  const cartBody = document.getElementById('cartBody');
  const itemEl = cartBody ? cartBody.children[index] : null;
  
  // Prevent rapid clicks during animation
  if (cartBody) cartBody.style.pointerEvents = 'none';
  
  cart.splice(index, 1);
  saveCart();
  if (typeof updateCartBadge === 'function') updateCartBadge();
  
  // Instant total update
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) {
    let total = 0;
    cart.forEach(item => {
      const priceNum = parseInt((item.price || '0').replace(/[^0-9]/g, ''), 10);
      total += priceNum * (item.qty || 1);
    });
    totalEl.textContent = '₹' + total.toLocaleString('en-IN');
  }

  // Instant empty state handling
  if (cart.length === 0) {
    const cartFooter = document.getElementById('cartFooter');
    if (cartFooter) cartFooter.hidden = true;
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

function updateQuantity(index, delta) {
  if (index < 0 || index >= cart.length) return;
  const item = cart[index];
  if (item) {
    if ((item.qty || 1) + delta <= 0) {
      removeFromCart(index);
    } else {
      item.qty = (item.qty || 1) + delta;
      saveCart();
      if (typeof updateCartBadge === 'function') updateCartBadge();
      renderCartItems();
    }
  }
}

function renderCartItems() {
  const cartBody = document.getElementById('cartBody');
  const cartTotal = document.getElementById('cartTotal');
  const cartFooter = document.getElementById('cartFooter');
  
  if (!cartBody) return; // Not on the cart page or no cart container

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty" style="text-align: center; padding: 60px 20px;">
        <p style="font-size: 3rem; margin-bottom: 10px;">🛒</p>
        <h2>Your cart is empty</h2>
        <p style="color: #666; margin-bottom: 20px;">Add items from the products section!</p>
        <a href="products.html" class="btn btn-primary">Browse Products</a>
      </div>
    `;
    if (cartFooter) cartFooter.hidden = true;
    return;
  }

  let total = 0;
  cartBody.innerHTML = cart.map((item, index) => {
    const priceNum = parseInt((item.price || '0').replace(/[^0-9]/g, ''), 10);
    total += priceNum * (item.qty || 1);
    return `
      <div class="cart-item" style="display: flex; gap: 15px; padding: 15px 0; border-bottom: 1px solid #eee; align-items: center;">
        <img src="${item.img}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />
        <div class="cart-item-info" style="flex: 1;">
          <h4 style="margin: 0 0 5px 0; color: #111;">${item.name}</h4>
          <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">Size: <strong>${item.size || 'N/A'}</strong></div>
          <div style="font-size: 0.9rem; font-weight: 600; color: #D4AF37;">${item.price}</div>
        </div>
        <div class="cart-qty-controls" style="display: flex; align-items: center; gap: 10px;">
          <button onclick="updateQuantity(${index}, -1)" style="width: 30px; height: 30px; border-radius: 4px; border: 1px solid #ddd; background: #fff; cursor: pointer;">-</button>
          <span style="font-weight: 600; min-width: 20px; text-align: center;">${item.qty || 1}</span>
          <button onclick="updateQuantity(${index}, 1)" style="width: 30px; height: 30px; border-radius: 4px; border: 1px solid #ddd; background: #fff; cursor: pointer;">+</button>
        </div>
        <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #999; font-size: 1.2rem; cursor: pointer; padding: 5px;" title="Remove">✕</button>
      </div>
    `;
  }).join('');

  if (cartTotal) {
    cartTotal.textContent = '₹' + total.toLocaleString();
  }
  if (cartFooter) {
    cartFooter.hidden = false;
  }
}

function checkoutViaWhatsApp() {
  if (cart.length === 0) return;

  const btn = document.getElementById('cartWaBtn');
  if (btn) btn.innerHTML = '<span class="spinner" style="display:inline-block; margin-right:8px; animation: spin 1s linear infinite;">↻</span> Fetching Location...';

  // Request location timeout wrapper
  const locationTimeout = setTimeout(() => {
    sendWhatsAppOrder(null);
    if (btn) btn.innerHTML = '💬 WhatsApp Order';
  }, 5000);

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(locationTimeout);
        const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
        sendWhatsAppOrder(loc);
        if (btn) btn.innerHTML = '💬 WhatsApp Order';
      },
      (error) => {
        clearTimeout(locationTimeout);
        console.warn('Geolocation error:', error);
        sendWhatsAppOrder(null);
        if (btn) btn.innerHTML = '💬 WhatsApp Order';
      },
      { enableHighAccuracy: true, timeout: 4500, maximumAge: 0 }
    );
  } else {
    clearTimeout(locationTimeout);
    sendWhatsAppOrder(null);
    if (btn) btn.innerHTML = '💬 WhatsApp Order';
  }
}

function sendWhatsAppOrder(location) {
  let total = 0;
  let text = 'Hello Kasaudhan Collection,\n\nI want to order:\n\n';

  cart.forEach((item, index) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    total += priceNum * item.qty;
    text += `${index + 1}. 🛍 Product: ${item.name}\n`;
    if (item.size) text += `   📏 Size: ${item.size}\n`;
    text += `   💰 Price: ${item.price}\n`;
    text += `   📦 Quantity: ${item.qty}\n\n`;
  });

  text += `💵 *Total Amount: ₹${total.toLocaleString()}*\n\n`;

  if (location) {
    text += `📍 My Current Pickup Location:\nLatitude: ${location.lat}\nLongitude: ${location.lng}\nGoogle Maps: https://www.google.com/maps?q=${location.lat},${location.lng}\n\n`;
  }

  text += 'Please contact me.';

  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/919696824331?text=${encoded}`, '_blank');
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  if (document.getElementById('cartBody')) {
    renderCartItems();
  }
});
