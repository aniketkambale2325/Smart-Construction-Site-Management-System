using construction_service.Model;

public class MaterialRequest
{
    internal readonly string Name;

    public int Id { get; set; }
    public int MaterialId { get; set; }
    public Material? Material { get; set; }
    public int SiteId { get; set; }
    public int Quantity { get; set; }
    public string Status { get; set; } = "PENDING"; // PENDING, APPROVED, FULFILLED
    public DateTime RequestedOn { get; set; } = DateTime.UtcNow;
}