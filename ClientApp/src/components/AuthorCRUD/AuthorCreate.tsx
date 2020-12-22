import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import { AuthorDto } from "../../ModelsDTO/Authors.js";
import AuthorService from "../../services/AuthorService.js"

const AuthorCreate: React.FC = () => {
  const [author, setAuthor] = useState({ name: "" } as AuthorDto);
  const [authorNameError, setAuthorNameError] = useState("");

  let history = useHistory();

  useEffect(() => {
    
  }, []);

  const createAuthor = () => {
    if (!author.name) { setAuthorNameError("Client error model is not valid."); return; }

    AuthorService.createAuthorAsync(author).then(response => {
      history.push("/Authors");
    }).catch(e => {
      if (e.response.status === 400) {
        setAuthorNameError("Server error model is not valid.");
      }
    });
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setAuthor({ ...author, [name]: value });
    if (!value) {
      setAuthorNameError("Client error model is not valid.");
    } else {
      setAuthorNameError("");
    }
  };

  return (
    <div>
      <h3>Author create</h3>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={author.name}
            onChange={handleInputChange}
          ></input>
          <div className="invalid-feedback" style={(authorNameError) ? { display: 'block' } : { display: 'none' }} >
            {authorNameError}
          </div>
        </div>
      </form>
      <Link to={"/Authors"} className="btn btn-primary mt-3" role="button">Go Back</Link>
      <button className="btn btn-primary float-right mt-3" role="button" onClick={createAuthor}>Create</button>
    </div>
  );
}

export default AuthorCreate;

