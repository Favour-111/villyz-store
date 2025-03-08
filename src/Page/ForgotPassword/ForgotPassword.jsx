import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const ForgotPassword = () => {
  const [loading, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");

  const validateForm = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setErrors({});

    if (!validateForm()) {
      setLoader(false);
      return;
    }

    console.log(email);

    try {
      setLoader(true);
      const response = await axios.post(
        "https://villyzstore.onrender.com/forgot_password",
        { email }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Email sent successfully please check email",
          text: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
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
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <div className="forgot-password-container">
        <div className="forgot-password-head">Forgotten password?</div>
        <div className="forgot-password-content">
          No worries, we will send you reset instructions.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="forgot-pass-cont shadow-sm">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <br />
            <button disabled={loading}>
              {loading ? "Sending..." : "Send Mail"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
