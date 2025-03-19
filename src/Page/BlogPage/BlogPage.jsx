import React, { useState, useEffect, useContext } from "react";
import "./BlogPage.css"; // Optional: Add styles for better appearance
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import blog from "../../blog";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../components/context/ShopContext";
// Sample blog data

const BlogPage = ({ page }) => {
  const navigate = useNavigate();
  const { blog } = useContext(ShopContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate paginated blogs
  const paginatedBlogs = blog.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(blog.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="blog-page">
        <div className="blogs-container mt-5">
          {paginatedBlogs.map((item) => (
            <div className="blog-item1" data-aos="fade-up">
              <div className="blog-image">
                <img src={item.image} alt="" />
              </div>
              <div className="date">{item.BlogDate}</div>
              <div className="blog-content">{item.BlogTitle}</div>
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                }}
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
                className="read-more text-capitalize"
              >
                read more{" "}
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAc0lEQVR4nO2WMQqAQAwE5xMR/f9PbAS10sLnKAdXiYY7AoLcTjvFwpKEgGiZEViBrtKFmYET2B8CPBfGgC0HHMBQ6BQewlQ7GrgPV63LByQFLBXun8F2q7MvdCEUmlC9YayZ6SUv/tt747kwk/PQeU4IEhfUSXbhldLzQgAAAABJRU5ErkJggg=="
                  alt="double-right--v1"
                  width={10}
                  height={10}
                ></img>
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`pagination-btn ${
                currentPage === i + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
