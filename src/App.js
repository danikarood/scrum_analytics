import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import Comparison from './pages/Comparison'; 
import Timeline from './pages/Timeline';
import Footer from './components/Footer'; 
import './App.css';

function App() {
  return (
    <Router>
      <div id="root">
        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* FIXED: Changed path from "/comparison" to "/compare" 
               to match your button links and the browser URL!
            */}
            <Route path="/compare" element={<Comparison />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
        </main>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;