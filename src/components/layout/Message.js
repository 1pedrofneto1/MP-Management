import styles from "./Message.module.css";

const Message = ({ type, text }) => {
  return <div className={`${styles.message} ${styles[type]}`}>{text}</div>;
};

export default Message;
