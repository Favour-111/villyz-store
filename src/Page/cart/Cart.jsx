import React, { use, useContext, useState } from "react";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import Info from "../../components/info/Info";
import Footer from "../../footer/Footer";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import "./Cart.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../components/context/ShopContext";
import product from "../../product";
import Item from "../../components/items/Item";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import BackToTop from "../../components/BackToTop/BackToTop";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect } from "react";
const Cart = ({ page }) => {
  function usePreserveScrollPosition() {
    useEffect(() => {
      const { scrollX, scrollY } = window;

      return () => {
        window.scrollTo(scrollX, scrollY); // Preserve scroll position
      };
    }, []);
  }
  const navigate = useNavigate();
  const {
    cartItem,
    addToCart,
    Remove,
    deleteCart,
    getTotalValue,
    totalCartItems,
  } = useContext(ShopContext);
  const [coupon, setcoupon] = useState(false);

  const cartProducts = product.filter((itm) => cartItem[itm.id] > 0);
  const [discount, setDiscount] = useState(0);

  const applyCoupon = (code) => {
    if (code === "SAVE10") {
      setDiscount(10); // Apply a 10% discount
      Swal.fire("Success!", "Coupon applied successfully", "success");
    } else {
      Swal.fire("Error!", "Invalid coupon code", "error");
    }
  };
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      {cartProducts.length > 0 ? (
        <div className="cart-container">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="cart-summary">
                <div className="cart-summary-header">Summary</div>
                <div className="cart-summary-header2">Estimated shipping</div>
                <div className="cart-summary-content">
                  Enter your destination to get a shipping estimate
                </div>

                <div className="sum mt-2">
                  <div>
                    <div>sub-total</div>
                    <div>${getTotalValue()}</div>
                  </div>
                  <div>
                    <div>delivery-charges</div>
                    <div>$40</div>
                  </div>
                  <div>
                    <div>coupon-discount</div>
                    <div className="apply" onClick={() => setcoupon(true)}>
                      apply coupon
                    </div>
                  </div>
                  {coupon ? (
                    <div className="coupon-container">
                      <input type="text" placeholder="input coupon" />
                      <button>Apply</button>
                    </div>
                  ) : null}

                  <div className="total">
                    <div>total amount</div>
                    <div>${getTotalValue() + 40}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-sm-12 cart-cont">
              <table className="table4">
                <tr className="table-header">
                  <td>Product</td>
                  <td>Price</td>
                  <td>quantity</td>
                  <td>Action</td>
                </tr>
                {product.map((e) => {
                  if (cartItem[e.id] > 0) {
                    return (
                      <tr>
                        <td>
                          <div className="d-flex gap-2 align-items-center">
                            <img src={e.image} alt="" width={50} height={50} />
                            <div>{e.name}</div>
                          </div>
                        </td>
                        <td>${e.newPrice}</td>
                        <td>
                          <div className="counter-container">
                            <button onClick={() => addToCart(e.id)}>+</button>
                            <div>{cartItem[e.id]}</div>
                            <button
                              onClick={() => {
                                Remove(e.id);
                              }}
                            >
                              -
                            </button>
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
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
                                title: "product removed from cart",
                              });
                            }}
                          >
                            <img
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEP0lEQVR4nO2dP4+UVRTGfxUR+AgsriFqpAQLxVbdGDtJSHQ/A1BCCTQutkK0kgIT+RckxsVC+AAmRreAEgtZ1kqjiK6R5jE3czBvNsPsfYedmXPPnl9yi52cmZznPe/cP8/c+y4kSZIkSZIkSZIkSZIkSZJER7BD8JHgF4E2aWuCpfKeWecdFsHZikJsbB/OOu+waHDXl4t8qCL2jSfflOlktw2R3fWTik+yID4Q7Bd8Xjk4a8qt5HSx5Mh2QPCu4G8HF16btJLjO0RGsFfwuwn+TLAPZwj2CS5YjiXXvURFcNWE3sA5gi8t16tERPBmpyuYxzmCOcEjy7ndrsuEXBP8+ZS++SSNIDjxFA1F23XBSzRQjN8cDMjapN3t5Hy3+1rn75pWtO7BK/bNKIl+7TrRZ6RoEyyb1it4pdNNhS3Ghhlj0foHXhE8tCTnCI4aKch1S3I5clE0GCtvmtZreEXwsuBXB4O2ptTKoP4iDQx4VzrdV8T20CYwvosxDMF9E/E8jSKYNw0/0zqCFRNzgEYRHDQNP9I6glsm5m0aRbBgGr6ldQSXTMwHNIpg0TR8QesIzpuYoz13lazZpoYds4rvvO+oaThP6whOm5jTFbFnbQ2zpzPXX5pV/Dga3CM4Vnt3aXDXzm1YDa/NKr4Td840HKN1ythhYi5VxKrmtWnFd2Ium4b3aZ0yuzIxtxwU5E6f+EgzxbHm8JrSHd83PsJa6n/KCt3E3G+4IKumof0ND4JdJmbdQZd1r098J2bdNOwiArWC5HBQF+yuvaHCGYxyOKj36XKboTMoHmxtDFEkY7HvtFE+CxLHWOxrMMpnl1W9sG2GWutBPgf145b7x0Sh1pyTz4KcsdxPEYVag1E+C1L980Ez1PbD8lmQOMZiX4NRPgty23J/iyh05vIrDRZkJYyx2He1K58FiWMsDjEY/2mwIOuW+04i0RG2u5WCKKKx2MdglL+CxNmxOI7BKH8FiWcsDjEYFxoqyEI4Y3GIwbjYUEEWw+xYHMdglL+CxDMW+xiM8leQeMZiH4NRW3OB72zh58fZsTjCYLw8yYKMYozPj2cs9jEY5a8g8YzFPgaj/BUknrE4xGBcbaggq+GMxT4Go/wVJKaxWGswytEsq88W2AgG47z3dYgiG4tPKCbdKINRvgryquX6A1HZzGCUr4LENRZrDUYNPwP4YMTnTSw+5I7FEXuchloRGjw8/6adkC0X65tRz26fZHyoo9AVBuOZEefIl+xOflAuVsW584nEhzoKvRVHpGdNyB2LGxEcMZHLOEeD50aWXI8QFcErnedNPYdTBDs7z4/0/SjYZ0XwvQn9BKcIPrUcvyM69o9WHpvgrwSvezjdqoFVcshyKrn9K3iN7YDgsOAvE+6xPRK8x3ZC8ILNZH7qfGM0w/bYcjnX8uMIkyRJkiRJkiRJkiRJkiRJkiRJkoQ+/AfNOoXNz7JA8QAAAABJRU5ErkJggg=="
                              alt="filled-trash"
                              width={30}
                              onClick={() => deleteCart(e.id)}
                              className="delete-icn"
                              height={30}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
              </table>
              <div className="table-sm">
                {product.map((e) => {
                  if (cartItem[e.id] > 0) {
                    return (
                      <div className="table-sm-container-itm">
                        <div className="table-cont-item">
                          <div>Product</div>
                          <div className="d-flex align-items-center gap-2">
                            <img width={50} src={e.image} alt="" />
                            <div>{e.name}</div>
                          </div>
                        </div>
                        <div className="table-cont-item">
                          <div>Price</div>
                          <div>
                            <div>${e.newPrice}</div>
                          </div>
                        </div>
                        <div className="table-cont-item">
                          <div>Quantity</div>
                          <div>
                            <div>
                              <td>
                                <div className="counter-container">
                                  <button
                                    type="button"
                                    onClick={() => addToCart(e.id)}
                                  >
                                    +
                                  </button>
                                  <div>{cartItem[e.id]}</div>
                                  <button
                                    type="button"
                                    onClick={() => Remove(e.id)}
                                  >
                                    -
                                  </button>
                                </div>
                              </td>
                            </div>
                          </div>
                        </div>
                        <div className="table-cont-item">
                          <div>Remove</div>
                          <div>
                            <div>
                              <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEP0lEQVR4nO2dP4+UVRTGfxUR+AgsriFqpAQLxVbdGDtJSHQ/A1BCCTQutkK0kgIT+RckxsVC+AAmRreAEgtZ1kqjiK6R5jE3czBvNsPsfYedmXPPnl9yi52cmZznPe/cP8/c+y4kSZIkSZIkSZIkSZIkSZJER7BD8JHgF4E2aWuCpfKeWecdFsHZikJsbB/OOu+waHDXl4t8qCL2jSfflOlktw2R3fWTik+yID4Q7Bd8Xjk4a8qt5HSx5Mh2QPCu4G8HF16btJLjO0RGsFfwuwn+TLAPZwj2CS5YjiXXvURFcNWE3sA5gi8t16tERPBmpyuYxzmCOcEjy7ndrsuEXBP8+ZS++SSNIDjxFA1F23XBSzRQjN8cDMjapN3t5Hy3+1rn75pWtO7BK/bNKIl+7TrRZ6RoEyyb1it4pdNNhS3Ghhlj0foHXhE8tCTnCI4aKch1S3I5clE0GCtvmtZreEXwsuBXB4O2ptTKoP4iDQx4VzrdV8T20CYwvosxDMF9E/E8jSKYNw0/0zqCFRNzgEYRHDQNP9I6glsm5m0aRbBgGr6ldQSXTMwHNIpg0TR8QesIzpuYoz13lazZpoYds4rvvO+oaThP6whOm5jTFbFnbQ2zpzPXX5pV/Dga3CM4Vnt3aXDXzm1YDa/NKr4Td840HKN1ythhYi5VxKrmtWnFd2Ium4b3aZ0yuzIxtxwU5E6f+EgzxbHm8JrSHd83PsJa6n/KCt3E3G+4IKumof0ND4JdJmbdQZd1r098J2bdNOwiArWC5HBQF+yuvaHCGYxyOKj36XKboTMoHmxtDFEkY7HvtFE+CxLHWOxrMMpnl1W9sG2GWutBPgf145b7x0Sh1pyTz4KcsdxPEYVag1E+C1L980Ez1PbD8lmQOMZiX4NRPgty23J/iyh05vIrDRZkJYyx2He1K58FiWMsDjEY/2mwIOuW+04i0RG2u5WCKKKx2MdglL+CxNmxOI7BKH8FiWcsDjEYFxoqyEI4Y3GIwbjYUEEWw+xYHMdglL+CxDMW+xiM8leQeMZiH4NRW3OB72zh58fZsTjCYLw8yYKMYozPj2cs9jEY5a8g8YzFPgaj/BUknrE4xGBcbaggq+GMxT4Go/wVJKaxWGswytEsq88W2AgG47z3dYgiG4tPKCbdKINRvgryquX6A1HZzGCUr4LENRZrDUYNPwP4YMTnTSw+5I7FEXuchloRGjw8/6adkC0X65tRz26fZHyoo9AVBuOZEefIl+xOflAuVsW584nEhzoKvRVHpGdNyB2LGxEcMZHLOEeD50aWXI8QFcErnedNPYdTBDs7z4/0/SjYZ0XwvQn9BKcIPrUcvyM69o9WHpvgrwSvezjdqoFVcshyKrn9K3iN7YDgsOAvE+6xPRK8x3ZC8ILNZH7qfGM0w/bYcjnX8uMIkyRJkiRJkiRJkiRJkiRJkiRJkoQ+/AfNOoXNz7JA8QAAAABJRU5ErkJggg=="
                                alt="filled-trash"
                                width={25}
                                onClick={() => deleteCart(e.id)}
                                className="delete-icn"
                                height={25}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="buttons">
              <Link
                onClick={window.scrollTo(0, 0)}
                className="continue"
                to={"/product"}
              >
                continue shopping
              </Link>
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/checkout");
                }}
              >
                CheckOut
              </button>
            </div>
          </div>
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
          <div className="mt-3">Add Items to cart...</div>
        </div>
      )}

      <div className="new-arrival">
        <div className="new-arrival-header">
          New <span>Arrival</span>
        </div>
        <div className="new-arrival-content">
          browse the collection of new product
        </div>

        <div className="item">
          <div data-aos="fade-up" className="itemBody">
            {product.slice(0, 6).map((item) => {
              return <Item product={item} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Cart;
