import React, { useContext, useEffect, useState } from "react";
import "./Category.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Slider from "react-slick";
import { ShopContext } from "../context/ShopContext";

const Category = () => {
  const { categoryType } = useContext(ShopContext);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true, // ✅ Enable auto-scrolling
    autoplaySpeed: 3000, // ✅ Time between transitions (3 seconds)
    pauseOnHover: false, // ❌ Try disabling hover pause to check if it works
    pauseOnFocus: false, //
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container2">
      <div className="container-header">
        <div>
          <div className="header">
            <span>Our</span> Latest Categories
          </div>
          <div className="content">enjoy great shopping experience</div>
        </div>
      </div>

      <div className="category-container">
        <Slider {...settings}>
          {categoryType
            .filter((item) => item.visibility == "published")
            .map((item, index) => (
              <Link to={`/${item.name}`} className="category-item" key={index}>
                <div className="category-image shadow-sm">
                  <img src={item.image} alt={`${item.name} category`} />
                </div>
                <div className="categoryName">{item.name}</div>
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Category;
