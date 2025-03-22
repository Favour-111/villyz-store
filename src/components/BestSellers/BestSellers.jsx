import React, { useContext } from "react";
import "./BestSellers.css";
import Item from "../items/Item";
import { ShopContext } from "../context/ShopContext";
import Slider from "react-slick";

const BestSellers = () => {
  const { product, categoryType } = useContext(ShopContext);

  return (
    <div>
      {categoryType
        .slice(0, 3)
        .reverse()
        .map((category) => {
          // Filter products based on the category
          const filteredPod = product
            .filter((item) => item.categories === category.name)
            .reverse()
            .slice(0, 10);

          // Slider settings
          const settings = {
            dots: true,
            infinite: filteredPod.length > 5,
            speed: 500,
            slidesToShow: filteredPod.length >= 5 ? 5 : filteredPod.length,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,
            pauseOnFocus: true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow:
                    filteredPod.length >= 3 ? 3 : filteredPod.length,
                  slidesToScroll: 2,
                  infinite: true,
                },
              },
              {
                breakpoint: 760,
                settings: {
                  slidesToShow:
                    filteredPod.length >= 2 ? 2 : filteredPod.length,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
            ],
          };

          return (
            <div className="container" key={category.name}>
              <div className="Header-cont">
                <div className="Header-head">
                  Best Sellers in <span>{category.name}</span>
                </div>
                <div className="Header-content">
                  Shop on Villyz for Best Selling Products
                </div>
              </div>
              <div className="slick-slider">
                <div className="sliderProduct">
                  {filteredPod.length > 0 ? (
                    <Slider {...settings}>
                      {filteredPod.map((item) => (
                        <div key={item.id}>
                          <Item product={item} />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <p className="no-item">
                      No best sellers available for this category.
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BestSellers;
