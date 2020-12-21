import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import BookstoreService from "../../services/BookstoreService.js"
import { BookstoreDto } from '../../ModelsDTO/Bookstore'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';

const BookstoreEdit: React.FC = () => {
  const [bookstore, setBookstore] = useState({} as BookstoreDto);
  const [bookstoreBooks, setBookstoreBooks] = useState<BookstoreDto[]>();
  const [notBookstoreBooks, setNotBookstoreBooks] = useState<BookstoreDto[]>();
  const [bookstoreName, setBookstoreName] = useState("");

  let { id }: any = useParams();
  let history = useHistory();

  useEffect(() => {
    getBookstore();
    getBookstoreBooks();
    getNotBookstoreBooks();
  }, []);

  const getBookstore = () => {
    BookstoreService.getBookstoreAsync(id).then(response => {
      setBookstore(response.data);
      setBookstoreName(response.data.name);
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

  const updateBookstore = () => {
    BookstoreService.updateBookstoreAsync(bookstore).then(response => {
      history.push("/");
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

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setBookstore({ ...bookstore, [name]: value });
    setBookstoreName(value);
  };

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
          value={bookstoreName}
          onChange={e => handleInputChange(e)}
        ></input>
      </form>
      <h5 className="mt-3">Books</h5>
      { (bookstoreBooks != undefined && bookstoreBooks.length > 0) ? (
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
                  <a className="btn btn-outline-danger ml-3 mt-1" role="button"  data-bookid={bookstoreBooks.id} onClick={removeBookBookstore}>Remove</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
          <p>No books</p>
      )}
      <h5 className="mt-3">Add books</h5>
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
              <td className="align-middle"><a className="btn btn-outline-success ml-3 mt-1" role="button" data-bookid={notBookstoreBooks.id} onClick={addBookBookstore}>Add</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/"} className="btn btn-primary mt-3" role="button">Go Back</Link>
      <button className="btn btn-primary  float-right mt-3" role="button" onClick={updateBookstore}>Save</button>
    </div>
  );
}

export default BookstoreEdit;

