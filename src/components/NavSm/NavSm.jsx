import React, { useContext, useState, useEffect } from "react";
import "./NavSm.css";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CiLogout } from "react-icons/ci";
import { IoIosArrowDown, IoMdHeartEmpty } from "react-icons/io";
import { RiArrowDropDownLine, RiCloseLargeFill } from "react-icons/ri";
import { GrAppsRounded } from "react-icons/gr";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import InfoSm from "../InfoSm/InfoSm";
const NavSm = () => {
  const navigate = useNavigate();
  const { totalCartItems, totalWishList } = useContext(ShopContext);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [subCategory1, setSubCategory1] = useState(false);
  const [subCategory2, setSubCategory2] = useState(false);
  const [subCategory3, setSubCategory3] = useState(false);
  const [subCategory4, setSubCategory4] = useState(false);

  const handleMouseEnter = () => setNavIsOpen(true);
  const handleMouseLeave = () => setNavIsOpen(false);

  const toggleSubCategory1 = () => {
    setSubCategory1((prev) => !prev);
    if (subCategory2)
      setSubCategory2(false); // Close subcategory2 when opening subcategory1
    else if (subCategory3) setSubCategory3(false);
    else if (subCategory4) setSubCategory4(false); // Close subcategory
  };

  const toggleSubCategory2 = () => {
    setSubCategory2((prev) => !prev);
    if (subCategory1)
      setSubCategory1(false); // Close subcategory1 when opening subcategory2
    else if (subCategory3) setSubCategory3(false);
    else if (subCategory4) setSubCategory4(false); // Close subcategory
  };
  const toggleSubCategory3 = () => {
    setSubCategory3((prev) => !prev);
    if (subCategory1)
      setSubCategory1(false); // Close subcategory1 when opening subcategory2
    else if (subCategory2) setSubCategory2(false); // Close subcategory
    else if (subCategory4) setSubCategory4(false); // Close subcategory
  };
  const toggleSubCategory4 = () => {
    setSubCategory4((prev) => !prev);
    if (subCategory1)
      setSubCategory1(false); // Close subcategory1 when opening subcategory2
    else if (subCategory2) setSubCategory2(false); // Close subcategory
    else if (subCategory3) setSubCategory3(false); // Close subcategory
  };
  const [query, setQuery] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      window.scrollTo(0, 0); // Scroll to the top of the page
      navigate("/searchProduct", {
        state: {
          query: query,
        },
      });
    }
  };
  const [categoryType, setcategoryType] = useState([]);
  const [loader, setLoader] = useState(false);
  const getallCategory = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://villyzstore.onrender.com/getallCategory"
      );
      if (response) {
        setcategoryType(response.data.response);
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Network error",
        });
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
  return (
    <div className={`nav-container-sm ${navIsOpen ? "no-scroll" : ""}`}>
      {/* Main Navbar */}
      <InfoSm />
      <div className="nav-sm shadow-sm">
        <div className="logo" onClick={() => navigate("/home")}>
          vill<span>yz</span>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <Link to="/wishlist" className="icon-sm">
            <IoMdHeartEmpty size={23} />
            <div className="counter">{totalWishList()}</div>
          </Link>
          <Link
            to={`${
              localStorage.getItem("auth-token")
                ? `/profile/${localStorage.getItem("userId")}`
                : "/login"
            }`}
            className="icon-sm"
          >
            <FiUser size={25} />
          </Link>
          <Link to="/cart" className="icon-sm">
            <FiShoppingBag size={18} />
            <div className="counter">{totalCartItems()}</div>
          </Link>
          <div
            className="menu-icon"
            onClick={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <RxHamburgerMenu size={20} />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`nav-sm-cont ${navIsOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="menu-top">
          <div className="nav-head-cont">
            <div className="logo" onClick={() => navigate("/home")}>
              vill<span>yz</span>
            </div>
            <div>
              {" "}
              <button
                onClick={() => setNavIsOpen(false)}
                className="mt-4"
                aria-label="Close Menu"
              >
                <RiCloseLargeFill size={20} />
              </button>
            </div>
          </div>

          <div className="nav-smContent">
            <div className="w-100">
              <div className="nav-sm-input">
                <input
                  type="text"
                  placeholder="Find the Product you are looking for.."
                  name=""
                  id=""
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div>
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/ios-glyphs/30/search.png"
                    alt="search"
                  />
                </div>
              </div>
            </div>
          </div>
          <button className="category-btn-sm" onClick={toggleSubCategory4}>
            <div className="d-flex align-items-center gap-2 actionIcons">
              <GrAppsRounded />
              <div>All Categories</div>
            </div>
            <RiArrowDropDownLine size={26} />
          </button>
          <ul className={`nav-sm-subCategory ${subCategory4 ? "open" : ""}`}>
            {loader ? (
              <div className="loading">loading..</div>
            ) : (
              categoryType
                .filter((item) => item.visibility == "published")
                .map((item, index) => (
                  <li>
                    <button
                      className="Link"
                      onClick={() => {
                        navigate(`/${item.name}`);
                        window.scrollTo(0, 0);
                        setNavIsOpen(false);
                      }}
                      key={item.id}
                    >
                      {item.name}
                    </button>
                  </li>
                ))
            )}
          </ul>
        </div>

        <ul className="menu-list">
          <Link className="li" to="/home">
            Home <div></div>
          </Link>
          <Link className="li" onClick={toggleSubCategory1}>
            Categories{" "}
            <div>
              <IoIosArrowDown size={20} />
            </div>
          </Link>
          <ul className={`nav-sm-subCategory ${subCategory1 ? "open" : ""}`}>
            {loader ? (
              <div className="loading">loading..</div>
            ) : (
              categoryType
                .filter((item) => item.visibility == "published")
                .map((item, index) => (
                  <li>
                    <button
                      className="Link"
                      onClick={() => {
                        navigate(`/${item.name}`);
                        window.scrollTo(0, 0);
                        setNavIsOpen(false);
                      }}
                      key={item.id}
                    >
                      {item.name}
                    </button>
                  </li>
                ))
            )}
          </ul>
          <Link className="li" onClick={toggleSubCategory2}>
            Pages{" "}
            <div>
              <IoIosArrowDown size={20} />
            </div>
          </Link>
          <ul className={`nav-sm-subCategory ${subCategory2 ? "open" : ""}`}>
            <li>
              {" "}
              <Link to="/contact" className="Link">
                {" "}
                contact Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="Link">
                {" "}
                Blog
              </Link>{" "}
            </li>
            <li>
              <Link className="Link" to="/cart">
                {" "}
                Cart
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/wishlist" className="Link">
                wishlist
              </Link>
            </li>
          </ul>

          <Link className="li" to="/collection">
            Collections <div></div>
          </Link>
          <Link className="li" onClick={toggleSubCategory3}>
            Account{" "}
            <div>
              <IoIosArrowDown size={20} />
            </div>
          </Link>
          {localStorage.getItem("auth-token") ? (
            <ul className={`nav-sm-subCategory ${subCategory3 ? "open" : ""}`}>
              <li>
                {" "}
                <Link to="/orderpg" className="Link">
                  {" "}
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/profile/:id" className="Link">
                  {" "}
                  Settings
                </Link>{" "}
              </li>
              <li>
                <Link className="Link" to="/addresses">
                  {" "}
                  Address
                </Link>
              </li>
            </ul>
          ) : (
            <ul className={`nav-sm-subCategory ${subCategory3 ? "open" : ""}`}>
              <li>
                {" "}
                <Link to="/login" className="Link">
                  {" "}
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signUp" className="Link">
                  {" "}
                  Sign Up
                </Link>{" "}
              </li>
            </ul>
          )}
        </ul>
      </div>

      {/* Dimming background */}
      {navIsOpen && <div className="nav-black"></div>}

      {/* Navbar Content */}
    </div>
  );
};

export default NavSm;
