import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import { AuthorDto } from "../../ModelsDTO/Authors.js";
import AuthorService from "../../services/AuthorService.js";

const AuthorEdit: React.FC = () => {
  const [author, setAuthor] = useState<AuthorDto>({ name: "" } as AuthorDto);
  const [authorNameError, setAuthorNameError] = useState("");

  let { id }: any = useParams();
  let history = useHistory();

  useEffect(() => {
    getAuthor();
  }, []);

  const getAuthor = () => {
    AuthorService.getAuthorAsync(id).then(response => {
      setAuthor(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  const updateAuthor = () => {
    if (!author.name) { setAuthorNameError("Client error model is not valid."); return; }

    AuthorService.updateAuthorAsync(author).then(response => {
      history.push("/Authors");
    }).catch(e => {
      if (e.response.status === 400) {
        setAuthorNameError("Server error model is not valid.");
      }
      console.log(e);
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
      <h3>Author edit</h3>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={author.name}
            onChange={e => handleInputChange(e)}
          ></input>
          <div className="invalid-feedback" style={(authorNameError) ? { display: 'block' } : { display: 'none' }} >
            {authorNameError}
          </div>
        </div>
      </form>
      <Link to={"/Authors"} className="btn btn-primary mt-3" role="button">Go Back</Link>
      <button className="btn btn-primary  float-right mt-3" role="button" onClick={updateAuthor}>Save</button>
    </div>
  );
}

export default AuthorEdit;

