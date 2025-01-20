import React, { useState } from "react";
import "./CheckOut.css";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Footer from "../../footer/Footer";
import product from "../../product";
import Item from "../../components/items/Item";

const CheckOut = ({ page }) => {
  const name =
    "  Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam, magni";
  const totalStars = 5;

  // State for selected payment method
  const [paymentMethod, setPaymentMethod] = useState("");

  // Handle the radio button change
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const [addresses, setAddresses] = useState([]); // Stores list of addresses
  const [selectedAddress, setSelectedAddress] = useState(null); // Tracks selected address
  const [useNewAddress, setUseNewAddress] = useState(true); // Tracks which radio is selected
  const [newAddress, setNewAddress] = useState({
    name: "",
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

  // Add new address to the list
  const handleAddAddress = () => {
    if (
      !newAddress.name ||
      !newAddress.country ||
      !newAddress.address ||
      !newAddress.state ||
      !newAddress.postalCode ||
      !newAddress.city
    ) {
      alert("Please fill in all fields.");
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
                <div>$200</div>
              </div>
              <div className="price-list">
                <div>Delivery charge</div>
                <div>$40</div>
              </div>
              <div className="price-list-total">
                <div>total</div>
                <div>$240</div>
              </div>
              <div className="summary-container">
                <div className="summary-items">
                  <div className="img">
                    <img
                      src="https://cdn-img.oraimo.com/fit-in/600x600/KE/product/2024/10/16/OHF-201A.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="summary-product-name">
                      {name.slice(0, 20)}..
                    </div>
                    <div className="my-1">
                      {Array.from({ length: totalStars }, (_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={index < 4 ? "orange" : "gray"} // Conditionally set color
                          width="14px"
                          height="14px"
                          style={{ margin: "0 2px" }}
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <div className="d-flex mt-2 gap-2">
                      <div className="oldPrice">$40</div>
                      <div className="newPrice">$50</div>
                    </div>
                  </div>
                </div>
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
                <div className="d-flex align-items-center gap-2">
                  <div>
                    <input
                      type="radio"
                      value="cashOnDelivery"
                      checked={paymentMethod === "cashOnDelivery"}
                      onChange={handlePaymentMethodChange}
                    />
                  </div>
                  <div>Cash On Delivery</div>
                </div>

                {/* Online Payment Radio Button */}
                <div className="d-flex align-items-center mt-2 gap-2">
                  <div>
                    <input
                      type="radio"
                      value="onlinePayment"
                      checked={paymentMethod === "onlinePayment"}
                      onChange={handlePaymentMethodChange}
                    />
                  </div>
                  <div>Online Payment</div>
                </div>

                {/* Add Comment Section */}
                <div>
                  <div className="label mt-3">Add comment about your order</div>
                  <textarea name="" placeholder="comment" id=""></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-12">
            <div className="billing-container">
              <div className="billing-head">Billing Address</div>
              <div className="checkout-type">Checkout option</div>

              {/* Radio Buttons */}
              <div className="checkBox-contain">
                <div className="checkout-item">
                  <div>
                    <input
                      type="radio"
                      name="addressOption"
                      disabled={addresses.length === 0} // Disable if no addresses exist
                      checked={!useNewAddress}
                      onChange={() => setUseNewAddress(false)}
                    />
                  </div>

                  <label>Use Existing Address</label>
                </div>
                <div className="checkout-item">
                  <div>
                    <input
                      type="radio"
                      name="addressOption"
                      checked={useNewAddress}
                      onChange={() => setUseNewAddress(true)}
                    />
                  </div>
                  <label>Use New Address</label>
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
                              <div className="col-md-7 col-sm-12 address-text">
                                <span>Name</span> : {address.name}
                              </div>
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
                            </div>
                            <div className="row">
                              <div className="col-md-7 col-sm-12 address-text">
                                <span>State</span> : {address.state}
                              </div>
                              <div className="col-md-5 col-sm-12 address-text">
                                <span>city</span> : {address.city}
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
                  <div className="billing-head">Add New Address</div>
                  <div className="row w-100">
                    <div className="col-lg-6 col-md-12">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newAddress.name}
                        onChange={handleInputChange}
                        className="address-input"
                      />
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={newAddress.country}
                        onChange={handleInputChange}
                        className="address-input"
                      />
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
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={handleInputChange}
                        className="address-input"
                      />
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={newAddress.postalCode}
                        onChange={handleInputChange}
                        className="address-input"
                      />
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
                  </div>
                  <button onClick={handleAddAddress} className="Address-btn">
                    Add
                  </button>
                </div>
              )}
            </div>
            <div className="proceed-cont">
              <button>proceed to payment</button>
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
    </div>
  );
};

export default CheckOut;
