using construction_service.DTOs;
using construction_service.Services;
using Microsoft.AspNetCore.Mvc;

namespace construction_service.Controllers;

[ApiController]
[Route("/api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("summary")]
    public async Task<ActionResult<DashboardSummaryResponse>> GetSummary()
        => Ok(await _dashboardService.GetSummaryAsync());

    [HttpGet("charts/project-progress")]
    public async Task<ActionResult<List<ProjectProgressChartItem>>> GetProjectProgressChart()
        => Ok(await _dashboardService.GetProjectProgressChartAsync());

    [HttpGet("charts/expense-by-category")]
    public async Task<ActionResult<List<ExpenseByCategoryChartItem>>> GetExpenseByCategoryChart()
        => Ok(await _dashboardService.GetExpenseByCategoryChartAsync());
}
