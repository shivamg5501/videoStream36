import React, { useEffect } from 'react';
import VideoGrid from '../components/VideoGrid';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { useVideoContext } from '../context/VideoContext';

const HomePage = () => {
  const { loadVideos, selectedTags, handleTagSelect } = useVideoContext();

  async function getVideoUrl() {
    const response = await fetch("https://mydaddy.cc/video/30b8014701a62370cb/");
    const html = await response.text();

    // Extract the actual .mp4 file URL using regex
    const videoMatch = html.match(/https:\/\/s\d+\.bigcdn\.cc\/pubs\/[a-zA-Z0-9._\/-]+\.mp4/);
    
    if (videoMatch) {
        return videoMatch[0]; // Return the extracted URL
    } else {
        console.error("Video URL not found!");
        return null;
    }
}

async function loadVideo() {
    const videoUrl = await getVideoUrl();
    if (videoUrl) {
        document.getElementById("videoPlayer").src = videoUrl;
    }
}

// Run function when the page loads
window.onload = loadVideo;
  
  useEffect(() => {
    loadVideos(1);
  }, []);

  const popularTags = ['1080p', 'Family', 'Pussy', 'shaved', 'threesome', 'Anal', 'Big tits'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Video Stream</h1>
      
      <SearchBar />
      
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {popularTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagSelect(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTags.includes(tag)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      
      <VideoGrid />
      
      <Pagination />
    </div>
  );
};

export default HomePage;