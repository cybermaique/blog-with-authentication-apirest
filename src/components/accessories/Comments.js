import React, { useState } from "react";
import moment from "moment";
import Options_Comments from "./Options_comments";
import "../../css/accessories/Comments.css";
import Modal_Edit_Comments from "./Modal_edit_comments";

export default function Comments({ postId }) {
  const [isActive, setIsActive] = useState(false);
  const [comment, setComment] = useState();
  const [userId, setUserId] = useState();
  const [commentsList, setCommentsList] = useState();
  const [editComment, setEditComment] = useState(false);
  var postId = postId;
  var commentId;
  var commentContent;
  var user_name;

  const toggleBtn = () => {
    setIsActive(!isActive);
    if (!isActive) {
      loadData();
    }
  };

  const toggleComment = () => {
    var resultMe = window.FakerApi.get("/me", {})
      .then((result) => {
        user_name = result.data.name;
        var resultCriaComment = window.FakerApi.post("/comments/create", {
          post_id: postId,
          comment: {
            content: comment,
            name: user_name,
            createDate: moment().format("DD/MM/YYYY HH:mm:ss.SSS"),
          },
        })
          .then((result) => {
            loadData();
          })
          .catch((response) => response);
      })
      .catch((response) => response);
  };

  const loadData = () => {
    var resultMe = window.FakerApi.get("/me", {})
      .then((result) => {
        setUserId(result.data.id);
      })
      .catch((response) => response);
    var resultListaComments = window.FakerApi.get("/comments", {
      post_id: postId,
    })
      .then((result) => {
        setCommentsList(
          result.data.sort((a, b) => {
            if (a && b) {
              if (a.createDate < b.createDate) {
                return 1;
              }
              if (a.createDate > b.createDate) {
                return -1;
              }
            }
            return 0;
          })
        );
      })
      .catch((response) => response);
  };

  return (
    <div className="">
      <button className="btn-comment" onClick={toggleBtn}>
        Comentários
      </button>

      <nav className={`comments ${isActive ? "active" : ""}`}>
        <div className="comments-container">
          <div className="text-area-container">
            <textarea
              className="form-control-comments "
              placeholder="Deixe o seu comentário"
              id="post-input"
              maxLength={150}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              type="button"
              className="btn-post-comment"
              onClick={() => {
                toggleComment();
              }}
            >
              Comentar
            </button>
          </div>
          <div className="line-comments"></div>

          {commentsList &&
            commentsList.length > 0 &&
            commentsList.map((dados, index) => {
              commentId = dados.id;
              commentContent = dados.content;
              return (
                <>
                  <div className="author-container">
                    <span className="author-name">{dados.name}</span>
                    {userId === dados.user_id ? (
                      <Options_Comments
                        postId={postId}
                        commentId={dados.id}
                        setEditComment={setEditComment}
                      />
                    ) : (
                      <div className="square-comments"></div>
                    )}
                  </div>
                  <span className="comments-content">{dados.content}</span>
                  <div className="line-comments"></div>
                </>
              );
            })}
        </div>
      </nav>

      {editComment && (
        <Modal_Edit_Comments
          setEditComment={setEditComment}
          postId={postId}
          commentId={commentId}
          commentContent={commentContent}
        />
      )}
    </div>
  );
}
