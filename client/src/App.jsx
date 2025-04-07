import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import { VideoProvider } from './context/VideoContext';

function App() {
  return (
    <Router>
      <VideoProvider>
        <div className="min-h-screen bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <header className="py-6">
              <nav className="flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-blue-500">VideoStream</a>
                <div className="flex space-x-4">
                  <a href="/" className="text-gray-300 hover:text-white">Home</a>
                  <a href="/categories" className="text-gray-300 hover:text-white">Categories</a>
                </div>
              </nav>
            </header>
          </div>
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/video/:id" element={<VideoPage />} />
            </Routes>
          </main>
          
          <footer className="bg-gray-800 py-6 mt-12">
            <div className="container mx-auto px-4">
              <p className="text-center text-gray-400">© 2025 VideoStream. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </VideoProvider>
    </Router>
  );
}

export default App;