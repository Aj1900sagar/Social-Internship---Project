const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\vinay\\OneDrive\\Desktop\\Social Internship\\kasaudhan-collection';
const indexHtmlPath = path.join(rootDir, 'index.html');

if (fs.existsSync(indexHtmlPath)) {
    let html = fs.readFileSync(indexHtmlPath, 'utf8');
    
    // The injected code starts with <!-- ===== LATEST TRENDS BANNER ===== -->
    // and ends right before <!-- ===== GALLERY ===== -->
    
    const blockStart = html.indexOf('<!-- ===== LATEST TRENDS BANNER ===== -->');
    const blockEnd = html.indexOf('<!-- ===== GALLERY ===== -->');
    
    if (blockStart !== -1 && blockEnd !== -1) {
        const injectedBlock = html.substring(blockStart, blockEnd);
        
        // Remove it from its current position
        html = html.replace(injectedBlock, '');
        
        // Inject it right before <!-- ===== WHY CHOOSE US ===== -->
        html = html.replace(
            '<!-- ===== WHY CHOOSE US ===== -->',
            injectedBlock + '<!-- ===== WHY CHOOSE US ===== -->'
        );
        
        fs.writeFileSync(indexHtmlPath, html);
        console.log('Corrected placement in index.html');
    } else {
        console.log('Could not find injection boundaries.');
    }
}
