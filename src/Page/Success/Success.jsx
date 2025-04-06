import React, { useEffect } from "react";
import "./Success.css";
import success from "./65087a639b4c2d762f923d6e_Green Tick.svg";
import Swal from "sweetalert2";
import axios from "axios";

const Success = () => {
  useEffect(() => {
    const storedOrder = localStorage.getItem("orderData");

    if (storedOrder) {
      const orderData = JSON.parse(storedOrder);

      const submitOrder = async () => {
        try {
          const response = await axios.post(
            "https://villyzstore.onrender.com/addOrder",
            orderData
          );

          if (response.data) {
            Swal.fire({
              icon: "success",
              title: "Order Submitted Successfully!",
              timer: 2000,
              showConfirmButton: false,
            });

            // Clear session data
            sessionStorage.removeItem("orderData");
          }
        } catch (error) {
          console.error("Order submission failed:", error);
          Swal.fire({
            icon: "error",
            title: "Order submission failed",
            text: error.response?.data?.error || "An error occurred",
          });
        }
      };

      submitOrder();
    }

    const timeout = setTimeout(() => {
      window.location.replace("/orderPg");
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="Success-body">
      <img src={success} alt="Success Icon" />
      <div className="success-text">Thank You!</div>
      <div className="success-text2">Payment done successfully!</div>
      <div className="success-content">
        You will be redirected to the homepage shortly.
        <br />
        Or click below to return immediately.
      </div>
      <button
        onClick={() => window.location.replace("/")}
        className="success-home"
      >
        Home
      </button>
    </div>
  );
};

export default Success;
