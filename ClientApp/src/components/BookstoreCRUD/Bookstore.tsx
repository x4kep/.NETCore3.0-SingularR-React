import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import * as signalR from "@microsoft/signalr";
import BookstoreService from "../../services/BookstoreService.js"
import { BookstoreDto } from '../../ModelsDTO/Bookstore'
import { Link } from "react-router-dom";
import { BookstoreBooksHubDto } from "../../ModelsDTO/BookstoreBooksHubDto.js";

const Bookstore: React.FC = () => {
  const [bookstore, setBookstore] = useState<BookstoreDto>();
  const [bookstoreBooks, setBookstoreBooks] = useState<BookstoreDto[]>();

  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/bookstorebooks")
    .withAutomaticReconnect()
    .build();

  hubConnection.start();

  let { id }: any = useParams();

  useEffect(() => {
    getBookstore();
    getBookstoreBooks();
    getBookstoreBooksHub();
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

  const getBookstoreBooksHub = () => {
    hubConnection.on("notifyBookstoreChanges", (message: BookstoreBooksHubDto) => {
      setBookstoreBooks(message.bookstoreBooks);
      console.log(message);
      if (message.bookstoreId === Number(id)) {
        setBookstoreBooks(message.bookstoreBooks);
      }
    })
  }

  return (
    <div>
      <h3>Bookstore view</h3>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={bookstore && bookstore.name || ''}
          readOnly
        ></input>
      </div>
      <h5 className="mt-3">Books</h5>
      {(bookstoreBooks != undefined && bookstoreBooks.length > 0) ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {bookstoreBooks.map((bookstoreBooks, index) => (
              <tr key={index}>
                <td className="align-middle" style={{ width: "80%" }}>{bookstoreBooks.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
          <p>No books</p>
        )}
      <Link to={"/"} className="btn btn-primary mt-3" role="button">Go Back</Link>
    </div>
  );
}

export default Bookstore;

