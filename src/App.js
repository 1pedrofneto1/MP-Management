import Container from "./components/layout/Container";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Container />
      <Footer />
    </Router>
  );
}

export default App;
