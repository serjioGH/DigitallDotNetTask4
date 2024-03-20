import React from 'react';
import FetchComponent from './FetchComponents';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClothDetailPage from './ClothDetailsPage';
import CreateCloth from './CreateCloth';
import UpdateCloth from './UpdateCloth';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<FetchComponent />}/>
        <Route path="/cloths/:clothId" element={<ClothDetailPage />} />
        <Route path="/new-cloth" element={<CreateCloth/>} />
        <Route path="/edit-cloth/:clothId" element={<UpdateCloth />} />
        <Route path="*" element={<FetchComponent />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
