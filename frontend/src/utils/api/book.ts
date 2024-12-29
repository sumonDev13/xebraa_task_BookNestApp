import axios from "axios";
import { BookSearchParams, BookSearchResponse, Book } from "../../types/book";

const API_BASE_URL = "http://localhost:5000/api/books";

export interface PopularAuthor {
  author: string;
  bookCount: number;
  averagePrice: number;
  genres: string[];
}

export interface PopularAuthorsProps {
  limit?: number;
  minBooks?: number;
}

export const bookService = {
  searchBooks: async (
    params: BookSearchParams
  ): Promise<BookSearchResponse> => {
    const response = await axios.get(`${API_BASE_URL}/search`, { params });
    return response.data;
  },

  addBook: async (bookData: Partial<Book>): Promise<Book> => {
    const response = await axios.post(`${API_BASE_URL}/add`, bookData);
    return response.data.data;
  },

  getAveragePriceByGenre: async (genre: string) => {
    const response = await axios.get(`${API_BASE_URL}/average-price`, {
      params: { genre },
    });
    return response.data.data;
  },

  getPopularAuthors: async (
    params: {
      limit?: number;
      minBooks?: number;
    } = {}
  ): Promise<PopularAuthor[]> => {
    const { limit = 10, minBooks = 1 } = params;

    const response = await axios.get(`${API_BASE_URL}/popular-authors`, {
      params: { limit, minBooks },
    });
    return response.data.data;
  },

  // New method to get books by author
  getBooksByAuthor: async (
    author: string,
    params?: {
      limit?: number;
      page?: number;
    }
  ) => {
    const response = await axios.get(`${API_BASE_URL}/author-books/${author}`, {
      params,
    });
    return response.data.data;
  },
};
