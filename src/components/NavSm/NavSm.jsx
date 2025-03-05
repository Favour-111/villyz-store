import React, { useContext, useState } from "react";
import "./NavSm.css";
import categoryType from "../../categoryType";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CiLogout } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowDropDownLine, RiCloseLargeFill } from "react-icons/ri";
import { GrAppsRounded } from "react-icons/gr";

const NavSm = () => {
  const navigate = useNavigate();
  const { totalCartItems, totalWishList } = useContext(ShopContext);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [subCategory1, setSubCategory1] = useState(false);
  const [subCategory2, setSubCategory2] = useState(false);
  const [subCategory3, setSubCategory3] = useState(false);
  const [subCategory4, setSubCategory4] = useState(false);

  const handleMouseEnter = () => setNavIsOpen(true);
  const handleMouseLeave = () => setNavIsOpen(false);

  const toggleSubCategory1 = () => {
    setSubCategory1((prev) => !prev);
    if (subCategory2)
      setSubCategory2(false); // Close subcategory2 when opening subcategory1
    else if (subCategory3) setSubCategory3(false);
    else if (subCategory4) setSubCategory4(false); // Close subcategory
  };

  const toggleSubCategory2 = () => {
    setSubCategory2((prev) => !prev);
    if (subCategory1)
      setSubCategory1(false); // Close subcategory1 when opening subcategory2
    else if (subCategory3) setSubCategory3(false);
    else if (subCategory4) setSubCategory4(false); // Close subcategory
  };
  const toggleSubCategory3 = () => {
    setSubCategory3((prev) => !prev);
    if (subCategory1)
      setSubCategory1(false); // Close subcategory1 when opening subcategory2
    else if (subCategory2) setSubCategory2(false); // Close subcategory
    else if (subCategory4) setSubCategory4(false); // Close subcategory
  };
  const toggleSubCategory4 = () => {
    setSubCategory4((prev) => !prev);
    if (subCategory1)
      setSubCategory1(false); // Close subcategory1 when opening subcategory2
    else if (subCategory2) setSubCategory2(false); // Close subcategory
    else if (subCategory3) setSubCategory3(false); // Close subcategory
  };
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
    <div className={`nav-container-sm ${navIsOpen ? "no-scroll" : ""}`}>
      {/* Main Navbar */}
      <div className="nav-sm shadow-sm">
        <div className="logo" onClick={() => navigate("/home")}>
          vill<span>yz</span>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <Link to="/login">
            <img
              width="30"
              height="30"
              src="https://nextjs.spruko.com/ynex-ts/preview/assets/images/faces/10.jpg"
              alt="user"
              style={{ borderRadius: "100%" }}
            />
          </Link>

          <Link to="/wishlist" className="icon-sm">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency/48/like.png"
              alt="like--v1"
            />
            <div className="counter">{totalWishList()}</div>
          </Link>
          <Link to="/cart" className="icon-sm">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/nolan/50/shopping-cart.png"
              alt="fast-cart"
            />
            <div className="counter">{totalCartItems()}</div>
          </Link>
          <div
            className="menu-icon"
            onClick={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios/50/menu--v1.png"
              alt="menu--v1"
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`nav-sm-cont ${navIsOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="menu-top">
          <div className="nav-head-cont">
            <div className="logo" onClick={() => navigate("/home")}>
              vill<span>yz</span>
            </div>
            <div>
              {" "}
              <button
                onClick={() => setNavIsOpen(false)}
                className="mt-4"
                aria-label="Close Menu"
              >
                <RiCloseLargeFill size={20} />
              </button>
            </div>
          </div>

          <div className="nav-smContent">
            <div className="w-100">
              <div className="nav-sm-input">
                <input
                  type="text"
                  placeholder="search product"
                  name=""
                  id=""
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div>
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/ios-glyphs/30/search.png"
                    alt="search"
                  />
                </div>
              </div>
            </div>
          </div>
          <button className="category-btn-sm" onClick={toggleSubCategory4}>
            <div className="d-flex align-items-center gap-2 actionIcons">
              <GrAppsRounded />
              <div>All Categories</div>
            </div>
            <RiArrowDropDownLine size={26} />
          </button>
          <ul className={`nav-sm-subCategory ${subCategory4 ? "open" : ""}`}>
            {categoryType.map((item) => (
              <li>
                <button
                  className="Link"
                  onClick={() => {
                    navigate(`/${item.name}`);
                    window.scrollTo(0, 0);
                    setNavIsOpen(false);
                  }}
                  key={item.id}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="menu-list">
          <Link className="li" to="/home">
            Home <div></div>
          </Link>
          <Link className="li" onClick={toggleSubCategory1}>
            Categories{" "}
            <div>
              <IoIosArrowDown size={20} />
            </div>
          </Link>
          <ul className={`nav-sm-subCategory ${subCategory1 ? "open" : ""}`}>
            {categoryType.map((item) => (
              <li>
                <button
                  className="Link"
                  onClick={() => {
                    navigate(`/${item.name}`);
                    window.scrollTo(0, 0);
                    setNavIsOpen(false);
                  }}
                  key={item.id}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
          <Link className="li" onClick={toggleSubCategory2}>
            Pages{" "}
            <div>
              <IoIosArrowDown size={20} />
            </div>
          </Link>
          <ul className={`nav-sm-subCategory ${subCategory2 ? "open" : ""}`}>
            <li>
              {" "}
              <Link to="/contact" className="Link">
                {" "}
                contact Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="Link">
                {" "}
                Blog
              </Link>{" "}
            </li>
            <li>
              <Link className="Link" to="/cart">
                {" "}
                Cart
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/wishlist" className="Link">
                wishlist
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/orderpg" className="Link">
                Orders
              </Link>
            </li>
          </ul>

          <Link className="li" to="/collection">
            Collections <div></div>
          </Link>
          <Link className="li" onClick={toggleSubCategory3}>
            Account{" "}
            <div>
              <IoIosArrowDown size={20} />
            </div>
          </Link>
          {localStorage.getItem("auth-token") ? (
            <ul className={`nav-sm-subCategory ${subCategory3 ? "open" : ""}`}>
              <li>
                {" "}
                <Link to="/contact" className="Link">
                  {" "}
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/blog" className="Link">
                  {" "}
                  Settings
                </Link>{" "}
              </li>
              <li>
                <Link className="Link" to="/cart">
                  {" "}
                  Address
                </Link>
              </li>
            </ul>
          ) : (
            <ul className={`nav-sm-subCategory ${subCategory3 ? "open" : ""}`}>
              <li>
                {" "}
                <Link to="/login" className="Link">
                  {" "}
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signUp" className="Link">
                  {" "}
                  Sign Up
                </Link>{" "}
              </li>
            </ul>
          )}
        </ul>
      </div>

      {/* Dimming background */}
      {navIsOpen && <div className="nav-black"></div>}

      {/* Navbar Content */}
    </div>
  );
};

export default NavSm;
