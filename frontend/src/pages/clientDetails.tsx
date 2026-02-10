import { useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'
import { getCloudinaryUrl } from '../utils/imageUrl'

function ClientDetails() {
  useScrollToTop()

  // State to handle the tabs (Problem, Challenge, Solution, Result, Feedback)
  const [activeTab, setActiveTab] = useState('menu1')

  return (
    <>
      {/* Custom Internal Style to remove boxes and style text */}
      <style>
        {`
          .fade:not(.show) {
            opacity: 1;
          }

          /* Removes the button box styling */
          .nav-tabs1 .btn-tab-link {
            background: none;
            border: none;
            padding: 12px 0;
            font-size: 24px; 
            color: #333;
            text-transform: capitalize;
            cursor: pointer;
            display: block;
            width: 100%;
            text-align: left; /* Align text to the left like a list */
            transition: all 0.3s ease;
            outline: none;
          }

          /* Active tab styling - changes color and weight */
          .nav-tabs1 .active .btn-tab-link {
            color: #007bff; 
            font-weight: 600;
          }

          /* Hover effect */
          .nav-tabs1 .btn-tab-link:hover {
            color: #007bff;
          }

          /* Spacing for the list items */
          .nav-tabs1 label {
            display: block;
            margin-bottom: 15px;
            cursor: pointer;
          }
        `}
      </style>

      {/* Breadcrumb Section */}
      <section className="breadcrumb-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <div className="breadcrumb__link">
                  <ul>
                    <li><Link to="/">Home </Link></li>
                    <li>Solution</li>
                  </ul>
                </div>
              </div>
              <h2 className="title">Solution</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Top Details Section */}
      <section className="servicesbg">
        <div className="container-fluid">
          <div>
            <img src={getCloudinaryUrl('img/services_icon_2.png')} alt="icon" className="img-fluid" />
            <img src={getCloudinaryUrl('img/Ellipse 1.png')} alt="icon" className="services-one__shape-2 img-fluid" />
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-8">
              <h2 className="client-details-title">Redesigning the Navigation for an Educational Platform</h2>
              <p className="client-details-para">
                An educational platform, offering a wide range of courses and resources, faced significant challenges with its navigation system. 
                Users reported difficulties in finding the content they needed, leading to frustration, reduced engagement, and lower course enrollment rates. 
                A well-organized navigation system is critical for an educational platform to ensure users can easily and efficiently access the educational materials they need.
              </p>

              <h6 className="client-details-title-t1">user experience (UX) design and web development</h6>
              <p className="client-details-para1">
                This specifically focuses on improving how users interact with and navigate through a website or application.
              </p>

              <h6 className="client-details-title-t1">platform</h6>
              <p className="client-details-para1">IOS, Android</p>
            </div>

            <div className="col-sm-4 col-md-4 col-lg-4">
              <img src={getCloudinaryUrl('img/client-review1.png')} alt="review" className="img-fluid pt-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Case Study Content */}
      <section className="clientdetailsbg">
        <div className="container">
          <div className="row">
            {/* Tab Navigation Sidebar - Boxes Removed */}
            <div className="col-sm-3 col-md-3 col-lg-3">
              <div className="list nav nav-tabs1 flex-column">
                <label className={activeTab === 'menu1' ? 'active' : ''}>
                  <button className="btn-tab-link" onClick={() => setActiveTab('menu1')}>problem</button>
                </label>
                <label className={activeTab === 'menu2' ? 'active' : ''}>
                  <button className="btn-tab-link" onClick={() => setActiveTab('menu2')}>challenge</button>
                </label>
                <label className={activeTab === 'menu3' ? 'active' : ''}>
                  <button className="btn-tab-link" onClick={() => setActiveTab('menu3')}>solution</button>
                </label>
                <label className={activeTab === 'menu4' ? 'active' : ''}>
                  <button className="btn-tab-link" onClick={() => setActiveTab('menu4')}>result</button>
                </label>
                <label className={activeTab === 'menu5' ? 'active' : ''}>
                  <button className="btn-tab-link" onClick={() => setActiveTab('menu5')}>feedback</button>
                </label>
              </div>
            </div>

            {/* Tab Panes */}
            <div className="col-sm-9 col-md-9 col-lg-9 tab-content">
              {activeTab === 'menu1' && (
                <div className="tab-pane fade show active" id="menu1">
                  <div className="row pt-4">
                    <div className="col-sm-8">
                      <p className="clientdetails-one-para pt-3">
                        Users were struggling to find courses and resources on the educational platform due to a complex and non-intuitive navigation system.
                      </p>
                    </div>
                    <div className="col-sm-4">
                      <img src={getCloudinaryUrl('img/clientreview2.png')} alt="problem" className="img-fluid" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'menu2' && (
                <div className="tab-pane fade show active" id="menu2">
                  <div className="row pt-4">
                    <div className="col-sm-8">
                      <p className="clientdetails-one-para pt-3">
                        The platform had a vast amount of content that was poorly organized, leading to user frustration and decreased engagement.
                      </p>
                    </div>
                    <div className="col-sm-4">
                      <img src={getCloudinaryUrl('img/clientreview2.png')} alt="challenge" className="img-fluid" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'menu3' && (
                <div className="tab-pane fade show active" id="menu3">
                  <div className="row pt-4">
                    <div className="col-sm-8">
                      <p className="clientdetails-one-para pt-3"><b>User Research:</b> Conducted user research to understand navigation pain points and gather insights on user needs.</p>
                      <p className="clientdetails-one-para pt-3"><b>Information Architecture:</b> Reorganized the site’s information architecture to create a logical and user-friendly structure.</p>
                      <p className="clientdetails-one-para pt-3"><b>Mega Menu:</b> Introduced a mega menu to provide a comprehensive overview of all available categories and subcategories.</p>
                      <p className="clientdetails-one-para pt-3"><b>Search Enhancements:</b> Improved the search functionality with predictive text, filters, and sorting options to help users find content quickly.</p>
                      <p className="clientdetails-one-para pt-3"><b>Consistent UI Elements:</b> Ensured consistent use of UI elements and visual cues across the platform to guide users intuitively.</p>
                    </div>
                    <div className="col-sm-4">
                      <img src={getCloudinaryUrl('img/clientreview2.png')} alt="solution" className="img-fluid" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'menu4' && (
                <div className="tab-pane fade show active" id="menu4">
                  <div className="row pt-4">
                    <div className="col-sm-8">
                      <p className="clientdetails-one-para pt-3"><b>Increased User Engagement:</b> User engagement metrics, such as time on site and page views per session, increased by 40%.</p>
                      <p className="clientdetails-one-para pt-3"><b>Lower Bounce Rates:</b> The bounce rate decreased by 25%, indicating users were finding the content they needed more efficiently.</p>
                      <p className="clientdetails-one-para pt-3"><b>Improved Course Enrollment:</b> Course enrollment rates saw a 30% increase, showing that users were able to navigate to desired courses more easily.</p>
                    </div>
                    <div className="col-sm-4">
                      <img src={getCloudinaryUrl('img/clientreview2.png')} alt="result" className="img-fluid" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'menu5' && (
                <div className="tab-pane fade show active" id="menu5">
                  <div className="row pt-4">
                    <div className="col-sm-8">
                      <p className="clientdetails-one-para pt-3"><b>User Feedback:</b> Users provided positive feedback through surveys, praising the new navigation for its clarity and ease of use.</p>
                      <p className="clientdetails-one-para pt-3"><b>Heatmaps and Analytics:</b> Heatmap and analytics data showed more balanced user interaction across the site, indicating improved content discovery.</p>
                      <p className="clientdetails-one-para pt-3"><b>Support Tickets:</b> There was a noticeable reduction in support tickets related to navigation issues, reflecting the success of the redesign.</p>
                    </div>
                    <div className="col-sm-4">
                      <img src={getCloudinaryUrl('img/clientreview2.png')} alt="feedback" className="img-fluid" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Creative Solutions Footer Section */}
      <section className="servicesbg">
        <div className="container">
          <h2 className="industries-rt">checkout our the creative solutions</h2>
          <p className="industries-wt">Check out our diverse investment products that suit your financial goals</p>
          <div className="row pt-4">
            <div className="col-sm-4">
              <img src={getCloudinaryUrl('img/clientimg.png')} alt="creative 1" className="img-fluid" />
            </div>
            <div className="col-sm-4">
              <img src={getCloudinaryUrl('img/clientimg-1.png')} alt="creative 2" className="img-fluid" />
            </div>
            <div className="col-sm-4">
              <img src={getCloudinaryUrl('img/clientimg-2.png')} alt="creative 3" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default ClientDetails