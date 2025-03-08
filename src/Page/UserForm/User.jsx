import React, { useState } from "react";
import "./User.css";
import Nav from "../../components/Nav/Nav";
import Info from "../../components/info/Info";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import NavSm from "../../components/NavSm/NavSm";
import { Link } from "react-router-dom";
import BackToTop from "../../components/BackToTop/BackToTop";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
const User = ({ page }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (
      password.match(/[A-Z]/) && // At least one uppercase letter
      password.match(/[a-z]/) && // At least one lowercase letter
      password.match(/[0-9]/) && // At least one number
      password.match(/[^A-Za-z0-9]/) // At least one special character
    ) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("Average");
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.FirstName.trim())
      newErrors.FirstName = "First name is required";
    if (!formData.LastName.trim()) newErrors.LastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (passwordStrength === "weak")
      newErrors.password = "Password cannot be weak";

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true); // Show loader while submitting
    if (!validateForm()) {
      setLoader(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://villyzstore.onrender.com/users",
        formData
      );

      if (response.data.success === true) {
        setPasswordStrength("weak");

        localStorage.setItem("auth-token", response.data.token);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.msg,
          footer:
            "Please verify your email address. A confirmation email has been sent to you.",
        });
        setFormData({
          FirstName: "",
          LastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.msg,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // If backend returns 400 status, check for email exists error
        setErrors({ ...errors, email: error.response.data.msg });

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
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
        <div className="register-header">Register</div>
        <div className="register-content">Best place to buy DIY Products</div>
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-sm">
            <div className="input-small-container">
              <label>First Name*</label>
              <input
                type="text"
                placeholder="Enter first name"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
              />
              {errors.FirstName && (
                <span className="error">{errors.FirstName}</span>
              )}
            </div>
            <div className="input-small-container">
              <label>Last Name*</label>
              <input
                type="text"
                placeholder="Enter last name"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
              />
              {errors.LastName && (
                <span className="error">{errors.LastName}</span>
              )}
            </div>
          </div>
          <div className="input-sm">
            <div className="input-small-container">
              <label>Email*</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-small-container">
              <label>Phone Number*</label>
              <input
                type="text"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber}</span>
              )}
            </div>
          </div>
          <div className="input-sm">
            <div className="input-small-container">
              <label>Password*</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
              <div className="password-strength-container">
                <div className="password-strength">
                  <div className={`strength-bar ${passwordStrength}`}></div>
                </div>
                <p className={`strength-text-${passwordStrength}`}>
                  {passwordStrength}
                </p>
              </div>
            </div>
            <div className="input-small-container mt-3">
              <label>Confirm Password*</label>
              <input
                className={errors.confirmPassword && "inputError"}
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
          </div>
          <div className="register-container">
            <div className="login-change">
              Already have an account?{" "}
              <Link to="/login" className="a">
                Login
              </Link>
            </div>
            <div className={loader ? "spinning" : ""}></div>
            <button type="submit" className="register shadow-sm">
              {loader ? (
                <div class="spinner-border text-light fs-6" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default User;
