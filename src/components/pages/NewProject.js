import styles from "./NewProject.module.css";
import ProjectForm from "../projects/ProjectForm";
import { useNavigate } from "react-router-dom";
import { formatValue } from "../../utils";

const NewProject = () => {
  const navigate = useNavigate();
  const createPost = (project) => {
    project.cost = 0;
    project.services = [];
    project.budget = formatValue(project.budget);
    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/projetos", {
          state: { message: "Projeto criado com sucesso!" },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.new_project_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar aos serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
    </div>
  );
};

export default NewProject;
