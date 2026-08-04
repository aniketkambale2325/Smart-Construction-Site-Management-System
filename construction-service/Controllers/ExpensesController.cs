using construction_service.DTOs;
using construction_service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace construction_service.Controllers;

[ApiController]
[Route("/api/expenses")]
//[Authorize]
public class ExpensesController : ControllerBase
{
    private readonly IExpenseService _expenseService;
    public ExpensesController(IExpenseService expenseService)
    {
        _expenseService = expenseService;
    }

    [HttpPost]
    //[Authorize(Roles = "ADMIN,CONTRACTOR")]
    public async Task<IActionResult> Create(ExpenseRequest request)
    {
        try
        {
            return Ok(await _expenseService.CreateAsync(request));
        }
        catch (KeyNotFoundException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("by-project/{projectId}")]
    public async Task<ActionResult<List<ExpenseResponse>>> GetByProject(int projectId)
    => Ok(await _expenseService.GetByProjectAsync(projectId));
}