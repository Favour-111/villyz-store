import React from "react";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import Info from "../../components/info/Info";
import Footer from "../../footer/Footer";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import "./Cart.css";
const Cart = ({ page }) => {
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="cart-container">
        <div className="row">
          <div className="col-4">
            <div className="cart-summary">
              <div className="cart-summary-header">Summary</div>
            </div>
          </div>
          <div className="col-8">s</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
