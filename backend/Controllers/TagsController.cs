using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/tags")]
public sealed class TagsController(
    ContentDataService data,
    ILogger<TagsController> logger) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<TagDto>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<TagDto>> GetAll()
    {
        var list = data.GetTags();
        logger.LogDebug("GET api/tags → {Count} items", list.Count);
        return Ok(list);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(TagDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<TagDto> GetById(int id)
    {
        var tag = data.GetTagById(id);
        if (tag is null)
        {
            logger.LogWarning("GET api/tags/{TagId} → 404 not found", id);
            return NotFound();
        }

        logger.LogDebug("GET api/tags/{TagId} → 200", id);
        return Ok(tag);
    }
}
