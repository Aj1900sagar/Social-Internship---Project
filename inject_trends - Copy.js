const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection';
const indexHtmlPath = path.join(rootDir, 'index.html');
const cssDealsPath = path.join(rootDir, 'css', 'deals.css');

// 1. Appending CSS
const cssToAppend = `
/* =========================================
   LATEST TRENDS BANNER
   ========================================= */
.trends-banner {
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #5B2D8E, #7B2FF7, #9B4FD4);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: relative;
  overflow: hidden;
  transition: filter 0.3s ease;
}

.trends-banner:hover {
  filter: brightness(1.1);
}

.trends-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
  transform: skewX(-20deg);
  animation: shimmerBanner 3s infinite;
}

@keyframes shimmerBanner {
  0% { left: -100%; }
  100% { left: 200%; }
}

.trends-banner-content {
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.trends-line1, .trends-line2 {
  color: #FFD700;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 32px;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.trends-banner-decor {
  position: relative;
  width: 150px;
  height: 100%;
  z-index: 2;
}

.decor-cube {
  position: absolute;
  width: 30px;
  height: 30px;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  animation: floatCube 4s ease-in-out infinite;
  backdrop-filter: blur(4px);
}

.cube1 { top: 20px; right: 80px; animation-delay: 0s; transform: rotate(15deg); }
.cube2 { top: 60px; right: 30px; animation-delay: 1s; transform: rotate(-10deg); }
.cube3 { top: 30px; right: -10px; animation-delay: 2s; transform: rotate(25deg); }

@keyframes floatCube {
  0%, 100% { transform: translateY(0) rotate(10deg); }
  50% { transform: translateY(-10px) rotate(-10deg); }
}

/* =========================================
   NEW ARRIVALS ROW SECTION
   ========================================= */

.just-in-badge {
  background: #FFD700;
  color: #000;
  border-radius: 20px;
  padding: 4px 16px;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
}

.new-arrivals-row {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 10px 5px 30px 5px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.new-arrivals-row::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.arrival-card-horizontal {
  flex: 0 0 auto;
  width: 180px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  border: 1px solid #f0f0f0;
  overflow: hidden;
  scroll-snap-align: start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.arrival-card-horizontal:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

.arrival-card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: #f8f8f8;
}

.arrival-card-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.arrival-card-name {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.arrival-card-price {
  font-size: 12px;
  color: #C9A84C;
  font-weight: 500;
  margin-bottom: auto;
}

.order-btn {
  background: #C9A84C;
  color: #fff;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 8px;
  transition: background 0.3s ease;
}

.order-btn:hover {
  background: #B8973B;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .trends-banner {
    height: 90px;
    padding: 0 20px;
  }
  .trends-line1, .trends-line2 {
    font-size: 22px;
  }
  .decor-cube {
    width: 25px;
    height: 25px;
    font-size: 12px;
  }
  
  .arrival-card-horizontal {
    width: 150px;
  }
  .arrival-card-img {
    height: 150px;
  }
}
`;

if (fs.existsSync(cssDealsPath)) {
    let cssContent = fs.readFileSync(cssDealsPath, 'utf8');
    if (!cssContent.includes('.trends-banner')) {
        fs.appendFileSync(cssDealsPath, '\\n' + cssToAppend);
        console.log('Appended CSS to css/deals.css');
    }
}

