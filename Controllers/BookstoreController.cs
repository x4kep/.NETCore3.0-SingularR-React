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
    public class BookstoreController : ControllerBase
    {
        private readonly ILogger<BookstoreController> _logger;
        private readonly IDbRepository _context;
        private readonly IMapper _mapper;

        public BookstoreController(ILogger<BookstoreController> logger, IDbRepository context, IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
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

                var bookstoresDto = _mapper.Map<List<BookstoreDto>>(bookstores);

                return Ok(bookstoresDto);
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

                var bookstoreDto = _mapper.Map<BookstoreDto>(bookstore);

                return Ok(bookstoreDto);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // POST: api/Bookstore/CreateBookstore
        [HttpPost]
        public async Task<IActionResult> CreateBookstore([FromForm]BookstoreDto bookstoreDto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var bookstoreModel = _mapper.Map<Bookstore>(bookstoreDto);
                    await _context.CreateBookstoreAsync(bookstoreModel);
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
        public async Task<IActionResult> UpdateBookstore([FromForm]BookstoreDto bookstoreDto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var bookstoreModel = _mapper.Map<Bookstore>(bookstoreDto);
                    await _context.UpdateBookstoreAsync(bookstoreModel);
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
