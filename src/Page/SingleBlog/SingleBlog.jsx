import React, { useEffect, useState } from "react";
import "./SingleBlog.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import BackToTop from "../../components/BackToTop/BackToTop";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SingleBlog = ({ page }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogs = location.state || {};
  const [blog, setBlog] = useState([]);
  const [loader, setLoader] = useState(false);
  const { Title, BlogDate, BlogContent, image } = blogs;
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
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="blog-page-container">
        <div className="row w-100 blog">
          <div className="col-xl-4 col-md-12">
            <div className="recent-article px-4 pt-3">
              <div className="recent-article-header">Recent Blog</div>
              <div className="recent-article-container">
                {blog
                  .slice(0.4)
                  .reverse()
                  .map((item) => {
                    return (
                      <div
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
                        className="recent-article-item "
                      >
                        <div>
                          <img src={item.image} alt="" />
                        </div>
                        <div>
                          <div className="recent-article-content">
                            {item.BlogTitle.slice(0, 26)}.
                          </div>
                          <div className="recent-article-date">
                            {item.BlogDate}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-12">
            <div className="single-blog-cont">
              <div className="single-blog-img">
                <img src={image} alt="" />
              </div>
              <div className="recent-article-date mt-2">{BlogDate}</div>
              <div className="single-article-date mt-2">{Title}</div>
              <div
                className="single-article-content mt-3"
                dangerouslySetInnerHTML={{
                  __html: BlogContent,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default SingleBlog;
