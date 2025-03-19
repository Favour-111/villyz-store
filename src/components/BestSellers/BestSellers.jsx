import React, { useContext } from "react";
import "./BestSellers.css";
import Item from "../items/Item";
import { ShopContext } from "../context/ShopContext";
const BestSellers = () => {
  const { product } = useContext(ShopContext);
  return (
    <div>
      <div className="container">
        <div className="Header-cont">
          <div className="Header-head">
            Best <span>Sellers</span>
          </div>
          <div className="Header-content">
            shop on villyz for Best selling product
          </div>
        </div>
        <div>
          <div className="item">
            <div className="itemBody">
              {product
                .filter((item) => item.deals === "bestSellers")
                .slice(0, 10)
                .map((item) => (
                  <div key={item.id} data-aos="fade-up">
                    <Item product={item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
