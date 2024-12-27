'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookService } from '@/utils/api/book';

interface BookFiltersProps {
  onAveragePriceFilter: (genre: string, maxPrice: number) => void;
}

const BookFilters: React.FC<BookFiltersProps> = ({ 
  onAveragePriceFilter, 
}) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [maxPrice, setMaxPrice] = useState(0);

  // Fetch average price by genre
  const averagePriceQuery = useQuery({
    queryKey: ['averagePrice', selectedGenre],
    queryFn: () => bookService.getAveragePriceByGenre(selectedGenre),
    enabled: !!selectedGenre
  });

  const handleAveragePriceFilter = () => {
    if (averagePriceQuery.data) {
      const { averagePrice } = averagePriceQuery.data;
      onAveragePriceFilter(selectedGenre, averagePrice * 1.5); // Example: 1.5x average price
    }
  };

  const GENRES = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 
    'Fantasy', 'Mystery', 'Romance', 'Biography'
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-fit mb-4">
      <div className="grid grid-cols-1 md:grid-cols-1">
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
      </div>
    </div>
  );
};

export default BookFilters;
