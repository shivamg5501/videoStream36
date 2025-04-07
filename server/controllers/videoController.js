const Video = require('../models/Video');
const { getPagination } = require('../utils/pagination');
const { getSignedVideoUrl, getSignedImageUrl } = require("../utils/r2");

const mongoose = require('mongoose');

// Get all videos with pagination and optional tag filtering
const getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 12, tags } = req.query;

    const { limit: limitVal, offset } = getPagination(page, limit);

    // Build filter object
    let filter = {};

    if (tags) {
      const tagArray = tags.split(',');
      filter.tags = { $in: tagArray };
    }

    const videos = await Video.find(filter)
      .sort({ createdAt: -1 })
      .limit(limitVal)
      .skip(offset)
      .lean();

    const withSignedUrls = await Promise.all(videos.map(async (video) => {
      const signedUrl = await getSignedVideoUrl(video.videoKey);
      const thumbnail = await getSignedImageUrl(video.imageKey);
      return {
        ...video,
        mp4: signedUrl, // this can now be directly used in <video src={mp4} />
        thumbnail:thumbnail
      };
    }));

    res.json({
      videos: withSignedUrls,
      totalPages: Math.ceil(await Video.countDocuments(filter) / limitVal),
      currentPage: parseInt(page)
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// Get single video by ID
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).lean();

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const signedUrl = await getSignedVideoUrl(video.videoKey);
    const thumbnail = await getSignedImageUrl(video.imageKey);
    res.json({
      ...video,
      mp4: signedUrl,
      thumbnail:thumbnail
    });

  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid video ID' });
    }
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// Get related videos based on tags
const getRelatedVideos = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).lean();

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const limit = parseInt(req.query.limit) || 6;

    const relatedVideos = await Video.find({
      _id: { $ne: video._id },
      tags: { $in: video.tags }
    })
      .sort({ views: -1 })
      .limit(limit)
      .lean();

    const withSignedUrls = await Promise.all(relatedVideos.map(async (vid) => {
      const signedUrl = await getSignedVideoUrl(vid.videoKey);
      const thumbnail = await getSignedImageUrl(vid.imageKey);
      return {
        ...vid,
        mp4: signedUrl,
        thumbnail:thumbnail
      };
    }));

    res.json(withSignedUrls);

  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid video ID' });
    }
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// Search videos
const searchVideos = async (req, res) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const { limit: limitVal, offset } = getPagination(page, limit);

    const videos = await Video.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(limitVal)
      .skip(offset)
      .lean();

    const withSignedUrls = await Promise.all(videos.map(async (video) => {
      const signedUrl = await getSignedVideoUrl(video.key);
      return {
        ...video,
        mp4: signedUrl
      };
    }));

    const count = await Video.countDocuments({ $text: { $search: q } });

    res.json({
      videos: withSignedUrls,
      totalPages: Math.ceil(count / limitVal),
      currentPage: parseInt(page),
      totalVideos: count
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

module.exports = {
  getVideos,
  getVideoById,
  getRelatedVideos,
  searchVideos
};
