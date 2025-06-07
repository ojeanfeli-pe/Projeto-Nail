import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

function Agendamento() {
  const [form, setForm] = useState({
    servico: "",
    data: null,
    horario: "",
    nome: "",
    telefone: "",
    pagamento: "",
  });

  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  function gerarHorariosPorDia(diaDaSemana) {
    const horarios = [];
    const horaFinal = diaDaSemana === 6 ? 12 : 16.5;

    for (let h = 8; h < horaFinal; h++) {
      horarios.push(`${String(h).padStart(2, "0")}:00`);
      horarios.push(`${String(h).padStart(2, "0")}:30`);
    }

    return horarios;
  }

  useEffect(() => {
    if (!form.data) return;

    const dia = new Date(form.data).getDay();
    const todosHorarios = gerarHorariosPorDia(dia);

    const buscarHorarios = async () => {
      try {
        const dataFormatada = form.data.toISOString().split("T")[0];
        const res = await fetch(`http://localhost:5215/api/agendamentos?data=${dataFormatada}`);
        const agendamentos = await res.json();
        const ocupados = agendamentos.map(a => a.horario);
        const disponiveis = todosHorarios.filter(h => !ocupados.includes(h));
        setHorariosDisponiveis(disponiveis);
      } catch (err) {
        console.error("Erro ao buscar horários:", err);
        setHorariosDisponiveis(todosHorarios);
      }
    };

    buscarHorarios();
  }, [form.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5215/api/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          data: form.data ? form.data.toISOString().split("T")[0] : ""
        })
      });

      if (response.ok) {
        alert("Agendamento enviado com sucesso! ✅");
        setForm({
          servico: "",
          data: null,
          horario: "",
          nome: "",
          telefone: "",
          pagamento: "",
        });
      } else {
        const msg = await response.text();
        alert("Erro ao agendar: " + msg);
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4 flex items-center justify-center">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Agende seu horário 💅</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Procedimento:</label>
            <select
              name="servico"
              value={form.servico}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecione</option>
              <option>Unha em gel</option>
              <option>Manicure e Pedicure</option>
              <option>Spa dos Pés</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Data:</label>
            <DatePicker
              selected={form.data}
              onChange={(date) => setForm({ ...form, data: date })}
              filterDate={(date) => {
                const dia = date.getDay();
                return dia >= 2 && dia <= 6;
              }}
              className="w-full p-2 border rounded"
              placeholderText="Selecione a data"
              locale="pt-BR"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div>
            <label className="block font-medium">Horário:</label>
            <select
              name="horario"
              value={form.horario}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={!form.data}
            >
              <option value="">Selecione o horário</option>
              {horariosDisponiveis.map((h, i) => (
                <option key={i} value={h}>{h}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Seu nome:</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Telefone (WhatsApp):</label>
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="(99) 99999-9999"
            />
          </div>

          <div>
            <label className="block font-medium">Forma de pagamento:</label>
            <select
              name="pagamento"
              value={form.pagamento}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecione</option>
              <option>Dinheiro</option>
              <option>Cartão</option>
              <option>Pix</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}

export default Agendamento;
