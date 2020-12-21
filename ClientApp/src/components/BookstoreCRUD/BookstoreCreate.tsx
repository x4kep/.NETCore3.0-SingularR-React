import React, { useState } from "react";
import { useHistory } from 'react-router';
import BookstoreService from "../../services/BookstoreService.js"
import { BookstoreDto } from '../../ModelsDTO/Bookstore'
import { Link } from "react-router-dom";

const BookstoreCreate: React.FC = () => {
  const [bookstore, setBookstore] = useState({} as BookstoreDto);

  let history = useHistory();

  const createBookstore = () => {
    BookstoreService.createBookstoreAsync(bookstore).then(response => {
      history.push("/");
    }).catch(e => {
      console.log(e);
    });
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setBookstore({ ...bookstore, [name]: value });
  };

  return (
    <div>
      <h3>Bookstore create</h3>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          onChange={handleInputChange}
        ></input>
      </form>
      <Link to={"/"} className="btn btn-primary mt-3" role="button">Go Back</Link>
      <a className="btn btn-primary float-right mt-3" role="button" onClick={createBookstore}>Create</a>
    </div>
  );
}

export default BookstoreCreate;

