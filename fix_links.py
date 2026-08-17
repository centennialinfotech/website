import os
import glob

# Dictionary of incorrect hrefs to their correct local equivalents
replacements = {
    'href="services"': 'href="services.html"',
    'href="services/"': 'href="services.html"',
    'href="aboutus"': 'href="aboutus.html"',
    'href="aboutus/"': 'href="aboutus.html"',
    'href="blogs"': 'href="blogs.html"',
    'href="blogs/"': 'href="blogs.html"',
    'href="client"': 'href="client.html"',
    'href="client/"': 'href="client.html"',
    'href="contact"': 'href="contact.html"',
    'href="contact/"': 'href="contact.html"',
    
    'href="https://centennialinfotech.com/services"': 'href="services.html"',
    'href="https://centennialinfotech.com/services-support"': 'href="servicetosupport.html"',
    'href="https://centennialinfotech.com/products"': 'href="productData.html"',
    'href="https://centennialinfotech.com/blogs"': 'href="blogs.html"',
    'href="https://centennialinfotech.com/client"': 'href="client.html"',
    'href="https://centennialinfotech.com/aboutus"': 'href="aboutus.html"',
    'href="https://centennialinfotech.com/contact"': 'href="contact.html"',
    
    'href="https://stage.centennialinfotech.com/services"': 'href="services.html"',
    'href="https://stage.centennialinfotech.com/services-support"': 'href="servicetosupport.html"',
    'href="https://stage.centennialinfotech.com/products"': 'href="productData.html"',
    'href="https://stage.centennialinfotech.com/blogs"': 'href="blogs.html"',
    'href="https://stage.centennialinfotech.com/client"': 'href="client.html"',
    'href="https://stage.centennialinfotech.com/aboutus"': 'href="aboutus.html"',
    'href="https://stage.centennialinfotech.com/contact"': 'href="contact.html"',
}

target_dir = r"E:\website"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content
    for old_href, new_href in replacements.items():
        content = content.replace(old_href, new_href)
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed links in: {os.path.basename(filepath)}")

print("Done fixing links.")
