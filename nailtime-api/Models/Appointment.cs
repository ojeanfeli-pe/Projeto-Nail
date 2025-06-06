namespace NailTime.Api.Models;

public class Appointment
{
    public int Id { get; set; }
    public string Servico { get; set; }
    public string Data { get; set; }
    public string Horario { get; set; }
    public string Nome { get; set; }
    public string Telefone { get; set; }
    public string Pagamento { get; set; }
}
