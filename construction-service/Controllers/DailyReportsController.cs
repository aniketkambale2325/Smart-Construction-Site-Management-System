using construction_service.DTOs;
using construction_service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace construction_service.Controllers;

[ApiController]
[Route("/api/sites/{siteId}/daily-reports")]
//[Authorize]
public class DailyReportsController : ControllerBase
{
    private readonly IDailyReportService _dailyReportService;

    public DailyReportsController(IDailyReportService dailyReportService)
    {

        _dailyReportService = dailyReportService;
    }

    [HttpPost]
   // [Authorize(Roles = "SITE_ENGINEER,SUPERVISOR,ADMIN,CONTRACTOR")]
    public async Task<IActionResult> Add(int siteId, DailyReportRequest request)
    {
        var submittedBy = User.Identity?.Name ?? "unknown";

        try
        {
            var result = await _dailyReportService.AddAsync(siteId, request, submittedBy);
            return CreatedAtAction(nameof(GetAll),new{ siteId },result);
        }
        catch(KeyNotFoundException ex){
            return BadRequest(new {error = ex.Message });
        }
        catch (ArgumentOutOfRangeException ex){
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<DailyReportResponse>>> GetAll(int siteId) =>
    Ok(await _dailyReportService.GetBySiteAsync(siteId));
}