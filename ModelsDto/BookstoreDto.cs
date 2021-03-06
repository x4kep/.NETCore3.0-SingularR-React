﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EuroDeskBookstoresAssigment.Models;

namespace EuroDeskBookstoresAssigment.ModelsDto
{
    public class BookstoreDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset UpdatedDate { get; set; }

        public bool IsDeleted { get; set; }

    }
}
