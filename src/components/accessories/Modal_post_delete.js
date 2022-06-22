import React from "react";
import "../../css/accessories/Modal.css";
import Close_Icon from "../../assets/images/accessories/modal/close_icon.png";

export default function Modal_post_delete({
  setOpenModal,
  title,
  message,
  icon,
  postId,
  commentId,
}) {
  const toggleConfirmDelete = () => {
    var resultRemovePost = window.FakerApi.delete("/posts/remove", {
      post_id: postId,
    })
      .then((result) => {
        window.location.reload();
      })
      .catch((response) => response);
  };

  const toggleReturn = () => {
    setOpenModal(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container-delete">
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

        <div className="modal-btn-container">
          <button
            type="button"
            className="btn-deletee"
            onClick={() => {
              toggleConfirmDelete();
            }}
          >
            Deletar
          </button>
          <button
            type="button"
            className="btn-goBack"
            onClick={() => {
              toggleReturn();
            }}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
