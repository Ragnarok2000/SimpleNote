import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ViewNote from './pages/ViewNote';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md px-6 py-4 mb-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">
              NotesApp
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/note/:id" element={<ViewNote />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};


export default App;