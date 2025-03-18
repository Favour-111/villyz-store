import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
const Footer = () => {
  const [categoryType, setcategoryType] = useState([]);
  const [loader, setLoader] = useState(false);
  const getallCategory = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://villyzstore.onrender.com/getallCategory"
      );
      if (response) {
        setcategoryType(response.data.response);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getallCategory();
  }, []);
  return (
    <div>
      <div className="footer">
        <div className="row w-100">
          <div className="col-md-3 col-sm-12">
            <div className="logo">
              Vill<span>yz</span>
            </div>
            <div className="footer-name-content">
              Villyz is the biggest market of grocery products. Get your daily
              needs from our store.
            </div>
          </div>
          <div className="col-md-2 col-sm-12">
            <div className="footer-header">Category</div>
            <ul>
              {loader ? (
                <div className="loading">loading..</div>
              ) : (
                categoryType.slice(0, 6).map((item) => {
                  return (
                    <li>
                      <Link
                        className="category"
                        to={`/${item.name}`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
          <div className="col-md-2 col-sm-12">
            <div className="footer-header">Company</div>
            <ul>
              <li>
                <Link
                  className="category"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Terms & condition
                </Link>
              </li>

              <li>
                <Link
                  className="category"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  checkout
                </Link>
              </li>
              <li>
                <Link
                  className="category"
                  to="/contact"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  contact us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-sm-12">
            <div className="footer-header">Account</div>
            <ul>
              <li>
                <Link
                  className="category"
                  to="/login"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  className="category"
                  to="/SignUp"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  sign up
                </Link>
              </li>
              <li>
                <Link
                  className="category"
                  to="/cart"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  view cart
                </Link>
              </li>
              <li>
                <Link to="/orderpg" className="category">
                  orders
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-12">
            <div className="footer-header">Contact</div>
            <div className="address-info">
              <div className="d-flex gap-1 align mt-2">
                <div>
                  <FaWhatsapp className="icon" />
                </div>
                <div className="address-details">+551 399 7862</div>
              </div>
              <div className="d-flex gap-1 align mt-2">
                <div>
                  <CiMail className="icon" />
                </div>
                <div className="address-details">villyz0102@gmail.com</div>
              </div>
              <div className="d-flex gap-1 align mt-2">
                <div>
                  <CiLocationOn className="icon" />
                </div>
                <div className="address-details mt-2">
                  New Jersey , United State
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copywrite">
        Copyright © all rights reserved. Powered by horbah's tech
      </div>
    </div>
  );
};

export default Footer;
