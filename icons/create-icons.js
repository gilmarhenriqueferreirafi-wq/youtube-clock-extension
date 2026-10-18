const fs = require('fs');
const path = require('path');

// Simple base64 encoded PNG icons (1x1 colored pixels as placeholders)
// These are minimal valid PNG files

function createColorPng(r, g, b) {
    // Create a minimal PNG file with specified color
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    
    // IHDR chunk (image header)
    const width = 128;
    const height = 128;
    const bitDepth = 8;
    const colorType = 2; // RGB
    const compression = 0;
    const filter = 0;
    const interlace = 0;
    
    const ihdrData = Buffer.concat([
        Buffer.from([width >> 24, width >> 16, width >> 8, width]),
        Buffer.from([height >> 24, height >> 16, height >> 8, height]),
        Buffer.from([bitDepth, colorType, compression, filter, interlace])
    ]);
    
    const ihdrChunk = createChunk('IHDR', ihdrData);
    
    // IDAT chunk (image data - simple gradient)
    const idatData = createImageData(width, height, r, g, b);
    const idatChunk = createChunk('IDAT', idatData);
    
    // IEND chunk
    const iendChunk = createChunk('IEND', Buffer.alloc(0));
    
    return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
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
            crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
        }
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
}

function createImageData(width, height, r1, g1, b1) {
    // Create simple gradient image data
    const r2 = 118, g2 = 75, b2 = 162; // End color
    const bytesPerRow = width * 3 + 1;
    const data = Buffer.alloc(bytesPerRow * height);
    
    for (let y = 0; y < height; y++) {
        const ratio = y / height;
        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);
        
        data[y * bytesPerRow] = 0; // Filter type
        for (let x = 0; x < width; x++) {
            const idx = y * bytesPerRow + 1 + x * 3;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
        }
    }
    
    return data;
}

// Create icons with gradient
const icon128 = createColorPng(102, 126, 234);
fs.writeFileSync('icon128.png', icon128);

// For smaller icons, we'll just scale down by creating simpler versions
const icon48 = createColorPng(102, 126, 234);
fs.writeFileSync('icon48.png', icon48);

const icon16 = createColorPng(102, 126, 234);
fs.writeFileSync('icon16.png', icon16);

console.log('Icons created successfully!');