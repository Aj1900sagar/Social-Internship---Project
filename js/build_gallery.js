const fs = require('fs');

const indexHtml = fs.readFileSync('C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection\\index.html', 'utf8');

// Extract head (up to </head>)
const headMatch = indexHtml.match(/([\s\S]*?)<\/head>/);
let head = headMatch ? headMatch[1] : '';

// Replace title and add gallery.css
head = head.replace(/<title>.*?<\/title>/, '<title>Gallery – Kasaudhan Collection</title>');
head += '  <link rel="stylesheet" href="css/gallery.css" />\n';

// Extract header (from <body> up to </header>)
const headerMatch = indexHtml.match(/<body>([\s\S]*?)<\/header>/);
let header = headerMatch ? headerMatch[1] : '';

// Update navigation in header
header = header.replace(/href="#home"/g, 'href="index.html#home"');
header = header.replace(/href="#categories"/g, 'href="index.html#categories"');
header = header.replace(/href="#about"/g, 'href="index.html#about"');
header = header.replace(/href="#reviews"/g, 'href="index.html#reviews"');
header = header.replace(/href="#contact"/g, 'href="index.html#contact"');
header = header.replace(/href="#gallery"/g, 'href="gallery.html"');

// Fix active class
header = header.replace(/class="nav-link active"/g, 'class="nav-link"');
header = header.replace(/class="mobile-nav-link active"/g, 'class="mobile-nav-link"');
// Add active class to Gallery
header = header.replace(/<a href="gallery.html" class="nav-link">Gallery<\/a>/, '<a href="gallery.html" class="nav-link active">Gallery</a>');
header = header.replace(/<a href="gallery.html" class="mobile-nav-link">Gallery<\/a>/, '<a href="gallery.html" class="mobile-nav-link active">Gallery</a>');

// Extract footer and below
const footerMatch = indexHtml.match(/(<!-- ===== FOOTER ===== -->[\s\S]*?)<\/body>/);
let footer = footerMatch ? footerMatch[1] : '';

// Update footer navigation
footer = footer.replace(/href="#home"/g, 'href="index.html#home"');
footer = footer.replace(/href="#categories"/g, 'href="index.html#categories"');
footer = footer.replace(/href="#about"/g, 'href="index.html#about"');
footer = footer.replace(/href="#reviews"/g, 'href="index.html#reviews"');
footer = footer.replace(/href="#contact"/g, 'href="index.html#contact"');
footer = footer.replace(/href="#gallery"/g, 'href="gallery.html"');

// Strip out festival popup and quickview if they exist in footer string, wait, let's keep them or just use what we need.
// Replace scripts
footer = footer.replace(/<script src="script\.js"><\/script>/, '<script src="js/main.js"></script>\n  <script src="js/gallery.js"></script>');

const galleryContent = `
  <!-- ===== GALLERY HERO ===== -->
  <section class="gallery-hero">
    <div class="gallery-hero-overlay"></div>
    <div class="gallery-hero-content container">
      <h1 class="page-title">Gallery</h1>
      <p class="page-subtitle">Explore Our Latest Fashion Collection</p>
    </div>
  </section>

  <!-- ===== GALLERY SECTION ===== -->
  <section class="gallery-section container">
    
    <div class="gallery-search-wrap">
      <div class="page-search">
        <svg class="page-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="search" id="gallerySearch" placeholder="Search by category, title or keywords..." autocomplete="off">
      </div>
    </div>

    <div class="category-filters" id="galleryFilters">
      <button class="filter-btn active" data-filter="All">All</button>
      <button class="filter-btn" data-filter="Shop">Shop</button>
      <button class="filter-btn" data-filter="Jeans">Jeans</button>
      <button class="filter-btn" data-filter="Shirts">Shirts</button>
      <button class="filter-btn" data-filter="T-Shirts">T-Shirts</button>
      <button class="filter-btn" data-filter="Lowers">Lowers</button>
      <button class="filter-btn" data-filter="Kids Wear">Kids Wear</button>
      <button class="filter-btn" data-filter="Accessories">Accessories</button>
      <button class="filter-btn" data-filter="Winter Collection">Winter Collection</button>
      <button class="filter-btn" data-filter="New Arrivals">New Arrivals</button>
    </div>

    <!-- MASONRY GRID -->
    <div class="gallery-masonry" id="galleryGrid">
      <!-- Dynamic Items -->
    </div>

    <div class="load-more-wrap">
      <button id="loadMoreBtn" class="btn btn-outline-dark">Load More</button>
    </div>

  </section>

  <!-- ===== SHOP TOUR SECTION ===== -->
  <section class="shop-tour-section container">
    <div class="shop-tour-inner">
      <div class="shop-tour-video">
        <video controls poster="images/gallery/shop/store.webp">
          <source src="videos/gallery/shop-tour.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="shop-tour-info">
        <h2>Visit Our Store</h2>
        <p>Take a virtual tour of our clothing store and explore our latest collections.</p>
        <div class="shop-tour-btns">
          <a href="https://www.google.com/maps/search/Gadakul+Shohratgarh" target="_blank" class="btn btn-primary">Visit Store</a>
          <a href="https://wa.me/919696824331?text=Hello%20Kasaudhan%20Collection,%20I%20saw%20your%20Gallery%20and%20would%20like%20more%20information%20about%20this%20product." target="_blank" class="btn btn-whatsapp">WhatsApp</a>
          <a href="tel:9696824331" class="btn btn-outline-dark">Call Now</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== CUSTOM LIGHTBOX ===== -->
  <div id="galleryLightbox" class="gallery-lightbox" hidden>
    <div class="glb-backdrop" id="glbBackdrop"></div>
    <div class="glb-content">
      <button class="glb-close" id="glbClose" aria-label="Close">✕</button>
      <div class="glb-counter" id="glbCounter">1 / 10</div>
      
      <button class="glb-nav glb-prev" id="glbPrev" aria-label="Previous">‹</button>
      
      <div class="glb-media-container" id="glbMediaContainer">
        <!-- Image or Video injected here -->
      </div>
      
      <button class="glb-nav glb-next" id="glbNext" aria-label="Next">›</button>
      
      <div class="glb-caption" id="glbCaption">Title</div>
    </div>
  </div>
`;

const finalHtml = head + '</head>\n<body>\n' + header + '</header>\n' + galleryContent + '\n' + footer + '</body>\n</html>';

fs.writeFileSync('C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection\\gallery.html', finalHtml);
console.log('gallery.html generated successfully.');
