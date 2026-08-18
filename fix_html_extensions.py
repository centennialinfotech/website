import os
import glob
import re

target_dir = r"E:\website"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

# Regex to find href attributes ending in .html
# We want to match local links like href="aboutus.html" or href="aboutus.html#section"
# and change them to href="aboutus" or href="aboutus#section"

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content
    
    # First, handle the special case for index.html -> home
    content = content.replace('href="index.html"', 'href="home"')
    content = content.replace('href="index.html#', 'href="home#')
    
    # Next, handle any other .html links
    # This regex looks for href="<something>.html<optional hash>"
    # It avoids replacing external links if possible, but let's just replace all .html
    # within href="..." that don't start with http (unless it's our own domain)
    
    def replacer(match):
        url = match.group(1)
        # If it's a full URL to another site, leave it. If it's ours, replace.
        if url.startswith('http') and 'centennialinfotech.com' not in url:
            return match.group(0)
        
        # Remove .html
        new_url = url.replace('.html', '')
        return f'href="{new_url}"'

    content = re.sub(r'href="([^"]+?\.html[^"]*)"', replacer, content)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed links in: {os.path.basename(filepath)}")

print("Done fixing links.")
