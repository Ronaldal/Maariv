using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/categories")]
public sealed class CategoriesController : ControllerBase
{
    private readonly ContentDataService _data;

    public CategoriesController(ContentDataService data) => _data = data;

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(CategoryByIdResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<CategoryByIdResponse> GetById(int id)
    {
        var category = _data.GetCategoryById(id);
        return category is null ? NotFound() : Ok(category);
    }

    /// <summary>Active categories whose name starts with the given prefix (ordinal, UTF-16).</summary>
    [HttpGet("by-prefix")]
    [ProducesResponseType(typeof(IReadOnlyList<CategoryDto>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<CategoryDto>> GetByPrefix([FromQuery] string? prefix) =>
        Ok(_data.GetActiveCategoriesByPrefix(prefix));
}
