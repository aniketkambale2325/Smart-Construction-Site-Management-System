using construction_service.DTOs;
using construction_service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace construction_service.Controllers;

/// <summary>Manages material suppliers/vendors.</summary>
[ApiController]
[Route("/api/vendors")]
//[Authorize]
public class VendorsController : ControllerBase
{
    private readonly IVendorService _vendorService;

    public VendorsController(IVendorService vendorService)
    {
        _vendorService = vendorService;
    }

    [HttpGet]
    public async Task<ActionResult<List<VendorResponse>>> GetAll()
        => Ok(await _vendorService.GetAllAsync());

    [HttpPost]
    //[Authorize(Roles = "ADMIN,CONTRACTOR")]
    public async Task<ActionResult<VendorResponse>> Create(VendorRequest request)
        => Ok(await _vendorService.CreateAsync(request));
}