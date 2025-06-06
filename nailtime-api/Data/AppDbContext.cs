using Microsoft.EntityFrameworkCore;
using NailTime.Api.Models;

namespace NailTime.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Appointment> Appointments { get; set; }
}
