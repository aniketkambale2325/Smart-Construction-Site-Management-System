namespace construction_service.Model;

public class Project
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int ClientId { get; set; }

    public Client Client { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string Status { get; set; }
    // PLANNED, IN PROGRESS, COMPLETED

    public ICollection<Site> Sites { get; set; }
}