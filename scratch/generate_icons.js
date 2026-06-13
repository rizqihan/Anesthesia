const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgCode = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="512" height="512" rx="120" fill="url(#grad)" />
  <path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" transform="translate(96, 96) scale(13.33)" />
</svg>
`;

const publicDir = path.join(__dirname, '../public');

async function run() {
  console.log('Generating PNG assets from SVG using sharp...');
  
  // Write the SVG file just in case we want to reference it
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgCode);
  console.log('Saved favicon.svg');

  const buffer = Buffer.from(svgCode);

  // Generate favicon.png (32x32)
  await sharp(buffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('Generated favicon.png (32x32)');

  // Generate icon-192.png (192x192)
  await sharp(buffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('Generated icon-192.png (192x192)');

  // Generate icon-512.png (512x512)
  await sharp(buffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('Generated icon-512.png (512x512)');

  console.log('All icons generated successfully!');
}

run().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
