import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agendamento from "./pages/Agendamento";
import Home from "./pages/Home";
import SelecionarServico from "./pages/SelecionarServico";
import Painel from "./pages/Painel";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Agendamento />} />
        <Route path="/agendar" element={<SelecionarServico />} />
        <Route path="/painel" element={<Painel />} />
      </Routes>
    </Router>
  );
}

export default App;


