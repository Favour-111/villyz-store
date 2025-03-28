import React from "react";
import "./Message.css";
import { FaCheck } from "react-icons/fa";
const Success = ({ message }) => {
  return (
    <div>
      <div className="message-container shadow">
        <div className="message-content">
          <div className="success-color"></div>

          <div className="message">
            <div className="checked-icn">
              <FaCheck />
            </div>
            <div>
              <div className="msg">Success</div>
              <div className="msg-cont">{message}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
