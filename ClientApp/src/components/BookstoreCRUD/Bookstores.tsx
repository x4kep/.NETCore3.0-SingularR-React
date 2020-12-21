import React, { useState, useEffect } from "react";
import BookstoreService from "../../services/BookstoreService.js"
import { BookstoreDto } from '../../ModelsDTO/Bookstore'
import { Link } from "react-router-dom";

const Bookstores: React.FC = () => {
  const [bookstore, setBookstores] = useState<BookstoreDto[]>();

  useEffect(() => {
    getBookstore();
  }, []);

  const getBookstore = () => {
    BookstoreService.getBookstoresAsync().then(response => {
      setBookstores(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <div>
      <h3>Bookstore</h3>
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
          {bookstore && bookstore.map((item, index) => (
            <tr key={index}>
              <td className="align-middle">{item.id}</td>
              <td className="align-middle">{item.name}</td>
              <td className="align-middle">{item.createdDate}</td>
              <td className="align-middle">{item.updatedDate}</td>
              <td>
                <a className="btn btn-outline-danger ml-3" role="button">Delete</a>
                <Link to={"/Bookstore/" + item.id} className="btn btn-outline-primary ml-3" role="button">View</Link>
                <Link to={"/BookstoreEdit/" + item.id} className="btn btn-primary ml-3" role="button">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/BookstoreCreate"} className="btn btn-primary ml-3 mt-3 float-right"  role="button">Create</Link>
    </div>
  );
}

export default Bookstores;

