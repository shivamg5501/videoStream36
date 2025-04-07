import React, { useState } from 'react';
import { useVideoContext } from '../context/VideoContext';

const SearchBar = () => {
  const { handleSearch, searchQuery } = useVideoContext();
  const [input, setInput] = useState(searchQuery);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(input);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search videos..."
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;