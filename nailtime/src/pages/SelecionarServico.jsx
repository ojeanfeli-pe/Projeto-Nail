import { useNavigate } from "react-router-dom";

const servicos = [
  { nome: "Design de sobrancelhas com tintura", duracao: "1h", preco: 65 },
  { nome: "Depilação buço com fio ou cera", duracao: "10min", preco: 20 },
  { nome: "Micropigmentação de sobrancelhas", duracao: "1h30min", preco: 450 },
  { nome: "Limpeza de pele", duracao: "—", preco: 170 },
  { nome: "Brow Lamination", duracao: "—", preco: 120 },
  { nome: "Depilação costas", duracao: "—", preco: 40 },
  { nome: "Escova Progressiva", duracao: "—", preco: "a partir de R$200" },
  { nome: "Design de sobrancelhas", duracao: "30min", preco: 38 },
];

export default function SelecionarServico() {
  const navigate = useNavigate();

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
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
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
