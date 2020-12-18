using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EuroDeskBookstoresAssigment.Models
{
    public class AuthorBio
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset UpdatedDate { get; set; }

        public bool IsDeleted { get; set; }

        // One to one
        public int AuthorId { get; set; }
        public Author Author { get; set; }
    }
}
