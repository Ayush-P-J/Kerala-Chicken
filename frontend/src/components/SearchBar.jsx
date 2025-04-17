"use client";
import { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { useSearch } from "@/contexts/SearchContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();
  const searchInputRef = useRef(null)
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // keep focus
    }
  }, []);
  return (
    <div className="mb-4">
    <Input
      ref={searchInputRef}
      placeholder="Search here..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full max-w-sm"
    />
  </div>
  );
}
