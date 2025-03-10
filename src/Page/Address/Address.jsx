import React, { useState } from "react";
import "./Address.css";
import AccountSideBar from "../../components/AccountSideBar/AccountSideBar";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import AccountSideBarSm from "../../components/AccountSideBarSm/AccountSideBarSm";

const Address = ({ page }) => {
  const [addresses, setAddresses] = useState([]); // Stores list of addresses
  const [selectedAddress, setSelectedAddress] = useState(null); // Tracks selected address
  const [useNewAddress, setUseNewAddress] = useState(true); // Tracks which radio is selected
  const [newAddress, setNewAddress] = useState({
    country: "",
    address: "",
    state: "",
    postalCode: "",
    city: "",
  }); // Tracks new address form inputs

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

  // State variables
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Handle location change
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
  const handleAddAddress = () => {
    if (
      !newAddress.country ||
      !newAddress.address ||
      !newAddress.state ||
      !newAddress.postalCode ||
      !newAddress.city
    ) {
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
        title: "inputs are required",
      });
      return;
    }

    setAddresses([...addresses, newAddress]);
    setNewAddress({
      name: "",
      country: "",
      address: "",
      state: "",
      postalCode: "",
      city: "",
      PhoneNumber: "",
    });
    setUseNewAddress(false); // Switch to existing address mode after adding
  };
  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);

    // Reset selection if the deleted address was selected
    if (selectedAddress === index) {
      setSelectedAddress(null);
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
    }

    // Navigate to payment page or trigger payment process
  };
  console.log(totalPrice);
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="account-pg">
        <AccountSideBar />
        <div className="w-100">
          <AccountSideBarSm />
          <div className="w-100">
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
                        disabled={addresses.length === 0} // Disable if no addresses exist
                        checked={!useNewAddress}
                        onChange={() => setUseNewAddress(false)}
                      />
                    </div>

                    <label>View Existing Addresses</label>
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
                    <label>Add New Address</label>
                  </div>
                </div>
              </div>

              {/* Existing Addresses */}
              {!useNewAddress && addresses.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div className="billing-head">Address</div>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {addresses.map((address, index) => (
                      <li className="address-itm">
                        <div className="address-cont">
                          <div className="input-cont">
                            <input
                              type="checkbox"
                              name="existingAddress"
                              className="address-select"
                              value={index}
                              checked={selectedAddress === index}
                              onChange={() => setSelectedAddress(index)}
                              style={{ marginRight: "10px" }}
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
                                <span>Address</span> : {address.postalCode}
                              </div>
                              <div className="col-md-5 col-sm-12 address-text">
                                <span>Postal Code</span> : {address.postalCode}
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
                          onClick={() => handleDeleteAddress(index)}
                          className="remove-address"
                        >
                          <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/ios-filled/50/multiply.png"
                            alt="multiply"
                          />
                        </button>
                      </li>
                    ))}
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
                          name="address"
                          placeholder="Address"
                          value={newAddress.address}
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
                          value={newAddress.City}
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
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
