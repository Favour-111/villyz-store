import React, { useContext } from "react";
import "./WishList.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import { ShopContext } from "../../components/context/ShopContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Link, useNavigate } from "react-router-dom";
import BackToTop from "../../components/BackToTop/BackToTop";
import { IoTrashOutline } from "react-icons/io5";

const WishList = ({ page }) => {
  const navigate = useNavigate();
  const { WishList, cartItem, RemoveList, addToCart, product } =
    useContext(ShopContext);

  // Get wishlist products
  const wishListProducts = product.filter((itm) => WishList[itm.id]);

  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      {wishListProducts.length > 0 ? (
        <section class="mt-8 mb-14">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div className="register-header-container">
                  <div className="register-header">
                    Product <span>wishlist</span>
                  </div>
                  <div className="register-content">
                    Your product wish is our first priority.
                  </div>
                </div>
                <div>
                  <div class="table-responsive">
                    <table class="table text-nowrap table-with-checkbox">
                      <thead class="table-light">
                        <tr>
                          <th></th>
                          <th>Product</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Actions</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      {wishListProducts.map((item) => {
                        return (
                          <tbody>
                            <tr>
                              <td class="align-middle">
                                <a href="#">
                                  <img
                                    src={item.image}
                                    class="icon-shape icon-xxl"
                                    alt=""
                                  />
                                </a>
                              </td>
                              <td class="align-middle">
                                <div>
                                  <h5 class="fs-6 mb-0">
                                    <Link to="/" class="text-inherit">
                                      {item.productName.slice(0, 20)}..
                                    </Link>
                                  </h5>
                                  <small>{item.categories}</small>
                                </div>
                              </td>
                              <td class="align-middle">${item.newPrice}</td>
                              <td class="align-middle">
                                {item.availability === "in Stock" ? (
                                  <span class="badge bg-success">
                                    {item.availability}
                                  </span>
                                ) : (
                                  <span class="badge bg-warning">
                                    {item.availability}
                                  </span>
                                )}
                              </td>
                              <td class="align-middle">
                                <div
                                  class="btn btn-primary btn-sm"
                                  onClick={() => {
                                    addToCart(item.id);
                                    Swal.fire({
                                      icon: "success",
                                      title: "Item added to cart",
                                      toast: true,
                                      position: "top-end",
                                      showConfirmButton: false,
                                      timer: 2000,
                                    });
                                  }}
                                >
                                  {cartItem[item.id] > 0
                                    ? "In Cart"
                                    : "Add to Cart"}
                                </div>
                              </td>
                              <td class="align-middle">
                                <a
                                  href="#"
                                  class="text-muted"
                                  onClick={() => {
                                    RemoveList(item.id);
                                    Swal.fire({
                                      icon: "info",
                                      title: "Removed from Wishlist",
                                      toast: true,
                                      position: "top-end",
                                      showConfirmButton: false,
                                      timer: 2000,
                                    });
                                  }}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  aria-label="Delete"
                                  data-bs-original-title="Delete"
                                >
                                  <IoTrashOutline />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="empty-cart mt-5">
          <div>
            <img
              width="304"
              height="304"
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-download-in-svg-png-gif-file-formats--is-no-items-with-products-favorites-list-ecommerce-states-pack-e-commerce-shopping-illustrations-9741055.png"
              alt="nothing-found"
            />
          </div>
          <div className="mt-3">Add Items to WishList</div>
        </div>
      )}

      <BackToTop />
      <Footer />
    </div>
  );
};

export default WishList;
