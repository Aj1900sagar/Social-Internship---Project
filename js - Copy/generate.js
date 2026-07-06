const fs = require('fs');

const categories = ['jeans', 'shirts', 'tshirts', 'lowers', 'kids', 'accessories', 'winter'];

const brands = ['Levi\'s', 'Wrangler', 'Allen Solly', 'Peter England', 'Flying Machine', 'U.S. Polo Assn.', 'Tommy Hilfiger', 'Calvin Klein', 'Puma', 'Adidas'];
const badges = ['New', 'Best Seller', 'Trending', 'Limited Edition', 'Sale'];

const nameTemplates = {
  jeans: ['Slim Fit Blue Denim', 'Regular Fit Black Jeans', 'Distressed Stretch Denim', 'Classic Straight Jeans', 'Washed Blue Denim', 'Ripped Skinny Jeans', 'Bootcut Indigo Jeans'],
  shirts: ['Casual Cotton Shirt', 'Formal Checked Shirt', 'Slim Fit Linen Shirt', 'Solid White Office Shirt', 'Printed Party Wear Shirt', 'Half Sleeve Casual Shirt', 'Striped Formal Shirt'],
  tshirts: ['Graphic Print T-Shirt', 'Solid V-Neck Tee', 'Polo Collar T-Shirt', 'Oversized Streetwear Tee', 'Classic Crew Neck T-Shirt', 'Striped Casual T-Shirt', 'Sports Activewear Tee'],
  lowers: ['Cotton Track Pants', 'Gym Workout Joggers', 'Casual Cargo Pants', 'Slim Fit Sweatpants', 'Comfort Lounge Pants', 'Running Track Bottoms', 'Fleece Winter Lowers'],
  kids: ['Cartoon Print Hoodie', 'Boys Denim Jeans', 'Girls Floral Dress', 'Kids Cotton Pajama Set', 'Superhero T-Shirt', 'Winter Wear Jacket for Kids', 'Festive Ethnic Wear'],
  accessories: ['Genuine Leather Belt', 'Casual Canvas Belt', 'Formal Reversible Belt', 'Men\'s Wallet & Belt Set', 'Comfortable Slippers', 'Flip Flops', 'Sports Sandals'],
  winter: ['Fleece Winter Jacket', 'Woolen Sweater', 'Windcheater Hooded Jacket', 'Thermal Innerwear Set', 'Knitted Pullover', 'Quilted Bomber Jacket', 'Puffer Winter Coat']
};

