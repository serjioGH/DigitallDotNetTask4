import React from 'react';
import FetchComponent from './FetchComponents';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClothDetailPage from './components/ClothDetailsPage';
import CreateCloth from './components/CreateCloth';
import UpdateCloth from './components/UpdateCloth';
import Header from "./pages/Header";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import './App.css';
import Contact from './pages/Contact';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <div className="App">
      
     <Router>
      <Header />
      <Routes>
        
        <Route path="/home" element={<Home />}/>
        <Route path="/" element={<FetchComponent />}/>
        <Route path="/cloths/:clothId" element={<ClothDetailPage />} />
        <Route path="/new-cloth" element={<CreateCloth/>} />
        <Route path="/edit-cloth/:clothId" element={<UpdateCloth />} />
        <Route path="*" element={<FetchComponent />} />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
