const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  key: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
},
createdAt: {
  type: Date,
  default: Date.now
}
});
VideoSchema.index({ title: 'text', tags: 'text' });

module.exports = mongoose.model('Video', VideoSchema);