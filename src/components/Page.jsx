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
import BestSellers from "./BestSellers/BestSellers";
import Information from "./Information/Information";
import NewsletterPopup from "./NewsletterPopup/NewsletterPopup";

const Page = () => {
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <Carousel />
      <Category />
      <NewsletterPopup />
      <Deals />
      <NewArrival />
      <BestSellers />
      <Information />
      <Blog />
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Page;
