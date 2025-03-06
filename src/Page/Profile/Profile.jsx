import React from "react";
import "./Profile.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Category from "../../components/category/Category";
import AccountSideBar from "../../components/AccountSideBar/AccountSideBar";
import Footer from "../../footer/Footer";
const Profile = ({ page }) => {
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="account-cont">
        <div className="account-sideBar">
          <AccountSideBar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
