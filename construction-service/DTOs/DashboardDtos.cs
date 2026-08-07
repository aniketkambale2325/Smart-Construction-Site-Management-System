namespace construction_service.DTOs;

public record DashboardSummaryResponse(
    int TotalProjects,
    int ActiveSites,
    double AvgProgressPercent,
    decimal TotalExpense,
    int LowStockMaterialsCount
);

public record ProjectProgressChartItem(
    string ProjectName,
    double AvgPercentComplete
);

public record ExpenseByCategoryChartItem(
    string Category,
    decimal Total
);
