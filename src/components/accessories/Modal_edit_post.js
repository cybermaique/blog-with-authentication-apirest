import React, { useState } from "react";
import "../../css/accessories/Modal.css";

export default function Modal_edit_post({
  setEditPost,
  postId,
  postTittle,
  postContent,
}) {
  const [newTittle, setNewTittle] = useState(postTittle);
  const [newContent, setNewContent] = useState(postContent);

  const toggleUpdate = () => {
    var resultAtualizaPost = window.FakerApi.put("/posts/update", {
      post_id: postId,
      post: { title: newTittle, content: newContent },
    })
      .then((result) => {
        setEditPost(false);
        window.location.reload();
      })
      .catch((response) => response);
  };

  const toggleReturn = () => {
    setEditPost(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container-edit-post">
        <span className="tittle-edit-post">Atualizar publicação</span>
        <input
          type="text"
          className="form-control-tittle input-default-tittle"
          placeholder="Título"
          maxLength={100}
          value={newTittle}
          onChange={(e) => setNewTittle(e.target.value)}
        />
        <textarea
          className="form-control-post "
          placeholder="Nova publicação"
          id="post-edit"
          maxLength={2000}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        ></textarea>
        <div className="btn-container">
          <button
            type="button"
            className="btn-update"
            onClick={() => {
              toggleUpdate();
            }}
          >
            Atualizar
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
