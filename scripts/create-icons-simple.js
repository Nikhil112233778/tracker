const fs = require('fs')
const path = require('path')

// Create a minimal valid PNG (1x1 blue pixel) - browsers will scale it
// This is just a placeholder. For production, use proper icons from realfavicongenerator.net
const bluePNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==',
  'base64'
)

const iconsDir = path.join(__dirname, '../public/icons')

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

// Create placeholder icons
fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), bluePNG)
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), bluePNG)

// Also create a favicon
fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), bluePNG)

console.log('✅ PWA placeholder icons created!')
console.log('📁 Location: public/icons/')
console.log('⚠️  These are 1x1 placeholders. For production, generate proper icons at:')
console.log('   https://realfavicongenerator.net or https://www.pwabuilder.com/imageGenerator')
