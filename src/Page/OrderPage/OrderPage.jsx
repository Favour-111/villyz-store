import React, { useEffect, useState } from "react";
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
import { HiOutlineEye } from "react-icons/hi";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
const OrderPage = ({ page }) => {
  const [order, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchOrders = async () => {
    try {
      setLoader(true);
      const response = await axios.get("http://localhost:5000/allOrders");
      if (response) {
        setOrders(response.data);
        console.log(response);
      } else {
        alert("Error fetching orders");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
          <div className="p-4 orderpg">
            <div class="table-responsive mt-4">
              <table class="table text-nowrap table-with-checkbox">
                <thead class="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Shipping Fee</th>
                    <th>Order Price</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {order
                  .filter(
                    (item) => item.UserID === localStorage.getItem("userId")
                  )
                  .map((item) => {
                    return (
                      <tbody>
                        <tr>
                          <td class="align-middle">{item.paymentReference}</td>
                          <td class="align-middle">
                            <div>
                              <p class=" mb-0">${item.DeliveryFee}</p>
                            </div>
                          </td>
                          <td class="align-middle">{item.OrderPrice}</td>
                          <td class="align-middle">
                            <span class="badge bg-success">delivered</span>
                          </td>
                          <td class="align-middle">
                            <div
                              onClick={() => {
                                navigate("/singleOrder", {
                                  state: {
                                    name: item.name,
                                    country: item.country,
                                    street: item.street,
                                    postalCode: item.postalCode,
                                    city: item.city,
                                    state: item.state,
                                    DeliveryFee: item.DeliveryFee,
                                    OrderPrice: item.OrderPrice,
                                    state: item.state,
                                    product: item.Orders,
                                  },
                                });
                                window.scrollTo(0, 0);
                              }}
                              title="View"
                            >
                              <HiOutlineEye className="fs-6" />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
        {loader ? <Loading /> : null}
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default OrderPage;
