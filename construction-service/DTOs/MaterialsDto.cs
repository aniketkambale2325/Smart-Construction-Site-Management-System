namespace ConstructionService.DTOs;

public record MaterialRequestDto(string Name, string Unit, int QuantityAvailable, int ReorderLevel);

public record MaterialResponse(int Id, string Name, string Unit, int QuantityAvailable,
    int ReorderLevel, bool IsLowStock);

public record MaterialRequestCreateDto(int MaterialId, int SiteId, int Quantity);

public record MaterialRequestResponse(int Id, int MaterialId, int SiteId, int Quantity,
    string Status, DateTime RequestedOn);

public record MaterialRequestStatusUpdateDto(string Status); // PENDING, APPROVED, FULFILLED, REJECTED