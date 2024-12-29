"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { bookService } from "@/utils/api/book";
import BookList from "@/components/BookList";
import BookSearchForm from "@/components/BookSearchForm";
import BookFilters from "@/components/BookFilters";
import { BookSearchParams } from "@/types/book";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import NotificationCenter from "@/components/NotificationCenter";
import { PopularAuthorsSection } from "@/components/PopularAuthors";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { Tooltip } from "react-tooltip";

export default function BookCatalogPage() {
  const [searchParams, setSearchParams] = useState<BookSearchParams>({
    page: 1,
    limit: 10,
  });

  const { token, clearAuth } = useAuth();

  useEffect(() => {
    console.log("Token:", token);
  }, [token]);

  const handleLogout = () => {
    clearAuth();
  };

  const handleLogin = () => {
    redirect("/login");
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["books", searchParams],
    queryFn: () => bookService.searchBooks(searchParams),
  });

  const [showPopularBooks, setShowPopularBooks] = useState(false);

  const handleSearch = (params: BookSearchParams) => {
    setSearchParams((prev) => ({
      ...prev,
      ...params,
      page: 1,
    }));
  };
  const handleAveragePriceFilter = (genre: string, maxPrice: number) => {
    setSearchParams((prev) => ({
      ...prev,
      genre,
      maxPrice,
      page: 1,
    }));
  };

  return (
    <>
      <NotificationCenter />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Book Catalog</h1>
          {token ? (
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="w-fit float-end"
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleLogin}
              className="w-fit float-end"
            >
              Login
            </Button>
          )}
          <Link href="/books/add">
            <button
              className={`p-2 ${
                token
                  ? "bg-green-500"
                  : "bg-gray-300 cursor-not-allowed my-anchor-element"
              } text-white rounded`}
              disabled={!token}
            >
              Add Book
            </button>
          </Link>
          <Tooltip anchorSelect=".my-anchor-element" content="Need to login to add book" />
          <Button
            variant="secondary"
            onClick={() => setShowPopularBooks(!showPopularBooks)}
          >
            {showPopularBooks
              ? "Hide Popular Books"
              : "Show Popular Books by Author"}
          </Button>
        </div>

        {/* Search and Filtering Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <BookSearchForm onSearch={handleSearch} />
          </div>
        </div>
        <BookFilters onAveragePriceFilter={handleAveragePriceFilter} />
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
              {searchParams.authors?.map((author) => (
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
            onPageChange={(page) =>
              setSearchParams((prev) => ({ ...prev, page }))
            }
          />
        )}
      </div>
    </>
  );
}
