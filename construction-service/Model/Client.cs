namespace construction_service.Model;

public class Client
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string ContactEmail { get; set; }

    public string ContactPhone { get; set; }

    public ICollection<Project> Projects { get; set; }
}