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

const ProductPage = ({ page }) => {
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
      <div className="row w-100 mt-4">
        <div className="col-xl-3 col-md-12 mt-5">
          {/* Categories */}
          <div className="category-select-body shadow-sm">
            <div className="category-head">Categories</div>
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
                  style={{ marginLeft: "5px", width: "80px" }}
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
                  style={{ marginLeft: "5px", width: "80px" }}
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
          <div className="itemBody">
            {paginatedProducts.map((product) => (
              <Item key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="text-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  margin: "0 5px",
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
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
