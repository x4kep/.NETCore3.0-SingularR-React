import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { RouteComponentProps, useParams } from 'react-router';
import * as signalR from "@microsoft/signalr";
import BookstoreService from "../../services/BookstoreService.js"
import { BookstoreDto } from '../../ModelsDTO/Bookstore'
import { Link } from "react-router-dom";

const BookstoreEdit: React.FC = () => {
  const [bookstore, setBookstore] = useState<BookstoreDto>();
  const [bookstoreBooks, setBookstoreBooks] = useState<BookstoreDto[]>();
  const [notBookstoreBooks, setNotBookstoreBooks] = useState<BookstoreDto[]>();
  const [name, setName] = useState('');

  let { id }: any = useParams();

  useEffect(() => {
    getBookstore();
    getBookstoreBooks();
    getNotBookstoreBooks();
  }, []);

  const getBookstore = () => {
    BookstoreService.getBookstoreAsync(id).then(response => {
      setBookstore(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const getBookstoreBooks = () => {
    BookstoreService.getBookstoreBooksAsync(id).then(response => {
      setBookstoreBooks(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const getNotBookstoreBooks = () => {
    BookstoreService.getNotBookstoreBooksAsync(id).then(response => {
      setNotBookstoreBooks(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const addBookBookstore = (event: any) => {
    let bookId = Number(event.target.dataset.bookid);
    let bookstoreId = Number(id);

    BookstoreService.addBookstoreBooksAsync(bookId, bookstoreId).then(response => {
      //TODO: Move locally
      getBookstoreBooks();
      getNotBookstoreBooks();
    }).catch(e => {
      console.log(e);
    });
  }

  const removeBookBookstore = (event: any) => {
    let bookId = Number(event.target.dataset.bookid);
    let bookstoreId = Number(id);

    BookstoreService.removeBookstoreBooksAsync(bookId, bookstoreId).then(response => {
      //TODO: Move locally
      getBookstoreBooks();
      getNotBookstoreBooks();
    }).catch(e => {
      console.log(e);
    });
  }

  const onChangeBookstoreName = (input: string) => {
    setName(input);
    console.log(input);
  }

  return (
    <div>
      <h3>Bookstore edit</h3>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={bookstore && bookstore.name}
          onChange={e => onChangeBookstoreName(e.target.value)}
        ></input>
      </form>
      <h5 className="mt-3">Books</h5>
      {bookstoreBooks ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookstoreBooks.map((bookstoreBooks, index) => (
              <tr key={index}>
                <td className="align-middle" style={{ width: "80%" }}>{bookstoreBooks.name}</td>
                <td className="align-middle">
                  <a className="btn btn-outline-danger ml-3 mt-1" role="button" data-bookId={bookstoreBooks.id} onClick={removeBookBookstore}>Remove</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
          <p>No books</p>
      )}
      <h5 className="mt-3">Add books</h5>
      <form>
        <label htmlFor="searchBook">Search book</label>
        <input
          type="text"
          id="searchBook"
          name="searchBook"
          className="form-control"
          onChange={e => onChangeBookstoreName(e.target.value)}
        ></input>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {notBookstoreBooks && notBookstoreBooks.map((notBookstoreBooks, index) => (
            <tr key={index}>
              <td className="align-middle" style={{ width: "80%" }}>{notBookstoreBooks.name}</td>
              <td className="align-middle"><a className="btn btn-outline-success ml-3 mt-1" role="button" data-bookId={notBookstoreBooks.id} onClick={addBookBookstore}>Add</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/Bookstores"} className="btn btn-primary ml-3 mt-3" role="button">Go Back</Link>
      <a className="btn btn-primary ml-3 float-right mt-3" role="button">Save</a>
    </div>
  );
}

export default BookstoreEdit;

