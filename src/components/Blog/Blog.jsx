import React, { useEffect, useState } from "react";
import "./Blog.css";
import blog from "../../blog";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Blog = () => {
  const navigate = useNavigate();
  const date = 2023;
  const [blog, setBlog] = useState([]);
  const [loader, setLoader] = useState(false);
  const gettallBlog = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://villyzstore.onrender.com/getallBlog"
      );
      if (response) {
        setBlog(response.data.response);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    gettallBlog();
  }, []);
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
          {loader ? (
            <div>loading...</div>
          ) : (
            blog.map((item) => {
              return (
                <div className="blog-item">
                  <div className="blog-image">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="date">{item.BlogDate}</div>
                  <div className="blog-content">{item.BlogTitle}</div>
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/SingleBlog", {
                        state: {
                          image: item?.image,
                          Title: item.BlogTitle,
                          BlogDate: item.BlogDate,
                          BlogContent: item.BlogDescription,
                        },
                      });
                    }}
                    className="btn p-0 read-more"
                  >
                    Read more
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
