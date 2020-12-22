import React, { useState } from "react";
import { useHistory } from 'react-router';
import BookstoreService from "../../services/BookstoreService.js"
import { BookstoreDto } from '../../ModelsDTO/Bookstore'
import { Link } from "react-router-dom";

const BookstoreCreate: React.FC = () => {
  const [bookstore, setBookstore] = useState({ name: "" } as BookstoreDto);
  const [bookstoreNameError, setBookstoreNameError] = useState("");

  let history = useHistory();

  const createBookstore = () => {
    if (!bookstore.name) { setBookstoreNameError("Client error model is not valid."); return; }

    BookstoreService.createBookstoreAsync(bookstore).then(response => {
      history.push("/");
    }).catch(e => {
      if (e.response.status === 400) {
        setBookstoreNameError("Server error model is not valid.");
      }
    });
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setBookstore({ ...bookstore, [name]: value });
    if (!value) {
      setBookstoreNameError("Client error model is not valid.");
    } else {
      setBookstoreNameError("");
    }
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
          value={bookstore.name}
          onChange={handleInputChange}
        ></input>
        <div className="invalid-feedback" style={(bookstoreNameError) ? { display: 'block' } : { display: 'none' }} >
          {bookstoreNameError}
        </div>
      </form>
      <Link to={"/"} className="btn btn-primary mt-3" role="button">Go Back</Link>
      <button className="btn btn-primary float-right mt-3" role="button" onClick={createBookstore}>Create</button>
    </div>
  );
}

export default BookstoreCreate;

