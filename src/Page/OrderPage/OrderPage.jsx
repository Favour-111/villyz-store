import React from "react";
import "./OrderPage.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import BackToTop from "../../components/BackToTop/BackToTop";
import product from "../../product";
import { useNavigate } from "react-router-dom";
const OrderPage = ({ page }) => {
  const order = [
    {
      fee: 30,
      quantity: 3,
      status: "delivered",
      date: "2017-20-01",
    },
    {
      fee: 40,
      quantity: 3,
      status: "pending",
      date: "2017-20-01",
    },
    {
      fee: 30,
      quantity: 3,
      status: "shipped",
      date: "2017-20-01",
    },
    {
      fee: 30,
      quantity: 3,
      status: "pending",
      date: "2017-20-01",
    },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div>
        <div className="order-head">
          <div className="order-header">
            product <span> order list</span>
          </div>
          <div className="order-content mb-4">
            your product order is our first priority
          </div>
        </div>
        <div>
          <div className="order-container">
            <div className="cart-cont p-3">
              <table className="table2">
                <div className="order-type mb-4">Pending Order</div>
                <tr className="table-header">
                  <td>Order ID</td>
                  <td>Shipping</td>
                  <td>quantity</td>
                  <td>date</td>
                  <td>status</td>
                  <td>Action</td>
                </tr>
                {order.map((e) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <div>#1246</div>
                        </div>
                      </td>
                      <td>${e.fee}</td>
                      <td>
                        <div>{e.quantity}</div>
                      </td>
                      <td>
                        <div>{e.date}</div>
                      </td>
                      <td>
                        <div className="counter-container">{e.status}</div>
                      </td>
                      <td>
                        <button
                          className="View"
                          onClick={() => {
                            navigate("/singleOrder");
                            window.scrollTo(0, 0);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="order-container">
            <div className="cart-cont">
              <table className="table2">
                <div className="order-type mb-4">Approved Order</div>
                <tr className="table-header">
                  <td>Order ID</td>
                  <td>Shipping</td>
                  <td>quantity</td>
                  <td>date</td>
                  <td>status</td>
                  <td>Action</td>
                </tr>
                {order.map((e) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <div>#1246</div>
                        </div>
                      </td>
                      <td>${e.fee}</td>
                      <td>
                        <div>{e.quantity}</div>
                      </td>
                      <td>
                        <div>{e.date}</div>
                      </td>
                      <td>
                        <div className="counter-container">{e.status}</div>
                      </td>
                      <td>
                        <button
                          className="View"
                          onClick={() => {
                            navigate("/singleOrder");
                            window.scrollTo(0, 0);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default OrderPage;
