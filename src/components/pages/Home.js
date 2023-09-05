import styles from "./Home.module.css";
import savings from "../../img/savings.svg";
import LinkButton from "../layout/LinkButton";

const Home = () => {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span>MP Management</span>
      </h1>
      <p>Comece a gerenciar seus projetos agora mesmo!</p>
      <LinkButton to="novoprojeto" text={"Criar novo projeto"} />
      <img src={savings} alt="MP Management" />
    </section>
  );
};

export default Home;
