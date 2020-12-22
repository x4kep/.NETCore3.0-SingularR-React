import http from "./http-common.js";

const getAuthorsAsync = () => {
  return http.get(`/Author`);
};

const getAuthorAsync = id => {
  return http.get(`/Author/${id}`);
};

const deleteAuthorAsync = id => {
  return http.delete(`/Author/${id}`);
};

const createAuthorAsync = (data) => {
  var formData = new FormData();
  formData.append('name', data.name);

  return http.post("/Author", formData);
};

const updateAuthorAsync = (data) => {
  var formData = new FormData();
  formData.append('id', data.id);
  formData.append('name', data.name);
  formData.append('createdDate', data.createdDate);

  return http.post(`/Author/${data.id}`, formData);
};


export default {
  getAuthorsAsync,
  getAuthorAsync,
  createAuthorAsync,
  updateAuthorAsync,
  deleteAuthorAsync
};