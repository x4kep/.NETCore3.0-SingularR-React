using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EuroDeskBookstoresAssigment.Models;
using EuroDeskBookstoresAssigment.ModelsDto;

namespace EuroDeskBookstoresAssigment.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Book, BookDto>();
        }
    }
}
