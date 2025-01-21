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
import { useEffect } from "react";
import SearchedProduct from "./Page/SearchProductPg/SearchedProduct";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <div className="App">
      <ShopContext>
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
          <Route element={<CheckOut page="checkout page" />} path="/checkout" />
          <Route
            element={<SingleBlog page="Single Blog Page" />}
            path="/SingleBlog"
          />
          <Route
            element={<SingleProduct page="Single product Page" />}
            path="/SingleProduct"
          />
          <Route
            element={<SearchedProduct page="product search" />}
            path="/searchProduct"
          />
        </Routes>
      </ShopContext>
    </div>
  );
}

export default App;
