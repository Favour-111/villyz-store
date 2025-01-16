import React from "react";
import "./BreadCrumbs.css";
const BreadCrumb = ({ page }) => {
  return (
    <div className="bread-crumbs">
      <div className="bread-crumbs-container">
        <div className="Bread-crumbs-Header">{page}</div>
        <div className="d-flex gap-1 breadCrumb-content">
          <div>Home</div>
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
