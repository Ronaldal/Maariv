using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/categories")]
public sealed class CategoriesController(
    ContentDataService data,
    ILogger<CategoriesController> logger) : ControllerBase
{
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(CategoryByIdResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<CategoryByIdResponse> GetById(int id)
    {
        var category = data.GetCategoryById(id);
        if (category is null)
        {
            logger.LogWarning("GET api/categories/{CategoryId} → 404 not found", id);
            return NotFound();
        }

        logger.LogDebug("GET api/categories/{CategoryId} → 200", id);
        return Ok(category);
    }

    /// <summary>Active categories whose name starts with the given prefix (ordinal, UTF-16).</summary>
    [HttpGet("by-prefix")]
    [ProducesResponseType(typeof(IReadOnlyList<CategoryDto>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<CategoryDto>> GetByPrefix([FromQuery] string? prefix)
    {
        var list = data.GetActiveCategoriesByPrefix(prefix);
        logger.LogDebug(
            "GET api/categories/by-prefix?prefix={Prefix} → {Count} items",
            prefix ?? "",
            list.Count);
        return Ok(list);
    }
}
