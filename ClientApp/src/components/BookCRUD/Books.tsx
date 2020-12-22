import React, { useState, useEffect } from "react";
import BookService from "../../services/BookService.js"
import { BookDto } from '../../ModelsDTO/Book'
import { Link } from "react-router-dom";

const Books: React.FC = () => {
  const [book, setBooks] = useState<BookDto[]>();

  useEffect(() => {
    getBook();
  }, []);

  const getBook = () => {
    BookService.getBooksAsync().then(response => {
      setBooks(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const deleteBook = (event: any) => {
    let bookId = Number(event.target.dataset.bookid);
    let bookName = event.target.dataset.bookname;
    let answer = window.confirm(`Delete ` + bookName + ` are you sure? `)

    if (answer) {
      BookService.deleteBookAsync(bookId).then(response => {
        console.log(response.data);
        getBook();
      }).catch(e => {
        console.log(e);
      });
    }

  }

  return (
    <div>
      <h3>Books</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">CreatedAt</th>
            <th scope="col">UpdatedAt</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {book && book.map((item, index) => (
            <tr key={index}>
              <td className="align-middle">{item.id}</td>
              <td className="align-middle">{item.name}</td>
              <td className="align-middle">{item.createdDate}</td>
              <td className="align-middle">{item.updatedDate}</td>
              <td>
                <a className="btn btn-outline-danger ml-3" role="button" data-bookid={item.id} data-bookname={item.name} onClick={deleteBook} >Delete</a>
                <Link to={"/Book/" + item.id} className="btn btn-outline-primary ml-3" role="button">View</Link>
                <Link to={"/BookEdit/" + item.id} className="btn btn-primary ml-3" role="button">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/BookCreate"} className="btn btn-primary ml-3 mt-3 float-right" role="button">Create</Link>
    </div>
  );
}

export default Books;

