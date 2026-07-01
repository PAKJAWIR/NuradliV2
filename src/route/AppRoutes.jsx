import { Routes, Route } from 'react-router-dom';

// Import komponen Halaman (Pages)
import Home from '../pages/Home';
import About from '../pages/About';
import Works from '../pages/Works';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound'; // Fallback page jika URL typo

export default function AppRoutes() {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/works" element={<Works />} />
      <Route path="/contact" element={<Contact />} />

      {/* Catch-all Route (404 Page) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}