namespace construction_service.DTOs;

public record SiteRequest(
    int ProjectId,
    string SiteName,
    string Address,
    int SiteEngineerId
);

public record SiteResponse(
    int Id,
    int ProjectId,
    string SiteName,
    string Address,
    int? SiteEngineerId
);