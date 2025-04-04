import React, { useEffect } from "react";
import "./Success.css";
import success from "./65087a639b4c2d762f923d6e_Green Tick.svg";

const Success = () => {
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     window.location.replace("/");
  //   }, 5000);

  //   // Cleanup function to prevent memory leaks
  //   return () => clearTimeout(timeout);
  // }, []); // Run only once when the component mounts
  console.log(122);

  return (
    <div className="Success-body">
      <img src={success} alt="Success Icon" />
      <div className="success-text">Thank You!</div>
      <div className="success-text2">Payment done successfully</div>
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
