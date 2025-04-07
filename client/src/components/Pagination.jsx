import React from 'react';
import { useVideoContext } from '../context/VideoContext';

const Pagination = () => {
  const { currentPage, totalPages, setCurrentPage } = useVideoContext();
  
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayedPages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);
    
    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers.map(number => (
      <button
        key={number}
        onClick={() => setCurrentPage(number)}
        className={`w-10 h-10 rounded-md flex items-center justify-center ${
          currentPage === number 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        Previous
      </button>
      
      {renderPageNumbers()}
      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;