import React, { useContext } from "react";
import "./SingleProduct.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import Item from "../../components/items/Item";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../components/context/ShopContext";
import toast, { Toaster } from "react-hot-toast";
import BackToTop from "../../components/BackToTop/BackToTop";
import { LuShoppingCart } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { GoBookmarkFill } from "react-icons/go";
const SingleProduct = ({ page }) => {
  const location = useLocation();
  const products = location.state || {}; // Fallback to an empty object
  const { product } = useContext(ShopContext);
  const {
    image,
    name,
    description,
    category,
    newPrice,
    oldPrice,
    id,
    start = 0,
  } = products;
  const { addToCart, cartItem, WishList, addtowishList, RemoveList } =
    useContext(ShopContext);
  const totalStars = 5;
  const toggleWhishList = (id) => {
    if (WishList[id] > 0) {
      RemoveList(id);
      toast.success("item removed from wishlist!");
    } else {
      addtowishList(id);
      toast.success("item added to cart!");
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
          <div className="col-md-6 col-sm-12 prod-abt">
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
            <div
              className="singleProduct-content"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div></div>

            <div className="prod-footer">
              {cartItem[id] > 0 ? (
                <button
                  className="prod-btn"
                  onClick={() => {
                    addToCart(id);
                    toast.success("item added to cart!");
                  }}
                >
                  <MdAddShoppingCart className="mb-1" /> Item in Cart
                </button>
              ) : (
                <button
                  className="prod-btn"
                  onClick={() => {
                    addToCart(id);
                    toast.success("item added to cart!");
                  }}
                >
                  <LuShoppingCart className="mb-1" /> Add to Cart
                </button>
              )}

              <button
                className="heart-btn"
                onClick={() => {
                  toggleWhishList(id);
                }}
              >
                {WishList[id] > 0 ? (
                  <GoBookmarkFill className="wishlist-open" />
                ) : (
                  <CiBookmark />
                )}
              </button>
            </div>
          </div>

          <h4 className="header-related">
            <span>Related</span> product
          </h4>
          <div className="item">
            <div className="itemBody">
              {product
                .filter((item) => item.categories === category) // Filter first
                .slice(0, product.length >= 12 ? 12 : product.length) // Slice only if 10 or more exist
                .map((item) => (
                  <div data-aos="fade-up" key={item.id}>
                    <Item product={item} />
                  </div>
                ))}
            </div>
          </div>
          <Link className="item-Link" to={`/${category}`}>
            View More
          </Link>

          <h4 className="header-related">
            <span>4 star</span> above
          </h4>
          <div className="item">
            <div className="itemBody">
              {product
                .filter(
                  (item) => item.categories === category && item.Rating >= 4
                ) // Ensure category matches & rating is 4+
                .slice(0, product.length >= 12 ? 12 : product.length) // Slice only if 10 or more exist
                .reverse()
                .map((item) => (
                  <div data-aos="fade-up" key={item.id}>
                    <Item product={item} />
                  </div>
                ))}
            </div>
          </div>
          <Link className="item-Link" to={`/${category}`}>
            View More
          </Link>
        </div>
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default SingleProduct;
