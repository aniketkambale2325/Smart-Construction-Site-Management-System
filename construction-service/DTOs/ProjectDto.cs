namespace construction_service.DTOs;

public record ProjectRequest(
    string Name,
    int ClientId,
    DateTime StartDate,
    DateTime? EndDate
);

public record ProjectResponse(
    int Id,
    string Name,
    int ClientId,
    DateTime StartDate,
    DateTime? EndDate,
    string Status
);

public record ProjectUpdateRequest(
    string Name,
    DateTime? EndDate,
    string Status
);