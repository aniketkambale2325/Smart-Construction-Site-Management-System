namespace construction_service.Model;

public class Expense
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public Project Project { get; set; }

    public string Category { get; set; }

    public decimal Amount { get; set; }

    public DateTime ExpenseDate { get; set; }
}