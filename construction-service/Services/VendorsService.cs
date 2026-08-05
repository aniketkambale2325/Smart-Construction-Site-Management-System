using construction_service.Data;
using construction_service.DTOs;
using construction_service.Model;
using Microsoft.EntityFrameworkCore;

namespace construction_service.Services;

public class VendorService : IVendorService
{
    private readonly ConstructionDbContext _context;

    public VendorService(ConstructionDbContext context)
    {
        _context = context;
    }

    public async Task<List<VendorResponse>> GetAllAsync()
    {
        var vendors = await _context.Vendors.ToListAsync();
        return vendors.Select(v => new VendorResponse(v.Id, v.Name, v.ContactNumber, v.MaterialSupplied)).ToList();
    }

    public async Task<VendorResponse> CreateAsync(VendorRequest request)
    {
        var vendor = new Vendor
        {
            Name = request.Name,
            ContactNumber = request.ContactNumber,
            MaterialSupplied = request.MaterialSupplied
        };

        _context.Vendors.Add(vendor);
        await _context.SaveChangesAsync();
        return new VendorResponse(vendor.Id, vendor.Name, vendor.ContactNumber, vendor.MaterialSupplied);
    }

    public async Task Delete(int id)
    {
        var vendor = await _context.Vendors.FindAsync(id);
        if (vendor is null)
            throw new KeyNotFoundException("Vendor not found");

        _context.Vendors.Remove(vendor);
        await _context.SaveChangesAsync();
    }
}