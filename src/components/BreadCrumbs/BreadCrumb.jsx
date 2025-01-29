import React from "react";
import "./BreadCrumbs.css";
import { useNavigate } from "react-router-dom";
const BreadCrumb = ({ page }) => {
  const navigate = useNavigate();
  return (
    <div className="bread-crumbs">
      <div className="bread-crumbs-container">
        <div className="Bread-crumbs-Header">{page}</div>
        <div className="d-flex gap-1 breadCrumb-content">
          <div
            onClick={() => navigate("/home")}
            style={{
              cursor: "pointer",
            }}
          >
            Home
          </div>
          <div>
            <img
              width="10"
              height="10"
              src="https://img.icons8.com/ios-glyphs/30/forward.png"
              alt="forward"
            />
          </div>
          <span>{page}</span>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
