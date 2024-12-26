'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookService } from '@/utils/api/book';

interface BookFiltersProps {
  onAveragePriceFilter: (genre: string, maxPrice: number) => void;
  onPopularAuthorsFilter: (authors: string[]) => void;
}

const BookFilters: React.FC<BookFiltersProps> = ({ 
  onAveragePriceFilter, 
  onPopularAuthorsFilter 
}) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  // Fetch average price by genre
  const averagePriceQuery = useQuery({
    queryKey: ['averagePrice', selectedGenre],
    queryFn: () => bookService.getAveragePriceByGenre(selectedGenre),
    enabled: !!selectedGenre
  });

  // Fetch popular authors
  const popularAuthorsQuery = useQuery({
    queryKey: ['popularAuthors'],
    queryFn: () => bookService.getPopularAuthors()
  });

  const handleAveragePriceFilter = () => {
    if (averagePriceQuery.data) {
      const { averagePrice } = averagePriceQuery.data;
      onAveragePriceFilter(selectedGenre, averagePrice * 1.5); // Example: 1.5x average price
    }
  };

  const handlePopularAuthorsFilter = () => {
    onPopularAuthorsFilter(selectedAuthors);
  };

  const GENRES = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 
    'Fantasy', 'Mystery', 'Romance', 'Biography'
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Genre and Average Price Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Filter by Genre Price</h3>
          <div className="space-y-2">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Genre</option>
              {GENRES.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            {averagePriceQuery.data && (
              <div className="text-sm text-gray-600">
                Average Price: \${averagePriceQuery.data.averagePrice.toFixed(2)}
              </div>
            )}

            <button
              onClick={handleAveragePriceFilter}
              disabled={!selectedGenre}
              className="w-full bg-blue-500 text-white p-2 rounded 
              disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Filter by Average Price
            </button>
          </div>
        </div>

        {/* Popular Authors Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Filter by Popular Authors</h3>
          <div className="space-y-2">
            {popularAuthorsQuery.data && (
              <div className="max-h-40 overflow-y-auto border rounded p-2">
                {popularAuthorsQuery.data.map((author:any) => (
                  <div key={author.author} className="flex items-center">
                    <input
                      type="checkbox"
                      id={author.author}
                      value={author.author}
                      checked={selectedAuthors.includes(author.author)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAuthors([...selectedAuthors, author.author]);
                        } else {
                          setSelectedAuthors(
                            selectedAuthors.filter(a => a !== author.author)
                          );
                        }
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={author.author}>
                      {author.author} ({author.bookCount} books)
                    </label>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handlePopularAuthorsFilter}
              disabled={selectedAuthors.length === 0}
              className="w-full bg-green-500 text-white p-2 rounded 
              disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Filter Popular Authors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFilters;
