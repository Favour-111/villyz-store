import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";
import { LuUserRound } from "react-icons/lu";
import { CiHeart, CiLocationOn, CiLogout, CiSettings } from "react-icons/ci";
import { IoBagHandleOutline, IoLocationOutline } from "react-icons/io5";
import { GrAppsRounded } from "react-icons/gr";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import product from "../../product";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { FiShoppingBag } from "react-icons/fi";
const Nav = () => {
  const navigate = useNavigate();

  const { totalCartItems, totalWishList, categoryType, user } =
    useContext(ShopContext);
  const [isHovered, setIsHovered] = useState(false);
  const [category, setcategory] = useState(false);
  const [page, setPage] = useState(false);
  const [account, setAccount] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
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
  const id = localStorage.getItem("userId");
  return (
    <div>
      <div className="Nav-body">
        <div className="logo" onClick={() => navigate("/home")}>
          <span>Vill</span>
          <span className="logoSecond">yz</span>
        </div>
        <div className="inputForm">
          <input
            placeholder="Find the Product you are looking for.."
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
            <div
              onClick={
                localStorage.getItem("auth-token")
                  ? () => navigate(`/profile/${id}`)
                  : () => navigate(`/login`)
              }
            >
              <div className="Name">Account</div>
              <div
                className="Section-name"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div>
                  {localStorage.getItem("auth-token")
                    ? user?.FirstName
                    : "Guest"}
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
            className={`row categories shadow-sm  ${
              isHoveredCategory ? "show" : ""
            }`}
          >
            <div className="col-12 category-item-container shadow-sm">
              {categoryType
                .filter((item) => item.visibility == "published")
                .map((category, index) => (
                  <div
                    style={{
                      textDecoration: "none",
                    }}
                    key={category}
                    className="category-nav-items"
                    onClick={() => {
                      setSelectedCategory(category.name);
                      navigate(`/${category.name}`);
                    }}
                  >
                    <div className="nav-category-img-cont">
                      <div className="Nav-Category-Img">
                        <img src={category.image} alt="" />
                      </div>
                      {category.name}
                    </div>
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
                  {categoryType
                    .filter((item) => item.visibility == "published")
                    .map((category) => (
                      <li>
                        <Link className="Link" to={`/${category.name}`}>
                          {" "}
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
            <li>
              <Link to="/blog" className="Link">
                {" "}
                Blog
              </Link>
            </li>
            <li>
              <Link to="/collection" className="Link">
                {" "}
                collection
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
                </ul>
              </div>
            </li>
            <li
              onMouseEnter={() => setAccount(true)}
              onMouseLeave={() => setAccount(false)}
            >
              Account
              <RiArrowDropDownLine size={30} />
              <div className={`dropdown-pages  ${account ? "show" : ""}`}>
                {localStorage.getItem("auth-token") ? (
                  <ul className="dropdown-content-pages">
                    <li>
                      <Link
                        className="Link"
                        to={`/profile/${localStorage.getItem("userId")}`}
                      >
                        <CiSettings size={18} />
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link className="Link" to="/addresses">
                        <IoLocationOutline size={18} />
                        Address
                      </Link>
                    </li>
                    <li>
                      <Link className="Link" to="/orderpg">
                        <FiShoppingBag />
                        Orders
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="dropdown-content-pages">
                    <li>
                      {" "}
                      <Link className="Link" to="/SignUp">
                        {" "}
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link className="Link" to="/login">
                        {" "}
                        Log In
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
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
