using construction_service.DTOs;
using construction_service.Services;
using Microsoft.AspNetCore.Mvc;

namespace construction_service.Controllers;

[ApiController]
[Route("/api/projects")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _service;

    public ProjectsController(
        IProjectService service
    )
    {
        _service = service;
    }


    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(
            await _service.GetAll()
        );
    }


    [HttpPost]
    public async Task<IActionResult> Create(
        ProjectRequest request
    )
    {
        return Ok(
            await _service.Create(request)
        );
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
        int id
    )
    {
        var result =
            await _service.GetById(id);

        return result is null
            ? NotFound()
            : Ok(result);
    }


    [HttpPut("{id}")]
    public async Task<ActionResult<ProjectResponse>> Update(
        int id,
        ProjectUpdateRequest request
    )
    {
        var result =
            await _service.UpdateAsync(
                id,
                request
            );

        return result is null
            ? NotFound()
            : Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _service.Delete(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}