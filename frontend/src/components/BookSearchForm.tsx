import React, { useState } from 'react';
import { BookSearchParams } from '@/types/book';

interface BookSearchFormProps {
  onSearch: (params: BookSearchParams) => void;
}

const BookSearchForm: React.FC<BookSearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<BookSearchParams>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex space-x-2">
      <input
        type="text"
        placeholder="Title"
        value={searchParams.title || ''}
        onChange={(e) => setSearchParams(prev => ({ ...prev, title: e.target.value }))}
        className="border p-2 rounded"
      />
      {/* Add more input fields for other search parameters */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default BookSearchForm;
