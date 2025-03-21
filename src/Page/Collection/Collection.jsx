import React, { useContext, useEffect, useState } from "react";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import "./Collection.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ShopContext } from "../../components/context/ShopContext";
const Collection = ({ page }) => {
  const { product, categoryType } = useContext(ShopContext);

  const categoryCounts = categoryType.map((category) => {
    const count = product.filter((p) => p.categories === category.name).length;
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
