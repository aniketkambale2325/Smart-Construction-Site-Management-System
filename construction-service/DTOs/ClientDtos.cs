using construction_service.DTOs;

namespace ConstructionService.DTOs;

public record ClientRequest(
    string Name,
    string ContactEmail,
    string ContactPhone,
    List<ProjectRequest> Project
);


public record ClientResponse(
    int Id,
    string Name,
    string ContactEmail,
    string ContactPhone,
    List<ProjectResponse> Projects
);


public record ClientUpdateRequest(
    string Name,
    string ContactEmail,
    string ContactPhone,
    List<ProjectUpdateRequest> Project
);