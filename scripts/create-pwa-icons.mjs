import fs from 'fs'
import { createCanvas } from 'canvas'

async function generateIcon(size, filename) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = '#2563EB' // Blue accent color
  ctx.fillRect(0, 0, size, size)

  // Add rounded corners effect
  ctx.globalCompositeOperation = 'destination-in'
  ctx.beginPath()
  ctx.roundRect(0, 0, size, size, size * 0.125)
  ctx.fill()

  // Reset composition
  ctx.globalCompositeOperation = 'source-over'

  // Add emoji/icon
  ctx.font = `bold ${size * 0.55}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText('📋', size / 2, size / 2)

  // Save
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync(`public/icons/${filename}`, buffer)
  console.log(`✅ Created ${filename} (${size}x${size})`)
}

try {
  await generateIcon(192, 'icon-192.png')
  await generateIcon(512, 'icon-512.png')
  console.log('\n✅ All PWA icons generated successfully!')
} catch (error) {
  console.error('❌ Error generating icons:', error.message)
  console.log('\n📝 Creating placeholder icons instead...')

  // Create minimal placeholder PNGs if canvas fails
  const createPlaceholder = (size, filename) => {
    // Minimal 1x1 blue PNG (base64)
    const minimalPNG = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEBgIApD5fRAAAAABJRU5ErkJggg==',
      'base64'
    )
    fs.writeFileSync(`public/icons/${filename}`, minimalPNG)
    console.log(`📝 Created placeholder ${filename}`)
  }

  createPlaceholder(192, 'icon-192.png')
  createPlaceholder(512, 'icon-512.png')
  console.log('\n⚠️  Using placeholder icons. For production, use https://realfavicongenerator.net')
}
