namespace backend.Models;

public sealed class ArticleDto
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string ImageURL { get; set; } = "";
    public string? ImageCredit { get; set; }
    public string Date { get; set; } = "";
    public List<ArticleTagRefDto> Tags { get; set; } = new();
    public string Body { get; set; } = "";
}

public sealed class ArticleTagRefDto
{
    public int TagId { get; set; }
    public string TagName { get; set; } = "";
    public string TagUrl { get; set; } = "";
}
