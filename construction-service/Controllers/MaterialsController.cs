using ConstructionService.DTOs;
using ConstructionService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConstructionService.Controllers;

/// <summary>Manages material inventory, low-stock alerts, and material requests from sites.</summary>
[ApiController]
[Route("/api/materials")]
//[Authorize]
public class MaterialsController : ControllerBase
{
    private readonly IMaterialService _materialService;

    public MaterialsController(IMaterialService materialService)
    {
        _materialService = materialService;
    }

    /// Get all materials with current stock levels.
    [HttpGet]
    public async Task<ActionResult<List<MaterialResponse>>> GetAll()
        => Ok(await _materialService.GetAllAsync());



    /// Add a new material to inventory
    [HttpPost]
    //[Authorize(Roles = "ADMIN,CONTRACTOR")]
    public async Task<ActionResult<MaterialResponse>> Create(MaterialRequestDto request)
        => Ok(await _materialService.CreateAsync(request));
        

    /// Get materials currently at or below their reorder level.
    [HttpGet("low-stock")]
    public async Task<ActionResult<List<MaterialResponse>>> GetLowStock()
        => Ok(await _materialService.GetLowStockAsync());

    /// <summary>Raise a material request from a site.</summary>
    [HttpPost("request")]
    //[Authorize(Roles = "SITE_ENGINEER,SUPERVISOR,ADMIN,CONTRACTOR")]
    public async Task<ActionResult<MaterialRequestResponse>> RequestMaterial(MaterialRequestCreateDto request)
    {
        try
        {
            return Ok(await _materialService.RequestMaterialAsync(request));
        }
        catch (KeyNotFoundException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    /// <summary>Approve or fulfill a pending material request.</summary>
    [HttpPut("request/{requestId}/status")]
    //[Authorize(Roles = "ADMIN,CONTRACTOR")]
    public async Task<IActionResult> UpdateRequestStatus(int requestId, MaterialRequestStatusUpdateDto dto)
    {
        var result = await _materialService.UpdateRequestStatusAsync(requestId, dto.Status);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _materialService.Delete(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}