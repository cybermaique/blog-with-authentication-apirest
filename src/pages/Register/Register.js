import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/pages/Register.css";
import Error_Icon from "../../assets/images/accessories/modal/error-icon.png";
import Success_Icon from "../../assets/images/accessories/modal/success-icon.png";
import Modal_error from "../../components/accessories/Modal_error";
import Modal_warning from "../../components/accessories/Modal_warning";
import Modal_success from "../../components/accessories/Modal_success";
import FakerApi from "../../services/api/fakerApi";

export default function Register() {
  let navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [modalErrorOpen, setModalErrorOpen] = useState(false);
  const [modalWarningOpen, setModalWarningOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (name) {
      if (
        !name.match(
          /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
        )
      ) {
        setNameError("O campo Nome deve conter nome e sobrenome");
      } else {
        setNameError();
      }
    }
  }, [name]);

  useEffect(() => {
    if (email) {
      if (
        !email.match(`^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`)
      ) {
        setEmailError("Email inválido");
      } else {
        setEmailError();
      }
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      if (!password.match(/\w*[a-z]\w*/)) {
        setPasswordError(
          "O campo Password deve conter ao menos uma letra minuscula"
        );
      } else if (!password.match(/\w*[A-Z]\w*/)) {
        setPasswordError(
          "O campo Password deve conter ao menos uma letra maiuscula"
        );
      } else if (!password.match(/\d/)) {
        setPasswordError("O campo Password deve conter ao menos um número");
      } else if (!password.match(/[!@#$%^&*()\-_"=+{}; :,<.>]/)) {
        setPasswordError("O campo Password deve conter um caracter especial");
      } else if (!password.length >= 8) {
        setPasswordError(`O campo Password deve conter ao mínimo 8 caracteres`);
      } else {
        setPasswordError();
      }
    }
  }, [password]);

  useEffect(() => {
    if (password) {
      if (confirmPassword != password) {
        setConfirmPasswordError("As senhas devem coincidir");
      } else {
        setConfirmPasswordError();
      }
    }
  }, [confirmPassword]);

  const toggleRegister = () => {
    if (nameError) {
      setModalErrorOpen(true);
      setTitle("Erro!");
      setMessage(nameError);
      setIcon(Error_Icon);
    } else if (emailError) {
      setModalErrorOpen(true);
      setTitle("Erro!");
      setMessage(emailError);
      setIcon(Error_Icon);
    } else if (passwordError) {
      setModalErrorOpen(true);
      setTitle("Erro!");
      setMessage(passwordError);
      setIcon(Error_Icon);
    } else if (confirmPasswordError) {
      setModalErrorOpen(true);
      setTitle("Erro!");
      setMessage(confirmPasswordError);
      setIcon(Error_Icon);
    } else {
      var resultRegister = window.FakerApi.post("/register", {
        name: name,
        username: email,
        password: password,
      })
        .then((result) => {
          if (result) {
            setModalSuccessOpen(true);
            setTitle("Sucesso!");
            setMessage("Conta criada com sucesso!");
            setIcon(Success_Icon);
            setTimeout(() => {
              navigate("/");
              setTitle();
              setMessage();
              setIcon();
              setModalSuccessOpen(false);
            }, 1500);
          }
        })
        .catch((response) => {
          setModalWarningOpen(true);
          setTitle("Atenção!");
          setMessage("Preencha às informações corretamente para prosseguir.");
        });
    }
  };

  return (
    <div className="container-register">
      <div className="container-menu-register">
        <div className="tittle-container-register"></div>
        <div className="welcome-container-register">
          <label className="input-welcome-register">
            <h2>Criar uma nova conta</h2>
          </label>
          <label className="input-welcome-register">
            <h4>É rápido e fácil.</h4>
          </label>
        </div>

        <div className="field-container-register">
          <label className="input-tittle-register ">Nome</label>
          <input
            type="text"
            className="input-default form-control-register"
            placeholder="Nome"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <div
            id="val-password-error"
            className="invalid-feedback-register  animated fadeInUp"
            style={{ display: "block" }}
          >
            {nameError}
          </div>
        </div>

        <div className="field-container-register">
          <label className="input-tittle-register">Email</label>
          <input
            type="email"
            className="input-default form-control-register"
            placeholder="Email"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            id="val-password-error"
            className="invalid-feedback-register  animated fadeInUp"
            style={{ display: "block" }}
          >
            {emailError}
          </div>
        </div>

        <div className="field-container-register">
          <label className="input-tittle-register ">Senha</label>
          <div className="password-field-container-register">
            <input
              type={"password"}
              className="input-password form-control-register"
              placeholder="Senha"
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            id="val-password-error"
            className="invalid-feedback-register  animated fadeInUp"
            style={{ display: "block" }}
          >
            {passwordError}
          </div>
        </div>

        <div className="field-container-register">
          <label className="input-tittle-register">Confirmar senha</label>
          <div className="password-field-container-register">
            <input
              type={"password"}
              className="input-password form-control-register"
              placeholder="Senha"
              name="ConfirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div
            id="val-password-error"
            className="invalid-feedback-register  animated fadeInUp"
            style={{ display: "block" }}
          >
            {confirmPasswordError}
          </div>
        </div>

        <div className="btn-container-register">
          <button
            type="button"
            className="btn-register"
            onClick={() => toggleRegister()}
          >
            Criar conta
          </button>
          <button
            type="button"
            className="btn-return"
            onClick={() => {
              navigate("/");
            }}
          >
            Entrar
          </button>
        </div>

        {modalErrorOpen && (
          <Modal_error
            setOpenModal={setModalErrorOpen}
            title={title}
            message={message}
            icon={icon}
          />
        )}
        {modalWarningOpen && (
          <Modal_warning
            setOpenModal={setModalWarningOpen}
            title={title}
            message={message}
            icon={icon}
          />
        )}
        {modalSuccessOpen && (
          <Modal_success
            setOpenModal={setModalSuccessOpen}
            title={title}
            message={message}
            icon={icon}
          />
        )}
      </div>
    </div>
  );
}
