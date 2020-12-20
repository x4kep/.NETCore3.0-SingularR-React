using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EuroDeskBookstoresAssigment.Models;

namespace EuroDeskBookstoresAssigment.Repositories
{
    public interface IDbRepository
    {
        // CRUD Bookstore
        Task<List<Bookstore>> GetBookstoresAsync();
        Task<Bookstore> GetBookstoreAsync(int bookstoreId);
        Task CreateBookstoreAsync(Bookstore bookstore);
        Task UpdateBookstoreAsync(Bookstore bookstore);
        Task<int> DeleteBookstoreAsync(int bookstoreId);

        // CRUD Book
        Task<List<Book>> GetBooksAsync();

        // Others
        Task<List<Book>> GetAuthorBooksAsync(int authorId);
        Task<AuthorBio> GetAuthorBioAsync(int authorId);
        Task <bool>AddBookBookstoreAsync(int bookId, int bookstoreId);
        Task <bool>RemoveBookBookstoreAsync(int bookId, int bookstoreId);
        Task<List<Book>> GetBookstoreBooksAsync(int bookstoreId);
        Task<List<Book>> GetNotBookstoreBooksAsync(int bookstoreId);

    }
}
