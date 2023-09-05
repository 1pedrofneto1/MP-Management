import styles from "./Loading.module.css";
import loading from "../../img/loading.svg";

const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
      <img src={loading} alt="Loading" className={styles.loader} />
    </div>
  );
};

export default Loading;
