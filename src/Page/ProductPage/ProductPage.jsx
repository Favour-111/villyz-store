import React, { useState, useEffect } from "react";
import product from "../../product";
import Item from "../../components/items/Item";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import Category from "../../components/category/Category";
import "./ProductPage.css";
import BackToTop from "../../components/BackToTop/BackToTop";

const ProductPage = ({ page }) => {
  const [filterCont, setFilterCont] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sample product data
  useEffect(() => {
    setProducts(product);
    setFilteredProducts(product);
    setCategories([...new Set(product.map((p) => p.category))]);
  }, []);

  // Handle category selection
  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  // Handle price range change
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
  };

  // Apply filters, sorting, and reset pagination
  useEffect(() => {
    let tempProducts = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    tempProducts = tempProducts.filter(
      (product) =>
        product.newPrice >= priceRange.min && product.newPrice <= priceRange.max
    );

    // Sort products
    if (sortOption === "name-asc") {
      tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "price-asc") {
      tempProducts.sort((a, b) => a.newPrice - b.newPrice);
    } else if (sortOption === "price-desc") {
      tempProducts.sort((a, b) => b.newPrice - a.newPrice);
    }

    setFilteredProducts(tempProducts);

    // Reset pagination to the first page
    setCurrentPage(1);
  }, [products, selectedCategories, priceRange, sortOption]);

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
      <Category />
      <div className="cont">
        <div className="row cont-cont w-100 mt-4">
          <div className="col-xl-3 col-md-12 ">
            {/* Categories */}
            <div className="category-select-body shadow-sm">
              <div className="category-head">Category Filter</div>
              <div className="mt-3">
                {categories.map((category) => (
                  <div key={category} className="input-category">
                    <div>
                      <input
                        type="checkbox"
                        id={category}
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                    </div>
                    <div className="checkbox-label" htmlFor={category}>
                      {category}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Range */}
              <div>
                <div className="category-head mt-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <div> Price Range</div>
                    <img
                      width="15"
                      height="15"
                      src="https://img.icons8.com/material-outlined/50/expand-arrow.png"
                      alt="expand-arrow"
                    />
                  </div>
                </div>

                <label className="label mt-3">
                  Min:
                  <input
                    type="number"
                    name="min"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                  />
                </label>
                <br />
                <label className="label">
                  Max:
                  <input
                    type="number"
                    name="max"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                  />
                </label>
              </div>

              {/* Sort Options */}
              <div className="category-head mt-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div>sort by</div>
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/material-outlined/50/expand-arrow.png"
                    alt="expand-arrow"
                  />
                </div>
              </div>
              <div className="pt-4 px-3">
                <select onChange={(e) => handleSort(e.target.value)}>
                  <option value="">--Select--</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Lowest to Highest)</option>
                  <option value="price-desc">Price (Highest to Lowest)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-md-12">
            {/* Product List */}
            <div className="px-3">
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
                    <option value="price-desc">
                      Price (Highest to Lowest)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {paginatedProducts.length > 1 ? (
              <div className="itemBody1">
                {paginatedProducts.map((product) => (
                  <div data-aos="fade-up">
                    <Item key={product.id} product={product} />
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
                <div className="mt-3">No Product...</div>
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
                    background:
                      currentPage === i + 1 ? " rgb(83 109 254)" : "#ddd",
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
          <div className="filter-btn-cont ">
            <div className="filter-btn" onClick={() => setFilterCont(true)}>
              <div>filter </div>
              <div>|</div>
              <img
                width={20}
                height={20}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+ElEQVR4nO2XTQ6CMBBGuYF/1zGReGHPoTF6BlzjpuqKGZ/BsEBDieC0XegkhEBK3wttvrZZZlTASpSivlv1+XEBS1EuegdRbhWssxRwba5oEnTAo0nQAw8uwQfwYBIMgJtLMAJuKiFKMQbekigswub61uneA3t5X39XQf6VQEfoHIB5lwAwEWUbaiKuVNkAs/q5S6BpN2vahY1n9QiYlijntzEtowpoD+QvoD8/BKKUvgkaZRIGKQaGjUnMeuL2CCw8cTsVZWcatxXkSRcc+X7JPVn8fpds0zFWItTezyWBD5GItf93SeB9EqnOgC4JvCXxPIJbxu4DoRJAvncNQSgAAAAASUVORK5CYII="
                alt="external-up-and-down-arrow-kmg-design-flat-kmg-design"
              />
            </div>
          </div>
          {filterCont && (
            <div className="filter-container">
              <div
                className="d-flex gap-3 align-items-center"
                style={{
                  borderBottom: "1px solid #e3e3e3",
                  padding: "10px ",
                }}
              >
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setFilterCont(false);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/ios/50/left.png"
                    alt="left"
                  />
                </button>
                <div className="filter">Filter</div>
              </div>

              <div className="filter mt-3 text-capitalize">category filter</div>
              <div className="mt-2">
                {categories.map((category) => (
                  <div key={category} className="input-category">
                    <div>
                      <input
                        type="checkbox"
                        id={category}
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                    </div>
                    <div className="checkbox-label" htmlFor={category}>
                      {category}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                    marginTop: "20px",
                    borderBottom: "1px solid #e3e3e3",
                  }}
                >
                  <div className="filter">Price Range</div>
                  <div>
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/material-outlined/50/expand-arrow.png"
                      alt="expand-arrow"
                    />
                  </div>
                </div>

                <label className="label mt-3">
                  Min:
                  <input
                    type="number"
                    name="min"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                  />
                </label>
                <br />
                <label className="label">
                  Max:
                  <input
                    type="number"
                    name="max"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                  />
                </label>
              </div>
              <div className="category-head mt-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>sort by</div>
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/material-outlined/50/expand-arrow.png"
                    alt="expand-arrow"
                  />
                </div>
              </div>
              <div className="pt-4 px-3">
                <select onChange={(e) => handleSort(e.target.value)}>
                  <option value="">--Select--</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Lowest to Highest)</option>
                  <option value="price-desc">Price (Highest to Lowest)</option>
                </select>
              </div>
              <div>
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setFilterCont(false);
                  }}
                  className="show-filter shadow-sm"
                >
                  Show
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ProductPage;
