import React, { createContext, useState, useContext } from 'react';
import { fetchVideos, searchVideos } from '../services/api';

const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const loadVideos = async (page = 1) => {
    setLoading(true);
    try {
      const data = searchQuery
        ? await searchVideos(searchQuery, page)
        : await fetchVideos(page, 12, selectedTags);
      
      setVideos(data.videos);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    await loadVideos(1);
  };

  const handleTagSelect = async (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(updatedTags);
    setCurrentPage(1);
    await loadVideos(1);
  };

  const contextValue = {
    videos,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    selectedTags,
    loadVideos,
    handleSearch,
    handleTagSelect,
    setCurrentPage
  };

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};