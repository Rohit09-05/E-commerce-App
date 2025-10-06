import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import FormPage from './pages/FormPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer'; // Import the new footer

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header onSearch={setSearchQuery} />
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer /> {/* Make sure your footer is here so it appears on every page */}
      </div>
    </Router>
  );
}

export default App;
