import sys
content = open('productData.html', 'r', encoding='utf-8').read()

static_portals = """
        <div class="product-card" onclick="window.open('https://ats.centennialinfotech.com/', '_blank')">
            <div class="card-content">
                <div class="product-title">Applicant Tracking System (ATS)</div>
                <div class="product-description">Smarter, faster hiring process. Manage applicants and streamline your recruitment workflow.</div>
                <button class="buy-btn" onclick="event.stopPropagation(); window.open('https://ats.centennialinfotech.com/', '_blank')">Visit ATS Portal</button>
            </div>
        </div>
        <div class="product-card" onclick="window.open('https://ams.centennialinfotech.com/log', '_blank')">
            <div class="card-content">
                <div class="product-title">Attendance Marking System (AMS)</div>
                <div class="product-description">Efficient attendance tracking and marking system for organizations.</div>
                <button class="buy-btn" onclick="event.stopPropagation(); window.open('https://ams.centennialinfotech.com/log', '_blank')">Visit AMS Portal</button>
            </div>
        </div>
        <div class="product-card" onclick="window.open('https://portfolio.centennialinfotech.com/', '_blank')">
            <div class="card-content">
                <div class="product-title">Portfolio</div>
                <div class="product-description">Portfolio management for applicants and freelancers to showcase their work and skills.</div>
                <button class="buy-btn" onclick="event.stopPropagation(); window.open('https://portfolio.centennialinfotech.com/', '_blank')">Visit Portfolio</button>
            </div>
        </div>
        <div class="product-card" onclick="window.open('http://staffing.centennialinfotech.com/', '_blank')">
            <div class="card-content">
                <div class="product-title">Staffing Portal</div>
                <div class="product-description">Manage completed recruitment processes and streamline your staffing operations.</div>
                <button class="buy-btn" onclick="event.stopPropagation(); window.open('http://staffing.centennialinfotech.com/', '_blank')">Visit Staffing Portal</button>
            </div>
        </div>
"""

content = content.replace('container.innerHTML = products\n          .map', 'container.innerHTML = `'+static_portals+'` + products\n          .map')
open('productData.html', 'w', encoding='utf-8').write(content)
