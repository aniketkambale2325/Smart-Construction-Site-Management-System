using ConstructionService.DTOs;
using ConstructionService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConstructionService.Controllers;

/// <summary>Manages client records for projects.</summary>
[ApiController]
[Route("/api/clients")]
//[Authorize]
public class ClientsController : ControllerBase
{
    private readonly IClientService _clientService;

    public ClientsController(IClientService clientService)
    {
        _clientService = clientService;
    }

    /// <summary>Get all clients.</summary>
    [HttpGet]
    public async Task<ActionResult<List<ClientResponse>>> GetAll()
        => Ok(await _clientService.GetAllAsync());

    /// <summary>Get a single client by id.</summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ClientResponse>> GetById(int id)
    {
        var result = await _clientService.GetByIdAsync(id);
        return result is null ? NotFound() : Ok(result);
    }

    /// <summary>Create a new client.</summary>
    [HttpPost]
    //[Authorize(Roles = "ADMIN,CONTRACTOR")]
    public async Task<ActionResult<ClientResponse>> Create(ClientRequest request)
    {
        var result = await _clientService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    /// <summary>Update an existing client's details.</summary>
    [HttpPut("{id}")]
    //[Authorize(Roles = "ADMIN,CONTRACTOR")]
    public async Task<ActionResult<ClientResponse>> Update(int id, ClientUpdateRequest request)
    {
        var result = await _clientService.UpdateAsync(id, request);
        return result is null ? NotFound() : Ok(result);
    }

    /// <summary>Delete a client (blocked if the client still has projects).</summary>
    [HttpDelete("{id}")]
    //[Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var deleted = await _clientService.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { error = ex.Message });
        }
    }
}