const API_URL = 'http://localhost:5000/api';
// const API_URL = 'https://videostream36.onrender.com/api';

export const fetchVideos = async (page = 1, limit = 12, tags = []) => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(tags.length && { tags: tags.join(',') })
    });
    
    const response = await fetch(`${API_URL}/videos?${queryParams}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    return { videos: [], totalPages: 0 };
  }
};

export const fetchVideoById = async (videoId) => {
  try {
    const response = await fetch(`${API_URL}/videos/${videoId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
};

export const fetchRelatedVideos = async (videoId, limit = 6) => {
  try {
    const response = await fetch(`${API_URL}/videos/${videoId}/related?limit=${limit}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching related videos:', error);
    return [];
  }
};

export const searchVideos = async (query, page = 1, limit = 12) => {
  try {
    const queryParams = new URLSearchParams({
      q: query,
      page,
      limit
    });
    
    const response = await fetch(`${API_URL}/videos/search?${queryParams}`);
    return await response.json();
  } catch (error) {
    console.error('Error searching videos:', error);
    return { videos: [], totalPages: 0 };
  }
};