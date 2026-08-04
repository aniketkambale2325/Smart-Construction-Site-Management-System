namespace construction_service.Model;

public class DailyReport
{
    public int Id { get; set; }

    public int SiteId { get; set; }

    public Site Site { get; set; }

    public DateTime ReportDate { get; set; }

    public string Description { get; set; }

    public List<string> ImageUrls { get; set; } = new();

    public int PercentComplete { get; set; }

    public string SubmittedBy { get; set; }
}