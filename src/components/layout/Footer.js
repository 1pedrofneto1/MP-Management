import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li>
          <Link
            to="https://wa.me/+5584996154117?text=Olá! Vim pelo MP Management"
            target="_blank"
          >
            <RiWhatsappFill />
          </Link>
        </li>
        <li>
          <Link
            to="https://www.linkedin.com/in/pedro-fernandes-de-oliveira-neto-3569a2222"
            target="_blank"
          >
            <AiFillLinkedin />
          </Link>
        </li>
        <li>
          <Link to="https://www.instagram.com/_pedrofneto_/" target="_blank">
            <AiFillInstagram />
          </Link>
        </li>
        <li>
          <Link to="https://www.facebook.com/pedronetocn/" target="_blank">
            <AiFillFacebook />
          </Link>
        </li>
        <li>
          <Link to="mailto:pedrofernandescn@gmail.com" target="_blank">
            <MdAttachEmail />
          </Link>
        </li>
      </ul>
      <p className={styles.p}>
        <span className={styles.span}>MP Management</span> &copy; 2023
      </p>
    </footer>
  );
};

export default Footer;
