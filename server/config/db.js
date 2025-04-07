const mongoose = require('mongoose');
const importData = require('../seeder.js');

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");  // Add this line for debugging
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // try {
    //   await importData();  // Ensure it executes properly
    //   console.log("Data imported successfully.");
    // } catch (seederError) {
    //   console.error("Seeder Error:", seederError.message);
    // }

  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
