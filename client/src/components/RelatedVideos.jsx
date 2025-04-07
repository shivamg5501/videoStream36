import React from 'react';
import { Link } from 'react-router-dom';

const RelatedVideos = ({ videos, currentVideoId }) => {
  // console.log("videos",videos);
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Related Videos</h3>
      {videos.length === 0 ? (
        <p className="text-gray-400">No related videos found</p>
      ) : (
        videos.map((video) => (
          video._id !== currentVideoId && (
            <Link 
              key={video._id} 
              to={`/video/${video._id}`}
              className="flex space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="relative flex-shrink-0 w-36">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title} 
                  className="w-full h-20 object-cover rounded-md"
                  loading="lazy" 
                />
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="flex-grow">
                <h4 className="text-white text-sm font-medium line-clamp-2">{video.title}</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {video.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="bg-blue-600 text-xs text-white px-1 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          )
        ))
      )}
    </div>
  );
};

export default RelatedVideos;