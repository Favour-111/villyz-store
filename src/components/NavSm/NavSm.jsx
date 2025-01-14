import React, { useState } from "react";
import "./NavSm.css";

const NavSm = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const handleMouseEnter = () => setNavIsOpen(true);
  const handleMouseLeave = () => setNavIsOpen(false);

  return (
    <div className={`nav-container-sm ${navIsOpen ? "no-scroll" : ""}`}>
      {/* Main Navbar */}
      <div className="nav-sm shadow-sm">
        <div
          className="menu-icon"
          onMouseEnter={handleMouseEnter}
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
          <li>
            Home{" "}
            <div>
              <img
                width="18"
                height="18"
                src="https://img.icons8.com/android/24/plus.png"
                alt="plus"
              />
            </div>
          </li>
          <li>
            Products{" "}
            <div>
              <img
                width="18"
                height="18"
                src="https://img.icons8.com/android/24/plus.png"
                alt="plus"
              />
            </div>
          </li>
          <li>
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
