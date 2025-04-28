import React, { useState, useEffect } from "react";
import "./NewsletterPopup.css";

const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("newsletterPopupShown");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("newsletterPopupShown", "true");
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup shadow-sm">
            <div className="d-flex align-items-center justify-content-center">
              <div className="popup-mail">
                <img
                  src="https://img.icons8.com/lollipop/48/new-post.png"
                  alt=""
                />
              </div>
            </div>
            <h2>Subscribe to our Newsletter!</h2>
            <p>
              Receive news articles and resources directly in your inbox. Fill
              your email below to join our newsletter today.
            </p>
            <div className="pop-up-input-cont shadow-sm">
              <input type="email" placeholder="Enter your email" />
              <button className="Subscribe-btn" onClick={closePopup}>
                Subscribe
              </button>
            </div>
            <button className="close-btn" onClick={closePopup}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterPopup;
