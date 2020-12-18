using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EuroDeskBookstoresAssigment.Models
{
    public class BookBookstore
    {
        public int BookId { get; set; }
        public Book Book { get; set; }

        public int BookstoreId { get; set; }
        public Bookstore Bookstore { get; set; }
    }
}
