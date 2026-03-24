import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPng = path.join(__dirname, '../public/favicon.png');
const appDir = path.join(__dirname, '../src/app');
const publicDir = path.join(__dirname, '../public');

async function generate() {
  // Generate icon.png (512x512) for app dir - Next.js uses this as the app icon
  await sharp(srcPng)
    .resize(512, 512)
    .png()
    .toFile(path.join(appDir, 'icon.png'));
  console.log('✓ Generated src/app/icon.png (512x512)');

  // Generate apple-touch-icon.png (180x180)
  await sharp(srcPng)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated public/apple-touch-icon.png (180x180)');

  // Generate favicon-32x32.png
  await sharp(srcPng)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Generated public/favicon-32x32.png (32x32)');

  // Generate favicon-16x16.png
  await sharp(srcPng)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('✓ Generated public/favicon-16x16.png (16x16)');

  // Create a simple ICO-like file by copying the 32x32 version
  // For .ico format, we use sharp to write to the app favicon location
  // Next.js App Router picks up src/app/favicon.ico automatically
  await sharp(srcPng)
    .resize(32, 32)
    .toFile(path.join(appDir, 'favicon.ico'));
  console.log('✓ Generated src/app/favicon.ico (32x32)');

  // Also write to public
  await sharp(srcPng)
    .resize(32, 32)
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✓ Generated public/favicon.ico (32x32)');

  console.log('\n🎉 All favicon files generated successfully!');
}

generate().catch(console.error);
