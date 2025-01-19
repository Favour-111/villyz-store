import React, { useContext } from "react";
import "./Item.css";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Item = ({ product }) => {
  const router = useNavigate();
  const { addToCart, cartItem, Remove } = useContext(ShopContext);
  const totalStars = 5;
  return (
    <div className="product-item">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <div className="category">{product.category}</div>
        <div className="name">{product.name.slice(0, 26)}...</div>
        <div style={{ display: "flex", marginTop: 10 }}>
          {Array.from({ length: totalStars }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={index < product.start ? "orange" : "gray"} // Conditionally set color
              width="14px"
              height="14px"
              style={{ margin: "0 2px" }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        <div className="d-flex gap-2 align-items-center mt-2">
          <div className="new-price">${product.newPrice}</div>
          <div className="old-Price">${product.oldPrice}</div>
        </div>
        <div className={product.type === "Sales" ? "type1" : "type2"}>
          {product.type}
        </div>
      </div>
      <div className="hover-buttons">
        <button
          className="buy-btn shadow-sm"
          onClick={() => {
            addToCart(product.id);
            toast.success("Product added successfully!");
          }}
        >
          <img
            width="15"
            height="15"
            src="https://img.icons8.com/fluency-systems-regular/50/shopping-bag.png"
            alt="shopping-bag"
          />
        </button>
        <button className="cart-btn shadow-sm">
          <img
            width="15"
            height="15"
            src="https://img.icons8.com/ios/50/like--v1.png"
            alt="like--v1"
          />
        </button>
        <button
          onClick={() =>
            router("/SingleProduct", {
              state: {
                image: product?.image,
                name: product.name,
                category: product.category,
                newPrice: product.newPrice,
                oldPrice: product.oldPrice,
                id: product.id,
                start: product.start,
              },
            })
          }
          className="wishlist-btn shadow-sm"
        >
          <img
            width="14"
            height="14"
            src="https://img.icons8.com/external-line-icons-royyan-wijaya/64/external-eyes-medical-stuff-line-icons-royyan-wijaya.png"
            alt="external-eyes-medical-stuff-line-icons-royyan-wijaya"
          />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Item;
