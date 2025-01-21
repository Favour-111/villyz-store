import React, { useEffect, useState } from "react";
import "./Deals.css";
import Item from "../items/Item";
import product from "../../product";
const Deals = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
      <div className="container">
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

        <div className="item">
          <div className="itemBody">
            {product.slice(0, 10).map((item) => (
              <div key={product.id} data-aos="fade-up">
                <Item product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="banner-container">
        <div className="banner shadow-sm">
          <div className="img-container">
            <div className="blob-container">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#8A3FFC"
                  d="M42.3,-73.5C51.9,-67.8,54.5,-50.4,62.8,-36.2C71,-22,84.8,-11,88.1,1.9C91.4,14.8,84.1,29.6,75.2,42.7C66.4,55.8,56,67.4,43.2,71.1C30.4,74.9,15.2,71,1.8,67.9C-11.6,64.8,-23.2,62.5,-34.5,57.9C-45.8,53.2,-56.7,46.1,-67.4,36.1C-78.1,26,-88.7,13,-86.6,1.2C-84.4,-10.5,-69.6,-21.1,-59.2,-31.7C-48.8,-42.3,-42.7,-52.9,-33.6,-58.9C-24.5,-64.8,-12.2,-66,2.1,-69.6C16.4,-73.2,32.8,-79.2,42.3,-73.5Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
            <div className="blob-container2">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#FA4D56"
                  d="M40.3,-62.5C53.7,-54.1,67,-45.4,75.9,-32.7C84.7,-20,89,-3.3,84,10.1C79.1,23.6,64.9,33.7,53.3,45.2C41.8,56.7,33,69.6,20.7,75.3C8.5,81,-7.2,79.5,-19.8,73.2C-32.4,66.9,-41.9,55.7,-49.3,44.3C-56.8,32.9,-62.1,21.3,-63.5,9.3C-64.9,-2.6,-62.3,-15,-58.6,-28.2C-54.8,-41.5,-49.8,-55.6,-39.9,-65.6C-29.9,-75.6,-14.9,-81.4,-0.7,-80.2C13.5,-79,26.9,-70.9,40.3,-62.5Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
            <div className="img-blob" data-aos="fade-right">
              <img
                src="https://i02.appmifile.com/552_operatorx_operatorx_opx/19/10/2023/09218c6cba39756bf7a86f9f70e240da.png"
                alt=""
              />
            </div>
          </div>
          <div className="banner-text-container" data-aos="fade-left">
            <div className="banner-head">Cleaning machine</div>
            <div className="banner-head">for homes</div>
            <div className="sale mb-2">5% off sale </div>
            <a href="#" className="Button shadow-sm">
              shop now
            </a>
            <div className="blob"></div>
            <div className="blob2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
