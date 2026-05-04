using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/tags")]
public sealed class TagsController : ControllerBase
{
    private readonly ContentDataService _data;

    public TagsController(ContentDataService data) => _data = data;

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<TagDto>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<TagDto>> GetAll() =>
        Ok(_data.GetTags());

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(TagDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<TagDto> GetById(int id)
    {
        var tag = _data.GetTagById(id);
        return tag is null ? NotFound() : Ok(tag);
    }
}
