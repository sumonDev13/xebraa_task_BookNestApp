"use client"
import NotificationCenter from "@/components/NotificationCenter";
import BookCatalogPage from "./(pages)/books/page";

export default function Home() {
  return (
    <>
      <NotificationCenter />
      <BookCatalogPage/>
    </>
  );
}
