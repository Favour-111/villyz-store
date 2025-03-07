import React, { useState } from "react";
import "./Profile.css";
import AccountSideBar from "../../components/AccountSideBar/AccountSideBar";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import AccountSideBarSm from "../../components/AccountSideBarSm/AccountSideBarSm";
const Profile = ({ page }) => {
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "123") {
      Swal.fire({
        title: "Account Deleted successfully",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Account deletion failed ",
        text: "input correct password",
        icon: "error",
        confirmButtonText: "OK",
      });
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
        <div className="w-100">
          <AccountSideBarSm />
          <div className="settings-cont">
            <div className="settings-head">Account Settings</div>
            <div className="settings-content">Account Details</div>
            <div className="profile-input">
              <div className="profile-input-items">
                <label htmlFor="name">Name</label>
                <br />
                <input type="text" id="name" defaultValue="omojolaobaloluwa" />
              </div>
              <div className="profile-input-items">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="email"
                  id="email"
                  defaultValue="omojolaobaloluwa@gmail.com"
                />
              </div>
              <div className="profile-input-items">
                <label htmlFor="phone">Phone Number</label>
                <br />
                <input type="text" id="phone" defaultValue="080******123" />
              </div>
            </div>
            <div className="line"></div>
            <div>
              <div className="settings-content">Delete Account</div>
              <p className="del">Would you like to delete your account?</p>
              <p className="del">
                This account contains 12 orders. Deleting your account will
                remove all order details associated with it.
              </p>
              <button
                className="btn btn-outline-danger mt-4"
                data-bs-toggle="modal"
                data-bs-target="#deleteAccountModal"
              >
                I want to delete my account
              </button>

              {/* Modal for Account Deletion Confirmation */}
              <div
                className="modal fade"
                id="deleteAccountModal"
                tabIndex="-1"
                aria-labelledby="deleteAccountModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteAccountModalLabel">
                        Confirm Account Deletion
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>Enter your password to confirm account deletion.</p>
                      <div className="confirm-input">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleSubmit}
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of Modal */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
