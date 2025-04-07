import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import RelatedVideos from '../components/RelatedVideos';
import { fetchVideoById, fetchRelatedVideos } from '../services/api';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideo = async () => {
      setLoading(true);
      try {
        const videoData = await fetchVideoById(id);
        if (videoData) {
          setVideo(videoData);
          document.title = `${videoData.title} - Video Stream`;
          
          const related = await fetchRelatedVideos(id);
          setRelatedVideos(related);
        } else {
          setError('Video not found');
        }
      } catch (err) {
        setError('Failed to load video');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
    
    // Cleanup on unmount or when id changes
    return () => {
      document.title = 'Video Stream';
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4 animate-pulse">
            <div className="bg-gray-700 rounded-lg aspect-video"></div>
            <div className="mt-4 bg-gray-700 h-8 rounded w-3/4"></div>
            <div className="mt-2 bg-gray-700 h-4 rounded w-1/2"></div>
          </div>
          <div className="md:w-1/4 animate-pulse">
            <div className="bg-gray-700 h-6 rounded w-1/2 mb-4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-3 mb-4">
                <div className="bg-gray-700 rounded w-36 h-20"></div>
                <div className="flex-grow">
                  <div className="bg-gray-700 h-4 rounded w-full mb-2"></div>
                  <div className="bg-gray-700 h-4 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!video) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          <VideoPlayer video={video} />
          
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-white">{video.title}</h1>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {video.tags.map((tag, i) => (
                <Link 
                  key={i} 
                  to={`/?tag=${tag}`}
                  className="bg-blue-600 text-xs text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  {tag}
                </Link>
              ))}
            </div>
            
            {video.description && (
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-300 whitespace-pre-line">{video.description}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:w-1/4">
          <RelatedVideos videos={relatedVideos} currentVideoId={id} />
        </div>
      </div>
      
      <div className="mt-8">
        <Link to="/" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default VideoPage;