'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookService } from '@/utils/api/book';
import BookList from '@/components/BookList';
import BookSearchForm from '@/components/BookSearchForm';
import { BookSearchParams } from '@/types/book';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function BookCatalogPage() {
  const [searchParams, setSearchParams] = useState<BookSearchParams>({
    page: 1,
    limit: 10
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['books', searchParams],
    queryFn: () => bookService.searchBooks(searchParams)
  });

  const handleSearch = (params: BookSearchParams) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Catalog</h1>
      
     <Link href="/books/add"><Button>Add Book</Button></Link>
      <BookSearchForm onSearch={handleSearch} />
      
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading books</div>
      ) : (
        <BookList 
          books={data?.data.books || []} 
          pagination={data?.data.pagination}
          onPageChange={(page) => setSearchParams(prev => ({ ...prev, page }))}
        />
      )}
    </div>
  );
}
