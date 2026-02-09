import { useState } from "react";
import { Link } from "react-router-dom";
import { getCloudinaryUrl } from "../utils/imageUrl";

interface RelatedBlog {
  title: string;
  description: string;
  image: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
}

const BlogDetails = () => {
  const [comment, setComment] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const COMMENTS_API = "https://website-66a0.onrender.com/comments";

  const relatedBlogs: RelatedBlog[] = [
    {
      title: "The Internet of Things (IoT): Transforming Everyday Life",
      description:
        "In the rapidly evolving landscape of technology, the Internet of Things (IoT) stands out as a transformative force.",
      image: getCloudinaryUrl("/img/blog_new_1.jpg"),
      author: "Jesica koli",
      authorImage: getCloudinaryUrl("/img/user.jpeg"),
      date: "June 01, 2024",
      readTime: "10 minutes ago",
    },
    {
      title: "Building a Successful Remote IT Team",
      description:
        "In today's digital age, building and managing a remote IT team requires the right tools, culture, and leadership.",
      image: getCloudinaryUrl("/img/blog_new_1.jpg"),
      author: "Jesica koli",
      authorImage: getCloudinaryUrl("/img/user.jpeg"),
      date: "June 01, 2024",
      readTime: "8 minutes ago",
    },
    {
      title: "Digital Marketing Strategies for IT Companies",
      description:
        "In the competitive landscape of IT services, effective digital marketing is essential for standing out and attracting potential clients.",
      image: getCloudinaryUrl("/img/blog_new_1.jpg"),
      author: "Jesica koli",
      authorImage: getCloudinaryUrl("/img/user.jpeg"),
      date: "June 01, 2024",
      readTime: "8 minutes ago",
    },
  ];

  const handleSendComment = async (): Promise<void> => {
    if (!comment.trim()) return;

    try {
      setIsSubmitting(true);

      const response = await fetch(COMMENTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: comment }),
      });

      if (response.ok) {
        setComment("");
        setSuccessMessage("Comment sent successfully ✅");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="breadcrumb-wrapper">
        <div className="container">
          <div className="breadcrumb-content">
            <div className="breadcrumb__link">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Blogs</li>
              </ul>
            </div>
          </div>
          <h2 className="title">Blogs</h2>
        </div>
      </section>

      {/* Blog Details */}
      <section className="mt-5">
        <div className="container blogsdetails">
          <h1 className="blogsdetails_title">
            10 Secrets for managing a remote team
          </h1>

          <ul className="blogsdetails_list justify-content-center pt-3">
            <li>
              <span className="blogsdetails_username">
                <img
                  src={getCloudinaryUrl("/img/user.jpeg")}
                  alt="img"
                  className="img-fluid blogsdetails-one__img"
                />
                <h5>Jesica koli</h5>
              </span>
            </li>
            <li>
              <span>July 19, 2024</span>
            </li>
            <li>
              <span>10 minutes ago</span>
            </li>
          </ul>

          <img
            src={getCloudinaryUrl("/img/blogdetails_user.png")}
            className="img-fluid mt-4"
            alt="img"
          />

          <div className="parablog">
            <p>
              If you’re thinking of starting a blog of your own, but just don’t
              have a clue on what to blog about, then fear not!
            </p>
            <p>
              In this article, I have included a whole load of blog examples from
              a wide variety of different niches.
            </p>
            <p>
              Blogs continue to grow, making money and earning their owners a
              steady income.
            </p>
            <p>
              Each example brings something unique to its readers.
            </p>
            <p>
              All blogs share the love of writing and sharing information.
            </p>
          </div>

          <hr />

          {/* Comment Section */}
          <div className="parablog">
            <div className="blogsdetails_comment">
              <img
                src={getCloudinaryUrl("/img/user.jpeg")}
                alt="User"
                className="img-fluid blogsdetails-one__img"
              />
              <textarea
                placeholder="Enter your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="blogsdetails_comment_textarea"
              />
            </div>

            <div className="mt-4 pb-5 text-end">
              <button
                className="btn blogsdetails_btn"
                onClick={handleSendComment}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>

              {successMessage && (
                <p className="text-success mt-3">{successMessage}</p>
              )}
            </div>
          </div>

          {/* Related Blogs */}
          <div className="row mt-2">
            {relatedBlogs.map((blog, index) => (
              <div
                key={index}
                className="col-sm-4 col-md-4 col-lg-4 col-xl-4"
              >
                <img src={blog.image} alt="img" className="img-fluid" />

                <div className="blogs-one__content-box mb-5">
                  <div className="tags pb-5 pt-3">
                    <a href="#">Lifestyle</a>
                  </div>

                  <h6 className="blogs_title">{blog.title}</h6>

                  <ul className="blogs_list">
                    <li>
                      <span>
                        <img
                          src={blog.authorImage}
                          alt="img"
                          className="img-fluid blogs-one__img"
                        />
                        {blog.author}
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-calendar-check-o"></i> {blog.date}
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-clock-o"></i> {blog.readTime}
                      </span>
                    </li>
                  </ul>

                  <p className="blogs_para">{blog.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
