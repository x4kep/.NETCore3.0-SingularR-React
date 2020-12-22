import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import AuthorService from "../../services/AuthorService.js";
import { AuthorDto } from "../../ModelsDTO/Authors.js";
import { BookDto } from "../../ModelsDTO/Book.js";

const Author: React.FC = () => {
  const [author, setAuthor] = useState<AuthorDto>({ name: "" } as AuthorDto);
  const [authorBio, setAuthorBio] = useState<string>("");
  const [authorBooks, setAutorBooks] = useState<BookDto[]>();

  let { id }: any = useParams();

  // Refa: We can merge tables on backend.
  useEffect(() => {
    getAuthor();
    getAuthorBio();
    getAuthorBooks();
  }, []);

  const getAuthor = () => {
    AuthorService.getAuthorAsync(id).then(response => {
      setAuthor(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const getAuthorBio = () => {
    AuthorService.getAuthorBioAsync(id).then(response => {
      setAuthorBio(response.data.name);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const getAuthorBooks = () => {
    AuthorService.getAuthorBooksAsync(id).then(response => {
      setAutorBooks(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <div>
      <h3>Author view</h3>
      <div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={author && author.name || ''}
            readOnly
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="authorBiography">Author biography</label>
          <textarea className="form-control" id="authorBiography" readOnly value={authorBio}></textarea>
        </div>
        <div className="form-group">
          {(authorBooks != undefined && authorBooks.length > 0) ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                {authorBooks.map((authorBooks, index) => (
                  <tr key={index}>
                    <td className="align-middle" style={{ width: "80%" }}>{authorBooks.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
              <p>No books</p>
            )}
        </div>
      </div>
      <Link to={"/authors"} className="btn btn-primary mt-3" role="button">Go Back</Link>
    </div>
  );
}

export default Author;

