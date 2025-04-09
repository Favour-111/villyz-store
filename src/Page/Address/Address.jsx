import React, { useEffect, useState } from "react";
import "./Address.css";
import AccountSideBar from "../../components/AccountSideBar/AccountSideBar";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import AccountSideBarSm from "../../components/AccountSideBarSm/AccountSideBarSm";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const Address = ({ page }) => {
  const [selectedAddress, setSelectedAddress] = useState(null); // Tracks selected address
  const [useNewAddress, setUseNewAddress] = useState(true); // Tracks which radio is selected
  const [AllAddress, setAllAddress] = useState([]);
  const [loader, setLoader] = useState(false);
  const [AddLoader, setAddLoader] = useState(false);
  const [AddressLoader, setAddressLoader] = useState(false);
  const [DefaultLoader, setDefaultLoader] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [delivery, setFee] = useState(0);
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
  }); // Tracks new address form inputs
  const userId = localStorage.getItem("userId");
  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  console.log(newAddress);

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

  // State variables
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // Handle location change
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
        const selectedAddr = AllAddress.find((address) => address._id === id);

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
  return (
    <div>
      <Info />
      <Nav />
      <NavSm />
      <BreadCrumb page={page} />
      <div className="account-pg">
        <AccountSideBar />
        <div className="w-100 p-3">
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
                      <input type="checkBox" name="addressOption" checked />
                    </div>

                    <label>View Existing Addresses</label>
                  </div>
                </div>
              </div>

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
                              {DefaultLoader ? <Loading /> : null}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
