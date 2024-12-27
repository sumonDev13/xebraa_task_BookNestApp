'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookService } from '@/utils/api/book';
import BookList from '@/components/BookList';
import BookSearchForm from '@/components/BookSearchForm';
import BookFilters from '@/components/BookFilters';
import { BookSearchParams } from '@/types/book';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import NotificationCenter from '@/components/NotificationCenter';
import { PopularAuthorsSection } from '@/components/PopularAuthors';

export default function BookCatalogPage() {
  const [searchParams, setSearchParams] = useState<BookSearchParams>({
    page: 1,
    limit: 10
  });

  // Fetch books with current search and filter parameters
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['books', searchParams],
    queryFn: () => bookService.searchBooks(searchParams)
  });

  const [showPopularBooks, setShowPopularBooks] = useState(false);



  // Handle search form submission
  const handleSearch = (params: BookSearchParams) => {
    setSearchParams(prev => ({ 
      ...prev, 
      ...params,
      page: 1 // Reset to first page on new search
    }));
  };

  // Handle average price filtering
  const handleAveragePriceFilter = (genre: string, maxPrice: number) => {
    setSearchParams(prev => ({
      ...prev,
      genre,
      maxPrice,
      page: 1
    }));
  };

  // Handle popular authors filtering
  const handlePopularAuthorsFilter = (authors: string[]) => {
    setSearchParams(prev => ({
      ...prev,
      authors,
      page: 1
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchParams({
      page: 1,
      limit: 10
    });
  };

  return (
    <>
    <NotificationCenter/>
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Book Catalog</h1>
        <Link href="/books/add">
          <Button>Add Book</Button>
        </Link>
        <Button 
              variant="secondary"
              onClick={() => setShowPopularBooks(!showPopularBooks)}
            >
              {showPopularBooks ? 'Hide Popular Books' : 'Show Popular Books by Author'}
            </Button>
      </div>

      {/* Search and Filtering Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <BookSearchForm onSearch={handleSearch} />
        </div>
        <div>
          <Button 
            variant="primary" 
            onClick={handleClearFilters}
            className="w-fit float-end"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Book Filters Component */}
      <BookFilters 
        onAveragePriceFilter={handleAveragePriceFilter}
      />


      {/* Displaying Current Filters */}
      {(searchParams.genre || searchParams.authors?.length) && (
        <div className="bg-gray-100 p-3 rounded-md mb-4 w-fit">
          <h3 className="font-semibold mb-2">Current Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {searchParams.genre && (
              <span className="bg-blue-100 px-2 py-1 rounded">
                Genre: {searchParams.genre}
              </span>
            )}
            {searchParams.maxPrice && (
              <span className="bg-green-100 px-2 py-1 rounded">
                Max Price: \${searchParams.maxPrice.toFixed(2)}
              </span>
            )}
            {searchParams.authors?.map(author => (
              <span key={author} className="bg-purple-100 px-2 py-1 rounded">
                Author: {author}
              </span>
            ))}
          </div>
        </div>
      )}
            {showPopularBooks && (
          <div className="mt-8">
            <PopularAuthorsSection />
          </div>
        )}
    
      {/* Book List Rendering */}
      {isLoading ? (
        <div className="text-center py-6">Loading books...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-6">
          Error loading books. Please try again.
        </div>
      ) : (
        <BookList 
          books={data?.data.books || []} 
          pagination={data?.data.pagination}
          onPageChange={(page) => setSearchParams(prev => ({ ...prev, page }))}
        />
      )}
    </div>
    </>
  );
}
