import React from "react";
import Info from "./info/Info";
import Nav from "./Nav/Nav";
import Carousel from "./carousel/Carousel";
import Category from "./category/Category";
import Deals from "./deals/Deals";
import NewArrival from "./newArrival/NewArrival";
import Blog from "./Blog/Blog";
import Footer from "../footer/Footer";
import NavSm from "./NavSm/NavSm";
import BackToTop from "./BackToTop/BackToTop";

const Page = () => {
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <Carousel />
      <Category />
      <Deals />
      <NewArrival />
      <Blog />
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Page;
