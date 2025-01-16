import React from "react";
import "./User.css";
import Nav from "../../components/Nav/Nav";
import Info from "../../components/info/Info";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import NavSm from "../../components/NavSm/NavSm";
import { Link } from "react-router-dom";
const User = ({ page }) => {
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="register-header-container">
        <div className="register-header">Register</div>
        <div className="register-content">Best place to buy DIY Products</div>
      </div>

      <div className="form-container">
        <div className="input-sm">
          <div className="input-small-container">
            <label htmlFor="">First Name*</label>
            <input
              type="text"
              placeholder="input first name"
              name="firstName"
              required
            />
          </div>
          <div className="input-small-container">
            <label htmlFor="">Last Name*</label>
            <input
              type="text"
              placeholder="input last name"
              name="LastName"
              required
            />
          </div>
        </div>
        <div className="input-sm ">
          <div className="input-small-container">
            <label htmlFor="">Email*</label>
            <input
              type="email"
              placeholder="input email "
              name="email"
              required
            />
          </div>
          <div className="input-small-container">
            <label htmlFor="">phone number*</label>
            <input
              type="text"
              placeholder="input phone number"
              name="PhoneNumber"
              required
            />
          </div>
        </div>
        <div className="input-sm">
          <div className="input-small-container">
            <label htmlFor="">Password*</label>
            <input
              type="password"
              placeholder="input password "
              name="password"
              required
            />
          </div>
          <div className="input-small-container">
            <label htmlFor="">confirm password*</label>
            <input
              type="password"
              placeholder="confirm password"
              name="confirmpassword"
              required
            />
          </div>
        </div>
        <div className="register-container">
          <div className="login-change">
            Already have an account ?{" "}
            <Link to="/login" className="a">
              Login
            </Link>
          </div>
          <button className="register shadow-sm">Register</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
