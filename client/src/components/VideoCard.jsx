import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  console.log("video",video);
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <Link to={`/video/${video._id}`}>
        <div className="relative pb-[56.25%]">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-white truncate">{video.title}</h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {video.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-blue-600 text-xs text-white px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {video.tags.length > 3 && (
              <span className="bg-gray-600 text-xs text-white px-2 py-1 rounded">
                +{video.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;