import React from "react";
import "./SingleOrder.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import BackToTop from "../../components/BackToTop/BackToTop";
import { IoIosArrowRoundBack } from "react-icons/io";
import product from "../../product";
import { useNavigate } from "react-router-dom";
const SingleOrder = ({ page }) => {
  const navigate = useNavigate();
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
                <span>Name</span> : Omojola Obaloluwa{" "}
              </div>
              <div className="single-order-address-item">
                <span>Address</span> : Lagos{" "}
              </div>
              <div className="single-order-address-item">
                <span>Postal code</span> : 23434{" "}
              </div>
              <div className="single-order-address-item">
                <span>Country</span> : Nigeria{" "}
              </div>
              <div className="single-order-address-item">
                <span>State</span> : Lagos{" "}
              </div>
              <div className="single-order-address-item">
                <span>Delivery Fee</span> : $20{" "}
              </div>
            </div>
          </div>
          <div className="col-md-9 col-sm-12">
            <div className="single-order-details">
              <div className="single-order-head">
                <div
                  className="arrow-back"
                  onClick={() => navigate("/orderpg")}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <IoIosArrowRoundBack size={30} color="white" />
                </div>
                <div>Order Details</div>
                <div></div>
              </div>
              <div className="t">
                <div class="table-responsive mt-4">
                  <table class="table text-nowrap table-with-checkbox">
                    <thead class="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    {product.slice(0, 3).map((item) => {
                      return (
                        <tbody>
                          <tr>
                            <td class="align-middle">#1212</td>
                            <td class="align-middle">
                              <a href="#">
                                <img
                                  src={item.image}
                                  class="icon-shape icon-xxl"
                                  alt=""
                                />
                              </a>
                            </td>
                            <td class="align-middle">{item.name}</td>
                            <td class="align-middle">2023-2-24</td>
                            <td class="align-middle">${item.newPrice}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
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
