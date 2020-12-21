import http from "./http-common.js";

const getBookstoresAsync = () => {
  return http.get(`/Bookstore`);
};

const getBookstoreAsync = id => {
  return http.get(`/Bookstore/${id}`);
};

const deleteBookstoreAsync = id => {
  return http.delete(`/Bookstore/${id}`);
};

const createBookstoreAsync = (data) => {
  var formData = new FormData();
  formData.append('name', data.name);

  return http.post("/Bookstore", formData);
};

const updateBookstoreAsync = (data) => {
  var formData = new FormData();
  formData.append('id', data.id);
  formData.append('name', data.name);
  formData.append('createdDate', data.createdDate);

  return http.post(`/Bookstore/${data.id}`, formData);
};

const getBookstoreBooksAsync = (id) => {
  return http.get(`/Utility/GetBookstoreBooks/${id}`);
};

const getNotBookstoreBooksAsync = (id) => {
  return http.get(`/Utility/GetNotBookstoreBooks/${id}`);
};

const removeBookstoreBooksAsync = (bookId, bookstoreId) => {
  return http.post(`/Utility/RemoveBookBookstore?bookId=` + bookId + `&bookstoreId=` + bookstoreId);
};

const addBookstoreBooksAsync = (bookId, bookstoreId) => {
  return http.post(`/Utility/AddBookBookstore?bookId=` + bookId + `&bookstoreId=` + bookstoreId);
};

export default {
  getBookstoresAsync,
  getBookstoreAsync,
  createBookstoreAsync,
  updateBookstoreAsync,
  deleteBookstoreAsync,
  getBookstoreBooksAsync,
  getNotBookstoreBooksAsync,
  addBookstoreBooksAsync,
  removeBookstoreBooksAsync
};