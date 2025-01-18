import React, { useEffect } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const router = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      router("/home");
    }, 5000);
  });
  return (
    <div>
      <div className="landing-cont">
        <div className="landingLogo">
          Vill<span>yz</span>
        </div>
        <div class="spinner">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
