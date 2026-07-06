const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const faviconTags = `
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <meta name="theme-color" content="#111111">
`;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Remove existing favicon tags
  html = html.replace(/<link[^>]*rel=["'](shortcut icon|icon|apple-touch-icon)["'][^>]*>\n?/gi, '');
  html = html.replace(/<meta[^>]*name=["']theme-color["'][^>]*>\n?/gi, '');

  // Insert the new tags right before </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', faviconTags + '</head>');
    fs.writeFileSync(filePath, html);
    console.log('Updated', file);
  } else {
    console.log('No </head> found in', file);
  }
});
