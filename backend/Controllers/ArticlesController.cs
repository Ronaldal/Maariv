using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/articles")]
public sealed class ArticlesController : ControllerBase
{
    private readonly ContentDataService _data;

    public ArticlesController(ContentDataService data) => _data = data;

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<ArticleDto>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<ArticleDto>> GetAll() =>
        Ok(_data.GetArticles());

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ArticleDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ArticleDto> GetById(int id)
    {
        var article = _data.GetArticleById(id);
        return article is null ? NotFound() : Ok(article);
    }
}
