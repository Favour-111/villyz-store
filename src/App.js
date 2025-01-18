import logo from "./logo.svg";
import "./App.css";
import Page from "./components/Page";
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
function App() {
  return (
    <div className="App">
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
          element={<SingleBlog page="Single Blog Page" />}
          path="/SingleBlog"
        />
        <Route
          element={<SingleProduct page="Single product Page" />}
          path="/SingleProduct"
        />
      </Routes>
    </div>
  );
}

export default App;
