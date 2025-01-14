import React from "react";
import "./NavSm.css";
import { LuUserRound } from "react-icons/lu";
const NavSm = () => {
  return (
    <div className="nav-container-sm">
      <div className="nav-sm shadow-sm">
        <div>
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
