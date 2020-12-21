using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EuroDeskBookstoresAssigment.Models;
using EuroDeskBookstoresAssigment.ModelsDto;
using EuroDeskBookstoresAssigment.Repositories;
using EuroDeskBookstoresAssigment.Hubs;
using Microsoft.AspNetCore.SignalR;
using AutoMapper;

namespace EuroDeskBookstoresAssigment.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UtilityController : ControllerBase
    {
        private readonly ILogger<UtilityController> _logger;
        private readonly IDbRepository _context;
        protected readonly IHubContext<BookstoreHub> _bookstoreHub;
        private readonly IMapper _mapper;

        public UtilityController(ILogger<UtilityController> logger, IDbRepository context, IHubContext<BookstoreHub> bookstoreHub, IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _bookstoreHub = bookstoreHub;
            _mapper = mapper;
        }

        // GET: api/Utility/GetBookstoreBooks/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookstoreBooks(int id)
        {
            try
            {
                var bookstores = await _context.GetBookstoreBooksAsync(id);
                if (bookstores == null)
                    return NotFound();

                return Ok(bookstores);
            }
            catch(Exception e)
            {
                return BadRequest();
            }
        }

        // GET: api/Utility/GetBookstoreBooksNot/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNotBookstoreBooks(int id)
        {
            try
            {
                var bookstores = await _context.GetNotBookstoreBooksAsync(id);
                if (bookstores == null)
                    return NotFound();

                return Ok(bookstores);
            }
            catch (Exception e)
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

        // POST: api/Utility/AddBookBookstore?bookId=1&bookstoreId=3
        [HttpPost]
        public async Task<IActionResult> AddBookBookstore(int bookId, int bookstoreId)
        {
            try
            {
                var bookstores = await _context.AddBookBookstoreAsync(bookId, bookstoreId);
                if (bookstores == false)
                    return BadRequest();

                var bookstorebooks = await _context.GetBookstoreBooksAsync(bookstoreId);
                var bookstoreBooksHubDto = new BookstoreBooksHubDto { BookstoreBooks = _mapper.Map<List<BookDto>>(bookstorebooks), BookstoreId = bookstoreId };

                await _bookstoreHub.Clients.All.SendAsync("notifyBookstoreChanges", bookstoreBooksHubDto);

                return Ok(bookstores);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // POST: api/Utility/RemoveBookBookstore?bookId=1&bookstoreId=3
        [HttpPost]
        public async Task<IActionResult> RemoveBookBookstore(int bookId, int bookstoreId)
        {
            try
            {
                var bookstores = await _context.RemoveBookBookstoreAsync(bookId, bookstoreId);
                if (bookstores == false)
                    return BadRequest();

                var bookstorebooks = await _context.GetBookstoreBooksAsync(bookstoreId);
                var bookstoreBooksHubDto = new BookstoreBooksHubDto { BookstoreBooks = _mapper.Map<List<BookDto>>(bookstorebooks), BookstoreId = bookstoreId };

                await _bookstoreHub.Clients.All.SendAsync("notifyBookstoreChanges", bookstoreBooksHubDto);

                return Ok(bookstores);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> SignalR([FromBody]MessageDto message)
        {
            await _bookstoreHub.Clients.All.SendAsync("sendToReact", "The message '" + message.Message + "' has been received");
            return Ok();
        }

    }
}
