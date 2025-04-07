// server/seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Video = require('./models/Video');

// Sample data
const videos = [
  {
    title: "Sample Video 1",
    description: "This is an action movie",
    key: "videos/123.mp4",
    tags: ["action", "hd", "english"],
    duration: "10:05",
  },
  {
    title: "React Tutorial",
    description: "Learn React basics",
    key: "videos/124.mp4",
    tags: ["react", "webdev"],
    duration: "15:32",
  },
];

// Connect to database
// connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Video.deleteMany();
    // console.log("hello")
    
    // Insert new data
    await Video.insertMany(videos);
    
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = importData;
  // importData();