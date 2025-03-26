import React, { useContext, useEffect, useState } from "react";
import "./Deals.css";
import Item from "../items/Item";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
const Deals = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { product } = useContext(ShopContext);

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format the time
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };
  return (
    <div>
      <div className="Deal-container">
        <div className="container-header">
          <div>
            <div className="header">
              <span>Deals</span> of the day
            </div>
            <div className="content">enjoy great shopping experience</div>
          </div>
          <div className="timer shadow-sm">
            <div> {formatTime(currentTime.getHours())} :</div>
            <div> {formatTime(currentTime.getMinutes())} :</div>
            <div> {formatTime(currentTime.getSeconds())}</div>
          </div>
        </div>

        <div className="Deal-itemBody">
          {product
            .filter((item) => item.deals === "Deal")
            .map((item) => (
              <div key={product.id}>
                <Item product={item} />
              </div>
            ))}
        </div>
      </div>
      <div className="banner-container">
        <div className="banner">
          <div className="banner-image">
            <img src="https://pngimg.com/d/robot_vacuum_PNG12.png" alt="" />
          </div>
          <div className="banner-text">
            <div className="text-1">
              High-Quality Electronics Premium Product
            </div>
            <div className="sales">
              20% off sale <span> Hurry up!!!</span>
            </div>
            <button>Shop Now</button>
          </div>
          <div className="banner-blob-1"></div>
          <div className="banner-blob-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
