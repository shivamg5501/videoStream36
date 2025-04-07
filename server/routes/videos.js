const express = require('express');
const router = express.Router();
const {
  getVideos,
  getVideoById,
  getRelatedVideos,
  searchVideos
} = require('../controllers/videoController');
const cacheMiddleware = require('../middlewares/cache');

// @route   GET /api/videos
// @desc    Get all videos with pagination and filtering
// @access  Public
router.get('/', cacheMiddleware(300), getVideos);

// @route   GET /api/videos/search
// @desc    Search videos
// @access  Public
router.get('/search', cacheMiddleware(300), searchVideos);

// @route   GET /api/videos/:id
// @desc    Get single video
// @access  Public
router.get('/:id', getVideoById);

// @route   GET /api/videos/:id/related
// @desc    Get related videos
// @access  Public
router.get('/:id/related', cacheMiddleware(300), getRelatedVideos);

module.exports = router;