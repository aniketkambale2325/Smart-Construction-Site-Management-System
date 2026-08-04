using construction_service.DTOs;
namespace construction_service.Services;


public interface IDailyReportService
{
    Task<DailyReportResponse> AddAsync(int siteId, DailyReportRequest request, string submittedBy);
    Task<List<DailyReportResponse>> GetBySiteAsync(int siteId);
}