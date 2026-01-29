import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { BASE_URL } from '../config/env'
import useScrollToTop from '../hooks/useScrollToTop'

function Services() {
  useScrollToTop()

  const [mainImage, setMainImage] = useState(`${BASE_URL}/img/ui.jpeg`)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    // Initialize intl-tel-input
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/js/intlTelInput.min.js'
    script.async = true
    document.body.appendChild(script)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/css/intlTelInput.css'
    document.head.appendChild(link)

    script.onload = () => {
      // Initialize intl-tel-input after script loads
      const initIntlTel = () => {
        const mobileInput = document.getElementById('mobile') as HTMLInputElement
        if ((window as any).intlTelInput && mobileInput) {
          ;(window as any).intlTelInput(mobileInput, {
            autoHideDialCode: true,
            autoPlaceholder: 'ON',
            dropdownContainer: document.body,
            formatOnDisplay: true,
            initialCountry: 'us',
            placeholderNumberType: 'MOBILE',
            preferredCountries: ['us', 'gb', 'in'],
            separateDialCode: true
          })
        }
      }
      setTimeout(initIntlTel, 100)
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  const handleImageChange = (imagePath: string) => {
    setMainImage(`${BASE_URL}/${imagePath}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleFormSubmission = async () => {
    const fullName = formData.fullName.trim()
    const email = formData.email.trim()
    const phone = formData.phone.trim()

    if (!fullName) {
      alert('Full Name is required')
      return
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email')
      return
    }

    if (!isValidPhone(phone)) {
      alert('Please enter a valid phone number')
      return
    }

    // Get country data from intl-tel-input
    const mobileInput = document.getElementById('mobile') as HTMLInputElement
    let countryCode = ''
    if (mobileInput && (window as any).intlTelInput) {
      try {
        const iti = (window as any).intlTelInputGlobals?.getInstance(mobileInput)
        if (iti) {
          const countryData = iti.getSelectedCountryData()
          countryCode = countryData?.dialCode || ''
        }
      } catch (e) {
        console.error('Error getting country code:', e)
      }
    }

    const data = { fullName, email, phone: `+${countryCode}${phone}` }

    try {
      const response = await fetch('https://ccc-cdcp.onrender.com/service-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      if (result.success) {
        alert('Your request has been submitted successfully!')
        setFormData({ fullName: '', email: '', phone: '' })
      } else {
        alert('There was an error submitting your request.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('There was an error submitting your request.')
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\d{10,14}$/
    return phoneRegex.test(phone)
  }

  const services = [
    { id: 'UI/UX-Design', title: 'UI/UX Design', description: 'Designing intuitive and engaging interfaces that enhance user satisfaction and drive engagement.', image: 'img/services-3.png', mainImage: 'img/ui.jpeg' },
    { id: 'Quality-Assurance', title: 'Quality Assurance', description: 'Ensuring your products meet the highest standards of quality and performance.', image: 'img/services-5.png', mainImage: 'img/qa.jpeg' },
    { id: 'Web-development', title: 'Web development', description: 'Crafting exceptional websites that are not only visually appealing but also highly functional.', image: 'img/services-2.png', mainImage: 'img/web.jpeg' },
    { id: 'Software-Development', title: 'Software Development', description: 'Delivering excellence in software that empowers your vision and drives your business forward.', image: 'img/services-4.png', mainImage: 'img/software.jpeg' },
    { id: 'App-development', title: 'App development', description: 'Crafting exceptional websites that are not only visually appealing but also highly functional.', image: 'img/services-user.png', mainImage: 'img/app.jpeg' },
    { id: 'IT-Consulting', title: 'IT Consulting', description: 'Providing expert guidance to help you navigate the complexities of the IT landscape.', image: 'img/services-6.png', mainImage: 'img/it.png' }
  ]

  const industries = [
    { title: 'Professional services', description: 'Enhancing business operations with tailored IT solutions', image: 'img/industries_1.png' },
    { title: 'Healthcare services', description: 'Improving patient care and operational efficiency through innovative technology.', image: 'img/cloud.png' },
    { title: 'Real estate services', description: 'Revolutionizing property management and customer engagement with custom software.', image: 'img/computer.png', height: '482px' },
    { title: 'IT services', description: 'Providing cutting-edge solutions to drive IT innovation and performance.' },
    { title: 'Education', description: 'Transforming learning experiences with state-of-the-art educational technology solutions.', image: 'img/industries_3.png' },
    { title: 'Construction services', description: 'Streamlining project management and collaboration with advanced IT tools.', image: 'img/industries_2.png' }
  ]

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

  const achievements = [
    { number: '#1', title: '200+ Projects Delivered', description: 'Over 200 projects completed on time.' },
    { number: '#2', title: '95% Client Satisfaction', description: 'Maintained a 95% satisfaction rate.' },
    { number: '#3', title: 'Advanced Technologies', description: 'Implemented AI and machine learning.' },
    { number: '#4', title: 'Large-Scale Projects', description: 'Managed major projects successfully.' },
    { number: '#5', title: 'ISO Certifications', description: 'ISO 9001 and ISO/IEC 27001 certified.' },
    { number: '#6', title: 'UI/UX Innovation', description: 'Recognized for exceptional UI/UX design.' },
    { number: '#7', title: 'Sustainable IT Practices', description: 'Adopted green IT solutions.' },
    { number: '#8', title: 'Strategic Partnerships', description: 'Formed key industry partnerships.' }
  ]

  return (
    <>
      <Breadcrumb
        title="Solutions"
        items={[
          { label: 'Home', link: '/' },
          { label: 'Solutions' }
        ]}
      />

      {/* Services Banner */}
      <section className="servicesbg">
        <div className="container-fluid pb-5">
          <div>
            <img src={`${BASE_URL}/img/services_icon_2.png`} alt="icon" className="img-fluid" />
            <img src={`${BASE_URL}/img/Ellipse 1.png`} alt="icon" className="services-one__shape-2 img-fluid" />
          </div>

          <h2 className="services_banner_title">
            Your business deserves the best. <span className="services_banner_title_rt">Trust</span>
            <br />
            our solutions to deliver
          </h2>
          <h3 className="services-wt">Take control of your business. Begin your journey with us!</h3>

          <div>
            <img src={`${BASE_URL}/img/services_icon.png`} alt="icon" className="img-fluid services-one__shape-2" />
          </div>
        </div>

        <div className="container pb-5">
          <img src={`${BASE_URL}/img/services_icon_1.png`} alt="img" className="services-one__shape-4" />

          <div className="mt-5 services_contact_bg">
            <h3 className="services_contact_title">Let's take your requirement</h3>
            <div className="row mt-4 row justify-content-center">
              <div className="col-xl-3 col-lg-3 col-md-3 mb-4">
                <input
                  className="form-control services_contact_input"
                  type="text"
                  placeholder="Full Name"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 mb-4">
                <input
                  className="form-control services_contact_input"
                  type="email"
                  placeholder="Email id"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-xl-3 col-lg-4 col-md-3 mb-4">
                <input
                  id="mobile"
                  className="form-control services_contact_input"
                  type="tel"
                  placeholder="XXXXXXXXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="btn-contact">
              <button className="services_contact_btn btn btn--action" onClick={handleFormSubmission}>
                Get a quick solution
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div className="container pb-72 pt-72">
        <h5 className="abouttext">Services at a Glance</h5>
        <h2 className="abouttext-rt">Services we are offering</h2>
        <p className="abouttext-wt">Here's a list to help you along your way</p>

        <div className="row pt-5">
          <div className="col-xl-7 col-xl-7 col-lg-12 col-md-12 col-sm-12">
            <div className="row">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`col-xl-6 col-lg-6 col-md-6 ${index % 2 === 1 ? 'pt-3' : ''}`}
                  id={service.id}
                  onClick={() => handleImageChange(service.mainImage)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="services-one__single">
                    <div className="services-one__icon">
                      <img src={`${BASE_URL}/${service.image}`} alt="img" className="img-fluid" />
                    </div>
                    <div className="services-one__content-box">
                      <h3 className="services-one__title">{service.title}</h3>
                      <p className="services-one__text">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-xl-5 col-xl-5 col-lg-12 col-md-12 col-sm-12">
            <img src={mainImage} alt="img" className="img-fluid services__imgt services-img" id="main-image" />
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <div className="container">
        <h6 className="small-text text-center">Industries</h6>
        <h2 className="industries-rt">Industries we have worked before</h2>
        <p className="industries-wt">
          We make it easy to get started investing with our platforms to get you on the right track
        </p>

        <div className="row pt-3">
          <div className="col-xl-3 col-lg-3 col-md-6">
            <div className="industries-one__single">
              <div className="industries-one__single-inner">
                <h3 className="services-one__title">{industries[0].title}</h3>
                <p className="industries-one__text">{industries[0].description}</p>
              </div>
              <img src={`${BASE_URL}/${industries[0].image}`} alt="img" className="img-fluid services-one" />
            </div>

            <div className="industries-one__single">
              <div className="industries-one__single-inner">
                <h3 className="services-one__title">{industries[1].title}</h3>
                <p className="industries-one__text">{industries[1].description}</p>
                <img src={`${BASE_URL}/${industries[1].image}`} alt="img" className="img-fluid services-one" />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="industries-one__single" style={{ height: '482px' }}>
              <div className="industries-one__single-inner">
                <h3 className="services-one__title">{industries[2].title}</h3>
                <p className="industries-one__text">{industries[2].description}</p>
                <img src={`${BASE_URL}/${industries[2].image}`} alt="img" className="img-fluid pt-5" />
              </div>
            </div>
          </div>

          <div className="col-xl-5 col-lg-5 col-md-12">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="industries-one__single">
                  <div className="industries-one__single-inner">
                    <h3 className="services-one__title">{industries[3].title}</h3>
                    <p className="industries-one__text">{industries[3].description}</p>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="industries-one__single">
                  <div className="industries-one__single-inner">
                    <h3 className="services-one__title">{industries[4].title}</h3>
                    <p className="industries-one__text">{industries[4].description}</p>
                  </div>
                  <img
                    src={`${BASE_URL}/${industries[4].image}`}
                    alt="img"
                    className="img-fluid industries-one__imgt"
                    style={{ float: 'right' }}
                  />
                </div>
              </div>
            </div>

            <div className="industries-one__single">
              <div className="industries-one__single-inner">
                <h3 className="services-one__title">{industries[5].title}</h3>
                <p className="industries-one__text">{industries[5].description}</p>
              </div>
              <img src={`${BASE_URL}/${industries[5].image}`} alt="img" className="img-fluid industires_img_wt" />
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="container mt-5">
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

      {/* Platform Section */}
      <div className="container pt-5 pt-72 text-center">
        <h6 className="small-text">Industry</h6>
        <h2 className="industries-rt">Unlock Market Possibilities With Our Platforms</h2>
        <p className="industries-wt">
          We make it easy to get started investing with our platforms to get you on the right track
        </p>
        <div className="pt-5">
          <img src={`${BASE_URL}/img/assets.png`} className="img-fluid" alt="img" />
        </div>
      </div>

      {/* Client Logos */}
      <div className="container pt-5 text-center">
        <h6 className="small-text">Clients We Serve</h6>
        <h2 className="industries-rt">Trusted Clients</h2>
        <p className="industries-wt">Check out our diverse investment products that suit your financial goals</p>

        <div className="row pt-4">
          {clientLogos.map((logo, index) => (
            <div key={index} className="col-xl-3 col-lg-3 col-md-3">
              <div className="clientlogo-one__single">
                <div className="clientlogo-one__single-inner">
                  <img src={`${BASE_URL}/${logo}`} alt="img" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievement pb-72 pt-72">
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
                  <h5>{achievement.number}</h5>
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                </div>
                <div className="archieve-img-right">
                  <img src={`${BASE_URL}/img/archive_b.png`} alt="Achievement Icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Services
