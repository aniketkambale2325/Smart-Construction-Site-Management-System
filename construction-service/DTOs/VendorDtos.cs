namespace construction_service.DTOs;

public record VendorRequest(string Name, string ContactNumber, string MaterialSupplied);

public record VendorResponse(int Id, string Name, string ContactNumber, string MaterialSupplied);