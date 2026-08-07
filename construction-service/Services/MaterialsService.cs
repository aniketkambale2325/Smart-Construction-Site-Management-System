
using construction_service.Data;
using construction_service.Model;
using ConstructionService.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ConstructionService.Services;

public class MaterialService : IMaterialService
{
    private readonly ConstructionDbContext _context;

    public MaterialService(ConstructionDbContext context)
    {
        _context = context;
    }

    public async Task<List<MaterialResponse>> GetAllAsync()
    {
        var materials = await _context.Materials.ToListAsync();
        return materials.Select(ToResponse).ToList();
    }

    public async Task<MaterialResponse> CreateAsync(MaterialRequestDto request)
    {
        var material = new Material
        {
            Name = request.Name,
            Unit = request.Unit,
            QuantityAvailable = request.QuantityAvailable,
            ReorderLevel = request.ReorderLevel
        };

        _context.Materials.Add(material);
        await _context.SaveChangesAsync();
        return ToResponse(material);
    }

    public async Task<List<MaterialResponse>> GetLowStockAsync()
    {
        var lowStock = await _context.Materials
            .Where(m => m.QuantityAvailable <= m.ReorderLevel)
            .ToListAsync();
        return lowStock.Select(ToResponse).ToList();
    }

    public async Task<MaterialRequestResponse> RequestMaterialAsync(MaterialRequestCreateDto request)
    {
        var material = await _context.Materials.FindAsync(request.MaterialId)
            ?? throw new KeyNotFoundException("Material not found");

        var materialRequest = new MaterialRequest
        {
            MaterialId = request.MaterialId,
            SiteId = request.SiteId,
            Quantity = request.Quantity,
            Status = "PENDING",
            RequestedOn = DateTime.UtcNow
        };

        _context.MaterialRequests.Add(materialRequest);
        await _context.SaveChangesAsync();

        return ToRequestResponse(materialRequest);
    }

    public async Task<MaterialRequestResponse?> UpdateRequestStatusAsync(int requestId, string status)
    {
        var request = await _context.MaterialRequests
            .Include(r => r.Material)
            .FirstOrDefaultAsync(r => r.Id == requestId);

        if (request is null) return null;

        request.Status = status;

        // when fulfilled, actually deduct from inventory
        if (status == "FULFILLED" && request.Material is not null)
        {
            request.Material.QuantityAvailable -= request.Quantity;
        }

        await _context.SaveChangesAsync();
        return ToRequestResponse(request);
    }

    public async Task Delete(int id)
    {
        var material = await _context.Materials.FindAsync(id)
            ?? throw new KeyNotFoundException("Material not found");

        _context.Materials.Remove(material);
        await _context.SaveChangesAsync();
    }

    private static MaterialResponse ToResponse(Material m) =>
        new(m.Id, m.Name, m.Unit, m.QuantityAvailable, m.ReorderLevel,
            IsLowStock: m.QuantityAvailable <= m.ReorderLevel);

    private static MaterialRequestResponse ToRequestResponse(MaterialRequest r) =>
        new(r.Id, r.MaterialId, r.SiteId, r.Quantity, r.Status, r.RequestedOn);

   

}