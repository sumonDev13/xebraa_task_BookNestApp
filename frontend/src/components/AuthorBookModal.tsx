'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookService } from '@/utils/api/book';
import { Book } from '@/types/book';

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

interface AuthorBookModalProps {
  author: string;
  onClose: () => void;
}

export function AuthorBookModal({ author, onClose }: AuthorBookModalProps) {
  const { 
    data: authorBooks, 
    isLoading, 
    error 
  } = useQuery<Book[]>({
    queryKey: ['authorBooks', author],
    queryFn: () => bookService.getBooksByAuthor(author)
  });

  if (isLoading) return <div>Loading books...</div>;
  if (error) return <div>Error loading books</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{author}'s Books</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900"
          >
            Close
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {authorBooks?.map(book => (
            <div 
              key={book.id} 
              className="border rounded-lg p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">Price: \${book.price}</p>
              <p className="text-sm text-gray-500">Genre: {book.genre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
