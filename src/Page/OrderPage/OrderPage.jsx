import React from "react";
import "./OrderPage.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import BackToTop from "../../components/BackToTop/BackToTop";
import product from "../../product";
import { Link, useNavigate } from "react-router-dom";
import AccountSideBar from "../../components/AccountSideBar/AccountSideBar";
import AccountSideBarSm from "../../components/AccountSideBarSm/AccountSideBarSm";
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
      <div className="account-pg ">
        <AccountSideBar />
        <div className=" w-100">
          <AccountSideBarSm />
          <div className="order-head ">
            <div className="order-header">
              product <span> order list</span>
            </div>
            <div className="order-content mb-4">
              your product order is our first priority
            </div>
          </div>
          <div className="p-4">
            <div class="table-responsive mt-4">
              <table class="table text-nowrap table-with-checkbox">
                <thead class="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Shipping</th>
                    <th>quantity</th>
                    <th>date</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {order.map((item) => {
                  return (
                    <tbody>
                      <tr>
                        <td class="align-middle">#1212</td>
                        <td class="align-middle">
                          <div>
                            <h5 class="fs-6 mb-0">{item.fee}</h5>
                          </div>
                        </td>
                        <td class="align-middle">${item.quantity}</td>
                        <td class="align-middle">${item.date}</td>
                        <td class="align-middle">
                          <span class="badge bg-success">delivered</span>
                        </td>
                        <td class="align-middle">
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
                    </tbody>
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
