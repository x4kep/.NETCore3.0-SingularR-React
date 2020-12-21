using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EuroDeskBookstoresAssigment.Models;
using EuroDeskBookstoresAssigment.Repositories;

namespace EuroDeskBookstoresAssigment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly ILogger<AuthorController> _logger;
        private readonly IDbRepository _context;

        public AuthorController(ILogger<AuthorController> logger, IDbRepository context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: api/Author
        //[Route("GetAuthors")]
        [HttpGet]
        public async Task<IActionResult> GetAuthors()
        {
            try
            {
                var books = await _context.GetAuthorsAsync();
                if (books == null)
                    return NotFound();

                return Ok(books);
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
                var book = await _context.GetAuthorAsync(id);
                if (book == null)
                    return NotFound();

                return Ok(book);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // POST: api/Author/CreateAuthor
        [HttpPost]
        public async Task<IActionResult> CreateAuthor([FromForm]Author bookstore)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _context.CreateAuthorAsync(bookstore);
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
        public async Task<IActionResult> UpdateAuthor([FromForm]Author bookstore)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _context.UpdateAuthorAsync(bookstore);
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
