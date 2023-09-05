import styles from "./Container.module.css";
import MainRoutes from "../../routes";

const Container = () => {
  return (
    <div className={styles.container}>
      <MainRoutes />
    </div>
  );
};

export default Container;
