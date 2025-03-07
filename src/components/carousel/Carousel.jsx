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
      description: "starting at $10.00",
      title: "Compact home electronics",
    },
    {
      text: "opening sales 30% off",
      image:
        "https://static.vecteezy.com/system/resources/previews/047/826/722/non_2x/vacuum-cleaner-against-transparent-background-free-png.png",
      description: "starting at $30.00",
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
                <p className="text-description">{slide.description}</p>
                <h2 className="text-title">{slide.title}</h2>
                <button className="shop-now">
                  Shop Now <GoArrowRight />
                </button>
              </div>
              <div>
                <img src={slide.image} alt={`Slide ${index + 1}`} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
