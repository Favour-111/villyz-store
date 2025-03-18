import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GoArrowRight } from "react-icons/go";
const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // ✅ Enable auto-scrolling
    autoplaySpeed: 4000, // ✅ Time between transitions (3 seconds)
    pauseOnHover: false, // ❌ Try disabling hover pause to check if it works
    pauseOnFocus: false, // ❌ Disable pause on focus as well
  };

  const slides = [
    {
      text: "opening sales 30% off",
      image:
        "https://png.pngtree.com/png-clipart/20220125/original/pngtree-handheld-mini-fan-png-image_7209848.png",
      description:
        "Start your dropshipping business today with trending products and fast shipping",
      title: "Hot-Selling Products, Zero Inventory",
    },
    {
      text: "opening sales 30% off",
      image:
        "https://images.philips.com/is/image/philipsconsumer/vrs_c0e165a227c882ffbe90f0d5336da2ba7861141c?wid=700&hei=700&$pnglarge$",
      description:
        "Discover top-selling items and scale your store with ease—no stock, no hassle",
      title: "Browse & discover millions of products",
    },
  ];

  return (
    <div className="carousel-cont">
      <div className="carousel">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div className="carousel-slide" key={index}>
              <div className="carousel-text">
                <p className="carouseltxt">{slide.text}</p>
                <h1 className="text-title">{slide.title}</h1>
                <p className="text-description">{slide.description}</p>
                <button className="shop-now">
                  Shop Now <GoArrowRight />
                </button>
              </div>
              <div>
                <img src={slide.image} alt="carousel" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
