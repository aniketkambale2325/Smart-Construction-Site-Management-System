namespace construction_service.Services;
using construction_service.DTOs;

public interface IVendorService
{
    Task<List<VendorResponse>> GetAllAsync();
    Task<VendorResponse> CreateAsync(VendorRequest request);
}
