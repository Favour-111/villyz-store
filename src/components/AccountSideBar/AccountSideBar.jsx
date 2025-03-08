import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AccountSideBar.css";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const AccountSideBar = () => {
  const location = useLocation();

  return (
    <>
      <div>
        <div className="side-account-cont">
          <div className="account">
            <ul>
              <li>
                <Link
                  to="/orderPg"
                  className={`side-list ${
                    location.pathname === "/orderPg" ? "active" : ""
                  }`}
                >
                  <div>
                    <FiShoppingBag />
                  </div>
                  <div>Your Order</div>
                </Link>
              </li>
              <li>
                <Link
                  to={`/profile/${localStorage.getItem("userId")}`}
                  className={`side-list ${
                    location.pathname.startsWith("/profile/") ? "active" : ""
                  }`}
                >
                  <div>
                    <CiSettings size={18} />
                  </div>
                  <div>Settings</div>
                </Link>
              </li>
              <li>
                <Link
                  to="/addresses"
                  className={`side-list ${
                    location.pathname === "/addresses" ? "active" : ""
                  }`}
                >
                  <div>
                    <IoLocationOutline size={18} />
                  </div>
                  <div>Addresses</div>
                </Link>
              </li>
              <div className="line"></div>
              <li>
                <div
                  to="/logout"
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("userId");
                    window.location.replace("/login");
                  }}
                  className="side-list"
                >
                  <div>
                    <FiLogOut size={18} />
                  </div>
                  <div>Log Out</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSideBar;
