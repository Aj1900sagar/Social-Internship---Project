const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection';
const indexHtmlPath = path.join(rootDir, 'index.html');
const cssDealsPath = path.join(rootDir, 'css', 'deals.css');

// 1. Update index.html
if (fs.existsSync(indexHtmlPath)) {
    let html = fs.readFileSync(indexHtmlPath, 'utf8');
    
    const oldBannerStart = html.indexOf('<!-- ===== LATEST TRENDS BANNER ===== -->');
    const oldBannerEnd = html.indexOf('<!-- ===== NEW ARRIVALS HORIZONTAL ROW ===== -->');
    
    if (oldBannerStart !== -1 && oldBannerEnd !== -1) {
        const oldBannerHtml = html.substring(oldBannerStart, oldBannerEnd);
        
        const newBannerHtml = `<!-- Latest Trends Banner Section -->
  <div class="container trends-banner-container">
    <div class="purple-trends-banner">
      <div class="banner-radial-glow"></div>
      <div class="purple-banner-content">
        <span class="purple-line1">LATEST TRENDS</span>
        <span class="purple-line2">IN DEMAND!</span>
      </div>
      <div class="purple-banner-mascot">
        <img src="images/mascot_king.png" alt="Royal Mascot" />
      </div>
    </div>
  </div>

  `;
        
        html = html.replace(oldBannerHtml, newBannerHtml);
        fs.writeFileSync(indexHtmlPath, html);
        console.log('Replaced banner HTML in index.html');
    }
}

// 2. Update css/deals.css
if (fs.existsSync(cssDealsPath)) {
    let cssContent = fs.readFileSync(cssDealsPath, 'utf8');
    
    const cssStart = cssContent.indexOf('/* =========================================\\n   LATEST TRENDS BANNER\\n   ========================================= */');
    const cssEnd = cssContent.indexOf('/* =========================================\\n   NEW ARRIVALS ROW SECTION\\n   ========================================= */');
    
    if (cssStart !== -1 && cssEnd !== -1) {
        const oldCss = cssContent.substring(cssStart, cssEnd);
        
        const newCss = `/* Latest Trends Banner */
.trends-banner-container {
  margin: 20px auto;
}

.purple-trends-banner {
  width: 100%;
  height: 130px;
  background: linear-gradient(135deg, #4A1D96, #6D28D9, #7C3AED);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.purple-trends-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent);
  transform: skewX(-20deg);
  animation: bannerShimmer 4s infinite;
  z-index: 1;
}

@keyframes bannerShimmer {
  0% { left: -100%; }
  100% { left: 200%; }
}

.banner-radial-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: radial-gradient(circle at 30% center, rgba(255,255,255,1) 0%, transparent 70%);
  opacity: 0.05;
  z-index: 0;
}

.purple-banner-content {
  display: flex;
  flex-direction: column;
  padding-left: 48px;
  z-index: 2;
}

.purple-line1, .purple-line2 {
  color: #FFD700;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 34px;
  line-height: 1.1;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.4);
  letter-spacing: 1px;
}

.purple-banner-mascot {
  height: 100%;
  z-index: 2;
  position: relative;
  right: 40px;
  display: flex;
  align-items: flex-end;
}

.purple-banner-mascot img {
  height: 150px;
  object-fit: contain;
  margin-bottom: -5px;
}

@media (max-width: 768px) {
  .purple-trends-banner {
    height: 100px;
  }
  .purple-banner-content {
    padding-left: 20px;
  }
  .purple-line1, .purple-line2 {
    font-size: 22px;
  }
  .purple-banner-mascot {
    right: 10px;
  }
  .purple-banner-mascot img {
    height: 110px;
  }
}

`;
        
        cssContent = cssContent.replace(oldCss, newCss);
        fs.writeFileSync(cssDealsPath, cssContent);
        console.log('Replaced banner CSS in deals.css');
    } else {
        console.log('Could not find CSS boundaries');
    }
}
