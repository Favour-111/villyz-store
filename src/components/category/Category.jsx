import React, { useEffect, useState } from "react";
import "./Category.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Slider from "react-slick";

const Category = () => {
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
    <div className="container2">
      <div className="container-header">
        <div>
          <div className="header">
            <span>Our</span> Latest Categories
          </div>
          <div className="content">enjoy great shopping experience</div>
        </div>
      </div>
      {loader ? (
        <div className="loading text-center mt-3">loading..</div>
      ) : (
        <div className="category-container">
          <Slider {...settings}>
            {categoryType.map((item, index) => {
              // Added key for list rendering
              return (
                <Link
                  to={`/${item.name}`}
                  className="category-item"
                  key={index}
                >
                  {" "}
                  {/* Using 'key' for list rendering */}
                  <div className="category-image shadow-sm">
                    <img src={item.image} alt={`${item.name} category`} />{" "}
                    {/* Improved alt text */}
                  </div>
                  <div className="categoryName">{item.name}</div>
                  {/* Fixed pluralization */}
                </Link>
              );
            })}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Category;
