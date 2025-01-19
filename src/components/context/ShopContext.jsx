import React, { useState } from "react";
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

const ShopContextProvider = (props) => {
  const [cartItem, setCartItem] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const Remove = (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: Math.max(0, prev[itemId] - 1),
    }));
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

  const contextValue = {
    product,
    cartItem,
    addToCart,
    Remove,
    totalCartItems,
    deleteCart,
    getTotalValue,
  };

  console.log(cartItem);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
