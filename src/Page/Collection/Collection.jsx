import React from "react";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import "./Collection.css";
import categoryType from "../../categoryType";
import { Link } from "react-router-dom";
import product from "../../product";

const Collection = ({ page }) => {
  const categoryCounts = categoryType.map((category) => {
    const count = product.filter((p) => p.category === category.name).length;
    return { category, count };
  });

  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="collection">
        <div className="collection-cont">
          <div className="collection-sub-cont">
            {categoryCounts.map(({ category, count }) => (
              <Link
                key={category.name}
                className="category-items"
                to={`/${category.name}`}
              >
                <img src={category.image} alt={category.name} />
                <div>
                  <div className="category-im">{category.name}</div>
                  <div className="category-total">({count} items)</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collection;
