import { useState } from "react";

function Agendamento() {
  const [form, setForm] = useState({
    servico: "",
    data: "",
    horario: "",
    nome: "",
    telefone: "",
    pagamento: "",
  });

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
    "Content-Type": "application/json"
  },
  body: JSON.stringify(form)
});

    if (response.ok) {
      alert("Agendamento enviado com sucesso! ✅");
      setForm({
        servico: "",
        data: "",
        horario: "",
        nome: "",
        telefone: "",
        pagamento: "",
      });
    } else {
      alert("Erro ao enviar o agendamento.");
    }
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    alert("Erro na conexão com o servidor.");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Agende seu horário 💅</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Procedimento */}
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

          {/* Data */}
          <div>
            <label className="block font-medium">Data:</label>
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Horário */}
          <div>
            <label className="block font-medium">Horário:</label>
            <input
              type="time"
              name="horario"
              value={form.horario}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Nome */}
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

          {/* Telefone */}
          <div>
            <label className="block font-medium">Telefone (WhatsApp):</label>
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Pagamento */}
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
