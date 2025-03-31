import React, { useEffect, useState } from "react";
import { createContext } from "react";
import product from "../../product";
import axios from "axios";
import Loading from "../Loading/Loading";
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
  const [categoryType, setcategoryType] = useState([]);
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState([]);

  const getallProduct = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://villyzstore.onrender.com/getallProducts"
      );

      if (response) {
        setProduct(response.data.response);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getallProduct();
  }, []);
  const getallCategory = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://villyzstore.onrender.com/getallCategory"
      );
      if (response) {
        setcategoryType(response.data.response);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getallCategory();
  }, []);
  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const response = await fetch("https://villyzstore.onrender.com/getCart", {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      });

      const cartData = await response.json();
      setCartItem(cartData);
    } catch (error) {
      console.error("Error fetching updated cart:", error);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, []);
  // Function to fetch the latest wishlist data
  const fetchWishlistData = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const response = await fetch("https://villyzstore.onrender.com/getList", {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      });

      const wishlistData = await response.json();
      setWishList(wishlistData); // Update state with new wishlist data
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };
  useEffect(() => {
    fetchWishlistData();
  }, []);
  const UserId = localStorage.getItem("userId");
  const getSingleUser = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `https://villyzstore.onrender.com/user/${UserId}`
      );
      console.log(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getSingleUser();
  }, [UserId]);

  const gettallBlog = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://villyzstore.onrender.com/getallBlog"
      );
      if (response) {
        setBlog(response.data.response);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    gettallBlog();
  }, []);

  const addToCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    if (localStorage.getItem("auth-token")) {
      try {
        setLoader(true);
        await fetch("https://villyzstore.onrender.com/addtocart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });

        // ✅ Fetch updated cart after adding item
        fetchCartData();
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoader(false);
      }
    }
  };

  const Remove = async (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: Math.max(0, prev[itemId] - 1), // Prevent negative values
    }));

    if (localStorage.getItem("auth-token")) {
      try {
        setLoader(true);
        await fetch("https://villyzstore.onrender.com/removeFromCart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });

        // ✅ Fetch updated cart after removing item
        fetchCartData();
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoader(false);
      }
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
      try {
        setLoader(true);
        fetch("https://villyzstore.onrender.com/deleteFromCart", {
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
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoader(false);
      }
    }
  };
  const getTotalValue = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let totalValue = product.find((product) => product.id === Number(item));
        totalAmount += totalValue?.newPrice * cartItem[item];
      }
    }
    return totalAmount;
  };

  const addtowishList = async (itemId) => {
    setWishList((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    if (localStorage.getItem("auth-token")) {
      try {
        setLoader(true);
        const response = await fetch(
          "https://villyzstore.onrender.com/addtowishlist",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId }),
          }
        );

        const data = await response.json();
        console.log("Wishlist Updated:", data);

        // Re-fetch wishlist to update UI
        await fetchWishlistData();
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      } finally {
        setLoader(false);
      }
    }
  };

  const RemoveList = async (itemId) => {
    setWishList((prev) => ({ ...prev, [itemId]: 0 }));

    if (localStorage.getItem("auth-token")) {
      try {
        setLoader(true);
        const response = await fetch(
          "https://villyzstore.onrender.com/removeFromList",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId }),
          }
        );

        const data = await response.json();
        console.log("Item removed from wishlist:", data);

        // Re-fetch wishlist data
        await fetchWishlistData();
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      } finally {
        setLoader(false);
      }
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
    categoryType,
    user,
    blog,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {loader && <Loading />}
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
