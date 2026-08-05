using construction_service.Data;
using construction_service.DTOs;
using Microsoft.EntityFrameworkCore;

namespace construction_service.Services;

public class DashboardService : IDashboardService
{
    private readonly ConstructionDbContext _context;

    public DashboardService(ConstructionDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummaryResponse> GetSummaryAsync()
    {
        var totalProjects = await _context.Projects.CountAsync();
        var activeSites = await _context.Sites.CountAsync();
        var avgProgress = await _context.DailyReports
            .Select(r => (double?)r.PercentComplete)
            .AverageAsync() ?? 0;
        var totalExpense = await _context.Expenses.SumAsync(e => (decimal?)e.Amount) ?? 0;
        var lowStockCount = await _context.Materials
            .CountAsync(m => m.QuantityAvailable <= m.ReorderLevel);

        return new DashboardSummaryResponse(
            totalProjects,
            activeSites,
            avgProgress,
            totalExpense,
            lowStockCount
        );
    }

    public async Task<List<ProjectProgressChartItem>> GetProjectProgressChartAsync()
    {
        var projects = await _context.Projects
            .Include(p => p.Sites)
                .ThenInclude(s => s.DailyReports)
            .ToListAsync();

        return projects.Select(p =>
        {
            var reports = p.Sites.SelectMany(s => s.DailyReports).ToList();
            var avg = reports.Count > 0
                ? reports.Average(r => r.PercentComplete)
                : 0;
            return new ProjectProgressChartItem(p.Name, avg);
        }).ToList();
    }

    public async Task<List<ExpenseByCategoryChartItem>> GetExpenseByCategoryChartAsync()
    {
        return await _context.Expenses
            .GroupBy(e => e.Category)
            .Select(g => new ExpenseByCategoryChartItem(g.Key, g.Sum(e => e.Amount)))
            .ToListAsync();
    }
}
