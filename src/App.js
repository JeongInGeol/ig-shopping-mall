// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Signup';
import Category1 from './components/category/Category1'; // Category1 컴포넌트
import './styles/App.css';

function App() {
  const location = useLocation(); // 현재 경로를 가져옴

  return (
    <div className="App">
      {/* 현재 경로가 signup이 아닐 때만 이미지를 보여줌 */}
      {location.pathname !== '/signup' && (
        <img src="/images/bossam.png" alt="App Logo" className="App-logo" />
      )}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category/category1" element={<Category1 />} />
      </Routes>
    </div>
  );
}

// AppWrapper에서 Router로 App을 감싸줌
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
