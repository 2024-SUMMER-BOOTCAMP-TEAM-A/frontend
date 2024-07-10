// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarField from './main/StarField';
import Select from './select/Select';
import Chat from './chating/Chat';
import { initialCharacter } from './assets/initCharacter';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<StarField />} />
        <Route path="/select" element={<Select />} />
        <Route path="/chat" element={<Chat initialCharacter={initialCharacter} />} />
        <Route path="/log" element={<div>Log Page</div>} />
      </Routes>
    </Router>
  </React.StrictMode>
);