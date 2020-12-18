using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EuroDeskBookstoresAssigment.Models;

namespace EuroDeskBookstoresAssigment.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<Bookstore> Bookstore { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<BookBookstore> BookBookstore { get; set; }
        public DbSet<Author> Author { get; set; }
        public DbSet<AuthorBio> AuthorBio { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=sqlitebookstores.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bookstore>().ToTable(nameof(Bookstore));
            modelBuilder.Entity<Book>().ToTable(nameof(Book));
            modelBuilder.Entity<Bookstore>().ToTable(nameof(Bookstore));
            modelBuilder.Entity<BookBookstore>().HasKey(i => new { i.BookId, i.BookstoreId });  // Composite Key
            modelBuilder.Entity<Author>().ToTable(nameof(Author));
            modelBuilder.Entity<AuthorBio>().ToTable(nameof(AuthorBio));
        }
    }
}
