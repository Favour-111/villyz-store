import React, { useContext, useEffect, useState } from "react";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import { useLocation } from "react-router-dom";
import Item from "../../components/items/Item";
import { ShopContext } from "../../components/context/ShopContext";

const ProductSearch = ({ page }) => {
  const { product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const itemsPerPage = 10;

  const Search = location.state || {}; // Fallback to an empty object
  const { query } = Search;

  const handleSort = (option) => {
    setSortOption(option);
  };

  useEffect(() => {
    let tempProducts = [...product];

    // Ensure query is valid before filtering
    if (query && query.trim() !== "") {
      tempProducts = tempProducts.filter((p) =>
        p.productName.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption === "name-asc") {
      tempProducts.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (sortOption === "name-desc") {
      tempProducts.sort((a, b) => b.productName.localeCompare(a.productName));
    } else if (sortOption === "price-asc") {
      tempProducts.sort((a, b) => a.newPrice - b.newPrice);
    } else if (sortOption === "price-desc") {
      tempProducts.sort((a, b) => b.newPrice - a.newPrice);
    }

    // Update state
    setFilteredProducts(tempProducts);
    setCurrentPage(1);
  }, [query, sortOption]);

  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="product-search-container">
        <div className="result">Search Results for "{query}"</div>
        {filteredProducts.length > 0 ? (
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
        ) : null}

        <div className="itemBody">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div data-aos="fade-up" key={product.id}>
                <Item product={product} />
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <img
                width="74"
                height="74"
                src="https://img.icons8.com/cute-clipart/64/nothing-found.png"
                alt="nothing-found"
              />
              <div className="mt-3">"{query}" not Found...</div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductSearch;
