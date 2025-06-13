import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EscolherHorario() {
  const location = useLocation();
  const navigate = useNavigate();
  const { servico, adicionais = [] } = location.state || {};
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horariosPreenchidos, setHorariosPreenchidos] = useState([]);

  useEffect(() => {
    if (!servico) {
      navigate("/");
    }
  }, [servico, navigate]);

  useEffect(() => {
    if (dataSelecionada) {
      fetch(`http://localhost:5215/api/agendamentos?data=${dataSelecionada}`)
        .then(res => res.json())
        .then(data => {
          const horariosAgendados = data
            .filter(a => a.servico === servico.nome)
            .map(a => a.horario);
          setHorariosPreenchidos(horariosAgendados);
        });
    }
  }, [dataSelecionada, servico]);

  const horariosDoDia = [
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00"
  ];

  useEffect(() => {
    const disponiveis = horariosDoDia.filter(h => !horariosPreenchidos.includes(h));
    setHorariosDisponiveis(disponiveis);
  }, [horariosPreenchidos]);

  // Calcular valor total (serviço principal + adicionais)
  const valorTotal = (
    Number(servico.preco || 0) +
    adicionais.reduce((acc, item) => acc + Number(item.preco || 0), 0)
  ).toFixed(2);

  return (
    <div className="p-6 bg-white min-h-screen">
      
      {/* Botão Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-pink-100 text-pink-700 rounded hover:bg-pink-200 transition"
      >
        ← Voltar
      </button>

      <h2 className="text-2xl font-bold mb-4 text-pink-600">Escolher Horário</h2>

      {/* Resumo do Procedimento */}
      <div className="mb-6 p-4 bg-white border border-pink-300 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-pink-700">Resumo do Procedimento</h3>

        <p><strong>Nome:</strong> {servico?.nome}</p>
        {servico?.duracao && <p><strong>Duração:</strong> {servico.duracao}</p>}
        {servico?.preco && <p><strong>Valor:</strong> R$ {servico.preco}</p>}

        {adicionais.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold text-gray-700">Adicionais:</p>
            <ul className="list-disc list-inside text-gray-600">
              {adicionais.map((item, index) => (
                <li key={index}>
                  {item.nome} — R$ {item.preco}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-4 text-pink-600 font-semibold text-lg">
          <strong>Valor total:</strong> R$ {valorTotal}
        </p>
      </div>

      {/* Calendário */}
      <label className="block mb-2 font-medium text-gray-800">Escolha a data:</label>
      <input
        type="date"
        className="border px-4 py-2 rounded mb-6"
        value={dataSelecionada}
        onChange={(e) => setDataSelecionada(e.target.value)}
      />

      {/* Horários */}
      <div className="grid grid-cols-2 gap-3">
        {horariosDisponiveis.length === 0 && dataSelecionada && (
          <p className="text-gray-500 col-span-2">Nenhum horário disponível</p>
        )}
        {horariosDisponiveis.map((hora, index) => (
          <button
            key={index}
            className="border border-pink-300 rounded px-4 py-2 text-pink-700 hover:bg-pink-100 transition"
            onClick={() =>
              navigate("/agendamento", {
                state: {
                  servico,
                  adicionais,
                  data: dataSelecionada,
                  horario: hora
                }
              })
            }
          >
            {hora}
          </button>
        ))}
      </div>
    </div>
  );
}
