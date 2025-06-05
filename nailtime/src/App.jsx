import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agendamento from "./pages/Agendamento";
import Painel from "./pages/Painel";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Agendamento />} />
        <Route path="/painel" element={<Painel />} />
      </Routes>
    </Router>
  );
}

export default App;


