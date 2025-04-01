import React, { useState } from "react";
import "./SingleOrder.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import BackToTop from "../../components/BackToTop/BackToTop";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";

const SingleOrder = ({ page }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract order details
  const {
    name,
    city,
    state,
    street,
    country,
    postalCode,
    DeliveryFee,
    OrderPrice,
    product = [],
    paymentReference,
    orderStatus,
  } = location.state || {};

  // State to track whether to show all products
  const [showAllProducts, setShowAllProducts] = useState(false);

  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="SingleOrderPage">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <div className="single-order-address">
              <div className="single-order-address-item">
                <span>Order Id</span>: {paymentReference}
              </div>
              <div className="single-order-address-item">
                <span>Order Status</span>: {orderStatus}
              </div>
              <div className="single-order-address-item">
                <span>Name</span>: {name}
              </div>
              <div className="single-order-address-item">
                <span>Address</span>: {street}
              </div>
              <div className="single-order-address-item">
                <span>Postal code</span>: {postalCode}
              </div>
              <div className="single-order-address-item">
                <span>Country</span>: {country}
              </div>
              <div className="single-order-address-item">
                <span>State</span>: {state}
              </div>
              <div className="single-order-address-item">
                <span>City</span>: {city}
              </div>
              <div className="single-order-address-item">
                <span>Delivery Fee</span>: ${DeliveryFee}
              </div>
              <div className="single-order-address-item">
                <span>Order Price</span>: ${OrderPrice}
              </div>
              <div className="single-order-address-item">
                <span>Total</span>: ${OrderPrice + DeliveryFee}
              </div>
            </div>
          </div>

          <div className="col-md-9 col-sm-12">
            <div className="single-order-details">
              <div className="single-order-head">
                <div
                  className="arrow-back"
                  onClick={() => navigate("/orderpg")}
                  style={{ cursor: "pointer" }}
                >
                  <MdOutlineArrowBack size={17} color="white" />
                </div>
                <div className="Order-det">Order Details</div>
              </div>

              <div className="orderpg">
                <div className="table-responsive mt-4">
                  <table className="table text-nowrap table-with-checkbox">
                    <thead className="table-light">
                      <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showAllProducts ? product : product.slice(0, 3)).map(
                        (item, index) => (
                          <tr key={index}>
                            <td className="align-middle">
                              <a href="#">
                                <img
                                  src={item.image}
                                  className="icon-shape icon-xxl"
                                  alt=""
                                />
                              </a>
                            </td>
                            <td className="align-middle">
                              {item.name.slice(0, 30)}...
                            </td>
                            <td className="align-middle">{item.quantity}</td>
                            <td className="align-middle">${item.price}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {/* View More Button */}
                {product.length > 3 && (
                  <div className="text-end mt-3">
                    <button
                      className="view-mre"
                      onClick={() => setShowAllProducts(!showAllProducts)}
                    >
                      {showAllProducts ? "View Less" : "View More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default SingleOrder;
