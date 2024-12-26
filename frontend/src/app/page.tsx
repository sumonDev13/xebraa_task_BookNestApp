"use client"
import NotificationCenter from "@/components/NotificationCenter";
import BookCatalogPage from "./(pages)/books/page";

export default function Home() {
  return (
    <>
      <h1>BookNest</h1>
      <NotificationCenter />
      <BookCatalogPage/>
    </>
  );
}
