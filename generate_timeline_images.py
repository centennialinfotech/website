import os
from PIL import Image, ImageDraw, ImageFont

# Image size
SIZE = (200, 200)

# Colors
DARK_BLUE = (0, 68, 106, 255)    # #00446a
LIGHT_GREY = (242, 242, 242, 255) # #f2f2f2
WHITE = (255, 255, 255, 255)

# Target directory
OUTPUT_DIR = r"E:\website\img"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Image filenames mapping
# Note that timeline4 is timeline4.png, others are timeline-X.png
filenames = {
    1: "timeline-1.png",
    2: "timeline-2.png",
    3: "timeline-3.png",
    4: "timeline4.png",
    5: "timeline-5.png",
    6: "timeline-6.png"
}

# Try to find a standard sans-serif font
font_paths = [
    "C:\\Windows\\Fonts\\arialbd.ttf",  # Windows Arial Bold
    "C:\\Windows\\Fonts\\segoeuib.ttf",  # Windows Segoe UI Bold
    "C:\\Windows\\Fonts\\arial.ttf"      # Fallback Arial
]

font = None
for path in font_paths:
    if os.path.exists(path):
        try:
            font = ImageFont.truetype(path, 110) # Large font size for 200x200
            break
        except:
            pass

if font is None:
    font = ImageFont.load_default()

for num, filename in filenames.items():
    # Create image with transparent background
    img = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Check if number is odd or even
    if num % 2 != 0:
        bg_color = DARK_BLUE
        text_color = WHITE
    else:
        bg_color = LIGHT_GREY
        text_color = DARK_BLUE
        
    # Draw circle
    # Leave a small 5px margin to avoid clipping
    draw.ellipse([5, 5, SIZE[0]-5, SIZE[1]-5], fill=bg_color)
    
    # Draw text (centered)
    text = str(num)
    
    # Calculate text bounding box to center it
    try:
        # Pillow 10+ syntax
        text_bbox = draw.textbbox((0, 0), text, font=font)
        text_w = text_bbox[2] - text_bbox[0]
        text_h = text_bbox[3] - text_bbox[1]
        
        # Center coordinates
        x = (SIZE[0] - text_w) / 2 - text_bbox[0]
        y = (SIZE[1] - text_h) / 2 - text_bbox[1]
    except AttributeError:
        # Fallback for older Pillow
        text_w, text_h = draw.textsize(text, font=font)
        x = (SIZE[0] - text_w) / 2
        y = (SIZE[1] - text_h) / 2
        
    # Apply vertical offset adjustments to make the number look perfectly centered
    # Numbers like 1, 2, 3 might sit slightly high/low depending on the font
    y_offset = -10 if num % 2 != 0 else -10
    draw.text((x, y + y_offset), text, fill=text_color, font=font)
    
    # Save the image
    output_path = os.path.join(OUTPUT_DIR, filename)
    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

print("Timeline images generation complete!")
