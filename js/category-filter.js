const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

if (category && window.location.pathname.includes('products.html')) {
  
  // Find and click the matching filter button
  const filterButtons = document.querySelectorAll('.filter-btn, .category-btn, [data-filter]');
  
  // Use a small timeout to ensure products.js has initialized
  setTimeout(() => {
    filterButtons.forEach(btn => {
      const btnCategory = btn.getAttribute('data-filter') || btn.textContent.toLowerCase().trim().replace(/\s+/g, '-');
      
      if (btnCategory === category || btnCategory.includes(category.replace('-', ''))) {
        btn.click();
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    
    // Also scroll to products section
    const productsSection = document.querySelector('.products-grid, .products-section, #products, .product-container');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100); // slight delay allows DOM and main scripts to settle
}
