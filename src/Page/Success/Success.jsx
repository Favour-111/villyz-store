import React from "react";
import "./Success.css";
import success from "./65087a639b4c2d762f923d6e_Green Tick.svg";
const Success = () => {
  return (
    <div className="Success-body">
      <img src={success} alt="" />
      <div className="success-text">Thank You !</div>
      <div className="success-text2">Payment done successfully</div>
      <div className="success-content">
        you will be redirected to the homepage shortly
        <br />
        or click here to return to the home page
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
