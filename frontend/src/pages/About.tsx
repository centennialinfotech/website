import Breadcrumb from '../components/Breadcrumb'
import { BASE_URL } from '../config/env'
import useScrollToTop from '../hooks/useScrollToTop'

interface MissionItem {
  img: string
  title: string
  text: string
}

interface CoreValue {
  img: string
  title: string
  text: string
}

interface Counter {
  number: string
  text: string
}

interface TeamMember {
  bg: string
  photo: string
  title: string
  name: string
}

interface TimelineStep {
  num: string
  title: string
  text: string
}

function About() {
  useScrollToTop()

  const missionItems: MissionItem[] = [
    { img: 'img/why_a.png', title: 'Innovation-Driven', text: 'We leverage the latest technologies to create innovative solutions that drive success.' },
    { img: 'img/why_g.png', title: 'Client-Centric', text: 'Your satisfaction is our priority, and we strive to exceed your expectations in every project.' },
    { img: 'img/why_d.png', title: 'Quality Focus', text: 'We are committed to delivering high-quality services that meet the highest industry standards.' },
    { img: 'img/why_e.png', title: 'Ethical Practices', text: 'We adhere to the highest ethical standards, ensuring transparency and integrity in all our dealings.' }
  ]

  const coreValues: CoreValue[] = [
    { img: 'img/why_a.png', title: 'Integrity', text: 'We uphold the highest standards of integrity in all our actions, ensuring honesty, transparency, and accountability in every project.' },
    { img: 'img/why_a.png', title: 'Respect', text: 'We treat everyone with respect, valuing diverse perspectives and fostering an inclusive environment where everyone can thrive.' },
    { img: 'img/why_a.png', title: 'Responsibility', text: 'We take responsibility for our actions and their impact on our clients, our team, and the wider community. We are committed to making a positive difference.' },
    { img: 'img/why_a.png', title: 'Adaptability', text: 'We remain flexible and adaptable, ready to embrace change and seize new opportunities in a fast-paced technological landscape.' }
  ]

  const counters: Counter[] = [
    { number: '4Lakh', text: 'Happy customer' },
    { number: '12k', text: 'Complete projects' },
    { number: '3000', text: 'Customer review' }
  ]

  const teamMembers: TeamMember[] = [
    { bg: 'img/Rectangle 40273.png', photo: 'img/team_1.png', title: 'IT Head Team Lead', name: 'Brijesh Srivastava' },
    { bg: 'img/Rectangle 40274.png', photo: 'img/team_4.png', title: 'Business analyst', name: 'Aaditya sharma' },
    { bg: 'img/Rectangle 40275.png', photo: 'img/team_5.png', title: 'UX UI lead', name: 'Tunisha sharma' }
  ]

  const timelineSteps: TimelineStep[] = [
    { num: 'one', title: 'Initial Consultation', text: 'Understanding the client\'s needs and goals. Gathering detailed requirements and expectations.' },
    { num: 'two', title: 'Proposal & Agreement', text: 'Developing and presenting a customized solution and agreement signing, finalizing the terms and conditions.' },
    { num: 'thiree', title: 'Planning & Design', text: 'Creating a detailed project plan with timelines, and developing initial design concepts and prototypes.' },
    { num: 'four', title: 'Development', text: 'Writing code and building the solution. Providing regular progress updates to the client.' },
    { num: 'fifth', title: 'testing & Quality Assurance', text: 'Conducting thorough testing to identify and fix bugs. Ensuring the solution meets all requirements and standards.' },
    { num: 'sex', title: 'Deployment', text: 'Preparing the solution for deployment. Deploying the solution to the live environment.' }
  ]

  return (
    <>
      <Breadcrumb
        title="About Us"
        items={[
          { label: 'Home', link: '/' },
          { label: 'About Us' }
        ]}
      />

      {/* About US start */}
      <section className="aboutbg">
        <div className="container">
          <h5 className="abouttext">Leading with Integrity</h5>
          <h2 className="abouttext-rt">Our Mission</h2>
          <p className="para text-start">Driving Innovation, Delivering Excellence.</p>

          <div className="row pt-4">
            <div className="col-sm-6 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
              <p className="abouttext_para">
                At Centennial Infotech, our mission is to transform your ideas into reality with cutting-edge technology and innovative solutions. We strive to deliver satisfactory results that not only meet but exceed your expectations. Our goal is to expand our scope of services continuously and keep up with the evolving technological landscape to provide the best solutions to our clients.
              </p>
              <img src={`${BASE_URL}/img/aboutuser.png`} alt="About Us" className="img-fluid pt-4" />
            </div>

            <div className="col-sm-6 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
              <div className="row pt-5">
                {missionItems.map((item, index) => (
                  <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                    <div className="aboutpd-one__single">
                      <img src={`${BASE_URL}/${item.img}`} alt={item.title} />
                      <h3 className="aboutpd-one__title">{item.title}</h3>
                      <p className="aboutpd-one__text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="aboutprdocut_bg">
        <div className="container">
          <h5 className="aboutprdocuttext">Unwavering Commitment to Quality</h5>
          <h2 className="aboutprdocut-rt">our Core values</h2>
          <p className="para">Embodying Integrity, Striving for Excellence.</p>

          <div className="row pt-4">
            {coreValues.map((item, index) => (
              <div key={index} className="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <div className="aboutprdocut-one__single">
                  <img src={`${BASE_URL}/${item.img}`} alt={item.title} />
                  <h3 className="aboutprdocut-one__title">{item.title}</h3>
                  <p className="aboutprdocut-one__text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="aboutbg pt-72">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <h5 className="abouttext">Leading with Purpose and Passion</h5>
              <h2 className="abouttext-rt">our Vision</h2>
              <p className="para text-start">Pioneering Progress, Shaping the Future.</p>
              <br />
              <p className="abouttext_para">
                To be a leader in the IT services industry, known for our innovative solutions, exceptional quality, and unwavering commitment to client satisfaction. We aim to build lasting relationships with our clients by consistently delivering value and exceeding expectations.
                Thank you for choosing Centennial Infotech. We look forward to partnering with you on your journey to success.
              </p>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 pt-5">
              <img src={`${BASE_URL}/img/vision.jpg`} alt="Vision" className="img-fluid" style={{ borderRadius: '32px' }} />
            </div>
          </div>
        </div>

        {/* Count Section */}
        <div className="container pt-5">
          <div className="about__countbg">
            <div className="row">
              {counters.map((item, index) => (
                <div key={index} className="col-xl-4 col-lg-4 col-md-4">
                  <div className="aboutcounter-onebox">
                    <div className="aboutcounter_boxnumber">
                      <h2>{item.number}</h2>
                      <p className="aboutcounter_boxnumber-text1">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="ourhistorybg">
        <div className="container">
          <h5 className="ourhistorytext">Evolution Through the Years</h5>
          <h2 className="ourhistorytext-rt">our History</h2>
          <p className="para text-start">Tracing Milestones, Building Legacy</p>

          <div className="wavetimeline">
            <img src={`${BASE_URL}/img/processgr.png`} alt="Timeline" className="img-fluid" />
            <div className="waverr">
              <div className="ourhistory__single ourhistory__single_two">
                <h3 className="ourhistory__title">2024 founded</h3>
                <p className="ourhistory__text">
                  The company was founded by Mr. Pankaj In May 2024, and since then we have continued to excel in the services we provide.
                </p>
                <span className="ourhistory_num ourhistory_num_one">1</span>
              </div>
            </div>
            <div className="waverr2">
              <div className="ourhistory__single ourhistory__single_one">
                <h3 className="ourhistory__title">100+ Customers</h3>
                <p className="ourhistory__text">
                  Since May 2024, we have successfully served over 100 happy customers, delivering innovative solutions and exceptional service. Our commitment to excellence and customer-centric approach have enabled us to build strong, lasting relationships with our clients.
                </p>
                <span className="ourhistory_num ourhistory_num_two">2</span>
              </div>
            </div>
            <div className="waverr3">
              <div className="ourhistory__single ourhistory__single_three">
                <h3 className="ourhistory__title">15+ professionals</h3>
                <p className="ourhistory__text">
                  At Centennial Infotech, our strength lies in our dedicated and talented team of over 15 professionals. Each member of our team brings a wealth of expertise and a passion for excellence, driving our commitment to delivering top-tier services in web development, mobile app development, UI/UX design, software development, and IT consulting.
                </p>
                <span className="ourhistory_num ourhistory_num_three">3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team_bg">
        <div className="container">
          <h5 className="teamtext">Strategic Minds Behind Our Growth</h5>
          <h2 className="textteam-rt">our leadership team</h2>

          <div className="row pt-5">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-xl-4 col-lg-4 col-md-4">
                <img src={`${BASE_URL}/${member.bg}`} alt="Team Background" className="img-fluid" />
                <div className="pt-3">
                  <img src={`${BASE_URL}/${member.photo}`} alt={member.name} className="img-fluid team_imgtt" />
                  <h3 className="team__title">{member.title}</h3>
                  <p className="team__titletext">{member.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline_bg">
        <div className="container">
          <h5 className="teamtext">How We Deliver Quality</h5>
          <h2 className="textteam-rt">The process</h2>
          <p className="para">Precision in Action, Excellence in Results.</p>
          
          <div className="timeline">
            <ul>
              {timelineSteps.map((step, index) => (
                <li key={index} className={`timelinenume_${step.num}`}>
                  <span className="timeline_title">{step.title}</span>
                  <div className="timeline_titletext">
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
              <div style={{ clear: 'both' }}></div>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
