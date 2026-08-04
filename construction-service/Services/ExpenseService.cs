using construction_service.Data;
using construction_service.DTOs;
using construction_service.Model;
using Microsoft.EntityFrameworkCore;


namespace construction_service.Services;

public class ExpenseService : IExpenseService
{
    private readonly ConstructionDbContext _context;
    public ExpenseService(ConstructionDbContext context)
    {
        _context = context;
    }
    public async Task<ExpenseResponse> CreateAsync(ExpenseRequest request)
    {
        var projectExists = await _context.Projects.AnyAsync(p => p.Id == request.ProjectId);
        if(!projectExists) throw new KeyNotFoundException($"Project with ID {request.ProjectId} not found.");

        var expense = new Expense
        {
            ProjectId = request.ProjectId,
            Category = request.Category,
            Amount = request.Amount,
            ExpenseDate = request.ExpenseDate,
        };
        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();
        return ToResponse(expense);
    }
    public async Task<List<ExpenseResponse>>GetByProjectAsync(int projectId)
    {
        var expenses = await _context.Expenses
        .Where(e => e.ProjectId == projectId)
        .ToListAsync();
        return expenses.Select(ToResponse).ToList();
    }
    private static ExpenseResponse ToResponse(Expense e) =>
    new(e.Id, e.ProjectId, e.Category, e.Amount, e.ExpenseDate);
}