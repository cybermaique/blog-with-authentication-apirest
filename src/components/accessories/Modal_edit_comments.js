import React, { useState } from "react";
import "../../css/accessories/Modal.css";

export default function Modal_edit_comments({
  setEditComment,
  postId,
  commentId,
  commentContent,
}) {
  const [newContent, setNewContent] = useState(commentContent);

  const toggleUpdate = () => {
    var resultAtualizaComment = window.FakerApi.put("/comments/update", {
      post_id: postId,
      comment_id: commentId,
      comment: { content: newContent },
    })
      .then((result) => {
        setEditComment(false);
        window.location.reload();
      })
      .catch((response) => response);
  };

  const toggleReturn = () => {
    setEditComment(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container-edit-comments">
        <span className="tittle-edit-post">Atualizar comentário</span>
        <textarea
          className="form-control-edit-comments"
          placeholder="Atualize o seu comentário"
          id="post-edit"
          maxLength={300}
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
            className="btn-goBack-comments"
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
