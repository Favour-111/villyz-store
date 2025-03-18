import React, { useContext, useEffect, useState } from "react";
import "./CheckOut.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import Item from "../../components/items/Item";
import { ShopContext } from "../../components/context/ShopContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import BackToTop from "../../components/BackToTop/BackToTop";
import axios from "axios";

const CheckOut = ({ page }) => {
  const {
    cartItem,
    addToCart,
    Remove,
    deleteCart,
    product,
    getTotalValue,
    totalCartItems,
  } = useContext(ShopContext);
  const name =
    "  Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam, magni";
  const totalStars = 5;

  // State for selected payment method
  const [paymentMethod, setPaymentMethod] = useState("");

  // Handle the radio button change
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const [AllAddress, setAllAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // Tracks selected address
  const [useNewAddress, setUseNewAddress] = useState(true); // Tracks which radio is selected
  const [loader, setLoader] = useState(false);
  const [AddLoader, setAddLoader] = useState(false);
  const [AddressLoader, setAddressLoader] = useState(false);
  const [newAddress, setNewAddress] = useState({
    country: "",
    street: "",
    state: "",
    postalCode: "",
    city: "",
  });
  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  console.log(newAddress);

  const locations = {
    USA: {
      price: 100,
      states: {
        California: 50,
        Texas: 40,
        Florida: 30,
      },
    },
    Canada: {
      price: 80,
      states: {
        Ontario: 60,
        Quebec: 50,
        Alberta: 40,
      },
    },
    Nigeria: {
      price: 70,
      states: {
        Lagos: 35,
        Abuja: 25,
        Kano: 20,
      },
    },
  };
  const userId = localStorage.getItem("userId");
  // State variables
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAllAddress = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `https://villyzstore.onrender.com/address/${userId}`
      );
      if (response.data) {
        setAllAddress(response.data);

        // Find the default address and set it as selected
        const defaultAddress = response.data.find(
          (address) => address.isDefault
        );
        if (defaultAddress) {
          setSelectedAddress(defaultAddress._id);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error fetching addresses",
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    handleAllAddress();
  }, []);
  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    setSelectedState(""); // Reset state selection

    setNewAddress((prev) => ({
      ...prev,
      country: location, // Store country in newAddress
      state: "", // Reset state when country changes
    }));

    if (location) {
      const locationPrice = locations[location].price;
      setTotalPrice(locationPrice);
    } else {
      setTotalPrice(0);
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);

    setNewAddress((prev) => ({
      ...prev,
      state: state, // Store state in newAddress
    }));

    if (state) {
      const statePrice = locations[selectedLocation].states[state];
      const locationPrice = locations[selectedLocation].price;
      setTotalPrice(locationPrice + statePrice);
    }
  };

  // Add new address to the list
  const handleAddAddress = async () => {
    if (
      !newAddress.country ||
      !newAddress.street ||
      !newAddress.state ||
      !newAddress.postalCode ||
      !newAddress.city
    ) {
      Swal.fire({
        icon: "error",
        title: "All fields are required",
      });
      return;
    }

    try {
      setAddLoader(true);
      const response = await axios.post(
        "https://villyzstore.onrender.com/addAddress",
        {
          ...newAddress,
          userId,
        }
      );

      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Address added successfully",
        });

        // Update AllAddress state immediately
        setAllAddress((prevAddresses) => [...prevAddresses, response.data]);

        // Reset input fields
        setNewAddress({
          country: "",
          street: "",
          state: "",
          postalCode: "",
          city: "",
        });
        handleAllAddress();

        setUseNewAddress(true); // Keep showing the input form
      }
    } catch (err) {
      console.error("Error adding address:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to add address",
        text: err.response ? err.response.data.message : "Server error",
      });
    } finally {
      setAddLoader(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      setAddressLoader(true);
      const response = await axios.delete(
        `https://villyzstore.onrender.com/address/${id}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Address deleted successfully",
        });

        // Update the AllAddress state by removing the deleted address
        setAllAddress((prevAddresses) =>
          prevAddresses.filter((address) => address._id !== id)
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Problem deleting address, try again",
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setAddressLoader(false);
    }
  };

  const setDefaultAddress = async (id) => {
    try {
      const response = await axios.put(
        `https://villyzstore.onrender.com/addresses/${id}/set-default`
      );

      if (response.status === 200) {
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
          title: "Default address selected",
        });

        // Update state to mark the selected address as default
        setAllAddress((prevAddresses) =>
          prevAddresses.map((address) => ({
            ...address,
            isDefault: address._id === id, // Only the selected address is default
          }))
        );

        setSelectedAddress(id); // Update the selected address
      }
    } catch (error) {
      console.error("Error updating default address:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update default address",
        text: error.response ? error.response.data.message : "Server error",
      });
    }
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      Swal.fire({
        icon: "error",
        title: "No address selected",
        text: "Please select an address before proceeding.",
      });
      return;
    } else {
    }
  };

  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="container-address">
        <div className="row w-100 mt-5">
          <div className="col-xl-4 col-md-12">
            <div className="summary ">
              <div className="summary-head">Summary</div>
              <div className="price-list mt-3">
                <div>sub-total</div>
                <div>${getTotalValue()}</div>
              </div>
              <div className="price-list">
                <div>Delivery charge</div>
                <div>{totalPrice}</div>
              </div>
              <div className="price-list-total">
                <div>total</div>
                <div>${getTotalValue() + totalPrice}</div>
              </div>
              <div className="summary-container">
                {product.map((e) => {
                  if (cartItem[e.id] > 0) {
                    return (
                      <div className="summary-items">
                        <div className="img">
                          <img src={e.image} alt="" />
                        </div>
                        <div>
                          <div className="summary-product-name">
                            {e?.productName
                              ? e.productName.length < 26
                                ? e.productName
                                : e.productName.slice(0, 26) + "..."
                              : "No Name Available"}
                          </div>
                          <div className="my-1">
                            {Array.from({ length: totalStars }, (_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={index < e.Rating ? "orange" : "gray"} // Conditionally set color
                                width="14px"
                                height="14px"
                                style={{ margin: "0 2px" }}
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <div className="d-flex mt-2 gap-2">
                            <div className="oldPrice">${e.oldPrice}</div>
                            <div className="newPrice">${e.newPrice}</div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="summary  mt-5">
              <div className="summary-head">Payment Method</div>
              <div className="price-list1 mt-1">
                <div>
                  Please select the preferred payment method to use on this
                  order
                </div>
              </div>

              <div className="delivery-system">
                {/* Cash On Delivery Radio Button */}

                {/* Online Payment Radio Button */}
                <div className="d-flex align-items-center mt-2 gap-2">
                  <div>
                    <input
                      type="checkBox"
                      value="onlinePayment"
                      checked
                      onChange={handlePaymentMethodChange}
                    />
                  </div>
                  <div>Online Payment</div>
                </div>

                {/* Add Comment Section */}
                <div>
                  <div className="label mt-3">Add comment about your order</div>
                  <textarea
                    name=""
                    placeholder="comment(Optional)"
                    id=""
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-12 ">
            <div className="billing-container">
              <div className="p-3">
                <div className="billing-head">Billing Address</div>
                <div className="checkout-type">Checkout option</div>

                {/* Radio Buttons */}
                <div className="checkBox-contain">
                  <div className="checkout-item">
                    <div>
                      <input
                        type="checkBox"
                        name="addressOption"
                        disabled={AllAddress.length === 0} // Disable if no addresses exist
                        checked={!useNewAddress}
                        onChange={() => setUseNewAddress(false)}
                      />
                    </div>

                    <label>Use Existing Address</label>
                  </div>
                  <div className="checkout-item">
                    <div>
                      <input
                        type="checkBox"
                        name="addressOption"
                        checked={useNewAddress}
                        onChange={() => setUseNewAddress(true)}
                      />
                    </div>
                    <label>Use New Address</label>
                  </div>
                </div>
              </div>

              {/* Existing Addresses */}
              {!useNewAddress && AllAddress.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div className="billing-head">Address</div>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {loader ? (
                      <div className="w-100 d-flex align-items-center justify-content-center">
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      AllAddress.map((address, index) => (
                        <li className="address-itm">
                          <div className="address-cont">
                            <div className="input-cont">
                              <input
                                type="radio"
                                name="existingAddress"
                                className="address-select"
                                checked={selectedAddress === address._id}
                                onChange={() => setDefaultAddress(address._id)}
                              />
                            </div>
                            <div className="pt-4">
                              <div className="row">
                                <div className="col-md-5 col-sm-12 address-text">
                                  <span>Country</span> : {address.country}
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-md-7 col-sm-12 address-text">
                                  <span>Address</span> : {address.street}
                                </div>
                                <div className="col-md-5 col-sm-12 address-text">
                                  <span>Postal Code</span> :{" "}
                                  {address.postalCode}
                                </div>
                                <div className="col-md-5 col-sm-12 address-text">
                                  <span>City</span> : {address.city}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-7 col-sm-12 address-text">
                                  <span>State</span> : {address.state}
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteAddress(address._id)}
                            className="remove-address"
                          >
                            {AddressLoader ? (
                              "..."
                            ) : (
                              <img
                                width="20"
                                height="20"
                                src="https://img.icons8.com/ios-filled/50/multiply.png"
                                alt="multiply"
                              />
                            )}
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}

              {/* New Address Form */}
              {useNewAddress && (
                <div>
                  <div className="billing-head ms-2">Add New Address</div>
                  <div className="billing">
                    <div className="row w-100 ">
                      <div className="col-lg-6 col-md-12">
                        <select
                          className="select"
                          onChange={handleLocationChange}
                          value={selectedLocation}
                        >
                          <option value="">Select Country</option>
                          {Object.keys(locations).map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-lg-6 col-md-12">
                        <input
                          type="text"
                          name="street"
                          placeholder="Address"
                          value={newAddress.street}
                          onChange={handleInputChange}
                          className="address-input"
                        />
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <select
                          className="select"
                          onChange={handleStateChange}
                          value={selectedState}
                          disabled={!selectedLocation}
                        >
                          <option value="">Select State</option>
                          {selectedLocation &&
                            Object.keys(locations[selectedLocation].states).map(
                              (state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              )
                            )}
                        </select>
                      </div>

                      <div className="col-lg-6 col-md-12">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={handleInputChange}
                          className="address-input"
                        />
                      </div>

                      <div className="col-lg-6 col-md-12 w-100">
                        <input
                          type="text"
                          name="postalCode"
                          placeholder="Postal Code"
                          value={newAddress.postalCode}
                          onChange={handleInputChange}
                          className="address-input"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleAddAddress}
                    className="Address-btn ms-3"
                  >
                    {AddLoader ? "Please wait ..." : "Add address"}
                  </button>
                </div>
              )}
            </div>
            <div className="proceed-cont">
              <button onClick={handleProceedToPayment}>
                Proceed to payment
              </button>
            </div>
          </div>
        </div>

        <div className="new-arrival mt-5">
          <div className="new-arrival-header">
            New <span>Arrival</span>
          </div>
          <div className="new-arrival-content">
            browse the collection of new product
          </div>

          <div className="item">
            <div data-aos="fade-up" className="itemBody">
              {product.slice(0, 10).map((item) => {
                return <Item product={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default CheckOut;
