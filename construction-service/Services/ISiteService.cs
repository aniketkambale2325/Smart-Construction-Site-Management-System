using construction_service.DTOs;

namespace construction_service.Services;

public interface ISiteService
{
    Task<SiteResponse> CreateAsync(
        SiteRequest request
    );

    Task<SiteResponse?> GetByIdAsync(
        int id
    );

    Task<List<SiteResponse>>
        GetByProjectIdAsync(
            int projectId
        );

    Task<SiteResponse?>
        AssignEngineerAsync(
            int siteId,
            int employeeId
        );
}