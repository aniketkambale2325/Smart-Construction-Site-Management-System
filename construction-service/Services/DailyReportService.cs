using construction_service.Data;
using construction_service.DTOs;
using construction_service.Model;
using Microsoft.EntityFrameworkCore;


namespace construction_service.Services;
 public class DailyReportService : IDailyReportService
{
    private readonly ConstructionDbContext _context;
    public DailyReportService(ConstructionDbContext context)
    {
        _context = context;
    }
    public async Task<DailyReportResponse> AddAsync(int siteId, DailyReportRequest request, string submittedBy) 
    {
        var siteExists = await _context.Sites.AnyAsync(s => s.Id == siteId);
        if(!siteExists)
        throw new KeyNotFoundException("Site not found");
    
        if(request.PercentComplete is < 0 or > 100)
        throw new ArgumentOutOfRangeException(nameof(request.PercentComplete), "Percent complete must be between 0 and 100");

        var report = new DailyReport
        {
            SiteId = siteId,
            Description = request.Description,
            ImageUrls = request.ImageUrls,
            PercentComplete = request.PercentComplete,
            SubmittedBy = submittedBy,
            ReportDate = DateTime.UtcNow
        };

        _context.DailyReports.Add(report);
        await _context.SaveChangesAsync();

        return ToResponse(report);

    }

    public async Task<List<DailyReportResponse>> GetBySiteAsync(int siteId)
    {
        var reports = await _context.DailyReports
            .Where(r => r.SiteId == siteId)
            .OrderByDescending(r => r.ReportDate)
            .ToListAsync();

            return reports.Select(ToResponse).ToList();
    }
    
    private static DailyReportResponse ToResponse(DailyReport r) =>
    new(r.Id, r.ReportDate, r.Description, r.ImageUrls, r.PercentComplete, r.SubmittedBy);

}


