import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import AccountSideBar from "../../components/AccountSideBar/AccountSideBar";
import Info from "../../components/info/Info";
import Nav from "../../components/Nav/Nav";
import NavSm from "../../components/NavSm/NavSm";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import AccountSideBarSm from "../../components/AccountSideBarSm/AccountSideBarSm";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../components/context/ShopContext";
import Loading from "../../components/Loading/Loading";
const Profile = ({ page }) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { id } = useParams();

  const { user } = useContext(ShopContext);
  const [password, setPassword] = useState("");
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (!password) {
      return Swal.fire({
        title: "Error",
        text: "Please enter your password",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    try {
      setDeleteLoading(true);

      // ✅ Step 1: Verify Password First
      const verifyResponse = await axios.post(
        `https://villyzstore.onrender.com/verify-password`,
        { id, password }
      );

      if (!verifyResponse.data.success) {
        return Swal.fire({
          title: "Error",
          text: "Incorrect password. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      // ✅ Step 2: Delete Account if Password is Verified
      await axios.delete(`https://villyzstore.onrender.com/deleteuser/${id}`, {
        data: { password },
      });

      Swal.fire({
        title: "Account Deleted Successfully",
        icon: "success",
      });
      localStorage.removeItem("auth-token");
      localStorage.removeItem("userId");

      // Redirect to login page after deletion
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.msg || "Failed to delete user. Try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setDeleteLoading(false);
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
                <input
                  type="text"
                  id="name"
                  value={loading ? "loading.." : user?.FirstName || "none"}
                />
              </div>
              <div className="profile-input-items">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="email"
                  id="email"
                  value={loading ? "loading.." : user?.email}
                />
              </div>
              <div className="profile-input-items">
                <label htmlFor="phone">Phone Number</label>
                <br />
                <input
                  type="text"
                  id="phone"
                  value={
                    loading
                      ? "loading..."
                      : user?.phoneNumber && user.phoneNumber.length >= 4
                      ? `******${user.phoneNumber.slice(-4)}`
                      : ""
                  }
                />
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
                        onClick={handleDeleteAccount}
                      >
                        {deleteLoading ? "please wait..." : "Delete Account"}
                      </button>
                    </div>
                    {deleteLoading ? <Loading /> : null}
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
