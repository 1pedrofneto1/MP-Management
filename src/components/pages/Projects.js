import Message from "../layout/Message";
import styles from "./Projects.module.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../projects/ProjectCard";
import Loading from "../layout/Loading";
import { formatCurrency } from "../../utils";

const Projects = () => {
  const [message, setMessage] = useState(false);
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  let { state } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 1000);
    if (state?.message) {
      setMessage(true);
      const timer = setTimeout(() => setMessage(false), 3000);
      window.history.replaceState({}, document.title);
      return clearTimeout(() => timer);
    }
  }, [state?.message]);

  const removeProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("Projeto excluido com sucesso!");
        const timer2 = setTimeout(() => setProjectMessage(""), 3000);
        return clearTimeout(() => timer2);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Projetos</h1>
        <LinkButton to="/novoprojeto" text="Criar novo projeto" />
      </div>
      {message && <Message type="success" text={state.message} />}
      {projectMessage && <Message type="error" text={projectMessage} />}
      <div className={styles.projectContent}>
        {projects.length >= 1 &&
          projects.map((project) => (
            <ProjectCard
              name={project.name}
              budget={formatCurrency(project.budget)}
              id={project.id}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
