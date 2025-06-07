import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const todosServicos = [
  { nome: "Design de sobrancelhas com tintura", preco: 65 },
  { nome: "Depilação buço com fio ou cera", preco: 20 },
  { nome: "Micropigmentação de sobrancelhas", preco: 450 },
  { nome: "Limpeza de pele", preco: 170 },
  { nome: "Brow Lamination", preco: 120 },
  { nome: "Depilação costas", preco: 40 },
  { nome: "Escova Progressiva", preco: "a partir de R$200" },
];

export default function AdicionarServicos() {
  const navigate = useNavigate();
  const location = useLocation();
  const servicoPrincipal = location.state?.servico;

  const [adicionais, setAdicionais] = useState([]);

  // Remove o principal da lista de adicionais
  const servicosOpcionais = todosServicos.filter(
    (s) => s.nome !== servicoPrincipal?.nome
  );

  const toggleAdicional = (nome) => {
    setAdicionais((prev) =>
      prev.includes(nome)
        ? prev.filter((item) => item !== nome)
        : [...prev, nome]
    );
  };

  const irParaEscolherHorario = () => {
    navigate("/escolher-horario", {
      state: {
        servico: servicoPrincipal,
        adicionais,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-orange-600">
          Se desejar, selecione outros serviços
        </h2>
        <button
          onClick={() => navigate("/agendar")}
          className="text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>

      <p className="text-sm text-center text-gray-500 mb-1">Você já escolheu:</p>
      <div className="bg-green-100 text-center font-semibold py-2 rounded mb-4">
        {servicoPrincipal?.nome}
      </div>

      <p className="text-sm text-gray-600 mb-2">
        Se desejar, selecione outros serviços. Caso contrário, pule para a próxima etapa.
      </p>

      <div className="space-y-2">
        {servicosOpcionais.map((s, index) => (
          <label
            key={index}
            className="flex items-center border p-3 rounded cursor-pointer hover:shadow"
          >
            <input
              type="checkbox"
              className="mr-3"
              checked={adicionais.includes(s.nome)}
              onChange={() => toggleAdicional(s.nome)}
            />
            <span className="flex-1">{s.nome}</span>
            <span className="text-orange-600 font-semibold">
              {typeof s.preco === "string" ? s.preco : `R$${s.preco}`}
            </span>
          </label>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => navigate("/agendar")}
          className="text-sm text-gray-600 flex items-center"
        >
          ← Voltar
        </button>

        <button
          onClick={irParaEscolherHorario}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Próxima Etapa →
        </button>
      </div>
    </div>
  );
}
