import React from "react";
import "../../css/accessories/Modal.css";
import Close_Icon from "../../assets/images/accessories/modal/close_icon.png";

export default function Modal_warning({ setOpenModal, title, message, icon }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-closeBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <img src={Close_Icon} className="close-icon"></img>
          </button>
        </div>
        <img src={icon} className="error-icon"></img>
        <label className="tittle-modal-warning">{title}</label>
        <div className="infos-container">
          <p className="infos-modal">{message}</p>
        </div>
      </div>
    </div>
  );
}
