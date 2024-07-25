import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarField from './main/StarField';
import Select from './select/Select';
import Chat from './chating/Chat';
import TopSelect from './topselect/TopSelect';
import './index.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StarField />} />
      <Route path="/select" element={<Select />} />
      <Route path="/chat" element={<Chat />} /> 
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
