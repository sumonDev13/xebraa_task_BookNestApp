"use client";

import React, { useState } from "react";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { Book } from "@/types/book";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/Button";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Biography",
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


const AddBookForm: React.FC = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    price: 0,
    description: "",
  });
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const addBookMutation = useMutation({
    mutationFn: async (data: Partial<Book>) => {
      const response = await axios.post(`${API_BASE_URL}/books/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    onSuccess: (newBook) => {
      setBookData({
        title: "",
        author: "",
        genre: "",
        price: 0,
        description: "",
      });
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (error) => {
      console.error("Failed to add book", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBookMutation.mutate(bookData);
    redirect("/");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <Link href="/books">
        <Button className="mb-4">Go Back</Button>
      </Link>
      <h2 className="text-2xl mb-4 font-bold text-center">Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Author
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Genre
            <select
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Genre</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
            <input
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={addBookMutation.isPending}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {addBookMutation.isPending ? "Adding..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
