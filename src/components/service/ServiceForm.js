import styles from "../projects/ProjectForm.module.css";
import SubmitButton from "../form/SubmitButton";
import Input from "../form/Input";
import { useState } from "react";
import { formatValue } from "../../utils";

const ServiceForm = ({ handleSubmit, btnText, projectData }) => {
  const [service, setService] = useState({});
  const submit = (e) => {
    e.preventDefault();
    service.cost = formatValue(service.cost);
    projectData.services.push(service);
    handleSubmit(projectData);
  };
  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handlerOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor total"
        handlerOnChange={handleChange}
        isCurrency={true}
      />
      <Input
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handlerOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  );
};

export default ServiceForm;
