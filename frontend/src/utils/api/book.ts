import axios , { AxiosError }  from 'axios';
import { BookSearchParams, BookSearchResponse, Book } from '../../types/book';

const API_BASE_URL = 'http://localhost:5000/api/books';

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


const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(
      error.response.data?.message || 
      'An error occurred while fetching data'
    );
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response received from server');
  } else {
    // Something happened in setting up the request
    throw new Error('Error setting up the request');
  }
};


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

  getPopularAuthors: async (
    params: { 
      limit?: number; 
      minBooks?: number 
    } = {}
  ): Promise<PopularAuthor[]> => {
    const { 
      limit = 10, 
      minBooks = 1 
    } = params;

    const response = await axios.get(`${API_BASE_URL}/popular-authors`, {
      params: { limit, minBooks }
    });
    return response.data.data;
  },

  // New method to get books by author
  getBooksByAuthor: async (
    author: string, 
    params?: { 
      limit?: number; 
      page?: number 
    }
  ) => {
    const response = await axios.get(`${API_BASE_URL}/author-books/${author}`, {
      params
    });
    return response.data.data;
  }
};


