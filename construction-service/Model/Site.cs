namespace construction_service.Model;

public class Site
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public Project Project { get; set; }

    public string SiteName { get; set; }

    public string Address { get; set; }

    public int SiteEngineerId { get; set; }
    // Reference to Java Employee — validate through Java service

    public ICollection<DailyReport> DailyReports { get; set; }
}