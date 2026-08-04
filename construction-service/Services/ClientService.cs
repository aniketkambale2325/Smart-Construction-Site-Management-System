using construction_service.Data;
using construction_service.DTOs;
using construction_service.Model;
using ConstructionService.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ConstructionService.Services;

public class ClientService : IClientService
{
    private readonly ConstructionDbContext _context;

    public ClientService(ConstructionDbContext context)
    {
        _context = context;
    }

    public async Task<List<ClientResponse>> GetAllAsync()
    {
        var clients = await _context.Clients.ToListAsync();
        return clients.Select(ToResponse).ToList();
    }

    public async Task<ClientResponse?> GetByIdAsync(int id)
    {
        var client = await _context.Clients.FindAsync(id);
        return client is null ? null : ToResponse(client);
    }

    public async Task<ClientResponse> CreateAsync(ClientRequest request)
    {
        var client = new Client
        {
            Name = request.Name,
            ContactEmail = request.ContactEmail,
            ContactPhone = request.ContactPhone
        };

        _context.Clients.Add(client);
        await _context.SaveChangesAsync();

        return ToResponse(client);
    }

    public async Task<ClientResponse?> UpdateAsync(int id, ClientUpdateRequest request)
    {
        var client = await _context.Clients.FindAsync(id);
        if (client is null) return null;

        client.Name = request.Name;
        client.ContactEmail = request.ContactEmail;
        client.ContactPhone = request.ContactPhone;

        await _context.SaveChangesAsync();
        return ToResponse(client);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var client = await _context.Clients.FindAsync(id);
        if (client is null) return false;

        // guard against deleting a client that still has projects attached
        var hasProjects = await _context.Projects.AnyAsync(p => p.ClientId == id);
        if (hasProjects)
            throw new InvalidOperationException("Cannot delete a client with existing projects");

        _context.Clients.Remove(client);
        await _context.SaveChangesAsync();
        return true;
    }

    private static ClientResponse ToResponse(Client c)
{
    return new ClientResponse(
        c.Id,
        c.Name,
        c.ContactEmail,
        c.ContactPhone,
        c.Projects?.Select(p => new ProjectResponse(
            p.Id,
            p.Name,
            p.ClientId,
            p.StartDate,
            p.EndDate,
            p.Status
        )).ToList() ?? new List<ProjectResponse>()
    );
}
}