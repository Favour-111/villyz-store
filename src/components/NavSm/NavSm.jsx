import React, { useContext, useState } from "react";
import "./NavSm.css";
import categoryType from "../../categoryType";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavSm = () => {
  const navigate = useNavigate();
  const { totalCartItems, totalWishList } = useContext(ShopContext);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [subCategory1, setSubCategory1] = useState(false);
  const [subCategory2, setSubCategory2] = useState(false);

  const handleMouseEnter = () => setNavIsOpen(true);
  const handleMouseLeave = () => setNavIsOpen(false);

  const toggleSubCategory1 = () => {
    setSubCategory1((prev) => !prev);
    if (subCategory2) setSubCategory2(false); // Close subcategory2 when opening subcategory1
  };

  const toggleSubCategory2 = () => {
    setSubCategory2((prev) => !prev);
    if (subCategory1) setSubCategory1(false); // Close subcategory1 when opening subcategory2
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
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`nav-sm-cont ${navIsOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => setNavIsOpen(false)}
          className="mt-4"
          aria-label="Close Menu"
        >
          <div className="text-capitalize ">my menu</div>
          <div>
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/wired/64/cancel--v3.png"
              alt="cancel--v3"
            />
          </div>
        </button>
        <ul className="menu-list">
          <Link className="li" to="/home">
            Home <div></div>
          </Link>
          <Link className="li" onClick={toggleSubCategory1}>
            Categories{" "}
            <div>
              <img
                width="18"
                height="18"
                src="https://img.icons8.com/android/24/plus.png"
                alt="plus"
              />
            </div>
          </Link>
          <ul className={`nav-sm-subCategory ${subCategory1 ? "open" : ""}`}>
            {categoryType.map((item) => (
              <li>
                <button
                  className="Link"
                  onClick={() => {
                    navigate("/product");
                    window.scrollTo(0, 0);
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
              <img
                width="18"
                height="18"
                src="https://img.icons8.com/android/24/plus.png"
                alt="plus"
              />
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
                Order
              </Link>
            </li>
          </ul>
          <Link className="li" to="/contact">
            Contact <div></div>
          </Link>
        </ul>
      </div>

      {/* Dimming background */}
      {navIsOpen && <div className="nav-black"></div>}

      {/* Navbar Content */}
      <div className="nav-smContent">
        <div className="logo">
          vill<span>yz</span>
        </div>
        <div className="px-3 mt-2 w-100">
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
    </div>
  );
};

export default NavSm;
