import logo from "./logo.svg";
import "./App.css";
import Page from "./components/Page";
import { Route, Routes } from "react-router-dom";
import User from "./Page/UserForm/User";
import Login from "./Page/UserLogin/Login";
import Cart from "./Page/cart/Cart";
import WishList from "./Page/wishList/WishList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Page />} path="/" />
        <Route element={<User page="Register Page" />} path="/SignUp" />
        <Route element={<Login page="Login Page" />} path="/login" />
        <Route element={<Cart page="cart" />} path="/cart" />
        <Route element={<WishList page="wishlist" />} path="/wishlist" />
      </Routes>
    </div>
  );
}

export default App;
