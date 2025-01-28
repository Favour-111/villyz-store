import React, { useContext, useState } from "react";
import "./Nav.css";
import { LuUserRound } from "react-icons/lu";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { GrAppsRounded } from "react-icons/gr";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { totalCartItems, totalWishList } = useContext(ShopContext);
  const [isHovered, setIsHovered] = useState(false);
  const [category, setcategory] = useState(false);
  const [page, setPage] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState("Kitchen Essentials");
  const [query, setQuery] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      window.scrollTo(0, 0); // Scroll to the top of the page
      navigate("/searchProduct", {
        state: {
          query: query,
        },
      });
    }
  };

  return (
    <div>
      <div className="Nav-body">
        <div className="logo">
          <span>Vill</span>
          <span className="logoSecond">yz</span>
        </div>
        <div className="inputForm">
          <input
            placeholder="Search Products.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="section-container">
          <div className="d-flex gap-1 align-items-center section-item position-relative">
            <img
              src="https://nextjs.spruko.com/ynex-ts/preview/assets/images/faces/10.jpg"
              alt=""
              width={30}
              className="mx-1"
              style={{
                borderRadius: "100px",
              }}
            />
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
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/fluency/48/like.png"
              alt="like"
            />
            <div>
              <div className="Name">Wishlist</div>
              <div className="Section-name">{totalWishList()}-items</div>
            </div>
          </Link>
          <Link
            to="/cart"
            className="d-flex gap-1 align-items-center section-item"
          >
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/fluency/48/shopping-basket-2.png"
              alt="shopping-basket-2"
            />
            <div>
              <div className="Name">Cart</div>
              <div className="Section-name">{totalCartItems()}-items</div>
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
            <div className="d-flex align-items-center gap-2 actionIcons">
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
            <div className="col-12 category-item-container shadow-sm">
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
          </div>
        </div>
        <div className="nav-links-container">
          <ul>
            <li>
              <Link to="/home" className="nav-link-item">
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
                  <li>
                    <Link className="Link" to="/product">
                      {" "}
                      cleaning tool
                    </Link>
                  </li>
                  <li>
                    <Link className="Link" to="/product">
                      {" "}
                      DIY
                    </Link>
                  </li>
                  <li>
                    <Link className="Link" to="/product">
                      {" "}
                      storage
                    </Link>
                  </li>
                  <li>
                    <Link className="Link" to="/product">
                      {" "}
                      Home Comfort
                    </Link>
                  </li>
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
                  <li>
                    {" "}
                    <Link className="Link" to="/contact">
                      {" "}
                      contact us
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link className="Link" to="/cart">
                      {" "}
                      cart
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link className="Link" to="/wishlist">
                      {" "}
                      wishlist
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link className="Link" to="/orderpg">
                      {" "}
                      Order
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link className="nav-link-item" to="/contact">
                {" "}
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <button className="category-btn">
          <div className="d-flex align-items-center gap-2 actionIcons">
            <CiLocationOn size={20} />
            <div>New jersey</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Nav;
