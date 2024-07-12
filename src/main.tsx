import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarField from './main/StarField';
import Select from './select/Select';
import Chat from './chating/Chat';
import initialCharacters from './assets/initCharacter';
import TopSelect from './topselect/TopSelect';
import './index.css';
import './App.css';

const defaultCharacter = initialCharacters.MZ; //test

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StarField />} />
      <Route path="/select/:nickname" element={<Select />} />
      <Route path="/chat/:nickname" element={<Chat initialCharacter={defaultCharacter} />} /> 
      <Route path="/topselect/:nickname" element={<TopSelect />} />
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
