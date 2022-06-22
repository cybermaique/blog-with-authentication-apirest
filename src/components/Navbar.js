import { Navigate, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const toggleLogout = () => {
    var resultLogout = window.FakerApi.post("/logout", {})
      .then((result) => {
        console.log(result);
      })
      .catch((response) => response);
    Navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        My <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/main"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/novapublicacao"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Nova Publicacão
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => toggleLogout()}
          >
            Sair
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
