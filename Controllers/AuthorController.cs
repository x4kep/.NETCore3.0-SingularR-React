using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EuroDeskBookstoresAssigment.Models;
using EuroDeskBookstoresAssigment.Repositories;
using AutoMapper;
using EuroDeskBookstoresAssigment.ModelsDto;

namespace EuroDeskBookstoresAssigment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly ILogger<AuthorController> _logger;
        private readonly IDbRepository _context;
        private readonly IMapper _mapper;

        public AuthorController(ILogger<AuthorController> logger, IDbRepository context, IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Author
        //[Route("GetAuthors")]
        [HttpGet]
        public async Task<IActionResult> GetAuthors()
        {
            try
            {
                var authors = await _context.GetAuthorsAsync();
                if (authors == null)
                    return NotFound();

                var authorsDto = _mapper.Map<List<AuthorDto>>(authors);

                return Ok(authorsDto);
            }
            catch(Exception e)
            {
                return BadRequest();
            }
        }

        // GET: api/Author/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthor(int id)
        {
            try
            {
                var author = await _context.GetAuthorAsync(id);
                if (author == null)
                    return NotFound();

                var authorDto = _mapper.Map<AuthorDto>(author);

                return Ok(author);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // POST: api/Author/CreateAuthor
        [HttpPost]
        public async Task<IActionResult> CreateAuthor([FromForm]Author author)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _context.CreateAuthorAsync(author);
                    return Ok();
                }
                catch(Exception ex)
                {
                    return BadRequest();
                }
            }

            return BadRequest();
        }

        // POST: api/Author/UpdateAuthor/1
        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateAuthor([FromForm]Author author)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _context.UpdateAuthorAsync(author);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest();
                }
            }

            return BadRequest();
        }

        // DELETE: api/Author/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            int result = 0;

            if(id == 0)
                return BadRequest();
            
            try
            {
                result = await _context.DeleteAuthorAsync(id);

                if (result == 0)
                    return NotFound();

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}
