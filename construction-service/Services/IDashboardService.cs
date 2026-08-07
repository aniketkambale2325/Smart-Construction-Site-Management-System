using construction_service.DTOs;

namespace construction_service.Services;

public interface IDashboardService
{
    Task<DashboardSummaryResponse> GetSummaryAsync();
    Task<List<ProjectProgressChartItem>> GetProjectProgressChartAsync();
    Task<List<ExpenseByCategoryChartItem>> GetExpenseByCategoryChartAsync();
}
