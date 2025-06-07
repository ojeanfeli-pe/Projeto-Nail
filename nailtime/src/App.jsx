import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SelecionarServico from "./pages/SelecionarServico";
import EscolherHorario from "./pages/EscolherHorario";
import FormularioFinal from "./pages/FormularioFinal";
import Painel from "./pages/Painel";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial com botão "Agendar horário" */}
        <Route path="/" element={<Home />} />

        {/* Etapas do agendamento */}
        <Route path="/agendar" element={<SelecionarServico />} />
        <Route path="/escolher-horario" element={<EscolherHorario />} />
        <Route path="/agendamento" element={<FormularioFinal />} />

        {/* Painel da nail designer */}
        <Route path="/painel" element={<Painel />} />
      </Routes>
    </Router>
  );
}

export default App;
