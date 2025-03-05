import React, { useEffect, useState } from "react";
import { createContext } from "react";
import product from "../../product";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < product.length; index++) {
    cart[index] = 0;
  }
  return cart;
};
const getWishList = () => {
  let List = {};
  for (let index = 0; index < product.length; index++) {
    List[product[index].id] = 0; // Use product.id instead of index
  }
  return List;
};

const ShopContextProvider = (props) => {
  const [cartItem, setCartItem] = useState(getDefaultCart());
  const [WishList, setWishList] = useState(getWishList());

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:5000/getCart", {
        method: "POST",
        headers: {
          Accept: "application/json", // Fixed content-type
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCartItem(data);
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    }
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:5000/getList", {
        method: "POST",
        headers: {
          Accept: "application/json", // Fixed content-type
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setWishList(data);
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    }
  }, []); // Added empty dependency array to run effect only once

  console.log(WishList);

  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:5000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const Remove = (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: Math.max(0, prev[itemId] - 1), // Prevent negative values
    }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:5000/removeFromCart", {
        method: "POST",
        headers: {
          Accept: "application/json", // Fix incorrect content-type
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    }
  };

  const totalCartItems = () => {
    let total = 0;
    for (const cart in cartItem) {
      if (cartItem[cart] > 0) {
        total += cartItem[cart];
      }
    }
    return total;
  };
  const deleteCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: 0 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:5000/removeFromCart", {
        method: "POST",
        headers: {
          Accept: "application/json", // Fix incorrect content-type
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    }
  };
  const getTotalValue = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let totalValue = product.find((product) => product.id === Number(item));
        totalAmount += totalValue.newPrice * cartItem[item];
      }
    }
    return totalAmount;
  };
  const addtowishList = (itemId) => {
    setWishList((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:5000/addtowishlist", {
        method: "POST",
        headers: {
          Accept: "application/json", // ✅ Fix incorrect header
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Wishlist updated:", data))
        .catch((error) => console.error("Error adding to wishlist:", error));
    }
  };

  const RemoveList = (itemId) => {
    setWishList((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:5000/removeFromList", {
        method: "POST",
        headers: {
          Accept: "application/json", // Fix incorrect content-type
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    }
  };
  const totalWishList = () => {
    let total = 0;
    for (const itm in WishList) {
      if (WishList[itm] > 0) {
        total += WishList[itm];
      }
    }
    return total;
  };
  const contextValue = {
    product,
    cartItem,
    addToCart,
    Remove,
    totalCartItems,
    deleteCart,
    getTotalValue,
    addtowishList,
    RemoveList,
    totalWishList,
    WishList,
  };

  console.log(cartItem);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
