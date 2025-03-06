import React from "react";
import "./AccountSideBar.css";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const AccountSideBar = () => {
  return (
    <div>
      <div className="side-account-cont">
        <div className="account">
          <ul>
            <li>
              <Link to="/orderPg" className="side-list">
                <div>
                  <FiShoppingBag />
                </div>
                <div>Your Order</div>
              </Link>
            </li>
            <li>
              <Link className="side-list">
                <div>
                  <CiSettings size={18} />
                </div>
                <div>Settings</div>
              </Link>
            </li>
            <li>
              <Link className="side-list">
                <div>
                  <IoLocationOutline size={18} />
                </div>
                <div>Addresses</div>
              </Link>
            </li>
            <div className="line"></div>
            <li>
              <Link className="side-list">
                <div>
                  <FiLogOut size={18} />
                </div>
                <div>Log Out</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountSideBar;
