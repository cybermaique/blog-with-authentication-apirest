import React, { useState, useEffect } from "react";
import moment from "moment";
import "../../css/pages/Main.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function NovaPublicacao() {
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
  let navigate = useNavigate();

  useEffect(() => {
    if (post) {
      if (post.length > 0 && post.length < 2000) {
        var characters = 2000 - post.length;
        setPostNotice("Restam " + characters + " caracteres!");
      } else {
        setPostNotice();
      }
    } else {
      setPostNotice();
    }
  }, [post]);

  useEffect(() => {
    if (post) {
      if (post.length === 2000) {
        setPostError("Limite de caracteres atingido!");
      } else {
        setPostError();
      }
    } else {
      setPostError();
    }
  }, [post]);

  const newPost = () => {
    if (tittle && post) {
      var resultMe = window.FakerApi.get("/me", {})
        .then((result) => {
          user_name = result.data.name;
          var resultPost = window.FakerApi.post("/posts/create", {
            title: tittle,
            content: post,
            name: user_name,
            createDate: moment().format("DD/MM/YYYY HH:mm:ss.SSS"),
          })
            .then((result) => {
              if (result) {
                navigate("/main");
              }
            })
            .catch((response) => response);
        })
        .catch((response) => response);
    } else {
      if (!tittle) {
        setModalWarningOpen(true);
        setTitle("Atenção!");
        setMessage("O campo Título é obrigatório");
      } else if (!post) {
        setModalWarningOpen(true);
        setTitle("Atenção!");
        setMessage("O campo Conteúdo é obrigatório");
      }
    }
  };

  return (
    <div className="container2">
      <Navbar />
      <div className="post-container">
        <span className="post-title">Nova Publicação</span>
        <input
          type="text"
          className="form-control-tittle  input-default-tittle"
          placeholder="Título"
          maxLength={100}
          value={tittle}
          onChange={(e) => setTittle(e.target.value)}
        />
        <textarea
          className="form-control-post "
          placeholder="Escreva a sua mensagem"
          id="post-input"
          maxLength={2000}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        <div
          id="val-password-error"
          className="notice-feedback animated fadeInUp"
          style={{ display: "block" }}
        >
          {postNotice}
        </div>
        <div
          id="val-password-error"
          className="invalid-feedback animated fadeInUp"
          style={{ display: "block" }}
        >
          {postError}
        </div>
        <button
          type="button"
          className="btn-post"
          onClick={() => {
            newPost();
          }}
        >
          Publicar
        </button>
      </div>
    </div>
  );
}
