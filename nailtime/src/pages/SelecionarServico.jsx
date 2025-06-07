import { useNavigate } from "react-router-dom";

const servicos = [
  { nome: "Design", duracao: "-", preco: 30 },
  { nome: "Henna", duracao: "-", preco: 50 },
  { nome: "Cílios", duracao: "-", preco: 100 },
  { nome: "Alongamento de fibra", duracao: "—", preco: 200 },
  { nome: "Banho em gel", duracao: "—", preco: 80 },
  { nome: "Esmaltação em gel", duracao: "—", preco: 80 },
  { nome: "Esmaltação em gel (pé)", duracao: "—", preco: 80 },
  { nome: "Esmaltação simples", duracao: "—", preco: 80 },
  { nome: "Pedicure simples", duracao: "—", preco: 35 },
  { nome: "Remoção de alongamento", duracao: "—", preco: 30 },
  { nome: "Remoção de esmalte gel", duracao: "—", preco: 15 },
  { nome: "Reposição de unha", duracao: "-", preco: 15 },
];

export default function SelecionarServico() {
  const navigate = useNavigate();

  const selecionar = (servico) => {
    navigate("/adicionar-servicos", { state: { servico } });
  };
  
  return (
    <div className="bg-white min-h-screen p-4">
      {/* Cabeçalho com botão de sair */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-pink-600">Selecionar um serviço</h2>
        <button
          className="text-gray-600 text-xl"
          onClick={() => navigate("/")}
        >
          ✕
        </button>
      </div>

      {/* Lista de serviços */}
      <div className="space-y-4">
        {servicos.map((servico, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => selecionar(servico)} // <- clique aqui chama a função
          >
            <div>
              <h3 className="font-medium text-gray-800">{servico.nome}</h3>
              {servico.duracao && <p className="text-sm text-gray-500">({servico.duracao})</p>}
            </div>
            <span className="text-pink-600 font-bold">
              {typeof servico.preco === "string" ? servico.preco : `R$${servico.preco}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