const sizes = {
  jeans: ['28', '30', '32', '34', '36', '38'],
  shirts: ['S', 'M', 'L', 'XL', 'XXL'],
  tshirts: ['S', 'M', 'L', 'XL', 'XXL'],
  lowers: ['S', 'M', 'L', 'XL', 'XXL'],
  kids: ['2Y', '4Y', '6Y', '8Y', '10Y', '12Y'],
  accessories: ['One Size', '28', '30', '32', '34', '36'],
  winter: ['S', 'M', 'L', 'XL', 'XXL']
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const originalProducts = [
  { id: '1', name: 'Premium Denim Jeans', cat: 'jeans', price: '₹799', oldPrice: '₹1299', discount: '38%', img: 'assets/images/jeans.jpg', sizes: ['28','30','32','34','36','38'], rating: 4.8, stock: true, desc: 'Slim fit cotton denim – durable, stylish, and comfortable. Perfect for both casual outings and everyday wear. Made with premium stretch fabric for maximum comfort.' },
  { id: '2', name: 'Casual Cotton Shirt', cat: 'shirts', price: '₹549', oldPrice: '₹899', discount: '39%', img: 'assets/images/shirts.jpg', sizes: ['S','M','L','XL','XXL'], rating: 4.6, stock: true, desc: 'Premium cotton casual shirts for daily wear and outings. Features a classic collar, button-down front, and breathable fabric ideal for summer.' },
  { id: '3', name: 'Graphic Print T-Shirt', cat: 'tshirts', price: '₹349', oldPrice: '₹599', discount: '42%', img: 'assets/images/tshirts.jpg', sizes: ['S','M','L','XL','XXL'], rating: 4.7, stock: true, desc: 'Trendy graphic and solid color T-shirts for casual everyday style. Soft cotton blend ensures all-day comfort.' },
  { id: '4', name: 'Kids Fashion Set', cat: 'kids', price: '₹299', oldPrice: '₹499', discount: '40%', img: 'assets/images/kids.jpg', sizes: ['2Y','4Y','6Y','8Y','10Y'], rating: 4.9, stock: true, desc: 'Colorful & comfortable clothing sets for kids. Includes a matching top and bottom made from skin-friendly fabrics.' },
  { id: '5', name: 'Casual Track Lower', cat: 'lowers', price: '₹449', oldPrice: '₹699', discount: '36%', img: 'assets/images/lowers.jpg', sizes: ['S','M','L','XL','XXL'], rating: 4.5, stock: true, desc: 'Comfortable cotton track pants and joggers. Great for sports, gym, or just relaxing at home. Features elastic waistband and side pockets.' },
  { id: '6', name: 'Premium Leather Belt', cat: 'accessories', price: '₹249', oldPrice: '₹399', discount: '38%', img: 'assets/images/accessories.jpg', sizes: ['28','30','32','34','36'], rating: 4.4, stock: true, desc: 'Genuine leather belts to complete your formal or casual look. Durable buckle and premium stitching.' },
  { id: '7', name: 'Premium Winter Jacket', cat: 'winter', price: '₹999', oldPrice: '₹1599', discount: '37%', img: 'assets/images/winter.jpg', sizes: ['S','M','L','XL','XXL'], rating: 4.8, stock: true, desc: 'Warm and stylish jackets for winter. Keeps you insulated from the cold while maintaining a sharp fashion sense.' },
  { id: '8', name: 'Premium Formal Shirt', cat: 'shirts', price: '₹649', oldPrice: '₹999', discount: '35%', img: 'assets/images/shirts.jpg', sizes: ['S','M','L','XL'], rating: 4.7, stock: true, desc: 'Classic formal shirts for office and special occasions. Wrinkle-resistant and perfectly tailored.' }
];

const allProducts = [...originalProducts];
let idCounter = 9;

for (const cat of categories) {
  const catNames = nameTemplates[cat];
  const catSizes = sizes[cat];
  
  for (let i = 1; i <= 50; i++) {
    const priceInt = getRandomInt(299, 3999);
    const oldPriceInt = Math.floor(priceInt * (1 + (getRandomInt(20, 60) / 100)));
    const discount = Math.round(((oldPriceInt - priceInt) / oldPriceInt) * 100);
    const rating = (getRandomInt(40, 50) / 10).toFixed(1);
    
    const baseName = getRandomItem(catNames);
    const name = `${baseName} V${i}`; // Ensure uniqueness
    
    const product = {
      id: idCounter.toString(),
      name: name,
      cat: cat,
      price: `₹${priceInt}`,
      oldPrice: `₹${oldPriceInt}`,
      discount: `${discount}%`,
      img: `images/products/${cat}/${cat}-${String(i).padStart(2, '0')}.jpg`,
      sizes: catSizes,
      rating: parseFloat(rating),
      reviews: getRandomInt(10, 500),
      brand: getRandomItem(brands),
      stock: true,
      badge: getRandomItem(badges),
      desc: `Premium quality ${name.toLowerCase()} suitable for all occasions. Made with high quality materials for lasting comfort.`
    };
    
    allProducts.push(product);
    idCounter++;
  }
}

const filePath = 'C:/Users/vinay/OneDrive/Desktop/Social Internship/kasaudhan-collection/js/products.js';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const productData = \[[\s\S]*?\];/;
const replacement = `const productData = ${JSON.stringify(allProducts, null, 2)};`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content);
  console.log('Successfully updated productData with ' + allProducts.length + ' products.');
} else {
  console.error('Could not find productData block to replace.');
}
