"""
Generate all missing images for the website.
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = r"E:\website\img"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Try to find a font
FONT_PATHS = [
    "C:\\Windows\\Fonts\\arialbd.ttf",
    "C:\\Windows\\Fonts\\arial.ttf",
    "C:\\Windows\\Fonts\\segoeuib.ttf",
]
def get_font(size):
    for path in FONT_PATHS:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                pass
    return ImageFont.load_default()

def save(img, name):
    path = os.path.join(OUTPUT_DIR, name)
    img.save(path, "PNG")
    print(f"Saved {name}")

# ------------------------------------------------------------------
# 1. ArrowLeft.png - a small left-pointing chevron arrow (dark blue)
# ------------------------------------------------------------------
img = Image.new("RGBA", (40, 40), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)
# Draw left chevron < shape
pts = [(28, 8), (12, 20), (28, 32)]
draw.line(pts, fill=(0, 71, 112, 255), width=4)
save(img, "ArrowLeft.png")

# ------------------------------------------------------------------
# 2. bg_stats.png - subtle light blue background pattern
# ------------------------------------------------------------------
w, h = 1200, 400
img = Image.new("RGBA", (w, h), (240, 248, 255, 255))
draw = ImageDraw.Draw(img)
# Subtle decorative circles
for i, (x, y, r, alpha) in enumerate([
    (100, 200, 150, 30), (600, 50, 200, 20), (1100, 300, 180, 25),
    (300, 350, 100, 15), (900, 100, 120, 20),
]):
    draw.ellipse([x-r, y-r, x+r, y+r], fill=(0, 71, 112, alpha))
save(img, "bg_stats.png")

# ------------------------------------------------------------------
# 3. Team member placeholder images - Rectangle 40273/74/75.png
#    and team_1/4/5.png
# ------------------------------------------------------------------
DARK_BLUE = (0, 71, 112, 255)
MID_BLUE = (0, 100, 160, 255)
LIGHT_BG = (240, 248, 255, 255)

for fname, size, bg, person_label in [
    ("Rectangle 40273.png", (350, 280), LIGHT_BG, None),
    ("Rectangle 40274.png", (350, 280), LIGHT_BG, None),
    ("Rectangle 40275.png", (350, 280), LIGHT_BG, None),
]:
    img = Image.new("RGBA", size, bg)
    draw = ImageDraw.Draw(img)
    # Gradient-style rectangle
    for y in range(size[1]):
        ratio = y / size[1]
        r = int(200 + 40 * ratio)
        g = int(220 + 28 * ratio)
        b = int(240 + 15 * ratio)
        draw.line([(0, y), (size[0], y)], fill=(r, g, b, 255))
    save(img, fname)

# Person silhouette images (circular avatar placeholders)
for fname, label_char in [
    ("team_1.png", "B"),
    ("team_4.png", "A"),
    ("team_5.png", "T"),
]:
    size = (120, 120)
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    # Circle background
    draw.ellipse([0, 0, size[0]-1, size[1]-1], fill=DARK_BLUE)
    # Initial letter
    font = get_font(56)
    text = label_char
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        x = (size[0] - tw) / 2 - bbox[0]
        y = (size[1] - th) / 2 - bbox[1] - 4
    except AttributeError:
        tw, th = draw.textsize(text, font=font)
        x = (size[0] - tw) / 2
        y = (size[1] - th) / 2
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
    save(img, fname)

print("\nAll missing images generated successfully!")
