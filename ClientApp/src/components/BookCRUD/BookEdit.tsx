import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import BookService from "../../services/BookService.js"
import { BookDto } from '../../ModelsDTO/Book'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import { AuthorDto } from "../../ModelsDTO/Authors.js";
import AuthorService from "../../services/AuthorService.js";

const BookEdit: React.FC = () => {
  const [book, setBook] = useState({} as BookDto);
  const [authors, setAuthors] = useState<AuthorDto[]>();
  const [bookNameError, setBookNameError] = useState("");

  let { id }: any = useParams();
  let history = useHistory();

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

  const updateBook = () => {
    if (!book.name) { setBookNameError("Client error model is not valid."); return; }

    BookService.updateBookAsync(book).then(response => {
      history.push("/Books");
    }).catch(e => {
      if (e.response.status === 400) {
        setBookNameError("Server error model is not valid.");
      }
      console.log(e);
    });
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
    if (!value) {
      setBookNameError("Client error model is not valid.");
    } else {
      setBookNameError("");
    }
  };

  const handleSelectChange = (e: any) => {
    let authorId = Number(e.target.value);
    console.log(e);
    setBook({ ...book, authorId: authorId });
  };

  return (
    <div>
      <h3>Book edit</h3>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={book.name}
            onChange={e => handleInputChange(e)}
          ></input>
          <div className="invalid-feedback" style={(bookNameError) ? { display: 'block' } : { display: 'none' }} >
            {bookNameError}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <select name="author" className="form-control" onChange={handleSelectChange} value={book.authorId}>
            {authors && authors.map((item, key) => (
              <option key={key} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </form>
      <Link to={"/Books"} className="btn btn-primary mt-3" role="button">Go Back</Link>
      <button className="btn btn-primary  float-right mt-3" role="button" onClick={updateBook}>Save</button>
    </div>
  );
}

export default BookEdit;

