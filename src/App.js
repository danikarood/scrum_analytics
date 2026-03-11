/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer'; 
import './App.css';

function App() {
  // Why is it so hard to just put a footer at the bottom? 
  // Seriously, React router is testing my patience today.
  return (
    <Router>
      <div id="root">
        {/* Navbar component. If this breaks the layout again, I'm screaming. */}
        <Navigation />
        
        {/* The main wrapper. If this doesn't push the footer down, I'm done. */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        {/* Finally added the footer. If it's invisible, I'm going to cry. */}
        <Footer /> 
      </div>
    </Router>
  );
}

// Exporting... hoping for no more compilation errors. Please, just work.
export default App;