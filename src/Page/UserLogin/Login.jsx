import React, { useState } from "react";
import "./Login.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import BackToTop from "../../components/BackToTop/BackToTop";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

const Login = ({ page }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setErrors({});

    if (!validateForm()) {
      setLoader(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://villyzstore.onrender.com/login",
        formData
      );

      if (response.data.success) {
        localStorage.setItem("auth-token", response.data.token);
        localStorage.setItem("userId", response.data.id);

        setFormData({ email: "", password: "" });
        setTimeout(() => {
          navigate(`/home`);
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.msg,
        });
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg || "An error occurred";

        if (errorMessage.toLowerCase().includes("email")) {
          setErrors({ email: errorMessage });
        } else if (errorMessage.toLowerCase().includes("password")) {
          setErrors({ password: errorMessage });
        } else {
          setErrors({ general: errorMessage });
        }

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Network error. Please try again later.",
        });
      }
    } finally {
      setLoader(false);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <div className="login-form-container">
          <div className="login-form">
            <div className="login-form-item">
              <label>Email*</label>
              <input
                type="text"
                placeholder="Input email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="login-form-item">
              <label>Password*</label>
              <input
                type="password"
                placeholder="Input password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            {errors.general && <span className="error">{errors.general}</span>}
            <Link to="/forgot_password" className="forgot">
              Forgot password?
            </Link>
            <div className="d-flex align-items-center justify-content-between mt-3">
              <Link to="/SignUp" className="sign-up-btn">
                Create Account?
              </Link>
              <button type="submit" className="login-bnt" disabled={loader}>
                {loader ? (
                  <div className="spinner-border text-light fs-6" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
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
      </form>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Login;
