import React from "react";
import "./InfoSm.css";
const InfoSm = () => {
  return (
    <div>
      <div className="info-container2">
        <div className="d-flex gap-3">
          <div className="d-flex gap-2 align-items-center">
            <i class="fa-solid fa-phone-volume opacity-50"></i>
            <div className="info-container-text">+55139977862</div>
          </div>
          <div className="d-flex gap-1 align-items-center">
            <i class="fa-brands fa-whatsapp"></i>
            <div className="info-container-text">+55139977862</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSm;
