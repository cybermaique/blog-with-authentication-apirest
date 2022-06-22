import React, { useState, useEffect, useRef } from "react";
import "../../css/accessories/Options.css";
import Options_Icon from "../../assets/images/accessories/options/options_icon.png";
import Edit_Icon from "../../assets/images/accessories/options/edit_icon.png";
import Delete_Icon from "../../assets/images/accessories/options/delete_icon.png";
import Modal_comments_delete from "./Modal_comments_delete";

export default function Options_comments({
  postId,
  commentId,
  setEditComment,
}) {
  const [isActive, setIsActive] = useState(false);
  const [modalWarningOpen, setModalWarningOpen] = useState(false);
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const [icon, setIcon] = useState();
  let menuRef = useRef();

  const toggleBtn = () => setIsActive(!isActive);

  const toggleDelete = () => {
    setModalWarningOpen(true);
    setTitle("Atenção!");
    setMessage(
      "O comentário será deletado permanentemente, deseja prosseguir?"
    );
  };

  const editPost = () => {
    setEditComment(true);
  };

  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div ref={menuRef}>
      <button className="btn-options-comments" onClick={toggleBtn}>
        <img src={Options_Icon} className="options-icon"></img>
      </button>
      <nav className={`menu ${isActive ? "active" : "inactive"}`}>
        <div className="menu-container-comments">
          <ul>
            <li>
              <button className="btn-edit" onClick={() => editPost()}>
                <img src={Edit_Icon} className="edit-icon"></img>Editar
              </button>
            </li>
            <div className="line-options"></div>
            <li>
              <button className="btn-delete" onClick={() => toggleDelete()}>
                <img src={Delete_Icon} className="delete-icon"></img>Deletar
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {modalWarningOpen && (
        <Modal_comments_delete
          setOpenModal={setModalWarningOpen}
          title={title}
          message={message}
          icon={icon}
          postId={postId}
          commentId={commentId}
        />
      )}
    </div>
  );
}
