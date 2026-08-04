namespace construction_service.DTOs;

public record ExpenseRequest(
    int ProjectId, 
    string Category, 
    decimal Amount, 
    DateTime ExpenseDate
    );

public record ExpenseResponse(
    int Id, 
    int ProjectId, 
    string Category, 
    decimal Amount, 
    DateTime ExpenseDate
    );
