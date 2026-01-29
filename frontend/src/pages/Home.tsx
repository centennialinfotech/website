import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../config/env'
import useScrollToTop from '../hooks/useScrollToTop'

interface Product {
  image: string
  changeImage: string
  title: string
  description: string
}

interface Testimonial {
  name: string
  title: string
  text: string
  image: string
}

interface FAQ {
  question: string
  answer: string
}

interface Achievement {
  num: string
  title: string
  desc: string
}

declare global {
  interface Window {
    Tawk_API?: any
    Toastify?: any
    intlTelInput?: any
    intlTelInputGlobals?: any
    grecaptcha?: any
  }
}

function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string>('img/chnage_a.png')
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

  const products: Product[] = [
    {
      image: 'img/product_a.png',
      changeImage: 'img/chnage_a.png',
      title: 'Banking and Financial Services',
      description: 'Enhance operational efficiency and customer satisfaction with cutting-edge technology tailored for banking and finance.'
    },
    {
      image: 'img/product_b.png',
      changeImage: 'img/chnage_b.png',
      title: 'Business Led Solution',
      description: 'Drive growth and efficiency with solutions designed to align with your strategic objectives and deliver measurable results.'
    },
    {
      image: 'img/product_c.png',
      changeImage: 'img/chnage_c.png',
      title: 'UX UI Design solutions',
      description: 'Our UX/UI design solutions ensure seamless interactions and visually stunning designs tailored to your users\' needs.'
    },
    {
      image: 'img/product_d.png',
      changeImage: 'img/chnage_e.png',
      title: 'Digital Solutions',
      description: 'Transform operations, boost efficiency, and drive growth with our innovative digital tools and strategies.'
    }
  ]

  const testimonials: Testimonial[] = [
    {
      name: "Harshvardhan Upadhaya",
      title: "Long Term Investor",
      text: "Great work!!! The team was solid, efficient and knowledgeable. They did an amazing job on my very challenging app",
      image: "img/testimonials.jpg"
    },
    {
      name: "Supriya Sharma",
      title: "Startup Founder",
      text: "Great work!!! The team was solid, efficient and knowledgeable. They did an amazing job on my very challenging app. I will be using them again. Thank you for doing such a great job!",
      image: "img/testimonials-1.jpg"
    },
    {
      name: "neha shukla",
      title: "Entrepreneur",
      text: "Fantastic service! The team provided excellent support and delivered a top-notch product. I highly recommend them.",
      image: "img/testimonials-2.jpg"
    },
    {
      name: "Michael Johnson",
      title: "Startup Founder",
      text: "A pleasure to work with! Their expertise and professionalism exceeded my expectations. I'm very happy with the results.",
      image: "img/testimonials-3.jpg"
    }
  ]

  const faqs: FAQ[] = [
    {
      question: "What services does our IT company offer?",
      answer: "We offer a wide range of services including software development, IT consulting, cybersecurity solutions, cloud computing, data analytics, and managed IT services."
    },
    {
      question: "How can our IT solutions benefit your business?",
      answer: "Our IT solutions can improve your business efficiency, enhance security, reduce costs, and provide insights through data analytics to help you make informed decisions."
    },
    {
      question: "Do you provide custom software development?",
      answer: "Yes, we specialize in custom software development tailored to meet the specific needs of your business, ensuring that the solutions align with your goals and objectives."
    },
    {
      question: "What support options are available for our IT services?",
      answer: "We provide various support options including 24/7 helpdesk support, on-site assistance, remote troubleshooting, and ongoing maintenance to keep your systems running smoothly."
    },
    {
      question: "How do you ensure the quality of your IT solutions?",
      answer: "Quality is ensured through rigorous testing, continuous monitoring, and adherence to industry best practices and standards. We also gather client feedback to make continuous improvements."
    }
  ]

  const achievements: Achievement[] = [
    { num: '#1', title: '200+ Projects Delivered', desc: 'Over 200 projects completed on time.' },
    { num: '#2', title: '95% Client Satisfaction', desc: 'Maintained a 95% satisfaction rate.' },
    { num: '#3', title: 'Advanced Technologies', desc: 'Implemented AI and machine learning.' },
    { num: '#4', title: 'Large-Scale Projects', desc: 'Managed major projects successfully.' },
    { num: '#5', title: 'ISO Certifications', desc: 'ISO 9001 and ISO/IEC 27001 certified.' },
    { num: '#6', title: 'UI/UX Innovation', desc: 'Recognized for exceptional UI/UX design.' },
    { num: '#7', title: 'Sustainable IT Practices', desc: 'Adopted green IT solutions.' },
    { num: '#8', title: 'Strategic Partnerships', desc: 'Formed key industry partnerships.' }
  ]

  const handleProductClick = (changeImage: string) => {
    setSelectedProduct(changeImage)
  }

  const handleTestimonialNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const handleTestimonialPrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  useScrollToTop()

  useEffect(() => {
    // Initialize Tawk.to chat if needed
    if (window.Tawk_API) {
      window.Tawk_API = window.Tawk_API || {}
      ;(window as any).Tawk_LoadStart = new Date()
      const s1 = document.createElement("script")
      const s0 = document.getElementsByTagName("script")[0]
      s1.async = true
      s1.src = 'https://embed.tawk.to/66975a70becc2fed6926838e/1i2vjii5f'
      s1.charset = 'UTF-8'
      s1.setAttribute('crossorigin', '*')
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0)
      }
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <div className="main-hero pt-72 pb-72">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <div className="hero">
                <p className="heading">#buildingtrust</p>
                <h1 className="heading1">Expanding Horizons with Design Tech & Analytics</h1>
                <div className="cards">
                  <div className="card">
                    <img src={`${BASE_URL}/img/star_a.png`} alt="Legacy" />
                    <p className="spans">30 Years of <br /><span>Legacy</span></p>
                  </div>
                  <div className="card">
                    <img src={`${BASE_URL}/img/Group.png`} alt="Clients" />
                    <p className="spans">2700 <br /><span>Satisfied Clients</span></p>
                  </div>
                  <div className="card">
                    <img src={`${BASE_URL}/img/list-check-solid 1.png`} alt="Projects" />
                    <p className="spans">200 <br /><span>Projects</span></p>
                  </div>
                </div>
                <Link to="/aboutus" className="buttonknow">Know More</Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <div className="img">
                <img src={`${BASE_URL}/img/human1.png`} alt="Hero" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="countbg py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-5 col-md-5 mb-4 mb-md-0">
              <h2 className="coun-textrr">Look at our stats</h2>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7">
              <div className="row g-4">
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="counter-onebox">
                    <div className="counter_boxnumber">
                      <h2>30</h2>
                      <p className="counter_boxnumber-text1">Years of Experience</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="counter-onebox counter-middle">
                    <div className="counter_boxnumber">
                      <h2>180</h2>
                      <p className="counter_boxnumber-text1">Projects</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="counter-onebox counter-onebox-tt">
                    <div className="counter_boxnumber">
                      <h2>2,700</h2>
                      <p className="counter_boxnumber-text1">Happy clients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <div className="thirdsection pt-72 pb-72">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h6 className="small-text">wonder why us</h6>
              <h1 className="header-text">Why Choose Us?</h1>
              <p className="para">We tailor solutions to meet your unique business needs</p>
            </div>
            <div className="col-md-4">
              <div className="cark mx-auto">
                <img src={`${BASE_URL}/img/why.png`} alt="Quality Assurance" />
                <p>Quality Assurance<span>As ISO 9001 certified, our commitment to quality management ensures that every solution we deliver meets rigorous standards of reliability, security, and performance.</span></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cark mx-auto">
                <img src={`${BASE_URL}/img/why_a.png`} alt="Strong reputation" />
                <p>Strong reputation<span>Our portfolio showcases our ability to turn complex challenges into success stories, delivering measurable results and tangible business value.</span></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cark mx-auto">
                <img src={`${BASE_URL}/img/why_g.png`} alt="Customized solutions" />
                <p>Customized solutions<span>Our agile methodology ensures flexibility and responsiveness to your evolving needs.</span></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cark mx-auto">
                <img src={`${BASE_URL}/img/why_d.png`} alt="Innovative & powerful platforms" />
                <p>Innovative & powerful platforms<span>We specialize in harnessing the latest technologies like AI, blockchain, and IoT to develop cutting-edge solutions that propel your business forward.</span></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cark mx-auto">
                <img src={`${BASE_URL}/img/why_e.png`} alt="Reliable & dependable support" />
                <p>Reliable & dependable support<span>Our portfolio showcases our ability to turn complex challenges into success stories, delivering measurable results and tangible business value.</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="products-section pt-72 pb-72">
        <div className="container">
          <div className="head-product">
            <h6 className="small-text">Transform digital assets with user-centric solutions</h6>
            <p className="header-text1">Solutions We Provide</p>
          </div>
          <div className="products row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 mr-3">
              <div className="product-cards-container">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className={`product-card ${selectedProduct === product.changeImage ? 'active' : ''}`}
                    onClick={() => handleProductClick(product.changeImage)}
                    style={{ backgroundColor: selectedProduct === product.changeImage ? 'rgb(245 249 255)' : 'white' }}
                  >
                    <img src={`${BASE_URL}/${product.image}`} alt={product.title} />
                    <p>
                      {product.title}
                      <span>{product.description}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6">
              <div className="product-image-container">
                <img src={`${BASE_URL}/${selectedProduct}`} className="productimage" id="mainProductImage" alt="Product" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Branches Section */}
      <div className="brances">
        <div className="brances-img">
          <img src={`${BASE_URL}/img/place.png`} className="img-fluid" alt="Branches" />
        </div>
        <div className="text-branches">
          <h5>Explore our prime location</h5>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact pt-72 pb-72">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <div className="left-section-contact">
                <h5>Transformations Happen with Insight-Driven Thinking</h5>
                <h4>Feel free to contact us</h4>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 d-flex justify-content-end">
              <div className="left-section-contact">
                <ul className="d-flex justify-content-end">
                  <li>
                    <a href="https://wa.me/918146511568" target="_blank" rel="noopener noreferrer">
                      <img src={`${BASE_URL}/img/contact-a.png`} alt="WhatsApp" className="img-fluid" />
                    </a>
                  </li>
                  <li>
                    <a href="tel:+918146511568">
                      <img src={`${BASE_URL}/img/contact-b.png`} alt="Phone" className="img-fluid" />
                    </a>
                  </li>
                  <li>
                    <a href="mailto:support@centennialinfotech.com">
                      <img src={`${BASE_URL}/img/contact_c.png`} alt="Mail" className="img-fluid" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <div className="achievement pb-72">
        <div className="container">
          <div className="row">
            <div className="col-12 header-arch">
              <h6 className="small-text">Another reason why to choose us</h6>
              <h3 className="main-heading">Our Achievements: Celebrating New Heights</h3>
              <p className="peragraph-text">And we're proud of it</p>
            </div>
            {achievements.map((achievement, index) => (
              <div key={index} className="col-sm-3 col-md-3 pb-4">
                <div className="archieve-img">
                  <img src={`${BASE_URL}/img/archieve.png`} alt={`Achievement ${index + 1}`} />
                </div>
                <div className="archieve-text">
                  <h5>{achievement.num}</h5>
                  <h4>{achievement.title}</h4>
                  <p>{achievement.desc}</p>
                </div>
                <div className="archieve-img-right">
                  <img src={`${BASE_URL}/img/archive_b.png`} alt="Achievement Icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="blogs pb-72">
        <div className="container">
          <div className="row">
            <div className="header-arch">
              <h6 className="small-text">Get expert tips and best practices</h6>
              <h3 className="main-heading">Industry Insights</h3>
              <p className="peragraph-text">Stay updated on IT news, emerging technologies, and market trends</p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <div className="blog_section">
                <div className="img-blog">
                  <img src={`${BASE_URL}/img/blog_img.jpg`} alt="Blog" />
                </div>
                <div className="img-blog-text">
                  <span>Positive</span>
                  <h4>October 30, 2022</h4>
                </div>
                <div className="text-blog">
                  <h3>Latest developments and applications in AI and machine learning</h3>
                </div>
                <div className="btn-button">
                  <Link to="/blogs" className="btn-btn">know more</Link>
                </div>
              </div>
              <div className="blog_section">
                <div className="img-blog">
                  <iframe
                    src="https://www.youtube.com/embed/KWT2SILhOmg?si=0hRscwLmeC3uls41"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="img-blog-text">
                  <span>Positive</span>
                  <h4>October 30, 2022</h4>
                </div>
                <div className="text-blog">
                  <h3>Innovations in blockchain technology and its impact on various industries.</h3>
                </div>
                <div className="btn-button">
                  <Link to="/blogs" className="btn-btn">know more</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              {[
                'In-depth reports on market size, growth, and emerging opportunities.',
                'The latest trends in innovation and product development within the tech industry.',
                'Innovations in VR and AR and their impact on gaming, training, and more.'
              ].map((title, index) => (
                <div key={index} className="blog_section-right">
                  <div className="img-blog-text">
                    <span>Positive</span>
                    <h4>October 30, 2022</h4>
                  </div>
                  <div className="text-blog">
                    <h3>{title}</h3>
                    <div className="icons-right">
                      <Link to="/blogs">
                        <img src={`${BASE_URL}/img/ArrowLeft.png`} alt="Arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="btn-main text-center">
              <Link to="/blogs" className="btn-btn">know more</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-row pt-72 pb-72">
        <div className="container">
          <div className="testimonials-item">
            <div className="item">
              <h5 className="customer">We <img src={`${BASE_URL}/img/heart.png`} alt="love" /> our clients</h5>
              <h2 className="customer1">What do people praise about centennial?</h2>
              <p className="customer2">our client testimonials</p>
            </div>
            <div className="slider">
              <div className="imgtt">
                {testimonials.map((testimonial, index) => (
                  <img
                    key={index}
                    src={`${BASE_URL}/${testimonial.image}`}
                    alt={`Testimonial ${index + 1}`}
                    className="imgt"
                    style={{ display: index === currentTestimonial ? 'none' : 'inline-block' }}
                  />
                ))}
              </div>
              <div className="right-item-testi">
                <div className="large-img">
                  <img src={`${BASE_URL}/${testimonials[currentTestimonial].image}`} alt="Testimonial" className="imgt1" />
                </div>
                <div className="text-content">
                  <div className="testimonials-item">
                    <h5 className="name">{testimonials[currentTestimonial].name}</h5>
                    <h5 className="name1">{testimonials[currentTestimonial].title}</h5>
                    <p className="name2">"{testimonials[currentTestimonial].text}"</p>
                  </div>
                  <div className="buttons">
                    <button type="button" className="btnn1" onClick={handleTestimonialNext}>
                      <img src={`${BASE_URL}/img/arrow_new_left.png`} alt="Previous" />
                    </button>
                    <button type="button" className="btnn2" onClick={handleTestimonialPrev}>
                      <img src={`${BASE_URL}/img/arrow_new.png`} alt="Next" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="question pt-72 pb-72">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <div className="header-text text-left">
                <h6 className="small-text">Common Queries</h6>
                <h3 className="main-heading">Frequently Asked Questions</h3>
                <p className="peragraph-text">Answers to Your Questions</p>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              {faqs.map((faq, index) => (
                <div key={index} className="header-text text-right">
                  <button
                    className={`accordion ${activeAccordion === index ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <img className="arrow-accordian" src={`${BASE_URL}/img/arrow.png`} alt="Arrow" />
                    {faq.question}
                  </button>
                  <div className="panel" style={{ display: activeAccordion === index ? 'block' : 'none' }}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
