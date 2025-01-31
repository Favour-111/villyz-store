import React from "react";
import "./Blog.css";
import blog from "../../blog";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Blog = () => {
  const navigate = useNavigate();
  const date = 2023;
  return (
    <div className="container">
      <div className="header">
        <span>Latest</span> Blog
      </div>
      <div className="content mt-1">
        we tackle intresting topics every day in {date}
      </div>
      <div className="blog">
        <div className="blog-container" data-aos="fade-up">
          {blog.map((item) => {
            return (
              <div className="blog-item">
                <div className="blog-image">
                  <img src={item.imageUrl} alt="" />
                </div>
                <div className="date">{item.date}</div>
                <div className="blog-content">{item.title}</div>
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/SingleBlog");
                  }}
                  className="btn p-0 read-more"
                >
                  Read more
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
