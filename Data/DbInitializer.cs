using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EuroDeskBookstoresAssigment.Data;
using EuroDeskBookstoresAssigment.Models;

namespace EuroDeskBookstoresAssigment.Data
{
    public static class DbInitializer
    {
        public static void Initialize(DatabaseContext context)
        {
            context.Database.EnsureCreated();

            #region Bookstore
            if (context.Bookstore.Any())
            {
                return;
            }

            var bookstores = new Bookstore[]
            {
                new Bookstore{ Name="Bookstore Vulkan", CreatedDate = DateTime.UtcNow },
                new Bookstore{ Name="Bookstore Delfi", CreatedDate = DateTime.UtcNow },
                new Bookstore{ Name="Bookstore Zvezdan", CreatedDate = DateTime.UtcNow }
            };

            foreach (Bookstore b in bookstores)
            {
                context.Bookstore.Add(b);
            }

            context.SaveChanges();
            #endregion

            #region Author
            if (context.Author.Any())
            {
                return;
            }

            var authors = new Author[]
            {
                new Author{ Name="Author 1", CreatedDate = DateTime.UtcNow },
                new Author{ Name="Author 2", CreatedDate = DateTime.UtcNow },
                new Author{ Name="Author 3", CreatedDate = DateTime.UtcNow },
                new Author{ Name="Author 4", CreatedDate = DateTime.UtcNow }
            };

            foreach (Author a in authors)
            {
                context.Author.Add(a);
            }

            context.SaveChanges();
            #endregion

            #region AuthorBio
            if (context.AuthorBio.Any())
            {
                return;
            }

            var authorBio = new AuthorBio[]
            {
                new AuthorBio{ Name="Author 1 biography", CreatedDate = DateTime.UtcNow, AuthorId = 1},
                new AuthorBio{ Name="Author 2 biography", CreatedDate = DateTime.UtcNow, AuthorId = 2 },
                new AuthorBio{ Name="Author 3 biography", CreatedDate = DateTime.UtcNow, AuthorId = 3 },
                new AuthorBio{ Name="Author 4 biography", CreatedDate = DateTime.UtcNow, AuthorId = 4 }
            };

            foreach (AuthorBio ab in authorBio)
            {
                context.AuthorBio.Add(ab);
            }

            context.SaveChanges();
            #endregion

            #region Book
            if (context.Book.Any())
            {
                return;
            }

            var books = new Book[]
            {
                new Book{ Name="Book 1", CreatedDate = DateTime.UtcNow, AuthorId = 1 },
                new Book{ Name="Book 2", CreatedDate = DateTime.UtcNow, AuthorId = 2 },
                new Book{ Name="Book 3", CreatedDate = DateTime.UtcNow, AuthorId = 3 },
                new Book{ Name="Book 4", CreatedDate = DateTime.UtcNow, AuthorId = 4 }
            };

            foreach (Book b in books)
            {
                context.Book.Add(b);
            }

            context.SaveChanges();
            #endregion
        }
    }
}
