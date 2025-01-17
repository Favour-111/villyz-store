import React, { useState } from "react";
import "./Nav.css";
import { LuUserRound } from "react-icons/lu";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { GrAppsRounded } from "react-icons/gr";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const categoriesData = {
  "Kitchen Essentials": [
    "Meal Preparation Gadget",
    "food storage solution",
    "Portable",
  ],
  "Cleaning Tools": ["Mops", "Brushes", "Cleaning Agents"],
  Storage: ["Boxes", "Containers", "Racks"],
  "Home Comfort": ["Bedding", "Furniture", "Decor"],
  "DIY & Repairs": ["Tools", "Adhesives", "Paint"],
};

const Nav = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [category, setcategory] = useState(false);
  const [page, setPage] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState("Kitchen Essentials");

  return (
    <div>
      <div className="Nav-body">
        <div className="logo">
          <span>Vill</span>
          <span className="logoSecond">yz</span>
        </div>
        <div className="inputForm">
          <input placeholder="Search Products.." />
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="section-container">
          <div className="d-flex gap-1 align-items-center section-item position-relative">
            <LuUserRound size={28} color="#787878" />
            <div>
              <div className="Name">Account</div>
              <div
                className="Section-name"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Login
                <div className={`dropdown ${isHovered ? "show" : ""}`}>
                  <ul>
                    <li>
                      <Link to="/SignUp" className="Link">
                        Register
                      </Link>
                    </li>
                    <li>Checkout</li>
                    <li>
                      {" "}
                      <Link to="/login" className="Link">
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Link
            to="/wishlist"
            className="d-flex gap-1 align-items-center section-item"
          >
            <CiHeart size={30} color="#787878" />
            <div>
              <div className="Name">Wishlist</div>
              <div className="Section-name">3-items</div>
            </div>
          </Link>
          <Link
            to="/cart"
            className="d-flex gap-1 align-items-center section-item"
          >
            <IoBagHandleOutline size={30} color="#787878" />
            <div>
              <div className="Name">Cart</div>
              <div className="Section-name">3-items</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="nav-container">
        <div
          className="Category-nav"
          onMouseEnter={() => setIsHoveredCategory(true)}
          onMouseLeave={() => setIsHoveredCategory(false)}
        >
          <button className="category-btn">
            <div className="d-flex align-items-center gap-2">
              <GrAppsRounded />
              <div>All Categories</div>
            </div>
            <RiArrowDropDownLine size={26} />
          </button>
          <div
            className={`row categories shadow-sm ${
              isHoveredCategory ? "show" : ""
            }`}
          >
            <div className="col-6 category-item-container shadow-sm">
              {Object.keys(categoriesData).map((category) => (
                <div
                  key={category}
                  className={`category-items ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </div>
              ))}
            </div>
            <div className="col-6 subcategory-container ps-3">
              <header>{selectedCategory}</header>
              {categoriesData[selectedCategory].map((subcategory) => (
                <div key={subcategory} className="subcategory-item">
                  <div className="subcategoryItems"> {subcategory}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="nav-links-container">
          <ul>
            <li>
              <Link to="/" className="nav-link-item">
                Home
              </Link>
            </li>
            <li
              onMouseEnter={() => setcategory(true)}
              onMouseLeave={() => setcategory(false)}
            >
              Categories
              <RiArrowDropDownLine size={30} />
              <div className={`dropdown2  ${category ? "show" : ""}`}>
                <ul className="dropdown-content">
                  <li>
                    <Link className="Link" to="/product">
                      {" "}
                      kitchen essential
                    </Link>
                  </li>
                  <li>cleaning tools</li>
                  <li>DIY</li>
                  <li>storage</li>
                  <li>Home comfort</li>
                </ul>
              </div>
            </li>
            <li>
              <Link to="/blog" className="Link">
                {" "}
                Blog
              </Link>
            </li>
            <li
              onMouseEnter={() => setPage(true)}
              onMouseLeave={() => setPage(false)}
            >
              Pages
              <RiArrowDropDownLine size={30} />
              <div className={`dropdown-pages  ${page ? "show" : ""}`}>
                <ul className="dropdown-content-pages">
                  <li>About Us</li>
                  <li>
                    {" "}
                    <Link className="Link" to="/contact">
                      {" "}
                      contact us
                    </Link>
                  </li>
                  <li>cart</li>
                  <li>Checkout</li>
                  <li>wishlist</li>
                </ul>
              </div>
            </li>
            <li>
              <Link className="nav-link-item" to="/contact">
                {" "}
                Contact
              </Link>
            </li>
            <li>About</li>
          </ul>
        </div>
        <button className="category-btn">
          <div className="d-flex align-items-center gap-2">
            <CiLocationOn size={20} />
            <div>New jersey</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Nav;
