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
    [Route("api/[controller]/[action]")]
    public class UtilityController : ControllerBase
    {
        private readonly ILogger<UtilityController> _logger;
        private readonly IDbRepository _context;

        public UtilityController(ILogger<UtilityController> logger, IDbRepository context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: api/Utility/GetBookstoreBooks/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookstoreBooks(int id)
        {
            try
            {
                var bookstores = await _context.GetBookstoreBooks(id);
                if (bookstores == null)
                    return NotFound();

                return Ok(bookstores);
            }
            catch(Exception e)
            {
                return BadRequest();
            }
        }

        // GET: api/Utility/GetAuthorBooks/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthorBooks(int id)
        {
            try
            {
                var bookstores = await _context.GetAuthorBooksAsync(id);
                if (bookstores == null)
                    return NotFound();

                return Ok(bookstores);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // GET: api/Utility/GetAuthorBio/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthorBio(int id)
        {
            try
            {
                var bookstores = await _context.GetAuthorBioAsync(id);
                if (bookstores == null)
                    return NotFound();

                return Ok(bookstores);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // POST: api/Utility/AddBookBookstore
        [HttpPost]
        public async Task<IActionResult> AddBookBookstore(int bookId, int bookstoreId)
        {
            try
            {
                var bookstores = await _context.AddBookBookstoreAsync(bookId, bookstoreId);
                if (bookstores == false)
                    return BadRequest();

                return Ok(bookstores);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // GET: api/Utility/RemoveBookBookstore
        [HttpPost]
        public async Task<IActionResult> RemoveBookBookstore(int bookId, int bookstoreId)
        {
            try
            {
                var bookstores = await _context.RemoveBookBookstoreAsync(bookId, bookstoreId);
                if (bookstores == false)
                    return BadRequest();

                return Ok(bookstores);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

    }
}
