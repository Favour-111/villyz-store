import React from "react";
import categoryType from "../../categoryType";
import "./Category.css";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div data-aos="fade-up" className="category-container">
      {categoryType.map((item, index) => {
        // Added key for list rendering
        return (
          <Link to={`/${item.name}`} className="category-item" key={index}>
            {" "}
            {/* Using 'key' for list rendering */}
            <div className="category-image shadow-sm">
              <img src={item.image} alt={`${item.name} category`} />{" "}
              {/* Improved alt text */}
            </div>
            <div className="categoryName">{item.name}</div>
            <div className="categoryTotal">{item.amount} products</div>{" "}
            {/* Fixed pluralization */}
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
