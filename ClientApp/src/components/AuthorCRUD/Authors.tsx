import React, { useState, useEffect } from "react";
import AuthorService from "../../services/AuthorService.js"
import { Link } from "react-router-dom";
import { AuthorDto } from "../../ModelsDTO/Authors.js";

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<AuthorDto[]>();

  useEffect(() => {
    getAuthors();
  }, []);

  const getAuthors = () => {
    AuthorService.getAuthorsAsync().then(response => {
      setAuthors(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const deleteAuthor = (event: any) => {
    let authorId = Number(event.target.dataset.authorid);
    let authorName = event.target.dataset.authorname;
    let answer = window.confirm(`Delete ` + authorName + ` are you sure? `)

    if (answer) {
      AuthorService.deleteAuthorAsync(authorId).then(response => {
        console.log(response.data);
        getAuthors();
      }).catch(e => {
        console.log(e);
      });
    }
  }

  return (
    <div>
      <h3>Authors</h3>
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
          {authors && authors.map((item, index) => (
            <tr key={index}>
              <td className="align-middle">{item.id}</td>
              <td className="align-middle">{item.name}</td>
              <td className="align-middle">{item.createdDate}</td>
              <td className="align-middle">{item.updatedDate}</td>
              <td>
                <a className="btn btn-outline-danger ml-3" role="button" data-Authorid={item.id} data-authorname={item.name} onClick={deleteAuthor} >Delete</a>
                <Link to={"/Author/" + item.id} className="btn btn-outline-primary ml-3" role="button">View</Link>
                <Link to={"/AuthorEdit/" + item.id} className="btn btn-primary ml-3" role="button">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/AuthorCreate"} className="btn btn-primary ml-3 mt-3 float-right" role="button">Create</Link>
    </div>
  );
}

export default Authors;

