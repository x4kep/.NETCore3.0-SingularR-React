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
            CreateMap<Bookstore, BookstoreDto>();
            CreateMap<Book, BookDto>();
            CreateMap<Author, AuthorDto>();
            CreateMap<AuthorBio, AuthorBioDto>();
            CreateMap<BookstoreDto, Bookstore >();
            CreateMap<BookDto, Book>();
            CreateMap<AuthorDto, Author>();
            CreateMap<AuthorBioDto, AuthorBio>();
        }
    }
}
