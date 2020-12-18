using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EuroDeskBookstoresAssigment.Models;
using EuroDeskBookstoresAssigment.Repositories;
using EuroDeskBookstoresAssigment.Models;

namespace EuroDeskBookstoresAssigment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookstoreController : ControllerBase
    {
        private readonly ILogger<BookstoreController> _logger;
        private readonly IDbRepository _context;

        public BookstoreController(ILogger<BookstoreController> logger, IDbRepository context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: api/Bookstore
        //[Route("GetBookstores")]
        [HttpGet]
        public async Task<IActionResult> GetBookstores()
        {
            try
            {
                var bookstores = await _context.GetBookstoresAsync();
                if (bookstores == null)
                    return NotFound();

                return Ok(bookstores);
            }
            catch(Exception e)
            {
                return BadRequest();
            }
        }

        // GET: api/Bookstore/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookstore(int id)
        {
            try
            {
                var bookstore = await _context.GetBookstoreAsync(id);
                if (bookstore == null)
                    return NotFound();

                return Ok(bookstore);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // POST: api/Bookstore/CreateBookstore
        [HttpPost]
        public async Task<IActionResult> CreateBookstore([FromForm]Bookstore bookstore)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _context.CreateBookstoreAsync(bookstore);
                    return Ok();
                }
                catch(Exception ex)
                {
                    return BadRequest();
                }
            }

            return BadRequest();
        }

        // POST: api/Bookstore/UpdateBookstore/1
        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateBookstore([FromForm]Bookstore bookstore)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _context.UpdateBookstoreAsync(bookstore);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest();
                }
            }

            return BadRequest();
        }

        // DELETE: api/Bookstore/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookstore(int id)
        {
            int result = 0;

            if(id == 0)
                return BadRequest();
            
            try
            {
                result = await _context.DeleteBookstoreAsync(id);

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
