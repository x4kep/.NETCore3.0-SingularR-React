using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EuroDeskBookstoresAssigment.Models;

namespace EuroDeskBookstoresAssigment.ModelsDto
{
    public class BookstoreBooksHubDto
    {
        public List<Book> BookstoreBooks { get; set; }
        public int BookstoreId { get; set; }
    }
}
