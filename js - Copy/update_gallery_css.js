const fs = require('fs');
const path = require('path');

const cssPath = path.join('C:', 'Users', 'vinay', 'OneDrive', 'Desktop', 'Social Internship', 'kasaudhan-collection', 'css', 'gallery.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace masonry with static grid
css = css.replace(
  /\.gallery-masonry\s*{\s*column-count:\s*4;\s*column-gap:\s*24px;\s*margin-bottom:\s*40px;\s*}/,
  `.gallery-grid-static {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 60px;
}`
);

// Update responsive rules for grid
css = css.replace(
  /\.gallery-masonry\s*{\s*column-count:\s*3;\s*}/g,
  `.gallery-grid-static { grid-template-columns: repeat(3, 1fr); }`
);
css = css.replace(
  /\.gallery-masonry\s*{\s*column-count:\s*2;\s*}/g,
  `.gallery-grid-static { grid-template-columns: repeat(2, 1fr); }`
);
css = css.replace(
  /\.gallery-masonry\s*{\s*column-count:\s*1;\s*}/g,
  `.gallery-grid-static { grid-template-columns: repeat(1, 1fr); }`
);

// Append Video Carousel Styles
const carouselCss = `
/* ----- VIDEO CAROUSEL (INSTAGRAM STYLE) ----- */
.video-carousel-wrapper {
  overflow: hidden;
  padding: 20px 0;
  margin-bottom: 60px;
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
.video-carousel-track {
  display: flex;
  gap: 30px;
  width: max-content;
  animation: scrollCarousel 20s linear infinite;
  padding: 0 20px;
}
.video-carousel-track:hover {
  animation-play-state: paused;
}
@keyframes scrollCarousel {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-33.333% - 10px)); } /* Scrolls 1 set of 3 out of 3 sets */
}
.circle-video-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.circle-video-item video {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary);
  padding: 3px;
  transition: transform 0.3s ease;
  background: var(--white);
}
.circle-video-item:hover video {
  transform: scale(1.05);
}
.video-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--black);
  text-align: center;
}

@media (max-width: 768px) {
  .circle-video-item video {
    width: 90px;
    height: 90px;
  }
}
`;

css += carouselCss;

fs.writeFileSync(cssPath, css);
console.log('gallery.css updated.');
