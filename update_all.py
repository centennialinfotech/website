import os
import glob
import re

target_dir = r"E:\website"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

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
              <a class="nav-link" href="servicetosupport">Services</a>
            </li>
            
            <li class="nav-item">
              <a class="nav-link" href="productData">Products</a>
            </li>
            
            <li class="nav-item">
              <a class="nav-link" href="pricing">Pricing</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="aboutus">About</a>
            </li>
            
            <li class="nav-item">
              <a class="nav-link" href="sms-consent">SMS</a>
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

new_footer_template = """    <!-- footer section -->
    <div class="footer pt-72 pb-72">
      <div class="container">
        <div class="row">
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-3 col-xxl-3">
            <div class="section-footer">
              <a href="#"><img src="img/logo.png" /></a>
            </div>
            <div class="icons_footer">
              <ul>
                <li>
                  <a href="https://twitter.com/centennialits" target="_blank" rel="noopener noreferrer">
                    <img src="img/twitter.png" alt="Twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/centennialinfotech" target="_blank" rel="noopener noreferrer">
                    <img src="img/facebook.png" alt="Facebook" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@centennialinfotech" target="_blank" rel="noopener noreferrer">
                    <img src="img/youtube.png" alt="YouTube" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/cententialinfotech" target="_blank" rel="noopener noreferrer">
                    <img src="img/instagram.png" alt="Instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-sm-4 col-md-2 col-lg-2 col-xl-3 col-xxl-3">
            <div class="section-footer">
              <ul>
                <b><a href="#">Quick links</a></b>
                <li><a href="services">Solutions</a></li>
                <li><a href="blogs">Blogs</a></li>
                <li><a href="client">clients</a></li>
                <li><a href="aboutus">about us</a></li>
                <li><a href="contact">contact</a></li>
                <li><a href="privacy-policy">Privacy Policy</a></li>
                <li><a href="terms-and-conditions">Terms &amp; Conditions</a></li>
                <li><a href="sms-consent">SMS Consent</a></li>
              </ul>
            </div>
          </div>

          <div class="col-sm-4 col-md-2 col-lg-2 col-xl-3 col-xxl-3">
            <div class="section-footer">
              <div class="section-footer">
                <ul>
                  <b><a href="services">Our Services</a></b>
                  <li><a href="services">UI/UX Design</a></li>
                  <li><a href="services">Web Development</a></li>
                  <li><a href="services">App Development</a></li>
                  <li><a href="services">Quality Assurance</a></li>
                  <li><a href="services">Software Development</a></li>
                  <li><a href="services">IT Consulting</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-3 col-xxl-3">
            <div class="section-footer">
              <ul>
                <b><a href="#">Office address</a></b>
                <li>
                  C-124, VIII, Phase-8, Industrial Area, Sector 73, Sahibzada
                  Ajit Singh Nagar, Punjab 140308
                </li>
                <span class="email-ft"><b>sales@centennialinfotech.com</b></span><br />
                <span><b>+91-81465 11568</b></span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer section end -->"""

# Regexes
nav_regex = re.compile(
    r'(?:<!--\s*==================== NAVBAR START ====================\s*-->\s*)?'
    r'<nav class="navbar.*?navbar-expand-.*?">.*?</nav>\s*'
    r'(?:<!--\s*==================== NAVBAR END ====================\s*-->)?',
    re.DOTALL
)

footer_regex = re.compile(
    r'<!--\s*footer section\s*-->.*<!--\s*footer section end\s*-->',
    re.DOTALL
)

# Some files don't have the standard footer format, we try to match the <div class="footer pt-72 pb-72">
footer_regex_2 = re.compile(
    r'<div class="footer pt-72 pb-72">.*?</div>\s*</div>\s*</div>\s*</div>',
    re.DOTALL
)

for filepath in html_files:
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine active page
    page_id = filename.replace(".html", "")
    if "client" in page_id: page_id = "client"
    elif "blogs" in page_id: page_id = "blogs"
    elif page_id == "index": page_id = "home"

    # Add active class
    navbar_for_page = new_navbar_template
    if page_id != "home":
        navbar_for_page = navbar_for_page.replace(
            f'class="nav-link" href="{page_id}"',
            f'class="nav-link active" href="{page_id}"'
        )
    
    # Replace navbar
    new_content, n_count = nav_regex.subn(navbar_for_page + '\n', content)
    
    # Replace footer
    if '<!-- footer section -->' in new_content:
        new_content, f_count = footer_regex.subn(new_footer_template, new_content)
    else:
        new_content, f_count = footer_regex_2.subn(new_footer_template, new_content)

    if n_count > 0 or f_count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}: navbar({n_count}) footer({f_count})")

print("Done updating all html files.")
