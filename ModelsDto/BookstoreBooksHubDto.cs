using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EuroDeskBookstoresAssigment.Models;
using EuroDeskBookstoresAssigment.ModelsDto;

namespace EuroDeskBookstoresAssigment.ModelsDto
{
    public class BookstoreBooksHubDto
    {
        public List<BookDto> BookstoreBooks { get; set; }
        public int BookstoreId { get; set; }
    }
}
