import React, { useEffect } from 'react';
import VideoCard from './VideoCard';
import { useVideoContext } from '../context/VideoContext';

const VideoGrid = () => {
  const { videos, loading, error, loadVideos, currentPage } = useVideoContext();
  

  useEffect(() => {
    loadVideos(currentPage);
  }, [currentPage]);

  if (loading) {
    console.log('inside loading')
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-gray-700 rounded-lg h-64 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  if (videos.length === 0) {
    return <div className="text-gray-400 text-center py-10">No videos found</div>;
  }

  // console.log("new videos",videos);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map(video => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;