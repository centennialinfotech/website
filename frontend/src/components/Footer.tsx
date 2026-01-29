import { Link } from 'react-router-dom'
import { BASE_URL } from '../config/env'

function Footer() {
  return (
    <div className="footer pt-72 pb-72">
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-md-3 col-lg-4 col-xl-3 col-xxl-3">
            <div className="section-footer">
              <Link to="/">
                <img src={`${BASE_URL}/img/logo.png`} alt="Centennial Infotech" />
              </Link>
            </div>
            <div className="icons_footer">
              <ul>
                <li>
                  <a href="https://twitter.com/centennialits" target="_blank" rel="noopener noreferrer">
                    <img src={`${BASE_URL}/img/twitter.png`} alt="Twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/centennialinfotech" target="_blank" rel="noopener noreferrer">
                    <img src={`${BASE_URL}/img/facebook.png`} alt="Facebook" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@centennialinfotech" target="_blank" rel="noopener noreferrer">
                    <img src={`${BASE_URL}/img/youtube.png`} alt="YouTube" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/cententialinfotech" target="_blank" rel="noopener noreferrer">
                    <img src={`${BASE_URL}/img/instagram.png`} alt="Instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-4 col-md-2 col-lg-2 col-xl-3 col-xxl-3">
            <div className="section-footer">
              <ul>
                <b><Link to="#">Quick links</Link></b>
                <li><Link to="/services">Solutions</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/client">clients</Link></li>
                <li><Link to="/aboutus">about us</Link></li>
                <li><Link to="/contact">contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="col-sm-4 col-md-3 col-lg-2 col-xl-3 col-xxl-3">
            <div className="section-footer">
              <ul>
                <b><Link to="/services">Our Services</Link></b>
                <li><Link to="/services">UI/UX Design</Link></li>
                <li><Link to="/services">Web Development</Link></li>
                <li><Link to="/services">App Development</Link></li>
                <li><Link to="/services">Quality Assurance</Link></li>
                <li><Link to="/services">Software Development</Link></li>
                <li><Link to="/services">IT Consulting</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-3 col-xxl-3">
            <div className="section-footer">
              <ul>
                <b><Link to="#">Office address</Link></b>
                <li>C-124, VIII, Phase-8, Industrial Area, Sector 73, Sahibzada Ajit Singh Nagar, Punjab 140308</li>
                <span className="email-ft"><b>support@centennialinfotech.com</b></span><br />
                <span><b>+91-01723596492, +91-81465 11568</b></span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
