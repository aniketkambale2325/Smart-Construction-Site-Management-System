namespace construction_service.Model;

public class Material
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Unit { get; set; }

    public int QuantityAvailable { get; set; }

    public int ReorderLevel { get; set; }
}