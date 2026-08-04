namespace construction_service.Services;
using construction_service.DTOs;

public interface IExpenseService
{
    Task<ExpenseResponse> CreateAsync(ExpenseRequest request);
    Task<List<ExpenseResponse>> GetByProjectAsync(int projectId);
}