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

  console.log(WishList);

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
  const addtowishList = (itemId) => {
    setWishList((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  const RemoveList = (itemId) => {
    setWishList((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
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
