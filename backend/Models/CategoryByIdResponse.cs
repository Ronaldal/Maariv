namespace backend.Models;

/// <summary>JSON payload for category lookup by numeric id.</summary>
public sealed class CategoryByIdResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
}
