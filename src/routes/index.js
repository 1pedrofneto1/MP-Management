import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import NewProject from "../components/pages/NewProject";
import Projects from "../components/pages/Projects";
import Project from "../components/pages/Project";

const MainRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/novoprojeto" element={<NewProject />} />
      <Route path="/projetos" element={<Projects />} />
      <Route path="/projeto/:id" element={<Project />} />
    </Routes>
  );
};

export default MainRoutes;
