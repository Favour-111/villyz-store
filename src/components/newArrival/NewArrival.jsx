import React, { useContext } from "react";
import "./NewArrival.css";
import Item from "../items/Item";
import product from "../../product";
import { ShopContext } from "../context/ShopContext";
const NewArrival = () => {
  const { product } = useContext(ShopContext);
  return (
    <div>
      <div className="Arrival-container">
        <div className="Header-cont">
          <div className="Header-head">
            New <span>Arrival</span>
          </div>
          <div className="Header-content">
            shop on villyz for new arrivals and fast shipping
          </div>
        </div>
        <div>
          <div className="item">
            <div className="itemBody">
              {product.slice(0, 10).map((item) => (
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

export default NewArrival;
