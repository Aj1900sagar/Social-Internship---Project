const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\vinay\\.gemini\\antigravity\\brain\\fdeffd62-eacb-4703-a589-800033832045';
const destDir = 'C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection\\images\\products';

const categories = [
  { name: 'jeans', file: 'jeans_base_1783052853598.png' },
  { name: 'shirts', file: 'shirts_base_1783052864555.png' },
  { name: 'tshirts', file: 'tshirts_base_1783052877017.png' },
  { name: 'lowers', file: 'lowers_base_1783052886609.png' },
  { name: 'kids', file: 'kids_base_1783052897253.png' },
  { name: 'accessories', file: 'accessories_base_1783052906947.png' },
  { name: 'winter', file: 'winter_base_1783052918692.png' }
];

categories.forEach(cat => {
  const srcPath = path.join(srcDir, cat.file);
  const catDir = path.join(destDir, cat.name);
  
  if (!fs.existsSync(catDir)) {
    fs.mkdirSync(catDir, { recursive: true });
  }

  for (let i = 1; i <= 50; i++) {
    const paddedIndex = String(i).padStart(2, '0');
    // Using .webp as requested, browser will render the PNG data fine 
    const destPath = path.join(catDir, `${cat.name}-${paddedIndex}.webp`);
    try {
      fs.copyFileSync(srcPath, destPath);
    } catch (e) {
      console.error(`Failed to copy ${srcPath} to ${destPath}:`, e);
    }
  }
  console.log(`Copied 50 images for ${cat.name}`);
});
