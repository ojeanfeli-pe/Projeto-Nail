using NailTime.Api.Data;
using Microsoft.EntityFrameworkCore;
using NailTime.Api.Models;
using NailTime.Api.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=agendamentos.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("AllowAll");
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();

// Endpoint para listar todos os agendamentos
app.MapGet("/api/agendamentos", async (AppDbContext db) =>
    await db.Appointments.ToListAsync());

// Endpoint para criar um novo agendamento
app.MapPost("/api/agendamentos", async (Appointment agendamento, AppDbContext db) =>
{
    // Verifica se já existe um agendamento no mesmo horário, data e serviço
    var conflito = await db.Appointments.AnyAsync(a =>
        a.Data == agendamento.Data &&
        a.Horario == agendamento.Horario &&
        a.Servico == agendamento.Servico
    );

    if (conflito)
    {
        return Results.BadRequest("Já existe um agendamento nesse horário para esse procedimento.");
    }

    db.Appointments.Add(agendamento);
    await db.SaveChangesAsync();

    return Results.Ok(agendamento);
});

app.MapPut("/api/agendamentos/{id}", async (int id, Appointment agendamentoEditado, AppDbContext db) =>
{
    var agendamentoExistente = await db.Appointments.FindAsync(id);

    if (agendamentoExistente is null)
        return Results.NotFound("Agendamento não encontrado.");

    // Atualiza os campos
    agendamentoExistente.Servico = agendamentoEditado.Servico;
    agendamentoExistente.Data = agendamentoEditado.Data;
    agendamentoExistente.Horario = agendamentoEditado.Horario;
    agendamentoExistente.Nome = agendamentoEditado.Nome;
    agendamentoExistente.Telefone = agendamentoEditado.Telefone;
    agendamentoExistente.Pagamento = agendamentoEditado.Pagamento;

    await db.SaveChangesAsync();

    return Results.Ok(agendamentoExistente);
});


app.MapDelete("/api/agendamentos/{id}", async (int id, AppDbContext db) =>
{
    var agendamento = await db.Appointments.FindAsync(id);
    if (agendamento is null)
        return Results.NotFound();

    db.Appointments.Remove(agendamento);
    await db.SaveChangesAsync();

    return Results.Ok();
});


app.UseCors("AllowAll");

app.Run();
