import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import AuthorService from "../../services/AuthorService.js"
import BookService from "../../services/BookService.js"
import { BookDto } from '../../ModelsDTO/Book'
import { AuthorDto } from "../../ModelsDTO/Authors.js";


const BookCreate: React.FC = () => {
  const [book, setBook] = useState({ name: ""} as BookDto);
  const [authors, setAuthors] = useState<AuthorDto[]>();
  const [bookNameError, setBookNameError] = useState("");

  let history = useHistory();

  useEffect(() => {
    getAuthors();
  }, []);

  const getAuthors = () => {
    AuthorService.getAuthorsAsync().then(response => {
      setAuthors(response.data);
      setBook({ ...book, authorId: response.data[0].id});
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const createBook = () => {
    if (!book.name) { setBookNameError("Client error model is not valid."); return; }

    BookService.createBookAsync(book).then(response => {
      history.push("/Books");
    }).catch(e => {
      if (e.response.status === 400) {
        setBookNameError("Server error model is not valid.");
      }
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
      <h3>Book create</h3>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={book.name}
            onChange={handleInputChange}
          ></input>
          <div className="invalid-feedback" style={(bookNameError) ? { display: 'block' } : { display: 'none' }} >
            {bookNameError}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <select name="author" className="form-control" value={authors && authors[0].id} onChange={handleSelectChange}>
            {authors && authors.map((item, key) => (
              <option key={key} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </form>
      <Link to={"/Books"} className="btn btn-primary mt-3" role="button">Go Back</Link>
      <button className="btn btn-primary float-right mt-3" role="button" onClick={createBook}>Create</button>
    </div>
  );
}

export default BookCreate;

