namespace ConstructionService.Services;
using ConstructionService.DTOs;

public interface IClientService
{
    Task<List<ClientResponse>> GetAllAsync();
    Task<ClientResponse> GetByIdAsync(int id);
    Task<ClientResponse> CreateAsync(ClientRequest request);
    Task<ClientResponse> UpdateAsync(int id, ClientUpdateRequest request);
    Task<bool> DeleteAsync(int id);
}