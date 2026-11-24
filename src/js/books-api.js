import axios from 'axios';

axios.defaults.baseURL = 'https://books-backend-v2.b.goit.study';

export async function getCategories() {
  const { data } = await axios.get('/books/category-list');
  return data;
}

export async function getTopBooks() {
  const { data } = await axios.get('/books/top-books');
  return data;
}

export async function getBooksByCategory(category) {
  const { data } = await axios.get('/books/category', {
    params: { category },
  });
  return data;
}

export async function getBookById(id) {
  const { data } = await axios.get(`/books/${id}`);
  return data;
}
