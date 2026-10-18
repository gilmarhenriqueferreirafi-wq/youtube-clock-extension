from PIL import Image, ImageDraw
import os

def create_icon(size, filename):
    # Create image with gradient background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw gradient circle (simplified as solid color for compatibility)
    draw.ellipse([2, 2, size-2, size-2], fill=(102, 126, 234, 255))
    
    # Draw clock face
    draw.ellipse([size//8, size//8, size-size//8, size-size//8], fill=(255, 255, 255, 50))
    
    # Draw clock markers
    marker_width = max(1, size // 32)
    
    # Top
    draw.line([size//2, size//8, size//2, size//6], fill=(255, 255, 255, 255), width=marker_width)
    # Bottom
    draw.line([size//2, size-size//8, size//2, size-size//6], fill=(255, 255, 255, 255), width=marker_width)
    # Left
    draw.line([size//8, size//2, size//6, size//2], fill=(255, 255, 255, 255), width=marker_width)
    # Right
    draw.line([size-size//8, size//2, size-size//6, size//2], fill=(255, 255, 255, 255), width=marker_width)
    
    # Hour hand
    hour_width = max(1, size // 16)
    draw.line([size//2, size//2, size//2, size//3], fill=(255, 255, 255, 255), width=hour_width)
    
    # Minute hand
    minute_width = max(1, size // 24)
    draw.line([size//2, size//2, size//2 + size//6, size//2], fill=(255, 255, 255, 255), width=minute_width)
    
    # Center dot
    dot_radius = max(1, size // 24)
    draw.ellipse([size//2 - dot_radius, size//2 - dot_radius, 
                  size//2 + dot_radius, size//2 + dot_radius], 
                 fill=(255, 255, 255, 255))
    
    # Save as PNG
    img.save(filename, 'PNG')
    print(f"Created {filename}")

# Create icons
create_icon(16, 'icon16.png')
create_icon(48, 'icon48.png')
create_icon(128, 'icon128.png')

print("All icons created successfully!")