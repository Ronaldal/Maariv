using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/articles")]
public sealed class ArticlesController(
    ContentDataService data,
    ILogger<ArticlesController> logger) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<ArticleDto>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<ArticleDto>> GetAll()
    {
        var list = data.GetArticles();
        logger.LogDebug("GET api/articles → {Count} items", list.Count);
        return Ok(list);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ArticleDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ArticleDto> GetById(int id)
    {
        var article = data.GetArticleById(id);
        if (article is null)
        {
            logger.LogWarning("GET api/articles/{ArticleId} → 404 not found", id);
            return NotFound();
        }

        logger.LogDebug("GET api/articles/{ArticleId} → 200", id);
        return Ok(article);
    }
}
