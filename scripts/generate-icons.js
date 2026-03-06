// Simple icon generator for PWA
const fs = require('fs')
const path = require('path')

// Create a simple SVG icon
const createSVGIcon = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#2563EB" rx="24"/>
  <text x="50%" y="50%" font-size="${size * 0.5}" fill="white" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle" dy=".35em">📋</text>
</svg>
`

const iconsDir = path.join(__dirname, '../public/icons')

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

// Create SVG icons (browsers will handle these fine)
fs.writeFileSync(path.join(iconsDir, 'icon-192.svg'), createSVGIcon(192))
fs.writeFileSync(path.join(iconsDir, 'icon-512.svg'), createSVGIcon(512))

console.log('✅ PWA icons generated successfully!')
console.log('📁 Location: public/icons/')
console.log('Note: Using SVG format. For production, consider using PNG via online tools like realfavicongenerator.net')
