import React, { useEffect, useState } from "react";
import "./OrderPage.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import BackToTop from "../../components/BackToTop/BackToTop";
import { useNavigate } from "react-router-dom";
import AccountSideBar from "../../components/AccountSideBar/AccountSideBar";
import AccountSideBarSm from "../../components/AccountSideBarSm/AccountSideBarSm";
import { HiOutlineEye } from "react-icons/hi";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import Cart from "./b4728tKYUsFQNOfV.webp";

const OrderPage = ({ page }) => {
  const [order, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeStatus, setActiveStatus] = useState("ongoing");
  const [showAll, setShowAll] = useState(false); // State to track "View More"

  const fetchOrders = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://villyzstore.onrender.com/allOrders"
      );
      if (response) {
        setOrders(response.data);
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

  // Filter orders based on userId
  const userOrders = order.filter(
    (item) => item.UserID === localStorage.getItem("userId")
  );

  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="account-pg">
        <AccountSideBar />
        <div className="w-100 p-3">
          <AccountSideBarSm />
          <div className="order-header mt-3">
            product <span> order list</span>
          </div>
          <div className="order-type">
            <button
              className={activeStatus === "ongoing" ? "active" : ""}
              onClick={() => setActiveStatus("ongoing")}
            >
              Ongoing/Delivered
            </button>
            <button
              className={activeStatus === "cancelled" ? "active" : ""}
              onClick={() => setActiveStatus("cancelled")}
            >
              Cancelled
            </button>
          </div>
          <div className="Orders">
            {userOrders
              .slice(0, showAll ? userOrders.length : 3) // Show 3 orders initially, show all if `showAll` is true
              .map((item) => (
                <div className="order-item mt-3" key={item.paymentReference}>
                  <div>
                    <img src={Cart} alt="Order" />
                  </div>
                  <div className="mt-3">
                    <div className="Order_Id">{item.paymentReference}</div>
                    <div className="Order_Status">{item.orderStatus}</div>
                    <div className="Order_date">
                      On {item.date.slice(0, 10)}
                    </div>
                  </div>
                  <div
                    className="Details"
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
                          product: item.Orders,
                          paymentReference: item.paymentReference,
                          orderStatus: item.orderStatus,
                        },
                      });
                      window.scrollTo(0, 0);
                    }}
                  >
                    See Details
                  </div>
                </div>
              ))}
          </div>
          {userOrders.length > 3 && (
            <div className="text-end mt-3">
              <button
                className="view-more-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </div>
        {loader && <Loading />}
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default OrderPage;
