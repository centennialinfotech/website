import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { BASE_URL } from '../config/env'
import useScrollToTop from '../hooks/useScrollToTop'

function Clients() {
  useScrollToTop()

  const [activeTab, setActiveTab] = useState('menu1')

  const clientLogos = [
    'img/vodafone.png',
    'img/ebay.png',
    'img/hero.png',
    'img/amazon.png',
    'img/asianpaints.png',
    'img/itc-hotels.png',
    'img/flipkart.png',
    'img/muthoot-fincorp.png'
  ]

  const industries = [
    { name: 'Banking', image: 'img/bank.png' },
    { name: 'Finance', image: 'img/fiance.png' },
    { name: 'Insurance', image: 'img/Insurance.png' },
    { name: 'HealthCare', image: 'img/HealthCare.png' },
    { name: 'Education', image: 'img/Education.png' },
    { name: 'Non Profit Organizations', image: 'img/Non-Profit-Organizations.png' },
    { name: 'Internrt E-commerce', image: 'img/Internrt-E-commerce.png' },
    { name: 'It & Telecom', image: 'img/It-Telecom.png' }
  ]

  const allBlogs = [
    {
      title: 'Cybersecurity Best Practices for Businesses in the Digital Age',
      image: 'img/Cybersecurity.jpg'
    },
    {
      title: 'Enhancing User Experience: The Importance of UI/UX Design',
      image: 'img/client-uiux.jpeg'
    },
    {
      title: 'Investment Strategies for Business Growth in 2024',
      image: 'img/investment.jpeg'
    },
    {
      title: 'Navigating Business Loans: What You Need to Know',
      image: 'img/navigatin-business.jpg'
    }
  ]

  const uxUiBlogs = [
    {
      title: 'Enhancing User Experience: The Importance of UI/UX Design',
      image: 'img/client-uiux.jpeg'
    }
  ]

  const digitalTransformationBlogs = [
    {
      title: 'Cybersecurity Best Practices for Businesses in the Digital Age',
      image: 'img/Cybersecurity.jpg'
    }
  ]

  const getCurrentBlogs = () => {
    if (activeTab === 'menu1') {
      return allBlogs
    } else if (activeTab === 'menu2') {
      return uxUiBlogs
    } else if (activeTab === 'menu3') {
      return digitalTransformationBlogs
    }
    return allBlogs
  }

  return (
    <>
      <Breadcrumb
        title="Clients"
        items={[
          { label: 'Home', link: '/' },
          { label: 'Clients' }
        ]}
      />

      <section className="servicesbg">
        <div className="container-fluid pb-5">
          <div>
            <img src={`${BASE_URL}/img/services_icon_2.png`} alt="icon" className="img-fluid" />
            <img src={`${BASE_URL}/img/Ellipse 1.png`} alt="icon" className="services-one__shape-2 img-fluid" />
          </div>

          <h2 className="services_banner_title">
            Discover Our Trusted Partners: <br />
            Bringing Innovation to Life
          </h2>

          <ul className="client_suthead pt-4 pb-4">
            <li>
              <span>1000+ Projects</span>
            </li>
            <li>
              <span>16+ Domains</span>
            </li>
            <li>
              <span>125+ Awards</span>
            </li>
            <li>
              <span>500+ Clients</span>
            </li>
          </ul>

          <div>
            <img src={`${BASE_URL}/img/services_icon_1.png`} alt="img" className="services-one__shape-1" />
            <img src={`${BASE_URL}/img/services_icon.png`} alt="icon" className="img-fluid services-one__shape-2" />
          </div>
        </div>

        {/* Client Logos */}
        <div className="container">
          <h6 className="small-text text-center">Clients</h6>
          <h2 className="industries-rt">Clients we have worked before</h2>
          <p className="industries-wt">Check out our diverse investment products that suit your financial goals</p>

          <div className="row pt-5 pb-4">
            {clientLogos.map((logo, index) => (
              <div key={index} className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                <div className="clientlogo-one__single">
                  <div className="clientlogo-one__single-inner">
                    <img src={`${BASE_URL}/${logo}`} alt="img" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="container pt-5 pb-4">
          <div className="services__contactbg">
            <div className="row justify-content-center">
              <div className="col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 mr-auto">
                <h3 className="services__contacttitle">
                  Still unsure which product is right for you?
                  <span className="services__contacttitlert">Let the experts help!</span>
                </h3>
              </div>
              <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex justify-content-end">
                <div className="pt-3">
                  <Link to="/contact">
                    <button className="services_cnbtn btn">Contact</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industries */}
        <div className="container pt-5">
          <h6 className="small-text text-center">Industries</h6>
          <h2 className="industries-rt">Industries we worked</h2>
          <p className="industries-wt">Check out our diverse investment products that suit your financial goals</p>

          <div className="row pt-4">
            {industries.map((industry, index) => (
              <div key={index} className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                <div className="client-card-one">
                  <img src={`${BASE_URL}/${industry.image}`} className="img-fluid" alt={industry.name} />
                  <p>{industry.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Blogs with Tabs */}
        <div className="container pt-5 pb-5">
          <h6 className="small-text text-center">Have a glimpse of the businesses</h6>
          <h2 className="industries-rt">we have transformed website</h2>
          <p className="industries-wt">Stay Updated On IT News, Emerging Technologies, And Market Trends</p>

          <div>
            <ul className="nav nav-tabs">
              <li title="Tab 1">
                <a
                  href="#menu1"
                  className={activeTab === 'menu1' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab('menu1')
                  }}
                >
                  All
                </a>
              </li>
              <li title="Tab 2">
                <a
                  href="#menu2"
                  className={activeTab === 'menu2' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab('menu2')
                  }}
                >
                  UX/UI Design
                </a>
              </li>
              <li title="Tab 3">
                <a
                  href="#menu3"
                  className={activeTab === 'menu3' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab('menu3')
                  }}
                >
                  Digital Transformation
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div className={`tab-pane fade ${activeTab === 'menu1' ? 'in active' : ''}`} id="menu1">
                <div className="row pt-5">
                  {getCurrentBlogs().map((blog, index) => (
                    <div key={index} className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                      <div className="client_section">
                        <div className="img-blog">
                          <img src={`${BASE_URL}/${blog.image}`} alt={blog.title} />
                        </div>
                        <div className="client_blog_title">
                          <h3>{blog.title}</h3>
                        </div>
                        <div className="btn-button">
                          <Link to="/clientDeatils" className="btn-btn">
                            know more
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`tab-pane fade ${activeTab === 'menu2' ? 'in active' : ''}`} id="menu2">
                <div className="row pt-5">
                  {getCurrentBlogs().map((blog, index) => (
                    <div key={index} className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                      <div className="client_section">
                        <div className="img-blog">
                          <img src={`${BASE_URL}/${blog.image}`} alt={blog.title} />
                        </div>
                        <div className="client_blog_title">
                          <h3>{blog.title}</h3>
                        </div>
                        <div className="btn-button">
                          <Link to="/clientDeatils" className="btn-btn">
                            know more
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`tab-pane fade ${activeTab === 'menu3' ? 'in active' : ''}`} id="menu3">
                <div className="row pt-5">
                  {getCurrentBlogs().map((blog, index) => (
                    <div key={index} className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                      <div className="client_section">
                        <div className="img-blog">
                          <img src={`${BASE_URL}/${blog.image}`} alt={blog.title} />
                        </div>
                        <div className="client_blog_title">
                          <h3>{blog.title}</h3>
                        </div>
                        <div className="btn-button">
                          <Link to="/clientDeatils" className="btn-btn">
                            know more
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-row pt-72 pb-72">
          <div className="container">
            <div className="testimonials-item">
              <div className="item">
                <h5 className="customer">
                  We <img src={`${BASE_URL}/img/heart.png`} alt="heart" /> our clients
                </h5>
                <h2 className="customer1">What do people praise about centennial?</h2>
                <p className="customer2">our client testimonials</p>
              </div>
              <div className="slider">
                <div className="imgtt">
                  <img src={`${BASE_URL}/img/testimonials.jpg`} alt="img" className="imgt" />
                  <img src={`${BASE_URL}/img/testimonials-1.jpg`} alt="img" className="imgt" />
                  <img src={`${BASE_URL}/img/testimonials-2.jpg`} alt="img" className="imgt" />
                  <img src={`${BASE_URL}/img/testimonials-3.jpg`} alt="img" className="imgt" />
                </div>
                <div className="right-item-testi">
                  <div className="large-img">
                    <img src={`${BASE_URL}/img/testimonials.jpg`} alt="img" className="imgt1" />
                  </div>
                  <div className="text-content">
                    <div className="testimonials-item">
                      <h5 className="name">Harshvardhan Upadhaya</h5>
                      <h5 className="name1">Long Term Investor</h5>
                      <p className="name2">
                        "Great work!!! The team was solid, efficient and knowledgeable. They did an amazing job on my
                        very challenging app"
                      </p>
                    </div>
                    <div className="buttons">
                      <button type="button" className="btnn1">
                        <img src={`${BASE_URL}/img/arrow_new_left.png`} alt="left arrow" />
                      </button>
                      <button type="button" className="btnn2">
                        <img src={`${BASE_URL}/img/arrow_new.png`} alt="right arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Clients
