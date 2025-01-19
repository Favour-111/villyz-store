import React from "react";
import "./SingleProduct.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import Item from "../../components/items/Item";
import { useLocation } from "react-router-dom";
import product from "../../product";
const SingleProduct = ({ page }) => {
  const location = useLocation();
  const products = location.state || {}; // Fallback to an empty object
  const { image, name, category, newPrice, oldPrice, id, start = 0 } = products;

  const totalStars = 5;

  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="single-product-cont">
        <div className="row w-100">
          <div className="col-md-6 col-sm-12">
            <div className="singleProduct-img">
              {image ? (
                <img src={image} alt={name || "Product"} />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="product-single-title">
              {name || "Product Name Unavailable"}
            </div>
            <div className="star d-flex align-items-center gap-1 mt-3">
              {Array.from({ length: totalStars }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={index < start ? "orange" : "gray"}
                  width="14px"
                  height="14px"
                  style={{ margin: "0 2px" }}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <div>| {start} rating</div>
            </div>
            <div className="singleprod-Category">
              {category || "Category Unavailable"}
            </div>
            <div className="old-price">{oldPrice ? `$${oldPrice}` : null}</div>
            <div className="price">
              {newPrice ? `$${newPrice}` : "Price Unavailable"}{" "}
              {oldPrice && newPrice ? (
                <span>{`-${Math.round(
                  ((oldPrice - newPrice) / oldPrice) * 100
                )}%`}</span>
              ) : null}
            </div>
            <div className="singleProduct-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              ea ipsam quos mollitia voluptas, nisi aliquid molestias neque illo
              dolore maiores culpa veniam. Provident ratione at neque laudantium
              voluptates fuga.
            </div>
            <div className="prod-footer">
              <div className="counter-container1">
                <div>+</div>
                <div>1</div>
                <div>-</div>
              </div>
              <button className="prod-btn">Add to Cart</button>
              <button className="heart-btn">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADTElEQVR4nO2ZS2xNURSGv2olaCkDIU0x8ChC0DLwSIzExCNCg4kYCErFSBkQBEmnpJ5BVJuYeM2olmEjRBAJYuCtiXhTVaKtrOQ/yU573J57e3q7m9wvOcm9Z+299lpnr73P2utAhgwZMmTwnCJgJ9AAPAGagVagCagHdgOTk9A3Bdijvk3S1Szddq8CmBSnA7OBm0BHhKsduA7MTKBvltq0R9TZAJT0xIGBQJUz4CfgNLBMs5MLDALGAEuB48Bntf0L7AeyHX32+6Bkgb5jwBLpMF250r0cOKM2wQM6AuQk68QI4JaU/AQOAMMi9BsK7FOYWN/zcsCuWt0z2V617Y5hcr7FmZ3hycxE4MRrhUKyWGi9ko5ax4mXwIwU9JUAbxxnIs1MleNEAakzTjqCWDfHxvZAX4HjzOEoC7td4ZTKTIQ9yVZdxTHoK1aYtXWnL9idbE3ERYWuuDgkG22LDqXI2U2iLOyoBIs9LvKd3XFiWINdEtoW6ztnZeuOMGG9hLaH+84K2XojTPhMwgn4T5FsfRom/CFhHv6TJ1vN5i4Eb09LFXxniJN1dOGdhD15CaaLQtlqL8guPJSwR5lmmpgjWx+ECWsk3Iz/bJWt58KE5RJW4z81snXL/05sJvzi+YIfDHyTrbYNh3JPDUrxlzWy8U6iRtvUyBzKwj+ygPuysay7aWtSw5X4xyrZ9jZK+Jc7e7Rlmr6QLwf+u8g7Y8fIu+pgWaYvVMum28kcC6Y7BYRN9D1lsuUXMDXZzhvU+TewiL5jsWwwW9anqiQoRFgFcB7pZ4ESw0gFh0RYLF5wnEnnzCwEvmvsi3Ecl63OddWJ0bX0Pms1lo15STbEQrZKmEGN6mQq5cuI41Q6Zdqa3hgnS+XQNg1yTaXVuDBdddLdprJqr2YXVrD+qgGfA3Nj0DkfeOEkrVbYTgtWoHjkVN4rU4zjHH1z+SNdT5SFp70AcMpZN43A+CQfRqPz2eCEPiv06QsrOO+36AkPSNDe4n6jU7V5r28uXjASuOzMTp0KBJ0pVFGtw9lara93lAIfZKRtCKsdmVUwPzoL2mbFa0YDV5ynbmnOUee/zdwo+hHrlNYEDtibejv9lGnAY132u1+T79lJMwPp4B+umggDgRN8wAAAAABJRU5ErkJggg=="
                  alt="like"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          <h4 className="header-related">Related product</h4>
          <div className="itemBody2">
            {product
              .slice(0, 13)
              .filter((item) => {
                if (item.category === category) {
                  return item;
                } else {
                  return null;
                }
              })
              .map((item) => {
                return <Item product={item} />;
              })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
