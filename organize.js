const fs = require('fs');
const path = require('path');

console.log('Organizing folders into pure frontend & backend structure...');

// 1. Move public assets into backend/public
if (fs.existsSync('public')) {
    try {
        if (!fs.existsSync('backend/public')) {
            fs.mkdirSync('backend/public', { recursive: true });
        }
        fs.cpSync('public', 'backend/public', { recursive: true });
        fs.rmSync('public', { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
        console.log('✓ Successfully moved public/ into backend/public/');
    } catch (err) {
        console.log('Notice on public/:', err.message);
    }
}

// 2. Remove obsolete legacy directories and root files
const legacyItems = ['view', 'controller', 'model', 'api', 'vercel.json', 'app.js'];
legacyItems.forEach(item => {
    if (fs.existsSync(item)) {
        try {
            fs.rmSync(item, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
            console.log(`✓ Removed obsolete item: ${item}`);
        } catch (err) {
            console.log(`Notice on ${item}:`, err.message);
        }
    }
});

console.log('\n======================================================');
console.log('🚀 CLEANUP COMPLETE!');
console.log('Your workspace now only contains:');
console.log('  ├── frontend/   (Next.js App Router)');
console.log('  └── backend/    (Express.js REST API)');
console.log('======================================================\n');

// Clean up this script itself
try {
    fs.rmSync(__filename, { force: true });
} catch (e) {}
