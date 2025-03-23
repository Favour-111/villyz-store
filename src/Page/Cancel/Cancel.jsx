import React from "react";
import "./Cancel.css";
import cancel from "./order-cancel-3d-illustration-icon-png.webp";
const Cancel = () => {
  return (
    <div className="cancel-body">
      <img src={cancel} alt="" />
      <div className="cancel-head">payment cancelled!</div>
      <div className="cancel-content">
        Payment has been cancelled , you will be redirected <br /> to the
        checkout page or click the button
      </div>
      <button
        onClick={() => window.location.replace("/checkout")}
        className="success-home"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cancel;
