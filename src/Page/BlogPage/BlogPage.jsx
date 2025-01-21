import React, { useState, useEffect } from "react";
import "./BlogPage.css"; // Optional: Add styles for better appearance
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import blog from "../../blog";
import { Link } from "react-router-dom";
// Sample blog data
const blogs = blog;

const BlogPage = ({ page }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate paginated blogs
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

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
                <img src={item.imageUrl} alt="" />
              </div>
              <div className="date">{item.date}</div>
              <div className="blog-content">{item.title}</div>
              <Link to="/SingleBlog" className="read-more text-capitalize">
                read more{" "}
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAc0lEQVR4nO2WMQqAQAwE5xMR/f9PbAS10sLnKAdXiYY7AoLcTjvFwpKEgGiZEViBrtKFmYET2B8CPBfGgC0HHMBQ6BQewlQ7GrgPV63LByQFLBXun8F2q7MvdCEUmlC9YayZ6SUv/tt747kwk/PQeU4IEhfUSXbhldLzQgAAAABJRU5ErkJggg=="
                  alt="double-right--v1"
                  width={10}
                  height={10}
                ></img>
              </Link>
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
