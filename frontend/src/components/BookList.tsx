import React from 'react';
import { Book, PaginationMeta } from '@/types/book';

interface BookListProps {
  books: Book[];
  pagination?: PaginationMeta;
  onPageChange: (page: number) => void;
}

const BookList: React.FC<BookListProps> = ({ 
  books, 
  pagination, 
  onPageChange 
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div 
            key={book._id} 
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-1">Author: {book.author}</p>
            <p className="text-gray-600 mb-1">Genre: {book.genre}</p>
            <p className="text-blue-600 font-semibold">
              Price: \${book.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {pagination && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded 
              disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded 
              disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList;
