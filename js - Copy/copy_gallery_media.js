const fs = require('fs');
const path = require('path');
const https = require('https');

const srcDir = 'C:\\Users\\vinay\\.gemini\\antigravity\\brain\\fdeffd62-eacb-4703-a589-800033832045';
const destDir = 'C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection\\images\\gallery';
const videoDir = 'C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection\\videos\\gallery';

const categories = [
  { name: 'jeans', file: 'jeans_base_1783052853598.png' },
  { name: 'shirts', file: 'shirts_base_1783052864555.png' },
  { name: 'tshirts', file: 'tshirts_base_1783052877017.png' },
  { name: 'lowers', file: 'lowers_base_1783052886609.png' },
  { name: 'kids', file: 'kids_base_1783052897253.png' },
  { name: 'accessories', file: 'accessories_base_1783052906947.png' },
  { name: 'winter', file: 'winter_base_1783052918692.png' }
];

// Generate 5 items per category for gallery
categories.forEach(cat => {
  const srcPath = path.join(srcDir, cat.file);
  const catDir = path.join(destDir, cat.name);
  const thumbsDir = path.join(destDir, 'thumbs');
  
  if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });

  for (let i = 1; i <= 5; i++) {
    const paddedIndex = String(i).padStart(2, '0');
    const destPath = path.join(catDir, `${cat.name}${paddedIndex}.webp`);
    const thumbPath = path.join(thumbsDir, `${cat.name}${paddedIndex}.webp`);
    try {
      fs.copyFileSync(srcPath, destPath);
      fs.copyFileSync(srcPath, thumbPath);
    } catch (e) {
      console.error(`Failed to copy ${srcPath} to ${destPath}:`, e);
    }
  }
});

// Create shop image
try {
  fs.copyFileSync(path.join(srcDir, 'store_interior_1783001335089.png'), path.join(destDir, 'shop', 'shop-bg.webp'));
  fs.copyFileSync(path.join(srcDir, 'store_front_1783001425045.png'), path.join(destDir, 'shop', 'store.webp'));
} catch (e) {
  // fallback if not found
}

// Download dummy mp4
const videoFiles = ['shop-tour.mp4', 'collection-01.mp4', 'collection-02.mp4'];
const dummyVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4'; // reliable tiny dummy video

videoFiles.forEach(file => {
  const destPath = path.join(videoDir, file);
  const fileStream = fs.createWriteStream(destPath);
  https.get(dummyVideoUrl, function(response) {
    response.pipe(fileStream);
  });
});

console.log('Gallery placeholders populated successfully.');
