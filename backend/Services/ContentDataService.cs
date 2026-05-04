using System.Text.Json;
using backend.Models;

namespace backend.Services;

public sealed class ContentDataService
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        ReadCommentHandling = JsonCommentHandling.Disallow,
    };

    private readonly Lazy<IReadOnlyList<ArticleDto>> _articles;
    private readonly Lazy<IReadOnlyList<TagDto>> _tags;
    private readonly Lazy<IReadOnlyList<CategoryDto>> _categories;

    public ContentDataService(IWebHostEnvironment env)
    {
        _articles = new Lazy<IReadOnlyList<ArticleDto>>(() => Load<ArticleDto>(env, "jsonData.txt"));
        _tags = new Lazy<IReadOnlyList<TagDto>>(() => Load<TagDto>(env, "jsonDataTags.txt"));
        _categories = new Lazy<IReadOnlyList<CategoryDto>>(() => Load<CategoryDto>(env, "jsonDataCategories.txt"));
    }

    public IReadOnlyList<ArticleDto> GetArticles() => _articles.Value;

    public ArticleDto? GetArticleById(int id) =>
        _articles.Value.FirstOrDefault(a => a.Id == id);

    public IReadOnlyList<TagDto> GetTags() => _tags.Value;

    public TagDto? GetTagById(int id) =>
        _tags.Value.FirstOrDefault(t => t.TagId == id);

    public CategoryByIdResponse? GetCategoryById(int id)
    {
        var c = _categories.Value.FirstOrDefault(x => x.Id == id);
        return c is null ? null : new CategoryByIdResponse { Id = c.Id, Name = c.Name };
    }

    public IReadOnlyList<CategoryDto> GetActiveCategoriesByPrefix(string? prefix)
    {
        prefix ??= "";
        return _categories.Value
            .Where(c => c.IsActive && c.Name.StartsWith(prefix, StringComparison.Ordinal))
            .ToList();
    }

    private static IReadOnlyList<T> Load<T>(IWebHostEnvironment env, string fileName)
    {
        var path = Path.Combine(env.ContentRootPath, "Data", fileName);
        if (!File.Exists(path))
            throw new FileNotFoundException($"Data file not found: {path}");

        var json = File.ReadAllText(path);
        var list = JsonSerializer.Deserialize<List<T>>(json, JsonOptions);
        return list ?? new List<T>();
    }
}
