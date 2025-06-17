import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

export default function FormularioFinal() {
  const location = useLocation();

  const [form, setForm] = useState({
    servico: "",
    data: null,
    horario: "",
    nome: "",
    telefone: "",
    pagamento: "",
  });

  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  useEffect(() => {
    if (location.state) {
      setForm((prev) => ({
        ...prev,
        servico: location.state.servico?.nome || "",
        data: location.state.data ? new Date(location.state.data) : null,
        horario: location.state.horario || "",
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5215/api/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          data: form.data ? form.data.toISOString().split("T")[0] : "",
        }),
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
          {/* Serviço */}
          <div>
            <label className="block font-medium">Procedimento:</label>
            <input
              type="text"
              name="servico"
              value={form.servico}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Data */}
          <div>
            <label className="block font-medium">Data:</label>
            <DatePicker
              selected={form.data}
              onChange={(date) => setForm({ ...form, data: date })}
              locale="pt-BR"
              dateFormat="dd/MM/yyyy"
              className="w-full p-2 border rounded"
              placeholderText="Selecione a data"
            />
          </div>

          {/* Horário */}
          <div>
            <label className="block font-medium">Horário:</label>
            <input
              type="text"
              name="horario"
              value={form.horario}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Nome */}
          <div>
            <label className="block font-medium">Seu nome:</label>
            <input
              type="text"
              name="nome"
              value={form.nome} required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block font-medium">Telefone (WhatsApp):</label>
            <input
              type="tel"
              name="telefone"
              value={form.telefone} required
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="(41) 99999-9999" 
            />
          </div>

          {/* Pagamento */}
          <div>
            <label className="block font-medium">Forma de pagamento:</label>
            <select
              name="pagamento"
              value={form.pagamento} required
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
