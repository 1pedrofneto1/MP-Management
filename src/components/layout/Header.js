import Navbar from "./Navbar";
import logo from "../../img/logo_mp_management.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={logo} alt="Logo do MP Management" />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
