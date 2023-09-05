import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li>
          <Link to="/" className={styles.itens}>
            Página Inicial
          </Link>
        </li>
        <li>
          <Link to="/projetos" className={styles.itens}>
            Projetos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
