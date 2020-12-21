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
        Task<Book> GetBookAsync(int id);
        Task CreateBookAsync(Book bookstore);
        Task UpdateBookAsync(Book bookstore);
        Task<int> DeleteBookAsync(int bookstoreId);

        // CRUD Author
        Task<List<Author>> GetAuthorsAsync();
        Task<Author> GetAuthorAsync(int id);
        Task CreateAuthorAsync(Author bookstore);
        Task UpdateAuthorAsync(Author bookstore);
        Task<int> DeleteAuthorAsync(int bookstoreId);

        // Others
        Task<List<Book>> GetAuthorBooksAsync(int authorId);
        Task<AuthorBio> GetAuthorBioAsync(int authorId);
        Task <bool>AddBookBookstoreAsync(int bookId, int bookstoreId);
        Task <bool>RemoveBookBookstoreAsync(int bookId, int bookstoreId);
        Task<List<Book>> GetBookstoreBooksAsync(int bookstoreId);
        Task<List<Book>> GetNotBookstoreBooksAsync(int bookstoreId);

    }
}
