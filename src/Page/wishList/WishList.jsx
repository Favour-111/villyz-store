import React, { useContext } from "react";
import "./WishList.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import { ShopContext } from "../../components/context/ShopContext";
import product from "../../product";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import BackToTop from "../../components/BackToTop/BackToTop";
const WishList = ({ page }) => {
  const navigate = useNavigate();
  const { WishList, RemoveList, addToCart } = useContext(ShopContext);
  const wishListProduct = product.filter((itm) => WishList[itm.id]);
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="wishList">
        <div className="register-header-container">
          <div className="register-header">
            Product <span>wishlist</span>{" "}
          </div>
          <div className="register-content">
            your product wish is our first priority
          </div>
        </div>
        <div className="wishList-container">
          <div className="wish-list-header">
            <div>WishList</div>
            <button className="shadow-sm" onClick={() => navigate("/product")}>
              Shop now
            </button>
          </div>
          {wishListProduct.length > 0 ? (
            <div className=" table-container">
              <table className="table2">
                <tr className="table-heading ">
                  <th className="text-uppercase">id</th>
                  <th>image</th>
                  <th>name</th>
                  <th>price</th>
                  <th>status</th>
                  <th>actions</th>
                </tr>
                {wishListProduct.map((itm, index) => {
                  return (
                    <tr className="">
                      <td>{index + 1}</td>
                      <td>
                        <img src={itm.image} alt="" width={50} height={50} />
                      </td>
                      <td>{itm.name}</td>
                      <td>${itm.newPrice}</td>
                      <td>{itm.type}</td>
                      <td>
                        <div className="d-flex gap-2 ">
                          <div
                            className="delete"
                            onClick={() => {
                              RemoveList(itm.id);
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
                                icon: "info",
                                title: "product removed from wishList",
                              });
                            }}
                          >
                            <img
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEHElEQVR4nO2dvW6URxSGT2WBuQRMHCFASRmn4KclWFG6IFlKfA2QMikDTQwtIFKFAiT+LIJQTIqQC0BC4ALKpIiNUwURYzCC5olGe4hG1rLMLF7vmbPn6WydXZ13329n5ns981kkCIIgCIIgCIIgCIIgCILAO8AYcBr4m3ezAsyl1wy7b7cAp6jnh2H37RY6V33iYEHtoTfflK3pbgRBGVR9EIbYAPgYuFQ4OW81qaeLqUcZBYAvgBfY5wXwuXgG2AU8VcE/AbvFGMBu4IL2mHrdJV4BrqvQm2Ic4Gft9bp4BDicDQWTYhxgAljTntsdulTIPPDsLWPzd9IIwLdv0ZC03QD2SgNmPME+j7KeH+W/y34uIWndKVbRb0biF9ONvidJG7CgWq+JVbJhyq0ZG1aMiX/FKsCqNjkhzqERQ9JEh36d3ZpCZ668rVrnxSrAPuAfRocnwB5pYMK7lg1fHlnVBYxtM7oBLKmID6RRgEnV8Je0DrCoYj6RRgGmVMMDaR3gjoo5Io0CTKuG36R1gCsq5mtpFGBWNVyW1gHOqZhjlbtKVnRTw9iw6rPXHVMN56R1gBMq5kRB7Sm9h9mZrfXnhlXfjwbzAMdLry46V+3EhrvhlWHVZ3VnVcNxaZ00d6iYKwW1lPxuq+qzmquq4StpnbS6UjF3DBjysKbe00qxrzU8W3TF19Z7uJf6n3SHrmKWGjZkWTW0v+EBGFcx6waGrD9q6rOaddUwLh4oFYTBSR3YUXpBuQsYMTip1wy5zZBNilOtzSF4ChZrl43YNMRPsFgbMGJzyCq+sW2G0ugBm5P6N9r7GfFCaTiHTUNOau/fixdKA0ZsGlL854NmKB2HsWmIn2CxNmDEpiG/a++fiReytfxig4YsugkWa+92sWmIn2CxS8D4skFD1rX37eKJTNiOVgzBY7BYEzBizxA/Oxb7CRixZ4i/YLFLwDjdkCHT7oLFLgHjbEOGzLrZsdhPwIg9Q/wFizUBI/YM8Rcs1gSMbM4H/HAT39/PjsUeAePVQRrSiz7e31+wWBMwYs8Qf8FiTcCIPUP8BYtdAsblhgxZdhcs1gSM2DPEZ7BYGjBiaJVVswXWQ8A4af0+BM/B4htSSNcrYMSWIZ9qr/fFK+8KGLFliN9gsTRgpPsZwMc93m9g9S53LPbY49Q1iqDz8PzbekI2fVi/9np2+yDrXR2FLggYT/Y4Rz6nV/Lj9GEVnDsfSL2ro9CbcUR62LjcsbgRYEZFLohx6Dw3MjEjXgE+yp43tU2MAmzPnh9p+1Gw7wtwT4WeF6MAP2qPd8U7+o9WXqvgW8ABC6db6UQlB7WnxCtgv4wCwFHgOXZZA76UUQL4UFcyf2bfmGHyWns52/LjCIMgCIIgCIIgCIIgCIIgCIIgCIJAavgP8RrR8YTAwV4AAAAASUVORK5CYII="
                              alt="filled-trash"
                              width={20}
                              height={20}
                            />
                          </div>
                          <div
                            className="cart"
                            onClick={() => {
                              addToCart(itm.id);
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
                                icon: "success",
                                title: "product added to cart",
                              });
                            }}
                          >
                            <img
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEtUlEQVR4nO2cfaieYxzHf2abmcJEJu9/yMuwODbKwrw1Mas1jNJQI1GUlxgiKyGZ0KK8azLKoSmxEFkdOdFWK7aFZOZtqSlvw0eX5/vM3ePeec45PM9zvfw+dXXOc5/76vp+79957vu6r+t3XWaO4ziO4ziO4ziO4ziO4ziO4ziO4ziO4yQBcAjwKDAADHagvAHcCIzrtdcoAXYBLgKeAFYCW+gOnynorwB3AydY6QDzgS+BFcDl+hl4ATge6OtAmQV8p3YWALOB24F1+vYcaCUC3Ap8Ei5S5dgzulBXdLjt99XOjMqxscD1wEbgKCsJYB6wHtir5fjFulA/d+j5EcrHauObcLus0XYh8Cmwq5UAsBPwebgl1fxtB+AB4M8OPz82ATOH0PgkcKeVgO7Zb7Y5Z48OPT9CObJdD0s9vXDrGmO5A9wPXGeRQ+P5drjlDrAcOM8ih0aP6wzLHfX7z7XIIRGdxRglEZ3FGCURncUYJRGdxRglEZ3FGCURncUYJRGdxRglEZ3FGCURncUYJRGdxRglEZ3FGCURncUYJRGdxRglEZ1DosSER4B3hphC/QHY0MEp2sH/qbTT+SqwKEymWYwAd3Vh6jVGvgamW0wAV0vcH8C9wMkdnILti6TMBd6T783AvhYDwO6V5LYFVhA0EjZCcl/gcYsB4DIJWtWSJNAP3BMySSwTqPEFTNGd4SdgQq81mvJwAzdXjj0NLFEO1LZktNRhO7708A9M663ChpiXJGZb4gJwpXKfvgL2tkxgO76A13QNzo6lvx6YU/P1nmSZQY0v4OW6a9ATgOclZr4VCo2UIaJIG1I3N3CbFQqN1NjAoTGIOUtiwoNurBUGcIr8fxFF6imwY6WXsaQqSun9gxGXgeZ/tbS2fq49t+Jvn4r3WywWgBOBrRL2VrM/DkyO4I26b4hybDPxWlpbP9eeq7/PAL6X5w+A8RYTwGkaQgicaZkDLJPXldH2JoGHJPIGyxxgtbweZ7ECLJTIZ0dQZwxwjW51L47EYA/rjgN+0ZDJv1ZhRUMYhlZA1owwiGHN30yNi20a7hxDD+seIZ8bLGaAicDvwG9hJHSYdcKK23ktwxCzIq97vgLSb7FTWVR5zGimSmkMQ8yJvO5ieVxsiayQClyScUD65fECi53wgtR8Scw4IOvlcYrFDnBO8wUxx4DQeE6G3tWv0b0M1gHsr4BszjQg0+RvtaVCZUhhvwwDcqm8LbNUAN4e7gxaggG5T94WWSpoe4xhiU4wIK/L22xLhUomyvIMA7JR3g62VNBw9d+TVjkFBJgkXz8mld6kBLKtGkaZmFFATlJABiw1gLUSPz2jgFwlT49ZagDPSfzCjAKyVJ6utdQAbpL4h9uc9yBwh36foGGJqcNso6t1gXfl6XRLDU3pBj5qc94BShRYox7M0hG00bW6SubYoiUXe1pqADtr78RgYHKbc8cDRwMHjaKdrtTVTnSBdZYqlVT95Jcp8M8t+ClLlTAnIhOrkuq312/2HHYqDZxqiRv5VkbWRpAYNzjK0kwV/dBSRztJd2v78E5vTX6Y5QCwWwRZin3/oUxNYjLKcRzHcRzHcRzHcRzHcRzHcRzHcRxLm78A9Ejrz55J1ZkAAAAASUVORK5CYII="
                              alt="shopping-basket-2"
                              width={20}
                              height={20}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          ) : (
            <div className="empty-cart">
              <div>
                <img
                  width="74"
                  height="74"
                  src="https://img.icons8.com/cute-clipart/64/nothing-found.png"
                  alt="nothing-found"
                />
              </div>
              <div className="mt-3">no item in wishList......</div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default WishList;