// 2. Injecting HTML
const htmlToInject = `
  <!-- ===== LATEST TRENDS BANNER ===== -->
  <section class="section trends-banner-section" style="padding-top:20px; padding-bottom:20px;">
    <div class="container">
      <div class="trends-banner">
        <div class="trends-banner-content">
          <span class="trends-line1">LATEST TRENDS</span>
          <span class="trends-line2">IN DEMAND!</span>
        </div>
        <div class="trends-banner-decor">
          <div class="decor-cube cube1">%</div>
          <div class="decor-cube cube2">%</div>
          <div class="decor-cube cube3">%</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== NEW ARRIVALS HORIZONTAL ROW ===== -->
  <section class="section new-arrivals-row-section" style="padding-top:10px;">
    <div class="container">
      <div class="section-header" style="margin-bottom: 25px;">
        <span class="just-in-badge">JUST IN</span>
        <h2 class="section-title" style="margin-top: 15px;">New <span class="gold">Arrivals</span></h2>
        <p class="section-desc">Fresh styles added every week - be the first to grab the latest fashion</p>
      </div>
      
      <div class="new-arrivals-row">
        <!-- Card 1 -->
        <a href="pages/products.html?category=shirts" style="text-decoration:none; color:inherit;">
          <div class="arrival-card-horizontal">
            <img src="images/gallery/shirts/shirts01.webp" alt="Casual Shirts" class="arrival-card-img" onerror="this.src='assets/images/shirts.jpg'">
            <div class="arrival-card-info">
              <h4 class="arrival-card-name">Casual Shirts</h4>
              <p class="arrival-card-price">Starting ₹549</p>
              <button class="order-btn">Order Now</button>
            </div>
          </div>
        </a>
        
        <!-- Card 2 -->
        <a href="pages/products.html?category=kids-wear" style="text-decoration:none; color:inherit;">
          <div class="arrival-card-horizontal">
            <img src="images/gallery/kids/kids01.webp" alt="Printed Kids Wear" class="arrival-card-img" onerror="this.src='assets/images/kids.jpg'">
            <div class="arrival-card-info">
              <h4 class="arrival-card-name">Printed Kids Wear</h4>
              <p class="arrival-card-price">Starting ₹299</p>
              <button class="order-btn">Order Now</button>
            </div>
          </div>
        </a>
        
        <!-- Card 3 -->
        <a href="pages/products.html?category=lowers" style="text-decoration:none; color:inherit;">
          <div class="arrival-card-horizontal">
            <img src="images/gallery/lowers/lowers01.webp" alt="Stylish Lowers" class="arrival-card-img" onerror="this.src='assets/images/lowers.jpg'">
            <div class="arrival-card-info">
              <h4 class="arrival-card-name">Stylish Lowers</h4>
              <p class="arrival-card-price">Starting ₹449</p>
              <button class="order-btn">Order Now</button>
            </div>
          </div>
        </a>
        
        <!-- Card 4 -->
        <a href="pages/products.html?category=jeans" style="text-decoration:none; color:inherit;">
          <div class="arrival-card-horizontal">
            <img src="images/gallery/jeans/jeans01.webp" alt="Premium Denim" class="arrival-card-img" onerror="this.src='assets/images/jeans.jpg'">
            <div class="arrival-card-info">
              <h4 class="arrival-card-name">Premium Denim</h4>
              <p class="arrival-card-price">Starting ₹799</p>
              <button class="order-btn">Order Now</button>
            </div>
          </div>
        </a>
        
        <!-- Card 5 -->
        <a href="pages/products.html?category=accessories" style="text-decoration:none; color:inherit;">
          <div class="arrival-card-horizontal">
            <img src="images/gallery/accessories/accessories01.webp" alt="Fashion Accessories" class="arrival-card-img" onerror="this.src='assets/images/accessories.jpg'">
            <div class="arrival-card-info">
              <h4 class="arrival-card-name">Fashion Accessories</h4>
              <p class="arrival-card-price">Starting ₹249</p>
              <button class="order-btn">Order Now</button>
            </div>
          </div>
        </a>
        
        <!-- Card 6 -->
        <a href="pages/products.html?category=tshirts" style="text-decoration:none; color:inherit;">
          <div class="arrival-card-horizontal">
            <img src="images/gallery/tshirts/tshirts01.webp" alt="Trendy T-Shirts" class="arrival-card-img" onerror="this.src='assets/images/tshirts.jpg'">
            <div class="arrival-card-info">
              <h4 class="arrival-card-name">Trendy T-Shirts</h4>
              <p class="arrival-card-price">Starting ₹349</p>
              <button class="order-btn">Order Now</button>
            </div>
          </div>
        </a>
        
        <!-- Card 7 -->
        <a href="pages/products.html?category=winter" style="text-decoration:none; color:inherit;">
          <div class="arrival-card-horizontal">
            <img src="images/gallery/winter/winter01.webp" alt="Winter Collection" class="arrival-card-img" onerror="this.src='assets/images/winter.jpg'">
            <div class="arrival-card-info">
              <h4 class="arrival-card-name">Winter Collection</h4>
              <p class="arrival-card-price">Starting ₹599</p>
              <button class="order-btn">Order Now</button>
            </div>
          </div>
        </a>

      </div>
    </div>
  </section>
`;

if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    
    // Inject right after the closing tag of new-arrivals-section (line 739 approx)
    if (!indexHtml.includes('trends-banner-section')) {
        indexHtml = indexHtml.replace(
            '</section>\\n\\n  <!-- ===== GALLERY ===== -->', 
            '</section>\\n' + htmlToInject + '\\n  <!-- ===== GALLERY ===== -->'
        );
        fs.writeFileSync(indexHtmlPath, indexHtml);
        console.log('Injected HTML sections into index.html');
    }
}
