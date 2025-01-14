import React from "react";
import "./Blog.css";
import blog from "../../blog";
const Blog = () => {
  const date = 2023;
  return (
    <div className="container">
      <div className="header">
        <span>Latest</span> Blog
      </div>
      <div className="content mt-1">
        we tackle intresting topics every day in {date}
      </div>
      <div className="blog-container">
        {blog.map((item) => {
          return (
            <div className="blog-item">
              <div className="blog-image">
                <img src={item.imageUrl} alt="" />
              </div>
              <div className="date">{item.date}</div>
              <div className="blog-content">{item.title}</div>
              <div className="read-more">read more</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
