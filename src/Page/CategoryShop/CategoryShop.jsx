import React, { useState, useEffect, useContext } from "react";
import Item from "../../components/items/Item";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import Category from "../../components/category/Category";
import BackToTop from "../../components/BackToTop/BackToTop";
import "./CategoryShop.css";
import { ShopContext } from "../../components/context/ShopContext";
import { CiFilter } from "react-icons/ci";
import { LuFilter } from "react-icons/lu";
import { RiCloseFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
const CategoryShop = ({ page }) => {
  const { product } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isRatingActive, setIsRatingActive] = useState(false);
  const [filterContLG, setFilterContLG] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const [stockFilter, setStockFilter] = useState({
    inStock: false,
    outOfStock: false,
  });

  const itemsPerPage = 12;

  // Sample product data
  useEffect(() => {
    setProducts(product);
    setFilteredProducts(product);
    setCategories([...new Set(product.map((p) => p.categories))]);
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

  useEffect(() => {
    let tempProducts = [...products];

    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    tempProducts = tempProducts.filter(
      (product) =>
        product.newPrice >= priceRange.min && product.newPrice <= priceRange.max
    );

    if (stockFilter.inStock && !stockFilter.outOfStock) {
      tempProducts = tempProducts.filter(
        (product) => product.availability === "in Stock"
      );
    } else if (!stockFilter.inStock && stockFilter.outOfStock) {
      tempProducts = tempProducts.filter(
        (product) => product.availability === "out Of Stock"
      );
    }

    if (isRatingActive && selectedRatings.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedRatings.includes(Math.floor(product.Rating))
      );
    }

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
    setCurrentPage(1);
  }, [
    products,
    selectedCategories,
    priceRange,
    sortOption,
    stockFilter,
    isRatingActive,
    selectedRatings,
  ]);

  const handleRatingSelect = (star) => {
    setSelectedRatings((prevRatings) =>
      prevRatings.includes(star)
        ? prevRatings.filter((r) => r !== star)
        : [...prevRatings, star]
    );
  };

  // Get paginated products
  const Productcategory = selectedCategories.length
    ? filteredProducts
    : filteredProducts.filter((prod) => prod.categories === page);

  // Apply pagination after filtering by category
  const paginatedProducts = Productcategory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(Productcategory.length / itemsPerPage);

  const handleStockChange = (e) => {
    const { name, checked } = e.target;
    setStockFilter((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleCheckboxChange = () => {
    setIsRatingActive((prev) => !prev);
  };
  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className={filterContLG ? "overlay-filt" : ""}></div>

      <div className="cont mt-5">
        <div className="row cont-cont w-100 mt-4">
          <div className="col-xl-12 col-md-12">
            {/* Product List */}
            <div className="sort-by-bdy">
              <div className="page-head mb-3">{page}</div>
              <div className="sort-by-header">
                <div className="d-flex align-items-center gap-1">
                  <div className="app-cot">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA/UlEQVR4nO2UTW4CMQyFc4eCBJegrAsX4+cslDO0SxZco8MVgDUbv/mQhyyYSIOaLBACLFkaJW/87BfbIdzDgKHEWmLT4WtgUIoPfmDi1PWDXe6+S/HBxNa9q0JL7nPxb4JXkEj/a7tVKd4HZ+B9e2NwVsmgZeGfwMjdLdGAvsFS4tfdYAH0QmrZuyU0wacmjiZqE1V0/z4AkxZBbtvhmV+C/wGjq/PPSHRoVZI9B7A0IQ+YYiNJbTAvJpDrLaob+Eri53EJDBYuQ4dE4yjRrJgA6PlDeqbXJDH4zsQe+AjFuyU0wSaRJG1TD/6VllW0W5pKYO56u7ssrczvYWcABKUjsy5eXQAAAABJRU5ErkJggg=="
                      alt="external-apps-technology-tanah-basah-basic-outline-tanah-basah"
                    />
                  </div>
                  <div
                    className="app-cot"
                    onClick={() => setFilterContLG(true)}
                  >
                    <LuFilter color="white" fontSize={20} />
                  </div>
                </div>

                <div
                  className={`filter-container ${filterContLG ? "open" : ""}`}
                >
                  <div className="filter-head">
                    <div>Filter</div>
                    <div onClick={() => setFilterContLG(false)}>
                      <RiCloseFill size={18} />
                    </div>
                  </div>
                  <div className="filter-availability">
                    <div className="filter-subhead">
                      <div>Availability</div>
                      <div>
                        <IoIosArrowDown size={16} />
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="input-category">
                        <input
                          type="checkbox"
                          name="inStock"
                          checked={stockFilter.inStock}
                          onChange={handleStockChange}
                        />
                        <div className="checkbox-label">In Stock</div>
                      </div>
                      <div className="input-category">
                        <input
                          type="checkbox"
                          name="outOfStock"
                          checked={stockFilter.outOfStock}
                          onChange={handleStockChange}
                        />
                        <div className="checkbox-label">Out of Stock</div>
                      </div>
                    </div>
                  </div>
                  <div className="filter-availability">
                    <div className="filter-subhead">
                      <div>Price Range</div>
                      <div>
                        <IoIosArrowDown size={16} />
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="range-slider pt-1 px-3">
                        {/* Min Range Slider */}
                        <input
                          type="range"
                          name="min"
                          min="0"
                          max="1000"
                          value={priceRange.min}
                          onChange={handleRangeChange}
                        />

                        {/* Max Range Slider */}
                        <input
                          type="range"
                          name="max"
                          min="0"
                          max="1000"
                          value={priceRange.max}
                          onChange={handleRangeChange}
                        />
                      </div>

                      {/* Display Values */}
                      <div className="d-flex justify-content-between mt-2 px-3">
                        <span className="range">Min: {priceRange.min}</span>
                        <span className="range">Max: {priceRange.max}</span>
                      </div>
                    </div>
                  </div>
                  <div className="filter-availability">
                    <div className="filter-subhead">
                      <div>Sort </div>
                      <div>
                        <IoIosArrowDown size={16} />
                      </div>
                    </div>
                    <div className="">
                      <div className="pt-2  px-3">
                        <select onChange={(e) => handleSort(e.target.value)}>
                          <option value="">--Select--</option>
                          <option value="name-asc">Name (A-Z)</option>
                          <option value="name-desc">Name (Z-A)</option>
                          <option value="price-asc">
                            Price (Lowest to Highest)
                          </option>
                          <option value="price-desc">
                            Price (Highest to Lowest)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="filter-availability">
                    <div className="filter-subhead">
                      <div>Rating </div>
                      <div>
                        <IoIosArrowDown size={16} />
                      </div>
                    </div>
                    <div className="p-3">
                      {/* Rating options */}
                      <label className="d-flex align-items-center gap-2 mt-3">
                        <input
                          type="checkbox"
                          checked={isRatingActive}
                          onChange={() => setIsRatingActive(!isRatingActive)}
                        />
                        <div className="enable"> Enable Rating Filter</div>
                      </label>

                      {[1, 2, 3, 4, 5].map((rating) => (
                        <label
                          key={rating}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            value={rating}
                            disabled={!isRatingActive}
                            checked={selectedRatings.includes(rating)}
                            onChange={() => handleRatingSelect(rating)}
                          />
                          <div style={{ display: "flex", marginTop: 10 }}>
                            {Array.from({ length: rating }, (_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={index < rating ? "orange" : "gray"} // Conditionally set color
                                width="14px"
                                height="14px"
                                style={{ margin: "0 2px" }}
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
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
            <div className="category-prod">
              {paginatedProducts.length > 0 ? (
                <div className="itemBody">
                  {paginatedProducts.map((product) => (
                    <div>
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
            </div>
            {/* Pagination */}
            <div className="pagination-cont">
              <div className="pagination-text">
                Showing {currentPage}-{totalPages} of {Productcategory.length}{" "}
                item(s)
              </div>
              <div>
                {/* Left Icon */}
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  style={{
                    margin: "5px",
                    padding: "5px 10px",
                    background: "transparent",
                    color: "#737373",
                    border: "1px solid #e3e3e3",
                    borderRadius: "5px",
                    fontFamily: "poppinsRegular",
                    cursor: "pointer",
                    fontSize: 13,
                    transition: "250ms",
                  }}
                >
                  {"<"}
                </button>

                {/* First Page and Ellipsis */}
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      style={{
                        margin: "5px",
                        padding: "5px 10px",
                        background:
                          currentPage === 1 ? "rgb(83 109 254)" : "transparent",
                        color: currentPage === 1 ? "#fff" : "#737373",
                        border:
                          currentPage === 1 ? "none" : "1px solid #e3e3e3",
                        borderRadius: "5px",
                        fontFamily: "poppinsRegular",
                        cursor: "pointer",
                        fontSize: 13,
                        transition: "250ms",
                      }}
                    >
                      1
                    </button>
                    <span>...</span>
                  </>
                )}

                {/* Main Sliding Pagination Logic */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === currentPage || // Current page
                      (page >= currentPage - 1 && page <= currentPage + 1) // Nearby pages
                  )
                  .map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      style={{
                        margin: "5px",
                        padding: "5px 10px",
                        background:
                          currentPage === pageNumber
                            ? "rgb(83 109 254)"
                            : "transparent",
                        color: currentPage === pageNumber ? "#fff" : "#737373",
                        border:
                          currentPage === pageNumber
                            ? "none"
                            : "1px solid #e3e3e3",
                        borderRadius: "5px",
                        fontFamily: "poppinsRegular",
                        cursor: "pointer",
                        transition: "250ms",
                        fontSize: 13,
                      }}
                    >
                      {pageNumber}
                    </button>
                  ))}

                {/* Ellipsis and Last Page */}
                {currentPage < totalPages - 2 && <span>...</span>}
                {currentPage < totalPages - 2 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    style={{
                      margin: "5px",
                      padding: "5px 10px",
                      background:
                        currentPage === totalPages
                          ? "rgb(83 109 254)"
                          : "transparent",
                      color: currentPage === totalPages ? "#fff" : "#737373",
                      border:
                        currentPage === totalPages
                          ? "none"
                          : "1px solid #e3e3e3",
                      borderRadius: "5px",
                      fontFamily: "poppinsRegular",
                      cursor: "pointer",
                      fontSize: 13,
                      transition: "250ms",
                    }}
                  >
                    {totalPages}
                  </button>
                )}

                {/* Right Icon */}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(currentPage + 1, totalPages))
                  }
                  style={{
                    margin: "5px",
                    padding: "4px 10px",
                    background: "transparent",
                    color: "#737373",
                    border: "1px solid #e3e3e3",
                    borderRadius: "5px",
                    fontFamily: "poppinsRegular",
                    cursor: "pointer",
                    transition: "250ms",
                    fontSize: 13,
                  }}
                >
                  {"Next >"}
                </button>
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

export default CategoryShop;
