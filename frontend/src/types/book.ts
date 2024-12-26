export interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    price: number;
    description?: string;
  }
  
  export interface BookSearchParams {
    title?: string;
    author?: string;
    genre?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }
  
  export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  export interface BookSearchResponse {
    success: boolean;
    data: {
      books: Book[];
      pagination: PaginationMeta;
    }
  }
  
  export interface Notification {
    type: string;
    data: Book;
    timestamp: Date;
  }
  