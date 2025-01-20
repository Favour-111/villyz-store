import React, { useContext } from "react";
import "./SingleProduct.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import Item from "../../components/items/Item";
import { useLocation } from "react-router-dom";
import product from "../../product";
import { ShopContext } from "../../components/context/ShopContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const SingleProduct = ({ page }) => {
  const location = useLocation();
  const products = location.state || {}; // Fallback to an empty object
  const { image, name, category, newPrice, oldPrice, id, start = 0 } = products;
  const { addToCart, cartItem, WishList, addtowishList, RemoveList } =
    useContext(ShopContext);
  const totalStars = 5;
  const toggleWhishList = (id) => {
    if (WishList[id] > 0) {
      RemoveList(id);
    } else {
      addtowishList(id);
    }
  };
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
              <button
                className="prod-btn"
                onClick={() => {
                  addToCart(id);
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    },
                  });
                  Toast.fire({
                    icon: "success",
                    title: "product added carts",
                  });
                }}
              >
                {cartItem[id] > 0 ? (
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/emoji/50/check-mark-emoji.png"
                    alt="check-mark-emoji"
                  />
                ) : (
                  "Add to Cart"
                )}
              </button>
              <button
                className="heart-btn"
                onClick={() => {
                  toggleWhishList(id);

                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    },
                  });
                  Toast.fire({
                    icon: "success",
                    title: "product added wishList",
                  });
                }}
              >
                {WishList[id] > 0 ? (
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/fluency/48/filled-like--v1.png"
                    alt="filled-like--v1"
                  />
                ) : (
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/ios/50/like--v1.png"
                    alt="like--v1"
                  />
                )}
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
