import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import Modal_warning from "../../components/accessories/Modal_warning";
import FakerApi from "../../services/api/fakerApi";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [modalWarningOpen, setModalWarningOpen] = useState(false);
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const [icon, setIcon] = useState();

  const toggleLogin = () => {
    var resultLogin = window.FakerApi.post("/login", {
      username: email,
      password: password,
    })
      .then((result) => {
        if (result) {
          navigate("/main");
        }
      })
      .catch((response) => {
        setModalWarningOpen(true);
        setTitle("Atenção!");
        setMessage(
          "Email e /ou senha incorretos, verifique as suas credenciais e tente novamente!"
        );
      });
  };

  return (
    <div class="main-login">
      <div class="direita-login">
        <div class="card-login">
          <div class="campo-texto">
            <label for="usuario">E-mail</label>
            <input
              type="email"
              placeholder="Email"
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="campo-texto">
            <label for="senha">Senha</label>
            <input
              type={passwordIcon ? "text" : "password"}
              placeholder="Senha"
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn-login"
            type="button"
            onClick={() => {
              toggleLogin();
            }}
          >
            Entrar
          </button>
          <div className="btn-new-account-container">
            <a
              className="btn-new-account"
              onClick={() => {
                navigate("/register");
              }}
            >
              Não tem uma conta? Registre-se
            </a>
          </div>
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
    </div>
  );
}
