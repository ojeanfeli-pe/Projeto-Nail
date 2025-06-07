import { useEffect, useState } from "react";

export default function Painel() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState("");
  const [formEdicao, setFormEdicao] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5215/api/agendamentos")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar agendamentos");
        return response.json();
      })
      .then(data => setAgendamentos(data))
      .catch(error => setErro(error.message));
  }, []);

  const excluirAgendamento = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este agendamento?")) return;

    try {
      await fetch(`http://localhost:5215/api/agendamentos/${id}`, {
        method: "DELETE"
      });
      alert("Agendamento excluído com sucesso!");
      setAgendamentos(agendamentos.filter(a => a.id !== id));
    } catch (error) {
      alert("Erro ao excluir.");
      console.error(error);
    }
  };

  const carregarParaEdicao = (ag) => {
    setFormEdicao({ ...ag }); // Clona para edição
  };

  const handleChangeEdicao = (e) => {
    const { name, value } = e.target;
    setFormEdicao({ ...formEdicao, [name]: value });
  };

  const salvarEdicao = async () => {
    try {
      const response = await fetch(`http://localhost:5215/api/agendamentos/${formEdicao.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEdicao)
      });

      if (response.ok) {
        alert("Agendamento atualizado!");
        // Atualiza localmente
        setAgendamentos(agendamentos.map(a => a.id === formEdicao.id ? formEdicao : a));
        setFormEdicao(null);
      } else {
        alert("Erro ao atualizar.");
      }
    } catch (error) {
      console.error("Erro na edição:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Agendamentos Recebidos</h1>
      {erro && <p className="text-red-500">{erro}</p>}

      {agendamentos.length === 0 ? (
        <p>Nenhum agendamento ainda.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Procedimento</th>
              <th className="p-2">Data</th>
              <th className="p-2">Pagamento</th>
              <th className="p-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((ag) => (
              <tr key={ag.id} className="border-t">
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
                    onClick={() => carregarParaEdicao(ag)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {formEdicao && (
        <div className="bg-white shadow-md p-4 rounded-lg max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">✏️ Editar Agendamento</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="nome"
              value={formEdicao.nome}
              onChange={handleChangeEdicao}
              placeholder="Nome"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="servico"
              value={formEdicao.servico}
              onChange={handleChangeEdicao}
              placeholder="Procedimento"
              className="p-2 border rounded"
            />
            <input
              type="date"
              name="data"
              value={formEdicao.data}
              onChange={handleChangeEdicao}
              className="p-2 border rounded"
            />
            <input
              type="time"
              name="horario"
              value={formEdicao.horario}
              onChange={handleChangeEdicao}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="pagamento"
              value={formEdicao.pagamento}
              onChange={handleChangeEdicao}
              placeholder="Pagamento"
              className="p-2 border rounded"
            />
          </div>
          <div className="mt-4 text-right">
            <button
              onClick={() => setFormEdicao(null)}
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={salvarEdicao}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
