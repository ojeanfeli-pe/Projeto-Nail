namespace NailTime.Api.Models
{
    public class Anamnese
    {
        public int Id { get; set; }
        public string CPF { get; set; } // Formato: "000.000.000-00"
        public string NomeCliente { get; set; }
        public string Email { get; set; }
        public string DataNascimento { get; set; } // Formato: "dd/MM/yyyy
        public string Telefone { get; set; }
        public string ProblemasUnha { get; set; } // Exemplo: "Micose", "Unha fraca"
        public string Alergias { get; set; }
        public string Observacoes { get; set; }
        public DateTime DataPreenchimento { get; set; }
    }
}
