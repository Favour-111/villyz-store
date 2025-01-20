import React from "react";
import "./SingleBlog.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import BackToTop from "../../components/BackToTop/BackToTop";
const SingleBlog = ({ page }) => {
  const text = "5 Tips for Launching Your Online Store";
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
                <div className="recent-article-item ">
                  <div>
                    <img
                      src="https://grabit-next.tigerheck.com/assets/img/blog/1.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="recent-article-content">
                      {text.slice(0, 26)}.
                    </div>
                    <div className="recent-article-date">2017 jan 20</div>
                  </div>
                </div>
                <div className="recent-article-item ">
                  <div>
                    <img
                      src="https://grabit-next.tigerheck.com/assets/img/blog/1.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="recent-article-content">
                      {text.slice(0, 26)}.
                    </div>
                    <div className="recent-article-date">2017 jan 20</div>
                  </div>
                </div>
                <div className="recent-article-item ">
                  <div>
                    <img
                      src="https://grabit-next.tigerheck.com/assets/img/blog/1.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="recent-article-content">
                      {text.slice(0, 26)}.
                    </div>
                    <div className="recent-article-date">2017 jan 20</div>
                  </div>
                </div>
                <div className="recent-article-item ">
                  <div>
                    <img
                      src="https://grabit-next.tigerheck.com/assets/img/blog/1.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="recent-article-content">
                      {text.slice(0, 26)}.
                    </div>
                    <div className="recent-article-date">2017 jan 20</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-12">
            <div className="single-blog-cont">
              <div className="single-blog-img">
                <img
                  src="https://grabit-next.tigerheck.com/assets/img/blog/1.jpg"
                  alt=""
                />
              </div>
              <div className="recent-article-date mt-2">2017 jan 20</div>
              <div className="single-article-date mt-2">{text}</div>
              <div className="single-article-content mt-3">
                Starting an online store? Focus on building a user-friendly
                website, offering competitive pricing, optimizing for SEO, and
                providing excellent customer service. These steps will set your
                business on the path to success in the e-commerce world.
              </div>
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
