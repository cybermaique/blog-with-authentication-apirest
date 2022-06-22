import React, { useState, useEffect } from "react";
import moment from "moment";
import "../../css/pages/Main.css";
import Options_Post from "../../components/accessories/Options_post";
import Comments from "../../components/accessories/Comments";
import Modal_warning from "../../components/accessories/Modal_warning";
import Modal_Edit_Post from "../../components/accessories/Modal_edit_post";
import Navbar from "../../components/Navbar";

/* Menu principal */
export default function Main() {
  const [userId, setUserId] = useState();
  const [post, setPost] = useState();
  const [tittle, setTittle] = useState();
  const [postNotice, setPostNotice] = useState();
  const [postError, setPostError] = useState();
  const [modalWarningOpen, setModalWarningOpen] = useState(false);
  const [listPost, setListPost] = useState();
  const [editPost, setEditPost] = useState(false);
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const [icon, setIcon] = useState();
  var postId;
  var postTittle;
  var postContent;
  var user_name;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    var resultMe1 = window.FakerApi.get("/me", {})
      .then((result) => {
        setUserId(result.data.id);
      })
      .catch((response) => response);
    var resultListaPosts = window.FakerApi.get("/posts", {})
      .then((result) => {
        /* Ordena as publicações pela data de criação */
        console.log(result.data);
        setListPost(
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
    <>
      <Navbar />
      {/* <Header /> */}

      <div className="container">
        <div className="main-container">
          <div className="content-container">
            <div className="feed-title-container">
              <span className="feed-title2">Publicações</span>
            </div>
            {listPost &&
              listPost.length > 0 &&
              listPost.map((dados, index) => {
                postId = dados.id;
                postTittle = dados.title;
                postContent = dados.content;
                return (
                  <>
                    <div key={index} className="feed-container">
                      <div className="name-container">
                        <span className="user-name">{dados.name}</span>
                        {userId === dados.user_id ? (
                          <Options_Post
                            postId={dados.id}
                            setEditPost={setEditPost}
                          />
                        ) : (
                          <div className="square"></div>
                        )}
                      </div>
                      <div className="text-container">
                        <span className="feed-tittle">{dados.title}</span>
                        <span className="feed-content">{dados.content}</span>
                      </div>

                      <div className="line "></div>
                      <Comments postId={dados.id} />
                    </div>
                  </>
                );
              })}
          </div>
        </div>

        {modalWarningOpen && (
          <Modal_warning
            setOpenModal={setModalWarningOpen}
            title={title}
            message={message}
            icon={icon}
          />
        )}
        {editPost && (
          <Modal_Edit_Post
            setEditPost={setEditPost}
            postId={postId}
            postTittle={postTittle}
            postContent={postContent}
          />
        )}
      </div>
    </>
  );
}
