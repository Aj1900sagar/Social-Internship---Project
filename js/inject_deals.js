const fs = require('fs');
const path = require('path');

const file = path.join('C:', 'Users', 'vinay', 'OneDrive', 'Desktop', 'Social Internship', 'kasaudhan-collection', 'index.html');
let html = fs.readFileSync(file, 'utf8');

// 1. Inject deals.css link
if (!html.includes('css/deals.css')) {
  html = html.replace('</head>', '  <link rel="stylesheet" href="css/deals.css">\n</head>');
}

// 2. The Deals Section HTML
const dealsSection = `
  <!-- ===== TOP 50 DEALS SECTION ===== -->
  <section class="deals-section">
    <div class="deals-container">
      <h3 class="deals-header">Fabulous Fifty Deals</h3>
      
      <div class="deals-row-wrapper">
        <div class="deals-row" id="dealsRow">
          <!-- Banner -->
          <div class="deal-card deal-banner">
            <span class="top-text">TOP 50</span>
            <span class="bottom-text">DEALS</span>
          </div>
          
          <!-- Card 2 -->
          <a href="products.html?category=shirts" style="text-decoration:none;">
            <div class="deal-card deal-product">
              <img src="assets/images/shirts.jpg" alt="Shirts" class="deal-product-img" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'">
              <div class="deal-product-info">
                <span class="deal-product-name">Shirts</span>
                <span class="deal-product-price">Under ₹279</span>
              </div>
            </div>
          </a>
          
          <!-- Card 3 -->
          <a href="products.html?category=jeans" style="text-decoration:none;">
            <div class="deal-card deal-product">
              <img src="assets/images/jeans.jpg" alt="Jeans" class="deal-product-img" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'">
              <div class="deal-product-info">
                <span class="deal-product-name">Jeans</span>
                <span class="deal-product-price">Under ₹479</span>
              </div>
            </div>
          </a>
          
          <!-- Card 4 -->
          <a href="products.html?category=kids-wear" style="text-decoration:none;">
            <div class="deal-card deal-product">
              <img src="assets/images/kids.jpg" alt="Kids Wear" class="deal-product-img" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'">
              <div class="deal-product-info">
                <span class="deal-product-name">Kids Wear</span>
                <span class="deal-product-price">Under ₹199</span>
              </div>
            </div>
          </a>
          
          <!-- Card 5 -->
          <a href="products.html?category=footwear" style="text-decoration:none;">
            <div class="deal-card deal-product">
              <img src="images/gallery/shop/shop05.webp" alt="Footwear" class="deal-product-img" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'">
              <div class="deal-product-info">
                <span class="deal-product-name">Footwear</span>
                <span class="deal-product-price">Under ₹299</span>
              </div>
            </div>
          </a>
          
          <!-- Card 6 -->
          <a href="products.html?category=accessories" style="text-decoration:none;">
            <div class="deal-card deal-product">
              <img src="assets/images/accessories.jpg" alt="Accessories" class="deal-product-img" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'">
              <div class="deal-product-info">
                <span class="deal-product-name">Accessories</span>
                <span class="deal-product-price">Under ₹199</span>
              </div>
            </div>
          </a>
          
          <!-- Card 7 -->
          <a href="products.html?category=tshirts" style="text-decoration:none;">
            <div class="deal-card deal-product">
              <img src="assets/images/tshirts.jpg" alt="T-Shirts" class="deal-product-img" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'">
              <div class="deal-product-info">
                <span class="deal-product-name">T-Shirts</span>
                <span class="deal-product-price">Under ₹249</span>
              </div>
            </div>
          </a>
          
          <!-- Card 8 -->
          <a href="products.html?category=winter" style="text-decoration:none;">
            <div class="deal-card deal-product">
              <img src="assets/images/winter.jpg" alt="Winter Wear" class="deal-product-img" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'">
              <div class="deal-product-info">
                <span class="deal-product-name">Winter Wear</span>
                <span class="deal-product-price">Under ₹399</span>
              </div>
            </div>
          </a>
          
          <!-- Card 9 -->
          <a href="products.html?category=lowers" style="text-decoration:none;">
            <div class="deal-card deal-product">
              <img src="assets/images/lowers.jpg" alt="Lowers" class="deal-product-img" loading="lazy" onerror="this.src='images/gallery/shop/store.webp'">
              <div class="deal-product-info">
                <span class="deal-product-name">Lowers</span>
                <span class="deal-product-price">Under ₹299</span>
              </div>
            </div>
          </a>
          
        </div>
        
        <button class="deals-arrow-btn" id="dealsArrowBtn" aria-label="Scroll Deals">&gt;</button>
      </div>
    </div>
  </section>
`;

// Inject below gallery section. The gallery section ends at line 856 with </section>
// and is followed by <!-- ===== SHOP TOUR SECTION ===== -->
if (!html.includes('deals-section')) {
  html = html.replace(
    '<!-- ===== SHOP TOUR SECTION ===== -->',
    dealsSection + '\n  <!-- ===== SHOP TOUR SECTION ===== -->'
  );
}

// 3. The JS script tag
const jsScript = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const dealsArrow = document.getElementById('dealsArrowBtn');
      const dealsRow = document.getElementById('dealsRow');
      if(dealsArrow && dealsRow) {
        dealsArrow.addEventListener('click', () => {
          dealsRow.scrollBy({ left: 300, behavior: 'smooth' });
        });
      }
    });
  </script>
</body>`;

if (!html.includes('dealsArrowBtn')) {
  html = html.replace('</body>', jsScript);
}

fs.writeFileSync(file, html);
console.log('Top 50 Deals section injected into index.html');
