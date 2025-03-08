import React, { useState } from "react";
import "./AccountSideBarSm.css";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";

const AccountSideBarSm = () => {
  const location = useLocation();
  const [navIsOpen, setNavIsOpen] = useState(false);

  return (
    <div className="acc-sm">
      <div className="account-sm-bread-crumb">
        <div>Account settings</div>
        <button onClick={() => setNavIsOpen((prev) => !prev)}>
          <img
            src="https://img.icons8.com/ios-glyphs/30/menu--v3.png"
            width={20}
            alt="menu"
          />
        </button>
      </div>
      <div
        className={`side-account-cont-sm shadow-sm ${navIsOpen ? "open" : ""}`}
      >
        <div className="account-sm-bread-crumb">
          <div>Account settings</div>
          <button onClick={() => setNavIsOpen(false)}>
            <CgClose size={18} />
          </button>
        </div>
        <div className="account-sm">
          <ul>
            <li>
              <Link
                to="/orderPg"
                className={`side-list ${
                  location.pathname === "/orderPg" ? "active2" : ""
                }`}
              >
                <FiShoppingBag />
                <span>Your Order</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/profile/${localStorage.getItem("userId")}`}
                className={`side-list ${
                  location.pathname.startsWith("/profile/") ? "active2" : ""
                }`}
              >
                <CiSettings size={18} />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/addresses"
                className={`side-list ${
                  location.pathname === "/addresses" ? "active2" : ""
                }`}
              >
                <IoLocationOutline size={18} />
                <span>Addresses</span>
              </Link>
            </li>
            <div className="line"></div>
            <li>
              <div
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  localStorage.removeItem("userId");
                  window.location.replace("/login");
                }}
                className="side-list"
              >
                <FiLogOut size={18} />
                <span>Log Out</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountSideBarSm;
