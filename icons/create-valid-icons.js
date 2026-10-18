const fs = require('fs');
const path = require('path');

// Create simple valid PNG icons using minimal PNG structure
function createSimplePng(size, filename) {
    // Create a simple valid PNG with a solid color
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    
    // IHDR chunk
    const width = size;
    const height = size;
    const ihdrData = Buffer.from([
        (width >> 24) & 0xFF, (width >> 16) & 0xFF, (width >> 8) & 0xFF, width & 0xFF,
        (height >> 24) & 0xFF, (height >> 16) & 0xFF, (height >> 8) & 0xFF, height & 0xFF,
        8, // bit depth
        2, // color type (RGB)
        0, // compression
        0, // filter
        0  // interlace
    ]);
    
    const ihdrChunk = createChunk('IHDR', ihdrData);
    
    // IDAT chunk - simple gradient image data
    const idatData = createGradientImageData(size, size);
    const idatChunk = createChunk('IDAT', idatData);
    
    // IEND chunk
    const iendChunk = createChunk('IEND', Buffer.alloc(0));
    
    const png = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
    fs.writeFileSync(filename, png);
    console.log(`Created ${filename}`);
}

function createChunk(type, data) {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length, 0);
    
    const typeBuffer = Buffer.from(type);
    const crc = calculateCrc(Buffer.concat([typeBuffer, data]));
    
    const crcBuffer = Buffer.alloc(4);
    crcBuffer.writeUInt32BE(crc, 0);
    
    return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function calculateCrc(data) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i];
        for (let j = 0; j < 8; j++) {
            crc = (crc >>> 1) ^ ((crc & 1) ? 0xEDB88320 : 0);
        }
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
}

function createGradientImageData(width, height) {
    // Create image data with gradient from #667eea to #764ba2
    const r1 = 102, g1 = 126, b1 = 234;
    const r2 = 118, g2 = 75, b2 = 162;
    
    const bytesPerRow = width * 3 + 1; // RGB + filter byte
    const totalBytes = bytesPerRow * height;
    const data = Buffer.alloc(totalBytes);
    
    for (let y = 0; y < height; y++) {
        const ratio = y / height;
        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);
        
        data[y * bytesPerRow] = 0; // Filter type 0 (none)
        
        for (let x = 0; x < width; x++) {
            const idx = y * bytesPerRow + 1 + x * 3;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
        }
    }
    
    // Compress the data using zlib
    const zlib = require('zlib');
    return zlib.deflateSync(data);
}

// Create icons
try {
    createSimplePng(16, 'icon16.png');
    createSimplePng(48, 'icon48.png');
    createSimplePng(128, 'icon128.png');
    console.log('All icons created successfully!');
} catch (error) {
    console.error('Error creating icons:', error.message);
    console.log('Trying alternative method...');
    
    // Alternative: use SVG as base64 data URI
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="64" cy="64" r="60" fill="url(#grad1)"/>
      <circle cx="64" cy="64" r="45" fill="white" opacity="0.2"/>
      <line x1="64" y1="24" x2="64" y2="32" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <line x1="64" y1="96" x2="64" y2="104" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <line x1="24" y1="64" x2="32" y2="64" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <line x1="96" y1="64" x2="104" y2="64" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <line x1="64" y1="64" x2="64" y2="40" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <line x1="64" y1="64" x2="85" y2="64" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <circle cx="64" cy="64" r="5" fill="white"/>
    </svg>`;
    
    fs.writeFileSync('icon.svg', svg);
    console.log('SVG icon created as fallback');
}