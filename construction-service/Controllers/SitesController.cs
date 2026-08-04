using construction_service.DTOs;
using construction_service.Services;
using ConstructionService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace construction_service.Controllers;


[ApiController]

[Route("/api/sites")]

//[Authorize]

public class SitesController: ControllerBase
{
    private readonly ISiteService _siteService;
    private readonly IPhotoUploadService _photoUploadService;


    public SitesController( ISiteService siteService)
    {
        _siteService =
            siteService;
    }


    [HttpPost]
    //[Authorize( Roles = "ADMIN,CONTRACTOR")]
    public async Task< ActionResult<SiteResponse>> Create(
        SiteRequest request
    )
    {
        try
        {
            var result =
                await _siteService
                    .CreateAsync(request);


            return CreatedAtAction(
                nameof(GetById),
                new
                {
                    id = result.Id
                },
                result
            );
        }
        catch (
            KeyNotFoundException ex
        )
        {
            return BadRequest(
                new
                {
                    error =
                        ex.Message
                }
            );
        }
    }


    [HttpGet("{id}")]

    public async Task<
        ActionResult<SiteResponse>
    > GetById(
        int id
    )
    {
        var result =
            await _siteService
                .GetByIdAsync(id);


        return result is null
            ? NotFound()
            : Ok(result);
    }


    [HttpGet(
        "/by-project/{projectId}"
    )]

    public async Task<
        ActionResult<
            List<SiteResponse>
        >
    > GetByProject(
        int projectId
    )
    {
        return Ok(
            await _siteService
                .GetByProjectIdAsync(
                    projectId
                )
        );
    }


    [HttpPost("{siteId}/daily-reports/upload-photo")]
    [Authorize(Roles = "SITE_ENGINEER,SUPERVISOR,ADMIN,CONTRACTOR")]
    public async Task<IActionResult> UploadPhoto(int siteId, IFormFile file)
    {
        var url = await _photoUploadService.UploadAsync(siteId, file);
        return Ok(new { url });
    }

}