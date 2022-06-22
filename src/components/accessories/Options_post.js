import React, { useRef, useState, useEffect } from "react";
import "../../css/accessories/Options.css";
import Options_Icon from "../../assets/images/accessories/options/options_icon.png";
import Edit_Icon from "../../assets/images/accessories/options/edit_icon.png";
import Delete_Icon from "../../assets/images/accessories/options/delete_icon.png";
import Modal_post_delete from "./Modal_post_delete";

export default function Options_post({ postId, setEditPost }) {
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
      "A publicação será deletada permanentemente, deseja prosseguir?"
    );
  };

  const editPost = () => {
    setEditPost(true);
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
      <button className="btn-options" onClick={toggleBtn}>
        <img src={Options_Icon} className="options-icon"></img>
      </button>
      <nav className={`menu ${isActive ? "active" : "inactive"}`}>
        <div className="menu-container-post">
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
        <Modal_post_delete
          setOpenModal={setModalWarningOpen}
          title={title}
          message={message}
          icon={icon}
          postId={postId}
        />
      )}
    </div>
  );
}
