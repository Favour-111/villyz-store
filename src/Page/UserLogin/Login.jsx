import React from "react";
import "./Login.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import BackToTop from "../../components/BackToTop/BackToTop";
const Login = ({ page }) => {
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="register-header-container">
        <div className="register-header">Login</div>
        <div className="register-content">Best place to buy DIY Products</div>
      </div>
      <div className="login-form-container">
        <div className="login-form">
          <div className="login-form-item">
            <label htmlFor="">Email*</label>
            <input type="text" placeholder="input email address" name="email" />
          </div>
          <div className="login-form-item">
            <label htmlFor="">Password*</label>
            <input
              type="password"
              placeholder="input password"
              name="password"
            />
          </div>
          <div className="forgot">forgot password?</div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <Link to="/SignUp" className="sign-up-btn">
              Create Account?
            </Link>
            <button className="login-bnt">Login</button>
          </div>
        </div>
        <div className="loginFormFan-container">
          <img
            src="https://png.pngtree.com/png-clipart/20220125/original/pngtree-mini-fan-png-image_7209820.png"
            alt=""
          />
          <div className="blobimg">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#8A3FFC"
                d="M42.3,-73.5C51.9,-67.8,54.5,-50.4,62.8,-36.2C71,-22,84.8,-11,88.1,1.9C91.4,14.8,84.1,29.6,75.2,42.7C66.4,55.8,56,67.4,43.2,71.1C30.4,74.9,15.2,71,1.8,67.9C-11.6,64.8,-23.2,62.5,-34.5,57.9C-45.8,53.2,-56.7,46.1,-67.4,36.1C-78.1,26,-88.7,13,-86.6,1.2C-84.4,-10.5,-69.6,-21.1,-59.2,-31.7C-48.8,-42.3,-42.7,-52.9,-33.6,-58.9C-24.5,-64.8,-12.2,-66,2.1,-69.6C16.4,-73.2,32.8,-79.2,42.3,-73.5Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <div className="blob"></div>
          <div className="blob2"></div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Login;
