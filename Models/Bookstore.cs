using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EuroDeskBookstoresAssigment.Models
{
    public class Bookstore
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset UpdatedDate { get; set; }

        public bool IsDeleted { get; set; }

        // Many to many
        public Bookstore()
        {
            this.Book = new HashSet<BookBookstore>();
        }
        public virtual ICollection<BookBookstore> Book { get; set; }

    }
}
