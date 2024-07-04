import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarField from './main/StarField'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<StarField />} />
        <Route path="/main" element={<StarField />} />
      </Routes>
    </Router>
  </React.StrictMode>
);