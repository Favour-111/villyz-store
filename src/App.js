import logo from "./logo.svg";
import "./App.css";
import Page from "./components/Page";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from "react-router-dom";
import User from "./Page/UserForm/User";
import Login from "./Page/UserLogin/Login";
import Cart from "./Page/cart/Cart";
import WishList from "./Page/wishList/WishList";
import Contact from "./Page/Contact/Contact";
import ProductPage from "./Page/ProductPage/ProductPage";
import product from "./product";
import BlogPage from "./Page/BlogPage/BlogPage";
import SingleBlog from "./Page/SingleBlog/SingleBlog";
import SingleProduct from "./Page/SingleProduct/SingleProduct";
import Landing from "./Page/Landing/Landing";
import ShopContext from "./components/context/ShopContext";
import CheckOut from "./Page/CheckOut/CheckOut";
import { useEffect, useState } from "react";
import SearchedProduct from "./Page/SearchProductPg/SearchedProduct";
import OrderPage from "./Page/OrderPage/OrderPage";
import SingleOrder from "./Page/SingleOrder/SingleOrder";
import ScrollUp from "./components/ScrollUp";
import CategoryShop from "./Page/CategoryShop/CategoryShop";
import ProductSearch from "./Page/ProductSearch/ProductSearch";
import Collection from "./Page/Collection/Collection";
import EmailVerify from "./Page/EmailVerify/EmailVerify";
import ForgotPassword from "./Page/ForgotPassword/ForgotPassword";
import Reset from "./Page/Reset/Reset";
import Profile from "./Page/Profile/Profile";
import Address from "./Page/Address/Address";
import axios from "axios";
import NotFound from "./Page/NotFound/NotFound";
import Success from "./Page/Success/Success";
import Cancel from "./Page/Cancel/Cancel";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast, { Toaster } from "react-hot-toast";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
    });
  }, []);
  const stripePromise = loadStripe(
    "pk_test_51R1l1DRjQM7yvxj09e4OhH8yIE4axDzo0atPKLd2kAdhQa8Z3OevHa5o765Udok6KwcxcLpJgv82UYCE3ec5UMEt00RaohkNdW"
  );
  const [categoryType, setcategoryType] = useState([]);
  const getallCategory = async () => {
    try {
      const response = await axios.get(
        "https://villyzstore.onrender.com/getallCategory"
      );
      if (response) {
        setcategoryType(response.data.response);
      } else {
        console.log("netwoek error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getallCategory();
  }, []);
  return (
    <div className="App">
      <ShopContext>
        <Elements stripe={stripePromise}>
          <ScrollUp />
          <Routes>
            <Route element={<Landing />} path="/" />
            <Route element={<Page />} path="/home" />
            <Route element={<User page="Register Page" />} path="/SignUp" />
            <Route element={<Login page="Login Page" />} path="/login" />
            <Route element={<Cart page="cart" />} path="/cart" />
            <Route element={<WishList page="wishlist" />} path="/wishlist" />
            <Route element={<Contact page="Contact" />} path="/contact" />
            <Route element={<ProductPage page="Product" />} path="/product" />
            <Route element={<BlogPage page="blog page" />} path="/blog" />
            <Route
              element={<CheckOut page="checkout page" />}
              path="/checkout"
            />
            <Route element={<OrderPage page="Order page" />} path="/orderpg" />
            <Route element={<ForgotPassword />} path="/forgot_password" />
            <Route path="*" element={<NotFound />} />
            <Route element={<EmailVerify />} path="/users/:id/verify/:token" />
            <Route
              element={<Profile page="profile page" />}
              path="/profile/:id"
            />
            <Route element={<Reset />} path="/reset-password/:id/:token" />
            <Route element={<Address page="Address" />} path="/addresses" />
            <Route element={<Success />} path="/success" />
            <Route element={<Cancel />} path="/cancel" />
            {categoryType.map((item) => {
              return (
                <Route
                  path={`/${item.name}`}
                  element={
                    <CategoryShop Store={`${item.name}`} page={item.name} />
                  }
                />
              );
            })}
            <Route
              element={<SingleOrder page="single order" />}
              path="/singleOrder"
            />
            <Route
              element={<SingleBlog page="Single Blog Page" />}
              path="/SingleBlog"
            />
            <Route
              element={<SingleProduct page="Single product Page" />}
              path="/SingleProduct"
            />
            <Route
              element={<Collection page="Collections page" />}
              path="/collection"
            />
            <Route
              element={<ProductSearch page="product search" />}
              path="/searchProduct"
            />
          </Routes>
        </Elements>
      </ShopContext>
      <Toaster />
    </div>
  );
}

export default App;
