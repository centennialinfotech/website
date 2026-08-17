import os
import glob

target_dir = r"E:\website"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content
    content = content.replace('href="img/favicon.png"', 'href="img/logo.png"')
    content = content.replace('href="favicon.png"', 'href="img/logo.png"')
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed favicon in: {os.path.basename(filepath)}")

print("Favicon replaced successfully!")
