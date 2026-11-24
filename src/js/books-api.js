import axios from 'axios';

const api = axios.create({
  baseURL: 'https://books-backend.p.goit.global',
});

export const getCategories = async () => {
  const books = await api.get('/books/category-list');
  return books.data;
};

export const getTopBooks = async () => {
  const books = await api.get('/books/top-books');
  return books.data;
};

export const getBooksByCategory = async (category) => {
  const books = await api.get('/books/category', {
    params: {
      category,
    },
  });
  return books.data;
};

export const getBookgitId = async (id) => {
  const book = await api.get(`/books/${id}`);
  return book.data;
};
