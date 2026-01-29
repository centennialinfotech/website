import Breadcrumb from '../components/Breadcrumb'
import ContactForm from '../components/ContactForm'
import NewsletterForm from '../components/NewsletterForm'
import { BASE_URL } from '../config/env'
import useScrollToTop from '../hooks/useScrollToTop'

function Contact() {
  useScrollToTop()

  return (
    <>
      <Breadcrumb
        title="contact Us"
        items={[
          { label: 'Home', link: '/' },
          { label: 'contact Us' }
        ]}
      />

      {/* Contact Form Section */}
      <div className="contact-submain mb-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
              <div className="contact-left">
                <div>
                  <img src={`${BASE_URL}/img/contact.png`} alt="Contact" />
                </div>
                <div className="cl-num">
                  <div className="contact-info">
                    <i className="fas fa-phone contact-icon"></i>
                    <p>+91-01723596492, +91-81465 11568</p>
                  </div>
                  <div className="contact-info">
                    <i className="fas fa-envelope contact-icon"></i>
                    <p>support@centennialinfotech.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2824667172076!2d76.70077217455241!3d30.710458574595016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef93454505e9%3A0x5356b7839426918d!2sCentennial%20Infotech!5e0!3m2!1sen!2sin!4v1721139251471!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0, overflowX: 'hidden', marginBottom: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Centennial Infotech Location"
        ></iframe>
      </div>

      {/* Newsletter Section */}
      <NewsletterForm />
    </>
  )
}

export default Contact
