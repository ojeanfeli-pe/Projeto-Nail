import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-4">
      {/* Logo */}
      <img src={logo} alt="Logo da Nail Designer" className="w-40 h-40 mb-4" />

      {/* Título */}
      <h1 className="text-3xl font-bold text-pink-600 mb-2">AGENDAMENTO ONLINE</h1>

      {/* Parágrafo */}
      <p className="text-center text-gray-700 mb-6">
        Escolha dia e horário que deseja. Clique no botão abaixo
      </p>

      {/* Botão com Link */}
      <Link
        to="/agendar"
        className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600 transition"
      >
        AGENDAR HORÁRIO
      </Link>
    </div>
  );
}
