import React, { useContext } from "react";
import "./Item.css";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import toast, { Toaster } from "react-hot-toast";
import "sweetalert2/src/sweetalert2.scss";
import { CiBookmark } from "react-icons/ci";
import { GoBookmarkFill } from "react-icons/go";
const Item = ({ product }) => {
  const navigate = useNavigate();
  const { cartItem, addToCart, WishList, RemoveList, addtowishList } =
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
    <div className="product-item">
      <div
        className="product-image"
        onClick={() => {
          window.scroll(0, 0);
          navigate("/SingleProduct", {
            state: {
              image: product?.image,
              name: product.productName,
              category: product.categories,
              newPrice: product.newPrice,
              oldPrice: product.oldPrice ? product.oldPrice : null, // Fixed oldPrice logic
              id: product.id,
              start: product.Rating,
              description: product.productDescription,
            },
          });
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <img src={product.image} alt={product.productName} />
      </div>
      <div className="product-info">
        <div className="category">{product.categories}</div>
        <div className="name">
          {product?.productName
            ? product.productName.length < 26
              ? product.productName
              : product.productName.slice(0, 26) + "..."
            : "No Name Available"}
        </div>
        <div style={{ display: "flex", marginTop: 10 }}>
          {Array.from({ length: totalStars }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={index < product.Rating ? "orange" : "gray"} // Conditionally set color
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

          {product.oldPrice ? (
            <div className="old-Price">${product.oldPrice}</div>
          ) : null}
        </div>
        <div
          className={product.availability === "in Stock" ? "type1" : "type2"}
        >
          {product.availability === "in Stock" ? "SALES" : "OUT OF STOCK"}
        </div>
      </div>
      <div className="hover-buttons">
        <button
          className="buy-btn shadow-sm"
          onClick={() => {
            addToCart(product.id);
            toast.success("item added to Cart!");
          }}
        >
          {cartItem[product.id] > 0 ? (
            <img
              width="15"
              height="15"
              src="https://img.icons8.com/emoji/50/check-mark-emoji.png"
              alt="check-mark-emoji"
            />
          ) : (
            <img
              width="15"
              height="15"
              src="https://img.icons8.com/fluency-systems-regular/50/shopping-bag.png"
              alt="shopping-bag"
            />
          )}
        </button>
        <button
          className="cart-btn shadow-sm"
          onClick={() => {
            toggleWhishList(product.id);
            toast.success("item added to wishlist!");
          }} // Pass a function reference
        >
          {WishList[product.id] > 0 ? (
            <GoBookmarkFill className="book-mark" />
          ) : (
            <CiBookmark className="text-dark fs-6" />
          )}
        </button>

        <button
          onClick={() => {
            window.scroll(0, 0);
            navigate("/SingleProduct", {
              state: {
                image: product?.image,
                name: product.productName,
                category: product.categories,
                newPrice: product.newPrice,
                oldPrice: product.oldPrice ? product.oldPrice : null, // Fixed oldPrice logic
                id: product.id,
                start: product.Rating,
                description: product.productDescription,
              },
            });
          }}
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
    </div>
  );
};

export default Item;
