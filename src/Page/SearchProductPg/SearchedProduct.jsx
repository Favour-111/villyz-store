import React, { useContext, useEffect, useState } from "react";
import "./SearchedProduct.css";
import { useLocation } from "react-router-dom";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import Category from "../../components/category/Category";
import Item from "../../components/items/Item";
import { ShopContext } from "../../components/context/ShopContext";

const SearchedProduct = ({ page }) => {
  const { product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const itemsPerPage = 10;

  const Search = location.state || {}; // Fallback to an empty object
  const { query } = Search;

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
  };

  useEffect(() => {
    let tempProducts = [...product];

    // Filter products by search query
    if (query) {
      tempProducts = tempProducts.filter((p) =>
        p.productName.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Sort products
    if (sortOption === "name-asc") {
      tempProducts.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (sortOption === "name-desc") {
      tempProducts.sort((a, b) => b.productName.localeCompare(a.productName));
    } else if (sortOption === "price-asc") {
      tempProducts.sort((a, b) => a.newPrice - b.newPrice);
    } else if (sortOption === "price-desc") {
      tempProducts.sort((a, b) => b.newPrice - a.newPrice);
    }

    setFilteredProducts(tempProducts);

    // Reset pagination to the first page
    setCurrentPage(1);
  }, [query, sortOption]);

  // Get paginated products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="product-search-container">
        <div className="result">Search Results for "{query}"</div>
        <div className="px-3 w-100">
          <div className="sort-by-header">
            <div className="app-cot">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA/UlEQVR4nO2UTW4CMQyFc4eCBJegrAsX4+cslDO0SxZco8MVgDUbv/mQhyyYSIOaLBACLFkaJW/87BfbIdzDgKHEWmLT4WtgUIoPfmDi1PWDXe6+S/HBxNa9q0JL7nPxb4JXkEj/a7tVKd4HZ+B9e2NwVsmgZeGfwMjdLdGAvsFS4tfdYAH0QmrZuyU0wacmjiZqE1V0/z4AkxZBbtvhmV+C/wGjq/PPSHRoVZI9B7A0IQ+YYiNJbTAvJpDrLaob+Eri53EJDBYuQ4dE4yjRrJgA6PlDeqbXJDH4zsQe+AjFuyU0wSaRJG1TD/6VllW0W5pKYO56u7ssrczvYWcABKUjsy5eXQAAAABJRU5ErkJggg=="
                alt="external-apps-technology-tanah-basah-basic-outline-tanah-basah"
              />
            </div>
            <div className="sort-by p-2">
              <select onChange={(e) => handleSort(e.target.value)}>
                <option value="">Sort By</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Lowest to Highest)</option>
                <option value="price-desc">Price (Highest to Lowest)</option>
              </select>
            </div>
          </div>
        </div>
        {paginatedProducts.length > 0 ? (
          <div className="itemBody1">
            {paginatedProducts.map((product) => (
              <div data-aos="fade-up" key={product.id}>
                <Item product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart">
            <div>
              <img
                width="74"
                height="74"
                src="https://img.icons8.com/cute-clipart/64/nothing-found.png"
                alt="nothing-found"
              />
            </div>
            <div className="mt-3">"{query}" not Found...</div>
          </div>
        )}

        {/* Pagination */}
        <div className="text-center mb-5 mt-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: " 5px",
                padding: "5px 13px",
                background: currentPage === i + 1 ? "rgb(83 109 254)" : "#ddd",
                color: currentPage === i + 1 ? "#fff" : "#000",
                border: "none",
                borderRadius: "5px",
                fontFamily: "poppinsSemiBold",
                cursor: "pointer",
              }}
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

export default SearchedProduct;
