namespace ConstructionService.Services;
using ConstructionService.DTOs;

public interface IMaterialService
{
    Task<List<MaterialResponse>> GetAllAsync();
    Task<MaterialResponse> CreateAsync(MaterialRequestDto request);
    Task<List<MaterialResponse>> GetLowStockAsync();
    Task<MaterialRequestResponse> RequestMaterialAsync(MaterialRequestCreateDto request);
    Task<MaterialRequestResponse?> UpdateRequestStatusAsync(int requestId, string status);
    Task Delete(int id);
}