import { BsFillTrashFill } from "react-icons/bs";
import styles from "../projects/ProjectCard.module.css";
import { formatCurrency } from "../../utils/index.js"

const ServiceCard = ({ name, cost, description, handleRemove, id }) => {
  const removeService = (e) => {
    e.preventDefault();
    handleRemove(cost, id);
  };

  return (
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p>
        <span>Custo total:</span> {formatCurrency(cost)}
      </p>
      <p>{description}</p>
      <div className={styles.projectCardAction}>
        <button onClick={removeService}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
