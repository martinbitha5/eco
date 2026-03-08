const fs = require('fs');
const path = require('path');

// Minimal 1x1 PNG (valid PNG format)
const minimalPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

['icon.png', 'splash.png', 'adaptive-icon.png'].forEach((file) => {
  fs.writeFileSync(path.join(assetsDir, file), minimalPng);
  console.log('Created', file);
});
