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
              <div className="Order-details-table">
                <table className="table2">
                  <tr className="table-header">
                    <td>ID</td>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Date</td>
                    <td>Price</td>
                  </tr>
                  {product.slice(0, 3).map((e) => {
                    return (
                      <tr>
                        <td>1</td>
                        <td>
                          <img src={e.image} alt="" width={50} height={50} />
                        </td>
                        <td>
                          <div>{e.name}</div>
                        </td>
                        <td>
                          <div>12-2-2022</div>
                        </td>
                        <td>${e.newPrice}</td>
                      </tr>
                    );
                  })}
                </table>
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
