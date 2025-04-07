import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
 import { notFound, errorHandler } from './middlewares/errorHandler.js';
import videoRoutes from './routes/videos.js';
import importData from './seeder.js';


// importData();
// Connect to database
dotenv.config();
connectDB();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/videos', videoRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});