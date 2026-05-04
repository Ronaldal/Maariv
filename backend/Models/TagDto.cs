namespace backend.Models;

public sealed class TagDto
{
    public int TagId { get; set; }
    public string TagName { get; set; } = "";
    public string TagImage { get; set; } = "";
}
