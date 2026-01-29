import { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { BASE_URL } from '../config/env'
import useScrollToTop from '../hooks/useScrollToTop'

interface Blog {
  _id: string
  name: string
  description: string
  image: string
  category: string
}

function Blogs() {
  useScrollToTop()

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('https://cc-5vhm.onrender.com/v1/getBlog')
      const result = await response.json()

      if (response.ok && result.data) {
        setBlogs(result.data)
      } else {
        console.error('Error:', result.message)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { name: 'Industry Insights', count: '05' },
    { name: 'Technology Trends', count: '02' },
    { name: 'Cybersecurity Tips', count: '01' },
    { name: 'Software Development', count: '01' },
    { name: 'IT Best Practices', count: '01' },
    { name: 'Innovative Solutions', count: '01' },
    { name: 'Data Management', count: '01' },
    { name: 'AI & Machine Learning', count: '01' },
    { name: 'Digital Transformation', count: '01' },
    { name: 'Company News', count: '1' },
    { name: 'Tech Tutorials', count: '01' }
  ]

  const instagramPosts = [
    'img/blogs-4.png',
    'img/blogs-11.png',
    'img/blogs-2.png',
    'img/blogs-3.png',
    'img/blogs-5.png',
    'img/blogs-6.png',
    'img/blogs-7.png',
    'img/blogs-8.png',
    'img/blogs.png'
  ]

  return (
    <>
      <Breadcrumb
        title="Blogs"
        items={[
          { label: 'Home', link: '/' },
          { label: 'Blogs' }
        ]}
      />

      <section className="pt-72 pb-72 blogs-bg">
        <div className="container">
          <div className="blogs-product">
            <h6 className="small-text">Editor's Picks</h6>
            <p className="header-text1">Featured Blogs of the Month</p>
          </div>

          <div className="row">
            {/* Blog List */}
            <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 pt-4">
              <div id="blogList">
                {loading ? (
                  <p>Loading blogs...</p>
                ) : blogs.length === 0 ? (
                  <p>No blogs available at the moment.</p>
                ) : (
                  blogs.map((blog) => (
                    <div key={blog._id} className="blog-item">
                      <div className="blogs_card">
                        <div className="row m-0 align-items-center">
                          <div className="col-lg-5 col-md-6 p-0">
                            <div className="img-blog-blog">
                              <img src={blog.image} alt={blog.name} className="img-fluid" />
                            </div>
                          </div>

                          <div className="col-lg-7 col-md-6">
                            <div className="blogs-one__content-box">
                              <div className="tags pb-5">
                                <a href="#">{blog.category}</a>
                              </div>

                              <h6 className="blogs_title">
                                <a href="/blogsDetails">{blog.name}</a>
                              </h6>

                              <p className="blogs_para">{blog.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
              {/* Categories */}
              <div className="today_update pt-5">
                <h6 className="todayupdate_title">Categories</h6>
              </div>

              {categories.map((category, index) => (
                <div key={index} className="cat_d1 pt-5">
                  <span className="cat-title me-auto">{category.name}</span>
                  <h6 className="cat-num">{category.count}</h6>
                </div>
              ))}

              {/* Today's Update */}
              <div className="today_update pt-5">
                <h6 className="todayupdate_title">Today's update</h6>
              </div>

              <div className="row pt-5">
                <div className="col-6">
                  <div className="todays_one_sigle">
                    <span className="todays_one_number">14</span>
                    <h6 className="todays_one_title">New posts</h6>
                  </div>
                </div>

                <div className="col-6">
                  <div className="todays_one_sigle">
                    <span className="todays_one_number">480</span>
                    <h6 className="todays_one_title">total visitors</h6>
                  </div>
                </div>

                <div className="col-6">
                  <div className="todays_one_sigle">
                    <span className="todays_one_number">29</span>
                    <h6 className="todays_one_title">New subscribers</h6>
                  </div>
                </div>

                <div className="col-6">
                  <div className="todays_one_sigle">
                    <span className="todays_one_number">138</span>
                    <h6 className="todays_one_title">blog read</h6>
                  </div>
                </div>
              </div>

              {/* Instagram Posts */}
              <div className="today_update pt-5">
                <h6 className="todayupdate_title">Instagram posts</h6>
              </div>

              <div className="row pt-5">
                {instagramPosts.map((post, index) => (
                  <div key={index} className={`col-4 ${index >= 3 ? 'pt-3' : ''}`}>
                    <img src={`${BASE_URL}/${post}`} alt="img" className="img-fluid" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Blogs
