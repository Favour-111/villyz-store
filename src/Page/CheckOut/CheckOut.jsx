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
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
const CheckOut = ({ page }) => {
  const navigate = useNavigate();
  const { cartItem, product, getTotalValue } = useContext(ShopContext);

  const cartProducts = product.filter(
    (itm) => cartItem && cartItem[itm.id] && cartItem[itm.id] > 0
  );

  const totalStars = 5;

  const [AllAddress, setAllAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // Tracks selected address
  const [useNewAddress, setUseNewAddress] = useState(true); // Tracks which radio is selected
  const [loader, setLoader] = useState(false);
  const [AddLoader, setAddLoader] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [delivery, setFee] = useState(0);
  const [AddressLoader, setAddressLoader] = useState(false);
  const [DefaultLoader, setDefaultLoader] = useState(false);
  const [orderLoader, setOrderLoader] = useState(false);
  const [newAddress, setNewAddress] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Fee: totalPrice,
    country: "",
    street: "",
    state: "",
    postalCode: "",
    city: "",
  });
  const recentAdd = AllAddress.find((item) => item._id === selectedAddress);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };
  const [locations, setLocation] = useState({});
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `https://villyzstore.onrender.com/countries`
        );
        const locationsData = response.data.reduce((acc, location) => {
          acc[location.country] = {
            price: location.price,
            states: location.states,
          };
          return acc;
        }, {});
        setLocation(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const userId = localStorage.getItem("userId");
  // State variables
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedState, setSelectedState] = useState("");

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
          setFee(defaultAddress.Fee);
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
      !newAddress.FirstName ||
      !newAddress.LastName ||
      !newAddress.PhoneNumber ||
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
          Fee: totalPrice, // Set Fee to totalPrice
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
          FirstName: "",
          LastName: "",
          Fee: 0,
          PhoneNumber: "",
          city: "",
        });
        handleAllAddress();
        setUseNewAddress(true);
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
          title: " address deleted successfully",
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
  let selectedAddr;
  const setDefaultAddress = async (id) => {
    try {
      setDefaultLoader(true);
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

        // Find the selected address
        selectedAddr = AllAddress.find((address) => address._id === id);

        if (selectedAddr) {
          console.log("Selected Address Fee:", selectedAddr.Fee); // Debugging
          setFee(selectedAddr.Fee); // Ensure the fee updates properly
        }

        setAllAddress((prevAddresses) =>
          prevAddresses.map((address) => ({
            ...address,
            isDefault: address._id === id,
          }))
        );

        setSelectedAddress(id);
      }
    } catch (error) {
      console.error("Error updating default address:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update default address",
        text: error.response ? error.response.data.message : "Server error",
      });
    } finally {
      setDefaultLoader(false);
    }
  };
  const cartItems = cartProducts.map((item) => ({
    name: item.productName,
    image: item.image,
    price: Number(item.newPrice),
    quantity: cartItem[item.id] || 1, // Use shopContext to get the quantity
  }));

  console.log(cartItems);

  const handleCheck = async () => {
    try {
      if (!cartProducts || cartProducts.length === 0) {
        Swal.fire({ icon: "error", title: "Your cart is empty" });
        return;
      }

      if (!selectedAddress) {
        Swal.fire({
          icon: "error",
          title: "No address selected",
          text: "Please select an address before proceeding.",
        });
        return;
      }

      setOrderLoader(true); // Show loading indicator while processing

      // Construct the order object
      const orderData = {
        UserID: localStorage.getItem("userId"), // Ensure userId is included
        name: `${recentAdd.FirstName} ${recentAdd.LastName}`,
        email: recentAdd.email,
        OrderPrice: getTotalValue(), // Use camelCase to match backend
        paymentStatus: "Pending",
        paymentReference: `ORDER_${Date.now()}`, // Unique reference ID
        orderStatus: "Processing",
        DeliveryFee: recentAdd.Fee,
        PhoneNumber: recentAdd.PhoneNumber,
        cartItems: cartProducts.map((item) => ({
          _id: item.id || item._id, // Ensure correct product ID
          productName: item.productName || "Unknown",
          image: item.image || "",
          price: Number(item.newPrice) || 0,
          quantity: cartItem[item.id] || 1,
        })),
        street: recentAdd?.street || "",
        state: recentAdd?.state || "",
        city: recentAdd?.city || "",
        postalCode: recentAdd?.postalCode || "",
        country: recentAdd?.country || "",
      };

      console.log("Sending order:", JSON.stringify(orderData, null, 2));

      const response = await axios.post(
        "https://villyzstore.onrender.com/addOrder",
        orderData
      );

      if (!response) {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Order submission failed",
        text: error.response?.data?.error || "Server error",
      });
    } finally {
      setOrderLoader(false); // Hide loading indicator
    }
  };

  const handleProceedToPayment = async () => {
    if (!selectedAddress) {
      Swal.fire({
        icon: "error",
        title: "No address selected",
        text: "Please select an address before proceeding.",
      });
      return;
    }

    try {
      setOrderLoader(true);

      const stripe = await loadStripe(
        "pk_test_51R1l1DRjQM7yvxj09e4OhH8yIE4axDzo0atPKLd2kAdhQa8Z3OevHa5o765Udok6KwcxcLpJgv82UYCE3ec5UMEt00RaohkNdW"
      );

      const orderData = {
        UserID: localStorage.getItem("userId"),
        name: `${recentAdd.FirstName} ${recentAdd.LastName}`,
        email: recentAdd.email,
        OrderPrice: getTotalValue(),
        paymentStatus: "Pending",
        paymentReference: `ORDER_${Date.now()}`,
        orderStatus: "Processing",
        DeliveryFee: recentAdd.Fee,
        PhoneNumber: recentAdd.PhoneNumber,
        cartItems: cartProducts.map((item) => ({
          _id: item.id || item._id,
          productName: item.productName || "Unknown",
          image: item.image || "",
          price: Number(item.newPrice) || 0,
          quantity: cartItem[item.id] || 1,
        })),
        street: recentAdd?.street || "",
        state: recentAdd?.state || "",
        city: recentAdd?.city || "",
        postalCode: recentAdd?.postalCode || "",
        country: recentAdd?.country || "",
      };

      // Save order to sessionStorage so we can access it after payment success
      localStorage.setItem("orderData", JSON.stringify(orderData));

      const body = {
        products: cartItems,
        shippingFee: delivery,
      };

      const response = await fetch(
        "https://villyzstore.onrender.com/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment failed",
        text: error.message || "Something went wrong with payment",
      });
    } finally {
      setOrderLoader(false);
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
                <div>${delivery}</div>
              </div>
              <div className="price-list-total">
                <div>total</div>
                <div>${getTotalValue() + delivery}</div>
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
                    <input type="checkBox" value="onlinePayment" checked />
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
                      <input type="checkBox" name="addressOption" checked />
                    </div>

                    <label>Use Existing Address</label>
                  </div>
                </div>
              </div>

              {/* Existing Addresses */}
              {AllAddress.length > 0 ? (
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
                                type="checkbox"
                                name="existingAddress"
                                className="address-select"
                                checked={selectedAddress === address._id}
                                onChange={() => setDefaultAddress(address._id)}
                              />
                              {DefaultLoader && <Loading />}
                            </div>
                            <div className="pt-4">
                              <div className="row">
                                <div className="col-md-5 col-sm-12 address-text">
                                  <span>Name</span> : {address.FirstName} -{" "}
                                  {address.LastName}
                                </div>
                                <div className="col-md-5 col-sm-12 address-text">
                                  <span>Phone number</span> :{" "}
                                  {address.PhoneNumber}
                                </div>
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
                            {AddressLoader && <Loading />}
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              ) : (
                <div className="instruction">
                  Click the "Add Address" button and enter the required details
                  to create a new address.
                </div>
              )}
              <button
                className="Address-btn mt-5"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add New Address
              </button>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="billing-head " id="exampleModalLabel">
                        Add New Address
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="FirstName"
                          placeholder="First Name"
                          value={newAddress.FirstName}
                          onChange={handleInputChange}
                          className="address-input"
                        />
                        <input
                          type="text"
                          name="LastName"
                          placeholder="Last Name"
                          value={newAddress.LastName}
                          onChange={handleInputChange}
                          className="address-input"
                        />
                        <input
                          type="text"
                          name="PhoneNumber"
                          placeholder="Phone Number"
                          value={newAddress.PhoneNumber}
                          onChange={handleInputChange}
                          className="address-input"
                        />
                        <input
                          type="text"
                          name="street"
                          placeholder="Address"
                          value={newAddress.street}
                          onChange={handleInputChange}
                          className="address-input"
                        />
                      </div>
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
                      <div className="col-md-12">
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

                      <div className="col-md-12">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={handleInputChange}
                          className="address-input"
                        />
                      </div>

                      <div className=" col-md-12 w-100">
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
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="modal-cancel"
                        data-bs-dismiss="modal"
                      >
                        cancel
                      </button>
                      <button
                        onClick={handleAddAddress}
                        className="Address-btn ms-3"
                        type="button"
                        class="Address-btn"
                      >
                        {AddLoader ? "hold..." : "Add Address"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {loader && <Loading />}
              {AddLoader && <Loading />}
            </div>
            <div className="proceed-cont">
              {orderLoader ? (
                <button onClick={handleProceedToPayment}>Loading...</button>
              ) : (
                <button onClick={handleProceedToPayment}>
                  Pay Now ${getTotalValue() + delivery}
                </button>
              )}
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
