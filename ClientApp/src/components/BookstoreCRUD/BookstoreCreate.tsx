import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import * as signalR from "@microsoft/signalr";
import BookstoreService from "../../services/BookstoreService.js"
import { BookstoreDto } from '../../ModelsDTO/Bookstore'
import { Link } from "react-router-dom";

const BookstoreCreate: React.FC = () => {
  const [bookstore, setBookstore] = useState({} as BookstoreDto);

  let history = useHistory();

  const createBookstore = () => {
    BookstoreService.createBookstoreAsync(bookstore).then(response => {
      history.push("/Bookstores");
    }).catch(e => {
      console.log(e);
    });
  }

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setBookstore({...bookstore, [name]: value});
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
      <Link to={"/Bookstores"} className="btn btn-primary ml-3 mt-3" role="button">Go Back</Link>
      <a className="btn btn-primary ml-3 float-right mt-3" role="button" onClick={createBookstore}>Create</a>
    </div>
  );
}

export default BookstoreCreate;

