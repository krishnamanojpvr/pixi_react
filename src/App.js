import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Start from './Components/Start.js';
import ShadowMatching from'./Components/ShadowMatching.js'
import ShapeMatching from './Components/ShapeMatching.js';

function App() {
  localStorage.setItem("choice", "animals");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/shadowmatching" element={<ShadowMatching/>} />
          <Route path="/shapematching" element={< ShapeMatching/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
