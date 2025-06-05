import { useEffect, useState } from "react";

export default function Painel() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
  fetch("http://localhost:5215/api/agendamentos")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar agendamentos");
      return response.json();
    })
    .then(data => {
      console.log("🚀 Agendamentos recebidos:", data); // 👈 aqui
      setAgendamentos(data);
    })
    .catch(error => setErro(error.message));
}, []);

    const excluirAgendamento = async (id) => {
  if (!window.confirm("Tem certeza que deseja excluir este agendamento?")) return;

  try {
    await fetch(`http://localhost:5215/api/agendamentos/${id}`, {
      method: "DELETE"
    });
    alert("Agendamento excluído com sucesso!");
    // Atualiza a lista
    setAgendamentos(agendamentos.filter(a => a.id !== id));
  } catch (error) {
    alert("Erro ao excluir.");
    console.error(error);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Agendamentos Recebidos</h1>

      {erro && <p className="text-red-500">{erro}</p>}

      {agendamentos.length === 0 ? (
        <p>Nenhum agendamento ainda.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Procedimento</th>
              <th className="p-2">Data</th>
              <th className="p-2">Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((ag, index) => (
                <tr key={index} className="border-t">
                <td className="p-2">{ag.nome}</td>
                <td className="p-2">{ag.servico}</td>
                <td className="p-2">
                    {new Date(`${ag.data}T${ag.horario}`).toLocaleString("pt-BR")}
                </td>
                <td className="p-2">{ag.pagamento}</td>
                <td className="p-2 text-right">
                    <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
                    onClick={() => excluirAgendamento(ag.id)}
                    >
                    Excluir
                    </button>
                    <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    onClick={() => editarAgendamento(ag)}
                    >
                    Editar
                    </button>
                </td>
                </tr>
            ))}
            </tbody>


        </table>
      )}
    </div>
  );
}
