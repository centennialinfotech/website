import os
import glob
import re

target_dir = r"E:\website"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

# Base new navbar template
new_navbar_template = """    <!-- ==================== NAVBAR START ==================== -->
    <nav class="navbar navbar-expand-lg navbar-dark main-navbar">
      <div class="container">
        <a class="navbar-brand" href="index">
          <img src="img/logo.png" alt="logo" />
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <a class="nav-link" href="index">Home</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="services">Solutions</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="blogs">Blogs</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="client">Clients</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="servicetosupport"
                >ServiceToSupport</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="productData">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="pricing">Pricing</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="aboutus">About Us</a>
            </li>

            <!-- Careers -->
            <li class="nav-item ms-3">
              <a
                href="https://career.centennialinfotech.com/jobs"
                class="nav-cta-btn careers-btn"
              >
                Careers
              </a>
            </li>

            <!-- Contact -->
            <li class="nav-item ms-2">
              <a href="contact" class="nav-cta-btn contact-btn">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- ==================== NAVBAR END ==================== -->"""

# Regex to find the old navbar block:
# It starts optionally with comments/divs for top-header, and then <nav class="navbar navbar-expand-sm navbar-dark">... </nav>
old_nav_regex = re.compile(
    r'(?:<!--\s*top Header\s*-->\s*)?'
    r'(?:<div class="top-header"></div>\s*)*'
    r'(?:<!--\s*top Header\s*-->\s*)?'
    r'(?:<div class="top-header"></div>\s*)*'
    r'<nav class="navbar navbar-expand-sm navbar-dark">.*?</nav>',
    re.DOTALL
)

for filepath in html_files:
    filename = os.path.basename(filepath)
    # Skip index.html/pricing.html/servicetosupport.html/productData.html as they already have the new navbar
    if filename in ["index.html", "pricing.html", "servicetosupport.html", "productData.html"]:
        continue
        
    page_id = filename.replace(".html", "")
    # Special mappings:
    # clientDetails.html -> client
    # blogsDetails.html -> blogs
    if "client" in page_id:
        page_id = "client"
    elif "blogs" in page_id:
        page_id = "blogs"
    elif page_id == "index":
        page_id = "home"
        
    # Generate navbar for this specific page by adding the active class
    navbar_for_page = new_navbar_template
    if page_id != "home":
        # e.g., class="nav-link" href="services" -> class="nav-link active" href="services"
        navbar_for_page = navbar_for_page.replace(
            f'class="nav-link" href="{page_id}"',
            f'class="nav-link active" href="{page_id}"'
        )
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Perform replacement
    new_content, count = old_nav_regex.subn(navbar_for_page, content)
    
    if count > 0:
        # Also ensure style.css uses versioning if not already
        new_content = new_content.replace('href="style.css"', 'href="style.css?v=2"')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated navbar in: {filename} (marked active: {page_id})")

print("Navbar replacement complete.")
