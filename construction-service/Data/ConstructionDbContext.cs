using construction_service.Model;
using ConstructionService.DTOs;
using Microsoft.EntityFrameworkCore;

namespace construction_service.Data;

public class ConstructionDbContext : DbContext
{
    public ConstructionDbContext(
        DbContextOptions<ConstructionDbContext> options
    ) : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }

    public DbSet<Site> Sites { get; set; }

    public DbSet<DailyReport> DailyReports { get; set; }

    public DbSet<Material> Materials { get; set; }

    public DbSet<Vendor> Vendors { get; set; }

    public DbSet<MaterialRequest> MaterialRequests { get; set; }

    public DbSet<Expense> Expenses { get; set; }

    public DbSet<Client> Clients { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Map entity names to lowercase PostgreSQL table names
        modelBuilder.Entity<Project>().ToTable("projects");
        modelBuilder.Entity<Site>().ToTable("sites");
        modelBuilder.Entity<DailyReport>().ToTable("daily_reports");
        modelBuilder.Entity<Material>().ToTable("materials");
        modelBuilder.Entity<Vendor>().ToTable("vendors");
        modelBuilder.Entity<MaterialRequest>().ToTable("material_requests");
        modelBuilder.Entity<Expense>().ToTable("expenses");
        modelBuilder.Entity<Client>().ToTable("clients");

        // Store ImageUrls as comma-separated string
        modelBuilder.Entity<DailyReport>()
            .Property(d => d.ImageUrls)
            .HasConversion(
                v => string.Join(",", v),
                v => v.Split(
                    ",",
                    StringSplitOptions.RemoveEmptyEntries
                ).ToList()
            );

        base.OnModelCreating(modelBuilder);
    }
}