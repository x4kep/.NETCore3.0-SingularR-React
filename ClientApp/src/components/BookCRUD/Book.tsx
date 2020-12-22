import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import BookService from "../../services/BookService.js"
import { BookDto } from '../../ModelsDTO/Book'
import { Link } from "react-router-dom";
import AuthorService from "../../services/AuthorService.js";
import { AuthorDto } from "../../ModelsDTO/Authors.js";

const Book: React.FC = () => {
  const [book, setBook] = useState<BookDto>({ name: "" } as BookDto);
  const [authors, setAuthors] = useState<AuthorDto[]>();
  const [bookBooks, setBookBooks] = useState<BookDto[]>();

  let { id }: any = useParams();

  useEffect(() => {
    getBook();
    getAuthors();
  }, []);

  const getBook = () => {
    BookService.getBookAsync(id).then(response => {
      setBook(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const getAuthors = () => {
    AuthorService.getAuthorsAsync().then(response => {
      setAuthors(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <div>
      <h3>Book view</h3>
      <div>
        <div className="group-name">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={book && book.name || ''}
            readOnly
          ></input>
        </div>
        <div className="group-name">
          <label htmlFor="author">Author</label>
          <select name="author" className="form-control" value= {book.authorId} disabled>
            {authors && authors.map((item, key) => (
              <option key={key} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>
      <Link to={"/Books"} className="btn btn-primary mt-3" role="button">Go Back</Link>
    </div>
  );
}

export default Book;

