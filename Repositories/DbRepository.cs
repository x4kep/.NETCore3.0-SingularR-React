using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EuroDeskBookstoresAssigment.Models;
using EuroDeskBookstoresAssigment.Data;
using Microsoft.EntityFrameworkCore;

namespace EuroDeskBookstoresAssigment.Repositories
{
    public class DbRepository : IDbRepository
    {
        private DatabaseContext _context;
        public DbRepository(DatabaseContext context)
        {
            _context = context;
        }
        async public Task<List<Bookstore>> GetBookstoresAsync()
        {
            return await _context.Bookstore.Where(b => !b.IsDeleted).OrderByDescending(b => b.Id).ToListAsync();
        }

        async public Task<Bookstore> GetBookstoreAsync(int id)
        {
            return await _context.Bookstore.Where(b => b.Id == id && !b.IsDeleted).SingleOrDefaultAsync();
        }
        async public Task CreateBookstoreAsync(Bookstore bookstore)
        {
            bookstore.CreatedDate = DateTime.UtcNow;
            await _context.Bookstore.AddAsync(bookstore);
            await _context.SaveChangesAsync();
        }
        async public Task UpdateBookstoreAsync(Bookstore bookstore)
        {
            if(bookstore.Id > 0)
            {
                bookstore.UpdatedDate = DateTime.UtcNow;
                _context.Update(bookstore);
                await _context.SaveChangesAsync();
            }
        }

        async public Task<int> DeleteBookstoreAsync(int bookstoreId)
        {
            var result = 0;
            if (bookstoreId <= 0)
                return result;

            var bookstore = await _context.Bookstore.FirstOrDefaultAsync(b => b.Id == bookstoreId);

            if (bookstore != null)
            {
                bookstore.IsDeleted = true;
                bookstore.UpdatedDate = DateTime.UtcNow;
                _context.Update(bookstore);
                await _context.SaveChangesAsync();
                result = 1;
            }
            return result;
        }

        async public Task<List<Book>> GetAuthorBooksAsync(int authorId)
        {
            return await _context.Book.Where(b => b.AuthorId == authorId).ToListAsync();
        }

        async public Task<AuthorBio> GetAuthorBioAsync(int authorId)
        {
            return await _context.AuthorBio.Where(ab => ab.AuthorId == authorId).SingleOrDefaultAsync();
        }

        async public Task<bool> AddBookBookstoreAsync(int bookId, int bookstoreId)
        {
            var result = false;
            if(bookId > 0 && bookstoreId > 0)
            {
                var book = await _context.Book.FirstOrDefaultAsync(b => b.Id == bookId);
                var bookstore = await _context.Bookstore.FirstOrDefaultAsync(b => b.Id == bookstoreId);

                if(book != null && bookstore != null)
                {
                    var bookBookstore = new BookBookstore
                    {
                        BookId = book.Id,
                        BookstoreId = bookstore.Id
                    };

                    _context.Add(bookBookstore);
                    await _context.SaveChangesAsync();
                    result = true;
                }
            }
            return result;
        }

        async public Task<bool> RemoveBookBookstoreAsync(int bookId, int bookstoreId)
        {
            var result = false;
            if (bookId > 0 && bookstoreId > 0)
            {
                var bookBookstore = await _context.BookBookstore.FirstOrDefaultAsync(bbs => bbs.BookId == bookId && bbs.BookstoreId == bookstoreId);
                if(bookBookstore != null)
                {
                    _context.Remove(bookBookstore);
                    await _context.SaveChangesAsync();
                    result = true;
                }
            }
            return result;
        }

        async public Task<List<Book>> GetBookstoreBooksAsync(int bookstoreId)
        {
            var result = new List<Book>();
            if (bookstoreId > 0)
                result = await _context.Book.Where(b => b.Bookstore.Any(bs => bs.BookstoreId == bookstoreId)).ToListAsync();
            return result;
        }

        async public Task<List<Book>> GetBooksAsync()
        {
            var result = new List<Book>();
            result = await _context.Book.Where(b => !b.IsDeleted).ToListAsync();
            return result;
        }

        async public Task<List<Book>> GetNotBookstoreBooksAsync(int bookstoreId)
        {
            var getBookstoreBooks = await GetBookstoreBooksAsync(bookstoreId);
            var getBooks = await GetBooksAsync();
            var diffrence = getBooks.Where(bb => !getBookstoreBooks.Any(b => b.Id == bb.Id)).ToList();

            return diffrence;
        }
    }
}
