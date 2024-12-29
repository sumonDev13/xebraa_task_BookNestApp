"use client";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { bookService } from "@/utils/api/book";
import { AuthorBookModal } from "./AuthorBookModal";

export function PopularAuthorsSection() {
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const queryClient = useQueryClient();

  interface PopularAuthor {
    author: string;
    bookCount: number;
    averagePrice: number;
    genres: string[];
  }

  // Fetch Popular Authors
  const {
    data: popularAuthors,
    isLoading,
    error,
  } = useQuery<PopularAuthor[]>({
    queryKey: ["popularAuthors", { limit: 10, minBooks: 1 }],
    queryFn: () =>
      bookService.getPopularAuthors({
        limit: 10,
        minBooks: 1,
      }),
  });

  // Prefetch books for an author on hover
  const prefetchAuthorBooks = (author: string) => {
    queryClient.prefetchQuery({
      queryKey: ["authorBooks", author],
      queryFn: () => bookService.getBooksByAuthor(author),
    });
  };

  if (isLoading) return <div>Loading popular authors...</div>;
  if (error) return <div>Error loading authors</div>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Popular Authors</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularAuthors?.map((author) => (
          <div
            key={author.author}
            className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setSelectedAuthor(author.author)}
            onMouseEnter={() => prefetchAuthorBooks(author.author)}
          >
            <h3 className="text-xl font-semibold mb-2">{author.author}</h3>

            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Books:</span> {author.bookCount}
              </p>
              <p className="text-sm">
                <span className="font-medium">Avg Price:</span> $
                {author.averagePrice.toFixed(2)}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {author.genres.map((genre) => (
                  <span
                    key={genre}
                    className="bg-gray-100 text-xs px-2 py-1 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to show author's books */}
      {selectedAuthor && (
        <AuthorBookModal
          author={selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
        />
      )}
    </div>
  );
}
