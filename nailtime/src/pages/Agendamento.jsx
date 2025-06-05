function Agendamento() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Agende seu horário 💅</h2>

        <form className="space-y-4">
          {/* Seleção de serviços */}
          <div>
            <label className="block font-medium">Procedimento:</label>
            <select className="w-full p-2 border rounded">
              <option>Unha em gel</option>
              <option>Manicure e Pedicure</option>
              <option>Spa dos Pés</option>
            </select>
          </div>

          {/* Data e hora */}
          <div>
            <label className="block font-medium">Data:</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block font-medium">Horário:</label>
            <input type="time" className="w-full p-2 border rounded" />
          </div>

          {/* Dados pessoais */}
          <div>
            <label className="block font-medium">Seu nome:</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block font-medium">Telefone (WhatsApp):</label>
            <input type="tel" className="w-full p-2 border rounded" />
          </div>

          {/* Forma de pagamento */}
          <div>
            <label className="block font-medium">Forma de pagamento:</label>
            <select className="w-full p-2 border rounded">
              <option>Dinheiro</option>
              <option>Cartão</option>
              <option>Pix</option>
            </select>
          </div>

          <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}

export default Agendamento;
