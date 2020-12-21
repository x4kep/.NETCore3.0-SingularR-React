﻿using System;
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
    public class BookController : ControllerBase
    {
        private readonly ILogger<BookController> _logger;
        private readonly IDbRepository _context;

        public BookController(ILogger<BookController> logger, IDbRepository context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: api/Book
        //[Route("GetBooks")]
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            try
            {
                var books = await _context.GetBooksAsync();
                if (books == null)
                    return NotFound();

                return Ok(books);
            }
            catch(Exception e)
            {
                return BadRequest();
            }
        }

        // GET: api/Book/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            try
            {
                var book = await _context.GetBookAsync(id);
                if (book == null)
                    return NotFound();

                return Ok(book);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // POST: api/Book/CreateBook
        [HttpPost]
        public async Task<IActionResult> CreateBook([FromForm]Book bookstore)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _context.CreateBookAsync(bookstore);
                    return Ok();
                }
                catch(Exception ex)
                {
                    return BadRequest();
                }
            }

            return BadRequest();
        }

        // POST: api/Book/UpdateBook/1
        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateBook([FromForm]Book bookstore)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _context.UpdateBookAsync(bookstore);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest();
                }
            }

            return BadRequest();
        }

        // DELETE: api/Book/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            int result = 0;

            if(id == 0)
                return BadRequest();
            
            try
            {
                result = await _context.DeleteBookAsync(id);

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