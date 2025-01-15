import React, { useState } from "react";
import "./NavSm.css";
import categoryType from "../../categoryType";

const NavSm = () => {
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
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/pulsar-line/48/user.png"
            alt="user"
          />
          <div className="icon-sm">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/wired/64/like--v1.png"
              alt="like--v1"
            />
            <div className="counter">2</div>
          </div>
          <div className="icon-sm">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/pulsar-line/48/fast-cart.png"
              alt="fast-cart"
            />
            <div className="counter">2</div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`nav-sm-cont ${navIsOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button onClick={() => setNavIsOpen(false)} aria-label="Close Menu">
          <div className="text-capitalize">my menu</div>
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
          <li onClick={toggleSubCategory1}>
            home{" "}
            <div>
              <img
                width="18"
                height="18"
                src="https://img.icons8.com/android/24/plus.png"
                alt="plus"
              />
            </div>
          </li>
          <li onClick={toggleSubCategory1}>
            Categories{" "}
            <div>
              <img
                width="18"
                height="18"
                src="https://img.icons8.com/android/24/plus.png"
                alt="plus"
              />
            </div>
          </li>
          <ul className={`nav-sm-subCategory ${subCategory1 ? "open" : ""}`}>
            {categoryType.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <li onClick={toggleSubCategory2}>
            Pages{" "}
            <div>
              <img
                width="18"
                height="18"
                src="https://img.icons8.com/android/24/plus.png"
                alt="plus"
              />
            </div>
          </li>
          <ul className={`nav-sm-subCategory ${subCategory2 ? "open" : ""}`}>
            <li>About Us</li>
            <li>contact Us</li>
            <li>cart </li>
            <li>checkout</li>
            <li>wishlist</li>
          </ul>
          <li>
            Contact{" "}
            <div>
              <img
                width="18"
                height="18"
                src="https://img.icons8.com/android/24/plus.png"
                alt="plus"
              />
            </div>
          </li>
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
            <input type="text" placeholder="search product" name="" id="" />
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
