import os
import glob
import re

target_dir = r"E:\website"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

# Regex to find leftover top-headers
leftover_regex = re.compile(
    r'(?:<!--\s*top Header\s*-->\s*)?'
    r'(?:<div class="top-header"></div>\s*)*'
    r'(?:<!--\s*top Header\s*-->\s*)?'
    r'(?:<div class="top-header"></div>\s*)*',
    re.DOTALL
)

for filepath in html_files:
    filename = os.path.basename(filepath)
    if filename in ["index.html", "pricing.html", "servicetosupport.html", "productData.html"]:
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We only want to clean up if the new navbar is present (which it should be)
    if "==================== NAVBAR START ====================" in content:
        # Match only the part right before NAVBAR START
        before_nav_split = content.split("<!-- ==================== NAVBAR START ====================")
        if len(before_nav_split) == 2:
            body_part, rest = before_nav_split
            # Clean up the end of body_part (just before the navbar start)
            # Find the last occurrence of top-header stuff
            cleaned_body_part = body_part.rstrip()
            # Remove any trailing top-header comments or divs
            # We can use regex to match trailing stuff
            cleaned_body_part = re.sub(
                r'(?:<!--\s*top Header\s*-->\s*|<div class="top-header"></div>\s*)+$',
                '',
                cleaned_body_part
            )
            
            new_content = cleaned_body_part + "\n    <!-- ==================== NAVBAR START ====================" + rest
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Cleaned top-header divs in: {filename}")

print("Clean up complete.")
