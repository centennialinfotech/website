import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import useScrollToTop from '../hooks/useScrollToTop'
import { getCloudinaryUrl } from '../utils/imageUrl'

function Clients() {
  useScrollToTop()

  const [activeTab, setActiveTab] = useState('menu1')

  const clientLogos = [
    getCloudinaryUrl('img/vodafone.png'),
    getCloudinaryUrl('img/ebay.png'),
    getCloudinaryUrl('img/hero.png'),
    getCloudinaryUrl('img/amazon.png'),
    getCloudinaryUrl('img/asianpaints.png'),
    getCloudinaryUrl('img/itc-hotels.png'),
    getCloudinaryUrl('img/flipkart.png'),
    getCloudinaryUrl('img/muthoot-fincorp.png')
  ]

  const industries = [
    { name: 'Banking', image: getCloudinaryUrl('img/bank.png') },
    { name: 'Finance', image: getCloudinaryUrl('img/fiance.png') },
    { name: 'Insurance', image: getCloudinaryUrl('img/Insurance.png') },
    { name: 'HealthCare', image: getCloudinaryUrl('img/HealthCare.png') },
    { name: 'Education', image: getCloudinaryUrl('img/Education.png') },
    { name: 'Non Profit Organizations', image: getCloudinaryUrl('img/Non-Profit-Organizations.png') },
    { name: 'Internrt E-commerce', image: getCloudinaryUrl('img/Internrt-E-commerce.png') },
    { name: 'It & Telecom', image: getCloudinaryUrl('img/It-Telecom.png') }
  ]

  const allBlogs = [
    {
      title: 'Cybersecurity Best Practices for Businesses in the Digital Age',
      image: getCloudinaryUrl('img/Cybersecurity.jpg')
    },
    {
      title: 'Enhancing User Experience: The Importance of UI/UX Design',
      image: getCloudinaryUrl('img/client-uiux.jpeg')
    },
    {
      title: 'Investment Strategies for Business Growth in 2024',
      image: getCloudinaryUrl('img/investment.jpeg')
    },
    {
      title: 'Navigating Business Loans: What You Need to Know',
      image: getCloudinaryUrl('img/navigatin-business.jpg')
    }
  ]

  const uxUiBlogs = [
    {
      title: 'Enhancing User Experience: The Importance of UI/UX Design',
      image: getCloudinaryUrl('img/client-uiux.jpeg')
    }
  ]

  const digitalTransformationBlogs = [
    {
      title: 'Cybersecurity Best Practices for Businesses in the Digital Age',
      image: getCloudinaryUrl('img/Cybersecurity.jpg')
    }
  ]

  const getCurrentBlogs = () => {
    if (activeTab === 'menu1') return allBlogs
    if (activeTab === 'menu2') return uxUiBlogs
    if (activeTab === 'menu3') return digitalTransformationBlogs
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
            <img src={getCloudinaryUrl('/img/services_icon_2.png')} alt="icon" className="img-fluid" />
            <img src={getCloudinaryUrl('/img/Ellipse 1.png')} alt="icon" className="services-one__shape-2 img-fluid" />
          </div>

          <h2 className="services_banner_title">
            Discover Our Trusted Partners: <br />
            Bringing Innovation to Life
          </h2>

          <ul className="client_suthead pt-4 pb-4">
            <li><span>1000+ Projects</span></li>
            <li><span>16+ Domains</span></li>
            <li><span>125+ Awards</span></li>
            <li><span>500+ Clients</span></li>
          </ul>

          <div>
            <img src={getCloudinaryUrl('/img/services_icon_1.png')} alt="img" className="services-one__shape-1" />
            <img src={getCloudinaryUrl('/img/services_icon.png')} alt="icon" className="img-fluid services-one__shape-2" />
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
                    <img src={logo} alt="client logo" className="img-fluid" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="container pt-5 pb-4">
          <div className="services__contactbg">
            <div className="row justify-content-center align-items-center">
              <div className="col-sm-9">
                <h3 className="services__contacttitle">
                  Still unsure which product is right for you?
                  <span className="services__contacttitlert"> Let the experts help!</span>
                </h3>
              </div>
              <div className="col-sm-3 d-flex justify-content-end">
                <Link to="/contact">
                  <button className="services_cnbtn btn">Contact</button>
                </Link>
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
                  <img src={industry?.image} className="img-fluid" alt={industry?.name} />
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

          <div className="mt-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'menu1' ? 'active' : ''}`}
                  onClick={() => setActiveTab('menu1')}
                >
                  All
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'menu2' ? 'active' : ''}`}
                  onClick={() => setActiveTab('menu2')}
                >
                  UX/UI Design
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'menu3' ? 'active' : ''}`}
                  onClick={() => setActiveTab('menu3')}
                >
                  Digital Transformation
                </button>
              </li>
            </ul>

            <div className="tab-content pt-4">
              <div className={`tab-pane fade show active`}>
                <div className="row">
                  {getCurrentBlogs().map((blog, index) => (
                    <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                      <div className="client_section">
                        <div className="img-blog">
                          <img src={blog?.image} alt={blog?.title} className="img-fluid" />
                        </div>
                        <div className="client_blog_title">
                          <h3>{blog.title}</h3>
                        </div>
                        <div className="btn-button mt-3">
                          <Link to="/clientDetails" className="btn-btn">
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
                  We <img src={getCloudinaryUrl('/img/heart.png')} alt="heart" /> our clients
                </h5>
                <h2 className="customer1">What do people praise about centennial?</h2>
                <p className="customer2">our client testimonials</p>
              </div>
              <div className="slider">
                <div className="imgtt">
                  <img src={getCloudinaryUrl('/img/testimonials.jpg')} alt="testimonial" className="imgt" />
                  <img src={getCloudinaryUrl('/img/testimonials-1.jpg')} alt="testimonial" className="imgt" />
                  <img src={getCloudinaryUrl('/img/testimonials-2.jpg')} alt="testimonial" className="imgt" />
                  <img src={getCloudinaryUrl('/img/testimonials-3.jpg')} alt="testimonial" className="imgt" />
                </div>
                <div className="right-item-testi">
                  <div className="large-img">
                    <img src={getCloudinaryUrl('/img/testimonials.jpg')} alt="featured testimonial" className="imgt1" />
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
                        <img src={getCloudinaryUrl('/img/arrow_new_left.png')} alt="left" />
                      </button>
                      <button type="button" className="btnn2">
                        <img src={getCloudinaryUrl('/img/arrow_new.png')} alt="right" />
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