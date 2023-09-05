import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import ProjetcForm from "../projects/ProjectForm";
import { BsPencil } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import { v4 as uuidv4 } from "uuid";
import ServiceCard from "../service/ServiceCard";
import { formatCurrency, formatValue } from "../../utils";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjetcForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setShowProjectForm(false);
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, [id]);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjetcForm);
  };

  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm);
  };

  const editPost = (project) => {
    project.budget = formatValue(project.budget);
    if (project.cost > project.budget) {
      setMessage(
        "Falha na atualização do projeto, valor disponível menor que o total utilizado!"
      );
      setType("error");
      const timer = setTimeout(() => {
        setMessage("");
        setType("");
      }, 2000);
      return clearTimeout(() => timer);
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto atualizado com sucesso!");
        setType("success");
        const timer = setTimeout(() => {
          setMessage("");
          setType("");
        }, 2000);
        return clearTimeout(() => timer);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Falha na atualização do projeto!");
        setType("error");
        const timer = setTimeout(() => {
          setMessage("");
          setType("");
        }, 2000);
        return clearTimeout(() => timer);
      });
  };

  const createService = (project) => {
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();
    const lastServiceCost = lastService.cost;
    const newCost = Number(project.cost) + Number(lastServiceCost);
    if (newCost > Number(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço!");
      setType("error");
      const timer = setTimeout(() => {
        setMessage("");
        setType("");
      }, 2000);
      project.services.pop();
      return clearTimeout(() => timer);
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowServiceForm(false);
        setMessage("Serviço adicionado com sucesso!");
        setType("success");
        const timer = setTimeout(() => {
          setMessage("");
          setType("");
        }, 2000);
        return clearTimeout(() => timer);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Falha na adição do serviço!");
        setType("error");
        const timer = setTimeout(() => {
          setMessage("");
          setType("");
        }, 2000);
        return clearTimeout(() => timer);
      });
  };

  const deleteService = (cost, id) => {
    const selectService = services.filter((service) => service.id === id);
    services.splice(services.indexOf(selectService[0]), 1);
    project.cost = project.cost - selectService[0].cost;
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setMessage("Serviço excluído com sucesso!");
        setType("success");
        const timer = setTimeout(() => {
          setMessage("");
          setType("");
        }, 2000);
        return clearTimeout(() => timer);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Falha na exclusão do serviço!");
        setType("error");
        const timer = setTimeout(() => {
          setMessage("");
          setType("");
        }, 2000);
        return clearTimeout(() => timer);
      });
  };

  return (
    <>
      {project.name ? (
        <div className={styles.container}>
          {message && <Message type={type} text={message} />}
          {showProjetcForm ? (
            <div className={styles.projectInfo}>
              <div>
                <h1>Projeto: {project.name}</h1>
                <ProjetcForm
                  btnText={"Confirmar edição"}
                  projectData={project}
                  handleSubmit={editPost}
                />
              </div>
              <button onClick={toggleProjectForm} className={styles.btn}>
                <AiOutlineCloseCircle />
                Fechar edição
              </button>
            </div>
          ) : (
            <div className={styles.projectInfo}>
              <div>
                <h1>Projeto: {project.name}</h1>
                <p>
                  <span>Categoria:</span> {project.category.name}
                </p>
                <p>
                  <span>Orçamento total:</span> {}
                  {formatCurrency(project.budget)}
                </p>
                <p>
                  <span>Orçamento utilizado:</span> {}
                  {formatCurrency(project.cost)}
                </p>
              </div>
              <button onClick={toggleProjectForm} className={styles.btn}>
                <BsPencil />
                Editar projeto
              </button>
            </div>
          )}
          <div className={styles.serviceForm}>
            {showServiceForm ? (
              <div className={styles.serviceContainer}>
                <div className={styles.serviceTitle}>
                  <h2>Adicione um serviço:</h2>
                  <button onClick={toggleServiceForm} className={styles.btn}>
                    <AiOutlineCloseCircle />
                    Fechar
                  </button>
                </div>
                <div>
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar serviço"
                    projectData={project}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.serviceTitle}>
                <h2>Adicione um serviço:</h2>
                <button onClick={toggleServiceForm} className={styles.btn}>
                  <IoIosAddCircleOutline />
                  Adicionar serviço
                </button>
              </div>
            )}
          </div>
          <div className={styles.serviceInfo}>
            <h2>Serviços:</h2>
            <div className={styles.serviceDetails}>
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    id={service.id}
                    key={services.indexOf(service) + 1}
                    handleRemove={deleteService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados!</p>}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Project;
