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
    db.Appointments.Add(agendamento);
    await db.SaveChangesAsync();
    return Results.Created($"/api/agendamentos/{agendamento.Id}", agendamento);
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
