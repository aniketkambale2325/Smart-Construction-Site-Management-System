namespace construction_service.DTOs;

public record DailyReportRequest(
    string Description,
    List<string> ImageUrls,
    int PercentComplete
);

public record DailyReportResponse(
    int Id,
    DateTime ReportDate,
    string Description,
    List<string> ImageUrls,
    int PercentComplete,
    string SubmittedBy
);