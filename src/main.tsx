// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import StarField from './main/StarField';
// import Select from './select/Select';
// import './index.css';
// import TopSelect from './topselect/TopSelect';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/" element={<StarField />} />
//         <Route path="/select" element={<Select />} />
//         <Route path="/topselect" element={<TopSelect />} />
//       </Routes>
//     </Router>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import StarField from './main/StarField';
import Select from './select/Select';
import Chat from './chating/Chat';
import initialCharacters from './assets/initCharacter';
import TopSelect from './topselect/TopSelect';
import './index.css';
import './App.css';


const defaultCharacter = initialCharacters.MZ; //test

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<StarField />} />
        <Route path="/select" element={<Select />} />
        <Route path="/chat" element={<Chat initialCharacter={defaultCharacter} />} />
        <Route path="/log" element={<div>Log Page</div>} />
      </Routes>

const App: React.FC = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<StarField />} />
      <Route path="/select/:nickname" element={<Select />} />
      <Route path="/topselect" element={<TopSelect />} />
    </Routes>

  );
};

const Root: React.FC = () => (
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
