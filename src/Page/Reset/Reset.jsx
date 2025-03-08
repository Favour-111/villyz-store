import React, { useState } from "react";
import "./Reset.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";

const Reset = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("weak");

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
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
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!input.password.trim()) newErrors.password = "Password is required";
    if (passwordStrength === "weak")
      newErrors.password = "Password cannot be weak";

    if (!input.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (input.confirmPassword !== input.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setLoader(false);
      return;
    } else {
      setLoader(true); // Show loader while submitting

      try {
        const response = await axios.post(
          `https://villyzstore.onrender.com/reset-password/${id}/${token}`,
          { password: input.password }
        );

        if (response.data.success) {
          Swal.fire({
            title: "Success",
            text: response.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/login");
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.msg,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `An error occurred. Please try again.`,
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div className="reset-body">
      <div className="reset-head">Set New Password</div>
      <div className="reset-content">password must be 6 character long</div>

      <form action="" onSubmit={handleSubmit}>
        <div className="password-bdy shadow-sm">
          <div className="input-small-container">
            <label>Password*</label>
            <br />
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleInput}
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
            <br />
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleInput}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <button type="submit">
            {loading ? "Please wait..." : "Reset password"}
          </button>
          <Link to="/login" className="back-login">
            <IoIosArrowRoundBack /> Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Reset;
