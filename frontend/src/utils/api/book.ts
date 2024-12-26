import axios from 'axios';
import { BookSearchParams, BookSearchResponse, Book } from '../../types/book';

const API_BASE_URL = 'http://localhost:5000/api/books';

export const bookService = {
  searchBooks: async (params: BookSearchParams): Promise<BookSearchResponse> => {
    const response = await axios.get(`${API_BASE_URL}/search`, { params });
    return response.data;
  },

  addBook: async (bookData: Partial<Book>): Promise<Book> => {
    const response = await axios.post(`${API_BASE_URL}/add`, bookData);
    return response.data.data;
  },

  getAveragePriceByGenre: async (genre: string) => {
    const response = await axios.get(`${API_BASE_URL}/average-price`, { params: { genre } });
    return response.data.data;
  },

  getPopularAuthors: async () => {
    const response = await axios.get(`${API_BASE_URL}/popular-authors`);
    return response.data.data;
  }
};
