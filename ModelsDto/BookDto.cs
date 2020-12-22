using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EuroDeskBookstoresAssigment.Models;

namespace EuroDeskBookstoresAssigment.ModelsDto
{
    public class BookDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset UpdatedDate { get; set; }

        public bool IsDeleted { get; set; }

        public int AuthorId { get; set; }

    }
}
