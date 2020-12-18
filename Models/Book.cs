using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EuroDeskBookstoresAssigment.Models
{
    public class Book
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset UpdatedDate { get; set; }

        public bool IsDeleted { get; set; }

        // Many to many
        public Book()
        {
            this.Bookstore = new HashSet<BookBookstore>();
        }
        public virtual ICollection<BookBookstore> Bookstore { get; set; }

        // Many to one
        public Author Author { get; set; }
        public int AuthorId { get; set; }

    }
}
