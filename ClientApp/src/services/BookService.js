import http from "./http-common.js";

const getBooksAsync = () => {
  return http.get(`/Book`);
};

const getBookAsync = id => {
  return http.get(`/Book/${id}`);
};

const deleteBookAsync = id => {
  return http.delete(`/Book/${id}`);
};

const createBookAsync = (data) => {
  var formData = new FormData();
  formData.append('name', data.name);
  formData.append('authorId', data.id);

  return http.post("/Book", formData);
};

const updateBookAsync = (data) => {
  var formData = new FormData();
  formData.append('id', data.id);
  formData.append('name', data.name);
  formData.append('createdDate', data.createdDate);
  formData.append('authorId', data.id);

  return http.post(`/Book/${data.id}`, formData);
};

export default {
  getBooksAsync,
  getBookAsync,
  createBookAsync,
  updateBookAsync,
  deleteBookAsync
};